// Adaptado dos exemplos de João Paulo Aramuni (MIT). Veja docs/credits/LICENSE-Aramuni.txt.
// geminiConfig.js
// Configurações do componente <GeminiChat />.
//
// A chave do Gemini NÃO fica aqui: ela é lida só no servidor (GEMINI_API_KEY),
// pela Vercel Function api/gemini.js e pelo vite.config.js no npm run dev.
// O que a IA sabe sobre você fica em api/_perfil.js.
const GEMINI_CONFIG = {
  API_PATH: "/api/gemini",

  // Nome que aparece no cabeçalho do chat e nas respostas
  ASSISTANT_NAME: "Matheus",

  // Primeira mensagem do chat
  WELCOME:
    "Olá! Sou o assistente de IA do portfólio de Matheus Tahan Sab. Posso responder sobre a formação, os projetos e as habilidades dele.",

  // Botões de pergunta pronta
  SUGGESTIONS: [
    "Quais tecnologias Matheus utiliza?",
    "Me conte sobre seus projetos",
    "Onde você estuda?",
    "Como entro em contato?",
  ],

  // Tamanho máximo da pergunta (o servidor também confere)
  MAX_MESSAGE: 1000,

  // Quantas mensagens anteriores vão junto em cada pergunta (contexto da conversa)
  MAX_HISTORY: 10,
};

export default GEMINI_CONFIG;

