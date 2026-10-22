# Batalha em pixel art na abertura

A abertura da área de edição apresenta “Sobre Mim” e uma simulação de editor. Dentro do monitor, Swampert e Gengar trocam ataques em um GIF de oito segundos, sem som e com repetição contínua. O botão Pausar troca a animação por um quadro estático; Reproduzir reinicia o GIF. A preferência `prefers-reduced-motion: reduce` carrega somente o quadro estático por meio de `<picture>`.

- `public/images/editor/pokemon-battle.gif`: animação em 320 × 180, 15 quadros por segundo, ampliada com pixels nítidos no site.
- `public/images/editor/pokemon-battle-poster.webp`: quadro estático.
- `src/components/ui/PixelBattlePreview.jsx`: imagem responsiva e pausa.
- `scripts/generate-battle-preview.mjs`: geração reproduzível com Canvas, Playwright/Chromium e ffmpeg. São ferramentas de autoria, sem dependências extras para o site. Executar a partir da raiz com `node scripts/generate-battle-preview.mjs`; `BATTLE_CHROMIUM_PATH` permite usar um Chromium já instalado.

O cenário, as barras e os efeitos foram desenhados em Canvas. Os sprites são originários da PokéAPI (Black/White): Swampert usa a vista de costas (`swampert-back.png`) para olhar para Gengar, que usa a vista frontal; veja `public/images/pokemon/README.md`. A imagem é uma animação ilustrativa, não uma amostra de trabalho para cliente. A imagem estática anterior `gameplay-preview.webp` permanece disponível para uma eventual troca.
