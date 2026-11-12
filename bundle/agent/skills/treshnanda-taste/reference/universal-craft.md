# Reference: Universal craft (copy, type selection, color construction, responsive, perceived speed, rule-breaking)

Surface-agnostic craft that the per-surface files assume. Read when writing UI copy, picking a typeface, building a palette from scratch, making a layout responsive, or when a build is "correct but doesn't feel fast/premium."

## Interface copy is a design material
Copy carries as much of the feel as the canvas does. The house voice: plain, confident, warm, specific.
- **Buttons say what they do, in a verb phrase:** "Save changes", "Delete 3 items", "Send $40 to Maya" — never "Submit", "OK", "Yes/No". A confirm dialog's buttons should be readable *without* the question ("Delete draft" / "Keep editing", not "Are you sure? Yes / Cancel").
- **Errors = what happened + why + what to do**, in human words, in that order. "That code expired. Codes last 10 minutes — request a new one." Never error codes alone, never blame ("Invalid input"), never dead ends (every error offers the next action).
- **Empty states teach and invite** — one line of what this space will hold, one action to fill it, in the product's voice. An empty state is the first screen most new users meet; design it like a hero, not an apology. No sad-illustration clichés.
- **Loading is honest:** name the work ("Analyzing 214 files…"), show real progress when it exists, never fake precision. If it's fast, say nothing; a flash of "Loading…" for 200ms is worse than silence (delay indicators ~300ms).
- **Front-load every string** — users scan the first two words. "Delete this board" beats "Would you like to delete this board". Labels lead with the noun that differs: "Export as PNG / Export as SVG", not "PNG export / …".
- **Numbers in copy behave like numerals in UI:** specific, coherent, comparator phrasing ("2 of 6 tasks", "+16% vs last week"). Round display values honestly (don't render 33.33333%).
- Sentence case, no exclamation marks doing enthusiasm's job, no "Oops!". Confidence is quiet.

## Choosing the typeface (how to actually pick, not default)
Before committing a grotesque, inspect it at UI sizes:
- **Numerals first** — this taste makes numerals heroes. Check: does it ship tabular figures? Do the digits have character at 40px+ without falling apart at 12px? How do `1 7 4` and the currency glyphs look?
- **The tells:** lowercase `g` and `a` (personality lives there), `t`/`f` terminals, apertures of `c e s` (open apertures = legible small), x-height (taller = better for dense UI), and whether `Il1` are distinguishable.
- **Metrics over vibes for UI:** slightly loose spacing at small sizes, tight at display sizes — a family with optical sizes or a variable axis does this for you.
- **The serif moment** (when the surface earns one) is a high-contrast editorial cut — Didone/transitional class — used at large sizes only; high-contrast serifs shatter below ~20px.
- **One family can be the whole product.** A second family must have a *job* (the editorial serif moment) — never a second grotesque that's 90% the same (same-or-different applies to fonts too).
- Ship a metric-matched fallback stack so the pre-load render doesn't shift layout (see perceived speed).

## Building the color system from one accent
Given only a brand accent, derive everything — never grab defaults:
- **Tokens, not hexes, everywhere:** `canvas`, `surface`, `surface-raised`, `ink`, `muted`, `hairline`, `accent`, plus semantic `positive/negative/warning`. Components reference tokens; modes swap token values. This is what makes "dark mode is a re-decision" cheap.
- **Derive neutrals from the accent's temperature:** canvas = a near-neutral tinted a few degrees toward (or deliberately complementary to) the accent hue; `ink` = the canvas hue darkened to ~90% contrast, never `#000`; `muted` = ink at reduced contrast, same hue; `hairline` = ink at ~8–12% opacity.
- **Tint math for chips/fills:** accent over canvas at ~10–15% opacity for tinted chips, full accent only on the semantic moment. Build a lightness ladder in a perceptual space (OKLCH — equal lightness steps *look* equal; HSL lies).
- **Dark mode rotation:** keep the accent's hue but drop its chroma slightly and raise its lightness (saturated accents vibrate on near-black); large surfaces get *less* contrast between steps than light mode, text slightly desaturated white (`#EDEDED`-class), never pure white body text.
- **Test the system, not the swatch:** the accent must survive as text on canvas (4.5:1), as a fill under white text, and as a 10% tint — if it can't do all three, adjust the accent, not the rules.

## Responsive doctrine (content-driven, not device-driven)
- **Breakpoints happen where the content breaks,** not at device widths. Resize until a line-length exceeds ~75ch, a row wraps awkwardly, or whitespace goes slack — that's the breakpoint.
- **Collapse order is a design decision, made in advance:** multi-pane shells shed the detail pane first (becomes a push-in view), then the list narrows; sidebars become a rail, then a sheet; bento grids stack by *importance*, not source order; tables become key-value cards keyed by the leading cell. Decide what the phone user loses — never just squash.
- **Hover is an enhancement, never a requirement:** every hover-revealed control needs a touch path (visible on focus, in the kebab, or always-shown on touch). Test with a pointer that can't hover.
- **Type and spacing scale down less than you think:** mobile body stays ≥16px (also prevents iOS zoom-on-focus); it's columns, gutters, and hero scale that shrink. Hit targets never shrink at all.
- Prefer intrinsic layout (grid `minmax`, flex wrap, container queries) over breakpoint forests — a component that adapts to its *container* survives being moved.

## Perceived speed is a design property (premium = fast)
The feel of quality is half timing. A beautiful UI that jumps, flashes, or lies about progress reads cheap.
- **Zero layout shift, ever:** reserve space for images (aspect-ratio), embeds, and async content; a skeleton must match the final layout *exactly* — skeleton-then-jump is worse than a blank. CLS is broken trust, not a metric.
- **Optimistic UI for owned actions:** toggle, rename, reorder, favorite — reflect instantly, reconcile in the background, undo on failure (pairs with forgiveness). Only genuinely uncertain work (payments, sends) waits visibly.
- **Latency ladder:** <100ms → no indicator; 100–300ms → subtle inline feedback (button spinner in place, not a modal); >300ms → skeleton or named progress; >2s → progress + the ability to leave and be notified. Never a full-screen spinner for a partial update.
- **Font loading:** metric-matched fallback (`size-adjust`/`ascent-override`) so text renders instantly in the fallback and swaps without reflow. Flash-of-invisible-text on a marketing hero is an amateur tell.
- **Animate the wait away honestly:** stagger content in as it arrives (real data, not placeholders pretending), draw charts on load — arrival choreography makes the same latency feel intentional.

## Breaking the rules (the meta-rule)
Every rule in this skill encodes a default, and defaults are what the taste *returns to*, not what it's imprisoned by. The mature move: **break exactly one rule, loudly, on purpose — while obeying all the others with extra discipline.** A full-serif UI, a pure-white canvas, a five-color surface, a slow luxurious transition — any of these can be the "one distinctive move" *if* it's the declared commitment and everything around it tightens to pay for it. What's never allowed is breaking rules *accidentally* or breaking three at once: one loud exception reads as intent; several read as not knowing the rules. If you break one, say so in the Design Read — "the move here is X, which trades against rule Y deliberately."
