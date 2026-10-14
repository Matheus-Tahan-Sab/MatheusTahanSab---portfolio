import { useEffect, useState } from 'react';

const companions = ['swampert', 'lucario', 'gengar', 'garchomp', 'jolteon', 'charizard'];
const preferenceKey = 'mts-portfolio-companions-v1';

export default function PokemonCompanion() {
  const [enabled, setEnabled] = useState(() => {
    try { return localStorage.getItem(preferenceKey) === 'on'; } catch { return false; }
  });
  const [formFocused, setFormFocused] = useState(false);
  useEffect(() => {
    function updateFocus(event) {
      const target = event.type === 'focusout' ? event.relatedTarget : event.target;
      setFormFocused(Boolean(target instanceof Element && target.closest('form')));
    }
    document.addEventListener('focusin', updateFocus);
    document.addEventListener('focusout', updateFocus);
    return () => {
      document.removeEventListener('focusin', updateFocus);
      document.removeEventListener('focusout', updateFocus);
    };
  }, []);
  function toggleCompanions() {
    const next = !enabled;
    setEnabled(next);
    try { localStorage.setItem(preferenceKey, next ? 'on' : 'off'); } catch { /* A escolha funciona sem armazenamento. */ }
  }
  return (
    <div className="pokemon-world" data-form-focused={formFocused ? 'true' : undefined}>
      {enabled ? <div className="pokemon-roaming" aria-hidden="true">
        {companions.map(name => <div className={`pokemon-walker walker-${name}`} key={name}><span className="pokemon-walk-sprite" /></div>)}
      </div> : null}
      <button type="button" className="motion-toggle" onClick={toggleCompanions} aria-label="Companheiros Pokémon" aria-pressed={enabled} title="Ativar ou desligar os Pokémon que passeiam pelas bordas">{enabled ? 'Pokémon: desligar' : 'Pokémon: ligar'}</button>
    </div>
  );
}
