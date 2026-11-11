import { useEffect, useRef, useState } from 'react';
import './EditorIntro.css';

export default function EditorIntro() {
  const [destination, setDestination] = useState('');
  const entering = Boolean(destination);
  const [called, setCalled] = useState(false);
  const [offering, setOffering] = useState(false);
  const choosing = called && !offering && !entering;
  const ticket = useRef(null);
  const firstReply = useRef(null);
  const timer = useRef(null);
  useEffect(() => {
    if (offering) ticket.current?.focus({preventScroll: true});
    else if (called) firstReply.current?.focus({preventScroll: true});
  }, [called, offering]);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (called) {
      const plate = new Image();
      plate.src = '/images/doorman/darkroom.webp';
    }
  }, [called]);
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
    }, 3400);
  }
  return <section id="edicao" className="ticket-room" aria-labelledby="booth-title" data-entering={entering} data-called={called} data-choosing={choosing} data-offering={offering} data-portal={entering} data-contact={destination === '#edicao-contato'} data-darkroom={destination === '#edicao-servicos'}>
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
      <img className="ticket-host" src={choosing ? '/images/doorman/thinking.webp' : '/images/doorman/welcome.webp'} alt="Doorman na bilheteria" />
      {entering && !offering && <img className="booth-answer-pose"
        src={destination === '#edicao-contato' ? '/images/doorman/contact.webp' : '/images/doorman/services.webp'} alt="" />}
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

      {choosing && <nav className="booth-choices" aria-label="Responder ao Doorman">
        <a ref={firstReply} href="#edicao-trabalhos" onClick={offerTicket}>Ver vídeos</a>
        <a href="#edicao-servicos" onClick={enterCinema}>Ver serviços</a>
        <a href="#edicao-contato" onClick={enterCinema}>Falar com o Sab</a>
      </nav>}
      {offering && !entering && <button type="button" className="booth-return"
        onClick={() => setOffering(false)}>Voltar às opções</button>}
      <p className="ticket-balloon" aria-live="polite">{destination === '#edicao-trabalhos' ? 'Seu ingresso. A sessão já vai começar!'
        : destination === '#edicao-servicos' ? 'Por aqui. A luz vermelha já está acesa.'
        : destination === '#edicao-contato' ? 'Tenho uma carta para você. Me acompanhe.'
        : offering ? 'Pegue seu ingresso. Guarde esse lugar na primeira fila!' : called ? 'Aonde eu te levo hoje?' : 'Um visitante! Pode tocar a campainha.'}</p>
    </div>
    <div className="room-arrival" aria-hidden="true" />
    </div>

  </section>;
}
