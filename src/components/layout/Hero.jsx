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
          <div className="trainer-visual"><img className="trainer-portrait" src="/images/profile/matheus-tahan-sab.png" alt="Foto de Matheus Tahan Sab" width="499" height="792" fetchPriority="high" /></div>
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
