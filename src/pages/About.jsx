import SkillsSection from '../components/SkillsSection/SkillsSection.jsx';
import { skills, categories } from '../data/skillIcons.js';
import Section from '../components/ui/Section.jsx';
import { profile } from '../data/profile.js';

export default function About() {
  return (
    <Section id="sobre" title="Sobre mim" number="01" caption="Registro do treinador">
      <div className="about-layout">
        <div className="about-copy">
          <p className="content-label">Quem está por trás do código</p>
          <div>{profile.about[document.documentElement.lang === 'en' ? 'en' : 'pt'].map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
        <div className="skills-panel">
          <div className="panel-title"><h3>Habilidades e tecnologias</h3><span aria-hidden="true">✦</span></div>
          <SkillsSection skills={skills} categories={categories} />
          <p className="skills-note">Sempre aprendendo e ampliando meu repertório.</p>
        </div>
      </div>
    </Section>
  );
}
