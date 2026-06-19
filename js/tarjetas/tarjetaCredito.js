import { formatCardNumber, formatExpiration, getCardBrand } from "./formatoTarjeta.js";

const cardLogos = {
  AMEX: "../assets/images/visa.png",
  CARD: "../assets/images/visa.png",
  MASTERCARD: "../assets/images/mastercard.png",
  VISA: "../assets/images/visa.png",
};

export const openCardModal = () => {
  const cardModal = document.querySelector("[data-card-modal]");

  if (cardModal) {
    cardModal.classList.add("is-active");
    cardModal.setAttribute("aria-hidden", "false");
  }
};

export const closeCardModal = () => {
  const cardModal = document.querySelector("[data-card-modal]");

  if (cardModal) {
    cardModal.classList.remove("is-active");
    cardModal.setAttribute("aria-hidden", "true");
  }
};

export const initCreditCard = () => {
  const card = document.querySelector("[data-credit-card]");
  const cardNumber = document.querySelector("[data-card-number]");
  const cardHolder = document.querySelector("[data-card-holder]");
  const cardExpiration = document.querySelector("[data-card-expiration]");
  const cardCvc = document.querySelector("[data-card-cvc]");
  const cardPreview = document.querySelector("[data-card-preview]");
  const cardNamePreview = document.querySelector("[data-card-name]");
  const cardExpiryPreview = document.querySelector("[data-card-expiry]");
  const cardCvvPreview = document.querySelector("[data-card-cvv]");
  const cardLogo = document.querySelector("[data-card-logo]");
  const openCardModalButton = document.querySelector("[data-open-card-modal]");
  const closeCardModalButton = document.querySelector("[data-close-card-modal]");

  const updateCardBrand = (brand) => {
    if (card) {
      card.dataset.brand = brand.toLowerCase();
    }

    if (cardLogo) {
      cardLogo.src = cardLogos[brand] || cardLogos.CARD;
      cardLogo.alt = brand === "CARD" ? "Tarjeta" : brand;
    }
  };

  if (openCardModalButton) {
    openCardModalButton.addEventListener("click", openCardModal);
  }

  if (closeCardModalButton) {
    closeCardModalButton.addEventListener("click", closeCardModal);
  }

  if (cardNumber && cardPreview) {
    cardNumber.addEventListener("input", () => {
      const brand = getCardBrand(cardNumber.value);

      cardNumber.value = formatCardNumber(cardNumber.value);
      cardPreview.textContent = cardNumber.value || "0000 0000 0000 0000";
      updateCardBrand(brand);
    });
  }

  if (cardHolder && cardNamePreview) {
    cardHolder.addEventListener("input", () => {
      cardNamePreview.textContent = cardHolder.value || "Nombre Apellido";
    });
  }

  if (cardExpiration && cardExpiryPreview) {
    cardExpiration.addEventListener("input", () => {
      cardExpiration.value = formatExpiration(cardExpiration.value);
      cardExpiryPreview.textContent = cardExpiration.value || "MM/AA";
    });
  }

  if (cardCvc && card && cardCvvPreview) {
    cardCvc.addEventListener("focus", () => card.classList.add("is-flipped"));
    cardCvc.addEventListener("blur", () => card.classList.remove("is-flipped"));
    cardCvc.addEventListener("input", () => {
      cardCvc.value = cardCvc.value.replace(/\D/g, "").slice(0, 4);
      cardCvvPreview.textContent = cardCvc.value || "000";
    });
  }
};
