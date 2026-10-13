import { useState } from 'react';
import PokemonCompanion from '../ui/PokemonCompanion.jsx';

export default function Footer() {
  const [paused, setPaused] = useState(() => document.documentElement.dataset.motion === 'paused');
  function toggleMotion() {
    const next = !paused;
    setPaused(next);
    document.documentElement.dataset.motion = next ? 'paused' : 'running';
    try { localStorage.setItem('mts-portfolio-motion', next ? 'paused' : 'running'); } catch { /* A pausa funciona sem armazenamento. */ }
  }
  return (
    <footer className="site-footer">
      <div className="container pokemon-footer-stage">
        <div className="pokemon-trail"><PokemonCompanion name="Gengar" number="094" variant="gengar" /></div>
        <button type="button" className="motion-toggle" onClick={toggleMotion} aria-pressed={paused}>{paused ? 'Retomar animações' : 'Pausar animações'}</button>
      </div>
      <div className="container footer-inner">
        <div><strong>MATHEUS TAHAN SAB</strong><p>Construindo minha jornada, um projeto por vez.</p></div>
        <div className="footer-end"><a href="#inicio">Voltar ao início ↑</a><p>© {new Date().getFullYear()} · Portfólio acadêmico</p></div>
      </div>
    </footer>
  );
}
