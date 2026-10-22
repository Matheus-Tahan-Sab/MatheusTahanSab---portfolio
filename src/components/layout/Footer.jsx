export default function Footer({ editing = false }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div><strong>{editing ? 'SAB / EDIÇÃO DE VÍDEO' : 'MATHEUS TAHAN SAB'}</strong><p>{editing ? 'Seu conteúdo, com ritmo e personalidade.' : 'Construindo minha jornada, um projeto por vez.'}</p></div>
        <div className="footer-end"><a href={editing ? '#edicao' : '#inicio'}>Voltar ao início ↑</a></div>
      </div>
    </footer>
  );
}
