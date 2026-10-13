import { lazy, Suspense, useEffect, useState } from 'react';
const GeminiChat = lazy(() => import('../GeminiChat/GeminiChat.jsx'));
const WakaTimeStats = lazy(() => import('../WakaTimeStats/WakaTimeStats.jsx'));

export default function OptionalIntegrations() {
  const [available, setAvailable] = useState({ gemini: false, wakatime: false });
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/integrations', { signal: controller.signal })
      .then(response => response.ok ? response.json() : {})
      .then(data => { if (!controller.signal.aborted) setAvailable({ gemini: data.gemini === true, wakatime: data.wakatime === true }); })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return <Suspense fallback={<p role="status">Carregando...</p>}>
    {available.wakatime ? <div className="integration-panel"><h3>Minha rotina de desenvolvimento</h3><WakaTimeStats showProjects={false} showCodingNow={false} /></div> : null}
    {available.gemini ? <div className="integration-panel"><GeminiChat /></div> : null}
  </Suspense>;
}
