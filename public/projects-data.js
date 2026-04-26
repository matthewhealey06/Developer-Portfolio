const projectsData = [
  /* --- PHOTOGRAPHY PORTFOLIO --- */
  {
    id: "photography-portfolio",
    title: "Photography Portfolio",
    category: "Creative / Full Stack",
    description:
      "My first major project - first built using Wix, moved to vanilla code once I learnt. Showcases a full photography portfolio and storefront. Built to showcase my photography work with a Stripe-integrated shop, contact form via EmailJS, and a clean gallery layout. This was where I learned how to structure a multi-page site properly and handle third-party integrations.",
    tags: ["HTML", "CSS", "JavaScript", "EmailJS", "Stripe"],
    liveLink: "https://matthewhealeyphotography.com",
    githubLink: "https://github.com/matthewhealey06/Photography-Portfolio",
    image: "/public/images/mhp-placeholder.png",
    codeSnippet: {
      title: "Horizontal Drag Track",
      language: "javascript",
      description:
        "The drag slider was built around a single applyTransform function that handles both the track position and image objectPosition simultaneously. A clamp utility keeps the drag within bounds, and the three mouse events work together using an isDragging flag to track when a drag is active and calculate how far the user has moved from their starting point.",
      code: `function applyTransform(percent) {
            currentPercent = percent;
            track.style.transform = "translate(" + percent + "%, " + CONFIG.TRACK.VERTICAL_OFFSET + "%)";

            const pos = horizontalPos + "% center";
            for (const img of images) {
                img.style.objectPosition = pos;
            }
        }

        window.addEventListener("mousemove", e => {
            if (!isDragging) return;
            const deltaX = dragStartX - e.clientX;
            const maxDelta = window.innerWidth / CONFIG.DRAG.MOUSE_DIVISOR;
            const deltaPercent = (deltaX / maxDelta) * CONFIG.DRAG.PERCENT_MULTIPLIER;
            applyTransform(clamp(dragStartPercent + deltaPercent, CONFIG.TRACK.END_PERCENT, CONFIG.TRACK.START_PERCENT));
});`,
    },
    lesson:
      "I learnt many things from this project, from core design to speed of site. It led me to integrating a loader due to the JS taking up a lot of memory on first load. It also taught me about lazy loading for images rather than loadning full 8MB pictures for example. <br><br> It was also my first time using a JSON file and adding content using JavaScript which was a hurdle to overcome however the end result shows a simple gallary page which can display my images and is simple enough to add/remove images.",
  },
  /* --- TODO LIST --- */
  {
    id: "todo-list",
    title: "To-Do List",
    category: "Vanilla JavaScript",
    description:
      "A feature-rich to-do list app built entirely in vanilla JavaScript. Supports multiple lists, date-based filtering, and full localStorage persistence. The three-panel layout was a deliberate design challenge - keeping it clean while packing in real functionality.",
    tags: ["HTML", "CSS", "JavaScript", "localStorage"],
    liveLink: "https://matthewhealey06.github.io/to-do-list/",
    githubLink: "https://github.com/matthewhealey06/to-do-list",
    image: "/public/images/todo-list-placeholder.png",
    codeSnippet: {
      title: "localStorage IDs",
      language: "javascript",
      description:
        "When the app loads from localStorage, it can't just start IDs from 1 again — those IDs already exist. Instead, it flattens all todos across every list into a single array, finds the highest existing ID using Math.max with a spread operator, then starts from there plus one. This guarantees no duplicates regardless of how many lists or todos have been created and deleted over time.",
      code: `const allTodos = lists.flatMap(function (list) {
    return list.todos;
});
if (allTodos.length === 0) {
    nextToDoID = 1;
} else {
    nextToDoID = Math.max(
        ...allTodos.map(function (todo) {
            return todo.ID;
        }),
    ) + 1;
}`,
    },
    lesson:
      "This project was a challenge, it was my first time really diving into localStorage. I had done minimal parts in the past however nothing to this extent. I found it difficult to mix each localStorage from the lists, to the to-dos, to the calendar with each other making sure nothing breaks which is when I came across Math.max which ensures that there can be no duplicates within each section.",
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
      title: "DOM Creation & Event Delegation",
      language: "javascript",
      description:
        "Products are built entirely in JavaScript from a live API fetch, no HTML templates, no framework. Each element is created, configured, and appended manually. <br><br>The problem this creates is that you can't attach click listeners inside the forEach loop to buttons that are being dynamically generated. If you did, each render cycle would stack duplicate listeners.<br><br> Instead, a single event listener sits on the parent cart element and uses event bubbling to catch clicks from any button inside it, regardless of when it was created. This is event delegation, one listener handling every plus, minus, and remove action across the entire cart.",
      code: `json.slice(0, 5).forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const quantityP = document.createElement('p');
    quantityP.classList.add('item-quantity');

    const minusBtn = document.createElement('button');
    minusBtn.textContent = '-';
    quantityP.appendChild(minusBtn);

    const quantityText = document.createElement('span');
    quantityText.textContent = ' 1 ';
    quantityP.appendChild(quantityText);

    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    quantityP.appendChild(plusBtn);
});

cart.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const parent = event.target.parentElement;
        const span = parent.querySelector('span');
        let currentQuantity = parseInt(span.textContent);

        if (event.target.textContent === '+') currentQuantity++;
        else if (event.target.textContent === '-') currentQuantity--;

        if (currentQuantity === 0) {
            event.target.parentElement.parentElement.parentElement.remove();
        }
        span.textContent = currentQuantity;
        updateOrderSummary();
    }
});`,
    },
    lesson:
      "This project taught me about even delegation and bubbline. Knowing tht rather than looking for each click - just to register 1 click and find where it was from. Results in much simpler code, easier to maintain, and an overall faster site.",
  },
  /* --- DEVELOPER PORTFOLIO --- */
  {
    id: "developer-portfolio",
    title: "Developer Portfolio",
    category: "Frontend / Vanilla JS",
    description:
      "The site you're on right now. Built from scratch with vanilla HTML, CSS, and JavaScript - no frameworks, no shortcuts. Includes a scroll-driven SVG path animation, EmailJS contact form, Lenis smooth scroll, a component system for the nav and footer, and a dynamic background colour trigger on scroll.",
    tags: ["HTML", "CSS", "JavaScript", "EmailJS", "Lenis"],
    liveLink: "https://matthewhealey.dev",
    githubLink: "https://github.com/matthewhealey06/Developer-Portfolio",
    image: "/public/images/dev-portfolio-placeholder.png",
    codeSnippet: {
      title: "SVG Path",
      language: "javascript",
      description:
        "The SVG path animation works by exploiting two CSS properties, strokeDasharray and strokeDashoffset. Setting both to the total path length makes the stroke invisible. As the user scrolls, the offset is reduced proportionally, revealing the path as if it's being drawn in real time. The scroll position is mapped to a progress value between 0 and 1 based on where the section sits in the viewport, with clamping at both ends so the animation doesn't run before or after its intended range.",
      code: `const path = document.getElementById("flowing-path");
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
}`,
    },
    lesson:
      "This was a huge project with a lot which I learnt. From the first time using lenis smooth scroll to the SVG path which follows relative to the screen. I have learnt so much. I really focused on the design of the website, trying to make it feel as professional as possible. And I believe I achieved just that.",
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
      title: "Hashed Passwords",
      language: "javascript",
      description:
        "Passwords are never stored in plain text. When a user registers, bcrypt hashes the password before it hits the database. On login, bcrypt.compare hashes the attempt and compares it to the stored hash. If they match, access is granted. There's no way to reverse the hash, which means even if the database were compromised, the raw passwords stay protected.",
      code: `app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username })
    .then((user) => {
      if (user === null) {
        res.json({ success: false, message: "User not found" });
      } else {
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            res.json({ success: true });
          } else {
            res.json({ success: false, message: "Wrong password" });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Server error" });
    });
});`,
    },
    lesson:
      "I really wasn't going to turn this project into a backend project, in fact it just started as front end. But I'm glad I did, it taught me so much about Node.js and MongoDB. But most importantly how to keep user information safe. From learning how to hash the password, storing data within a database, I learnt something more than just using localStorage",
  },
];
