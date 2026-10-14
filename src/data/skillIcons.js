import { profile } from './profile.js';

const metadata = {
  C: ['c', 'https://en.cppreference.com/w/c'],
  'C++': ['cplusplus', 'https://en.cppreference.com/w/cpp'],
  Java: ['java', 'https://dev.java/learn/'],
  JavaScript: ['javascript', 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript'],
  HTML: ['html', 'https://developer.mozilla.org/pt-BR/docs/Web/HTML'],
  CSS: ['css', 'https://developer.mozilla.org/pt-BR/docs/Web/CSS'],
  'Spring Boot': ['spring', 'https://spring.io/projects/spring-boot'],
  MySQL: ['mysql', 'https://dev.mysql.com/doc/'],
  PostgreSQL: ['postgresql', 'https://www.postgresql.org/docs/'],
  'Consultas SQL': ['sql', 'https://www.postgresql.org/docs/current/tutorial-sql.html'],
  Git: ['git', 'https://git-scm.com/book/pt-br/v2'],
  GitHub: ['github', 'https://docs.github.com/pt'],
  React: ['react', 'https://react.dev/'],
  Vite: ['vite', 'https://vite.dev/'],
};

export const categories = profile.skills.map(group => group.label);
export const skills = profile.skills.flatMap(group => group.items.map(name => ({
  name, category: group.label, icon: `/images/skills/${metadata[name][0]}.svg`,
  link: metadata[name][1], color: '#31553f',
})));
