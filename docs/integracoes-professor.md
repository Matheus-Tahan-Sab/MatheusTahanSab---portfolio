# Componentes da disciplina no portfólio

Fonte: [João Paulo Aramuni - Desenvolvimento e Integração de Aplicações Web](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/tree/main/PROJETOS/React). Licença MIT preservada em `docs/credits/LICENSE-Aramuni.txt`.

- **SkillsGlobe:** componentes de globo e filtros adaptados, com apenas as 14 tecnologias do perfil de Matheus. React e Vite continuam marcados como “Em aprendizado”. Ícones locais Devicon (licença em `public/images/skills/LICENSE-Devicon.txt`) e ícone SQL próprio. Suporta arrasto, teclado, pausa e visualização em lista.
- **GitHubAPI:** perfil, indicadores, linguagens e repositórios do usuário fixo `Matheus-Tahan-Sab`. Rota `/api/github`, cache CDN de dez minutos e chave opcional somente no servidor. Repositórios privados são descartados. Sem chave, a API continua sujeita à cota anônima do GitHub; indisponibilidade gera aviso com link para o perfil.
- **CurriculumPDF:** visualizador original baseado em react-pdf, carregado apenas ao abrir o currículo. PDF próprio de uma página, explicitamente identificado como rascunho para revisão. Nenhum currículo fictício do exemplo foi copiado.
- **WakaTimeAPI:** componentes e funções preparados. Oculto até configurar `WAKATIME_API_KEY` ou perfil público `WAKATIME_USERNAME`. Não existem estatísticas reais ainda. Nomes de projetos não são publicados pelo painel; o componente “Codando agora” está desativado na interface e só tem permissão para exibir nomes da pasta do portfólio caso usado posteriormente.
- **GeminiAPI:** chat e streaming preparados, com perfil público de Matheus e identificação clara de assistente de IA. Oculto até configurar `GEMINI_API_KEY` e um `GEMINI_MODEL` válido disponível na conta. Não houve chamada real ao Gemini. Não existe modelo presumido nem chave no front-end. Limites por IP do exemplo são em memória por instância, não uma cota global garantida.

`/api/integrations` revela somente dois indicadores booleanos de disponibilidade. O formulário `POST /api/contact` continua usando a API Java no Render; nenhuma chave existente foi alterada.

## Configuração pendente

Criar contas/credenciais necessárias com consentimento aos termos e guardar as chaves diretamente na Vercel, sem prefixo `VITE_`. Não ativar faturamento. WakaTime começa a registrar atividade depois da instalação e configuração de sua extensão no editor; não recupera automaticamente o histórico anterior. Revisar o currículo antes de utilizá-lo como versão final.
