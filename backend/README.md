# API de contato do portfólio

Back-end em Java 17 e Spring Boot. O endpoint POST /api/contact recebe nome, e-mail e mensagem, valida os campos e envia uma mensagem de texto para um destinatário fixo configurado no servidor. A resposta 204 indica que o SMTP aceitou a solicitação. GET /health verifica se a API está disponível.

## Executar localmente

Pré-requisitos: Java 17 e Maven 3.9 ou superior.

Na pasta backend, configure as variáveis de ambiente e execute:

    export MAIL_USERNAME="seu-gmail@gmail.com"
    export MAIL_PASSWORD="sua-senha-de-app-do-google"
    export CONTACT_TO="sabmatheus24@gmail.com"
    export CORS_ALLOWED_ORIGINS="http://localhost:5173"
    mvn spring-boot:run

Nunca use a senha normal da conta Google. Ative a verificação em duas etapas e crie uma senha de app. Não grave credenciais no Git ou no .env versionado.

Teste a saúde:

    curl http://localhost:8080/health

Teste o formulário:

    curl -i -X POST http://localhost:8080/api/contact \
      -H 'Content-Type: application/json' \
      -d '{"name":"Teste","email":"visitante@example.com","message":"Mensagem de teste"}'

## Front-end

Na raiz do projeto React, ajuste VITE_API_URL para a origem da API. Localmente o padrão é http://localhost:8080. Em produção, configure essa variável na Vercel e faça novo deploy. Configure CORS_ALLOWED_ORIGINS no back-end com a origem exata do front-end publicado.

## Hospedagem

O Dockerfile desta pasta permite hospedar a API em um serviço que aceite containers (por exemplo, Render). Configure MAIL_USERNAME, MAIL_PASSWORD, CONTACT_TO e CORS_ALLOWED_ORIGINS como variáveis privadas do serviço. O host injeta PORT automaticamente. Não compartilhe nem publique a senha de app.

O front-end pode continuar na Vercel. São dois serviços, então a URL pública da API e os domínios CORS precisam ser registrados nas variáveis de ambiente de cada plataforma.
