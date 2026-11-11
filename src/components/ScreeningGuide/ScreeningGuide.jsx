import { useEffect, useRef, useState } from 'react';
import './ScreeningGuide.css';

export default function ScreeningGuide({ room = 'screen' }) {
  const services = room === 'office';
  const repliesId = `${room}-replies`;
  const [talking, setTalking] = useState(false);
  const [destination, setDestination] = useState('');
  const host = useRef(null);
  const firstChoice = useRef(null);
  const timer = useRef(null);
  const stage = useRef(null);

  useEffect(() => {
    for (const src of ['/images/doorman/ask-route.webp', '/images/doorman/invite-backstage.webp', '/images/doorman/darkroom.webp']) {
      const image = new Image();
      image.src = src;
    }
    return () => clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (talking) firstChoice.current?.focus({ preventScroll: true });
  }, [talking]);

  function closeConversation() {
    setTalking(false);
    host.current?.focus({ preventScroll: true });
  }

  function travel(event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    if (timer.current !== null) return;
    const hash = event.currentTarget.hash;
    setDestination(hash);
    stage.current?.scrollIntoView({ behavior: 'instant', block: 'center' });
    timer.current = setTimeout(() => {
      window.location.hash = hash;
    }, 2400);
  }

  const contact = destination === '#edicao-convite';
  return <div ref={stage} className={`studio-scene ${services ? 'scene-services' : 'scene-works'} screening-guide`}
    data-traveling={Boolean(destination)} data-contact={contact} data-screen={destination === '#edicao-trabalhos'}
    onKeyDown={event => {
      if (event.key === 'Escape' && !destination) closeConversation();
    }}>
    <div className="guide-copy">
      <div className="cut-section-heading" hidden={talking || Boolean(destination)}>
        <p className="cut-label"><span>{services ? '03' : '02'}</span> {services ? 'Serviços' : 'Sala de projeção'}</p>
        <h2>{services ? <span id="cut-services-title">QUAL É O<br /><em>FORMATO?</em></span>
          : <span id="cut-work-title">TRABALHOS<br /><em>EM CARTAZ.</em></span>}</h2>
      </div>
      {talking && !destination && <div className="guide-conversation" id={repliesId}>
        <p className="guide-question">{services ? 'Já escolheu o formato? Aonde vamos agora?' : 'Gostou da sessão? Aonde vamos agora?'}</p>
        <nav aria-label={services ? "Responder ao Doorman no laboratório" : "Responder ao Doorman na sala de projeção"}>
          <a ref={firstChoice} href={services ? "#edicao-trabalhos" : "#edicao-servicos"} onClick={travel}>{services ? "Quero assistir aos vídeos" : "Quero conhecer os bastidores"}</a>
          <a href="#edicao-convite" onClick={travel}>Quero falar com o Sab</a>
          <button type="button" onClick={closeConversation}>{services ? "Vou continuar vendo os serviços" : "Vou continuar assistindo"}</button>
        </nav>
      </div>}
      {destination && <div className="guide-door-frame" aria-hidden="true">
        <div className="guide-destination" />
        <div className="guide-door-leaf"><span /></div>
      </div>}
    </div>
    <div className="cinema-speaker guide-speaker">
      <p className="studio-dialogue" aria-live="polite"><small>Doorman</small>
        {destination ? (contact ? 'Tenho uma carta para você. Me acompanhe.' : services ? 'Por aqui. A sessão já vai começar!' : 'Por aqui. Vamos conhecer os bastidores!')
          : talking ? (services ? 'Posso te mostrar os vídeos do Sab ou levar você para conversar com ele.' : 'Posso te mostrar como tudo é feito ou levar você até o Sab.')
          : services ? 'Já acendi a luz do laboratório. Escolha um formato ou toque em mim para explorar o cinema.' : 'Apaguei as luzes. Escolha um vídeo ou toque em mim para explorar o cinema.'}
      </p>
      <button ref={host} type="button" className="guide-host" disabled={Boolean(destination)}
        aria-label="Conversar com o Doorman" aria-expanded={talking} aria-controls={talking ? repliesId : undefined}
        onClick={() => talking ? closeConversation() : setTalking(true)}>
        <img src={destination ? (contact ? '/images/doorman/contact.webp' : '/images/doorman/invite-backstage.webp')
          : talking ? '/images/doorman/ask-route.webp' : services ? '/images/doorman/services.webp' : '/images/doorman/works.webp'} alt="" />
      </button>
    </div>
    {destination && <div className="guide-arrival" aria-hidden="true" />}
  </div>;
}
