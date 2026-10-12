import Section from '../components/ui/Section.jsx';
import { projects } from '../data/projects.js';

function monthLabel(value) {
  const [year, month] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' })
    .format(new Date(year, month - 1, 1));
}

export default function Projects() {
  const orderedProjects = [...projects].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <Section id="projetos" title="Projetos">
      <ol className="timeline">
        {orderedProjects.map((project) => (
          <li key={project.id}>
            <article>
              <p><time dateTime={project.date}>{monthLabel(project.date)}</time> a <time dateTime={project.endDate}>{monthLabel(project.endDate)}</time></p>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p><strong>Minha contribuição:</strong> {project.contribution}</p>
              <ul className="tags" aria-label="Tecnologias utilizadas">
                {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
              {project.image && <img src={project.image} alt={project.imageAlt} loading="lazy" />}
              <a href={project.repositoryUrl}>Ver repositório do {project.name}</a>
              {project.privateRepository && <p className="muted">Repositório privado: acesso restrito às pessoas autorizadas.</p>}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
