// Adaptado dos exemplos de João Paulo Aramuni (MIT). Veja docs/credits/LICENSE-Aramuni.txt.
import { fetchLanguages } from "../../services/githubService";
import { languageColor } from "./languageColors";
import useGitHub from "./useGitHub";
import "./GitHub.css";

const percent = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 1 }).format(value);

/**
 * Todas as linguagens detectadas pelo GitHub em todos os repositórios públicos, incluindo forks.
 * Percentuais calculados pela soma dos bytes de código, inclusive secundárias.
 *
 * <GitHubLanguages username="joaopauloaramuni" />
 */
export default function GitHubLanguages({ username }) {
  const { status, data } = useGitHub(fetchLanguages, username);

  if (status === "loading") return <div className="gh-card gh-skeleton gh-skeleton-block" />;
  if (status === "error") return (
    <section className="gh-card">
      <h3>Linguagens</h3>
      <p className="gh-empty">Não foi possível carregar os percentuais agora. Tente novamente mais tarde.</p>
    </section>
  );

  const languages = (data?.languages ?? []).map((lang) => ({ ...lang, color: languageColor(lang.name) }));

  return (
    <section className="gh-card">
      <div className="gh-card-head">
        <h3>Linguagens</h3>
        <span className="gh-card-note">proporção de código em {data?.repositoriesWithCode ?? 0} repositórios públicos · incluindo forks</span>
      </div>

      {languages.length === 0 ? (
        <p className="gh-empty">Nenhum repositório com linguagem definida.</p>
      ) : (
        <ul className="gh-language-list">
          {languages.map((lang) => (
            <li key={lang.name} className="gh-language-row">
              <div className="gh-language-head">
                <span className="gh-dot" style={{ background: lang.color }} aria-hidden="true" />
                <span className="gh-legend-name">{lang.name}</span>
                <span className="gh-legend-value">
                  {percent(lang.share)}
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

