import {
  getCart,
  getCartSubtotal,
  removeFromCart,
  updateCartQuantity,
} from "../carritoStorage.js";

const SHIPPING = 12000;

const formatPrice = (price) =>
  new Intl.NumberFormat("es-CO", {
    currency: "COP",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(Number(price));

const normalizePrice = (price) => Number(price) * 4000;

const renderCartItems = (cart) => {
  if (!cart.length) {
    return `
      <div class="cart-empty">
        <h2>Tu carrito esta vacio</h2>
        <p>Agrega productos desde el catalogo para continuar con tu compra.</p>
        <a class="button-primary" href="../catalogo/">Ir al catalogo</a>
      </div>
    `;
  }

  return cart
    .map(
      (item) => `
        <article class="cart-item">
          <div class="cart-item__image">
            <img src="${item.image}" alt="${item.title}" />
          </div>
          <div class="cart-item__info">
            <h2>${item.title}</h2>
            <p>${item.category || "Producto TrendyShop"}</p>
            <strong>${formatPrice(normalizePrice(item.price))}</strong>
          </div>
          <div class="cart-item__quantity">
            <button data-cart-decrease="${item.id}" type="button" aria-label="Disminuir cantidad">-</button>
            <span>${item.quantity}</span>
            <button data-cart-increase="${item.id}" type="button" aria-label="Aumentar cantidad">+</button>
          </div>
          <button class="cart-item__remove" data-cart-remove="${item.id}" type="button">
            Quitar
          </button>
        </article>
      `,
    )
    .join("");
};

const renderSummary = () => {
  const subtotal = getCartSubtotal() * 4000;
  const shipping = 0;
  const total = subtotal;
  const shippingRow = document.querySelector("[data-cart-shipping-row]");

  document.querySelector("[data-cart-subtotal]").textContent = formatPrice(subtotal);
  document.querySelector("[data-cart-shipping]").textContent = formatPrice(shipping);
  document.querySelector("[data-cart-total]").textContent = formatPrice(total);

  if (shippingRow) {
    shippingRow.hidden = true;
  }
};

export const initCartPage = () => {
  const cartItemsRoot = document.querySelector("[data-cart-items]");

  if (!cartItemsRoot) return;

  const render = () => {
    cartItemsRoot.innerHTML = renderCartItems(getCart());
    renderSummary();
  };

  cartItemsRoot.addEventListener("click", (event) => {
    const increaseButton = event.target.closest("[data-cart-increase]");
    const decreaseButton = event.target.closest("[data-cart-decrease]");
    const removeButton = event.target.closest("[data-cart-remove]");

    if (increaseButton) {
      const item = getCart().find(
        (cartItem) => cartItem.id === Number(increaseButton.dataset.cartIncrease),
      );
      updateCartQuantity(item.id, item.quantity + 1);
    }

    if (decreaseButton) {
      const item = getCart().find(
        (cartItem) => cartItem.id === Number(decreaseButton.dataset.cartDecrease),
      );
      updateCartQuantity(item.id, item.quantity - 1);
    }

    if (removeButton) {
      removeFromCart(removeButton.dataset.cartRemove);
    }

    render();
  });

  render();
};
