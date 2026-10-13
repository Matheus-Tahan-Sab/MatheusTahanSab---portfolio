const navigation = [
  { href: '#sobre', label: 'Sobre mim' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#experiencias', label: 'Experiências' },
  { href: '#contato', label: 'Contato' },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#inicio" aria-label="Matheus Tahan Sab — início">
          <span className="device-light" aria-hidden="true" />
          <span className="brand-copy"><strong>MTS<span>.</span></strong><small>PORTFÓLIO / #001</small></span>
        </a>
        <nav className="main-nav" aria-label="Navegação principal">
          {navigation.map((item, index) => (
            <a href={item.href} key={item.href}><span aria-hidden="true">{'0' + (index + 1)}</span>{item.label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
