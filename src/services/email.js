const config = {
  service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

export const isEmailConfigured = Object.values(config).every((value) => Boolean(value?.trim()));

export async function sendContactMessage({ name, email, message }) {
  if (!isEmailConfigured) throw new Error('Serviço de e-mail não configurado.');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        ...config,
        template_params: { from_name: name, reply_to: email, message },
      }),
    });
    if (!response.ok) throw new Error('Não foi possível enviar. Tente novamente ou use o e-mail direto.');
  } finally {
    clearTimeout(timeout);
  }
}
