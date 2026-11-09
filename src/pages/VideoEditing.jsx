import { useEffect, useRef, useState } from 'react';
import Contact from './Contact.jsx';
import { videoProjects } from '../data/videoProjects.js';

const services = [
  { format: '01 / LONG FORM', title: 'Uma gameplay. Uma história.', text: 'Dos melhores momentos ao vídeo completo: cortes, contexto e humor no ritmo do seu canal.', tags: ['YouTube', 'Gameplays', 'Vlogs'], icon: '↗' },
  { format: '02 / SHORT FORM', title: 'Direto ao ponto.', text: 'Enquadramento, legendas e timing para transformar uma boa ideia em um vídeo que funciona no celular.', tags: ['Shorts', 'Reels', 'TikTok'], icon: '↟' },
  { format: '03 / HIGHLIGHTS', title: 'Esse momento merece replay.', text: 'Jogadas, reações e resenhas de live. Eu encontro os momentos e dou a eles o destaque que merecem.', tags: ['Lives', 'Clipes', 'Humor'], icon: '↺' },
];

function SabController() {
  return <svg className="sab-controller" viewBox="0 0 420 310" fill="none" aria-hidden="true">
    <path d="M212 80C212 35 300 65 300 15" stroke="#111216" strokeWidth="9" strokeLinecap="round"/>
    <path d="M106 89C70 90 53 126 39 178L22 244C15 275 44 296 67 276L132 220H289L353 276C376 296 405 275 397 244L379 178C365 126 351 90 315 89L106 89Z" fill="#111216" transform="translate(0 10)"/>
    <path d="M106 89C70 90 53 126 39 178L22 244C15 275 44 296 67 276L132 220H289L353 276C376 296 405 275 397 244L379 178C365 126 351 90 315 89L106 89Z" fill="#f5f0d9" stroke="#111216" strokeWidth="8" strokeLinejoin="round"/>
    <path d="M103 119H125V141H147V164H125V186H103V164H81V141H103V119Z" fill="#3555f5" stroke="#111216" strokeWidth="5" strokeLinejoin="round"/>
    <circle cx="311" cy="132" r="14" fill="#ff713f" stroke="#111216" strokeWidth="5"/>
    <circle cx="341" cy="161" r="14" fill="#3555f5" stroke="#111216" strokeWidth="5"/>
    <circle cx="281" cy="161" r="14" fill="#3555f5" stroke="#111216" strokeWidth="5"/>
    <circle cx="311" cy="190" r="14" fill="#ff713f" stroke="#111216" strokeWidth="5"/>
    <rect x="171" y="133" width="75" height="44" rx="7" fill="#111216"/>
    <path d="M201 143L222 155L201 167V143Z" fill="#ff713f"/>
    <path d="M186 195H200M217 195H231" stroke="#111216" strokeWidth="7" strokeLinecap="round"/>
    <path d="M58 207L50 238M365 207L373 238" stroke="#111216" strokeWidth="5" strokeLinecap="round"/>
    <path d="M42 52L27 32M87 44L88 18M365 53L384 34" stroke="#f5f0d9" strokeWidth="7" strokeLinecap="round"/>
  </svg>;
}

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

export default function VideoEditing() {
  const [playing, setPlaying] = useState(null);
  const longVideos = videoProjects.filter(project => project.category !== 'Vídeos verticais');
  const shorts = videoProjects.filter(project => project.category === 'Vídeos verticais');
  return <div className="video-portfolio">
    <section className="cut-hero" id="edicao" aria-labelledby="cut-hero-title">
      <div className="cut-hero-copy">
        <p className="cut-label"><span className="cut-live-dot" /> SAB / EDITOR DE VÍDEO</p>
        <h1 id="cut-hero-title">SEU VÍDEO.<br /><span>OUTRO</span><br /><em>RITMO.</em></h1>
        <p className="cut-intro">Cortes com intenção. Humor no timing certo.<br />Uma edição com a cara do seu canal.</p>
        <div className="cut-hero-actions"><a className="cut-button" href="#edicao-trabalhos">Dá o play nos trabalhos <span aria-hidden="true">↘</span></a><a className="cut-text-link" href="#edicao-contato">Vamos conversar ↗</a></div>
        <p className="cut-hero-footnote">GAMEPLAYS / VÍDEOS LONGOS / SHORTS</p><span className="sab-hero-sticker" aria-hidden="true">CORTA.<br />ENCAIXA.<br />DÁ PLAY. ↗</span>
      </div>
      <div className="cut-art" aria-label="Composição gráfica inspirada em uma timeline de edição">
        <div className="cut-art-meta"><span>SAB / EDIT SESSION</span><span aria-hidden="true">● REC</span></div>
        <div className="cut-art-stage" aria-hidden="true"><span className="cut-stage-cross">+</span><span className="cut-big-sab">SAB</span><SabController /><span className="cut-stage-slash" /><span className="cut-stage-caption">FEITO PRA<br />DAR PLAY.</span><span className="cut-stage-cross cut-cross-end">+</span></div>
        <div className="cut-art-bottom"><span>CRIATIVIDADE EM CADA CORTE.</span><span aria-hidden="true">↗</span></div>
        <div className="cut-art-timeline" aria-hidden="true"><div className="cut-time-ruler"><span>00:00</span><span>00:15</span><span>00:30</span></div><div className="cut-time-clips">{videoProjects.map(project => <div key={project.id}><img src={project.thumbnail} alt="" width="160" height="90" /><span>{project.category === 'Vídeos verticais' ? 'SHORT' : 'GAMEPLAY'}</span></div>)}</div><div className="cut-waveform" /><span className="cut-art-playhead" /></div>
        <span className="cut-tool-stamp">EDITADO NO<br /><strong>DaVinci Resolve</strong></span>
      </div>
    </section>

    <div className="cut-format-strip" aria-label="Especialidades"><span>GAMEPLAYS</span><i aria-hidden="true">✳</i><span>STORYTELLING</span><i aria-hidden="true">✳</i><span>SHORTS & REELS</span><i aria-hidden="true">✳</i><span>HIGHLIGHTS</span></div>

    <section className="cut-section cut-works" id="edicao-trabalhos" aria-labelledby="cut-work-title">
      <div className="cut-work-intro"><SectionHeading number="01" label="TRABALHOS SELECIONADOS"><span id="cut-work-title">MENOS PAPO.<br /><em>MAIS PLAY.</em></span></SectionHeading><p>Do material bruto ao vídeo que você assiste.<br />Uma seleção de trabalhos que já saíram da timeline.</p></div>
      {longVideos.length > 0 && <div className="cut-work-group"><div className="cut-group-heading"><h3>Vídeos longos</h3><span>HISTÓRIAS COM TEMPO PRA ACONTECER / 16:9</span></div><div className="cut-long-grid">{longVideos.map((project, index) => <WorkCard key={project.id} project={project} index={index} onPlay={setPlaying} />)}</div></div>}
      {shorts.length > 0 && <div className="cut-work-group cut-short-group"><div className="cut-short-note"><p className="cut-label">FORMATO VERTICAL / 9:16</p><h3>POUCOS<br />SEGUNDOS.<br /><em>BOAS IDEIAS.</em></h3><p>Vídeos curtos, com ritmo, legendas e personalidade para acompanhar quem assiste pelo celular.</p><span className="cut-note-arrow" aria-hidden="true">↗</span><p className="cut-label">SHORTS / REELS / TIKTOK</p></div><div className="cut-shorts-grid">{shorts.map((project, index) => <WorkCard key={project.id} project={project} index={index + longVideos.length} onPlay={setPlaying} />)}</div></div>}
    </section>

    <section className="cut-section cut-services" id="edicao-servicos" aria-labelledby="cut-services-title">
      <SectionHeading number="02" label="O QUE EU EDITO"><span id="cut-services-title">CADA FORMATO.<br /><em>SEU PRÓPRIO RITMO.</em></span></SectionHeading>
      <div className="cut-service-list">{services.map(service => <article key={service.format}><div className="cut-service-symbol" aria-hidden="true">{service.icon}</div><div><p className="cut-label">{service.format}</p><h3>{service.title}</h3><p>{service.text}</p></div><ul aria-label="Formatos">{service.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></article>)}</div>
    </section>

    <section className="cut-section cut-about" id="edicao-sobre" aria-labelledby="cut-about-title">
      <div className="sab-identity-art" aria-label="Controle de videogame ilustrado, identidade visual do Sab"><span className="sab-identity-top">PLAYER 01 / SAB</span><span className="sab-identity-star" aria-hidden="true">✳</span><SabController /><strong>GAME ON.<br /><span>EDIT ON.</span></strong><span className="sab-identity-sticker">TIMING É TUDO.</span><div className="sab-identity-bottom"><span>GAMEPLAYS & BOAS HISTÓRIAS</span><span aria-hidden="true">↗</span></div></div>
      <div><p className="cut-label"><span>03</span> QUEM ESTÁ NA TIMELINE</p><h2 id="cut-about-title">PODE ME<br />CHAMAR DE <em>SAB.</em></h2><p>Sou Matheus Tahan Sab. Gosto de jogos, de boas histórias e daqueles momentos que ficam ainda melhores com a edição certa. Também crio vídeos com meus amigos, então conheço a vontade de transformar uma gameplay em algo que vale compartilhar.</p><p>Trabalho com DaVinci Resolve, combinando cortes, textos, sons e humor. Antes de editar, procuro entender o seu estilo e quem vai assistir. O vídeo precisa continuar com a sua cara.</p><div className="cut-about-signature"><span>Sab<span aria-hidden="true">↗</span></span><p>EDITOR DE VÍDEO<br />GAMER DO OUTRO LADO DA TELA.</p></div></div>
    </section>

    <section className="cut-section cut-process-section" id="edicao-processo" aria-labelledby="cut-process-title">
      <SectionHeading number="04" label="COMO A GENTE TRABALHA"><span id="cut-process-title">DA IDEIA<br /><em>AO ÚLTIMO CORTE.</em></span></SectionHeading>
      <ol className="cut-process"><li><span>01</span><h3>A gente conversa.</h3><p>Você me conta sobre o canal, manda suas referências e o material. Alinhamos formato, estilo e prazo.</p></li><li><span>02</span><h3>Eu entro na timeline.</h3><p>Seleciono os momentos, construo o ritmo e combino imagem, som e texto com a ideia que definimos.</p></li><li><span>03</span><h3>Ajustamos juntos.</h3><p>Você vê o resultado, traz seu feedback e refinamos a edição até a entrega no formato combinado.</p></li></ol>
    </section>

    <div className="cut-contact-intro"><p className="cut-label">PRÓXIMA CENA: O SEU PROJETO.</p><h2>BORA TIRAR<br />DO <em>BRUTO?</em> <span aria-hidden="true">↙</span></h2></div>
    <Contact editing />
    <VideoPlayer project={playing} onClose={() => setPlaying(null)} />
  </div>;
}
