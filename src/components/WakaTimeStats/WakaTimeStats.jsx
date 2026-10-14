// Adaptado dos exemplos de João Paulo Aramuni (MIT). Veja docs/credits/LICENSE-Aramuni.txt.
import { useEffect, useState } from "react";
import { FiActivity, FiAward, FiClock, FiExternalLink, FiSun } from "react-icons/fi";
import WAKATIME_CONFIG from "../../config/wakatimeConfig";
import { fetchWakaTimeStats } from "../../services/wakatimeService";
import CodingNow from "./CodingNow";
import { formatDate, formatDuration, formatNumber, formatPercent } from "./format";
import { languageColor } from "./languageColors";
import "./WakaTimeStats.css";

/**
 * Painel com as estatísticas do WakaTime (tempo programando, linguagens,
 * editores, sistemas, categorias e projetos) e o cartão "Codando agora"
 * (em que projeto você está mexendo no editor neste momento).
 *
 * Para usar no seu projeto, copie:
 *   • a pasta components/WakaTimeStats
 *   • services/wakatimeService.js e config/wakatimeConfig.js
 *   • api/_wakatime.js, api/wakatime.js, api/_codando.js, api/codando.js
 *     e o plugin do vite.config.js
 *
 * <WakaTimeStats />
 * <WakaTimeStats initialRange="all_time" showProjects={false} />
 * <WakaTimeStats showCodingNow={false} />
 */

const OS_NAMES = { Mac: "macOS" };

const { RANGES, DEFAULT_RANGE, PROFILE_URL, HIDDEN_LANGUAGES } =
  WAKATIME_CONFIG;

function useWakaTime(range) {
  const [state, setState] = useState({ status: "loading", data: null, error: null });

  useEffect(() => {
    let active = true;
    // Mantém os dados antigos na tela enquanto o novo período carrega
    setState((old) => ({ ...old, status: "loading", error: null }));

    fetchWakaTimeStats(range)
      .then((data) => active && setState({ status: "ready", data, error: null }))
      .catch(
        (error) => active && setState((old) => ({ status: "error", data: old.data, error }))
      );

    return () => {
      active = false;
    };
  }, [range]);

  return state;
}

/* =====================================================================
   Pedaços da tela
   ===================================================================== */

function Kpi({ icon: Icon, label, value, note }) {
  return (
    <li className="waka-kpi">
      <span className="waka-kpi-label">
        <Icon aria-hidden="true" />
        {label}
      </span>
      <span className="waka-kpi-value">{value}</span>
      {note && <span className="waka-kpi-note">{note}</span>}
    </li>
  );
}

function LanguageList({ languages }) {
  return (
    <ul className="waka-list">
      {languages.map((lang) => (
        <li key={lang.name} className="waka-row" style={{ "--lang": lang.color }}>
          <div className="waka-row-head">
            <span className="waka-dot" aria-hidden="true" />
            <span className="waka-name">{lang.name}</span>
            <span className="waka-time">{formatDuration(lang.seconds)}</span>
            <span className="waka-pct">{formatPercent(lang.percent)}</span>
          </div>
          <div className="waka-bar" aria-hidden="true">
            <span style={{ width: `${Math.min(100, Math.max(0, lang.percent))}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function MiniList({ title, items, rename = {} }) {
  if (!items?.length) return null;
  return (
    <section className="waka-mini">
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            <span className="waka-mini-name">{rename[item.name] ?? item.name}</span>
            <span className="waka-mini-bar" aria-hidden="true">
              <span style={{ width: `${Math.max(item.percent, 2)}%` }} />
            </span>
            <span className="waka-mini-pct">{formatPercent(item.percent)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ErrorBox({ error }) {
  return (
    <div className={`waka-message ${error?.code === "pending" ? "warning" : "error"}`} role="alert">
      <strong>{error?.code === "pending" ? "As estatísticas ainda estão sendo calculadas. Tente novamente em instantes." : "As estatísticas estão indisponíveis no momento. Tente novamente mais tarde."}</strong>
      
    </div>
  );
}

function Skeleton() {
  return (
    <div className="waka-skeleton" aria-hidden="true">
      <div className="waka-skeleton-kpis">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} />
        ))}
      </div>
      <span className="waka-skeleton-bar" />
      <span className="waka-skeleton-block" />
    </div>
  );
}

/* =====================================================================
   Componente principal
   ===================================================================== */

export default function WakaTimeStats({
  initialRange = DEFAULT_RANGE,
  showRangePicker = true,
  showProjects = true,
  showCodingNow = true,
}) {
  const [range, setRange] = useState(initialRange);
  const { status, data, error } = useWakaTime(range);

  const hidden = new Set(HIDDEN_LANGUAGES);
  const languages = (data?.languages ?? [])
    .filter((lang) => !hidden.has(lang.name))
    .map((lang) => ({ ...lang, color: languageColor(lang.name) }));
  return (
    <div className="waka" aria-busy={status === "loading"}>
      {/* ---------- Codando agora (não depende do período) ---------- */}
      {showCodingNow && <CodingNow showProject={showProjects} />}

      {/* ---------- Período + link do perfil ---------- */}
      <div className="waka-toolbar">
        {showRangePicker && (
          <div className="waka-ranges" role="group" aria-label="Período">
            {RANGES.map((option) => (
              <button
                key={option.value}
                type="button"
                className={option.value === range ? "active" : ""}
                aria-pressed={option.value === range}
                onClick={() => setRange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {PROFILE_URL && (
          <a className="waka-profile" href={PROFILE_URL} target="_blank" rel="noopener noreferrer">
            Ver perfil no WakaTime <FiExternalLink aria-hidden="true" />
          </a>
        )}
      </div>

      {status === "error" && <ErrorBox error={error} />}
      {status === "loading" && !data && <Skeleton />}

      {data && (
        <div className={status === "loading" ? "waka-body updating" : "waka-body"}>
          {/* ---------- Indicadores ---------- */}
          <ul className="waka-kpis">
            <Kpi
              icon={FiClock}
              label="Tempo total"
              value={formatDuration(data.totalSeconds)}
              note={
                data.range === "all_time" && data.start
                  ? `desde ${formatDate(data.start)}`
                  : `${formatNumber(languages.length)} linguagens`
              }
            />
            <Kpi
              icon={FiActivity}
              label="Média diária"
              value={formatDuration(data.dailyAverage)}
              note={data.activeDays != null ? `${formatNumber(data.activeDays)} dias ativos` : null}
            />
            <Kpi
              icon={FiSun}
              label="Hoje"
              value={data.today ? formatDuration(data.today.seconds) : "—"}
              note={data.today ? "até agora" : "sem dados disponíveis"}
            />
            <Kpi
              icon={FiAward}
              label="Melhor dia"
              value={data.bestDay ? formatDuration(data.bestDay.seconds) : "—"}
              note={data.bestDay ? formatDate(data.bestDay.date) : "sem dados no período"}
            />
          </ul>

          {/* ---------- Linguagens ---------- */}
          {languages.length > 0 ? (
            <>
              <div className="waka-grid">
                <section className="waka-card">
                  <h3>Linguagens</h3>
                  <LanguageList languages={languages} />
                </section>

                <aside className="waka-card waka-side">
                  <MiniList title="Sistemas operacionais" items={data.operatingSystems} rename={OS_NAMES} />
                </aside>
              </div>
            </>
          ) : (
            <p className="waka-empty">Nenhuma atividade registrada neste período.</p>
          )}

          {/* ---------- Projetos ---------- */}
          {showProjects && data.projects?.length > 0 && (
            <section className="waka-card waka-projects">
              <h3>Projetos</h3>
              <ul>
                {data.projects.map((project) => (
                  <li key={project.name}>
                    <span>{project.name}</span>
                    <strong>{formatDuration(project.seconds)}</strong>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="waka-source">
            Atividade de programação registrada pelo WakaTime.
          </p>
        </div>
      )}
    </div>
  );
}

