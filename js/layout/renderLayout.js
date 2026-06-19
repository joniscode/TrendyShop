import { renderFooter } from "../../components/footer.js";
import { renderHeader } from "../../components/header.js";

export const initLayout = () => {
  const headerRoot = document.querySelector("[data-header]");
  const footerRoot = document.querySelector("[data-footer]");

  if (headerRoot) {
    headerRoot.innerHTML = renderHeader(headerRoot.dataset.base);
  }

  if (footerRoot) {
    footerRoot.innerHTML = renderFooter(footerRoot.dataset.base);
  }
};
