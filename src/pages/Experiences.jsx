import Section from '../components/ui/Section.jsx';
import { experiences } from '../data/experiences.js';

export default function Experiences() {
  return (
    <Section id="experiencias" title="Experiências acadêmicas">
      <ul className="experience-list">
        {experiences.map((experience) => (
          <li key={experience.id}>
            <h3>{experience.role}</h3>
            <p><strong>{experience.institution}</strong> · {experience.period}</p>
            <p>{experience.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
