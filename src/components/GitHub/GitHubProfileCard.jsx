// Adaptado dos exemplos de João Paulo Aramuni (MIT). Veja docs/credits/LICENSE-Aramuni.txt.
import { FiCalendar, FiExternalLink, FiLink, FiMapPin, FiUsers } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { fetchProfile } from "../../services/githubService";
import useGitHub, { formatDate, formatNumber } from "./useGitHub";
import "./GitHub.css";

// Garante o https:// no link do site (o GitHub devolve "aramuni.dev" às vezes)
const toUrl = (blog) => (/^https?:\/\//i.test(blog) ? blog : `https://${blog}`);

/**
 * Cartão com a foto, o nome, a bio e os dados públicos do perfil.
 *
 * <GitHubProfileCard username="joaopauloaramuni" />
 */
export default function GitHubProfileCard({ username }) {
  const { status, data: profile, error } = useGitHub(fetchProfile, username);

  if (status === "loading") return <div className="gh-card gh-skeleton gh-skeleton-profile" />;
  if (status === "error") return <GitHubMessage error={error} />;

  return (
    <section className="gh-card gh-profile">
      <img
        className="gh-avatar"
        src={profile.avatarUrl}
        alt={`Foto de ${profile.name ?? profile.login}`}
        width="112"
        height="112"
      />

      <div className="gh-profile-body">
        <div className="gh-profile-head">
          <div>
            <h3>{profile.name ?? profile.login}</h3>
            <span className="gh-login">@{profile.login}</span>
          </div>
          <a className="gh-button" href={profile.htmlUrl} target="_blank" rel="noopener noreferrer">
            Ver no GitHub <FiExternalLink aria-hidden="true" />
          </a>
        </div>

        {profile.bio && <p className="gh-bio">{profile.bio}</p>}

        <ul className="gh-meta">
          {profile.company && (
            <li>
              <HiOutlineBuildingOffice2 aria-hidden="true" /> {profile.company}
            </li>
          )}
          {profile.location && (
            <li>
              <FiMapPin aria-hidden="true" /> {profile.location}
            </li>
          )}
          {profile.blog && (
            <li>
              <FiLink aria-hidden="true" />
              <a href={toUrl(profile.blog)} target="_blank" rel="noopener noreferrer">
                {profile.blog.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            </li>
          )}
          <li>
            <FiUsers aria-hidden="true" />
            <strong>{formatNumber(profile.followers)}</strong> seguidores ·{" "}
            <strong>{formatNumber(profile.following)}</strong> seguindo
          </li>
          <li>
            <FiCalendar aria-hidden="true" /> No GitHub desde{" "}
            {formatDate(profile.createdAt, { month: "long", year: "numeric" })}
          </li>
        </ul>
      </div>
    </section>
  );
}

// Caixa de erro compartilhada pelos componentes do GitHub
export function GitHubMessage({ error }) {
  return (
    <div className="gh-message" role="alert">
      <strong>{"Os dados do GitHub estão indisponíveis no momento. Você pode acessar o perfil diretamente pelo link abaixo."}</strong>
      <a href="https://github.com/Matheus-Tahan-Sab" target="_blank" rel="noopener noreferrer">Ver perfil no GitHub</a>
    </div>
  );
}

