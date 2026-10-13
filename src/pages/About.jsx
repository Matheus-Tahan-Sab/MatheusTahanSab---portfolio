import Section from '../components/ui/Section.jsx';
import { profile } from '../data/profile.js';

export default function About() {
  return (
    <Section id="sobre" title="Sobre mim" number="01" caption="Registro do treinador">
      <div className="about-layout">
        <div className="about-copy">
          <p className="content-label">Quem está por trás do código</p>
          <div lang="pt-BR">{profile.about.pt.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <details className="language-panel">
            <summary lang="en"><span aria-hidden="true">EN</span> Read in English</summary>
            <div lang="en"><h3>About me</h3>{profile.about.en.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </details>
        </div>
        <div className="skills-panel">
          <div className="panel-title"><h3>Habilidades e tecnologias</h3><span aria-hidden="true">✦</span></div>
          <dl className="skills-list">
            {profile.skills.map((group) => (
              <div key={group.label}><dt>{group.label}</dt><dd>{group.items.map(item => <span key={item}>{item}</span>)}</dd></div>
            ))}
          </dl>
          <p className="skills-note">Sempre aprendendo e ampliando meu repertório.</p>
        </div>
      </div>
    </Section>
  );
}
