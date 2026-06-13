# Developer Portfolio

A static portfolio site. You edit your source files in `src/` (plus a few
supporting folders), then run a build script that assembles everything into the
`dist/` folder, which is what gets deployed.

## How to copy content from `src` to `dist`

Run this from the project root:

```powershell
node build.js
```

That's it. The script reads from `src/` and writes the finished site into
`dist/`. You never edit `dist/` by hand — it gets regenerated every time you run
the build.

## What the build actually does

`build.js` does four things, in order:

1. **Injects shared partials into your HTML.**
   Any `<div id="nav-container"></div>` in your HTML is replaced with the
   contents of `partials/nav.html`, and `<div id="footer-container"></div>` is
   replaced with `partials/footer.html`. The processed HTML is written to the
   matching path in `dist/` (so `src/about.html` → `dist/about.html`,
   `src/collection/*.html` → `dist/collection/*.html`).

2. **Copies non-HTML files from `src/`.**
   Anything in `src/` that isn't an `.html` file (e.g. `src/collection/collection.js`)
   is copied straight across to the same spot in `dist/`, untouched.

3. **Copies static asset folders as-is.**
   The whole `stylesheets/` and `public/` folders (CSS, JS, images, video) are
   copied into `dist/stylesheets/` and `dist/public/`.

4. **Copies standalone root files.**
   `sitemap.xml` is copied to `dist/sitemap.xml`.

## Where to put things

| If you want to change...            | Edit this                          | Then run        |
| ----------------------------------- | ---------------------------------- | --------------- |
| A page's content                    | `src/*.html`, `src/collection/*.html` | `node build.js` |
| The nav bar (shared on every page)  | `partials/nav.html`                | `node build.js` |
| The footer (shared on every page)   | `partials/footer.html`             | `node build.js` |
| Styles                              | `stylesheets/`                     | `node build.js` |
| Scripts, images, video, favicon     | `public/`                          | `node build.js` |
| Sitemap                             | `sitemap.xml`                      | `node build.js` |

## Folder overview

```
.
├── build.js          ← the build script (run this)
├── src/              ← your page HTML (source of truth)
│   ├── index.html
│   ├── about.html
│   └── collection/
├── partials/         ← reusable HTML snippets injected into pages
│   ├── nav.html
│   └── footer.html
├── stylesheets/      ← CSS (copied as-is)
├── public/           ← JS, images, video, favicon (copied as-is)
├── sitemap.xml       ← copied to dist root
└── dist/             ← GENERATED OUTPUT — do not edit by hand
```

## Things to remember

- **Don't edit `dist/` directly.** Your changes will be wiped the next time you
  run `node build.js`. Always edit the source and rebuild.
- **The build adds files but doesn't delete stale ones.** If you rename or remove
  a source file, its old copy may linger in `dist/`. To be safe, delete the
  `dist/` folder and run `node build.js` again for a clean rebuild.
- **Placeholders must match exactly.** Nav/footer injection only works on
  `<div id="nav-container"></div>` and `<div id="footer-container"></div>`. If a
  partial is missing from `partials/`, the build stops with an error.
