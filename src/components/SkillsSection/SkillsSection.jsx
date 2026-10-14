// Adaptado de SkillsGlobe, © 2026 João Paulo Aramuni (MIT).
import { useState } from "react";
import SkillsGlobe from "../SkillsGlobe/SkillsGlobe";
import "./SkillsSection.css";

/**
 * Seção completa de habilidades: filtro por categoria + alternância
 * entre o globo 3D e uma lista em grade (mais acessível e boa para celular).
 *
 * <SkillsSection skills={SKILLS} categories={CATEGORIES} />
 */
export default function SkillsSection({ skills, categories }) {
  const [category, setCategory] = useState("Todas");
  const [view, setView] = useState("globo");
  const [paused, setPaused] = useState(false);

  const filtered = category === "Todas" ? skills : skills.filter((s) => s.category === category);
  const count = (cat) => (cat === "Todas" ? skills.length : skills.filter((s) => s.category === cat).length);

  return (
    <div className="skills-section">
      <div className="skills-toolbar">
        <div className="skills-chips" role="group" aria-label="Categoria">
          {["Todas", ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              className={cat === category ? "active" : ""}
              aria-pressed={cat === category}
              onClick={() => setCategory(cat)}
            >
              {cat} <span>{count(cat)}</span>
            </button>
          ))}
        </div>

        <div className="skills-view" role="group" aria-label="Visualização">
          <button
            type="button"
            className={view === "globo" ? "active" : ""}
            aria-pressed={view === "globo"}
            onClick={() => setView("globo")}
          >
            <span aria-hidden="true">◉</span> Globo
          </button>
          <button
            type="button"
            className={view === "lista" ? "active" : ""}
            aria-pressed={view === "lista"}
            onClick={() => setView("lista")}
          >
            <span aria-hidden="true">▦</span> Lista
          </button>
        </div>
      </div>

      {view === "globo" ? (
        <>
          {/* key: ao trocar de categoria o globo recomeça com os novos pontos */}
          <SkillsGlobe key={category} skills={filtered} paused={paused} />
          <p className="skills-hint" id="skills-globe-hint">Arraste ou use as setas para girar. Os ícones abrem a documentação em nova aba.</p>
          <button type="button" className="globe-pause" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? "Retomar giro" : "Pausar giro"}</button>
        </>
      ) : (
        <ul className="skills-grid">
          {filtered.map((skill) => {
            return (
              <li key={skill.name}>
                <a href={skill.link} target="_blank" rel="noopener noreferrer" style={{ "--skill": skill.color }}>
                  <img src={skill.icon} width="34" height="34" alt="" />
                  <span>{skill.name}</span>
                  <small>{skill.category}</small>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

