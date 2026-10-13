function PixelTrainer() {
  return (
    <svg className="pixel-trainer" viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges">
      <path fill="#bccba1" d="M3 27h26v2H3zM5 25h2v2H5zM26 24h2v3h-2z" />
      <path fill="#29362d" d="M9 20h14v9H9zM7 22h2v6H7zM23 22h2v6h-2zM10 8h12v12H10z" />
      <path fill="#e9b889" d="M11 11h10v8H11zM13 19h6v3h-6zM7 23h2v4H7zM23 23h2v4h-2z" />
      <path fill="#d84142" d="M11 5h10v3H11zM9 8h15v3H9zM9 21h4v6H9zM19 21h4v6h-4z" />
      <path fill="#f8f0d7" d="M17 7h4v2h-4zM13 22h6v5h-6z" />
      <path fill="#29362d" d="M12 13h2v2h-2zM18 13h2v2h-2zM14 17h4v1h-4z" />
      <path fill="#29362d" d="M9 23h14v7H9zM7 30h18v1H7z" />
      <path fill="#8fa99a" d="M10 24h12v5H10z" />
      <path fill="#d6e8ae" d="M14 25h4v2h-4z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> Uma jornada em desenvolvimento</p>
        <h1 id="hero-title">Matheus<br /><span>Tahan Sab.</span></h1>
        <p className="hero-description">Estudante de Engenharia de Software na PUC Minas, com foco em <strong>desenvolvimento back-end</strong>.</p>
        <p className="hero-note">Cada projeto, uma nova experiência. Cada desafio, uma oportunidade de aprender.</p>
        <div className="hero-actions">
          <a className="button" href="#projetos">Explorar projetos <span aria-hidden="true">↗</span></a>
          <a className="button button-secondary" href="#contato">Vamos conversar</a>
        </div>
        <p className="hero-availability"><span aria-hidden="true">◆</span> Em busca de uma oportunidade de estágio</p>
      </div>
      <div className="trainer-device">
        <div className="device-top" aria-hidden="true">
          <div className="device-lights"><span /><span /><span /></div>
          <span>MTS — 001</span>
        </div>
        <div className="trainer-screen">
          <div className="screen-top"><span>PERFIL DO DESENVOLVEDOR</span><span aria-hidden="true">▮▮▮</span></div>
          <div className="trainer-visual"><PixelTrainer /></div>
          <p className="trainer-name">MATHEUS TAHAN SAB</p>
          <p className="trainer-class">Engenharia de Software</p>
          <div className="trainer-types"><span>BACK-END</span><span>ESTUDANTE</span></div>
          <dl className="trainer-info">
            <div><dt>Instituição</dt><dd>PUC Minas</dd></div>
            <div><dt>Período</dt><dd>2º período</dd></div>
            <div><dt>Stack principal</dt><dd>Java / Spring Boot</dd></div>
          </dl>
        </div>
        <div className="device-controls" aria-hidden="true"><span className="d-pad" /><div className="device-speaker"><i /><i /><i /></div><span className="control-button" /></div>
      </div>
    </section>
  );
}
