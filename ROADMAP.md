# Roadmap & Delivery Plan

Updated 5 October 2026 against deployed revision `161a52f`. This is the current planning source; older backlog/audit reports document earlier states. Priorities are ordered, not calendar commitments.

## Goal and boundaries

Maintain a useful group roadbook for Hanoi arrival on 7 November, Valor's Ha Giang Loop on 8–11 November (4D3N), and Hanoi departure on 14 November 2026. Keep editable content in JSON, distinguish assumptions from confirmed terms, and deploy through GitHub CI to Cloudflare Pages. No flight numbers/times, bookings, payments or private travel documents are required.

## Shipped

- [x] Static responsive website with root `index.html`, eight-day itinerary and four loop-day views.
- [x] Eleven checkpoints, maps, real regional/place photos and licensed attribution.
- [x] Mixed ride options, separate USD/AUD estimates and data-driven budget quantities.
- [x] Browser-saved packing checklist; Forest, Sunrise and Night themes.
- [x] Daily area weather with current-area/trip-forecast labels and retry states.
- [x] Two approved crew profiles and an interactive local Suzuki model.
- [x] Three-domain audit, priority fixes, regression checks and GitHub CI deployment.

## Next: make the plan dependable

| Priority / work | Owner role | Completion evidence |
| --- | --- | --- |
| P1 · Verify transfer and accommodation arrangements | Trip organiser + Research & Plan | Written 7 November pickup/pre-tour stay and 11 November return/late check-in arrangements, with fallback. Public data stores a summary only. |
| P1 · Resolve Day 3 feasibility | Research & Plan + Valor guide | Agreed daylight arrival plan; realistic riding, walking, meal and buffer allowances. Boat stays optional unless time and price are confirmed. |
| P1 · Obtain complete charging terms | Research & Plan + Content | Final ride quote, bus inclusion, VAT/card fees and room/private-tour charging units recorded with source/date. Unknown costs remain TBC until verified. |
| P1 · Confirm crew choices and safety documents privately | Trip organiser + each traveller | Zawye Lwin's ride choice and remaining group membership agreed; actual licence-issuer requirements and insurer cover checked. Publish no document identifiers. |

## Then: content and experience polish

- P2 · Content: replace regional placeholders for Nam Dam, Lung Tam, Lung Ho and Du Gia waterfall with accurate, licensed images. Acceptance: exact-place image, credit, licence and accessible description for each replacement.
- P2 · UI/UX: add a dedicated static motorcycle poster and a zoom-limit indicator. Acceptance: useful loading/failed view and keyboard-accessible controls at short/mobile sizes.
- P2 · Code: extend browser regressions for loading/failure states and explicit Night-map contrast; add further claim-reference validation as research grows. Keep browser tests distinct from the current CI unit/data checks.
- P2 · Code/maintenance: review the GitHub Actions Node-runtime deprecation warnings observed in the last deployment; verify compatible action upgrades before changing CI.
- P2 · Content: add more crew profiles only with portrait/quote approval. Keep calculator seeds aligned with recognised ride choices; do not infer bookings from counts.

## Optional later work

Offline roadbook support and an easier quote-export view may help the group, but are not scheduled. No framework migration or commercial booking system is planned. Password protection from the earlier trip project is not a verified shipped feature here; evaluate real access control only if requested for this site.

## Delivery workflow

1. Research & Plan records evidence, uncertainty and operator confirmations in `data/trip.json`.
2. Content checks descriptions, dates, inclusion status, quantities and privacy.
3. UI/UX and Code implement only the agreed changes and review keyboard/mobile behaviour.
4. Run `npm test` and `npm run build`; run `npm run test:browser` with Playwright/Chrome for interaction changes.
5. Commit scoped changes. When publication is requested, push `main`; GitHub CI publishes the tested artifact. Verify the live URL and record the deployed revision in the changelog.

Roles are proposed responsibilities, not claims that agents have been assigned or tasks started. The next practical action is the transfer/Day 3/operator-confirmation work above; flight details are intentionally outside the public plan.
