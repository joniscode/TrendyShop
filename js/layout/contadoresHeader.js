import { getCartCount } from "../carritoStorage.js";
import { getFavoritesCount } from "../favoritosStorage.js";

const updateCounter = (selector, value) => {
  const counter = document.querySelector(selector);

  if (counter) {
    counter.textContent = String(value);
    counter.hidden = value <= 0;
  }
};

export const updateHeaderCounters = () => {
  updateCounter("[data-cart-count]", getCartCount());
  updateCounter("[data-favorites-count]", getFavoritesCount());
};

export const initHeaderCounters = () => {
  updateHeaderCounters();
  window.addEventListener("cart:updated", updateHeaderCounters);
  window.addEventListener("favorites:updated", updateHeaderCounters);
  window.addEventListener("storage", updateHeaderCounters);
};
