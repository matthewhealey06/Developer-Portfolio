// components.js

function loadNav() {
  const nav = `
    <nav>
      <div class="n-left">
        <a href="/index.html"><img src="/public/images/m-logo.png" alt="M Logo" /></a>
      </div>
      <div class="n-middle">
        <a href="/index.html">Home</a>
        <a href="/about.html">About</a>
        <a href="/collection/index.html">Collection</a>
      </div>
      <div class="n-right">
        <a href="mailto:matthewhealey0602@gmail.com?subject=Portfolio Enquiry">Contact</a>
      </div>
      <div class="mobile-menu-icon">
        <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)" stroke="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
        <path d="M4 7C4 6.44771 4.44772 6 5 6H24C24.5523 6 25 6.44771 25 7C25 7.55229 24.5523 8 24 8H5C4.44772 8 4 7.55229 4 7Z" fill="currentColor"></path>
        <path d="M4 13.9998C4 13.4475 4.44772 12.9997 5 12.9997L16 13C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15L5 14.9998C4.44772 14.9998 4 14.552 4 13.9998Z" fill="currentColor"></path>
        <path d="M5 19.9998C4.44772 19.9998 4 20.4475 4 20.9998C4 21.552 4.44772 21.9997 5 21.9997H22C22.5523 21.9997 23 21.552 23 20.9998C23 20.4475 22.5523 19.9998 22 19.9998H5Z" fill="currentColor"></path></g></svg>
      </div>
      <div class="mobile-menu">
        <a href="/index.html">Home</a>
        <a href="/about.html">About</a>
        <a href="/collection/index.html">Collection</a>
        <a href="mailto:matthewhealey0602@gmail.com?subject=Portfolio Enquiry">Contact</a>
      </div>
    </nav>
  `;
  document.getElementById("nav-container").innerHTML = nav;
}
function setupMobileMenu() {
  const icon = document.querySelector(".mobile-menu-icon");
  const menu = document.querySelector(".mobile-menu");

  icon.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

function loadFooter() {
  const container = document.getElementById("footer-container");
  if (!container) return;

  const footer = `
    <footer>
      <div class="footer-container">
        <svg id="svg3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#1e1e1e" fill-opacity="1" d="M0,0L120,21.3C240,43,480,85,720,85.3C960,85,1200,43,1320,21.3L1440,0L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
        </svg>
        <div class="footer-inner-container">
          <div class="footer-wrapper" id="fw1">
            <p>LINKS</p>
            <a href="/index.html">Home</a>
            <a href="/collection/index.html">Collection</a>
            <a href="/about.html">About</a>
            <a href="mailto:matthewhealey0602@gmail.com?subject=Portfolio Enquiry">Contact</a>
          </div>
          <div class="footer-wrapper" id="fw2">
            <p>SOCIAL</p>
            <a href="https://www.linkedin.com/in/matthew-healey-dev/">LinkedIn</a>
            <a href="https://github.com/matthewhealey06">GitHub</a>
            <a href="https://www.instagram.com/matthewhealey/?hl=en">Instagram</a>
          </div>
          <div class="footer-wrapper" id="fw3">
            <p>CONTACT & LOCATION</p>
            <a href="mailto:matthewhealey0602@gmail.com">matthewhealey0602@gmail.com</a>
            <a href="">Knutsford, Cheshire</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p id="copyright">©2026 Matthew Healey</p>
          <p>Made with love by Me</p>
        </div>
        <img id="footer-img" src="/public/images/favicon.png" alt="" />
      </div>
    </footer>
  `;
  container.innerHTML = footer;
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
  loadNav();
  loadFooter();
  setupMobileMenu();
  setActiveNav();
});
