export const projects = [{
  id: 'fluxsus',
  name: 'FluxSUS',
  date: '2026-01',
  endDate: '2026-06',
  description: 'Projeto acadêmico em equipe voltado à gestão do fluxo de atendimento em unidades de saúde, com cadastro de pacientes, triagem e organização de filas de espera.',
  contribution: 'Participei da documentação e do desenvolvimento de funcionalidades, colaborando em diferentes etapas com os demais integrantes.',
  technologies: ['Java', 'Spring Boot', 'Spring Data JPA', 'MariaDB', 'HTML', 'CSS', 'JavaScript', 'Maven'],
  repositoryUrl: 'https://github.com/Matheus-Tahan-Sab/plf-es-2026-1-ti2-1372100-fluxsus',
  privateRepository: true,
  screenshots: [
    { src: '/images/projects/fluxsus/selecao-perfil-execucao.jpg', caption: 'Seleção de perfil em execução', alt: 'Tela real do FluxSUS com acesso para paciente e médico.' },
    { src: '/images/projects/fluxsus/painel-paciente-execucao.jpg', caption: 'Painel do paciente', alt: 'Painel real do FluxSUS com o usuário fictício Paciente Demonstração e opções de fila e histórico.' },
    { src: '/images/projects/fluxsus/fila-atendimento-execucao.jpg', caption: 'Acompanhamento da fila', alt: 'Tela real da fila do FluxSUS com o paciente fictício na posição um e classificação amarela calculada pelo projeto.' },
    { src: '/images/projects/fluxsus/painel-medico-execucao.jpg', caption: 'Painel do médico', alt: 'Painel real do médico fictício no FluxSUS mostrando o paciente de demonstração aguardando atendimento.' },
  ],
  images: [
    { src: '/images/projects/fluxsus/selecao-perfil.png', caption: 'Seleção de perfil', alt: 'Wireframe do FluxSUS com opções de acesso para médico e paciente.' },
    { src: '/images/projects/fluxsus/fila-atendimento.png', caption: 'Fila de atendimento', alt: 'Wireframe do FluxSUS com posição na fila, classificação de risco e estimativa de espera.' },
    { src: '/images/projects/fluxsus/cadastro-paciente.png', caption: 'Cadastro de paciente', alt: 'Wireframe do formulário de cadastro de paciente no FluxSUS.' },
    { src: '/images/projects/fluxsus/cadastro-medico.png', caption: 'Cadastro de médico', alt: 'Wireframe do formulário de cadastro de médico no FluxSUS.' },
  ],
}];
