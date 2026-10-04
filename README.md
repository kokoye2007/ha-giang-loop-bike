# VN BIKE — Ha Giang Roadbook

A group-tour website for Valor’s 4-day/3-night Ha Giang package, with an eight-day Hanoi arrival/return plan. Dates currently assume **7–14 November 2026**, with the loop **8–11 November**; this is provisional.

## Local development

Requires Node.js 22 or newer. The site and build use no npm dependencies.

```sh
npm test
npm run build
npm run dev
```

Open http://localhost:8001/. `public/index.html` is the published entry. Source `index.html` also works when the repository root is served over HTTP.

## Editable data

Edit `data/trip.json` for itinerary, checkpoints, photos, budget, ride options, members and checklist. Valor's booking configuration lists ride prices in **USD** (checked 5 October 2026); local allowances are **AUD**. The calculator keeps currencies separate and supports mixed ride choices, room sharing and vehicle sharing. No group size is assumed. Prices are not a final booking quote. Map markers are approximate location centres, not navigation waypoints.

Member entries use `name`, `photo` (a local `assets/members/` image), `ride`, `quote` and `publishConsent`. Only entries with `publishConsent: true` render. Get approval for both the portrait and quote before public publication. The current joke ideas are unassigned, not attributed to real members.

## Publish

Cloudflare Pages: build command `npm run build`, output directory `public`, production branch `main`.

```sh
npm run build
npx wrangler pages deploy public --project-name vn-bike
```

GitHub Actions is the deployment owner; do not enable a second Cloudflare Git integration. `.github/workflows/deploy.yml` validates and builds pull requests, then deploys the tested artifact on pushes to `main` or manual dispatch. Production URL: https://vn-bike.pages.dev/. Both deployment secrets are configured and the first deployment succeeded.

Configure repository Actions secrets:

- `CLOUDFLARE_ACCOUNT_ID` — configured for this account.
- `CLOUDFLARE_API_TOKEN` — create a scoped token with **Account → Cloudflare Pages → Edit**, restricted to the selected account. Never commit it or use the local Wrangler OAuth token in CI.

The local command above is only a recovery option. Wrangler is pinned in the workflow. Only `main` deploys; pull requests have no deployment access. GitHub authentication needs the `workflow` scope to upload workflow files.

Vercel alternative: import the GitHub repository. `vercel.json` supplies the build command and output directory.

## Checks

`npm test` validates date sequence, package shape, distances, references, photo files and budget values. `scripts/browser-check.cjs` uses Playwright and a local Chrome installation; set `PLAYWRIGHT_MODULE` to an installed Playwright package and optionally `CHROME_PATH`. It exercises day selection, map actions, filters, saved checklist and mobile layouts.

Research sources are listed on the website and in `reports/research.md`. Photo licences are in `assets/CREDITS.md`. No booking payments or personal traveller documents are stored.

## Map design

Leaflet keeps checkpoint interactions; MapLibre renders OpenFreeMap's Positron vector style rather than default raster OSM tiles. Custom controls, numbered pins and a schematic route overlay match the roadbook. Libraries are version-pinned on unpkg; map styles/tiles need network access and WebGL. No map API token is required. Required map-provider/data attribution remains visible. [Official integration guide](https://openfreemap.org/quick_start/).

## Themes, weather and members

The theme selector offers Forest & cream, Sunrise & clay and Night ride; preference is stored in this browser. Tokens preserve the editorial roadbook layout.

Daily weather locations/dates live in `trip.json` → `weather.days`. The browser calls [Open-Meteo's forecast API](https://open-meteo.com/en/docs) only for dates within today through 15 days ahead, using `Asia/Ho_Chi_Minh`. It displays minimum/maximum temperature, rain probability and fetch time, with explicit unavailable/error states. These are area-grid forecasts, not forecasts for every pass. The free API is for this non-commercial personal group guide; review [usage terms](https://open-meteo.com/en/terms) before adding advertising or commercial booking functions. Unit tests stub API responses, so CI doesn't depend on live weather.

`data/member-template.json` shows the member schema. Names, portraits and joke quotes remain absent until supplied and approved; the consent gate is browser-tested. See `reports/backlog.md` for completed and remaining tasks.
