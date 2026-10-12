import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
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
        <h1>Matheus Tahan Sab</h1>
        <p>Portfólio de desenvolvimento</p>
        <About />
        <Projects />
        <Experiences />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
