import '../styles/cine-sab.css';
import '../styles/doorman-scenes.css';
import { useEffect, useRef, useState } from 'react';
import Contact from './Contact.jsx';
import ScreeningGuide from '../components/ScreeningGuide/ScreeningGuide.jsx';
import EditorIntro from '../components/EditorIntro/EditorIntro.jsx';
import { videoProjects } from '../data/videoProjects.js';

const services = [
  { format: '01 / LONG FORM', title: 'Uma gameplay. Uma história.', text: 'Dos melhores momentos ao vídeo completo: cortes, contexto e humor no ritmo do seu canal.', tags: ['YouTube', 'Gameplays', 'Vlogs'], icon: '↗' },
  { format: '02 / SHORT FORM', title: 'Direto ao ponto.', text: 'Enquadramento, legendas e timing para transformar uma boa ideia em um vídeo que funciona no celular.', tags: ['Shorts', 'Reels', 'TikTok'], icon: '↟' },
  { format: '03 / HIGHLIGHTS', title: 'Esse momento merece replay.', text: 'Jogadas, reações e resenhas de live. Eu encontro os momentos e dou a eles o destaque que merecem.', tags: ['Lives', 'Clipes', 'Humor'], icon: '↺' },
];

function SectionHeading({ number, label, children }) {
  return <div className="cut-section-heading"><p className="cut-label"><span>{number}</span> {label}</p><h2>{children}</h2></div>;
}

function WorkCard({ project, index, onPlay }) {
  const vertical = project.category === 'Vídeos verticais';
  return <article className={'cut-work' + (vertical ? ' cut-work-short' : '')}>
    <button className="cut-work-cover" onClick={() => onPlay(project)} aria-label={'Assistir: ' + project.title}>
      <img src={project.thumbnail} alt="" loading="lazy" width={vertical ? 360 : 640} height={vertical ? 640 : 360} />
      <span className="cut-work-top"><span>{vertical ? '9:16 / SHORT' : '16:9 / YOUTUBE'}</span><span>{String(index + 1).padStart(2, '0')}</span></span>
      <span className="cut-play" aria-hidden="true">▶</span>
      <span className="cut-watch">Assistir ao vídeo <span aria-hidden="true">↗</span></span>
    </button>
    <div className="cut-work-copy"><p className="cut-label">{project.description}</p><h4>{project.title}</h4><a href={project.href} target="_blank" rel="noopener noreferrer">Abrir no YouTube <span aria-hidden="true">↗</span></a></div>
  </article>;
}

function VideoPlayer({ project, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    if (!project) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element.close(); document.body.style.overflow = previousOverflow; };
  }, [project]);
  if (!project) return null;
  return <dialog ref={dialog} className="cut-player" aria-labelledby="cut-player-title" onClose={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="cut-player-heading"><h2 id="cut-player-title">{project.title}</h2><button type="button" onClick={onClose} aria-label="Fechar vídeo">✕</button></div>
    <iframe className={project.category === 'Vídeos verticais' ? 'cut-player-vertical' : ''} src={'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(project.id)} title={project.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
    <p>Prefere assistir por lá? <a href={project.href} target="_blank" rel="noopener noreferrer">Abrir no YouTube ↗</a></p>
  </dialog>;
}

function currentRoom() {
  switch (window.location.hash) {
    case '#edicao-trabalhos': return 'screen';
    case '#edicao-servicos':
    case '#edicao-processo': return 'office';
    case '#edicao-contato':
    case '#edicao-convite': return 'letter';
    default: return 'booth';
  }
}

export default function VideoEditing() {
  const [room, setRoom] = useState(currentRoom);
  const [letterOpen, setLetterOpen] = useState(false);
  useEffect(() => {
    function navigate() {
      if (window.location.hash === '#conteudo') return;
      setPlaying(null);
      setLetterOpen(false);
      setRoom(currentRoom());
      requestAnimationFrame(() => {
        const target = document.getElementById(window.location.hash.slice(1));
        if (window.location.hash === '#edicao-contato' || !target) window.scrollTo({top:0,behavior:'instant'});
        else target.scrollIntoView({behavior:'instant'});
      });
    }
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, []);
  useEffect(() => {
    if (!letterOpen || room !== 'letter') return;
    const contact = document.getElementById('edicao-contato');
    if (!contact) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    contact.scrollIntoView({
      behavior: reducedMotion ? 'instant' : 'smooth',
      block: 'start',
    });
  }, [letterOpen, room]);
  const [playing, setPlaying] = useState(null);
  const [format, setFormat] = useState('all');
  const longVideos = videoProjects.filter(project => project.category !== 'Vídeos verticais');
  const shorts = videoProjects.filter(project => project.category === 'Vídeos verticais');
  return <div className="video-portfolio">
    {room === 'booth' && <EditorIntro />}
    {room !== 'booth' && <a href="#edicao" className="back-booth">← Voltar à bilheteria</a>}

    {room === 'screen' && <section className="cut-section cut-works" id="edicao-trabalhos" tabIndex={-1} aria-labelledby="cut-work-title">
      <ScreeningGuide key="screen" />
      <div className="cinema-filter" role="group" aria-label="Filtrar vídeos por formato">
        {[['all', 'Todos'], ['short', 'Shorts'], ['long', 'Vídeos longos']].map(([id, label]) =>
          <button type="button" key={id} aria-pressed={format === id} onClick={() => setFormat(id)}>{label}</button>)}
      </div>
      {format !== 'short' && longVideos.length > 0 && <div className="cut-work-group"><div className="cut-group-heading"><h3>Vídeos longos</h3><span>HISTÓRIAS COM TEMPO PRA ACONTECER / 16:9</span></div><div className="cut-long-grid">{longVideos.map((project, index) => <WorkCard key={project.id} project={project} index={index} onPlay={setPlaying} />)}</div></div>}
      {format !== 'long' && shorts.length > 0 && <div className="cut-work-group cut-short-group"><div className="cut-short-note"><p className="cut-label">FORMATO VERTICAL / 9:16</p><h3>POUCOS<br />SEGUNDOS.<br /><em>BOAS IDEIAS.</em></h3><p>Vídeos curtos, com ritmo, legendas e personalidade para acompanhar quem assiste pelo celular.</p><img className="studio-film" loading="lazy" src="/images/doorman/intro.webp" alt="O Doorman escolhe um trecho da película." /><p className="cut-label">SHORTS / REELS / TIKTOK</p></div><div className="cut-shorts-grid">{shorts.map((project, index) => <WorkCard key={project.id} project={project} index={index + longVideos.length} onPlay={setPlaying} />)}</div></div>}
    </section>}
    {room === 'office' && <><section className="cut-section cut-services" id="edicao-servicos" aria-labelledby="cut-services-title">
      <ScreeningGuide key="office" room="office" />
      <div className="cut-service-list">{services.map(service => <article key={service.format}><div className="cut-service-symbol" aria-hidden="true">{service.icon}</div><div><p className="cut-label">{service.format}</p><h3>{service.title}</h3><p>{service.text}</p></div><ul aria-label="Formatos">{service.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></article>)}</div>
    </section>

    <section className="cut-section cut-process-section" id="edicao-processo" aria-labelledby="cut-process-title">
      <div className="studio-scene scene-process"><div><SectionHeading number="04" label="Ilha de edição"><span id="cut-process-title">DO BRUTO<br /><em>AO CORTE FINAL.</em></span></SectionHeading></div><div className="cinema-speaker"><p className="studio-dialogue"><small>Doorman</small>Olha, é nesta mesa que o Sab monta os vídeos. Puxa uma cadeira!</p><img src="/images/doorman/process.webp" alt="" loading="lazy" /></div></div>
      <ol className="cut-process"><li><span>01</span><h3>A gente conversa.</h3><p>Você me conta sobre o canal, manda suas referências e o material. Alinhamos formato, estilo e prazo.</p></li><li><span>02</span><h3>Eu entro na timeline.</h3><p>Seleciono os momentos, construo o ritmo e combino imagem, som e texto com a ideia que definimos.</p></li><li><span>03</span><h3>Ajustamos juntos.</h3><p>Você vê o resultado, traz seu feedback e refinamos a edição até a entrega no formato combinado.</p></li></ol>
    </section></>}
    {room === 'letter' && <><div className="cut-contact-intro" id="edicao-convite"><div className="studio-scene scene-contact"><div><p className="cut-label">05 / Contato</p><h2>UM CONVITE<br /><em>PRA VOCÊ.</em></h2></div><div className="cinema-speaker"><p className="studio-dialogue"><small>Doorman</small>Esta carta é pra você. Abra e escolha como quer falar com o Sab.</p><button type="button" className="hand-letter" aria-label={letterOpen ? 'Fechar carta' : 'Receber a carta'} aria-expanded={letterOpen} onClick={() => setLetterOpen(!letterOpen)}><img src="/images/doorman/contact.webp" alt="" /></button></div></div></div>
    {letterOpen && <Contact editing />}
    </>}
    <VideoPlayer project={playing} onClose={() => setPlaying(null)} />
  </div>;
}
