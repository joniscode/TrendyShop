import { openCardModal } from "../tarjetas/tarjetaCredito.js";

const CHECKOUT_SHIPPING_COST = 12000;

const parseCurrency = (value) => Number(String(value).replace(/[^\d-]/g, "")) || 0;

const updateCheckoutShipping = (paymentMethod) => {
  const shippingRow = document.querySelector("[data-checkout-shipping-row]");
  const shippingValue = document.querySelector("[data-checkout-shipping]");
  const subtotalValue = document.querySelector(".order-summary .summary-row strong");
  const totalValue = document.querySelector("[data-checkout-total]");

  if (!shippingRow || !shippingValue || !subtotalValue || !totalValue) return;

  const subtotal = parseCurrency(subtotalValue.textContent);
  const shipping = paymentMethod === "cash" && subtotal > 0 ? CHECKOUT_SHIPPING_COST : 0;

  shippingRow.hidden = shipping === 0;
  shippingValue.textContent = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(shipping);
  totalValue.textContent = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(subtotal - 20000 + shipping);
};

export const initPaymentMethods = () => {
  const paymentInputs = document.querySelectorAll('input[name="payment"]');
  const paymentPanels = document.querySelectorAll("[data-payment-panel]");

  updateCheckoutShipping(document.querySelector('input[name="payment"]:checked')?.value);

  paymentInputs.forEach((input) => {
    input.addEventListener("change", () => {
      document.querySelectorAll(".payment-method").forEach((method) => {
        method.classList.toggle("is-active", method.contains(input));
      });

      paymentPanels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.paymentPanel === input.value);
      });

      updateCheckoutShipping(input.value);

      if (input.value === "card") {
        openCardModal();
      }
    });
  });
};
