const fs = require("fs");
const path = require("path");

// --- Configuration ---
// Adjust these paths to match where you run the script from.
// If build.js sits in your project root, these defaults should work.
const SRC_DIR = "./src";
const DIST_DIR = "./dist";
const PARTIALS_DIR = "./partials";

// Maps placeholder element IDs to partial filenames.
// Your HTML has <div id="nav-container"></div> and <div id="footer-container"></div>
const placeholders = {
  "nav-container": "nav.html",
  "footer-container": "footer.html",
};

// Folders to copy into dist as-is (no processing, just straight copies)
const STATIC_DIRS = ["stylesheets", "public"];

// --- Functions ---

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
    // Matches <div id="nav-container"></div> (with optional whitespace inside)
    const regex = new RegExp(
      `<div\\s+id=["']${id}["'][^>]*>\\s*<\\/div>`,
      "gi"
    );
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

// --- Main ---

console.log("Building...\n");

if (!fs.existsSync(SRC_DIR)) {
  console.error(`Source directory "${SRC_DIR}" not found.`);
  console.error("Make sure your HTML files are in ./src/ and run this from the project root.");
  process.exit(1);
}

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

console.log(`\n${htmlFiles.length} HTML file(s) written to ${DIST_DIR}/`);

// Copy static assets
for (const dir of STATIC_DIRS) {
  if (fs.existsSync(dir)) {
    copyDir(dir, path.join(DIST_DIR, dir));
    console.log(`  Copied ${dir}/`);
  } else {
    console.warn(`  Skipped ${dir}/ (not found)`);
  }
}

// Copy standalone root files
const ROOT_FILES = ["sitemap.xml"];
for (const file of ROOT_FILES) {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(DIST_DIR, file));
    console.log(`  Copied ${file}`);
  }
}

console.log("\nDone.");