# Matheus Tahan Sab — Portfólio

Portfólio profissional desenvolvido para o Laboratório 01 de Desenvolvimento e Integração de Aplicações Web. O projeto apresenta formação, projetos, experiências e formas de contato.

## Status do projeto

Front-end em React + Vite publicado na Vercel e API de contato em Java 17 + Spring Boot publicada no Render. O formulário envia e-mails pelo Resend via HTTPS, com recebimento real confirmado em 12/10/2026. O conteúdo do FluxSUS, experiência acadêmica e links de contato já estão cadastrados. As imagens do projeto, protótipos do Figma e temas claro e escuro ainda estão pendentes.

## Links úteis

- [Repositório](https://github.com/Matheus-Tahan-Sab/MatheusTahanSab---portfolio)
- [Site publicado](https://matheus-tahan-sab-portfolio.vercel.app)
- [API de contato](https://matheus-tahan-sab-portfolio-api.onrender.com)
- [Verificação de saúde da API](https://matheus-tahan-sab-portfolio-api.onrender.com/health)
- Protótipos no Figma: pendentes; veja [docs/prototypes](docs/prototypes/README.md).

## Funcionalidades principais

- [x] Apresentação pessoal em português e inglês.
- [x] Navegação para Sobre mim, Projetos, Experiências acadêmicas e Contato.
- [x] Timeline do FluxSUS, período, contribuição, tecnologias e repositório.
- [x] Links de e-mail, WhatsApp, Discord e GitHub.
- [x] API própria Spring Boot com validação e envio ao destinatário configurado no servidor.
- [x] Configuração CORS e mensagens de erro sem expor detalhes internos.
- [x] Configurar a chave do Resend e testar recebimento real.
- [ ] Adicionar imagens/GIFs do FluxSUS em execução.
- [ ] Criar wireframes de média fidelidade no Figma e adicionar as capturas ao README.
- [ ] Implementar temas claro e escuro.
- [x] Hospedar front-end e back-end e registrar as URLs aqui.

## Tecnologias utilizadas

- Front-end: JavaScript, HTML, CSS, React, React DOM, Vite.
- Back-end: Java 17, Spring Boot 3.4.5, Spring Web, Bean Validation, Maven e API HTTPS do Resend.
- Testes do back-end: JUnit, Spring Boot Test e MockMvc.
- Hospedagem: Vercel (Hobby) para o front-end e Render (Free, Docker) para o back-end.

## Arquitetura

O React envia nome, e-mail e mensagem via JSON para POST /api/contact. A API valida os campos, fixa o endereço de destino por configuração de servidor e envia uma mensagem de texto pela API HTTPS do Resend. O visitante não escolhe o destinatário, evitando que a API funcione como relay aberto. Não há banco de dados. Veja [docs/architecture.md](docs/architecture.md) e [backend/README.md](backend/README.md).

## Estrutura de pastas

| Caminho | Responsabilidade |
| --- | --- |
| src/components/layout/ | Cabeçalho e rodapé. |
| src/components/ui/ | Elementos reutilizáveis, como Section. |
| src/pages/ | As quatro seções do portfólio. |
| src/data/ | Dados pessoais, projetos e experiências. |
| src/services/ | Cliente HTTP do formulário que chama o back-end. |
| src/styles/ | Estilos globais e futuros temas. |
| public/images/projects/ | Capturas de tela e GIFs dos projetos. |
| docs/ | Arquitetura e protótipos. |
| backend/src/main/java/ | API, validação e serviço de envio de e-mail. |
| backend/src/main/resources/ | Configurações do Spring Boot. |
| backend/src/test/ | Testes da API. |
| backend/Dockerfile | Imagem para hospedagem do back-end. |

## Instalação e execução

Pré-requisitos do front-end: Git, Node.js 22.12 ou superior e npm. Para o back-end: Java 17 e Maven 3.9 ou superior.

### Front-end

Na raiz do projeto:

    npm ci
    npm run dev

Abra o endereço mostrado no terminal, geralmente http://localhost:5173. O front aponta por padrão para http://localhost:8080. Para mudar, defina VITE_API_URL antes do build; a variável contém apenas a URL pública da API.

### Back-end

Consulte [backend/README.md](backend/README.md). O back-end precisa das variáveis RESEND_API_KEY, RESEND_FROM e CONTACT_TO. Nunca coloque a chave no código ou no Git.

### Build

    npm run build

Para executar testes e empacotar a API, entre em backend e rode:

    mvn test
    mvn package

## Variáveis de ambiente

| Variável | Onde | Uso |
| --- | --- | --- |
| VITE_API_URL | Front-end | URL base da API Spring Boot. |
| RESEND_API_KEY | Back-end | Chave secreta de envio do Resend, guardada no host. |
| RESEND_FROM | Back-end | Remetente autorizado; `onboarding@resend.dev` para teste ou endereço do domínio verificado. |
| CONTACT_TO | Back-end | Destinatário fixo, padrão sabmatheus24@gmail.com. |
| CORS_ALLOWED_ORIGINS | Back-end | Origem do front-end autorizada a chamar a API. |
| PORT | Back-end | Porta fornecida automaticamente pela hospedagem. |

## Deploy

O front-end está publicado na Vercel e o back-end no Render, ambos em planos gratuitos. A versão validada na publicação corresponde ao commit [`8540100`](https://github.com/Matheus-Tahan-Sab/MatheusTahanSab---portfolio/commit/85401005e067fd654f5d8ef505addf8347f35502), na branch `main`.

| Plataforma | Configuração pública |
| --- | --- |
| Vercel | `VITE_API_URL=https://matheus-tahan-sab-portfolio-api.onrender.com` |
| Render | `CORS_ALLOWED_ORIGINS=https://matheus-tahan-sab-portfolio.vercel.app` |
| Render | `RESEND_FROM=onboarding@resend.dev` |
| Render | `CONTACT_TO=sabmatheus24@gmail.com` |

A chave `RESEND_API_KEY` está configurada apenas no ambiente do Render; seu valor não é publicado no repositório. O serviço usa o Dockerfile da pasta `backend` e a rota `/health` como verificação de saúde.

O remetente de teste `onboarding@resend.dev` permite enviar apenas para o endereço associado à conta Resend, que neste projeto é o destinatário fixo acima. Para usar um remetente próprio ou outro destinatário, é necessário verificar um domínio no Resend.

No plano gratuito do Render, a API pode entrar em suspensão após períodos de inatividade. A primeira solicitação pode demorar cerca de 50 segundos ou mais enquanto o serviço inicia.

## Demonstração e verificações

Em 12/10/2026, o formulário do site publicado foi validado com um envio real ao destinatário `sabmatheus24@gmail.com`. O front-end exibiu **“Mensagem enviada com sucesso!”**, o Resend registrou o status **`delivered`** e a mensagem **“Nova mensagem pelo portfólio”** foi confirmada na caixa de entrada do Gmail. O teste continha o identificador `PORTFOLIO-8540100-VALIDACAO`, confirmando o fluxo Vercel → API Spring Boot no Render → Resend → Gmail.

O build do front-end e os testes do back-end passaram no GitHub Actions para o commit da publicação. O back-end tem testes para aceitar solicitações válidas e recusar e-mail inválido ou mensagem em branco antes de chamar o serviço de envio.

As capturas de tela e GIFs do FluxSUS ainda serão adicionados em `public/images/projects/`.

## Autor

[Matheus Tahan Sab](https://github.com/Matheus-Tahan-Sab).

## Referências

- [Template de README do professor João Paulo Aramuni](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/blob/main/TEMPLATES/template_README.md).
- [Exemplo SendEmail Spring Boot do professor](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/tree/main/PROJETOS/SpringBoot/SendEmail), adaptado para receber mensagens com destinatário fixo e variáveis de ambiente.
- [React](https://react.dev/), [Vite](https://vite.dev/) e [Spring Boot](https://spring.io/projects/spring-boot).

## Licença

Ainda não definida pelo autor.
