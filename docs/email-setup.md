# Configurar o formulário de contato

A integração usa a API REST do EmailJS, sem dependência adicional. O formulário só habilita o envio quando as três variáveis públicas estão preenchidas.

1. Crie/accesse sua conta em https://dashboard.emailjs.com/ e conecte um serviço de e-mail.
2. Crie um template com destinatário FIXO sabmatheus24@gmail.com. Não use um destinatário fornecido pelo visitante.
3. No template, use {{from_name}} para o nome, {{reply_to}} como Reply-To e {{message}} para a mensagem. Mantenha o remetente conforme as regras do serviço conectado.
4. Copie .env.example para .env.local e preencha Service ID, Template ID e Public Key. Não use senha de e-mail nem Private Key no código.
5. Reinicie npm run dev. Para hospedagem, configure as mesmas variáveis na plataforma e gere um novo build.
6. Faça um envio real e confira recebimento e resposta antes de considerar o requisito concluído. Configure os domínios permitidos e proteções antispam oferecidas pelo serviço antes da publicação.

O código valida campos obrigatórios, formato de e-mail, limites e textos vazios, bloqueia cliques durante o envio e trata falhas. Sucesso significa que a API aceitou o pedido; confirme também a entrega na caixa de entrada.

Referência: https://www.emailjs.com/docs/rest-api/send/
