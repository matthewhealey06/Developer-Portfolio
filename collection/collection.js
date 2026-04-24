const PWrapper = document.querySelector(".projects-wrapper");
const projects = PWrapper.querySelectorAll(".projects-wrapper > a");

projects.forEach((project) => {
  const clone = project.cloneNode(true);
  PWrapper.appendChild(clone);
});

let currentPosition = 0;

function calculateSetWidth() {
  const cardWidth = projects[0].getBoundingClientRect().width;
  const gap = 50;
return (cardWidth * projects.length) + (gap * projects.length);
}

let setWidth = calculateSetWidth();

window.addEventListener("resize", () => {
  setWidth = calculateSetWidth();
});

function applyTransform() {
  if (currentPosition < -setWidth) {
    currentPosition += setWidth;
  }
  if (currentPosition > 0) {
    currentPosition -= setWidth;
  }
  PWrapper.style.transform = `translateX(${currentPosition}px)`;
}

document.addEventListener("wheel", (e) => {
  currentPosition -= e.deltaY;
  applyTransform();
});
