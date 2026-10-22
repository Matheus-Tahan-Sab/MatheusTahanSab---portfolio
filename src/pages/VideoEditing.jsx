import { useState } from 'react';
import Section from '../components/ui/Section.jsx';
import PixelBattlePreview from '../components/ui/PixelBattlePreview.jsx';
import Contact from './Contact.jsx';
import { videoProjects } from '../data/videoProjects.js';
import '../styles/video-editing.css';

const services = [
  { number: '01', format: 'VÍDEOS LONGOS', title: 'Gameplays com história.', text: 'Seleciono os momentos que fazem o vídeo acontecer e construo o ritmo com cortes, humor e contexto. A ideia é manter a personalidade de quem está jogando.', tags: ['YouTube', 'Gameplays', 'Vlogs'] },
  { number: '02', format: 'VÍDEOS VERTICAIS', title: 'Uma ideia. Um bom corte.', text: 'Transformo momentos e ideias em vídeos diretos, com legendas, enquadramento e edição pensados para quem assiste pelo celular.', tags: ['Shorts', 'Reels', 'TikTok'] },
  { number: '03', format: 'HIGHLIGHTS E CLIPES', title: 'Os momentos que ficam.', text: 'Jogadas, conversas e situações engraçadas ganham uma edição que valoriza o timing, as reações e o que torna aquele momento especial.', tags: ['Lives', 'Humor', 'Melhores momentos'] },
];

function WorkGallery() {
  const [category, setCategory] = useState('Todos');
  const categories = ['Todos', ...new Set(videoProjects.map(project => project.category))];
  const visible = category === 'Todos' ? videoProjects : videoProjects.filter(project => project.category === category);
  return (
    <Section id="edicao-trabalhos" title="Trabalhos" number="01" caption="Do material bruto ao vídeo final">
      {videoProjects.length ? <>
        <div className="video-filters" role="group" aria-label="Filtrar trabalhos por formato">
          {categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <div className="video-work-grid">
          {visible.map(project => <article className="video-work" key={project.id}>
            {project.src ? <video controls preload="none" poster={project.thumbnail || undefined} aria-label={project.title}><source src={project.src} /><a href={project.href || project.src}>Abrir vídeo: {project.title}</a></video> : <a className="video-cover" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Assistir a ${project.title} (abre em nova aba)`}>
              {project.thumbnail && <img src={project.thumbnail} alt="" loading="lazy" width="640" height="360" />}
              <span className="video-play" aria-hidden="true">▶</span><span className="video-open">Assistir ↗</span>
            </a>}
            <div className="video-work-copy"><p className="content-label">{project.category}</p><h3>{project.title}</h3><p>{project.description}</p></div>
          </article>)}
        </div>
      </> : <div className="video-samples-contact">
        <span className="video-samples-icon" aria-hidden="true">▶</span>
        <div><p className="content-label">Uma edição que combina com seu conteúdo</p><h3>Vamos conversar sobre o seu próximo vídeo?</h3><p>Me conte o formato e o estilo que você procura. Você também pode pedir amostras de edição diretamente pelo contato.</p><a className="button button-secondary" href="#edicao-contato">Conversar com o Sab <span aria-hidden="true">↗</span></a></div>
      </div>}
    </Section>
  );
}

export default function VideoEditing() {
  return <div className="video-portfolio">
    <section className="video-hero" id="edicao" aria-labelledby="video-title">
      <div>
        <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> SAB / EDITOR DE VÍDEO</p>
        <h1 id="video-title">Sobre Mim</h1>
        <p className="video-intro">Sou Matheus Tahan Sab, mas pode me chamar de Sab. Sou editor de vídeo, gosto de jogos e também crio vídeos com meus amigos.</p>
        <p className="video-intro">Uso o DaVinci Resolve para editar gameplays, vídeos longos, shorts e clipes de lives.</p>
        <div className="hero-actions"><a className="button" href="#edicao-trabalhos">Ver trabalhos <span aria-hidden="true">↓</span></a><a className="video-text-link" href="#edicao-contato">Falar comigo ↗</a></div>
        <p className="video-tool-note">DaVinci Resolve <span aria-hidden="true">/</span> Vídeos longos e verticais</p>
      </div>
      <div className="video-timeline-art">
        <div className="video-art-toolbar" aria-hidden="true"><span className="video-record-light" /><span>SAB — EDIT ROOM</span><span>01</span></div>
        <div className="video-art-monitor"><PixelBattlePreview /></div>
        <div className="video-monitor-controls" aria-hidden="true"><span>◀◀ &nbsp; ▶ &nbsp; ▶▶</span><span>00:18 / 00:45</span><span>⛶</span></div>
        <div className="video-art-ruler" aria-hidden="true"><span>00:00</span><span>00:15</span><span>00:30</span><span>00:45</span></div>
        <div className="video-art-tracks" aria-hidden="true"><div className="video-art-track"><span>V1</span><i>CENA 01</i><i>CENA 02</i><i>CENA 03</i></div><div className="video-art-track"><span>A1</span><i /><i /></div><div className="video-art-track"><span>FX</span><i>SFX</i><i>TEXTO</i></div><span className="video-playhead" /></div>
      </div>
    </section>

    <WorkGallery />

    <Section id="edicao-servicos" title="O que eu edito" number="02" caption="O formato muda. A atenção aos detalhes fica.">
      <div className="video-services">{services.map(service => <article key={service.number} className="video-service"><p className="content-label"><span>{service.number}</span> {service.format}</p><h3>{service.title}</h3><p>{service.text}</p><ul className="video-tags" aria-label="Formatos">{service.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></article>)}</div>
      <div className="video-about"><p className="content-label">POR TRÁS DOS CORTES</p><div><h3>Pode me chamar de Sab.</h3><p>Sou Matheus Tahan Sab. Gosto de jogos, de boas histórias e daqueles momentos que ficam ainda melhores com a edição certa. Trabalho com DaVinci Resolve e gosto de explorar cortes dinâmicos, textos, sons e humor quando eles fazem sentido para o vídeo.</p><p>Antes de editar, procuro entender o estilo do canal, a identidade de quem cria e o público que vai assistir. Cada projeto tem seu próprio ritmo.</p></div></div>
    </Section>

    <Section id="edicao-processo" title="Como vamos trabalhar" number="03" caption="Conversa, edição e ajuste fino">
      <ol className="video-process"><li><span aria-hidden="true">01</span><div><h3>Entender a ideia</h3><p>Conversamos sobre seu canal, referências, formato e prazo. Você compartilha o material e alinhamos o que o vídeo precisa transmitir.</p></div></li><li><span aria-hidden="true">02</span><div><h3>Encontrar o ritmo</h3><p>Organizo os melhores momentos e construo a edição, combinando cortes, áudio e elementos visuais com o estilo que definimos.</p></div></li><li><span aria-hidden="true">03</span><div><h3>Refinar juntos</h3><p>Você acompanha o resultado, traz seu feedback e alinhamos os ajustes e a entrega no formato combinado.</p></div></li></ol>
      <p className="video-process-note">Já tem uma ideia em mente? <a href="#edicao-contato">Vamos conversar sobre ela ↗</a></p>
    </Section>
    <Contact editing />
  </div>;
}
