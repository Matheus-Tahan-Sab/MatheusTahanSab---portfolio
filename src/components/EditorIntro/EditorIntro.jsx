import './EditorIntro.css';

export default function EditorIntro() {
  return (
    <section className="sab-foyer" id="edicao" aria-labelledby="foyer-name">
      <div className="foyer-building" id="edicao-sobre">
        <div className="foyer-canopy"><span>Cine Sab</span></div>
        <div className="foyer-lobby">
          <article className="foyer-program">
            <p>Sobre mim</p>
            <h1 id="foyer-name">Matheus<br /><em>Tahan Sab</em></h1>
            <strong>EDITOR DE VÍDEO</strong>
            <p>Edito gameplays, vídeos longos e shorts no DaVinci Resolve. Gosto de encontrar, no meio da partida, aquele momento que faz a história valer o play.</p>
            <a href="#edicao-contato">Bora conversar? ↗</a>
          </article>
          <div className="foyer-kiosk">
            <div className="foyer-plaque">Bilheteria</div>
            <div className="foyer-window">
              <img src="/images/doorman/welcome.webp" alt="O Doorman cumprimenta você atrás do vidro da bilheteria." />
              <p className="foyer-speech">Boa sessão! Seu ingresso está no balcão.</p>
            </div>
            <div className="foyer-counter">
              <a className="foyer-ticket" href="#edicao-trabalhos"><span>Retirar ingresso</span><b aria-hidden="true">➜</b></a>
            </div>
            <div className="foyer-apron" aria-hidden="true"><i>✦</i></div>
          </div>
        </div>
      </div>
    </section>
  );
}
