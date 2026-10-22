import { useState } from 'react';
import { SiDiscord, SiInstagram, SiX } from 'react-icons/si';
import { PiArrowDown, PiArrowUpRight, PiEnvelopeSimple, PiFilmStrip, PiMoonStars, PiPlayFill, PiSun } from 'react-icons/pi';
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

function MoonGlyph() {
  return <svg className="editor-moon" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
    <circle cx="60" cy="60" r="55" fill="var(--edit-moon)" stroke="var(--edit-line)" />
    <path d="M78 8a55 55 0 0 0 0 104A55 55 0 0 1 78 8Z" fill="#342943" opacity=".2" />
    <g fill="var(--edit-moon-shadow)"><circle cx="26" cy="42" r="7" /><circle cx="81" cy="24" r="5" /><circle cx="90" cy="77" r="8" /><circle cx="39" cy="92" r="5" /></g>
    <path d="m32 51 19 5-4 11-14-5-1-11Zm56 0-19 5 4 11 14-5 1-11Z" fill="var(--edit-moon-shadow)" />
    <path d="m60 58-7 15h14l-7-15ZM39 81q21 12 42 0M48 85v5m8-2v5m8-5v5m8-8v5" stroke="var(--edit-moon-shadow)" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>;
}

function EditingWorks() {
  const [category, setCategory] = useState('Todos');
  const categories = ['Todos', ...new Set(videoProjects.map(project => project.category))];
  const visible = category === 'Todos' ? videoProjects : videoProjects.filter(project => project.category === category);
  return <section className="editor-works editor-wrap" id="edicao-trabalhos" aria-labelledby="editor-works-title">
    <div className="editor-section-title"><div><p className="editor-kicker">PORTFÓLIO</p><h2 id="editor-works-title">Algumas edições</h2></div><span className="editor-section-star" aria-hidden="true">✧</span></div>
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
    <EditorHeader />
    <main className="editor-main" id="conteudo" tabIndex={-1}>
      <section className="editor-hero editor-wrap" id="edicao" aria-labelledby="editor-title">
        <div className="editor-hero-copy"><p className="editor-kicker"><span aria-hidden="true">✦</span> EDITOR DE VÍDEO</p><h1 id="editor-title">Oi, eu sou<br />o <span>Sab.</span></h1><p>Sou Matheus, mas pode me chamar de Sab. Trabalho com edição de vídeos e uso o DaVinci Resolve.</p><p>Gosto principalmente de editar gameplays e momentos engraçados. Também faço shorts, clipes de lives e outros formatos.</p><div className="editor-hero-actions"><a className="editor-primary" href="#edicao-trabalhos">Ver meus trabalhos <PiArrowDown aria-hidden="true" /></a><a className="editor-text-link" href="#edicao-contato">Falar comigo <PiArrowUpRight aria-hidden="true" /></a></div></div>
        <div className="editor-portrait-area"><div className="editor-orbit" aria-hidden="true" /><MoonGlyph /><div className="editor-photo-frame"><img className="editor-photo" src="/images/profile/matheus-tahan-sab.png" alt="Matheus Tahan Sab, editor de vídeo" width="499" height="792" fetchPriority="high" /></div><MajoraMask className="editor-portrait-mask" /><span className="editor-photo-spark spark-one" aria-hidden="true">✧</span><span className="editor-photo-spark spark-two" aria-hidden="true">✦</span><p className="editor-photo-caption">MATHEUS TAHAN SAB</p></div>
      </section>
      <EditingWorks />
      <EditingContacts />
    </main>
    <footer className="editor-footer editor-wrap"><p>© {new Date().getFullYear()} Sab · Edição de vídeo</p><a href="#inicio">Portfólio de desenvolvimento <PiArrowUpRight aria-hidden="true" /></a></footer>
  </div>;
}
