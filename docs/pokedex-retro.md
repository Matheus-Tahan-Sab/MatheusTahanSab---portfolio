# Proposta visual: Pokédex retrô

Branch: `feat/pokedex-retro`. Base: `5a3a6c4`, da branch main. Não foi realizada integração à main nem promoção para produção.

## Direção escolhida

O autor escolheu um tema inspirado em Pokédex retrô. A interface usa vermelho, creme e verde, bordas de aparelho, números de seção e uma capa com perfil do desenvolvedor. A ilustração em pixels foi desenhada em SVG, sem fotos fictícias ou sprites retirados de jogos.

A fonte Press Start 2P foi obtida do [repositório oficial Google Fonts](https://github.com/google/fonts/tree/main/ofl/pressstart2p), hospedada com a aplicação e acompanhada da licença SIL Open Font License em `public/fonts/OFL-PressStart2P.txt`. Ela aparece nos títulos; os textos longos usam fontes de sistema para leitura confortável.

## Funcionalidades preservadas

- Conteúdo pessoal em português e inglês.
- Navegação por âncoras nas quatro seções exigidas.
- Timeline cronológica e todas as imagens reais e wireframes do FluxSUS.
- Experiência acadêmica com instituição, atividade, período e descrição.
- Contatos diretos e formulário com campos, limites, estado de envio, validação e mensagens de confirmação/erro.
- Chamada à API e espera de 90 segundos mantidas sem alteração.
- Backend, variáveis da hospedagem e destinatário de e-mail não foram modificados.

## Verificação desta proposta

- Build Vite concluído.
- Revisão React: componentes definidos fora da renderização, chaves estáveis, conteúdo separado em data, sem bibliotecas adicionais ou efeitos desnecessários.
- Chrome: capa e seções inspecionadas no desktop e celular.
- Larguras 320 e 390 px: documento sem overflow horizontal.
- Inglês expandido e conteúdo conferido.
- Nome/mensagem com apenas espaços recusados antes de enviar.
- Ícones decorativos ocultos de leitores de tela, labels dos campos preservados, link para pular conteúdo e foco visível.
- Movimento reduzido respeitado por CSS; sem áudio ou animações piscantes.
- Nenhum erro no console durante a navegação inspecionada.

## Limites da prévia

Esta é uma proposta visual em uma branch separada; a versão principal não foi alterada. O arquivo Figma existente documenta os wireframes anteriores à escolha deste tema.

O formulário mantém a integração real. A API atualmente autoriza a origem do site de produção. Enviar e-mails a partir de um domínio de preview requer autorizar essa origem no back-end; isso não foi feito nesta proposta. O envio real no site de produção permanece como antes. Não foi simulado um sucesso de envio na prévia.

## Como avaliar

1. Abra a prévia da branch na Vercel ou execute `npm ci` e `npm run dev` localmente.
2. Confira capa, navegação, Sobre mim e versão em inglês.
3. Abra as capturas do FluxSUS em tamanho original.
4. Confira a leitura de Experiências e a organização de Contato.
5. Veja também em um celular ou em uma janela estreita.
6. Escolha os ajustes visuais antes de integrar a branch à main.
