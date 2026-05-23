// components.js
// Nav and footer HTML are now baked in at build time.
// This file only handles runtime interactivity.

function setupMobileMenu() {
  const icon = document.querySelector(".mobile-menu-icon");
  const menu = document.querySelector(".mobile-menu");
  if (!icon || !menu) return;

  icon.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

function setActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".n-middle a");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setActiveNav();
});