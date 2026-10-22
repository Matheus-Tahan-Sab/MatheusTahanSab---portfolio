import { useState } from 'react';
import { SiDiscord, SiInstagram, SiX } from 'react-icons/si';
import { PiArrowUpRight, PiEnvelopeSimple, PiFilmStrip, PiMoonStars, PiPlayFill, PiSun } from 'react-icons/pi';
import MajoraMask from '../components/ui/MajoraMask.jsx';
import { getPortfolioTheme } from '../config/portfolioTheme.js';
import { profile } from '../data/profile.js';
import { videoProjects } from '../data/videoProjects.js';

function EditorHeader() {
  const [theme, setTheme] = useState(() => getPortfolioTheme(true));
  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]').content = next === 'dark' ? '#100e19' : '#f2eee7';
    try { localStorage.setItem('sab-editor-theme', next); } catch { /* A escolha funciona sem armazenamento. */ }
  }
  return <header className="editor-header">
    <div className="editor-wrap editor-header-inner">
      <a className="editor-brand" href="#edicao" aria-label="Sab — início"><MajoraMask className="editor-brand-mask" /><span>sab<span className="editor-brand-dot">.</span><small>edição de vídeo</small></span></a>
      <nav className="editor-nav" aria-label="Navegação do portfólio de edição"><a href="#edicao-trabalhos">Trabalhos</a><a href="#edicao-contato">Contato</a></nav>
      <button className="editor-theme" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'} title={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}>{theme === 'dark' ? <PiSun aria-hidden="true" /> : <PiMoonStars aria-hidden="true" />}</button>
    </div>
  </header>;
}

function MoonDivider() {
  return <div className="editor-divider" aria-hidden="true"><span /><b>✦</b><i>☽</i><MajoraMask className="editor-divider-mask" /><i>☾</i><b>✦</b><span /></div>;
}

function NightScene() {
  return <div className="editor-scene" aria-hidden="true">
    <img className="editor-scenery" src="/images/editor/clock-town-night.webp" alt="" width="1536" height="1024" fetchPriority="high" />
    <div className="editor-scene-shade" />
    <div className="editor-fog editor-fog-one" /><div className="editor-fog editor-fog-two" />
    <div className="editor-fairies">{Array.from({ length: 12 }, (_, i) => <span key={i} style={{ '--x': `${7 + (i * 23) % 89}%`, '--y': `${20 + (i * 17) % 65}%`, '--delay': `${i * -.8}s`, '--duration': `${5 + i % 4}s` }} />)}</div>
  </div>;
}

function EditingWorks() {
  const [category, setCategory] = useState('Todos');
  const categories = ['Todos', ...new Set(videoProjects.map(project => project.category))];
  const visible = category === 'Todos' ? videoProjects : videoProjects.filter(project => project.category === category);
  return <section className="editor-works editor-wrap" id="edicao-trabalhos" aria-labelledby="editor-works-title">
    <div className="editor-section-title"><div><p className="editor-kicker">PORTFÓLIO</p><h2 id="editor-works-title">Meus trabalhos</h2></div><span className="editor-section-star" aria-hidden="true">✧</span></div>
    {videoProjects.length ? <>
      <div className="editor-filters" role="group" aria-label="Filtrar trabalhos por formato">{categories.map(item => <button type="button" key={item} aria-pressed={item === category} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="editor-work-grid">{visible.map(project => <article className="editor-work" key={project.id}>
        {project.src ? <video controls preload="none" poster={project.thumbnail || undefined} aria-label={project.title}><source src={project.src} /><a href={project.href || project.src}>Abrir vídeo: {project.title}</a></video> : <a className="editor-work-cover" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Assistir a ${project.title} (abre em nova aba)`}>{project.thumbnail && <img src={project.thumbnail} alt="" loading="lazy" width="640" height="360" />}<span className="editor-work-play"><PiPlayFill aria-hidden="true" /></span><span className="editor-work-open">Assistir <PiArrowUpRight aria-hidden="true" /></span></a>}
        <div className="editor-work-caption"><p>{project.category}</p><h3>{project.title}</h3>{project.description && <p>{project.description}</p>}</div>
      </article>)}</div>
    </> : <div className="editor-work-empty"><PiFilmStrip aria-hidden="true" /><div><p>Estou organizando as amostras de edição por aqui.</p><a href={'mailto:' + profile.email}>Enquanto isso, pode me pedir uma amostra por e-mail <PiArrowUpRight aria-hidden="true" /></a></div></div>}
  </section>;
}

function EditingContacts() {
  return <section className="editor-contact" id="edicao-contato" aria-labelledby="editor-contact-title"><div className="editor-wrap">
    <div className="editor-contact-top"><div><p className="editor-kicker">CONTATO</p><h2 id="editor-contact-title">Pode me chamar.</h2><p>Se já tiver referências, prazo ou material gravado, pode mandar junto.</p></div><span className="editor-contact-sigil" aria-hidden="true">✧</span></div>
    <a className="editor-email" href={'mailto:' + profile.email}><PiEnvelopeSimple aria-hidden="true" /><span>{profile.email}</span><PiArrowUpRight aria-hidden="true" /></a>
    <div className="editor-socials">
      <a className="editor-social editor-discord" href={profile.discord} target="_blank" rel="noopener noreferrer"><span className="editor-social-icon"><SiDiscord aria-hidden="true" /></span><span><strong>Discord</strong><small>Abrir meu perfil</small></span><PiArrowUpRight aria-hidden="true" /></a>
      <a className="editor-social editor-x" href={profile.x} target="_blank" rel="noopener noreferrer"><span className="editor-social-icon"><SiX aria-hidden="true" /></span><span><strong>X</strong><small>@sab_editar</small></span><PiArrowUpRight aria-hidden="true" /></a>
      <a className="editor-social editor-instagram" href={profile.instagram} target="_blank" rel="noopener noreferrer"><span className="editor-social-icon"><SiInstagram aria-hidden="true" /></span><span><strong>Instagram</strong><small>@sab_editar</small></span><PiArrowUpRight aria-hidden="true" /></a>
    </div>
  </div></section>;
}

export default function VideoEditing() {
  return <div className="editor-shell">
    <NightScene />
    <EditorHeader />
    <main className="editor-main" id="conteudo" tabIndex={-1}>
      <section className="editor-hero editor-wrap" id="edicao" aria-labelledby="editor-title">
        <div className="editor-hero-copy">
          <p className="editor-kicker">EDIÇÃO DE VÍDEO <span className="editor-kicker-line" aria-hidden="true" /></p>
          <h1 id="editor-title">Oi, eu sou o <span>Sab.</span></h1>
          <p>Sou Matheus. Edito gameplays, clipes de lives e vídeos para redes sociais.</p>
          <div className="editor-hero-actions"><a className="editor-primary" href="#edicao-trabalhos">Ver trabalhos <PiArrowUpRight aria-hidden="true" /></a><a className="editor-text-link" href="#edicao-contato">Falar comigo <PiEnvelopeSimple aria-hidden="true" /></a></div>
        </div>
        <div className="editor-portrait-area">
          <div className="editor-photo-frame"><img className="editor-photo" src="/images/profile/matheus-tahan-sab.png" alt="Matheus Tahan Sab, editor de vídeo" width="499" height="792" fetchPriority="high" /></div>
          <img className="editor-carved-frame" src="/images/editor/moon-portrait-frame.webp" width="800" height="800" alt="" aria-hidden="true" />
        </div>
      </section>
      <div className="editor-wrap"><MoonDivider /></div>
      <EditingWorks />
      <EditingContacts />
    </main>
    <footer className="editor-footer editor-wrap"><p>© {new Date().getFullYear()} Sab · Edição de vídeo</p><a href="#inicio">Portfólio de desenvolvimento <PiArrowUpRight aria-hidden="true" /></a></footer>
  </div>;
}
