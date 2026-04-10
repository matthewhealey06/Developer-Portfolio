const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const trigger = document.querySelector(".colour-trigger");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.boundingClientRect.top < 0) {
        document.body.classList.add("dark-bg");
      } else {
        document.body.classList.remove("dark-bg");
      }
    });
  },
  {
    threshold: 0,
    rootMargin: "0px 0px 0px 0px",
  },
);

observer.observe(trigger);

const path = document.getElementById("flowing-path");
const section = path.closest("section");

if (path && section) {
  const pathLength = path.getTotalLength();
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  window.addEventListener("scroll", () => {
    const sectionTop = section.offsetTop;
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    const startDraw = sectionTop - windowHeight + 700;
    const drawDistance = 2400;
    const endDraw = startDraw + drawDistance;

    if (scrollTop < startDraw) {
      path.style.strokeDashoffset = pathLength;
    } else if (scrollTop > endDraw) {
      path.style.strokeDashoffset = 0;
    } else {
      const progress = (scrollTop - startDraw) / drawDistance;
      path.style.strokeDashoffset = pathLength - pathLength * progress;
    }
  });
}
const selectSelected = document.querySelector(".select-selected");
const selectOptions = document.querySelector(".select-options");

selectSelected.addEventListener("click", () => {
  selectOptions.classList.toggle("open");
});

selectOptions.querySelectorAll("li").forEach((option) => {
  option.addEventListener("click", () => {
    selectSelected.textContent = option.textContent;
    selectSelected.classList.add('has-value')
    selectOptions.classList.remove("open");
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".custom-select")) {
    selectOptions.classList.remove("open");
  }
});

emailjs.init("UqVx5SW3p5huL43gG");
const sendForm = document.getElementById("sendBtn");

sendForm.addEventListener("click", function () {
  const formName = document.getElementById("formName").value.trim();
  const formDropdown = document.getElementById("formDropdown").textContent;
  const formEmail = document.getElementById("formEmail").value.trim();
  const message = `Hey, my name is ${formName} and I'm looking for ${formDropdown} Get in touch with me at ${formEmail}`

  if (!formName || formDropdown === "Select Dropdown ▼" || !formEmail) {
    alert("Please fill in all fields.");
    return;
  }
  if(!formEmail.includes('@') || !formEmail.includes('.')){
    alert('please enter a valid email')
    return
  }
  const params = {
    "name": formName,
    time: new Date().toLocaleString(),
    message: message,
  };
  emailjs.send("service_ln3sphq", "template_3s0dpaq", params)
    .then(() => {
              document.getElementById("sendBtn").textContent = "Sent!";
              document.getElementById("formName").value = "";
              document.getElementById("formDropdown").textContent = "Select Dropdown ▼";
              document.getElementById("formDropdown").classList.remove("has-value");
              document.getElementById("formEmail").value = "";
              setTimeout(() => {
              document.getElementById("sendBtn").textContent = "Send Enquiry →";
              }, 5000)
          })
          .catch(() => {
              alert("Something went wrong, please try again.");
          });
});
