# DuckWare Showcase Reference

## Integration vs. design

```
INTEGRATION (same every time)          DESIGN (unique every time)
─────────────────────────────          ────────────────────────────
showcases/<slug>.html exists           Full HTML/CSS crafted for project
URL in catalog + RSS                   Layout, type, color, motion, sections
Showcase #NN, title, tags, blurb       Visual metaphor tied to product
feed.xml <item>                        No DuckWare template reuse
```

## Anti-pattern: template + tint

**Wrong** — what the old skill produced:

```html
<link rel="stylesheet" href="../index.css">
<body class="showcase-theme showcase-theme--yoinks">
  <nav class="nav-bar">…duckware nav…</nav>
  <header class="hero-band">…</header>
  <main class="content-band">
    <h2>What is yoinks?</h2>
    <ul><li class="card-content">…</li></ul>
  </main>
  <footer class="footer">…duckware footer…</footer>
```

Only the accent color and hero gradient changed. **Reject this approach.**

**Right** — bespoke page:

- Custom header (maybe just logo + back link, or product-branded nav)
- Hero designed around the product (terminal window, phone mockup, split before/after)
- Sections with names and layout that fit the story — not "Architectural Highlights & Strengths" every time
- Footer minimal or product-themed
- All CSS in page `<style>`; fonts chosen for the project

## Bespoke page checklist

| Requirement | Notes |
|-------------|-------|
| `<title>… — DuckWare</title>` | SEO + tab label |
| `<meta name="description">` | Matches catalog blurb closely |
| Back to catalog | Link to `./` — style it natively |
| CTAs | Source, releases, demo, docs — as buttons/links fitting the design |
| Content | Original audit voice; ~3 strengths worth highlighting |
| Images | Hotlink from repo when possible |
| Mobile | Readable at 375px width |
| Accessibility | Sufficient contrast; alt text on images |

## Catalog card (unchanged shared style)

```html
<!-- Showcase Card N: ProjectName (LATEST on top) -->
<a href="<slug>.html" class="card-content showcase-list-card" style="box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
  <div class="card-mockup" style="…">
    <!-- preview image or terminal mockup -->
  </div>
  <div style="display: flex; flex-direction: column; gap: var(--space-md);">
    <div class="text-code" style="…">
      <span>org/repo</span><span>•</span>
      <span style="color: var(--color-body-strong);">Showcase #N (Latest)</span>
    </div>
    <h3 class="text-display-sm" style="…">ProjectName: Descriptor</h3>
    <p class="text-body-sm" style="…">Blurb.</p>
    <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap;">
      <span class="text-caption" style="…">Tag1</span>
      …
    </div>
  </div>
</a>
```

## RSS item

```xml
<item>
  <title>ProjectName: Descriptor</title>
  <link>https://mirarr-app.github.io/duckware/showcases/<slug>.html</link>
  <guid isPermaLink="true">https://mirarr-app.github.io/duckware/showcases/<slug>.html</guid>
  <pubDate>Day, DD Mon YYYY HH:MM:SS GMT</pubDate>
  <description>Same blurb as catalog card.</description>
</item>
```

## Bespoke layout ideas (examples)

| Project | Page concept |
|---------|----------------|
| yoinks | Full Ink terminal UI as the page chrome; commands as content |
| tork | Cozy cat ASCII header, warm parchment terminal aesthetic |
| UniClipboard | Split device sync diagram, encrypted pipe animation |
| Pixel Snapper | Before/after pixel grid hero, magnifier on details |
| Idle Fantasy | Phone frame with game screenshots, quest-board sections |
| Mouzi | System tray metaphor, file-sorting animation strip |
| deface | Film strip before/after, privacy redaction aesthetic |

Each new page should have its **own** concept — don't reuse these layouts verbatim.

## Hotlink patterns

```
https://github.com/<org>/<repo>/raw/<branch>/<path>
https://codeberg.org/<org>/<repo>/raw/branch/<branch>/<path>
```

URL-encode spaces. Match default branch (`main` vs `master`).

## Gotchas

1. Filename casing must match links (`ffmpeg-webCLI.html`).
2. Catalog order is newest-first; RSS can stay chronological.
3. No CI validation — check links manually.
4. Legacy showcases (`boneyard.html`, etc.) use the old shared template — **do not copy them for new work**.

## PR summary

| Field | Value |
|-------|-------|
| Slug | `<slug>.html` |
| Number | #NN (Latest) |
| Repo | org/repo |
| Tags | Tag1, Tag2, Tag3 |
| Page concept | One sentence — the bespoke design idea |
