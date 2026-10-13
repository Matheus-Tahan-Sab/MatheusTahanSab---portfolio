import { useState } from 'react';
import Section from '../components/ui/Section.jsx';
import { profile } from '../data/profile.js';
import { sendContactMessage } from '../services/email.js';

function ContactIcon({ type }) {
  const shapes = {
    email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    whatsapp: <><path d="M5 19 3 22l5-2a9 9 0 1 0-3-1Z" /><path d="M8 7c0 5 4 9 9 9l1-3-3-1-1 2-3-3 2-1-1-3Z" /></>,
    discord: <><path d="M7 5h10l4 13-5 2-1-2H9l-1 2-5-2Z" /><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /><path d="M8 16c2 1 6 1 8 0" /></>,
    github: <><circle cx="12" cy="12" r="9" /><circle cx="9" cy="7" r="1.5" /><circle cx="15" cy="10" r="1.5" /><circle cx="9" cy="17" r="1.5" /><path d="M9 8.5v7m0-2.5c4 0 6-1 6-1.5" /></>,
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{shapes[type]}</svg>;
}

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
        <li><a href={`mailto:${profile.email}`}><ContactIcon type="email" /> {profile.email}</a></li>
        <li><a href={profile.whatsapp}><ContactIcon type="whatsapp" /> WhatsApp</a></li>
        <li><a href={profile.discord}><ContactIcon type="discord" /> Discord</a></li>
        <li><a href={profile.github}><ContactIcon type="github" /> GitHub</a></li>
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
