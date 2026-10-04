# Backlog implementation

## Design contract

Editorial roadbook with a mountain-photograph anchor, expressive serif headlines and restrained sans-serif body. Existing layout/spacing remain stable across three token-based themes; no new animation. DFII: impact4 + fit5 + feasibility5 + performance4 − consistency risk3 = 15. The frontend-design skill informed palette cohesion and readable controls, not a framework migration.

## Verification

- Static data validation now checks eight weather dates/coordinate pairs and distinct daily hero photographs.
- Weather unit tests cover Vietnam date rollover, the exact forecast horizon, avoiding out-of-range API calls, exact-date response extraction, missing data and HTTP failure.
- Browser smoke checks exercise themes/reload persistence, eight weather cards, mixed-group totals, map rendering/controls, checkpoint filters, image decoding, saved checklist, deep links, mobile overflow, consent filtering and escaped member quotes.
- The first successful GitHub → Wrangler deployment serves production at `vn-bike.pages.dev`; resumed changes publish on the next verified main push.

## Remaining inputs

Actual member portraits/names/quotes and publication approval. Exact licensed images for the remaining regional-photo checkpoints. Date/year and operator booking assumptions remain provisional. Forecasts for November appear only as those dates enter the API horizon.
