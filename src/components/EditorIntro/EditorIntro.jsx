import { useEffect, useRef, useState } from 'react';
import './EditorIntro.css';

export default function EditorIntro() {
  const [destination, setDestination] = useState('');
  const entering = Boolean(destination);
  const [called, setCalled] = useState(false);
  const firstReply = useRef(null);
  const timer = useRef(null);
  useEffect(() => {
    if (called) firstReply.current?.focus({preventScroll: true});
  }, [called]);
  useEffect(() => () => clearTimeout(timer.current), []);
  function enterCinema(event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    if (timer.current !== null) return;
    const destination = event.currentTarget.hash;
    setDestination(destination);
    timer.current = setTimeout(() => {
      setDestination('');
      timer.current = null;
      window.location.hash = destination;
    }, 2100);
  }
  return <section id="edicao" className="ticket-room" aria-labelledby="booth-title" data-entering={entering} data-called={called}>
    <div id="edicao-sobre" className="ticket-anchor" />
      <article className="ticket-bio">
        <p>Cine Sab</p><h1 id="booth-title">Matheus<br/> Tahan Sab</h1><strong>EDITOR DE VÍDEO</strong>
        <p>Edito gameplays, vídeos longos e shorts no DaVinci Resolve, com humor e o ritmo do seu canal.</p>
      </article>
    <div className="ticket-set">
      <img className="ticket-host" src="/images/doorman/welcome.webp" alt="Doorman na bilheteria" />
      <img className="ticket-guide" src="/images/doorman/turn.webp" alt="" />
      <div className="counter-edge" aria-hidden="true" />

      <p className="ticket-balloon" aria-live="polite">{destination === '#edicao-trabalhos' ? 'Seu ingresso. A sessão já vai começar!'
        : destination === '#edicao-servicos' ? 'Por aqui. Vou abrir o escritório.'
        : destination === '#edicao-contato' ? 'Tenho uma carta para você. Me acompanhe.'
        : called ? 'Aonde eu te levo hoje?' : 'Um visitante! Pode tocar a campainha.'}</p>
      <div className="ticket-cat" aria-hidden="true"><span className="ava-walker" /></div>
    </div>
      <nav className="booth-replies" aria-label="Responder ao Doorman">
        {!called ? <button type="button" className="desk-bell" onClick={() => setCalled(true)}><i aria-hidden="true" />Tocar a campainha</button> : <>
        <a ref={firstReply} href="#edicao-trabalhos" onClick={enterCinema}>Quero assistir aos vídeos</a>
        <a href="#edicao-servicos" onClick={enterCinema}>Quero conhecer os serviços</a>
        <a href="#edicao-contato" onClick={enterCinema}>Quero falar com o Sab</a></>}
      </nav>
  </section>;
}
