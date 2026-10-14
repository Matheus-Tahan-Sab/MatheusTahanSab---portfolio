// Somente informações já publicadas no portfólio. Sem dados privados ou exemplos fictícios.
import { profile } from '../src/data/profile.js';
import { projects } from '../src/data/projects.js';
import { experiences } from '../src/data/experiences.js';
export const NOME = 'Matheus Tahan Sab';
export const PERFIL = `
# Formação e objetivos
${profile.about.pt.join('\n')}
# Habilidades
${profile.skills.map(group => `${group.label}: ${group.items.join(', ')}`).join('\n')}
# Projetos acadêmicos
${JSON.stringify(projects.map(({ name, description, contribution, technologies, date, endDate }) => ({ name, description, contribution, technologies, date, endDate })))}
# Experiências acadêmicas
${JSON.stringify(experiences)}
# Contatos
E-mail: ${profile.email}
GitHub: ${profile.github}
# Limites
Matheus busca estágio. Não há experiência profissional em empresa informada, perfil de LinkedIn ou certificações informadas. FluxSUS é acadêmico, em equipe, com dados fictícios e sem cliente real.
`;
