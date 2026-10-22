export function getPortfolioTheme(editing) {
  const fallback = editing ? 'dark' : 'light';
  try {
    const saved = localStorage.getItem(editing ? 'sab-editor-theme' : 'mts-portfolio-theme');
    return saved === 'light' || saved === 'dark' ? saved : fallback;
  } catch {
    return fallback;
  }
}
