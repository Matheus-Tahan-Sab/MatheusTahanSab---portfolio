# Componentes da disciplina no portfólio

Fonte: [João Paulo Aramuni - Desenvolvimento e Integração de Aplicações Web](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/tree/main/PROJETOS/React). Licença MIT preservada em `docs/credits/LICENSE-Aramuni.txt`.

- **SkillsGlobe:** componentes de globo e filtros adaptados, com apenas as 14 tecnologias do perfil de Matheus. React e Vite continuam marcados como “Em aprendizado”. Ícones locais Devicon (licença em `public/images/skills/LICENSE-Devicon.txt`) e ícone SQL próprio. Suporta arrasto, teclado, pausa e visualização em lista.
- **GitHubAPI:** perfil, indicadores, linguagens e repositórios do usuário fixo `Matheus-Tahan-Sab`. Rota `/api/github`, cache CDN de dez minutos e chave opcional somente no servidor. Repositórios privados são descartados. Sem chave, a API continua sujeita à cota anônima do GitHub; indisponibilidade gera aviso com link para o perfil.
- **CurriculumPDF:** visualizador original baseado em react-pdf, carregado apenas ao abrir o currículo. PDF próprio de uma página, explicitamente identificado como rascunho para revisão. Nenhum currículo fictício do exemplo foi copiado.
- **WakaTimeAPI:** conectado na prévia com `WAKATIME_API_KEY` armazenada como Secret na Vercel. A chamada real retornou uma conta sem atividade registrada. A extensão WakaTime 30.2.1 foi instalada no VS Code; a inserção da chave no editor ainda depende do usuário. Nomes de projetos não são publicados pelo painel; o componente “Codando agora” está desativado na interface e só tem permissão para exibir nomes da pasta do portfólio caso usado posteriormente.
- **GeminiAPI:** chat e streaming ativos na prévia, com perfil público de Matheus, identificação de IA, confirmação de idade e aviso sobre processamento pelo Google. `GEMINI_API_KEY` está armazenada como Secret e `GEMINI_MODEL=gemini-3.5-flash-lite` como Config na Vercel, somente em Preview. Uma chamada real sobre as tecnologias retornou uma resposta coerente com o perfil. O projeto Google permanece no nível gratuito, sem ativar faturamento. Não existe modelo presumido nem chave no front-end. Limites por IP do exemplo são em memória por instância, não uma cota global garantida.

`/api/integrations` revela somente dois indicadores booleanos de disponibilidade. O formulário `POST /api/contact` continua usando a API Java no Render; nenhuma chave existente foi alterada.

## Próximos passos

Contas e credenciais configuradas com consentimento aos termos. Nenhuma chave foi publicada no Git ou exposta no front-end. A produção e a branch main permanecem sem estas novas integrações. Não ativar faturamento. WakaTime começa a registrar atividade depois da instalação e configuração de sua extensão no editor; não recupera automaticamente o histórico anterior. Revisar o currículo antes de utilizá-lo como versão final.
