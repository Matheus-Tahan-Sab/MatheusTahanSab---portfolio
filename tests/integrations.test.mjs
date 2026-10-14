import test from 'node:test';
import assert from 'node:assert/strict';
import { handleIntegrations } from '../api/_integrations.js';
import { handleGitHub } from '../api/_github.js';
import { handleGemini } from '../api/_gemini.js';
import disabledAssistant from '../api/gemini.js';
import { handleWakaTime } from '../api/_wakatime.js';

function response() {
  return { headers: {}, statusCode: 0, setHeader(name, value) { this.headers[name] = value; }, end(body) { this.body = body; }, on() {}, get json() { return JSON.parse(this.body); } };
}
function request(method = 'GET', url = '/api/integrations') { return { method, url, headers: {}, socket: {} }; }

test('availability exposes only booleans and keeps the removed assistant disabled', () => {
  let res = response(); handleIntegrations(request(), res, { GEMINI_API_KEY: 'test-key' });
  assert.deepEqual(res.json, { gemini: false, wakatime: false });
  res = response(); handleIntegrations(request(), res, { GEMINI_API_KEY: 'test-key', GEMINI_MODEL: 'test-model', WAKATIME_API_KEY: 'test-key' });
  assert.deepEqual(res.json, { gemini: false, wakatime: true });
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

test('GitHub language percentages include secondary languages and weight code bytes across public non-fork repositories', async () => {
  const previous = globalThis.fetch;
  const requested = [];
  globalThis.fetch = async (url) => {
    requested.push(url);
    let body;
    if (url.includes('/users/')) body = [
      { name: 'large', private: false, fork: false },
      { name: 'small', private: false, fork: false },
      { name: 'secret-project', private: true, fork: false },
      { name: 'copied-fork', private: false, fork: true },
    ];
    else if (url.endsWith('/large/languages')) body = { Java: 900, CSS: 100 };
    else if (url.endsWith('/small/languages')) body = { Python: 90, CSS: 10 };
    else throw new Error('Unexpected repository requested');
    return { ok: true, status: 200, json: async () => body };
  };
  try {
    const res = response(); await handleGitHub(request('GET', '/api/github?resource=languages&username=Matheus-Tahan-Sab'), res);
    assert.equal(res.statusCode, 200);
    assert.equal(res.json.totalBytes, 1100);
    assert.equal(res.json.repositoriesWithCode, 2);
    assert.deepEqual(res.json.languages.map(l => [l.name, l.bytes]), [['Java', 900], ['CSS', 110], ['Python', 90]]);
    assert.equal(res.json.languages[1].share, 0.1);
    assert.ok(Math.abs(res.json.languages.reduce((sum, l) => sum + l.share, 0) - 1) < 1e-12);
    assert.equal(requested.some(url => /secret-project|copied-fork/.test(url)), false);
    assert.match(res.headers['Cache-Control'], /s-maxage=3600/);
  } finally { globalThis.fetch = previous; }
});

test('GitHub repositories include later pages without exposing private repositories', async () => {
  const previous = globalThis.fetch;
  globalThis.fetch = async (url) => ({ ok: true, status: 200, json: async () => url.includes('page=2')
    ? [{ id: 101, name: 'later-page', private: false }, { id: 102, name: 'hidden', private: true }]
    : Array.from({ length: 100 }, (_, i) => ({ id: i + 1, name: `repo-${i + 1}`, private: false })) });
  try {
    const res = response(); await handleGitHub(request('GET', '/api/github?resource=repos&username=Matheus-Tahan-Sab'), res);
    assert.equal(res.statusCode, 200); assert.equal(res.json.length, 101);
    assert.equal(res.json.at(-1).name, 'later-page');
  } finally { globalThis.fetch = previous; }
});

test('GitHub languages report upstream failure rather than incomplete percentages', async () => {
  const previous = globalThis.fetch;
  globalThis.fetch = async (url) => url.includes('/users/')
    ? { ok: true, status: 200, json: async () => [{ name: 'example', private: false, fork: false }] }
    : { ok: false, status: 429 };
  try {
    const res = response(); await handleGitHub(request('GET', '/api/github?resource=languages&username=Matheus-Tahan-Sab'), res);
    assert.equal(res.statusCode, 429); assert.equal(res.json.error, 'rate_limited');
    assert.equal(res.json.languages, undefined); assert.equal(res.headers['Cache-Control'], 'no-store');
  } finally { globalThis.fetch = previous; }
});

test('removed assistant endpoint cannot forward requests to the provider', () => {
  const previous = globalThis.fetch;
  let called = false;
  globalThis.fetch = () => { called = true; throw new Error('Provider must not be called'); };
  try {
    const res = response(); disabledAssistant(request('POST', '/api/gemini'), res);
    assert.equal(res.statusCode, 410); assert.equal(res.json.error, 'disabled');
    assert.equal(called, false);
  } finally { globalThis.fetch = previous; }
});
