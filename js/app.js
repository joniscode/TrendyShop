import { initHeaderMenu } from "./layout/menuHeader.js";
import { initHeaderCounters } from "./layout/contadoresHeader.js";
import { initLayout } from "./layout/renderLayout.js";
import { closePaymentSuccess, initPaymentConfirmation } from "./pagos/confirmacionPago.js";
import { initPaymentMethods } from "./pagos/metodosPago.js";
import { closeCardModal, initCreditCard } from "./tarjetas/tarjetaCredito.js";
import { initCartPage } from "./pages/carritoPage.js";
import { initHomePage } from "./pages/homePage.js";

initLayout();
initHeaderMenu();
initHeaderCounters();
initHomePage();
initCartPage();
initCreditCard();
initPaymentMethods();
initPaymentConfirmation();

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCardModal();
    closePaymentSuccess();
  }
});
