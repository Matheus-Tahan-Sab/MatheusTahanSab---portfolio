# Direção visual da área de edição

A composição aprovada para a página de edição é inspirada em Majora's Mask: cidade noturna, lua com rosto, máscara, névoa, luzes verdes e bronze envelhecido. O tema escuro abre por padrão. No tema claro, a abertura cinematográfica permanece noturna e o restante da página usa tons de papel e lilás.

O cenário e a moldura são imagens separadas. A foto é a fotografia original de Matheus, os textos e botões são HTML e a galeria continua alimentada por `src/data/videoProjects.js`. Não publicar imagens ilustrativas como se fossem trabalhos reais. A galeria vazia mostra uma mensagem e contato por e-mail até recebermos os vídeos.

## Arquivos

- `public/images/editor/clock-town-night.webp`: cenário em 1536 × 1024, WebP.
- `public/images/editor/moon-portrait-frame.webp`: moldura em 800 × 800 com transparência interna e externa, WebP.
- `src/pages/VideoEditing.jsx`: composição, navegação, foto e conteúdo.
- `src/styles/video-editing.css`: temas, enquadramento responsivo e animações.

As imagens foram criadas com a ferramenta integrada de geração de imagens a partir da proposta visual aprovada pelo usuário. A conversão em WebP preserva a transparência da moldura. Nenhuma fotografia gerada substitui a foto original do proprietário no site.

## Prompts de produção

### Cenário

Production website background asset derived from the approved reference mockup. Generate only the wide cinematic scenery behind its interface, landscape 1536 × 1024. Remove all text, UI, buttons, portrait, portrait frame and video thumbnails. Reconstruct the town behind the portrait. Richly detailed painted fantasy night landscape inspired by Zelda Majora's Mask: Clock Town architecture and clock tower around 40% of the width, ominous gray-purple moon face with glowing orange eyes in the upper right quadrant, hanging colorful spiky Majora mask at the far right, foreground tree branches, foliage and rocks, violet clouds and muted torchlit town. Reserve left-center as dark low-contrast scenery for real HTML text. Leave the right-center available for a separate portrait. Deep ink-plum, muted purple, mint magical lights and aged-gold torches. Atmospheric depth, tangible texture. No typography, interface, person, medallion frame or thumbnail panels. Dark bottom edge to blend into #100e19.

### Moldura

Isolated antique round portrait frame matching the approved reference, on transparent background, with a genuinely transparent circular aperture. No person, face, photo, scenery or letters. Aged bronze and dark carved stone ring, clinging ivy and small violet leaves, sculpted moon medallion centered at top with crescent motifs on either side, elongated golden diamond ornament at bottom. Circular geometry, realistic fantasy craftsmanship, warm tarnished bronze rim, deep purple shadows and quiet gold highlights. Thin enough to leave a large owner portrait. Both the central hole and outside background transparent, crisp alpha edges. No UI or mockup.

## Movimento e acessibilidade

A névoa e os pontos de luz usam animações CSS lentas. `prefers-reduced-motion: reduce` desativa essas animações e os movimentos de hover. Elementos decorativos são escondidos de leitores de tela. Todos os controles continuam acessíveis por teclado. Não há autoplay ou áudio ambiente.
