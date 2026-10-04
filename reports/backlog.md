# Backlog status — 5 October 2026

## Colour themes

Implemented: Forest & cream, Sunrise & clay and Night ride using shared CSS tokens. Browser checks verify selection and persistence after reload. Reduced-motion behaviour is retained. Final palette selection remains open for user feedback.

## Daily, location-based weather

Implemented: Open-Meteo daily destination-area forecasts, Vietnam local dates/time, min/max temperature, rain probability, fetch time and CC BY attribution. Dates outside the 16-day window say "Forecast not available yet"; passed dates and network failures have separate states. Seasonal context remains separate. Unit tests cover horizon boundaries, date alignment, incomplete responses and API errors. API is free for this non-commercial personal guide; revisit terms if its purpose changes.

## Tour members

Implemented infrastructure: editable member records, responsive cards, escaped quotes, publication-consent filtering and a member template. Browser tests verify unpublished profiles remain hidden. Awaiting real display names, ride choices, approved portraits and quotes. Store portraits in `assets/members/`. No private identifiers, booking documents or contact details.

## Checkpoint photographs

The four daily hero photos are distinct. Vuong Palace now has a licensed exact palace photograph instead of Tham Ma Pass. Nam Dam, Lung Tam and Lung Ho still use explicitly labelled regional views; Du Gia uses a valley view, not a waterfall photograph. Exact licensed replacement photographs for these stops remain pending. Do not substitute unrelated areas or reuse operator photographs without permission.

## Cloudflare deployment

Both GitHub Actions secrets are configured. The first authenticated CI/CD deployment succeeded (run 37224364893), and https://vn-bike.pages.dev returns HTTP200. New main pushes validate/build and publish through Wrangler; no local OAuth token is used by CI.
