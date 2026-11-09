import { useEffect, useRef, useState } from 'react';
import './EditorIntro.css';

export default function EditorIntro() {
  const section = useRef(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const element = section.current;
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (observer) observer.observe(element);
    else setVisible(true);
    const syncVisibility = () => setTabVisible(!document.hidden);
    syncVisibility();
    document.addEventListener('visibilitychange', syncVisibility);
    return () => { observer?.disconnect(); document.removeEventListener('visibilitychange', syncVisibility); };
  }, []);
  return <section ref={section} className="comic-intro" id="edicao" aria-labelledby="comic-intro-title" data-running={visible && tabVisible && !paused}>
    <div id="edicao-sobre" className="comic-intro-anchor" />
    <div className="comic-frame-heading"><p>QUADRO 01 <span>/</span> SOBRE MIM</p><button className="comic-motion-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? '▶ Ativar movimento' : 'Ⅱ Pausar movimento'}</button></div>
    <div className="comic-opening">
      <div className="comic-bio">
        <span className="comic-speech">PRAZER, PODE ME CHAMAR DE</span>
        <h1 id="comic-intro-title">SAB<span>.</span></h1>
        <p className="comic-profession">EDITOR DE VÍDEO<span aria-hidden="true"> ↗</span></p>
        <p className="comic-bio-text">Sou Matheus Tahan Sab. Edito gameplays, vídeos longos e shorts no DaVinci Resolve, com humor e o ritmo do seu canal.</p>
        <div className="comic-intro-actions"><a href="#edicao-trabalhos" className="comic-action">Ver meus trabalhos <span aria-hidden="true">▶</span></a><a href="#edicao-contato" className="comic-contact-link">Bora conversar? ↗</a></div>
        <span className="comic-page-note">GAMER DO OUTRO LADO DA TIMELINE.</span>
      </div>
      <div className="comic-motion-panel" aria-hidden="true">
        <div className="comic-speed-lines" />
        <span className="comic-panel-caption">ENQUANTO ISSO, NA TIMELINE...</span>
        <div className="comic-impact"><span>CORTE!</span></div>
        <span className="comic-float-tag comic-tag-top">TIMING CERTO.</span>
        <div className="comic-mini-timeline"><div className="comic-mini-ruler"><span>VÍDEO</span><span>ÁUDIO</span><span>FX</span></div><div className="comic-mini-clips"><i>GAMEPLAY</i><i>HUMOR</i><i>RITMO</i></div><div className="comic-mini-wave">{Array.from({ length: 24 }, (_, index) => <i key={index} style={{ '--bar': ((index * 17 + 13) % 70) + 25 + '%', '--delay': (index % 6) * -.16 + 's' }} />)}</div><span className="comic-mini-playhead" /></div>
        <span className="comic-float-tag comic-tag-bottom">É AQUI QUE O VÍDEO ACONTECE.</span>
        <span className="comic-corner-mark">SAB / EDIT ROOM</span>
      </div>
    </div>
    <div className="comic-bottom-rail" aria-hidden="true"><div className="comic-rail-track">{[0, 1].map(copy => <span key={copy}>GAMEPLAYS <i>✦</i> VÍDEOS LONGOS <i>✦</i> SHORTS <i>✦</i> HUMOR <i>✦</i> RITMO <i>✦</i> </span>)}</div></div>
  </section>;
}
