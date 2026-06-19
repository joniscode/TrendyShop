import { addToCart } from "../carritoStorage.js";
import { isFavorite, toggleFavorite } from "../favoritosStorage.js";
import { getProductAllClothes } from "../../services/productService.js";

const formatPrice = (price) =>
  new Intl.NumberFormat("es-CO", {
    currency: "COP",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(Number(price) * 4000);

const categoryLabel = {
  "men's clothing": "Moda hombre",
  "women's clothing": "Moda mujer",
};

const getCategoryProducts = (products) => {
  const categories = new Map();

  products.forEach((product) => {
    if (!categories.has(product.category)) {
      categories.set(product.category, product);
    }
  });

  return [...categories.values()];
};

const renderHomeProducts = (products) =>
  products
    .map(
      (product) => `
        <article class="home-product-card">
          <div class="home-product-card__image">
            <img src="${product.image}" alt="${product.title}" />
          </div>
          <div class="home-product-card__content">
            <span>${categoryLabel[product.category] || product.category}</span>
            <h3>${product.title}</h3>
            <p>${formatPrice(product.price)}</p>
            <div class="home-product-card__actions">
              <button class="button-primary" data-home-cart="${product.id}" type="button">
                Agregar
              </button>
              <button class="button-secondary" data-home-favorite="${product.id}" type="button">
                ${isFavorite(product.id) ? "Quitar gusto" : "Me gusta"}
              </button>
            </div>
          </div>
        </article>
      `,
    )
    .join("");

export const initHomePage = async () => {
  const productsRoot = document.querySelector("[data-home-products]");

  if (!productsRoot) return;

  try {
    const products = await getProductAllClothes();
    const categoryProducts = getCategoryProducts(products);

    productsRoot.innerHTML = renderHomeProducts(categoryProducts);

    productsRoot.addEventListener("click", (event) => {
      const cartButton = event.target.closest("[data-home-cart]");
      const favoriteButton = event.target.closest("[data-home-favorite]");

      if (cartButton) {
        const product = products.find((item) => item.id === Number(cartButton.dataset.homeCart));
        addToCart(product);
      }

      if (favoriteButton) {
        const product = products.find(
          (item) => item.id === Number(favoriteButton.dataset.homeFavorite),
        );
        const active = toggleFavorite(product);
        favoriteButton.textContent = active ? "Quitar gusto" : "Me gusta";
      }
    });
  } catch (error) {
    productsRoot.innerHTML = `
      <p class="home-products__error">
        No pudimos cargar los productos destacados en este momento.
      </p>
    `;
  }
};
