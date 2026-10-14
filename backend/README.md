# API de contato do portfólio

Back-end em Java 17 e Spring Boot. `POST /api/contact` recebe nome, e-mail e mensagem, valida os campos e chama a API HTTPS do Resend para enviar a mensagem ao destinatário fixo configurado no servidor. `204 No Content` significa que o provedor aceitou o envio; `GET /health` verifica se a API está disponível.

## Executar localmente

Pré-requisitos: Java 17 e Maven 3.9 ou superior. Na pasta `backend`, configure as variáveis e inicie a API:

```sh
export RESEND_API_KEY="re_sua_chave"
export RESEND_FROM="onboarding@resend.dev"
export CONTACT_TO="sabmatheus24@gmail.com"
export CORS_ALLOWED_ORIGINS="http://localhost:5173"
mvn spring-boot:run
```

Crie uma chave de envio no painel do Resend e guarde-a apenas como variável de ambiente. O remetente de teste `onboarding@resend.dev` só pode enviar para o endereço associado à sua conta Resend. Para receber mensagens em outro endereço, verifique um domínio seu no Resend e configure `RESEND_FROM` com um endereço desse domínio.

Teste a saúde:

```sh
curl http://localhost:8080/health
```

Teste o formulário (a API key deve estar configurada e o destinatário deve ser permitido pelo Resend):

```sh
curl -i -X POST http://localhost:8080/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Teste","email":"visitante@example.com","message":"Mensagem de teste"}'
```

## Front-end e hospedagem

Na raiz do projeto, configure `VITE_API_URL` com a origem pública da API. Localmente o padrão é `http://localhost:8080`. No serviço do back-end, configure `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO` e `CORS_ALLOWED_ORIGINS`; não publique a API key no Git. O Dockerfile permite hospedar a API em serviços de containers, como Render. O front-end pode continuar na Vercel.

`CORS_ALLOWED_ORIGINS` deve conter a origem exata do site publicado (sem caminho final); durante desenvolvimento use `http://localhost:5173`. Depois de configurar as URLs nas duas plataformas, envie uma mensagem real e confirme que ela chegou à caixa de entrada.

## E-mails com identidade visual

A notificação para Matheus usa `emails/notification.html`, com nome, endereço e mensagem, além de uma versão em texto simples. O HTML recebido do visitante é escapado. O destinatário principal continua fixo e o Reply-To continua sendo o e-mail do visitante.

`emails/confirmation.html` contém a confirmação automática para o visitante. Seu envio permanece **desativado por padrão** (`CONTACT_SEND_CONFIRMATION=false`). Para ativar, primeiro verifique um domínio próprio no Resend, configure `RESEND_FROM` com um remetente desse domínio e defina `CONTACT_SEND_CONFIRMATION=true`. O remetente de teste `resend.dev` não envia confirmações a visitantes. A confirmação não inclui a mensagem nem links fornecidos pelo visitante; respostas vão para o destinatário principal. Falha na confirmação não faz o formulário pedir reenvio de um contato já aceito.

O serviço Render acompanha main e publica os modelos junto com a API. A prévia visual usa dados fictícios e não envia e-mails.
