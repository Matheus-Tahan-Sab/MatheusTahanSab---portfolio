export const INTEGRATIONS_PATH = '/api/integrations';
export function handleIntegrations(req, res, env = {}) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') {
    res.statusCode = 405; res.setHeader('Allow', 'GET');
    return res.end(JSON.stringify({ error: 'method_not_allowed' }));
  }
  const enabled = value => typeof value === 'string' && value.trim().length > 0;
  res.statusCode = 200;
  res.end(JSON.stringify({
    gemini: enabled(env.GEMINI_API_KEY) && /^[a-zA-Z0-9.-]+$/.test(env.GEMINI_MODEL ?? ''),
    wakatime: enabled(env.WAKATIME_API_KEY) || enabled(env.WAKATIME_USERNAME),
  }));
}
