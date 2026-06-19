import {
  getProductAllClothes,
  getProductAllMensClothes,
  getProductAllWomensClothes,
  getProductById,
} from "../services/productService.js";
import { addToCart } from "./carritoStorage.js";
import { getFavorites, isFavorite, toggleFavorite } from "./favoritosStorage.js";

const listProductDOM = document.getElementById("product-list");
const favoritesListDOM = document.querySelector("[data-favorites-list]");
const bntGetAll = document.getElementById("btn-get-all");
const bntGetWomen = document.getElementById("btn-get-women");
const bntGetMen = document.getElementById("btn-get-men");

let products = await getProductAllClothes();

renderProduct(products);
renderFavorites();

bntGetAll.addEventListener("click", async () => {
  products = await getProductAllClothes();
  renderProduct(products);
});

bntGetMen.addEventListener("click", async () => {
  products = await getProductAllMensClothes();
  renderProduct(products);
});

bntGetWomen.addEventListener("click", async () => {
  products = await getProductAllWomensClothes();
  renderProduct(products);
});

listProductDOM.addEventListener("click", (e) => {
  const button = e.target.closest(".view-detail");
  if (!button) return;
  const id = button.dataset.id;

  viewDetailProduct(id);
});

listProductDOM.addEventListener("click", (e) => {
  const button = e.target.closest(".cartBtn");
  if (!button) return;

  const id = Number(button.dataset.id);

  const product = products.find((p) => p.id === id);

  addToCart(product);
  showProductMessage("Producto agregado con exito");
});

listProductDOM.addEventListener("click", (e) => {
  const button = e.target.closest(".favoriteBtn");
  if (!button) return;

  const id = Number(button.dataset.id);
  const product = products.find((p) => p.id === id);
  const active = toggleFavorite(product);

  button.textContent = active ? "Quitar de favoritos" : "Me gusta";
  renderFavorites();
});

if (favoritesListDOM) {
  favoritesListDOM.addEventListener("click", (e) => {
    const cartButton = e.target.closest("[data-favorite-cart]");
    const removeButton = e.target.closest("[data-favorite-remove]");

    if (cartButton) {
      const product = getFavorites().find(
        (item) => item.id === Number(cartButton.dataset.favoriteCart),
      );
      addToCart(product);
      showProductMessage("Favorito agregado al carrito");
    }

    if (removeButton) {
      const product = getFavorites().find(
        (item) => item.id === Number(removeButton.dataset.favoriteRemove),
      );
      toggleFavorite(product);
      renderFavorites();
      renderProduct(products);
    }
  });
}

function showProductMessage(title) {
  if (window.Swal) {
    Swal.fire({
      icon: "success",
      title,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

function truncateText(text, maxLength = 80) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}
function renderProduct(listProducts) {
  listProductDOM.innerHTML = "";

  listProducts.forEach((product) => {
    listProductDOM.innerHTML += `
      <div class="col-lg-4 col-md-6 col-sm-10 mb-4 d-flex justify-content-center">
        
        <div class="card product-card shadow-sm w-100">

          <img
            src="${product.image}"
            class="card-img-top product-image"
            alt="${product.title}"
          >

          <div class="card-body d-flex flex-column">

            <span class="badge bg-dark mb-2">
              ${product.category}
            </span>

            <h5 class="product-title">
              ${truncateText(product.title, 30)}
            </h5>

            <p class="product-description">
              ${truncateText(product.description, 90)}
            </p>

            <div class="product-footer mt-auto">

              <h4 class="fw-bold mb-1">
                $${product.price}
              </h4>

              <div class="rating mb-3">
                ⭐ ${product.rating.rate}
                <small class="text-muted">
                  (${product.rating.count} reviews)
                </small>
              </div>

              <button class="cartBtn w-100" data-id="${product.id}">
                <svg class="cart" fill="white" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                    Agregar al carrito
                 <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" class="product"><path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"></path></svg>
              </button>

              <button class="cartBtn view-detail mt-2 w-100" data-id="${product.id}">
                Ver detalles
              </button>

              <button class="favoriteBtn mt-2 btn btn-outline-dark w-100" data-id="${product.id}">
                ${isFavorite(product.id) ? "Quitar de favoritos" : "Me gusta"}
              </button>

            </div>

          </div>

        </div>
      </div>
    `;
  });
}

function renderFavorites() {
  if (!favoritesListDOM) return;

  const favorites = getFavorites();

  if (!favorites.length) {
    favoritesListDOM.innerHTML = `
      <p class="catalog-favorites__empty">
        Aun no tienes productos favoritos.
      </p>
    `;
    return;
  }

  favoritesListDOM.innerHTML = favorites
    .map(
      (product) => `
        <article class="favorite-card">
          <img src="${product.image}" alt="${product.title}" />
          <div>
            <span>${product.category}</span>
            <h3>${truncateText(product.title, 45)}</h3>
            <strong>$${product.price}</strong>
          </div>
          <button class="button-primary" data-favorite-cart="${product.id}" type="button">
            Agregar
          </button>
          <button class="button-secondary" data-favorite-remove="${product.id}" type="button">
            Quitar
          </button>
        </article>
      `,
    )
    .join("");
}

async function viewDetailProduct(id) {
  let products = await getProductById(id);

  listProductDOM.innerHTML = "";

  listProductDOM.innerHTML = `
        <section class="container py-10">
        <div class="row align-items-center">

            <div class="col-lg-6">
            <div class="bg-light p-4 rounded text-center">
                <img
                src="${products.image}"
                alt="${products.title}"
                class="img-fluid product-detail-image"
                >
            </div>
            </div>

            <div class="col-lg-6 mt-4 mt-lg-0">
            <span class="badge bg-dark mb-3">
                ${products.category}
            </span>

            <h1 class="fw-bold mb-3">
                ${products.title}
            </h1>

            <p class="text-muted mb-4">
                ${products.description}
            </p>

            <h2 class="text-success fw-bold mb-4">
                $${products.price}
            </h2>

            <button class="cartBtn" data-id="${products.id}">
            <svg class="cart" fill="white" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
            Agregar al carrito
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" class="product"><path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"></path></svg>
            </button>
                        

            </div>

        </div>
        </section>
            
     `;
}
