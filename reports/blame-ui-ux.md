# UI/UX Agent — Accountability Review

## Scope and verdict

Reviewer: Hubble (UI/UX agent), with main-agent evidence review. Source and existing previews were inspected; no new browser session was run for this audit. The desktop direction is cohesive, but motorcycle usability and accessibility need further verification.

## Findings

### U1 · P1 · Controls may sit below short viewports

Evidence: `styles.css` combines a minimum 360px mobile stage row, heading/copy and 100px vertical padding in a sticky panel. Controls sit at the stage bottom.

Action: use a compact normal-flow workshop on short screens or calculate the stage from remaining viewport height.

Acceptance: at 320×568, 390×667 and landscape sizes, users can reach every control without the sticky sequence hiding it. This is a source-derived risk, not a reproduced browser failure.

### U2 · P1 · Night-theme map heading lacks contrast

Evidence: `.roadbook-map-label` has a pale fixed background but no explicit heading foreground. Night theme inherits pale text.

Action: set a dark map-label foreground or theme foreground/background together; inspect Night mode.

### U3 · P2 · Zoom and rotation have no reset

Evidence: `scripts/motorcycle.mjs` permits scroll scale 1.8 multiplied by manual zoom 1.8, reaching 3.24. Manual rotation accumulates without a reset. Existing motorcycle preview already crops the model at close range.

Action: add Reset view, fit bounds to viewport aspect ratio, and indicate zoom limits.

Acceptance: users can recover the full motorcycle after repeated button presses.

### U4 · P2 · Loading looks like failure

Evidence: the fallback says “3D preview unavailable” while the approximately 3MB model is still loading. Failure leaves the long scroll section and motion hint intact.

Action: separate loading/ready/error states; provide a poster and shorter failed-state layout.

### U5 · P2 · Budget and map accessibility gaps

Evidence: ride inputs all use “Travellers” as their label; calculator clamping can disagree with displayed input values. Find on map scrolls without transferring keyboard focus.

Action: identify each ride in accessible labels, validate displayed values, and move focus to the selected marker/popup with a return path.

## Corrected finding and verification gaps

The agent's original claim of a missing weather breakpoint was incorrect: `styles.css` already switches to two columns below 700px. Narrow-screen readability still needs inspection; add a one-column layout only if warranted.

Existing browser checks cover scroll values and overflow but do not verify motorcycle buttons, reduced motion, short-height screens or map focus. Add those checks before declaring these interactions complete.

## Handoff

Prioritise short-screen controls and Night-map contrast, then reset/loading states and keyboard navigation. No UI changes were made by this report.
