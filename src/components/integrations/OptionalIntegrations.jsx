import { lazy, Suspense, useEffect, useState } from 'react';
const WakaTimeStats = lazy(() => import('../WakaTimeStats/WakaTimeStats.jsx'));

export default function OptionalIntegrations() {
  const [available, setAvailable] = useState({ wakatime: false });
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/integrations', { signal: controller.signal })
      .then(response => response.ok ? response.json() : {})
      .then(data => { if (!controller.signal.aborted) setAvailable({ wakatime: data.wakatime === true }); })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return <Suspense fallback={<p role="status">Carregando...</p>}>
    {available.wakatime ? <div className="integration-panel"><h3>Minha rotina de desenvolvimento</h3><WakaTimeStats showProjects={false} showCodingNow={false} /></div> : null}
  </Suspense>;
}
