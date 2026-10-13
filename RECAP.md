# Project Recap

Snapshot: 5 October 2026 · deployed website revision `161a52f`.

## What we built

A personal group-tour roadbook for Valor's 4D3N Ha Giang Loop, rather than a booking website. The plan is Hanoi arrival on 7 November, loop on 8–11 November and Hanoi departure on 14 November 2026. Flight numbers and times are deliberately omitted.

The site combines all eight daily plans, four route-day views, eleven checkpoints, approximate maps, licensed place/regional photographs, mixed ride pricing, separate USD/AUD budgets, weather, a packing checklist and crew profiles. The Suzuki workshop view adds scroll rotation/zoom and manual controls; it illustrates the theme, not Valor's actual tour equipment.

## Why we made these choices

- **A focused project:** the wider Vietnam/Thailand planning project was paused. Ha Giang received its own repository and public identity; the vague `vn-bike` name was replaced publicly, while the local directory stayed unchanged.
- **One selected package:** Valor is the itinerary baseline. Other operators, marketplaces and travelogues provide context, not interchangeable inclusions or quotes.
- **Data first:** `data/trip.json` holds editable travel content and budget rules. Separating content from presentation makes changes reviewable and prevents two-person examples becoming group assumptions.
- **A lightweight website:** HTML/CSS/JavaScript suits a small, static roadbook. Node handles build/validation; a Next.js migration is unnecessary for the current scope.
- **An editorial visual style:** mountain photographs, forest/paper/rust colours, serif headings and compact controls keep the guide recognisable without turning it into a generic booking dashboard.
- **Honest uncertainty:** map lines are schematic; coordinates and stop durations are estimates; optional stops stay optional; currencies are not silently combined. Weather outside the forecast window shows today's area conditions, not a fabricated November forecast.
- **Reliable publication:** GitHub Actions validates/builds and deploys the artifact with Wrangler. CI secrets stay out of source; local login is not the production deployment owner.

## Who is involved

| Participant | Contribution / status |
| --- | --- |
| Project requester | Set the trip dates, selected the package and directed the website, crew, design and audit changes. |
| Ko Ko Ye | Published Crew 2 profile, Easy Rider choice, approved photo and revised blame-joke quote. |
| Zawye Lwin | Published Crew 1 profile with chosen cartoon avatar and suggested joke; ride choice remains pending. |
| Valor | Selected tour operator; published itinerary/prices are references, not a completed booking. |
| Pascal — Content reviewer | Audited hidden daily details, conflicting budget quantities, map status and stale copy. |
| Hubble — UI/UX reviewer | Audited motorcycle controls, short-screen risks, map contrast and accessibility; the main review corrected an inaccurate weather-breakpoint finding. |
| Dewey — Research & Plan reviewer | Audited transfer dependencies, Day 3 feasibility, budget gaps and evidence quality. |
| Coding assistant | Implemented the report fixes, tested interactions and published through GitHub CI. |

The three reviewers produced accountability reports about deliverables—not personal blame. Their findings informed fixes; they do not confirm travel bookings or legal eligibility. The two visible profiles do not define the final group size.

## How it works

`index.html`, `styles.css` and `app.js` render the editable JSON. `scripts/budget.mjs` is the shared quantity/calculation model; weather and motorcycle modules handle their separate interactions. Leaflet/MapLibre and OpenFreeMap provide the vector map; Open-Meteo supplies weather. Local photos and the optimised Suzuki model carry attribution.

`npm test` checks data and unit behaviour; `npm run build` produces `public/`. Browser checks cover navigation, photos, themes, weather fixtures, budget scenarios, map focus and short-screen/reduced-motion motorcycle controls. Browser checks are available locally, but the current GitHub workflow runs validation/unit tests and build, not Playwright.

## What is done, and what is not

The audit fixes and simplified date wording are live. Deployment run `37283116508` succeeded and the published JSON was checked. Day 3 now exposes its timing conflict instead of assuming the boat fits. Crew portraits/quotes, weather fallbacks and motorcycle reset controls are implemented.

Still needed: written transfer/late-check-in arrangements, guide-approved Day 3 timing, final quote/charging units, each traveller's document and insurance checks, more crew choices, and exact licensed photos for remaining regional placeholders. A dedicated motorcycle fallback poster is also pending. No bookings, payment processing or verified password protection are implemented by this recap.

## Where to continue

- [Roadmap and ordered plan](ROADMAP.md)
- [Changelog](CHANGELOG.md)
- [Audit implementation details](reports/fix-audit.md)
- [Live website](https://ha-giang-loop-bike.pages.dev/)
- [GitHub repository](https://github.com/kokoye2007/ha-giang-loop-bike)

This recap records project decisions and implementation history. Current prices and safety guidance must still be rechecked before travel.
