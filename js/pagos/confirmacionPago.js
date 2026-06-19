export const closePaymentSuccess = () => {
  const paymentSuccess = document.querySelector("[data-payment-success]");

  if (paymentSuccess) {
    paymentSuccess.classList.remove("is-active");
    paymentSuccess.setAttribute("aria-hidden", "true");
  }
};

export const initPaymentConfirmation = () => {
  const payButton = document.querySelector("[data-pay-button]");
  const paymentLoader = document.querySelector("[data-payment-loader]");
  const paymentSuccess = document.querySelector("[data-payment-success]");
  const closeSuccessButton = document.querySelector("[data-close-success]");

  if (payButton && paymentLoader) {
    payButton.addEventListener("click", () => {
      paymentLoader.classList.add("is-active");
      paymentLoader.setAttribute("aria-hidden", "false");
      payButton.disabled = true;

      window.setTimeout(() => {
        paymentLoader.classList.remove("is-active");
        paymentLoader.setAttribute("aria-hidden", "true");
        payButton.disabled = false;

        if (paymentSuccess) {
          paymentSuccess.classList.add("is-active");
          paymentSuccess.setAttribute("aria-hidden", "false");
        }
      }, 2600);
    });
  }

  if (closeSuccessButton) {
    closeSuccessButton.addEventListener("click", closePaymentSuccess);
  }
};
