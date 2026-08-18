const fs = require("fs");
const path = require("path");
const { Marked } = require("marked");
const { markedHighlight } = require("marked-highlight");
const hljs = require("highlight.js");

// --- Configuration ---
const SRC_DIR = "./src";
const DIST_DIR = "./dist";
const PARTIALS_DIR = "./partials";
const POSTS_DIR = "./posts";
const TEMPLATES_DIR = "./templates";

const SITE = {
  url: "https://matthewhealey.dev", // no trailing slash
  title: "Matthew Healey",
  blogTitle: "Notes",
  blogDescription:
    "Web security, pentesting, and the things I got wrong on the way.",
  blogPath: "/blog",
};

// Maps placeholder element IDs to partial filenames.
const placeholders = {
  "nav-container": "nav.html",
  "footer-container": "footer.html",
};

// Folders to copy into dist as-is
const STATIC_DIRS = ["stylesheets", "public"];

// Pages that exist only as query strings on project.html.
// Keep this in sync with public/projects-data.js.
const PROJECT_IDS = [
  "photography-portfolio",
  "todo-list",
  "shopping-cart",
  "developer-portfolio",
  "login-form",
  "ugc-site",
  "la-esquina",
  "matthews-auto-detailing",
];

// Drafts are included when you run: NODE_ENV=dev node build.js
const IS_PROD = process.env.NODE_ENV !== "dev";

// --- Markdown setup ---

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

// --- Generic helpers ---

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function readPartials() {
  const loaded = {};
  for (const [id, filename] of Object.entries(placeholders)) {
    const filePath = path.join(PARTIALS_DIR, filename);
    if (!fs.existsSync(filePath)) {
      console.error(`Missing partial: ${filePath}`);
      process.exit(1);
    }
    loaded[id] = fs.readFileSync(filePath, "utf-8");
  }
  return loaded;
}

function injectPartials(html, partials) {
  let result = html;
  for (const [id, content] of Object.entries(partials)) {
    const regex = new RegExp(
      `<div\\s+id=["']${id}["'][^>]*>\\s*<\\/div>`,
      "gi",
    );
    if (!regex.test(result)) {
      // Not fatal, but worth knowing about: a page that silently lost its nav
      // is hard to spot until someone lands on it.
      console.warn(`  ! no #${id} placeholder found`);
    }
    regex.lastIndex = 0;
    result = result.replace(regex, content);
  }
  return result;
}

function getHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getHtmlFiles(fullPath));
    } else if (entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
}

function copyNonHtmlFiles(srcDir, distDir) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(distDir, entry.name);
    if (entry.isDirectory()) {
      copyNonHtmlFiles(srcPath, path.join(distDir, entry.name));
    } else if (!entry.name.endsWith(".html")) {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
      console.log(`  ${path.relative(SRC_DIR, srcPath)}`);
    }
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fill(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : "",
  );
}

// --- Blog: parsing ---

/**
 * Minimal YAML-ish frontmatter parser.
 * Supports  key: value  |  "quoted"  |  ["arrays"]  |  true / false
 */
function parseFrontmatter(raw, filename) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`${filename}: missing frontmatter block (--- ... ---)`);
  }

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;

    const sep = line.indexOf(":");
    if (sep === -1)
      throw new Error(`${filename}: bad frontmatter line: ${line}`);

    const key = line.slice(0, sep).trim();
    let value = line.slice(sep + 1).trim();

    if (value.startsWith("[")) {
      try {
        value = JSON.parse(value.replace(/'/g, '"'));
      } catch {
        throw new Error(`${filename}: bad array in frontmatter: ${value}`);
      }
    } else if (value === "true") {
      value = true;
    } else if (value === "false") {
      value = false;
    } else {
      value = value.replace(/^["'](.*)["']$/, "$1");
    }

    data[key] = value;
  }

  return { data, body: match[2] };
}

function slugFromFilename(filename) {
  return filename.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

/** Parse as UTC so a post never renders as the previous day. */
function parseDate(value, filename) {
  const str = String(value).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    throw new Error(`${filename}: date must be YYYY-MM-DD, got "${str}"`);
  }
  return new Date(str + "T00:00:00Z");
}

function formatDate(date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function readingTime(markdown) {
  const words = markdown.replace(/```[\s\S]*?```/g, "").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function excerptFrom(markdown) {
  const firstPara = markdown
    .split(/\r?\n\r?\n/)
    .map((p) => p.trim())
    .find(
      (p) =>
        p && !p.startsWith("#") && !p.startsWith("```") && !p.startsWith(">"),
    );
  if (!firstPara) return "";
  return firstPara
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

function loadPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.warn(`  No ${POSTS_DIR}/ directory. Skipping blog.`);
    return [];
  }

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const seen = new Map();
  const posts = [];

  for (const filename of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
    const { data, body } = parseFrontmatter(raw, filename);

    if (!data.title) throw new Error(`${filename}: missing title`);
    if (!data.date) throw new Error(`${filename}: missing date`);

    if (data.draft === true && IS_PROD) {
      console.log(`  draft skipped: ${filename}`);
      continue;
    }

    const slug = slugFromFilename(filename);
    if (seen.has(slug)) {
      throw new Error(
        `Duplicate slug "${slug}" from ${filename} and ${seen.get(slug)}`,
      );
    }
    seen.set(slug, filename);

    posts.push({
      slug,
      title: data.title,
      date: parseDate(data.date, filename),
      description: data.description || excerptFrom(body).slice(0, 200),
      tags: Array.isArray(data.tags) ? data.tags : [],
      html: marked.parse(body),
      readingTime: readingTime(body),
      url: `${SITE.blogPath}/${slug}/`,
    });
  }

  // Newest first. Explicit numeric compare, not a string sort.
  posts.sort((a, b) => b.date - a.date);
  return posts;
}

// --- Blog: rendering ---

function tagList(tags) {
  if (!Array.isArray(tags) || !tags.length) return "";
  const items = tags
    .map(
      (t) =>
        `<li><a href="${SITE.blogPath}/tags/${encodeURIComponent(
          t,
        )}/">${escapeHtml(t)}</a></li>`,
    )
    .join("");
  return `<ul class="tags">${items}</ul>`;
}

function postSummary(post, featured = false) {
  return `
      <article class="post-summary${featured ? " featured" : ""}">
        <h2><a href="${escapeHtml(post.url)}">${escapeHtml(post.title)}</a></h2>
        <p class="meta">
          <time datetime="${post.date.toISOString().slice(0, 10)}">${formatDate(
            post.date,
          )}</time> &middot; ${post.readingTime} min read
        </p>
        ${
          post.description
            ? `<p class="description">${escapeHtml(post.description)}</p>`
            : ""
        }
        ${tagList(post.tags)}
      </article>`;
}

function renderFeed(posts) {
  const items = posts
    .slice(0, 20)
    .map(
      (post) => `
    <item>
      <title>${escapeHtml(post.title)}</title>
      <link>${SITE.url}${post.url}</link>
      <guid isPermaLink="true">${SITE.url}${post.url}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description>${escapeHtml(post.description)}</description>
    </item>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeHtml(SITE.blogTitle)} &ndash; ${escapeHtml(SITE.title)}</title>
    <link>${SITE.url}${SITE.blogPath}/</link>
    <description>${escapeHtml(SITE.blogDescription)}</description>
    <language>en-gb</language>
    <atom:link href="${SITE.url}${
      SITE.blogPath
    }/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

function buildBlog(partials) {
  const posts = loadPosts();
  if (!posts.length) return posts;

  const postTemplate = fs.readFileSync(
    path.join(TEMPLATES_DIR, "blog-post.html"),
    "utf8",
  );
  const indexTemplate = fs.readFileSync(
    path.join(TEMPLATES_DIR, "blog-index.html"),
    "utf8",
  );

  const blogDist = path.join(DIST_DIR, "blog");

  // Individual posts
  for (const post of posts) {
    const html = fill(postTemplate, {
      siteTitle: escapeHtml(SITE.title),
      blogPath: SITE.blogPath,
      title: escapeHtml(post.title),
      description: escapeHtml(post.description),
      date: formatDate(post.date),
      dateISO: post.date.toISOString().slice(0, 10),
      readingTime: post.readingTime,
      tags: tagList(post.tags),
      content: post.html,
      canonical: `${SITE.url}${post.url}`,
    });

    const dir = path.join(blogDist, post.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "index.html"),
      injectPartials(html, partials),
    );
    console.log(`  blog/${post.slug}/index.html`);
  }

  // Blog index
  const indexHtml = fill(indexTemplate, {
    siteTitle: escapeHtml(SITE.title),
    blogPath: SITE.blogPath,
    title: escapeHtml(SITE.blogTitle),
    description: escapeHtml(SITE.blogDescription),
    canonical: `${SITE.url}${SITE.blogPath}/`,
    posts: posts.map((p, i) => postSummary(p, i === 0)).join("\n"),
  });
  fs.mkdirSync(blogDist, { recursive: true });
  fs.writeFileSync(
    path.join(blogDist, "index.html"),
    injectPartials(indexHtml, partials),
  );
  console.log(`  blog/index.html`);

  // Tag pages
  const byTag = new Map();
  for (const post of posts) {
    for (const tag of post.tags) {
      if (!byTag.has(tag)) byTag.set(tag, []);
      byTag.get(tag).push(post);
    }
  }
  for (const [tag, tagPosts] of byTag) {
    const html = fill(indexTemplate, {
      siteTitle: escapeHtml(SITE.title),
      blogPath: SITE.blogPath,
      title: `Tagged: ${escapeHtml(tag)}`,
      description: `Posts tagged ${escapeHtml(tag)}`,
      canonical: `${SITE.url}${SITE.blogPath}/tags/${encodeURIComponent(tag)}/`,
      posts: tagPosts.map((p) => postSummary(p)).join("\n"),
    });
    const dir = path.join(blogDist, "tags", tag);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "index.html"),
      injectPartials(html, partials),
    );
  }
  if (byTag.size) console.log(`  blog/tags/ (${byTag.size} pages)`);

  // RSS
  fs.writeFileSync(path.join(blogDist, "feed.xml"), renderFeed(posts));
  console.log(`  blog/feed.xml`);

  return posts;
}

// --- Sitemap ---

function buildSitemap(htmlFiles, posts) {
  const urls = [];

  for (const filePath of htmlFiles) {
    let rel = path.relative(SRC_DIR, filePath).split(path.sep).join("/");
    if (rel === "index.html") rel = "";
    urls.push({ loc: `${SITE.url}/${rel}` });
  }

  for (const id of PROJECT_IDS) {
    urls.push({ loc: `${SITE.url}/collection/project.html?id=${id}` });
  }

  if (posts.length) {
    urls.push({ loc: `${SITE.url}${SITE.blogPath}/` });
    for (const post of posts) {
      urls.push({
        loc: `${SITE.url}${post.url}`,
        lastmod: post.date.toISOString().slice(0, 10),
      });
    }
  }

  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>${
          u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""
        }\n  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

// --- Main ---

function main() {
  console.log("Building...\n");

  if (!fs.existsSync(SRC_DIR)) {
    console.error(`Source directory "${SRC_DIR}" not found.`);
    process.exit(1);
  }

  // Clean. Without this, files you delete from src/ live on in dist/ forever.
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
  fs.mkdirSync(DIST_DIR, { recursive: true });

  const partials = readPartials();
  const htmlFiles = getHtmlFiles(SRC_DIR);

  if (htmlFiles.length === 0) {
    console.warn(`No HTML files found in ${SRC_DIR}`);
    process.exit(0);
  }

  for (const filePath of htmlFiles) {
    const relativePath = path.relative(SRC_DIR, filePath);
    const destPath = path.join(DIST_DIR, relativePath);

    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    const html = fs.readFileSync(filePath, "utf-8");
    const built = injectPartials(html, partials);

    fs.writeFileSync(destPath, built, "utf-8");
    console.log(`  ${relativePath}`);
  }

  copyNonHtmlFiles(SRC_DIR, DIST_DIR);

  const posts = buildBlog(partials);

  for (const dir of STATIC_DIRS) {
    if (fs.existsSync(dir)) {
      copyDir(dir, path.join(DIST_DIR, dir));
      console.log(`  Copied ${dir}/`);
    } else {
      console.warn(`  Skipped ${dir}/ (not found)`);
    }
  }

  // Sitemap is now generated, not copied. It picks up new posts automatically.
  fs.writeFileSync(
    path.join(DIST_DIR, "sitemap.xml"),
    buildSitemap(htmlFiles, posts),
  );
  console.log(`  sitemap.xml (generated)`);

  const ROOT_FILES = ["robots.txt", "CNAME", ".nojekyll"];
  for (const file of ROOT_FILES) {
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, path.join(DIST_DIR, file));
      console.log(`  Copied ${file}`);
    }
  }

  console.log(
    `\n${htmlFiles.length} page(s) + ${posts.length} post(s) written to ${DIST_DIR}/`,
  );
  console.log("Done.");
}

try {
  main();
} catch (err) {
  console.error(`\nBuild failed: ${err.message}\n`);
  process.exit(1);
}
