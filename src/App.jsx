import { useEffect, useState } from 'react';
import VideoEditing from './pages/VideoEditing.jsx';
import PokemonCompanion from './components/ui/PokemonCompanion.jsx';
import DeveloperActivity from './pages/DeveloperActivity.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/layout/Hero.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import Experiences from './pages/Experiences.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  const [editing, setEditing] = useState(() => window.location.hash.startsWith('#edicao'));
  useEffect(() => {
    const syncPage = () => {
      if (window.location.hash !== '#conteudo') {
        setEditing(window.location.hash.startsWith('#edicao'));
      }
    };
    window.addEventListener('hashchange', syncPage);
    return () => window.removeEventListener('hashchange', syncPage);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.portfolio = editing ? 'editing' : 'development';
    document.querySelector('link[rel="icon"]').href = editing ? '/favicon-adventure.svg' : '/favicon.svg';
    const dark = document.documentElement.dataset.theme === 'dark';
    document.querySelector('meta[name="theme-color"]').content = editing
      ? (dark ? '#0c1b18' : '#163e32')
      : (dark ? '#181c21' : '#ce3f40');
    document.title = editing ? 'Sab | Edição de vídeo' : 'Matheus Tahan Sab | Portfólio';
    document.querySelector('meta[name="description"]').content = editing
      ? 'Sab: edição de gameplays, vídeos longos, highlights e vídeos verticais. Conheça meu trabalho e vamos conversar sobre seu próximo vídeo.'
      : 'Portfólio de desenvolvimento de Matheus Tahan Sab.';
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(window.location.hash.slice(1));
      target?.scrollIntoView({ behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [editing]);
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header editing={editing} />
      <main id="conteudo" className="container" tabIndex={-1}>
        {editing ? <VideoEditing /> : <>
          <Hero />
          <About />
          <Projects />
          <Experiences />
          <DeveloperActivity />
          <Contact />
        </>}
      </main>
      <Footer editing={editing} />
      {!editing && <PokemonCompanion />}
    </>
  );
}
