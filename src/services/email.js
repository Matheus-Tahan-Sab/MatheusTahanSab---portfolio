const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function sendContactMessage({ name, email, message, website = '' }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 90000);
  try {
    const response = await fetch(`${apiUrl.replace(/\/$/, '')}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({ name, email, message, website }),
    });
    if (!response.ok) throw new Error('Não foi possível enviar. Tente novamente ou use o e-mail direto.');
  } finally {
    clearTimeout(timeout);
  }
}
