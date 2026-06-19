import { renderFooter } from "../components/footer.js";
import { renderHeader } from "../components/header.js";

const headerRoot = document.querySelector("[data-header]");
const footerRoot = document.querySelector("[data-footer]");

if (headerRoot) {
  headerRoot.innerHTML = renderHeader(headerRoot.dataset.base);
}

if (footerRoot) {
  footerRoot.innerHTML = renderFooter();
}
