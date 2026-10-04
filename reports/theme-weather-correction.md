# Theme placement and useful weather

## Theme control

Moved the switch out of the absolute-positioned hero/header overlay into a normal-flow toolbar immediately after the hero. Buttons are 30px desktop / 32px mobile, and theme-aware rather than translucent over the photo. Browser tests check toolbar bounds against the hero and navigation at 320/390/768px. The frontend-design skill informed this quieter editorial placement; typography and palette options remain unchanged.

## Weather behaviour

For each route-day area, request its trip-date forecast when inside the API horizon; otherwise request today's current temperature/conditions/wind and daily min/max/rain probability. Label these as today's area weather with the actual weather date; the trip date remains in the card heading. Never imply that today's readings predict November. Identical area/date requests are shared during a refresh. API failure has a retry state rather than fabricated values.

## Tests

Unit tests cover horizon selection, unchanged itinerary dates, current-condition extraction and error handling. Browser fixtures cover all eight populated cards, shared requests, correct forecast/current labels and retry after API failure. Test screenshot temperatures are fixtures, not recorded real-world readings. Production verification checks real API responses after CI/CD publication.
