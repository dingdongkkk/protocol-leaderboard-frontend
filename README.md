# Protocol Website — React

The Protocol club website rebuilt in **React (Vite)** with **Framer Motion** animations.
Same color palette, fonts, font sizes, logos and content as the original vanilla site in `../Website` — only motion and polish were added.

## Run locally

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Structure

```
public/data/          # all images (logos, event posters, team photos) — copied as-is
src/
  data/               # team rosters, events, Synergy articles, notes links (edit content here)
  pages/              # one component per page (Home, About, Core, Events, ...)
  components/         # Navbar, Footer, Reveal (scroll animations), TiltCard, particles
  styles/
    global.css        # the original styles.css, unchanged
    animations.css    # new animation/aesthetic layer (same palette)
```

## Updating content

- **Events** → `src/data/events.js` (add new events at the top)
- **Synergy articles** → `src/data/articles.js` (newest first)
- **Team members** → `src/data/team.js`
- **Notes links** → `src/data/notes.js`
- **Countdown date** → `EVENT_DATE` in `src/pages/Home.jsx`

## Deployment

`netlify.toml` at the repo root builds this app (`npm install && npm run build`, publish `dist/`)
with an SPA redirect so React Router routes work on refresh.
