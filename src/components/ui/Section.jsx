export default function Section({ id, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`}>
      <h2 id={`${id}-titulo`}>{title}</h2>
      {children}
    </section>
  );
}
