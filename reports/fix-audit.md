# Audit Fixes — 5 October 2026

## Content

- C1: replaced two-person example quantities and duplicate AUD bus pricing with canonical JSON scaling rules and one shared calculator. USD tour/buses remain separate from AUD allowances. Added attraction-ticket unknowns and an explicit AUD40/person contingency allowance.
- C2: all eight itinerary details now appear in the week overview.
- C3: checkpoint popups show inclusion status; optional/confirmation markers have distinct styling. The schematic core line excludes both categories. Tham Ma is confirmation-needed because a specific stop was not established by the selected operator page.
- C4/C5: corrected crew and current research/model summaries, derived date/distance/research labels from data, and fixed section numbering. Original accountability reports remain historical findings, superseded for implementation status by this report.

## UI/UX

Direction: editorial mountain roadbook. Retained Palatino-style display, Avenir/Trebuchet body, forest/paper/rust tokens and the motorcycle inspection view. Feasibility score: 12 (impact 4, context 5, implementation 5, performance 3, maintenance risk 5).

- U1: narrow and short screens use a normal-flow workshop instead of an overflowing sticky panel.
- U2: map-label foreground is explicitly dark across themes.
- U3: Reset view restores scale/rotation; combined zoom is bounded, turn values wrap, and camera fitting accounts for aspect ratio.
- U4: loading and failure text are distinct; failure collapses the extended scroll layout. A dedicated static motorcycle poster remains a possible enhancement, not implemented.
- U5: ride inputs have descriptive labels and visible normalised values. Find on map focuses the popup and supplies Back to checkpoint.
- Weather uses one column below 420px; the existing two-column breakpoint is retained elsewhere.

## Research and planning

- Rechecked the selected operator's live route page and price configuration.
- Added claim-level evidence, review dates and confidence. Stop durations/coordinates are explicitly editorial estimates, not operator timings.
- Added arrival/return dependencies and accommodation contingencies; Hanoi room-night count is editable.
- Day 3 shows a proposed 527-minute core plan versus a 510-minute target window; the optional boat adds 120 minutes. This flags infeasibility, not a confirmed revised schedule.
- Added independent official document/insurance guidance with licence-issuer scope. Operator approval is not treated as legal eligibility.
- Known crew ride choices seed the calculator; unknown choices remain uncounted. Passenger/rider mismatch is warned.

## Verification

Passed: canonical data/source validation, weather and budget tests, JavaScript syntax checks, static build and browser smoke checks. Browser checks exercised rotation/reset, reduced motion, short screens (320×568, 390×667, 667×390), budget scenarios, map focus/return, all day/filter tabs, images, themes and overflow. Desktop motorcycle, Night budget and mobile checkpoint screenshots were inspected.

## Still requires real confirmation

Flight details are intentionally omitted; the public plan uses 7 November Hanoi arrival and 14 November Hanoi departure. Pickup windows, final group membership, Zawye Lwin's ride choice, final operator quote, charging units, late hotel check-in, guide-approved daylight schedule and actual insurance cover remain unconfirmed. No booking or individual eligibility is implied. The subsequent date-wording update is being published through the repository’s GitHub Actions Cloudflare Pages workflow.

## Sources

- [Valor selected package and live booking configuration](https://valorhagiangloop.com/tours/ha-giang-loop-tour-4-days/)
- [Smartraveller independent travel/document advice](https://www.smartraveller.gov.au/destinations/asia/vietnam)
