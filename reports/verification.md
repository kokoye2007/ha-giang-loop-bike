# Implementation and verification

## Group-tour update

- No fixed traveller count. Mixed Easy Rider, self-rider, friend-passenger and Jeep quantities drive USD tour totals. Return bus inclusion is selectable.
- Local AUD allowances scale by group size, room occupancy and airport vehicle capacity. No USD/AUD addition or fabricated exchange rate.
- Listed booking prices checked in Valor's public HTML configuration on 5 October 2026: USD 250/210/160/530 respectively. Extras: Hanoi bus USD18 each direction, private-room option USD30, private-tour option USD50; upgrade charging basis still requires confirmation.
- Route gallery shows eight licensed area photographs. Member portraits await uploads and publication consent. Joke ideas are explicitly unassigned.

## Checks

Data validation and static build pass. Browser checks cover root index, four daily tabs, checkpoint filters, map popups, saved checklist, day deep links, photograph decoding and overflow at 390/768px. Mixed group case: 3 Easy Riders + 2 self-riders = USD1170; with return buses = USD1350. Both values are asserted.

## Deployment ownership

GitHub Actions validates/builds, uploads the artifact and invokes pinned Wrangler for production main pushes. Cloudflare Pages project `vn-bike` exists. Local OAuth is not reused by CI. Both deployment secrets are configured and GitHub workflow scope is authorised. Run 37224364893 deployed successfully; production responds at https://vn-bike.pages.dev/.

## Styled map

Leaflet interactions use an OpenFreeMap Positron vector basemap rendered by pinned MapLibre and its official Leaflet adapter. No default OSM raster layer or default zoom widget. Custom controls, route framing, numbered markers and popup styling are in place. Provider/data attribution is preserved. WebGL/network limitations display an explicit fallback note with usable place pins and Google Maps links.

## Open content inputs

Confirm November/year, member names/photos/quotes, licence and insurance eligibility, final operator quote and upgrade charging basis. For groups above six, request operator capacity confirmation. No passports, booking credentials or private contact details belong in the public repository.
