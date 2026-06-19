export const renderHeader = (basePath = ".") => {
  const base = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;

  return `
  <header class="site-header">
    <div class="container site-header__content">
      <a class="site-logo" href="${base}/index.html">Equipo mejor</a>

      <nav class="site-nav" aria-label="Navegacion principal">
        <a href="${base}/index.html">Inicio</a>
        <a href="${base}/catalogo/">Catalogo</a>
        <a href="${base}/quienes-somos/">Quienes somos</a>
        <a href="${base}/contactanos/">Contactanos</a>
        <a href="${base}/carrito/">Carrito</a>
      </nav>
    </div>
  </header>
`;
};
