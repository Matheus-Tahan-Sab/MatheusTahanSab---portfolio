import test from 'node:test';
import assert from 'node:assert/strict';
import { handleIntegrations } from '../api/_integrations.js';
import { handleGitHub } from '../api/_github.js';
import { handleGemini } from '../api/_gemini.js';
import { handleWakaTime } from '../api/_wakatime.js';

function response() {
  return { headers: {}, statusCode: 0, setHeader(name, value) { this.headers[name] = value; }, end(body) { this.body = body; }, on() {}, get json() { return JSON.parse(this.body); } };
}
function request(method = 'GET', url = '/api/integrations') { return { method, url, headers: {}, socket: {} }; }

test('availability exposes only booleans and requires both Gemini settings', () => {
  let res = response(); handleIntegrations(request(), res, { GEMINI_API_KEY: 'test-key' });
  assert.deepEqual(res.json, { gemini: false, wakatime: false });
  res = response(); handleIntegrations(request(), res, { GEMINI_API_KEY: 'test-key', GEMINI_MODEL: 'test-model', WAKATIME_API_KEY: 'test-key' });
  assert.deepEqual(res.json, { gemini: true, wakatime: true });
  assert.equal(res.body.includes('test-key'), false);
});

test('routes reject unsupported methods and arbitrary GitHub usernames', async () => {
  let res = response(); await handleGitHub(request('GET', '/api/github?resource=profile&username=another-user'), res);
  assert.equal(res.statusCode, 400);
  res = response(); await handleGitHub(request('POST', '/api/github'), res); assert.equal(res.statusCode, 405);
  res = response(); await handleGemini(request('GET', '/api/gemini'), res); assert.equal(res.statusCode, 405);
});

test('unconfigured integrations return a clear unavailable response', async () => {
  let res = response(); await handleGemini(request('POST', '/api/gemini'), res); assert.equal(res.statusCode, 503);
  res = response(); await handleWakaTime(request('GET', '/api/wakatime'), res); assert.equal(res.statusCode, 503);
});

test('GitHub output excludes private repositories even when upstream returns them', async () => {
  const previous = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: true, status: 200, json: async () => [
    { id: 1, name: 'public', private: false }, { id: 2, name: 'private-sensitive', private: true },
  ] });
  try {
    const res = response(); await handleGitHub(request('GET', '/api/github?resource=repos&username=Matheus-Tahan-Sab'), res);
    assert.equal(res.statusCode, 200); assert.deepEqual(res.json.map(repo => repo.name), ['public']);
  } finally { globalThis.fetch = previous; }
});

test('WakaTime output never exposes project names', async () => {
  const previous = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: true, status: 200, json: async () => ({ data: { languages: [], projects: [{ name: 'private-client', total_seconds: 500, percent: 100 }] } }) });
  try {
    const res = response(); await handleWakaTime(request('GET', '/api/wakatime'), res, { WAKATIME_USERNAME: 'test-user' });
    assert.equal(res.statusCode, 200); assert.deepEqual(res.json.projects, []); assert.equal(res.body.includes('private-client'), false);
  } finally { globalThis.fetch = previous; }
});
