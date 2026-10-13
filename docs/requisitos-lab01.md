# Conferência do Laboratório 01

Revisão realizada em 13/10/2026 com o [enunciado oficial do professor](https://raw.githubusercontent.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/main/LABORATORIOS/LABORATO%CC%81RIO%2001%20-%20Portfo%CC%81lio%20Profissional.pdf), páginas 1 a 3, e o [template de README](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/blob/main/TEMPLATES/template_README.md).

## Escopo

A pedido do autor, esta revisão exclui a estilização final e a implementação de temas claro/escuro. A responsividade funcional, os ícones clicáveis e as validações continuam no escopo. O PDF consultado não exige temas claro/escuro explicitamente; exige responsividade, identidade visual e qualidade da interface. Não foi estimada uma nota.

## Resultado por requisito

| Requisito | Resultado | Evidência |
| --- | --- | --- |
| Menu para Sobre mim, Projetos, Experiências e Contato | Atendido | Quatro âncoras com destinos existentes; navegação verificada no Chrome. |
| Cabeçalho, rodapé e área de conteúdo | Atendido | Componentes Header/Footer e área main com as quatro seções. |
| Apresentação em português e inglês | Atendido | Formação, área de interesse e objetivo profissional nos dois idiomas; abertura de Read in English verificada. |
| Timeline dinâmica, do mais antigo ao mais recente | Atendido | Dados em projects.js renderizados por map e ordenados pela data crescente; atualmente há um projeto. |
| Nome, descrição, tecnologias e GitHub para cada projeto | Atendido com ressalva de acesso | FluxSUS tem os quatro campos. Seu repositório é privado; o link existe, mas acesso de terceiros não foi confirmado. |
| Imagem ou GIF do projeto em funcionamento | Atendido | Quatro capturas reais do FluxSUS, publicadas e identificadas como execução local com dados fictícios. Não é necessário GIF adicional, pois o enunciado permite imagem ou GIF. |
| Experiências com instituição, atividade, período e descrição | Atendido no conteúdo disponível | PUC Minas, projeto acadêmico em equipe FluxSUS, janeiro a junho de 2026 e descrição. Não foram inventados empregos, estágios ou clientes. |
| Contatos clicáveis com ícones | Atendido nos contatos existentes | E-mail, WhatsApp, Discord e GitHub, com ícones SVG acessíveis. As URLs foram conferidas; não foram enviadas mensagens pelos contatos diretos. |
| LinkedIn citado no enunciado | Ressalva | O autor informou em 13/10/2026 que não possui perfil. Não foi criado link fictício nem uma conta. Se o professor exigir especificamente LinkedIn, este item permanece a resolver. |
| Formulário com nome, e-mail e mensagem e envio por e-mail | Atendido | POST /api/contact no back-end Spring Boot e Resend. Dois testes reais de publicação recebidos no Gmail, em 12 e 13/10/2026. |
| Validações básicas | Atendido | Obrigatoriedade dos três campos, type=email, limites de tamanho e recusa de conteúdo só com espaços. Verificações do formulário no Chrome e cinco testes do back-end aprovados. |
| Responsividade funcional | Atendido nos tamanhos verificados | Chrome em 320 e 390 px, sem rolagem horizontal; grade de imagens passa para uma coluna no celular. Identidade visual final está fora do escopo. |
| Hospedagem gratuita em nuvem | Atendido | Front-end Vercel Hobby, API Render Free e envio Resend sem upgrade. As URLs estão no README. |
| README com tecnologias e dependências | Atendido após revisão | Lista de bibliotecas, versões do lockfile e dependências Spring Boot; sem SDK de e-mail adicional. |
| README com estrutura, instalação, execução e site publicado | Atendido | Estrutura de pastas, npm ci/npm run dev, instruções Java 17/Maven, variáveis de ambiente, build, testes, uso do site e links. |
| Wireframes de média fidelidade no Figma e imagens no README | Atendido | Arquivo editável com 14 telas, links das oito telas principais e cinco exportações no repositório. |
| Alinhamento funcional com o protótipo | Estrutura conferida | Mesmas quatro seções, apresentação em inglês, contatos e estados do formulário. A galeria real foi adicionada depois do wireframe; essa diferença está documentada. Alinhamento visual final não foi avaliado. |
| Apresentação final do sistema | A realizar pelo autor | Deve mostrar o site hospedado e explicar arquitetura, funcionalidades e decisões. Roteiro sugerido abaixo. |
| Estilização final e identidade visual | Fora do escopo solicitado | A qualidade visual faz parte da avaliação do professor, mas não foi alterada nesta revisão. |
| Temas claro/escuro | Fora do escopo solicitado | Não aparecem como requisito explícito no PDF consultado. |

## Ajustes realizados nesta revisão

- Prazo de espera do formulário aumentado de 15 para 90 segundos para acomodar a inicialização do Render gratuito. Não há reenvio automático, evitando duplicar mensagens.
- Ícones vetoriais incluídos nos quatro contatos existentes, com rótulos de texto preservados.
- README ampliado com versões das dependências, instruções de uso e link desta conferência.
- Documentação dos protótipos atualizada para registrar que as capturas reais já estão publicadas.

A alteração do prazo de espera foi conferida no código e pelo build. Não foi medido um novo ciclo completo de suspensão e reinício do Render nesta revisão. O envio real anterior confirmou o fluxo após a API iniciar.

## Evidências de verificação

- Chrome: apresentação em inglês expandida, quatro destinos de navegação encontrados e quatro ícones de contato renderizados.
- Formulário vazio: navegador exibe pedido para preencher o campo obrigatório.
- E-mail inválido: navegador solicita um endereço com @.
- Nome/mensagem contendo apenas espaços: aplicação exibe aviso e não envia.
- Larguras 320 e 390 px: documento sem overflow horizontal.
- Capturas do FluxSUS: oito imagens da galeria (quatro capturas e quatro wireframes) carregaram na publicação anterior; originais das quatro capturas conferidos no GitHub.
- Back-end Java 17: cinco testes, zero falhas e zero erros; /health respondeu status ok no teste local.
- Envios reais: identificadores PORTFOLIO-8540100-VALIDACAO e PORTFOLIO-300459B-TESTE-LOCAL-PROD confirmados na caixa de entrada.
- Build do front-end aprovado após os ajustes. A automação do GitHub executa novamente build e testes para cada commit.

## Ressalvas para a entrega

1. LinkedIn: ausente porque o autor não possui perfil. O documento cita essa rede; confirmar com o professor caso a cobrança seja específica.
2. Código do FluxSUS: o professor precisa ter acesso autorizado ao repositório privado para inspecioná-lo. As imagens públicas demonstram as telas, mas não concedem acesso ao código.
3. Protótipos: a estrutura está representada; a galeria atual é posterior ao Figma. A avaliação do alinhamento visual depende da etapa excluída.
4. A revisão não substitui a apresentação final nem garante a nota. O conteúdo da experiência é acadêmico e está identificado corretamente.

## Roteiro breve de apresentação

1. Abra o site hospedado e percorra as quatro seções pelo menu.
2. Em Sobre mim, apresente formação, interesses e objetivo e abra o texto em inglês.
3. Em Projetos, explique o FluxSUS, sua contribuição, tecnologias e diferença entre capturas reais e wireframes.
4. Em Experiências, contextualize a participação acadêmica em equipe.
5. Em Contato, explique React → API Spring Boot → Resend → Gmail e mostre a confirmação de um envio real já recebido.
6. Mostre no README o Figma, a organização do código, as versões, execução local e hospedagem gratuita.
7. Explique que a API gratuita pode levar um tempo para iniciar. O formulário aguarda até 90 segundos e oferece contatos diretos quando não confirma o envio.

## Conclusão

As funcionalidades verificadas atendem aos requisitos disponíveis, com as ressalvas de LinkedIn, acesso ao repositório privado e atualização visual dos protótipos. Estilização final e temas claro/escuro não foram incluídos no trabalho desta revisão.
