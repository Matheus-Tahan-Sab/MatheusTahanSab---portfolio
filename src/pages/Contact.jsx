import { useState } from 'react';
import Section from '../components/ui/Section.jsx';
import { profile } from '../data/profile.js';
import { sendContactMessage } from '../services/email.js';

function ContactIcon({ type }) {
  const shapes = {
    email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    whatsapp: <><path d="M5 19 3 22l5-2a9 9 0 1 0-3-1Z" /><path d="M8 7c0 5 4 9 9 9l1-3-3-1-1 2-3-3 2-1-1-3Z" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7M7 7v.1M11 17v-7M11 13c0-4 6-4 6 0v4" /></>,
    discord: <><path d="M7 5h10l4 13-5 2-1-2H9l-1 2-5-2Z" /><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /><path d="M8 16c2 1 6 1 8 0" /></>,
    github: <><circle cx="12" cy="12" r="9" /><circle cx="9" cy="7" r="1.5" /><circle cx="15" cy="10" r="1.5" /><circle cx="9" cy="17" r="1.5" /><path d="M9 8.5v7m0-2.5c4 0 6-1 6-1.5" /></>,
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{shapes[type]}</svg>;
}

export default function Contact({ editing = false }) {
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
      await sendContactMessage(editing ? { ...values, message: '[Edição de vídeo]\n\n' + values.message } : values);
      setStatus('Mensagem enviada com sucesso!');
      form.reset();
    } catch {
      setStatus('Não foi possível confirmar o envio. Tente novamente mais tarde ou use o e-mail direto.');
    } finally {
      setSending(false);
    }
  }
  return (
    <Section id={editing ? 'edicao-contato' : 'contato'} title="Contato" number="04" caption={editing ? 'Vamos criar seu próximo vídeo' : 'Abra um novo diálogo'}>
      <div className="contact-layout">
        <div className="contact-copy">
          <h3>Vamos conversar?</h3>
          <p>{editing ? 'Me conte sobre seu canal, o estilo que você procura e o formato do vídeo. Vamos pensar juntos em uma edição que combine com você.' : 'Tem uma oportunidade, uma ideia ou quer trocar experiências sobre desenvolvimento? Entre em contato.'}</p>
          <ul className="contact-links">
            <li><a href={'mailto:' + profile.email}><ContactIcon type="email" /><span><small>E-mail</small>{profile.email}</span><span aria-hidden="true">↗</span></a></li>
            <li><a href={profile.whatsapp}><ContactIcon type="whatsapp" /><span>WhatsApp</span><span aria-hidden="true">↗</span></a></li>
            <li><a href={profile.discord}><ContactIcon type="discord" /><span>Discord</span><span aria-hidden="true">↗</span></a></li>
            {!editing && <>
              <li><a href={profile.linkedin}><ContactIcon type="linkedin" /><span>LinkedIn</span><span aria-hidden="true">↗</span></a></li>
              <li><a href={profile.github}><ContactIcon type="github" /><span>GitHub</span><span aria-hidden="true">↗</span></a></li>
            </>}
          </ul>
          <p className="contact-note"><span aria-hidden="true">✦</span> {editing ? 'Edição com atenção à sua identidade e ao seu público.' : 'Aberto a aprender, colaborar e construir.'}</p>
        </div>
        <div className="contact-form-panel">
          <div className="panel-title"><h3>Envie uma mensagem</h3><span aria-hidden="true">✉</span></div>
          <form onSubmit={handleSubmit} aria-busy={sending}>
            <label htmlFor="contact-name">Nome</label>
            <input id="contact-name" name="name" autoComplete="name" placeholder="Como posso chamar você?" required maxLength={100} disabled={sending} />
            <label htmlFor="contact-email">E-mail</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" required maxLength={254} disabled={sending} />
            <label htmlFor="contact-message">Mensagem</label>
            <textarea id="contact-message" name="message" rows={5} placeholder={editing ? 'Conte sobre seu canal, formato, referências e prazo…' : 'Conte um pouco sobre sua ideia…'} required maxLength={editing ? 5000 - '[Edição de vídeo]\n\n'.length : 5000} disabled={sending} />
            <input className="contact-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <button className="button" type="submit" disabled={sending}>{sending ? 'Enviando…' : 'Enviar mensagem'}<span aria-hidden="true">↗</span></button>
            <p className="form-status" role="status" aria-live="polite">{status}</p>
          </form>
        </div>
      </div>
    </Section>
  );
}
