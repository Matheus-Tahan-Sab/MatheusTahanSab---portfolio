# Imagens do FluxSUS

Wireframes copiados sem alterações do repositório [FluxSUS](https://github.com/Matheus-Tahan-Sab/plf-es-2026-1-ti2-1372100-fluxsus), da pasta `wireframes/` na branch `main`.

| Arquivo no portfólio | Arquivo original | Conteúdo |
| --- | --- | --- |
| `selecao-perfil.png` | `wireframes/tela medico ou paciente.png` | Seleção do perfil de acesso. |
| `fila-atendimento.png` | `wireframes/FilaAtendimento.png` | Posição na fila, risco e espera estimada. |
| `cadastro-paciente.png` | `wireframes/cadastro paciente.png` | Formulário vazio de cadastro do paciente. |
| `cadastro-medico.png` | `wireframes/cadastro medico.png` | Formulário vazio de cadastro profissional. |

Estas imagens são protótipos de interface; não comprovam a execução do sistema. Não há dados pessoais preenchidos nas imagens de cadastro selecionadas.

## Capturas do sistema em execução

Quatro capturas reais, sem edição, realizadas no Chrome em 13/10/2026, com viewport de 390 × 844 px:

| Arquivo | Tela |
| --- | --- |
| `selecao-perfil-execucao.jpg` | Seleção de perfil. |
| `painel-paciente-execucao.jpg` | Painel após cadastro de paciente fictício. |
| `fila-atendimento-execucao.jpg` | Posição na fila após ficha gravada pela API e check-in de apresentação. |
| `painel-medico-execucao.jpg` | Painel médico mostrando o mesmo paciente fictício na fila. |

### Ambiente e limites da demonstração

- Código-fonte: [FluxSUS, commit 1a26015](https://github.com/Matheus-Tahan-Sab/plf-es-2026-1-ti2-1372100-fluxsus/commit/1a26015f89553008334fc393a9b98b1c834d9e41).
- Front-end original em HTML/CSS/JavaScript servido pela API local na porta 9999.
- API Spring Boot 4.0.6 compilada com JDK 26, usando o nível Java 25 definido no projeto.
- Para a execução local, foi adicionada somente a dependência de runtime H2 e configurado um banco em memória no modo de compatibilidade MariaDB, com criação e descarte de tabelas. O MariaDB original não foi executado.
- Nomes, contatos, identificadores e informações de saúde pertencem a personagens fictícios de demonstração. Nenhuma informação real de paciente ou médico foi utilizada.
- O check-in usa o botão `Simular QR Válido`, existente em `qr-checkin.html`. Não houve teste de câmera ou validação de QR Code real.
- A API gravou e retornou a ficha e a fila usadas pelas telas. O cadastro de ambos os perfis foi feito pelo navegador.
- O build e o teste de contexto do FluxSUS passaram neste ambiente.
- Não foram alterados a aparência, o JavaScript, as regras de negócio ou os controladores para produzir as capturas.
- O repositório original do FluxSUS não foi modificado. As capturas não comprovam implantação clínica ou validação médica.
