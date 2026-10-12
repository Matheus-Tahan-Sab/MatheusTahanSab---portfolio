import Section from '../components/ui/Section.jsx';
import { experiences } from '../data/experiences.js';

export default function Experiences() {
  return (
    <Section id="experiencias" title="Experiências">
      {experiences.length === 0 ? <p>Minhas experiências serão adicionadas aqui.</p> : (
        <ul>
          {experiences.map((experience) => (
            <li key={experience.id}>
              <h3>{experience.role} — {experience.institution}</h3>
              <p>{experience.period}</p>
              <p>{experience.description}</p>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
