// Adaptado dos exemplos de João Paulo Aramuni (MIT). Veja docs/credits/LICENSE-Aramuni.txt.
import { fetchRepos } from "../../services/githubService";
import { languageColor } from "./languageColors";
import useGitHub, { visibleRepos } from "./useGitHub";
import "./GitHub.css";

const percent = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 1 }).format(value);

/**
 * Linguagens mais usadas, contando a linguagem principal de cada repositório.
 * (A REST API devolve uma linguagem por repositório, sem chamadas extras.)
 *
 * <GitHubLanguages username="joaopauloaramuni" />
 */
export default function GitHubLanguages({ username }) {
  const { status, data } = useGitHub(fetchRepos, username);

  if (status === "loading") return <div className="gh-card gh-skeleton gh-skeleton-block" />;
  if (status === "error") return null;

  // { Java: 9, Python: 3, ... }
  const counts = {};
  for (const repo of visibleRepos(data)) {
    if (repo.language) counts[repo.language] = (counts[repo.language] ?? 0) + 1;
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const languages = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count, share: count / total, color: languageColor(name) }));

  return (
    <section className="gh-card">
      <div className="gh-card-head">
        <h3>Linguagens</h3>
        <span className="gh-card-note">linguagem principal de {total} repositórios</span>
      </div>

      {total === 0 ? (
        <p className="gh-empty">Nenhum repositório com linguagem definida.</p>
      ) : (
        <ul className="gh-language-list">
          {languages.map((lang) => (
            <li key={lang.name} className="gh-language-row">
              <div className="gh-language-head">
                <span className="gh-dot" style={{ background: lang.color }} aria-hidden="true" />
                <span className="gh-legend-name">{lang.name}</span>
                <span className="gh-legend-value">
                  {lang.count} {lang.count === 1 ? "repositório" : "repositórios"} · {percent(lang.share)}
                </span>
              </div>
              <div className="gh-language-bar" aria-hidden="true">
                <span style={{ width: `${lang.share * 100}%`, background: lang.color }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

