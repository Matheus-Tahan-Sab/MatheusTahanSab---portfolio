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
              {project.images?.length > 0 && (
                <div className="project-gallery" aria-labelledby={`${project.id}-gallery-title`}>
                  <h4 id={`${project.id}-gallery-title`}>Protótipos do {project.name}</h4>
                  <p className="muted">Wireframes das telas planejadas para o projeto. Selecione uma imagem para vê-la em tamanho original.</p>
                  <div className="project-gallery-grid">
                    {project.images.map((image) => (
                      <figure key={image.src}>
                        <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${image.caption} em tamanho original (nova aba)`}>
                          <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                        </a>
                        <figcaption>{image.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              )}
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
