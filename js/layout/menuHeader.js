export const initHeaderMenu = () => {
  const menuButton = document.querySelector(".site-menu-button");
  const siteNav = document.querySelector(".site-nav");

  if (!menuButton || !siteNav) return;

  menuButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      siteNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
};
