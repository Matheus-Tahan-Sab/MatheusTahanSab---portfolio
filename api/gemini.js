// Integração retirada do portfólio a pedido do autor.
// A rota deixa de encaminhar perguntas ao provedor.
export default function handler(req, res) {
  res.statusCode = 410;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify({ error: 'disabled', message: 'Este recurso foi desativado.' }));
}
