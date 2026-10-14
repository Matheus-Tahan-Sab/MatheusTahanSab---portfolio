import { lazy, Suspense, useState } from 'react';
import Section from '../components/ui/Section.jsx';
import OptionalIntegrations from '../components/integrations/OptionalIntegrations.jsx';
const GitHubPanel = lazy(() => import('../components/integrations/GitHubPanel.jsx'));
const CurriculumViewer = lazy(() => import('../components/CurriculumViewer/CurriculumViewer.jsx'));

export default function DeveloperActivity() {
  const [showCurriculum, setShowCurriculum] = useState(false);
  return <Section id="atividade" title="Além dos projetos" number="+" caption="Código e trajetória">
    <p className="muted">Repositórios públicos e linguagens do meu perfil no GitHub.</p>
    <Suspense fallback={<p role="status">Carregando GitHub...</p>}><GitHubPanel /></Suspense>
    <OptionalIntegrations />
    <div className="curriculum-panel">
      <h3>Meu currículo</h3>
      <p className="muted">Minha formação, habilidades e projetos acadêmicos em um só documento.</p>
      <button type="button" className="button button-secondary" onClick={() => setShowCurriculum(value => !value)} aria-expanded={showCurriculum} aria-controls="curriculum-content">{showCurriculum ? 'Fechar currículo' : 'Visualizar currículo'}</button>
      <div id="curriculum-content">{showCurriculum ? <Suspense fallback={<p role="status">Carregando currículo...</p>}><CurriculumViewer /></Suspense> : null}</div>
    </div>
  </Section>;
}
