import { useState } from 'react';
import Section from '../components/ui/Section.jsx';
import { profile } from '../data/profile.js';
import { sendContactMessage } from '../services/email.js';

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');
  async function handleSubmit(event) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(['name', 'email', 'message', 'website'].map((key) => [key, String(data.get(key) || '').trim()]));
    if (!values.name || !values.email || !values.message) {
      setStatus('Preencha todos os campos, sem usar apenas espaços.');
      return;
    }
    setSending(true);
    setStatus('Enviando mensagem…');
    try {
      await sendContactMessage(values);
      setStatus('Mensagem enviada com sucesso!');
      form.reset();
    } catch {
      setStatus('Não foi possível confirmar o envio. Tente novamente mais tarde ou use o e-mail direto.');
    } finally {
      setSending(false);
    }
  }
  return (
    <Section id="contato" title="Contato">
      <ul className="contact-links">
        <li><a href={`mailto:${profile.email}`}><span aria-hidden="true">✉ </span>{profile.email}</a></li>
        <li><a href={profile.whatsapp}><span aria-hidden="true">☎ </span>WhatsApp</a></li>
        <li><a href={profile.discord}><span aria-hidden="true">☏ </span>Discord</a></li>
        <li><a href={profile.github}>GitHub</a></li>
      </ul>
      <h3>Envie uma mensagem</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="contact-name">Nome</label>
        <input id="contact-name" name="name" autoComplete="name" required maxLength={100} disabled={sending} />
        <label htmlFor="contact-email">E-mail</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} disabled={sending} />
        <label htmlFor="contact-message">Mensagem</label>
        <textarea id="contact-message" name="message" rows={6} required maxLength={5000} disabled={sending} />
        <input className="contact-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button type="submit" disabled={sending}>{sending ? 'Enviando…' : 'Enviar mensagem'}</button>
        <p role="status" aria-live="polite">{status}</p>
      </form>
    </Section>
  );
}
