# Content Agent — Accountability Review

## Scope and verdict

Reviewer: Pascal (Content agent). Reviewed local JSON, presentation source and reports at revision `d4e7b38`. No external facts were rechecked. Findings concern the deliverables, not individuals. P1 means resolve first; P2 means next improvement.

## Findings

### C1 · P1 · Competing budget models

Evidence: `data/trip.json` retains quantities for two package passengers, four bus legs and six food days. `app.js:renderBudget` replaces quantities, omits the AUD bus row and calculates USD buses separately. Raw known JSON allowances total AUD490; the two-person calculator scenario produces AUD390 local allowances plus USD72 buses.

Action: replace legacy example quantities with explicit scaling rules, nights and food-day counts. Label quoted prices, allowances and unknowns consistently.

Acceptance: the same traveller scenario produces identical quantities in data exports and the website, with currencies kept separate.

### C2 · P1 · Useful itinerary details are hidden

Evidence: `itinerary.detail` contains Hanoi activities, airport check-in guidance and transfer contingencies. `app.js:render` displays only date, title and stay in the week strip.

Action: expose each travel day's details, including arrival and departure days.

Acceptance: users can read all eight daily plans without opening JSON.

### C3 · P2 · Inclusion status disappears on the map

Evidence: Lung Cu has status `confirm`; the route includes all non-optional checkpoints and map popups omit status. Optional markers resemble included stops.

Action: show included, optional and confirmation-needed status in popups and marker/route styling.

### C4 · P2 · Reports and copy describe older states

Evidence: `crew.note` says portraits will appear, although two profiles are published. `reports/research.md` says tour prices remain unpriced, although ride prices are displayed. `reports/3d-motorcycle.md` still says 46 degrees; current scroll rotation spans about 75 degrees.

Action: refresh current summaries and mark historical reports as superseded. Identify Crew 1's pending ride choice specifically.

### C5 · P2 · Canonical labels are duplicated

Evidence: `app.js` hardcodes trip dates, duration and map distance; `index.html` hardcodes research date/operator and repeats section number 06.

Action: derive changing labels from JSON and correct section numbering.

## What passed

Four route legs total 424 km. Loop dates/routes/stays align with the itinerary. The five-person example calculates USD1170 tour-only and USD1350 with buses.

## Handoff

Fix C1 and C2 first, then reconcile labels and reports. This review does not implement the recommendations.
