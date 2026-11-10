import { useEffect, useRef, useState } from 'react';
import './EditorIntro.css';

export default function EditorIntro() {
  const [entering, setEntering] = useState(false);
  const timer = useRef(null);
  const [greeting, setGreeting] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setGreeting(false), 1100);
    return () => clearTimeout(id);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  function enterCinema(event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    if (timer.current !== null) return;
    const destination = event.currentTarget.hash;
    setEntering(true);
    timer.current = setTimeout(() => {
      setEntering(false);
      timer.current = null;
      window.location.hash = destination;
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
      <p className="ticket-balloon" aria-live="polite">{greeting ? 'Bem-vindo ao Cine Sab!' : 'Aonde eu te levo hoje?'}</p>
      <div className="ticket-cat" aria-hidden="true"><img src="/images/doorman/cat.webp" alt="" /></div>
      <nav className="booth-replies" aria-label="Responder ao Doorman">
        <a href="#edicao-trabalhos" onClick={enterCinema}>Quero assistir aos vídeos</a>
        <a href="#edicao-servicos" onClick={enterCinema}>Quero conhecer os serviços</a>
        <a href="#edicao-contato" onClick={enterCinema}>Quero falar com o Sab</a>
      </nav>
    </div>
  </section>;
}
