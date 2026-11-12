# Reference: Mobile app (13 designs)

Mobile is **bone canvas + black as the second brand color + one accent maximum**, presented as polished (often hand-held) phone mockups. Airy hero third, dense utility bottom, tactile warmth instead of emoji, and imagery supplying the saturation.

## Canvas & color
- Light canvas: warm bone/greige (`~#EDEAE4`, `~#EFEDEA`) — 8/13. Never pure white; white cards float above it. Dark: confident near-black (`~#0A0A0A`) — a deliberate second register, not the default.
- **Black is the real constant (11/13):** black pill CTAs, black hero cards, black docks, black chart surfaces. The palette is built around black + bone before any hue arrives.
- **One accent, and lime only ever with black.** Acid chartreuse (`~#C6E600`–`#E8F94A`) appears 3/13 — loudest recurring accent, always against black or bone, in small doses (one card, one keypad key, a marker-highlight over a word). Other per-app accents: red-orange (`~#E5483C`), burnt orange, pastels (banana, aqua, periwinkle). Red isolated for destructive. **Purple gradient fintech card: 1/13 and it's the outlier cliché — never take it.**
- **Imagery as palette (6/13):** book covers, travel photography, food on black plates, 3D art — the UI goes monochrome around it.

## Typography
- Sans UI throughout, all 13. **Serif is reserved for a single editorial display moment** — one all-caps Didone word ("PARIS", "BOOKS") with a tiny sans eyebrow above, or one book-serif title. Never serif body, never serif numerals, never mixed within a line.
- **Numerals get typographic play:** superscript currency, gray de-emphasized cents/decimals, space- or comma-grouped thousands, color-coded signed amounts, a hand-scribbled circle annotation around the hero figure. Slop prints "$12,345.67" in one weight/one color.
- Mixed weights within one line ("Welcome, **John**!"); a conversational sentence-as-headline with inline tokens (an avatar, a bolded phrase) is a house voice.

## Surfaces, shape & depth
- Two-tier radius everywhere: **full pill for controls, ~16–24px for cards**, 13/13, no sharp corners. Soft diffuse shadows float white cards off bone; black surfaces sit flat.
- **Stacked-card decks with real depth** (ghost cards peeking behind a hero card, drag handles, spring physics implied) — not fixed-offset gray rectangles.
- Bottom sheets sliding over a hero with rounded top corners; carousels bleeding off the screen edge ("more on swipe").
- **Tactile warmth, not emoji:** debossed tone-on-tone logotype across a card face, stitched borders, torn-paper dividers, marker-highlight behind inline words, scribble annotations, skeuomorphic shelves. (Refs use emoji ~twice, once as a deliberate inline token — treat it as banned by default.)

## Layout & IA
- **Rhythm: airy hero third → denser utility bottom.** Greeting/serif title/big numeral with generous whitespace up top; transactions, lists, grids compressing below. Never uniform card soup, never one-card emptiness (that's a single outlier register).
- **Nav = floating detached black pill dock** (4/13, the signature): 3–4 unlabeled icons, real shadow, active = white/lime dot or circle; sometimes paired with a separate circular FAB. Conventional labeled tab bar appears (3/13) but the dock is the house move. Full-width 5-icon gray tab bars are the slop twin.
- Selection can be a full-row translucent color wash; segmented text tabs and chips-not-tabs both recur; grouped iOS-style settings cards on dark.
- **Mockup framing is part of the taste:** hand-held photographed devices (hard light, real hands) or flat bezels with a 9:41 status bar, on flat muted studio backdrops (gray/greige/taupe) — never phones floating on purple mesh glow.

## Platform craft (mobile-only HIG / Material rules — the floor under the taste)
When this file is active, `mobile-ios-design` / `mobile-android-design` (and `swiftui-pro` for SwiftUI code) should already be loaded per SKILL.md; these are the rules that interact with the taste:
- **Safe areas are law:** content and the floating dock respect notch, home indicator, and gesture zones; the detached-pill dock floats *above* the home indicator, never under it.
- **Thumb-zone placement:** primary actions live in the bottom third (the black pill CTA and dock already obey this); top corners get only low-frequency actions (back, settings).
- **Dynamic Type / font scaling:** layouts must survive the user's text size — hero numerals may cap, but body/labels scale; test one notch up before calling it done.
- **Native gesture grammar is inherited, never blocked:** edge-back-swipe, sheet pull-to-dismiss with rubber-banding, pull-to-refresh; custom gestures may add, never replace.
- **Sheets use platform detents** (medium/large, drag handle visible) — the house bottom-sheet-over-hero pattern rides on system sheet physics, not a reimplementation.
- **Haptics pair with motion** at meaningful moments (snap into a detent, success, destructive confirm) — light and rare, following the same frequency-scaling law as motion.
- **Per-platform re-expression:** on iOS follow HIG (SF Symbols weight-matched to text, navigation stacks, context menus); on Android follow Material 3 (predictive back, dynamic color awareness, FAB conventions) — the taste (bone canvas, black pills, one accent, serif moment) is re-expressed inside each grammar, not pasted over it.

## Motion (mobile = springs + sheets + carousels)
- Sheet/drawer spring-overs; stacked-card swipe/drag physics with rubber-banding; edge-clipped carousel momentum; animated active-dock indicator; count-up hero numerals; a living particle/point-cloud object as an assistant's idle face. Honor reduced-motion.

## Premium vs slop
- DO: bone + black + one accent; black pill dock; serif display word; numeral play; stacked-card physicality; deboss/stitch/scribble/highlight warmth; light/dark parity as twins; imagery-led monochrome UI.
- NEVER: purple/indigo gradient fintech card + Memoji row (the outlier, not the pattern) · lime on pure white or lime gradients (lime lives with black) · emoji as warmth in headlines/labels · full-width 5-icon gray tab bar · uniform card soup with equal 16px gaps · gradient scrims + colored borders stacked on stock photos (double-loud) · fake vanity data (design real balances, real names, real zero states).
