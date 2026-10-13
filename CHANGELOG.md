# Changelog

## Update — 14 October 2026 · cost labels corrected

- Clarified that route/attraction tickets are charged per person: US$10 each, or US$70 for seven people.
- Corrected 125/150cc wording from rental to bike-size upgrade: US$10 per rider/day, about US$40 per rider for the four-day loop.
- Kept both items outside the US$1,820 base group quote as optional add-ons.

## Update — 13 October 2026 · riding costs and licence warning

- Added estimated extra route/attraction tickets at US$10 per person for the trip.
- Added an optional 125/150cc bike-rental estimate of US$10 per bike per day, or about US$40 for four loop days.
- Added a government-sourced licence warning: VND 2–4M for motorcycles up to 125cc and VND 6–8M above 125cc when ridden without a valid licence.

## Update — 13 October 2026 · budget presentation

- Converted all displayed planning allowances to rounded USD estimates so the budget section no longer mixes USD and AUD.
- Restyled listed optional extras as responsive cards with clearer amounts and bases.
- Updated the budget validation and calculator test to enforce the single-currency presentation.

## Update — 13 October 2026

- Added Valor’s estimated 7-person group quote for 8–11 November: 3 self-riders, 4 Easy Riders, four private rooms, permit and no private-group surcharge.
- Set the displayed estimate to **US$1,820**, excluding Hanoi ↔ Ha Giang bus transfers.
- Made bus transfers optional in the calculator and defaulted them off for the quoted total.

## Update — 12 October 2026

- Made the 7 November Hanoi → Ha Giang bus and Ha Giang overnight explicit in the itinerary.
- Labelled the USD 18/person/each-way bus estimate as the 7 November outbound and 11 November return legs.
- Updated the budget control and summary so both bus charges are visible together; fare inclusion still requires confirmation from Valor.

Project history reconstructed from Git commits and review reports. Dates below identify the documentation snapshot, not invented per-commit release dates. Package version remains `1.0.0`; no formal versioned releases have been published by this work.

## Current deployed snapshot — 5 October 2026

Website revision: `161a52f`. GitHub Actions run `37283116508` passed validation, build and Cloudflare Pages deployment; live itinerary data was verified afterward.

### Added

- Full details for all eight travel days; arrival in Hanoi on 7 November, loop on 8–11 November (4D3N), departure from Hanoi on 14 November. Flight numbers and times intentionally omitted.
- Shared budget calculator (`scripts/budget.mjs`) with canonical JSON scaling rules, adjustable Hanoi nights, passenger/rider warnings and budget tests.
- Explicit attraction-ticket unknowns, AUD40/person contingency allowance, transfer fallback notes and claim-level research evidence.
- Content, UI/UX and Research & Plan audit reports, followed by an implementation report.

### Fixed

- Removed conflicting two-person budget quantities and duplicate AUD bus allowance; USD package/buses and AUD allowances remain separate.
- Added motorcycle Reset view, bounded combined zoom, aspect-aware camera fitting, distinct loading/error text and short-screen normal-flow layout.
- Corrected Night map-label contrast, map popup focus/return navigation, ride input labels, checkpoint status styling and section numbering.
- Exposed Day 3's timing conflict: a draft 527-minute core plan exceeds a 510-minute target window; the optional boat adds 120 minutes.
- Refreshed stale crew, price and motorcycle summaries. Tham Ma and Lung Cu specific visits require confirmation.

## Earlier implementation milestones

| Revision(s) | Changes |
| --- | --- |
| `08229b4` | Created the Valor-based static roadbook, editable itinerary, route, checklist and local assets. |
| `da35fc6` | Added mixed-group ride pricing, gallery and crew profile support. |
| `42d8ed4`, `d1306c3` | Introduced GitHub → Wrangler CI/CD and the Leaflet/MapLibre vector route map. |
| `1c0d3c4`, `d539b09` | Added themes, daily area weather, distinct daily photographs and current-area fallback outside the trip forecast window. |
| `048d080`, `e653326` | Renamed the public project to Ha Giang Loop Bike and replaced the theme dropdown with compact swatch buttons. |
| `c5e5fea`, `06d7db6` | Added Zawye Lwin's avatar and compact portrait/quote cards. |
| `54d3e23`–`eefcd40`, `703881f`, `d4e7b38` | Added Ko Ko Ye's photo, Easy Rider choice and revised humorous role/quote. |
| `f38c86f`, `2c08c0b`, `703881f`, `d4e7b38` | Introduced and refined the scroll-driven motorcycle view, then the optimised local Suzuki SV650 model and visible controls. |

## Documentation update — not a website release

Added this changelog, [roadmap](ROADMAP.md) and [project recap](RECAP.md). Updated README/backlog status to match the deployed project. Historical reports are retained; current planning priorities live in the roadmap.
