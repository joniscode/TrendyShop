const getCurrentYear = () => new Date().getFullYear();

export const renderFooter = (basePath = ".") => {
  const base = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;

  return `
  <!-- Inicio Footer -->
  <footer class="site-footer">
    <div class="container site-footer__content">
      <section class="site-footer__brand" aria-label="Informacion de la tienda">
        <a class="site-logo site-logo--footer" href="${base}/index.html">
          <img
            class="site-logo__image"
            src="${base}/assets/images/trendyshop_favicon_512.png"
            alt=""
            aria-hidden="true"
          />
          <span>TrendyShop</span>
        </a>
        <p>
          Tienda online creada con una estructura modular para catalogo,
          contacto y carrito de compras.
        </p>
      </section>

      <div class="site-footer__nav-columns">
        <section class="site-footer__links" aria-label="Enlaces del sitio">
          <h2>Mapa del sitio</h2>
          <a href="${base}/index.html">Inicio</a>
          <a href="${base}/catalogo/">Catalogo</a>
          <a href="${base}/quienes-somos/">Quienes somos</a>
          <a href="${base}/contactanos/">Contactanos</a>
          <a href="${base}/carrito/">Carrito</a>
        </section>

        <section class="site-footer__links" aria-label="Enlaces de respaldo">
          <h2>Respaldo</h2>
          <a href="https://www.ccb.org.co/" target="_blank" rel="noopener noreferrer">
            Camara de Comercio
          </a>
          <a href="https://www.dian.gov.co/" target="_blank" rel="noopener noreferrer">
            DIAN
          </a>
          <a href="https://www.rues.org.co/" target="_blank" rel="noopener noreferrer">
            RUES
          </a>
          <a href="https://www.sic.gov.co/" target="_blank" rel="noopener noreferrer">
            Superintendencia de Industria y Comercio
          </a>
          <a href="https://www.gov.co/" target="_blank" rel="noopener noreferrer">
            GOV.CO
          </a>
        </section>
      </div>
    </div>

    <div class="container site-footer__bottom">
      <p>&copy; ${getCurrentYear()} TrendyShop. Todos los derechos reservados.</p>
    </div>
  </footer>
  <!-- Fin Footer -->
`;
};
