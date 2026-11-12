# Reference: Elements (components & micro-interactions — 27 images, ~25 designs)

Components are **dual-mode, concentric, grained, and semantic** — designed as light/dark twins where every material is re-decided, built with visible radius math, textured gradients confined to cover zones, color that only ever means something, and states drawn as first-class deliverables.

## Dual-mode discipline (~70% light / 30% dark)
- Dark variants are **re-designs, not inversions**: the primary pill inverts black↔white; a saturated blue action demotes to gray glass; shadows become hairline borders; a photo fades into the footer's darkness. Shipping the same component as a matched pair is the deliverable.
- Evaluate every component by how it survives both modes.

## Geometry — concentric or wrong
- Radius bands: chips/badges/buttons = full pill; inner rows/fields ~8–12px; cards ~16–24px; hero widgets ~28–40px superellipse. **Inner radius = outer radius − padding, visibly** (12+ designs show the math).
- The signature construction: a **thick white (or black) bezel shell wrapping an inner media card** — the widget as a little device. Also: tray insets sharing the widget's geometry, a folder-tab notch breaking the rectangle, the Dynamic-Island collapsed-pill ↔ expanded-superellipse state pair.

## Depth, texture & glass
- Light mode: ONE large soft ambient shadow (≈ y 20 / blur 60 / 6–10% opacity) or none + hairline. Dark mode: borders and glow, never shadows. **Hairline dividers replace gaps** (stat rows, toolbar strips fused to a widget's bottom edge).
- **Grain on every gradient** (10/25): film grain on aurora/thermal covers, paper hatching on folder/calendar cards, canvas-weave over album art, star specks. Texture is the anti-slop marker; smooth 2-stop gradients read generated.
- **Glass only over imagery** (4–5 uses, all earned): a frosted "Directions" pill on a photo, a "$620" price chip beside a solid CTA (info = glass, action = solid), a translucent panel over a blurred scene. Glass over flat color = fake glass, out.
- **Gradient placement rule:** (a) cover-art zone inside a card, (b) light-leak glow bleeding from under a sheet/composer edge, (c) ONE materialized data element (the hero bar, grained + gloss + a physical white dot marker, among flat translucent ghost bars). Never button fills, never behind body text, never edge-to-edge.
- Skeuomorphic material metaphors are in-taste: manila folders with real tab silhouettes, device bezels, boarding-pass trays, an illustrated plane drifting through clouds occupying 2/3 of a status card.

## Color — semantic or absent
- ~8/25 components are **fully grayscale + imagery**. The hue budget: red = recording/today/alert dot; green = positive delta / time-remaining; blue = the one primary/money/OS action or completion checks; violet + sparkle = the AI affordance; brand orange only via a logo. Folder fills = category coding.
- **Checks are gray by default** (a checklist with gray outline circles, not green); difficulty "Hard" is plain bold text, not red. Restraint where slop reflexively colors.

## Typography & numerals
- Sentence case for all labels and headings; LETTERSPACED MICRO-CAPS only for section labels and dates ("19 JULY MON", "ACTIONS"). One serif experiment exists as a warmth lever; the default is grotesque monoculture.
- **Numerals are the display type:** giant IATA codes ("SUB → SIN"), huge clock faces with shrunk "AM", "$125,824.36" comma-grouped with real decimals, "$990 **/ Year**", tabular "00:03" timers, signed deltas. Stat grammar: **bold value / micro gray label beneath / hairline vertical dividers between**. "Label | value" pills carry an internal hairline divider.
- Inline-bold data prose ("You have **2 meetings** and **4 tasks** to complete today") and a playful plain-text voice ("carpe diem :)") — text emoticons over emoji.
- **Dotted leader lines** connect label to value ("Next payment ……… Jan 15") — a receipt/ledger idiom that recurs.

## Component vocabulary (what the library actually contains)
Prompt composers (chip tokens, model picker, circular send) · billing/plan cards (grained aurora = the ONE current-plan identity; gradient *border* = selected) · pricing/plan choosers (saturated color reserved for the paid action) · photo-led listing/booking cards (long eased scrims ~40% height, text in the darkest zone, glass price chips) · travel widgets (flight tickets, hike stats with a self-drawing route squiggle, map cards) · calendars with event trays (mixed-material: light calendar + dark tray in one widget) · Dynamic-Island recording pairs · crypto/stat widgets with sparkline + fused icon toolbar · filter dropdowns (search field, sectioned rows, count badges, a drawn macOS cursor proving hover) · command palettes · onboarding storyboard trios (two-material cards: grained pastel mini-UI top, black text slab bottom) · success dialogs (painterly art header, multiplayer cursor chips, blue-check summary inset) · feature cards whose hero image is a *loading state* ("Generating reply…" shimmer).

## States are deliverables
9/25 designs depict a non-default state: hover (with the cursor drawn in), generating/loading shimmer, recording, collapsed↔expanded, selected datum, active filter, carousel position, completed checklist. **Design the state pair first; the motion is the path between** — island morph, route line drawing itself, plane traveling a dotted line, marker-highlight sweeping with audio, ghost bars rising staggered, counts ticking, glow breathing.

## Premium vs slop
- DO: matched light/dark twins; concentric bezel construction; grain on every gradient; earned glass; gray checks; semantic-only hue; numerals as heroes; dotted leaders; hairline stat rows; states drawn explicitly; one materialized element per component.
- NEVER: smooth purple→blue 2-stop gradients or gradient buttons · glass on flat color · shadow-md stacks / shadows in dark mode · same 8px radius on parent and child · all-same-weight stat text or lorem numbers ($1,234) · decorative rainbow icon tints · green checks by reflex · Title Case / ALL-CAPS buttons / emoji spam · uniform 50% black photo overlays · default-state-only mockups · invert-filter dark mode keeping blue buttons and black shadows.
- Honest flags from the refs themselves (don't inherit): design-system placeholder artifacts left in shipping shots, genAI photo/render artifacts (warped livery text), copy that mismatches the surface (a Reading test described as Writing), unit mismatches (sqft on an alpine chalet), GPT-flavored naming sets (Explorer/Navigator/Pioneer/Voyager). The layout/material system is human-deliberate; the data/copy laziness is the part to guard against.
