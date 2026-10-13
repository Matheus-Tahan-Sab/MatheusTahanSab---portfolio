import Section from '../components/ui/Section.jsx';
import { experiences } from '../data/experiences.js';

export default function Experiences() {
  return (
    <Section id="experiencias" title="Experiências" number="03" caption="Minha jornada até aqui">
      <ul className="experience-list">
        {experiences.map((experience) => (
          <li key={experience.id}>
            <div className="experience-stamp" aria-hidden="true">ES</div>
            <div className="experience-details">
              <p className="content-label">{experience.institution}</p>
              <h3>{experience.role}</h3>
              <p className="experience-period">{experience.period}</p>
              <p>{experience.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
