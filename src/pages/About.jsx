import Section from '../components/ui/Section.jsx';
import { profile } from '../data/profile.js';

export default function About() {
  return (
    <Section id="sobre" title="Sobre mim">
      <div lang="pt-BR">
        {profile.about.pt.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <details>
        <summary lang="en">Read in English</summary>
        <div lang="en">
          <h3>About me</h3>
          {profile.about.en.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </details>
      <h3>Habilidades e tecnologias</h3>
      <dl>
        {profile.skills.map((group) => (
          <div key={group.label}>
            <dt><strong>{group.label}</strong></dt>
            <dd>{group.items.join(' · ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
