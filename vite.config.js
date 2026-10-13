import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { GITHUB_PATH, handleGitHub } from './api/_github.js';
import { GEMINI_PATH, handleGemini } from './api/_gemini.js';
import { WAKATIME_PATH, handleWakaTime } from './api/_wakatime.js';
import { CODANDO_PATH, handleCodando } from './api/_codando.js';
import { INTEGRATIONS_PATH, handleIntegrations } from './api/_integrations.js';

function integrationsApi(env) {
  const handlers = new Map([[GITHUB_PATH, handleGitHub], [GEMINI_PATH, handleGemini], [WAKATIME_PATH, handleWakaTime], [CODANDO_PATH, handleCodando], [INTEGRATIONS_PATH, handleIntegrations]]);
  const middleware = (req, res, next) => {
    const handler = handlers.get(new URL(req.url, 'http://localhost').pathname);
    if (!handler) return next();
    Promise.resolve(handler(req, res, env)).catch(next);
  };
  return { name: 'portfolio-integrations', configureServer(server) { server.middlewares.use(middleware); }, configurePreviewServer(server) { server.middlewares.use(middleware); } };
}
export default defineConfig(({ mode }) => ({
  plugins: [react(), integrationsApi({ ...process.env, ...loadEnv(mode, process.cwd(), '') })],
}));
