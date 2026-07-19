---
name: add-duckware-showcase
description: Adds curated DuckWare showcases with bespoke dark-mode detail pages tailored to each project (research first, unique UI, subtle animations). Creates showcases/<slug>.html plus catalog and RSS entries; include a page screenshot in the PR when possible. Use when the user asks to add a showcase, curate a project, or publish a software audit page for duckware.
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

## Design principles (mandatory)

1. **Understand the project first.** Before writing HTML, be able to explain in plain language what the software does, who it's for, and what makes it worth showcasing. Read the README, skim issues/docs, watch demos if available. The page must communicate *that understanding* — not generic filler.

2. **UI unique and tailored.** Design layout, typography, color, and section structure specifically for *this* project. Do not copy the visual style of other DuckWare showcases (`runtipi.html`, `topgrade.html`, `face-looker.html`, etc.) — each page is a fresh design.

3. **Dark mode only.** Never design showcase detail pages in light mode. Use dark backgrounds, light text, and accents tuned for dark UI. No white/off-white page backgrounds.

4. **Subtle, project-specific animation.** When it fits, add small crafted touches — hover states, entrance fades, glow pulses, typing effects, parallax hints — that reinforce *this* product's personality. Keep motion subtle and purposeful; respect `prefers-reduced-motion`.

5. **PR screenshot.** When opening the showcase PR, include a full-page screenshot of the detail page in the PR body if possible (see step 8).

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

### 3. Research — understand what it actually does

**Do not skip this.** Goal: internalize the product before designing.

- Read README, docs, and any wiki linked from the repo
- Identify: **problem solved**, **primary user**, **core workflow**, **standout technical or UX choices**
- Collect assets: repo URL, CTAs, logo, screenshots, demo video, default branch for hotlinks
- Note **personality** — terminal tool, cozy desktop app, game, privacy utility, homelab dashboard, etc.

Write **original audit prose** from that understanding. Do not copy-paste README or user clippings.

**Sanity check:** Can you describe what the project does in two sentences without looking at the repo? If not, research more before designing.

### 4. Design the bespoke page

**Start from a blank page.** Do not open another showcase or `boneyard.html` as a starting point.

**Dark mode only** — dark backgrounds (`#0a0a0f`, `#111`, deep brand-tinted darks), light text, accent colors that pop on dark. Never ship a light-themed showcase page.

**Original visual identity** — the layout and aesthetic must be invented for this project. Borrowing section patterns from `runtipi.html`, `topgrade.html`, or any prior showcase is not allowed.

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
- **Animation (optional but encouraged):** subtle CSS transitions, `@keyframes`, or scroll reveals tailored to the product — e.g. terminal cursor blink, sync pulse between devices, pixel snap grid. Use `prefers-reduced-motion: reduce` to disable motion when requested
- **Polish:** gradients, borders, grid textures, glass panels on **dark** canvases — whatever serves **this** product

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

Bespoke dark-mode detail page plus catalog and RSS integration."
git push -u origin cursor/add-<slug>-showcase-7a08
```

**PR body must include:**

- **Page concept** — one paragraph on design direction tied to what the project does
- **What the project does** — two-sentence summary proving you understood it
- **Screenshot** — full-page capture of the showcase detail page embedded in the PR when possible:

```markdown
## Preview

<img alt="Showcase page preview" src="/opt/cursor/artifacts/screenshots/<slug>-showcase.png" />
```

Capture after building the page (browser screenshot or headless capture at ~1280px width). If screenshot capture is unavailable, note that in the PR and describe the visual design instead.

Open a **draft PR** to `main`.

## Checklist

- [ ] **Understood the project** — can explain what it does before designing
- [ ] Detail page is **bespoke** — not copied from other showcases or DuckWare template
- [ ] **Dark mode only** — no light backgrounds
- [ ] **Unique visual identity** — layout/fonts/motion invented for this project
- [ ] Subtle animations added where they fit the product (with reduced-motion fallback)
- [ ] No `../index.css` dependency (unless explicitly justified)
- [ ] Title, meta description, back-to-catalog link present
- [ ] Catalog card at top; previous `(Latest)` demoted
- [ ] `feed.xml` updated; title/description match catalog
- [ ] Original prose; hotlinked images; external links safe
- [ ] Committed, pushed, draft PR **with screenshot** when possible

## Don't

- Clone another showcase's layout or visual style (`runtipi.html`, `topgrade.html`, etc.)
- Design in **light mode**
- Clone `boneyard.html` / `portless.html` and change CSS variables
- Use `showcase-theme--<slug>` overrides on DuckWare components as the main approach
- Make every page "hero-band + 3 card-content sections" with different hex codes
- Theme the catalog or RSS
- Edit `index.css` globally
- Skip any of the three integration files

## More detail

- Anti-patterns, catalog/RSS snippets: [reference.md](reference.md)
