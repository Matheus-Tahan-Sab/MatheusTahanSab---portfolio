import { handleIntegrations } from './_integrations.js';
export default function handler(req, res) { return handleIntegrations(req, res, process.env); }
