# Organização do projeto

A aplicação usa React e Vite no front-end e uma API Spring Boot separada para o formulário de contato. O React navega por âncoras em uma página única e envia nome, e-mail e mensagem para POST /api/contact. O back-end valida os campos e envia o texto para um destinatário fixo usando Gmail SMTP. Não há banco de dados.

- main.jsx inicia o React e carrega o CSS global.
- App.jsx reúne cabeçalho, seções e rodapé.
- components/layout guarda elementos estruturais; components/ui guarda elementos reutilizáveis.
- pages contém as quatro seções do enunciado.
- data contém os dados pessoais, projetos e experiências, separados da apresentação.
- services mantém a chamada HTTP do formulário à API Spring Boot.
- backend/ contém a API Spring Boot, validação, CORS e integração de e-mail.
- assets contém recursos importados nos componentes; public contém arquivos servidos diretamente.
- docs/prototypes guarda o link do Figma e exportações dos protótipos.

As credenciais do Gmail e a origem autorizada do front-end são variáveis do servidor. Nunca são armazenadas no Git. O back-end não expõe um destinatário arbitrário: todas as mensagens são enviadas para CONTACT_TO.
