import '../styles/cine-sab.css';
import '../styles/doorman-scenes.css';
import { useEffect, useRef, useState } from 'react';
import Contact from './Contact.jsx';
import '../styles/portfolio-hq.css';

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


function PanelLink({ href, children, pose = 'invite-backstage' }) {
  return <a className="hq-panel-link" href={href}>
    <span className="hq-link-art" aria-hidden="true"><img src={'/images/doorman/' + pose + '.webp'} alt="" loading="lazy" /></span>
    <span className="hq-link-bubble">{children} <span aria-hidden="true">↗</span></span>
  </a>;
}

export default function VideoEditing() {
  const [playing, setPlaying] = useState(null);
  const [format, setFormat] = useState('all');
  useEffect(() => {
    const navigate = () => setPlaying(null);
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, []);
  const filtered = videoProjects.filter(project => format === 'all' ||
    (format === 'short' ? project.category === 'Vídeos verticais' : project.category !== 'Vídeos verticais'));
  return <div className="video-portfolio hq-portfolio">
    <section className="hq-opening" id="edicao" aria-labelledby="hq-title">
      <div className="hq-cover-copy">
        <p className="hq-kicker">SAB / EDIÇÃO DE VÍDEO</p>
        <h1 id="hq-title">BOAS HISTÓRIAS.<br /><em>BONS CORTES.</em></h1>
        <p>Sou o Sab, Matheus Tahan Sab. Edito gameplays, vídeos longos e shorts no DaVinci Resolve, com humor e o ritmo do seu canal.</p>
        <div className="hq-actions"><a className="hq-primary" href="#edicao-trabalhos">Ver meus trabalhos <span aria-hidden="true">↓</span></a><a href="#edicao-contato">Falar com o Sab ↗</a></div>
        <span className="hq-edition">CINE SAB — UMA HISTÓRIA EM QUADROS</span>
      </div>
      <div className="hq-cover-art">
        <p className="hq-speech">Pode entrar. Os vídeos estão logo no próximo quadro.</p>
        <span className="hq-orbit" aria-hidden="true">SAB!</span>
        <img src="/images/doorman/salute.webp" alt="Doorman cumprimenta você na abertura da HQ." />
        <span className="hq-art-caption">Seu guia entre um quadro e outro.</span>
      </div>
    </section>

    <section className="hq-section" id="edicao-trabalhos" aria-labelledby="hq-work-title">
      <header className="hq-section-head"><div><p className="hq-kicker">01 / TRABALHOS</p><h2 id="hq-work-title">DÊ O <em>PLAY.</em></h2></div><p>Vídeos longos, cortes rápidos e histórias que merecem ser vistas.</p></header>
      <div className="cinema-filter" role="group" aria-label="Filtrar vídeos por formato">
        {[['all','Todos'],['long','Vídeos longos'],['short','Shorts']].map(([id,label])=><button type="button" key={id} aria-pressed={format===id} onClick={()=>setFormat(id)}>{label}</button>)}
      </div>
      <div className="hq-videos">{filtered.map((project,index)=><WorkCard key={project.id} project={project} index={index} onPlay={setPlaying}/>)}</div>
      <PanelLink href="#edicao-servicos">Viu o resultado? Vem conhecer os bastidores.</PanelLink>
    </section>

    <section className="hq-section hq-services" id="edicao-servicos" aria-labelledby="hq-services-title">
      <header className="hq-section-head"><div><p className="hq-kicker">02 / SERVIÇOS</p><h2 id="hq-services-title">CADA VÍDEO,<br /><em>UM RITMO.</em></h2></div><p>Do conteúdo completo ao momento que merece replay.</p></header>
      <div className="hq-service-grid">{services.map(service=><article key={service.format}><p className="hq-kicker">{service.format}</p><h3>{service.title}</h3><p>{service.text}</p><ul aria-label="Formatos">{service.tags.map(tag=><li key={tag}>{tag}</li>)}</ul></article>)}</div>
    </section>

    <section className="hq-section hq-process" id="edicao-processo" aria-labelledby="hq-process-title">
      <header className="hq-section-head"><div><p className="hq-kicker">03 / PROCESSO</p><h2 id="hq-process-title">DO BRUTO<br /><em>AO CORTE FINAL.</em></h2></div></header>
      <ol className="hq-steps">
        <li><span>01</span><h3>A gente conversa.</h3><p>Você me conta sobre o canal, manda suas referências e o material. Alinhamos formato, estilo e prazo.</p></li>
        <li><span>02</span><h3>Eu entro na timeline.</h3><p>Seleciono os momentos, construo o ritmo e combino imagem, som e texto com a ideia que definimos.</p></li>
        <li><span>03</span><h3>Ajustamos juntos.</h3><p>Você vê o resultado, traz seu feedback e refinamos a edição até a entrega no formato combinado.</p></li>
      </ol>
      <PanelLink href="#edicao-contato" pose="contact">O próximo quadro pode ser o seu vídeo.</PanelLink>
    </section>

    <section className="hq-about" id="edicao-sobre" aria-labelledby="hq-about-title"><p className="hq-kicker">NOS BASTIDORES</p><h2 id="hq-about-title">Pode me chamar de Sab.</h2><p>Sou Matheus Tahan Sab. Gosto de encontrar, no meio da partida, aquele momento que faz a história valer o play. Edito gameplays, vídeos longos e shorts no DaVinci Resolve, com atenção à identidade e ao público de cada canal.</p></section>
    <div id="edicao-convite" className="hq-contact"><Contact editing /></div>
    <VideoPlayer project={playing} onClose={()=>setPlaying(null)} />
  </div>;
}
