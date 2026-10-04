# Repository Guidelines

## Project Structure

`index.html`, `styles.css` and `app.js` are the presentation source. `data/trip.json` is the canonical editable itinerary, checkpoint, budget and checklist dataset. `assets/` contains local photographs, attribution and Leaflet. `scripts/` holds build, validation, local serving and browser checks. `reports/` records research and decisions; `previews/` holds review screenshots. `public/` is generated and ignored by Git.

## Development Commands

Use Node.js 22 or newer. No npm installation is required for the static build.

- `npm test` validates route data and local image references.
- `npm run build` validates sources and copies the publishable site to `public/`.
- `npm run dev` serves that output at `http://localhost:8001/`.
- `npm run test:browser` runs the Playwright smoke check when Playwright and Chrome are installed.

## Data and Coding Style

Keep travel content in JSON, not JavaScript strings. Use four-space HTML/JavaScript indentation, descriptive camelCase JSON fields and hyphenated asset names. Preserve Australian English and explicit AUD cost bases. Use `null` for unknown prices, rather than zero. Escape editable data before inserting HTML.

## Research and Testing

Valor’s 4D3N package is the chosen itinerary. Other operators and bicycle tours are comparison references, not interchangeable packages. Record source URLs and review dates. Label optional stops, approximate coordinates and proposed time blocks. Recheck current operator terms and official travel advice when changing booking or riding guidance.

Run validation and build before handing off changes. For presentation changes, inspect desktop and mobile screenshots and check keyboard access, image loading and overflow.

## Commits and Deployment

Use short imperative commits. Explain changed assumptions and include screenshots for visual changes. Publish `public/` to Cloudflare Pages; keep Vercel configuration as an alternative. Do not commit credentials, passport details, private confirmations or personal authentication tokens.
