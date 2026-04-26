document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    document.getElementById("project-content").innerHTML = `
      <div class="not-found">
        <h1>Project not found</h1>
        <a href="/collection/index.html">← Back to Collection</a>
      </div>`;
    return;
  }

  document.title = `${project.title} — Matthew Healey`;

  const linksHTML = `
    ${
      project.liveLink
        ? `<a href="${project.liveLink}" target="_blank" class="btn-primary">
            View Live Site <span>↗</span>
          </a>`
        : `<span class="btn-disabled">No Live Link</span>`
    }
    <a href="${project.githubLink}" target="_blank" class="btn-secondary">
      GitHub <span>↗</span>
    </a>
  `;

    const snippetHTML = project.codeSnippet
        ? `
        <section class="code-section">
        <div class="code-left">
            <div class="section-label">/ Code Breakdown</div>
            <h2>${project.codeSnippet.title}</h2>
            <p class="snippet-description">${project.codeSnippet.description}</p>
        </div>
        <div class="code-block">
            <div class="code-header">
            <span class="code-lang">${project.codeSnippet.language}</span>
            <div class="code-dots">
                <span></span><span></span><span></span>
            </div>
            </div>
            <pre><code>${escapeHTML(project.codeSnippet.code)}</code></pre>
        </div>
        </section>`
        : "";

  const lessonHTML = project.lesson
    ? `
    <section class="lesson-section">
      <div class="section-label">/ What I Learned</div>
      <p class="lesson-text">${project.lesson}</p>
    </section>`
    : "";

  const tagsHTML = project.tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");

  document.getElementById("project-content").innerHTML = `
    <div class="project-hero">
      <div class="hero-text">
        <a href="/collection/index.html" class="back-link">← Back to Collection</a>
        <p class="project-category">${project.category}</p>
        <h1>${project.title}</h1>
        <div class="tags">${tagsHTML}</div>
        <div class="hero-links">${linksHTML}</div>
      </div>
      <div class="hero-image">
        <img src="${project.image}" alt="${project.title}" />
      </div>
    </div>

    <section class="description-section">
      <div class="section-label">/ About the Project</div>
      <p class="description-text">${project.description}</p>
    </section>

    ${snippetHTML}
    ${lessonHTML}

    <div class="project-footer-links">
      ${linksHTML}
    </div>
  `;
});

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}