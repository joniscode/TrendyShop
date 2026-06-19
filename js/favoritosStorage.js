export const FAVORITES_KEY = "favorites";

export const getFavorites = () =>
  JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

export const saveFavorites = (favorites) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  window.dispatchEvent(new Event("favorites:updated"));
};

export const isFavorite = (id) =>
  getFavorites().some((item) => item.id === Number(id));

export const toggleFavorite = (product) => {
  if (!product) return false;

  const favorites = getFavorites();
  const exists = favorites.some((item) => item.id === product.id);

  if (exists) {
    saveFavorites(favorites.filter((item) => item.id !== product.id));
    return false;
  }

  saveFavorites([
    ...favorites,
    {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    },
  ]);

  return true;
};

export const getFavoritesCount = () => getFavorites().length;
