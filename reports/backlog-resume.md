# Backlog implementation

Historical implementation snapshot. Current status is in [ROADMAP.md](../ROADMAP.md), [RECAP.md](../RECAP.md) and [CHANGELOG.md](../CHANGELOG.md).

## Design contract

Editorial roadbook with a mountain-photograph anchor, expressive serif headlines and restrained sans-serif body. Existing layout/spacing remain stable across three token-based themes; no new animation. DFII: impact4 + fit5 + feasibility5 + performance4 − consistency risk3 = 15. The frontend-design skill informed palette cohesion and readable controls, not a framework migration.

## Verification

- Static data validation now checks eight weather dates/coordinate pairs and distinct daily hero photographs.
- Weather unit tests cover Vietnam date rollover, the exact forecast horizon, avoiding out-of-range API calls, exact-date response extraction, missing data and HTTP failure.
- Browser smoke checks exercise themes/reload persistence, eight weather cards, mixed-group totals, map rendering/controls, checkpoint filters, image decoding, saved checklist, deep links, mobile overflow, consent filtering and escaped member quotes.
- The initial deployment used `vn-bike.pages.dev`. The active renamed deployment is `ha-giang-loop-bike.pages.dev`; revision `161a52f` was verified after GitHub Actions run `37283116508`.

## Remaining inputs

Additional approved crew profiles and ride choices, exact licensed images for the remaining regional-photo checkpoints, and operator quote/transfer confirmations. Two crew profiles are published; the current public plan specifies 7 November arrival, 8–11 November loop and 14 November departure in 2026, without flight details. Forecasts for November appear only as those dates enter the API horizon.
