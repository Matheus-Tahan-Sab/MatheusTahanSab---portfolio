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
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo" className="container" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Experiences />
        <DeveloperActivity />
        <Contact />
      </main>
      <Footer />
      <PokemonCompanion />
    </>
  );
}
