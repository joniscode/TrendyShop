import { initHeaderMenu } from "./layout/menuHeader.js";
import { initLayout } from "./layout/renderLayout.js";
import { closePaymentSuccess, initPaymentConfirmation } from "./pagos/confirmacionPago.js";
import { initPaymentMethods } from "./pagos/metodosPago.js";
import { closeCardModal, initCreditCard } from "./tarjetas/tarjetaCredito.js";

initLayout();
initHeaderMenu();
initCreditCard();
initPaymentMethods();
initPaymentConfirmation();

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCardModal();
    closePaymentSuccess();
  }
});
