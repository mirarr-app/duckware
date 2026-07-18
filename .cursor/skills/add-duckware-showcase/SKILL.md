---
name: add-duckware-showcase
description: Adds curated DuckWare showcase pages to the static HTML catalog. Creates showcases/<slug>.html with a project-themed detail page, updates showcases/index.html and feed.xml. Use when the user asks to add a showcase, curate a project, or publish a software audit page for duckware.
---

# Add a DuckWare Showcase

DuckWare is a **static HTML site** — no build step, no CMS, no generator. Each showcase is hand-authored across **three files**.

**New showcases:** the **detail page** gets a unique visual theme tied to the project. The **catalog card** and **RSS item** stay on the shared DuckWare design system.

## Three-file rule (mandatory)

| File | Role |
|------|------|
| `showcases/<slug>.html` | Detail page — **unique theme** |
| `showcases/index.html` | Catalog card at top — **shared style** |
| `feed.xml` | RSS item — **shared format** |

## Workflow

### 1. Sync and branch

```bash
git fetch origin main && git checkout main && git pull origin main
git checkout -b cursor/add-<slug>-showcase-7a08
```

### 2. Metadata

Read the top card in `showcases/index.html` for the current latest number → assign **next number**.

| Field | Rule |
|-------|------|
| Slug | `showcases/<slug>.html` — lowercase, preserve brand casing when needed (`ffmpeg-webCLI.html`) |
| Number | Previous latest + 1 |
| Date | User's `created` date or today |
| Repo | `org/repo` |
| Catalog title | `ProjectName: Short Descriptor` |
| Tags | Exactly 3 pills on catalog card |

### 3. Research

Gather before writing:

- Repo URL, CTAs (releases, docs, live app)
- Images in `assets/`, `docs/`, fastlane, `.github/` — hotlink from upstream
- Default branch (`main` vs `master`) for raw URLs
- **Brand signals** — logo colors, screenshots, project category (CLI, game, privacy, etc.)

Write **original audit prose**. Do not copy-paste README or user clippings.

### 4. Theme the detail page

Add after `index.css`:

```html
<body class="showcase-theme showcase-theme--<slug>">
```

Scoped `<style>` block in `<head>` — **never edit `index.css` or `app.js` globally**.

```html
<style>
  .showcase-theme--<slug> {
    --showcase-accent: #29adff;
    --showcase-accent-soft: rgba(41, 173, 255, 0.12);
    --showcase-hero-bg: linear-gradient(160deg, #1a1a2e, #0f0f1b);
    --showcase-card-bg: rgba(255, 255, 255, 0.03);
  }
  .showcase-theme--<slug> .hero-band { background: var(--showcase-hero-bg); }
  .showcase-theme--<slug> .btn-primary {
    background-color: var(--showcase-accent);
    color: #0f0f1b;
  }
  /* Prefix every override with .showcase-theme--<slug> */
</style>
```

**Theme levers:** hero background, accent color, card borders/tints, mockup chrome, optional display font for H1/tagline.

**Category hints:**

| Type | Direction |
|------|-----------|
| Terminal / CLI | Dark bg, monospace accents, green/cyan tokens |
| Privacy / security | Muted palette, restrained accent, high contrast |
| Mobile / game | Colors from screenshots, screenshot-forward hero |
| Pixel art / creative | Grid textures, chunky borders, limited palette |
| Desktop utility | Logo-led, clean product screenshot hero |

Pull 2–4 colors from logo/screenshots. Each new showcase must look **distinct** from recent ones.

**Fixed on every detail page:** nav links, footer structure, `../index.css`, `../app.js`, required sections, back-to-catalog link.

### 5. Create `showcases/<slug>.html`

```
<head> … index.css + scoped <style> … </head>
<body class="showcase-theme showcase-theme--<slug>">
  Nav → Hero → Main sections → Back to Catalog → Footer → app.js
```

**Hero (required):** `org/repo • date • Showcase #NN` · H1 · tagline · CTA(s)

**Body (expected):**

- Visual (screenshot / terminal mockup)
- "What is {Project}?"
- "Architectural Highlights & Strengths" — 3 `card-content` items
- Optional: install / CLI mockup
- Required: `← Back to Catalog` → `./`

Reuse base classes (`hero-band`, `card-mockup`, `token-cmd`, etc.) — theme them via scoped CSS.

### 6. Catalog card — `showcases/index.html`

Insert new `<a class="card-content showcase-list-card">` **at top** of grid. **Shared DuckWare style only** — no per-project theme here.

Demote previous top card: `#NN (Latest)` → `#NN`.

Preview strategy: logo centered · full screenshot · terminal mockup if no images.

Hotlink pattern:

```
https://github.com/<org>/<repo>/raw/<branch>/<path>
```

### 7. RSS — `feed.xml`

1. Update channel `lastBuildDate` and `pubDate` (RFC 822).
2. Append `<item>` at end of channel.

`title` and `description` must match the catalog card.

```xml
<item>
  <title>ProjectName: Descriptor</title>
  <link>https://mirarr-app.github.io/duckware/showcases/<slug>.html</link>
  <guid isPermaLink="true">https://mirarr-app.github.io/duckware/showcases/<slug>.html</guid>
  <pubDate>Day, DD Mon YYYY HH:MM:SS GMT</pubDate>
  <description>Same blurb as catalog card.</description>
</item>
```

### 8. Commit and PR

```bash
git add showcases/<slug>.html showcases/index.html feed.xml
git commit -m "Add showcase #NN: <ProjectName>

<One-line summary>. Detail page uses a project-themed visual style."
git push -u origin cursor/add-<slug>-showcase-7a08
```

Open **draft PR** to `main`. Note theme direction in PR body.

Live URL: `https://mirarr-app.github.io/duckware/showcases/<slug>.html`

## Checklist

- [ ] `showcases/<slug>.html` with `showcase-theme--<slug>` + scoped styles
- [ ] Theme fits project and differs from recent showcases
- [ ] Nav/footer readable; structure unchanged
- [ ] Catalog card at top; `(Latest)` moved from previous card
- [ ] `feed.xml` dates + item; title/description match catalog
- [ ] Original prose; images hotlinked; external links use `target="_blank" rel="noopener"`
- [ ] Committed, pushed, draft PR

## Don't

- Edit `index.css`, `app.js`, or landing page for one showcase
- Theme the catalog grid or RSS
- Copy README/clipping text verbatim
- Reuse the same theme palette for every showcase
- Skip any of the three files

## More detail

- Theme examples and HTML skeleton: [reference.md](reference.md)
