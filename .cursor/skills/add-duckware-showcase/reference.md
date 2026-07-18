# DuckWare Showcase Reference

## File layout

```
/workspace/
├── feed.xml
├── index.css          # shared — do not edit per showcase
├── app.js             # shared — do not edit
└── showcases/
    ├── index.html     # catalog — shared style
    └── <slug>.html    # detail — unique theme
```

## Detail page skeleton

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
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../index.css">
  <style>
    .showcase-theme--<slug> { /* overrides */ }
  </style>
</head>
<body class="showcase-theme showcase-theme--<slug>">
  <!-- nav: copy from showcases/boneyard.html -->
  <header class="hero-band">…</header>
  <main class="content-band">…</main>
  <!-- back link + footer: copy from showcases/boneyard.html -->
  <script src="../app.js"></script>
</body>
</html>
```

## Catalog card skeleton

```html
<!-- Showcase Card N: ProjectName (LATEST on top) -->
<a href="<slug>.html" class="card-content showcase-list-card" style="box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
  <div class="card-mockup" style="box-shadow: 0 4px 15px rgba(0,0,0,0.3); border-color: var(--color-hairline);">
    <!-- image or terminal mockup -->
  </div>
  <div style="display: flex; flex-direction: column; gap: var(--space-md);">
    <div class="text-code" style="color: var(--color-mute); display: flex; gap: var(--space-sm); align-items: center;">
      <span>org/repo</span><span>•</span>
      <span style="color: var(--color-body-strong);">Showcase #N (Latest)</span>
    </div>
    <h3 class="text-display-sm" style="color: var(--color-ink); font-weight: 500;">Title</h3>
    <p class="text-body-sm" style="color: var(--color-body); line-height: 1.6;">Blurb.</p>
    <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap;">
      <span class="text-caption" style="background-color: var(--color-canvas); padding: var(--space-xxs) var(--space-sm); border-radius: var(--radius-sm); border: 1px solid var(--color-hairline);">Tag</span>
    </div>
  </div>
</a>
```

## Theme examples (direction only — do not reuse palettes)

| Project | Theme idea |
|---------|------------|
| tork | Cozy terminal — warm dark brown, soft mockup chrome |
| ternlight | Cool blue-gray WASM bundle aesthetic |
| Idle Fantasy | Game gold accent from screenshots |
| Pixel Snapper | Checkerboard hero, pixel-crisp borders |
| UniClipboard | Deep navy, trust-forward privacy accent |
| deface | Before/after split, neutral gray + blur accent |
| Mouzi | Tray-app clean UI, soft desktop utility feel |

## Structural references (content, not visual)

| Pattern | Example file |
|---------|----------------|
| Logo badge + screenshots | `showcases/boneyard.html`, `showcases/zennotes.html` |
| CLI / terminal only | `showcases/portless.html`, `showcases/restic.html` |
| Screenshot-heavy | `showcases/mirarr.html`, `showcases/ffmpeg-webCLI.html` |

Older pages predate per-showcase themes — use them for **structure**, not visual sameness.

## Gotchas

1. Filename casing must match links exactly (`ffmpeg-webCLI.html`).
2. Default branch varies (`main` vs `master`).
3. URL-encode spaces in image paths.
4. Catalog order is newest-first; RSS items can stay chronological.
5. No automated validation — manual review only.

## PR summary table

| Field | Value |
|-------|-------|
| Slug | `<slug>.html` |
| Number | #NN (Latest) |
| Repo | org/repo |
| Tags | Tag1, Tag2, Tag3 |
| Theme | e.g. "dark terminal green" |
