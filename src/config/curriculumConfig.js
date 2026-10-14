// Adaptado dos exemplos de João Paulo Aramuni (MIT). Veja docs/credits/LICENSE-Aramuni.txt.
// curriculumConfig.js
// Os PDFs ficam na pasta public/ (tudo que está lá é servido na raiz do site:
// public/curriculo-pt.pdf → /curriculo-pt.pdf). Troque pelos seus arquivos!
const CURRICULUM_CONFIG = {
  FILES: [{ id: "pt", label: "Português", file: "/curriculo-matheus-tahan-sab.pdf", downloadName: "Curriculo-Matheus-Tahan-Sab.pdf" }],

  // Limites do zoom (1 = página na largura da área)
  ZOOM_MIN: 0.5,
  ZOOM_MAX: 2,
  ZOOM_STEP: 0.25,
};

export default CURRICULUM_CONFIG;

