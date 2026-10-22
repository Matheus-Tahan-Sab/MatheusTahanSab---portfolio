import { useState } from 'react';

const navigation = [
  { href: '#sobre', label: 'Sobre mim' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#experiencias', label: 'Experiências' },
  { href: '#contato', label: 'Contato' },
];

const editingNavigation = [
  { href: '#edicao-trabalhos', label: 'Trabalhos' },
  { href: '#edicao-servicos', label: 'O que eu edito' },
  { href: '#edicao-processo', label: 'Processo' },
  { href: '#edicao-contato', label: 'Contato' },
];

export default function Header({ editing = false }) {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  const [transition, setTransition] = useState(null);
  const [transitionCount, setTransitionCount] = useState(0);
  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    document.querySelector('meta[name="theme-color"]').content = nextTheme === 'dark' ? '#181c21' : '#ce3f40';
    setTheme(nextTheme);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTransition(nextTheme);
      setTransitionCount(value => value + 1);
    }
    try {
      localStorage.setItem('mts-portfolio-theme', nextTheme);
    } catch {
      // A troca continua funcionando quando o navegador bloqueia o armazenamento.
    }
  }
  return (
    <header className="site-header">
      {transition ? <div className="theme-transition" key={transitionCount} aria-hidden="true" onAnimationEnd={() => setTransition(null)}><span className={`theme-ball ${transition === 'dark' ? 'ultra-ball' : 'poke-ball'}`}><i /></span></div> : null}
      <div className="container header-inner">
        <a className="brand" href={editing ? '#edicao' : '#inicio'} aria-label="Matheus Tahan Sab — início">
          <span className="device-light" aria-hidden="true" />
          <span className="brand-copy"><strong>MTS<span>.</span></strong><small>PORTFÓLIO / #001</small></span>
        </a>
        <div className="header-actions"><nav className="main-nav" aria-label="Navegação principal">
          {(editing ? editingNavigation : navigation).map((item, index) => (
            <a href={item.href} key={item.href}><span aria-hidden="true">{'0' + (index + 1)}</span>{item.label}</a>
          ))}
        </nav>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Modo escuro" aria-pressed={theme === 'dark'} title={theme === 'dark' ? 'Trocar para modo claro' : 'Trocar para modo escuro'}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            {theme === 'dark' ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2" /></> : <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />}
          </svg>
          <span>{theme === 'dark' ? 'Claro' : 'Escuro'}</span>
        </button></div>
      </div>
      <nav className="portfolio-switch container" aria-label="Áreas do portfólio">
        <a href="#inicio" aria-current={!editing ? 'page' : undefined}><span aria-hidden="true">&lt;/&gt;</span> Desenvolvimento</a>
        <a href="#edicao" aria-current={editing ? 'page' : undefined}><span aria-hidden="true">▶</span> Edição de vídeo</a>
      </nav>
    </header>
  );
}
