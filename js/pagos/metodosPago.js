import { openCardModal } from "../tarjetas/tarjetaCredito.js";

export const initPaymentMethods = () => {
  const paymentInputs = document.querySelectorAll('input[name="payment"]');
  const paymentPanels = document.querySelectorAll("[data-payment-panel]");

  paymentInputs.forEach((input) => {
    input.addEventListener("change", () => {
      document.querySelectorAll(".payment-method").forEach((method) => {
        method.classList.toggle("is-active", method.contains(input));
      });

      paymentPanels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.paymentPanel === input.value);
      });

      if (input.value === "card") {
        openCardModal();
      }
    });
  });
};
