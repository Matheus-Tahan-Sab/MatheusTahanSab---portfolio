# Matheus Tahan Sab — Portfólio

Portfólio profissional desenvolvido para o Laboratório 01 de Desenvolvimento e Integração de Aplicações Web. O objetivo é apresentar formação, projetos, experiências e formas de contato.

## Status do projeto

Estrutura inicial em React + Vite. A navegação entre as quatro seções está implementada; a apresentação em português e inglês e as habilidades já foram adicionadas. Projetos, experiências, formulário e identidade visual ainda estão em desenvolvimento. Este repositório ainda não representa a entrega completa da Sprint 01.

## Links úteis

- [Repositório](https://github.com/Matheus-Tahan-Sab/MatheusTahanSab---portfolio)
- Site publicado: pendente.
- Protótipos no Figma: pendentes; veja [docs/prototypes](docs/prototypes/README.md).

## Funcionalidades principais

- [x] Base React com cabeçalho, conteúdo e rodapé.
- [x] Navegação para Sobre mim, Projetos, Experiências e Contato.
- [x] Layout inicial adaptável à largura da tela.
- [x] Apresentação pessoal em português e inglês, com habilidades organizadas.
- [ ] Timeline com projetos reais, tecnologias, repositórios e imagens/GIFs.
- [ ] Experiências reais com instituição, atividade, período e descrição.
- [ ] Ícones de contato e formulário com validação e envio real de e-mail.
- [ ] Temas claro e escuro.
- [ ] Wireframes de média fidelidade no Figma e imagens neste README.
- [ ] Hospedagem na nuvem e revisão final de responsividade/usabilidade.

## Tecnologias utilizadas

JavaScript, HTML, CSS, React e React DOM. Vite e @vitejs/plugin-react são as dependências de desenvolvimento. As versões estão em package.json e as resoluções exatas em package-lock.json. Nenhuma biblioteca de componentes ou serviço de e-mail foi adicionada nesta etapa.

## Arquitetura

Aplicação de página única com navegação por âncoras. Conteúdo, componentes e estilos ficam separados para facilitar a evolução. Veja [a organização da arquitetura](docs/architecture.md).

## Estrutura de pastas

| Caminho | Responsabilidade |
| --- | --- |
| src/components/layout/ | Cabeçalho e rodapé. |
| src/components/ui/ | Elementos reutilizáveis, como Section. |
| src/pages/ | Sobre mim, Projetos, Experiências e Contato. |
| src/data/ | Dados pessoais, projetos e experiências. |
| src/services/ | Futuras integrações com serviços externos. |
| src/styles/ | CSS global e futuros temas. |
| src/assets/ | Imagens e ícones importados nos componentes. |
| public/images/projects/ | Capturas de tela e GIFs dos projetos. |
| public/documents/ | Arquivos públicos para download, como currículo. |
| docs/prototypes/ | Link do Figma e exportações dos protótipos. |
| src/App.jsx | Montagem da interface principal. |
| src/main.jsx | Inicialização do React. |
| index.html | Documento HTML carregado pelo navegador. |
| vite.config.js | Configuração do Vite. |

Arquivos .gitkeep mantêm as pastas vazias no Git; podem ser removidos quando houver conteúdo real.

## Instalação e execução

Pré-requisitos: Git, Node.js 22.12 ou superior e npm. Se usa nvm, execute nvm install e nvm use na raiz do projeto para usar a versão indicada em .nvmrc.

```bash
git clone https://github.com/Matheus-Tahan-Sab/MatheusTahanSab---portfolio.git
cd MatheusTahanSab---portfolio
npm ci
npm run dev
```

Abra a URL exibida no terminal (normalmente http://localhost:5173). Para abrir a pasta no VS Code, execute `code .` na raiz, caso esse comando esteja instalado.

Se já clonou o repositório, execute `git pull` dentro da pasta e depois `npm ci`.

### Build e preview

```bash
npm run build
npm run preview
```

O build gera dist/. O preview permite conferir essa versão localmente. Para encerrar um servidor no terminal, pressione Ctrl+C.

### Variáveis de ambiente

Nenhuma variável é necessária nesta etapa. Quando a integração de e-mail for implementada, seus requisitos serão documentados. Arquivos .env e .env.local são ignorados pelo Git; variáveis com prefixo VITE_ ficam visíveis no navegador e não devem conter segredos.

## Deploy

Ainda não realizado. O artefato de publicação é dist/, gerado por npm run build. A hospedagem será configurada em etapa posterior e seu endereço será registrado aqui. Não existe back-end próprio nesta versão.

## Demonstração e verificações

Capturas de tela e GIFs serão adicionados após os protótipos. Para conferir a base, execute o build e abra o servidor local; verifique os quatro links de navegação e a largura de celular. Não há suíte de testes automatizados nesta etapa.

## Autor

[Matheus Tahan Sab](https://github.com/Matheus-Tahan-Sab).

## Referências e agradecimentos

- [Template de README do professor João Paulo Aramuni](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/blob/main/TEMPLATES/template_README.md), adaptado ao escopo atual.
- [Portfólio do professor](https://github.com/joaopauloaramuni/joaopauloaramuni-portfolio), referência para a escolha de React + Vite e para as futuras integrações.
- [React](https://react.dev/) e [Vite](https://vite.dev/).

## Licença

Ainda não definida pelo autor.
