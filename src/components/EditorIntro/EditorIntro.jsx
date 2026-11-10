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
        <div className="comic-intro-actions"><a href="#edicao-trabalhos" className="comic-action">Ver o que está em cartaz <span aria-hidden="true">▶</span></a><a href="#edicao-contato" className="comic-contact-link">Bora conversar? ↗</a></div>
        
      </div>
      <div className="studio-door" aria-label="O Doorman recebe você na bilheteria do Cine Sab">
        <span className="cinema-marquee" aria-hidden="true">CINE SAB</span><span className="studio-bubble">Seu ingresso! A sala de projeção é logo ali.</span>
        {['peek', 'welcome', 'point'].map(pose => <img key={pose} className={'door-' + pose} src={'/images/doorman/' + pose + '.webp'} alt="" />)}
      </div>
    </div>
    <div className="comic-bottom-rail" aria-hidden="true"><div className="comic-rail-track">{[0, 1].map(copy => <span key={copy}>GAMEPLAYS <i>✦</i> VÍDEOS LONGOS <i>✦</i> SHORTS <i>✦</i> HUMOR <i>✦</i> RITMO <i>✦</i> </span>)}</div></div>
  </section>;
}
