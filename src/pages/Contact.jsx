import Section from '../components/ui/Section.jsx';
import { profile } from '../data/profile.js';

export default function Contact() {
  return (
    <Section id="contato" title="Contato">
      <a href={profile.github}>Meu GitHub</a>
      <p>Outras formas de contato e o formulário serão adicionados na próxima etapa.</p>
    </Section>
  );
}
