import { useEffect, useRef, useState } from 'react';
import './EditorIntro.css';

export default function EditorIntro() {
  const [destination, setDestination] = useState('');
  const entering = Boolean(destination);
  const [called, setCalled] = useState(false);
  const [offering, setOffering] = useState(false);
  const ticket = useRef(null);
  const firstReply = useRef(null);
  const timer = useRef(null);
  useEffect(() => {
    if (offering) ticket.current?.focus({preventScroll: true});
    else if (called) firstReply.current?.focus({preventScroll: true});
  }, [called, offering]);
  useEffect(() => () => clearTimeout(timer.current), []);
  function offerTicket(event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setOffering(true);
  }
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
    }, destination === '#edicao-trabalhos' ? 3400 : 2100);
  }
  return <section id="edicao" className="ticket-room" aria-labelledby="booth-title" data-entering={entering} data-called={called} data-offering={offering} data-screening={destination === '#edicao-trabalhos'}>
    <div id="edicao-sobre" className="ticket-anchor" />
      <article className="ticket-bio">
        <p>Cine Sab</p><h1 id="booth-title">Matheus<br/> Tahan Sab</h1><strong>EDITOR DE VÍDEO</strong>
        <p>Edito gameplays, vídeos longos e shorts no DaVinci Resolve, com humor e o ritmo do seu canal.</p>
      </article>
    <div className="booth-viewport">
      <div className="ticket-set">
      <div className="booth-art" aria-hidden="true">
        <div className="projection-opening"><div className="projection-leaf" /></div>
        <div className="projected-light" />
      </div>
      <img className="ticket-host" src="/images/doorman/welcome.webp" alt="Doorman na bilheteria" />
      <img className="ticket-guide" src="/images/doorman/turn.webp" alt="" />
      {offering && <div className="ticket-giver">
        <img src="/images/doorman/escort.webp" alt="" />
        {!entering && <a ref={ticket} className="admission-ticket" href="#edicao-trabalhos"
          aria-label="Pegar ingresso" onClick={enterCinema} />}
      </div>}
      <div className="counter-props">
        <img className="counter-tableau" src="/images/doorman/work-counter.webp" alt="" />
        <button type="button" className="counter-bell" disabled={called}
          aria-label="Tocar a campainha" onClick={() => setCalled(true)}>
          <img src="/images/doorman/counter-bell.webp" alt="" />
        </button>
      </div>

      <p className="ticket-balloon" aria-live="polite">{destination === '#edicao-trabalhos' ? 'Seu ingresso. A sessão já vai começar!'
        : destination === '#edicao-servicos' ? 'Por aqui. Vou abrir o escritório.'
        : destination === '#edicao-contato' ? 'Tenho uma carta para você. Me acompanhe.'
        : offering ? 'Pegue seu ingresso. Guarde esse lugar na primeira fila!' : called ? 'Aonde eu te levo hoje?' : 'Um visitante! Pode tocar a campainha.'}</p>
    </div>
    <div className="auditorium-arrival" aria-hidden="true" />
    </div>
      {called && <nav className="booth-replies" aria-label="Responder ao Doorman">
        {offering ? <button type="button" className="desk-bell" disabled={entering} onClick={() => setOffering(false)}>Voltar às opções</button> : <>
        <a ref={firstReply} href="#edicao-trabalhos" onClick={offerTicket}>Quero assistir aos vídeos</a>
        <a href="#edicao-servicos" onClick={enterCinema}>Quero conhecer os serviços</a>
        <a href="#edicao-contato" onClick={enterCinema}>Quero falar com o Sab</a></>}
      </nav>}
  </section>;
}
