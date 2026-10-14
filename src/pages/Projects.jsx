import Section from '../components/ui/Section.jsx';
import { projects } from '../data/projects.js';

function monthLabel(value) {
  const [year, month] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' })
    .format(new Date(year, month - 1, 1));
}

function ProjectGallery({ id, title, description, images }) {
  if (!images?.length) return null;
  return (
    <div className="project-gallery" aria-labelledby={id}>
      <h4 id={id}>{title}</h4>
      <p className="muted">{description} Selecione uma imagem para vê-la em tamanho original.</p>
      <div className="project-gallery-grid">
        {images.map((image) => (
          <figure key={image.src}>
            <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${image.caption} em tamanho original (nova aba)`}>
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
            </a>
            <figcaption>{image.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const orderedProjects = [...projects].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <Section id="projetos" title="Projetos" number="02" caption="Projetos registrados">
      <ol className="timeline">
        {orderedProjects.map((project, index) => (
          <li key={project.id}>
            <article className="project-entry">
              <div className="project-heading"><p className="project-date"><time dateTime={project.date}>{monthLabel(project.date)}</time> a <time dateTime={project.endDate}>{monthLabel(project.endDate)}</time></p>
              <span className="project-index">{'#' + String(index + 1).padStart(3, '0')}</span></div><h3>{project.name}<span className="project-category">Projeto acadêmico em equipe</span></h3>
              <p>{project.description}</p>
              <p className="contribution"><strong>Minha contribuição</strong>{project.contribution}</p>
              <ul className="tags" aria-label="Tecnologias utilizadas">
                {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
              <ProjectGallery
                id={`${project.id}-screenshots-title`}
                title={`${project.name} em funcionamento`}
                description="Capturas da execução local com dados fictícios. O check-in por QR Code foi simulado pelo modo de apresentação do projeto."
                images={project.screenshots}
              />
              <ProjectGallery
                id={`${project.id}-gallery-title`}
                title={`Protótipos do ${project.name}`}
                description="Wireframes das telas planejadas para o projeto."
                images={project.images}
              />
              {project.image && <img src={project.image} alt={project.imageAlt} loading="lazy" />}
              <a className="button button-secondary repo-link" href={project.repositoryUrl}>Ver repositório do {project.name} <span aria-hidden="true">↗</span></a>
              {project.privateRepository && <p className="muted">Repositório privado: acesso restrito às pessoas autorizadas.</p>}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
