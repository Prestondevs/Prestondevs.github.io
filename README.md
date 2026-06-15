# prestondevs.github.io

Personal site. Vanilla HTML/CSS/JS, no build step — push to deploy on GitHub Pages.

## architecture

```
index.html        shell only — all content renders from data
404.html          segfault page for GitHub Pages
css/style.css     design tokens at top (:root), everything derives from them
js/
  data.js         ← single source of truth. edit this file to update the site.
  main.js         entry point, wires modules
  render.js       builds projects / filters / stack / certs / comps / timeline
  age.js          live uptime + remaining counters
  github.js       live stars + language from the GitHub API (cached 6h)
  palette.js      ctrl+k command palette + background cycler
  store.js        safe localStorage wrapper (degrades if unavailable)
img/bg/           background easter-egg images
```

## adding a project

Add one entry to `PROJECTS` in `js/data.js`:

```js
{
  name: 'display_name',
  repo: 'github_repo_name',
  year: 2026,
  tags: ['c++', 're'],
  wip: true,            // optional — shows a WIP badge
  desc: 'one-liner. html allowed.',
}
```

The project grid, tag filters, timeline, and command palette all update
automatically. GitHub stars/language appear on the card once the API
responds (cached in localStorage for 6 hours, fails silently offline).

## features

- `ctrl+k` or `/` — command palette (jump to sections, open repos, cycle bg)
- tag filters on the projects grid
- collapsible sections, state persisted across visits
- live uptime counter (1 Hz under `prefers-reduced-motion`)
- timeline generated from project years
- `bg` button in the footer cycles the classic backgrounds

## local dev

ES modules need a server (file:// won't work):

```
python3 -m http.server 8000
```
