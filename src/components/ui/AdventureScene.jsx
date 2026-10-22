// Ilustração vetorial decorativa. A paleta acompanha o tema da página de edição.
export default function AdventureScene() {
  return (
    <div className="adventure-scene" aria-hidden="true">
      <svg className="adventure-landscape" viewBox="0 0 600 690" fill="none" focusable="false">
        <defs>
          <linearGradient id="adventure-sky" x1="300" y1="0" x2="300" y2="690" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--scene-sky-top)" /><stop offset="1" stopColor="var(--scene-sky-bottom)" />
          </linearGradient>
          <radialGradient id="adventure-halo">
            <stop stopColor="#f6e2a4" stopOpacity=".46" /><stop offset="1" stopColor="#f6e2a4" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="adventure-blade" x1="281" y1="0" x2="319" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#b9d3c9" /><stop offset=".48" stopColor="#f4f9e8" /><stop offset=".5" stopColor="#91b6b2" /><stop offset="1" stopColor="#dcebdd" />
          </linearGradient>
          <linearGradient id="adventure-stone" x1="300" y1="439" x2="300" y2="610" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8e9d7d" /><stop offset="1" stopColor="#344e40" />
          </linearGradient>
          <g id="adventure-pine">
            <path d="M-4 0h8v-120h-8z" fill="currentColor" />
            <path d="m0-210 44 83H27l38 66H38L85 0H-85l47-61h-27l38-66h-17L0-210Z" fill="currentColor" />
          </g>
          <g id="adventure-fern" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M0 0q8-43 37-67M7-22l-18-9m25-6-18-13m29-1-11-16M8-23l23 1m-12-19 22 2m-12-34-3-10" />
          </g>
        </defs>

        <path fill="url(#adventure-sky)" d="M0 0h600v690H0z" />
        <circle cx="300" cy="211" r="200" fill="url(#adventure-halo)" />
        <g stroke="var(--scene-gold)" opacity=".48">
          <circle cx="300" cy="238" r="143" /><circle cx="300" cy="238" r="153" strokeDasharray="1 12" />
          <path d="M300 59v24m0 310v24M121 238h24m310 0h24M173 111l17 17m220 220 17 17M173 365l17-17m220-220 17-17" />
        </g>

        <path d="m0 344 80-108 39 50 73-122 72 121 70-93 56 55 54-96 85 151 71-52v440H0Z" fill="var(--scene-mountain-far)" />
        <path d="m143 247 49-83 45 77-31-18-16 9-14-15-33 30Zm268-37 33-59 35 62-26-19-16 13-11-11-15 14Z" fill="var(--scene-snow)" opacity=".55" />
        <path d="M0 379q103-104 189-17 95-87 168-29 119-94 243 25v332H0Z" fill="var(--scene-mountain-near)" />
        <g color="var(--scene-tree-far)">
          <use href="#adventure-pine" transform="translate(57 433) scale(.8)" /><use href="#adventure-pine" transform="translate(132 447) scale(.63)" />
          <use href="#adventure-pine" transform="translate(466 425) scale(.78)" /><use href="#adventure-pine" transform="translate(548 432) scale(1.05)" />
          <use href="#adventure-pine" transform="translate(202 422) scale(.45)" /><use href="#adventure-pine" transform="translate(390 417) scale(.52)" />
        </g>
        <path d="M-30 411q155-46 307 1t353-8v73q-172-47-318-12T-30 470Z" fill="var(--scene-mist)" opacity=".38" />

        <g stroke="var(--scene-ruins)" strokeWidth="13" opacity=".6">
          <path d="M184 481V340q0-115 116-115t116 115v141" />
          <path d="M169 385h30m202 0h30M169 430h30m202 0h30" strokeWidth="4" />
        </g>
        <path d="M0 526q117-52 230-14 89-43 155-16 130-55 215 15v179H0Z" fill="var(--scene-ground)" />
        <ellipse cx="299" cy="585" rx="133" ry="20" fill="#0c241e" opacity=".2" />
        <path d="m207 486 35-41 120-2 39 41-18 95H224l-17-93Z" fill="url(#adventure-stone)" />
        <path d="m207 486 60 14h72l62-16-39-41-120 2-35 41Z" fill="#a6b292" />
        <path d="m267 500 3 79m69-79-4 79" stroke="#c7ceae" strokeOpacity=".36" />
        <path d="m280 536 20-13 20 13-20 13-20-13Zm20-13v26m-13-9 13 17 13-17" stroke="#d6c58d" strokeWidth="2" />
        <path d="m250 463 45 12 52-10-43 20-54-22Z" fill="#314b3f" />

        <g className="adventure-sword">
          <path d="M284 278h32l-3 177-13 23-13-23-3-177Z" fill="url(#adventure-blade)" stroke="#2f615d" strokeWidth="2" />
          <path d="M300 291v164" stroke="#f4f5da" strokeOpacity=".6" />
          <path d="m293 316 7-9 7 9-7 9-7-9Z" stroke="#8aa99c" strokeWidth="1.5" />
          <path d="m241 253 28 8 18-6h26l18 6 28-8-12 23-22-2-25 15-25-15-22 2-12-23Z" fill="#477d79" stroke="#b7cb9e" strokeWidth="2" />
          <path d="m273 267 27 12 27-12m-66 0-12-7m90 7 12-7" stroke="#a6ccbe" strokeWidth="2" />
          <path d="m287 257 3-57h20l3 57-13 10-13-10Z" fill="#304c67" stroke="#97b9ae" strokeWidth="2" />
          <path d="m291 211 18 8m-19 3 20 8m-20 3 21 8m-21 3 21 8" stroke="#9bbda7" strokeWidth="2" />
          <path d="m287 200 3-15h20l3 15-13 9-13-9Z" fill="#bca267" stroke="#e6d399" strokeWidth="2" />
          <path d="m292 190 8-5 8 5-8 6-8-6Z" fill="#e4d4a0" />
        </g>
        <g fill="var(--scene-gold)">
          <path d="m300 97 17 29h-34l17-29Zm-19 33 17 29h-34l17-29Zm38 0 17 29h-34l17-29Z" />
          <circle className="adventure-firefly" cx="225" cy="212" r="2" /><circle className="adventure-firefly" cx="372" cy="185" r="2.3" />
          <circle className="adventure-firefly" cx="249" cy="386" r="2.5" /><circle className="adventure-firefly" cx="359" cy="416" r="2" />
        </g>

        <g color="var(--scene-tree-near)">
          <use href="#adventure-pine" transform="translate(-24 630) scale(1.7)" /><use href="#adventure-pine" transform="translate(629 648) scale(1.8)" />
          <use href="#adventure-fern" transform="translate(74 655) scale(1.2)" /><use href="#adventure-fern" transform="translate(510 658) scale(-1.2 1.2)" />
        </g>
        <g stroke="var(--scene-gold)" strokeWidth="1" opacity=".8">
          <path d="M22 83V22h61m434 0h61v61M22 607v61h61m434 0h61v-61" />
          <path d="m31 49 9-9 9 9-9 9-9-9Zm520 0 9-9 9 9-9 9-9-9Z" />
          <path d="M43 644h176m162 0h176M43 635h119m276 0h119" opacity=".5" />
          <path d="m285 644 15-9 15 9-15 9-15-9Z" />
        </g>
      </svg>
      <div className="adventure-scene-caption"><span>ESTÚDIO SAB</span><p>Toda boa história<br />merece uma boa edição.</p><span className="adventure-caption-line" /></div>
    </div>
  );
}
