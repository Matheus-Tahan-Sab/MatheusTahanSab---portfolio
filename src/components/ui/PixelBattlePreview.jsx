import { useState } from 'react';

const poster = '/images/editor/pokemon-battle-poster.webp';

export default function PixelBattlePreview() {
  const [paused, setPaused] = useState(false);
  return <>
    <picture className="video-battle-picture">
      <source media="(prefers-reduced-motion: reduce)" srcSet={poster} />
      <img className="video-monitor-image" src={paused ? poster : '/images/editor/pokemon-battle.gif'} width="320" height="180" alt="Batalha ilustrativa em pixel art entre Swampert e Gengar." fetchPriority="high" />
    </picture>
    <button className="video-battle-toggle" type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Reproduzir animação da batalha' : 'Pausar animação da batalha'}><span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span> {paused ? 'Reproduzir' : 'Pausar'}</button>
  </>;
}
