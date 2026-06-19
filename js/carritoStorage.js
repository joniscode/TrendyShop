export const CART_KEY = "cart";

export const getCart = () => JSON.parse(localStorage.getItem(CART_KEY)) || [];

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart:updated"));
};

export const addToCart = (product) => {
  if (!product) return;

  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1,
    });
  }

  saveCart(cart);
};

export const updateCartQuantity = (id, quantity) => {
  const nextQuantity = Number(quantity);
  const cart = getCart()
    .map((item) =>
      item.id === Number(id) ? { ...item, quantity: nextQuantity } : item,
    )
    .filter((item) => item.quantity > 0);

  saveCart(cart);
};

export const removeFromCart = (id) => {
  const cart = getCart().filter((item) => item.id !== Number(id));

  saveCart(cart);
};

export const getCartCount = () =>
  getCart().reduce((total, item) => total + Number(item.quantity || 0), 0);

export const getCartSubtotal = () =>
  getCart().reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );
