const projectsData = [
/* --- PHOTOGRAPHY PORTFOLIO --- */
    {
    id: "photography-portfolio",
    title: "Photography Portfolio",
    category: "Creative / Full Stack",
    description:
      "My first major project — a full photography portfolio and storefront. Built to showcase my photography work with a Stripe-integrated shop, contact form via EmailJS, and a clean gallery layout. This was where I learned how to structure a multi-page site properly and handle third-party integrations.",
    tags: ["HTML", "CSS", "JavaScript", "EmailJS", "Stripe"],
    liveLink: "https://matthewhealeyphotography.com",
    githubLink: "https://github.com/matthewhealey06/Photography-Portfolio",
    image: "/public/images/mhp-placeholder.png",
    codeSnippet: {
      title: "Something I found interesting",
      language: "javascript",
      description:
        "Placeholder — add a short explanation of a problem you solved or something you built here.",
      code: `function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

function applyTransform(percent) {
    currentPercent = percent;

    track.style.transform =
        "translate(" + percent + "%, " + CONFIG.TRACK.VERTICAL_OFFSET + "%)";

    let horizontalPos = 100 + percent;

    if (window.innerWidth <= CONFIG.TRACK.SMALL_SCREEN_BREAKPOINT) {
        horizontalPos = horizontalPos - CONFIG.TRACK.SMALL_SCREEN_OFFSET;
    }

    const pos = horizontalPos + "% center";
    for (const img of images) {
        img.style.objectPosition = pos;
    }
}

window.addEventListener("mousedown", e => {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartPercent = currentPercent;
});

window.addEventListener("mouseup", () => {
    isDragging = false;
});

window.addEventListener("mousemove", e => {
    if (!isDragging) return;

    const deltaX = dragStartX - e.clientX;
    const maxDelta = window.innerWidth / CONFIG.DRAG.MOUSE_DIVISOR;
    const deltaPercent = (deltaX / maxDelta) * CONFIG.DRAG.PERCENT_MULTIPLIER;

    applyTransform(clamp(dragStartPercent + deltaPercent, CONFIG.TRACK.END_PERCENT, CONFIG.TRACK.START_PERCENT));
});`,
    },
    lesson:
      "Placeholder — what did building this teach you? What would you do differently?",
  },
/* --- TODO LIST --- */
  {
    id: "todo-list",
    title: "To-Do List",
    category: "Vanilla JavaScript",
    description:
      "A feature-rich to-do list app built entirely in vanilla JavaScript. Supports multiple lists, date-based filtering, and full localStorage persistence. The three-panel layout was a deliberate design challenge — keeping it clean while packing in real functionality.",
    tags: ["HTML", "CSS", "JavaScript", "localStorage"],
    liveLink: "https://matthewhealey06.github.io/to-do-list/",
    githubLink: "https://github.com/matthewhealey06/to-do-list",
    image: "/public/images/todo-list-placeholder.png",
    codeSnippet: {
      title: "Something I found interesting",
      language: "javascript",
      description:
        "Placeholder — add a short explanation of a problem you solved or something you built here.",
      code: `// Placeholder — paste a real snippet here
// e.g. how you handled localStorage persistence,
// the three-panel layout logic, or date filtering

function placeholder() {
  console.log("Add your code here");
}`,
    },
    lesson:
      "Placeholder — what did building this teach you? What would you do differently?",
  },
/* --- SHOPPING CART --- */

  {
    id: "shopping-cart",
    title: "Shopping Cart",
    category: "REST API / JavaScript",
    description:
      "A shopping cart page that fetches products from an external REST API and lets users add, remove, and manage items. Focused on understanding how to work with async data and keep the UI in sync with state.",
    tags: ["HTML", "CSS", "JavaScript", "REST API"],
    liveLink: "https://matthewhealey06.github.io/shopping-cart-project/",
    githubLink: "https://github.com/matthewhealey06/shopping-cart-project",
    image: "/public/images/shopping-cart-placeholder.png",
    codeSnippet: {
      title: "Something I found interesting",
      language: "javascript",
      description:
        "Placeholder — add a short explanation of a problem you solved or something you built here.",
      code: `// Placeholder — paste a real snippet here
// e.g. how you fetched and rendered the API data,
// or how you managed cart state

function placeholder() {
  console.log("Add your code here");
}`,
    },
    lesson:
      "Placeholder — what did building this teach you? What would you do differently?",
  },
/* --- DEVELOPER PORTFOLIO --- */
  {
    id: "developer-portfolio",
    title: "Developer Portfolio",
    category: "Frontend / Vanilla JS",
    description:
      "The site you're on right now. Built from scratch with vanilla HTML, CSS, and JavaScript — no frameworks, no shortcuts. Includes a scroll-driven SVG path animation, EmailJS contact form, Lenis smooth scroll, a component system for the nav and footer, and a dynamic background colour trigger on scroll.",
    tags: ["HTML", "CSS", "JavaScript", "EmailJS", "Lenis"],
    liveLink: "https://matthewhealey.dev",
    githubLink: "https://github.com/matthewhealey06/Developer-Portfolio",
    image: "/public/images/dev-portfolio-placeholder.png",
    codeSnippet: {
      title: "Something I found interesting",
      language: "javascript",
      description:
        "Placeholder — add a short explanation of a problem you solved or something you built here.",
      code: `// Placeholder — paste a real snippet here
// e.g. the scroll-driven SVG path animation,
// the IntersectionObserver background colour trigger,
// or the component injection system

function placeholder() {
  console.log("Add your code here");
}`,
    },
    lesson:
      "Placeholder — what did building this teach you? What would you do differently?",
  },
/* --- LOGIN FORM --- */
  {
    id: "login-form",
    title: "Login & Register Form",
    category: "Full Stack / Node.js",
    description:
      "A full authentication system with login and registration, built with Node.js and Express on the backend, connected to MongoDB. Handles password hashing, session management, and form validation. No live link as it runs on a local server.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
    liveLink: null,
    githubLink: "https://github.com/matthewhealey06/Login-Form",
    image: "/public/images/login-from-placeholder.png",
    codeSnippet: {
      title: "Something I found interesting",
      language: "javascript",
      description:
        "Placeholder — add a short explanation of a problem you solved or something you built here.",
      code: `// Placeholder — paste a real snippet here
// e.g. how you handled password hashing,
// session management, or form validation

function placeholder() {
  console.log("Add your code here");
}`,
    },
    lesson:
      "Placeholder — what did building this teach you? What would you do differently?",
  },
];