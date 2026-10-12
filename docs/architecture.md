# Organização do projeto

A base usa React e Vite, com navegação por âncoras em uma única página. A pasta pages separa cada seção; não há necessidade de roteador nesta etapa.

- main.jsx inicia o React e carrega o CSS global.
- App.jsx reúne cabeçalho, seções e rodapé.
- components/layout guarda elementos estruturais; components/ui guarda elementos reutilizáveis.
- pages contém as quatro seções do enunciado.
- data contém os dados pessoais, projetos e experiências, separados da apresentação.
- services receberá integrações externas, começando pelo envio de e-mail.
- assets contém recursos importados pelo JavaScript; public contém arquivos servidos diretamente.
- docs/prototypes guarda as evidências do Figma.

Ainda não há back-end próprio, banco de dados ou envio de e-mail. A solução do formulário será definida e documentada na etapa de implementação; o enunciado cita EmailJS como possibilidade. Caso seja necessário um back-end próprio, sua pasta e configuração serão adicionadas quando a arquitetura for definida.

A prioridade atual é a estrutura funcional. Temas claro/escuro, identidade visual e efeitos serão implementados depois.
