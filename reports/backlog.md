# Backlog status — 5 October 2026

Current planning authority: [ROADMAP.md](../ROADMAP.md). See [RECAP.md](../RECAP.md) for context and [CHANGELOG.md](../CHANGELOG.md) for release history.

## Colour themes

Implemented: Forest & cream, Sunrise & clay and Night ride using shared CSS tokens. Browser checks verify selection and persistence after reload. Reduced-motion behaviour is retained. Final palette selection remains open for user feedback.

## Daily, location-based weather

Implemented: Open-Meteo destination-area weather, Vietnam local dates/time, temperature, wind, daily outlook, rain probability, fetch time and CC BY attribution. Dates outside the 16-day forecast window now show labelled today's-area weather instead of empty forecast cards. In-window dates use the trip-date forecast. Seasonal context remains separate. Unit tests cover selection, horizon boundaries, date alignment, incomplete responses and API errors. Browser tests cover populated cards and retry states. API is free for this non-commercial personal guide; revisit terms if its purpose changes.

## Tour members

Implemented infrastructure: editable member records, responsive cards, escaped quotes, publication-consent filtering and a member template. Browser tests verify unpublished profiles remain hidden. Two approved profiles are now published: Zawye Lwin with a chosen avatar (ride choice pending), and Ko Ko Ye with supplied photo and Easy Rider choice. Additional profiles and final group membership remain pending. Store portraits in `assets/members/`. No private identifiers, booking documents or contact details.

## Checkpoint photographs

The four daily hero photos are distinct. Vuong Palace now has a licensed exact palace photograph instead of Tham Ma Pass. Nam Dam, Lung Tam and Lung Ho still use explicitly labelled regional views; Du Gia uses a valley view, not a waterfall photograph. Exact licensed replacement photographs for these stops remain pending. Do not substitute unrelated areas or reuse operator photographs without permission.

## Cloudflare deployment

Active production is https://ha-giang-loop-bike.pages.dev/. GitHub Actions run `37283116508` successfully deployed revision `161a52f`, including audit fixes and 7 November arrival / 14 November departure wording. The old `vn-bike.pages.dev` address is a legacy snapshot. Main pushes validate/build and publish through Wrangler; CI does not use local OAuth credentials.
