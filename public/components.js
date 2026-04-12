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
    </nav>
  `;
  document.getElementById('nav-container').innerHTML = nav;
}

function loadFooter() {
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
  document.getElementById('footer-container').innerHTML = footer;
}

document.addEventListener('DOMContentLoaded', () => {
  loadNav();
  loadFooter();
});