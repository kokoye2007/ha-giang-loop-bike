# Theme switch refinement

Replaced the native Roadbook theme dropdown with three compact labelled buttons: Forest, Sunrise and Night. Each has a colour swatch, a visible active state and `aria-pressed`; native buttons support keyboard activation. Preference storage remains unchanged. The frontend-design skill informed the restrained roadbook-style segmented control, preserving the existing typography and palettes.

Mobile buttons have 44px tap targets. The appearance row sits below navigation with extra hero spacing; redundant weather/crew shortcuts are hidden on small screens while those sections remain accessible further down the page. Browser checks cover exclusive selection, persistence after reload and no overflow/hero overlap at 320, 390 and 768px.
