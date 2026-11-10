import { useEffect, useRef, useState } from 'react';
import './EditorIntro.css';

export default function EditorIntro() {
  const [entering, setEntering] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  function enterCinema(event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    if (timer.current !== null) return;
    setEntering(true);
    timer.current = setTimeout(() => {
      setEntering(false);
      timer.current = null;
      window.location.hash = 'edicao-trabalhos';
      const room = document.getElementById('edicao-trabalhos');
      room?.focus({ preventScroll: true });
      room?.scrollIntoView({ behavior: 'instant' });
    }, 1600);
  }
  return <section id="edicao" className="ticket-room" aria-labelledby="booth-title" data-entering={entering}>
    <div id="edicao-sobre" className="ticket-anchor" />
    <div className="ticket-set">
      <div className="ticket-door" aria-hidden="true"><i /></div>
      <img className="ticket-host" src="/images/doorman/welcome.webp" alt="Doorman na bilheteria" />
      <img className="ticket-guide" src="/images/doorman/turn.webp" alt="" />
      <article className="ticket-bio">
        <p>Cine Sab</p><h1 id="booth-title">Matheus<br/>Tahan Sab</h1><strong>EDITOR DE VÍDEO</strong>
        <p>Edito gameplays, vídeos longos e shorts no DaVinci Resolve, com humor e o ritmo do seu canal.</p>
      </article>
      <p className="ticket-balloon">Pegue o ingresso. Eu abro a porta!</p>
      <div className="ticket-cat" aria-hidden="true"><img src="/images/doorman/cat.webp" alt="" /></div>
      <a href="#edicao-trabalhos" className="ticket-stub" onClick={enterCinema}>Retirar ingresso <b aria-hidden="true">➜</b></a>
    </div>
  </section>;
}
