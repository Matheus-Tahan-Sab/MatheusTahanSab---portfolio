import Section from '../components/ui/Section.jsx';
import { profile } from '../data/profile.js';

export default function About() {
  return <Section id="sobre" title="Sobre mim"><p>{profile.summary}</p></Section>;
}
