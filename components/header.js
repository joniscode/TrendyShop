export const renderHeader = (basePath = ".") => {
  const base = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;

  return `
  <!-- Inicio Header -->
  <header class="site-header">
    <div class="container site-header__content">
      <a class="site-logo" href="${base}/index.html" aria-label="Ir al inicio">
        <img
          class="site-logo__image"
          src="${base}/assets/images/logo.svg"
          alt="TrendyShop"
        />
      </a>

      <button
        class="site-menu-button"
        type="button"
        aria-controls="site-nav"
        aria-expanded="false"
      >
        Menu
      </button>

      <nav class="site-nav" id="site-nav" aria-label="Navegacion principal">
        <a href="${base}/index.html">Inicio</a>
        <a href="${base}/catalogo/">Catalogo</a>
        <a href="${base}/quienes-somos/">Quienes somos</a>
        <a href="${base}/contactanos/">Contactanos</a>
        <a href="${base}/carrito/">Carrito</a>
      </nav>
    </div>
  </header>
  <!-- Fin Header -->
`;
};
