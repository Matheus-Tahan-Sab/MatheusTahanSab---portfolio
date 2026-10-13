import { useState } from 'react';

const companions = ['swampert', 'lucario', 'gengar'];

export default function PokemonCompanion() {
  const [paused, setPaused] = useState(() => document.documentElement.dataset.motion === 'paused');
  function toggleMotion() {
    const next = !paused;
    setPaused(next);
    document.documentElement.dataset.motion = next ? 'paused' : 'running';
    try { localStorage.setItem('mts-portfolio-motion', next ? 'paused' : 'running'); } catch { /* A pausa funciona sem armazenamento. */ }
  }
  return (
    <div className="pokemon-world">
      <div className="pokemon-roaming" aria-hidden="true">
        {companions.map(name => <div className={`pokemon-walker walker-${name}`} key={name}><span className="pokemon-walk-sprite" /></div>)}
      </div>
      <button type="button" className="motion-toggle" onClick={toggleMotion} aria-pressed={paused}>{paused ? '▶ Retomar Pokémon' : 'Ⅱ Pausar Pokémon'}</button>
    </div>
  );
}
