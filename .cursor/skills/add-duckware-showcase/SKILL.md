---
name: add-duckware-showcase
description: Adds curated DuckWare showcases. Creates a bespoke HTML page per project at showcases/<slug>.html, plus catalog and RSS entries. Use when the user asks to add a showcase, curate a project, or publish a software audit page for duckware.
---

# Add a DuckWare Showcase

DuckWare is a **static HTML site** — no build step, no CMS. Each showcase touches **three integration points**. The **detail page is a one-off landing page** designed only for that project.

## What "same structure" means

**Keep consistent (integration layer):**

| Piece | Rule |
|-------|------|
| File path | `showcases/<slug>.html` |
| Public URL | `https://mirarr-app.github.io/duckware/showcases/<slug>.html` |
| Catalog card | New entry at top of `showcases/index.html` |
| RSS item | New `<item>` in `feed.xml` |
| Metadata | Matching title, description, showcase number, date, `org/repo`, 3 tags |

**Do NOT keep consistent (detail page):**

- Layout, typography, colors, section order, components
- DuckWare `index.css` as the page foundation
- Copying `hero-band` / `card-content` / `card-mockup` from older showcases
- "Template + accent color overrides" — **this is wrong**

Each `showcases/<slug>.html` should look like **a beautiful standalone page** built for that product — as if you designed a microsite for it.

## Three-file rule (mandatory)

| File | Role |
|------|------|
| `showcases/<slug>.html` | **Bespoke** detail page (self-contained HTML/CSS) |
| `showcases/index.html` | Catalog card — shared DuckWare catalog style |
| `feed.xml` | RSS item — shared format |

## Workflow

### 1. Sync and branch

```bash
git fetch origin main && git checkout main && git pull origin main
git checkout -b cursor/add-<slug>-showcase-7a08
```

### 2. Metadata

Read top card in `showcases/index.html` → assign **next showcase number**.

| Field | Rule |
|-------|------|
| Slug | `showcases/<slug>.html` — preserve brand casing when needed (`ffmpeg-webCLI.html`) |
| Catalog title | `ProjectName: Short Descriptor` |
| Tags | Exactly 3 pills on catalog card |
| Date | User `created` date or today |

### 3. Research

- Repo URL, CTAs, screenshots, logo, default branch for hotlinks
- Product **personality** — terminal tool, cozy desktop app, game, privacy utility, creative tool, etc.
- UI cues to echo: fonts, palette, density, motion, metaphor (terminal window, phone frame, blueprint grid…)

Write **original audit prose**. Do not copy-paste README or clippings.

### 4. Design the bespoke page

**Start from a blank page.** Do not open `boneyard.html` and tweak colors.

#### Required in every detail page

```html
<title>{Project} Showcase — DuckWare</title>
<meta name="description" content="…">
```

Plus:

- A clear path back to the catalog (`./` or `showcases/index.html` relative link) — **styled to fit the page**, not necessarily DuckWare nav
- Original editorial content: what it is, why it matters, strengths (≈3), CTAs to source/releases/demo
- `target="_blank" rel="noopener"` on external links
- Responsive layout (`viewport` meta, readable on mobile)

#### How to build it

- **Self-contained:** inline `<style>` or a `<style>` block with all page CSS. No dependency on `../index.css`.
- **Optional:** `../app.js` only if you need navbar scroll — most bespoke pages won't need it
- **Typography:** pick Google Fonts (or system stack) that match the product — not default Inter + Instrument Serif unless intentional
- **Layout:** invent section structure per project — split hero, bento grid, timeline, comparison panels, device frames, terminal chrome, etc.
- **Imagery:** hotlink upstream screenshots/logos; build custom UI mockups in HTML/CSS when needed
- **Polish:** gradients, borders, subtle animation, grid textures, glass panels — whatever serves **this** product

#### Design bar

Ask: *"If I removed the DuckWare title suffix, would this still feel like a dedicated landing page for {Project}?"*

If it still looks like the DuckWare catalog with different colors → **redo it**.

#### Category sparks (layout ideas, not palettes to reuse)

| Type | Bespoke direction |
|------|-------------------|
| CLI / terminal | Full-page terminal chrome, scanlines, command blocks as hero |
| Privacy | Minimal trust-forward layout, lock/network motifs, calm whitespace |
| Game / mobile | Device frame, screenshot carousel, playful type |
| Pixel / creative | Grid background, crisp pixels, gallery-led |
| Desktop utility | Product screenshot as hero, feature columns, OS-native feel |
| Dev library | Code-first hero, API snippet as visual centerpiece |

### 5. Create `showcases/<slug>.html`

Minimal skeleton — **everything below is illustrative; replace entirely:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{Project} Showcase — DuckWare</title>
  <meta name="description" content="…">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=…" rel="stylesheet">
  <style>
    /* All page styles here — bespoke to this project */
  </style>
</head>
<body>
  <!-- Unique layout: nav, hero, sections, footer — all custom -->
  <a href="./">← All showcases</a>
  …
</body>
</html>
```

**Do not** `<link rel="stylesheet" href="../index.css">` unless mixing a tiny shared utility — default is **no shared CSS**.

### 6. Catalog card — `showcases/index.html`

Insert at **top** of grid. **Shared DuckWare catalog style** — unchanged from before.

Demote previous `#NN (Latest)` → `#NN`.

### 7. RSS — `feed.xml`

Update channel dates; append `<item>`. Title + description must match catalog card.

### 8. Commit and PR

```bash
git add showcases/<slug>.html showcases/index.html feed.xml
git commit -m "Add showcase #NN: <ProjectName>

Bespoke detail page plus catalog and RSS integration."
git push -u origin cursor/add-<slug>-showcase-7a08
```

In PR body, describe the **page concept** (e.g. "full-viewport terminal with green phosphor theme"), not just accent colors.

## Checklist

- [ ] Detail page is **bespoke** — not DuckWare template with overrides
- [ ] No `../index.css` dependency (unless explicitly justified)
- [ ] Layout, fonts, and sections are unique to this project
- [ ] Title, meta description, back-to-catalog link present
- [ ] Catalog card at top; previous `(Latest)` demoted
- [ ] `feed.xml` updated; title/description match catalog
- [ ] Original prose; hotlinked images; external links safe
- [ ] Committed, pushed, draft PR

## Don't

- Clone `boneyard.html` / `portless.html` and change CSS variables
- Use `showcase-theme--<slug>` overrides on DuckWare components as the main approach
- Make every page "hero-band + 3 card-content sections" with different hex codes
- Theme the catalog or RSS
- Edit `index.css` globally
- Skip any of the three integration files

## More detail

- Anti-patterns, catalog/RSS snippets: [reference.md](reference.md)
