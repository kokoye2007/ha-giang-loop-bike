# Compact crew cards

## Design

The frontend-design skill informed an editorial portrait-and-quote layout: circular avatar, compact identity block and framed speech bubble. Existing display/body fonts and theme tokens remain unchanged. No new animation; DFII14 (impact4 + fit5 + feasibility5 + performance4 − consistency risk4).

## Image handling

Original uploaded files are preserved. CSS caps avatars at 96×96px on desktop and 76×76px on small screens, with a circular `object-fit: cover` crop. Explicit dimensions reserve layout space. Profiles without a photo get an initials placeholder.

## Quote and verification

Suggested jokes retain their label inside a separate bubble, with theme-aware background, border and decorative pointer. Names and quotes remain escaped. Browser checks cover image decoding, avatar dimensions, screenshots, no overflow at 320/390/768px, consent filtering and safe quote rendering.
