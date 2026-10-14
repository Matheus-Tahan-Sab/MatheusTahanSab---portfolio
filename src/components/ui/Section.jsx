export default function Section({ id, title, number, caption, children }) {
  return (
    <section className="portfolio-section" id={id} aria-labelledby={id + '-titulo'}>
      <header className="section-heading">
        <span className="section-number" aria-hidden="true">{number}</span>
        <div><p className="eyebrow">{caption}</p><h2 id={id + '-titulo'}>{title}</h2></div>
        <span className="section-mark" aria-hidden="true">+</span>
      </header>
      <div className="section-content">{children}</div>
    </section>
  );
}
