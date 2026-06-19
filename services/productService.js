import { ENV } from "../env/config.js";
const menCategory = encodeURIComponent("men's clothing");
const womenCategory = encodeURIComponent("women's clothing");

export async function getAllProduct() {
  const response = await fetch(`${ENV.API_URL}products?offset=0&limit=20`);

  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }

  return response.json();
}

export async function getProductById(id) {
  const response = await fetch(`${ENV.API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }

  return response.json();
}

export async function getProductAllClothes(id) {
  const response = await fetch(ENV.API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }
  const products = await response.json();

  const clothes = products.filter(
    (product) =>
      product.category === "men's clothing" ||
      product.category === "women's clothing",
  );

  return clothes;
}

export async function getProductAllMensClothes(id) {
  const response = await fetch(`${ENV.API_URL}/category/${menCategory}`);

  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }

  return response.json();
}

export async function getProductAllWomensClothes(id) {
  const response = await fetch(`${ENV.API_URL}/category/${womenCategory}`);

  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }

  return response.json();
}

