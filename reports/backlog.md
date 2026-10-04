# Future tasks

## Colour themes

Add selectable themes using CSS design tokens: current forest/cream, a brighter travel palette, and a dark roadbook. Persist preference locally, respect reduced motion, and verify text/control contrast and mobile layouts. Final palette is a user choice.

## Daily, location-based weather

Research a suitable forecast API and its licence/usage policy before integration. Match each day's stop coordinates to forecast data; display local Vietnam time, temperature, rain probability, update time and provider attribution. Handle unavailable networks and expired results. Dates outside the supported forecast horizon must say "Forecast not available yet" and may show separately labelled seasonal context. Do not invent day-specific forecasts for November.

## Tour members

Collect display name, ride preference, approved portrait and approved joke quote. Keep member records in editable JSON and portraits in `assets/members/`. Only `publishConsent: true` entries render publicly. Build a responsive team section with optional roles and private coordination handled outside this public repository. Do not add passport details, phone numbers, accommodation allocations or emergency contacts.

## Current deployment dependency

GitHub Actions workflow is installed and build checks passed. Production publishing needs the repository secret `CLOUDFLARE_API_TOKEN` (Account → Cloudflare Pages → Edit scoped to the selected account). The account ID secret is configured. After adding the token, rerun the failed workflow or manually dispatch it.
