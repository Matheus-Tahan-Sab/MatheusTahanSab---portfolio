import Section from '../components/ui/Section.jsx';
import { projects } from '../data/projects.js';

export default function Projects() {
  const orderedProjects = [...projects].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <Section id="projetos" title="Projetos">
      {orderedProjects.length === 0 ? <p>Meus projetos serão adicionados aqui.</p> : (
        <ol>
          {orderedProjects.map((project) => (
            <li key={project.id}>
              <h3>{project.name}</h3>
              <time dateTime={project.date}>{project.date.split('-').reverse().join('/')}</time>
              <p>{project.description}</p>
              <p>{project.technologies.join(' · ')}</p>
              {project.image && <img src={project.image} alt={project.imageAlt || project.name} loading="lazy" />}
              <a href={project.repositoryUrl}>Ver repositório de {project.name}</a>
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}
