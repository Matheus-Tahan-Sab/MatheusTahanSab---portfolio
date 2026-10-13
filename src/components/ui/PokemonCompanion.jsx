import { useState } from 'react';

export default function PokemonCompanion({ name, number, variant, interactive = false }) {
  const [jump, setJump] = useState(0);
  const sprite = <span className="pokemon-sprite" key={jump} data-jump={jump > 0 ? 'true' : undefined}><img src={`/images/pokemon/${name.toLowerCase()}.png`} alt="" width="96" height="96" decoding="async" /></span>;
  return (
    <div className={`pokemon-companion pokemon-${variant}`}>
      {interactive ? <button type="button" className="pokemon-interaction" onClick={() => setJump(value => value + 1)} aria-label={`Fazer ${name} pular`} title={`Clique em ${name} para um pulinho`}>{sprite}</button> : <div className="pokemon-idle" aria-hidden="true">{sprite}</div>}
      <span className="pokemon-caption"><small>#{number}</small> {name}{interactive ? <small> · toque para interagir</small> : null}</span>
    </div>
  );
}
