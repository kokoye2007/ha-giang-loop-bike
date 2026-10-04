# VN BIKE — Ha Giang Roadbook

A personal website for Valor’s 4-day/3-night Ha Giang package, with an eight-day Hanoi arrival/return plan. Dates currently assume **7–14 November 2026**, with the loop **8–11 November**; this is provisional.

## Local development

Requires Node.js 22 or newer. The site and build use no npm dependencies.

```sh
npm test
npm run build
npm run dev
```

Open http://localhost:8001/. `public/index.html` is the published entry. Source `index.html` also works when the repository root is served over HTTP.

## Editable data

Edit `data/trip.json` for dates, itinerary, checkpoints, budget and checklist. All costs are AUD. `null` means a quote is required; allowances are not confirmed prices. The selected Valor package price remains unconfirmed. Map markers are approximate location centres, not navigation waypoints.

## Publish

Cloudflare Pages: build command `npm run build`, output directory `public`, production branch `main`.

```sh
npm run build
npx wrangler pages deploy public --project-name vn-bike
```

For automatic deployments, connect the GitHub repository to Cloudflare Pages. The CI workflow validates and builds every change; it does not store or reuse your personal OAuth token.

Vercel alternative: import the GitHub repository. `vercel.json` supplies the build command and output directory.

## Checks

`npm test` validates date sequence, package shape, distances, references, photo files and budget values. `scripts/browser-check.cjs` uses Playwright and a local Chrome installation; set `PLAYWRIGHT_MODULE` to an installed Playwright package and optionally `CHROME_PATH`. It exercises day selection, map actions, filters, saved checklist and mobile layouts.

Research sources are listed on the website and in `reports/research.md`. Photo licences are in `assets/CREDITS.md`. No booking payments or personal traveller documents are stored.
