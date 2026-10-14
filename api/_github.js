// Adaptado dos exemplos de João Paulo Aramuni (MIT). Veja docs/credits/LICENSE-Aramuni.txt.
// Busca dados públicos do GitHub no SERVIDOR (perfil, repositórios e contribuições).
//
// Por que não chamar a api.github.com direto do navegador?
//   • Sem token, o GitHub libera só 60 chamadas por hora POR IP. Numa rede de
//     faculdade (todo mundo com o mesmo IP) esse limite acaba rapidinho.
//   • Com token, são 5.000 chamadas por hora, mas o token NÃO pode ir para o
//     navegador: qualquer visitante conseguiria ler e usar.
// Então o navegador chama /api/github no próprio site, e quem fala com o GitHub
// (com o token, se houver) é:
//   • em produção, a Vercel Function api/github.js
//   • no npm run dev / npm run preview, o vite.config.js
//
// Variável de ambiente (SEM o prefixo VITE_, de propósito):
//   GITHUB_TOKEN → opcional, mas recomendado. Token fine-grained só de leitura.
//
// O nome do arquivo começa com "_" para a Vercel NÃO transformá-lo em rota.

export const GITHUB_PATH = "/api/github";

const API = "https://api.github.com";
const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4";
const TIMEOUT_MS = 10_000;

// Usuário do GitHub: letras, números e hífen, até 39 caracteres
const USERNAME_RE = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

const RESOURCES = ["profile", "repos", "languages", "contributions"];

/* =====================================================================
   Resposta HTTP (funciona igual na Vercel e no servidor do Vite)
   ===================================================================== */

const CACHE_OK = "public, max-age=0, s-maxage=600, stale-while-revalidate=3600";

function send(res, status, body, cache = "no-store") {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", cache);
  res.end(JSON.stringify(body));
}

class HttpError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

/* =====================================================================
   Chamadas ao GitHub
   ===================================================================== */

function githubHeaders(token) {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "puc-minas-github-api-react",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function githubRest(path, token) {
  const response = await fetch(`${API}${path}`, {
    headers: githubHeaders(token),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (response.status === 404) {
    throw new HttpError(404, "not_found", "Usuário do GitHub não encontrado.");
  }
  if (response.status === 401) {
    throw new HttpError(401, "invalid_token", "Não foi possível carregar os dados do GitHub agora.");
  }
  if (response.status === 403 || response.status === 429) {
    throw new HttpError(
      429,
      "rate_limited",
      token
        ? "Limite da GitHub API atingido. Tente de novo mais tarde."
        : "Limite de 60 chamadas/hora da GitHub API atingido. Tente novamente mais tarde."
    );
  }
  if (!response.ok) {
    throw new HttpError(502, "upstream_error", `GitHub respondeu HTTP ${response.status}.`);
  }
  return response.json();
}

/* =====================================================================
   Recursos
   ===================================================================== */

async function getProfile(username, token) {
  const u = await githubRest(`/users/${username}`, token);
  return {
    login: u.login,
    name: u.name,
    avatarUrl: u.avatar_url,
    htmlUrl: u.html_url,
    bio: u.bio,
    company: u.company,
    location: u.location,
    blog: u.blog,
    publicRepos: u.public_repos,
    followers: u.followers,
    following: u.following,
    createdAt: u.created_at,
  };
}

async function getPublicRepos(username, token) {
  const repos = [];
  for (let page = 1; ; page++) {
    const batch = await githubRest(
      `/users/${username}/repos?per_page=100&sort=pushed&type=owner&page=${page}`,
      token
    );
    repos.push(...batch.filter((r) => !r.private));
    if (batch.length < 100) return repos;
  }
}

async function getRepos(username, token) {
  const repos = await getPublicRepos(username, token);
  return repos.map((r) => ({
    id: r.id,
    name: r.name,
    description: r.description,
    htmlUrl: r.html_url,
    homepage: r.homepage || null,
    language: r.language,
    stars: r.stargazers_count,
    forks: r.forks_count,
    topics: r.topics ?? [],
    fork: r.fork,
    archived: r.archived,
    pushedAt: r.pushed_at,
  }));
}

// Soma os bytes reconhecidos pelo GitHub, incluindo linguagens secundárias.
// Mantém o mesmo recorte de repositórios públicos sem forks do painel.
async function getLanguages(username, token) {
  const repos = (await getPublicRepos(username, token)).filter((repo) => !repo.fork);
  const totals = new Map();
  let repositoriesWithCode = 0;

  for (let i = 0; i < repos.length; i += 3) {
    const batch = await Promise.all(repos.slice(i, i + 3).map((repo) =>
      githubRest(`/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo.name)}/languages`, token)
    ));
    for (const languages of batch) {
      let hasCode = false;
      for (const [name, bytes] of Object.entries(languages)) {
        if (!Number.isFinite(bytes) || bytes <= 0) continue;
        totals.set(name, (totals.get(name) ?? 0) + bytes);
        hasCode = true;
      }
      if (hasCode) repositoriesWithCode++;
    }
  }

  const totalBytes = [...totals.values()].reduce((sum, bytes) => sum + bytes, 0);
  return {
    repositoriesWithCode,
    totalBytes,
    languages: [...totals.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, bytes]) => ({ name, bytes, share: bytes / totalBytes })),
  };
}

// Calendário de contribuições (o "quadradinho verde" do perfil).
// Com token: GraphQL oficial do GitHub. Sem token: API pública da comunidade
// (github-contributions-api.jogruber.de), que lê o perfil público.
async function getContributions(username, token) {
  if (token) {
    const query = `
      query ($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks { contributionDays { date contributionCount } }
            }
          }
        }
      }`;
    const response = await fetch(`${API}/graphql`, {
      method: "POST",
      headers: { ...githubHeaders(token), "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { login: username } }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (response.status === 401) {
      throw new HttpError(401, "invalid_token", "GITHUB_TOKEN inválido ou expirado.");
    }
    const { data } = await response.json();
    const calendar = data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) throw new HttpError(404, "not_found", "Usuário do GitHub não encontrado.");
    return {
      source: "graphql",
      total: calendar.totalContributions,
      days: calendar.weeks.flatMap((w) =>
        w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
      ),
    };
  }

  const response = await fetch(`${CONTRIBUTIONS_API}/${username}?y=last`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new HttpError(502, "upstream_error", "Não foi possível ler as contribuições.");
  }
  const json = await response.json();
  return {
    source: "public",
    total: json.total?.lastYear ?? 0,
    days: (json.contributions ?? []).map((d) => ({ date: d.date, count: d.count })),
  };
}

const HANDLERS = { profile: getProfile, repos: getRepos, languages: getLanguages, contributions: getContributions };

/* =====================================================================
   Handler: GET /api/github?resource=profile&username=joaopauloaramuni
   ===================================================================== */

export async function handleGitHub(req, res, env = {}) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return send(res, 405, { error: "method_not_allowed", message: "Use GET." });
  }

  const url = new URL(req.url, "http://localhost");
  const resource = url.searchParams.get("resource");
  const username = String(url.searchParams.get("username") ?? "").trim();

  if (!RESOURCES.includes(resource)) {
    return send(res, 400, { error: "bad_request", message: `resource deve ser: ${RESOURCES.join(", ")}.` });
  }
  if (!USERNAME_RE.test(username) || username.toLowerCase() !== "matheus-tahan-sab") {
    return send(res, 400, { error: "bad_request", message: "Usuário do GitHub inválido." });
  }

  const token = String(env.GITHUB_TOKEN ?? "").trim();

  try {
    const data = await HANDLERS[resource](username, token);
    // Linguagens exige uma chamada por repositório; atualiza a cada hora.
    const cache = resource === "languages"
      ? "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
      : CACHE_OK;
    return send(res, 200, data, cache);
  } catch (error) {
    if (error instanceof HttpError) {
      return send(res, error.status, { error: error.code, message: error.message });
    }
    console.error("GitHub:", error?.message ?? error);
    return send(res, 504, { error: "timeout", message: "Não foi possível falar com o GitHub agora." });
  }
}

