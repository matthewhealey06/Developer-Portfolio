const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const trigger = document.querySelector('.colour-trigger');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.boundingClientRect.top < 0) {
      document.body.classList.add('dark-bg');
    } else {
      document.body.classList.remove('dark-bg');
    }
  });
}, {
  threshold: 0,
  rootMargin: '0px 0px 0px 0px'
});

observer.observe(trigger);


const path = document.getElementById('flowing-path');
const section = path.closest('section');

if (path && section) {
  const pathLength = path.getTotalLength();
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  window.addEventListener('scroll', () => {
    const sectionTop = section.offsetTop;
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    const startDraw = sectionTop - windowHeight + 750;
    const drawDistance = 2500; // draws over 1500px of scrolling
    const endDraw = startDraw + drawDistance;

    if (scrollTop < startDraw) {
      path.style.strokeDashoffset = pathLength;
    } else if (scrollTop > endDraw) {
      path.style.strokeDashoffset = 0;
    } else {
      const progress = (scrollTop - startDraw) / drawDistance;
      path.style.strokeDashoffset = pathLength - (pathLength * progress);
    }
  });
}