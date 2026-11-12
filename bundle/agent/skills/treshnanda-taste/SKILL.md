---
name: treshnanda-taste
description: Treshnanda's personal UI/UX taste profile — their working process, quality bar, a warm tactile premium aesthetic (bone/charcoal canvases, black-pill grammar, semantic color, editorial-serif moments, concentric widget physicality, naturalistic imagery), an anti-AI-pattern doctrine, and a bold "alive but never in the way" motion doctrine. Invoke when building or redesigning ANY app or website UI, designing animations/microinteractions, designing onboarding/signup/pricing/upgrade flows, or making layout/visual/copy decisions — and whenever Treshnanda references "their taste," "high taste," "premium," "feels good," "magic," or "make it WOW."
---

# Treshnanda's UI/UX Taste

Distilled from building quickboard (a premium macOS app) through hundreds of iterations, plus a 77-image reference library re-analyzed image by image (landing pages, desktop/web product UI, mobile apps, components). The bar is constant: **high taste, premium, feels good, and motion that makes people go "WOW."**

Two layers, always both:
1. **The taste** — what the references actually do (below + `reference/`).
2. **The anti-slop doctrine** — what a lazy model does when imitating it (its own section below). The references were studied *against* their generic imitations; every rule here has a known failure mode attached. Knowing the pattern is not enough — you must dodge its slop twin.

## Foundation — invoke these skills FIRST, every time
This is the *personal taste* layer. It sits on top of craft skills — **whenever this skill is active, automatically invoke `emil-design-eng` and `motion-design` too, without being asked.**
- **`emil-design-eng`** — craft micro-decisions: custom easing, springs, scale-on-press, blur-to-mask, concentric radii, never-scale-from-0.
- **`motion-design`** — motion theory: three layers (primary/secondary/ambient), Disney principles, choreography, timing.
- **`design-taste-frontend`** — for landing pages / marketing sites / portfolios, also run its Pre-Flight Check (§9 AI-Tells + §14 matrix). It is scoped to marketing surfaces; for product UI rely on the references here.
- **On mobile surfaces, also auto-invoke the platform craft skills:** **`mobile-ios-design`** (Human Interface Guidelines + SwiftUI patterns) and/or **`mobile-android-design`** (Material 3 + Compose) for whichever platform(s) you're building; and **`swiftui-pro`** whenever writing or reviewing SwiftUI code. Platform conventions are the floor this taste builds on, never a thing it overrides — respect the native gesture/navigation grammar and re-express the taste inside it.

Then read the `reference/` file for the surface you're building: `landing-pages.md` · `desktop-app.md` · `mobile-app.md` · `elements.md` · `ux-psychology.md` (flows) · **`universal-craft.md`** (surface-agnostic: interface copy, choosing a typeface, building a color system from one accent, responsive collapse order, perceived speed, and the rule for breaking rules — read it whenever writing UI copy, starting a palette/typeface from scratch, or when a build is "correct but doesn't feel fast/premium"). Per-surface hexes, proportions, layout archetypes, and surface-specific slop deltas live in these files, not here.

## The quality bar (grade by their words)
- Praise (on target): **"high taste," "premium," "tasteful," "feels good," "magic," "WOW," "awwards-tier," "unique," "FUCK YEAH."**
- Reject (fix it, don't defend it): **"off," "weird," "ugly," "ai slop," "not premium," "bare," "too subtle," "doesn't feel like magic," "not good enough."**
- **"Premium" is the constant target.** They will keep asking *"why doesn't this feel premium?"* until it does. Chase the *feeling*, not just correctness.
- **Magic / memorable / unique beats clean.** Polished-but-conventional reads as "not enough." If it could be any app, it isn't done.

## Intuitive by default (the first law — everything else builds on this)
**A good UI is understood on sight, without instruction.** If a first-time user needs a tutorial, a tooltip safari, or ten seconds of "wait, what does this do?", the design has failed *before* taste is even graded. Premium, magic, and WOW are worthless on top of a confusing interface.
- **Spend the novelty budget on look and feel, never on interaction grammar.** The page may look like nothing else; it must *behave* like everything else (Jakob's law — users spend most of their time in other apps). Scrolling, tapping, back, selection, dismissal all work exactly as expected; the taste lives in canvas, type, texture, and motion.
- **Controls look like what they do, and do what they look like.** Affordances are visible: buttons look pressable, draggable things look grabbable, links look distinct. No mystery-meat navigation — an unlabeled icon is allowed only when its meaning is universal (search, close, play); anything ambiguous gets a label.
- **Recognition over recall.** Choices are shown, not memorized; state is visible, not remembered (where am I, what's selected, what will this button do). The active nav pill, the status dot + word, the visible keycaps — the taste's own grammar already carries this.
- **Obvious next step, always.** Every view answers "what do I do here?" with one clearly primary action (the single black pill) — which is the same rule as "one focal element per view," seen from the usability side.
- **If it needs explaining, redesign it — don't annotate it.** Onboarding may *delight* (the story rule), but it must never be load-bearing: the product must survive a user who skips it.
- **Tesler's law: complexity is conserved — the design absorbs it, not the user.** Every flow has irreducible complexity; the only choice is who pays. Timezone math, format conversion, retry logic, remembering what they entered last time: the product does that work invisibly. Every decision, keystroke, or mental calculation you push onto the user is a design debt the interface refused to pay.
- **Postel's law for inputs: accept generously, output precisely.** Parse what a human would reasonably type — pasted phone numbers with spaces, dates in any common format, trailing whitespace, "$1,000" in a number field — and normalize it silently. Rejecting input a human considers obviously valid is the interface being pedantic at the user's expense. (Output stays strict: one format, correctly formatted, always.)
- **Test it in your head as the frustrated first-timer,** not the designer who already knows. This pairs with the empty-state and data-coherence rules: the imagined user is new, impatient, and right.

## How they work (process)
- **Design Read first (one line, before any code).** Declare what you're building and where it sits in this taste: *"Reading this as: <surface> for <audience>, <vibe>, pulling the <reference file> register — reaching for <the distinctive move>, not the generic skeleton."* That line is what stops the default-slop collapse.
- **Build directly. Relayout, don't reskin.** They distrust plan-first/reskin flows: *"im trusting your raw power."*
- **References = layout, not styling — by default.** Take the structure, not the fonts/colors — **UNLESS they explicitly say "copy this."** Then match it exactly.
- **Iterate fast off screenshots.** They paste a screenshot + "this is off / fix this / feels weird." *Feel* it and fix it; don't explain it away.
- **Give the why, verified** with current best practice. They say **"revert"** when something regresses — keep diffs reversible, never silently lose a thing they liked.
- **Delete one expected element.** The strongest references omit something the template demands (subcopy, a badge, a second CTA, an oversized button). Slop fills every slot. Before shipping, find the element the layout doesn't need and remove it.

## Visual DNA (cross-cutting; per-surface specifics in `reference/`)

**Canvas**
- Light canvas is **warm bone / cream / putty (`~#EDECE8`–`#F5F2EA`), never pure `#fff`** — a brighter near-white card floats on that tinted field, and that value shift *is* the separation system. Occasionally faintly cool (`~#F4F5F7`) or blush-tinted.
- **Dark mode is true near-black, never navy or slate.** Layered luminance steps (`~#050505` void < `#0E0E0E` content < `#141414` panel < `#1A1A1A` input), hairline `~#232323` borders. Reserve OLED `#000` for one deliberate focal object (an island, a dock), not the whole app.
- **Dark mode is a re-decision, not an inversion.** The primary pill inverts black↔white; a blue action demotes to gray glass; shadows become borders; scrims deepen. Design each component as a matched light/dark pair — shipping both modes of the same component is itself a taste signal.

**Color — black is the second brand color**
- **The primary button is a solid black pill (light mode) / solid white pill (dark mode)**, not a brand-colored one. Black cards, black docks, black chart surfaces: black works as a *color* throughout.
- **One accent per artifact, used semantically.** The house accents skew warm or acid: orange/coral (`~#F4602A`, `~#F05A50`), amber, chartreuse/lime (`~#C6F32C`–`#D9F154`, always paired with black), cobalt. Saturated color marks **state, value, or the single money action** — green only for positive deltas and time-remaining, red only for recording/alert/today, blue for the one primary/OS action, violet+sparkle only as the AI affordance. Checkmarks are **gray by default**, not green.
- A large share of great components are **fully grayscale + imagery**. When photography or brand logos are present, the UI goes monochrome and lets them be the palette.
- **Zero purple-brand chrome.** Purple/indigo as the default accent is the single loudest AI tell.

**Surfaces & depth — effectively shadowless**
- Separation comes from the canvas-vs-card value shift (light) or luminance steps + hairlines (dark), **not from per-card shadows**. When a shadow exists it is ONE large, soft, low-opacity ambient shadow (≈ y 20 / blur 60 / 6–10% opacity), reserved for genuinely floating objects: pills, popovers, menus, the command palette, a detached nav.
- **Hairline dividers do the work gaps would do** — stat rows, toolbar strips, table columns. 1px, ~8–12% contrast.
- **Frosted glass only over imagery.** A glass pill on a photo ("Directions", a "$620" price chip) refracts something real. Glass on a flat color is fake glass — out.
- **Texture gives surfaces tooth:** film grain on every gradient, paper hatching, canvas weave, star specks, deboss, stitching. Flat is fine *with* a hairline or value shift; flat-and-lifeless is not.

**Shape & geometry**
- **Pill is the control system:** pill CTAs, pill nav capsules, pill chips/badges/inputs/toggles, pill segmented tabs. Radius bands above that: inner rows/fields ~8–12px, cards ~16–24px, hero widgets ~28–40px superellipse. **No 4px "enterprise" radius, no sharp corners.**
- **Concentric radius math always:** inner radius = outer radius − padding. The signature construction is the **bezel-wrapped widget** — a thick white (or black) outer shell wrapping an inner media card, Dynamic-Island physicality. Nesting is a layout move, not just a shape one: widget-in-widget, tray-inset-in-card, chip-in-card.
- Circles for identity: avatars, FABs, icon wells, send buttons.

**Layout & composition**
- **One focal element per view — materialize exactly one thing.** One saturated hero card among quiet white siblings; one grained gradient bar in a chart of translucent ghost bars; one serif display word in a sans UI. Everything else stays quiet so the one thing lands.
- **Calm-dense rhythm:** an airy hero third (greeting, headline, the number) flowing into a denser utility bottom. Generous gutters even when packed; never wall-to-wall, never uniform card soup.
- **Card-on-canvas is the universal unit**, composed into bento grids with deliberately unequal emphasis, hairline-divided stat rows, or multi-pane shells.
- **Nav is a floating object, never an edge-welded layer:** detached shadowed pill capsule (landing), sidebar with a tinted/raised-pill or outlined active item (desktop), floating black pill dock of 3–4 unlabeled icons (mobile). **Active state is never a left stripe.**
- **No layout family twice on one page.** Vary the composition per section; the generic skeleton is the assembled sameness.

**Typography**
- One clean grotesque (Inter / Geist / SF class) is the workhorse. **Sentence case everywhere — never Title Case labels, never all-caps buttons.** Letterspaced MICRO-CAPS are reserved for tiny section labels and dates.
- **Serif is structural or absent.** An editorial high-contrast serif (Didone class) may take a *whole* headline, a *whole* line, or one all-caps display word ("PARIS", "BOOKS") over an otherwise-sans UI. **Never two typefaces inside one sentence or headline** — no serif-italic word dropped into a sans line. Emphasis within a line = weight or the single accent, same typeface.
- **Numerals are the display type.** Bold value + small gray unit ("$990 **/ Year**", "12.4km" over a micro-gray label), superscript or de-emphasized cents, comma-grouped realistic figures, signed deltas ("+1.23%"), tabular numerals in tables/timers, giant codes as heroes ("KRK → BCN"). Inline-bold data inside prose sentences ("You have **2 meetings** and **4 tasks**") is a house voice.
- **Declarative sentences with periods.** Headlines end with a full stop ("A useful Dock for live widgets."); mixed-weight prose carries data. Multi-tone headlines tint the *value-prop noun* in a real system color, or gray the lead line — never a gradient on the last two words.

**Imagery — the house signature**
- **Naturalistic imagery, treated as protagonist:** real skies, meadows, moss, mountains, water; painterly/Ghibli illustration; oil-painting collisions with UI. Full saturation, with a *designed relationship* to the layout (a fade line into the canvas, a notch parting the art toward the CTA, a symmetry axis) — never a dimmed Unsplash backdrop at 20% opacity.
- **Never fabricate UI as imagery.** No `<div>`/inline-SVG fake dashboards or fake screenshots as the hero. Use a real screenshot, a real mini-component, a placeholder photo (`picsum.photos/seed/...`), real brand SVGs, or generate the image with the environment's image tool. If no image is possible, leave a labeled placeholder slot and say so.
- Warmth comes from imagery, texture, and tactile touches (a hand-scribbled annotation, a marker-highlight behind a word, a debossed logotype) — **never from emoji.**

**Gradients — contained, grained, or absent**
- Default to **none**. A gradient may exist only as: (a) a **cover-art zone** inside a card (grained aurora, thermal, dither), (b) an **edge light-leak glow** bleeding from under a sheet or composer edge, (c) **one materialized data element** (the hero bar), (d) a tinted **word**, or (e) a **1px rule**. At most one gradient region per view.
- Always grained/textured, asymmetric warm↔cool stops, never a smooth 2-stop purple→blue. **Never a button fill, never behind body text, never an ambient page wash or radial bloom.** A tight warm ember glow on a dark hero is the one atmospheric exception.

## Apple-guideline layer (HIG principles that are universal — apply on EVERY surface)
Apple's Human Interface Guidelines encode craft that generalizes far beyond iOS. These apply to web, desktop, and mobile alike (mobile-only HIG/Material rules live in `reference/mobile-app.md`):
- **Deference: content first, chrome recedes.** The interface serves the content; controls stay quiet until relevant. This is why the references go monochrome around photography and ration color to semantics.
- **Hit targets ≥ 44×44px** for anything interactive — buttons, rows, icon wells, close affordances — on touch *and* pointer surfaces (padding counts; the visual can be smaller than the target).
- **Legibility floors:** body text ≥ ~15–17px product UI (11px absolute floor for micro-labels), contrast ≥ 4.5:1 for text (3:1 for large text) — check the muted grays and text-on-scrim against this; a scrim exists to *pass* it.
- **Immediate feedback for every action.** Every tap/click/drag visibly responds within ~100ms (press scale, highlight, caret) even if the work takes longer — then show honest progress, never a dead button.
- **Depth = hierarchy.** Layering (sheet over content, palette over dimmed app, island over everything) communicates what's above what; blur/dim the layer beneath. Never fake depth with decoration.
- **Direct manipulation & forgiveness:** let users act on the thing itself (drag it, swipe it, scrub it), keep destructive actions reversible — prefer undo over "Are you sure?" dialogs.
- **Progressive disclosure:** lead with the common case, tuck power behind a step (the dimmed not-yet-configured section, the "more" chevron) — this pairs with the smart-defaults principle in `ux-psychology.md`.
- **Consistency with the platform's grammar:** system conventions (focus rings, scroll behavior, text selection, back gestures, shortcuts) are inherited, not reinvented; spend novelty on the taste layer, not on relearning basics.
- **Optical over mathematical alignment:** center icons by visual weight, overhang punctuation, align to the type's optical edge — geometric centering that *looks* off IS off.

## Anti-AI-pattern doctrine
The failure mode is never one bad element — it's defaulting to the *statistical average* of the training set. These are the tells, each paired with what the taste does instead:

| AI tell (out) | The taste instead |
|---|---|
| Purple/indigo accent, `indigo-600` buttons, AI-purple glow | Warm/acid accent or grayscale; black/white pill primaries |
| Ambient radial gradient blob behind the hero; gradient washes in cards | Flat warm canvas + real imagery; gradients contained + grained |
| Dot-pill eyebrow badge ("● NOW IN PRIVATE BETA · V2") | A badge carrying real information (a date, a partner, a category) — or none |
| Serif-italic word dropped mid-sentence in a sans headline; novelty-font word in a tinted chip | Serif takes a whole line/headline/display-word, or stays out |
| Fabricated dashboard floating on blank cream; "Welcome back, Alex 👋" | Real/partial/cropped product surfaces with real content in the pixels, fused to imagery |
| Badge + H1 + sub + 2 CTAs + social proof + stars, every slot filled | Delete at least one expected element; small CTAs read as confidence |
| `shadow-md` on every card; shadows in dark mode | Shadowless separation by value shift; hairlines; one big soft shadow on true overlays only |
| Uniform `rounded-lg` on everything | Radius bands + concentric math; pills for controls |
| Left-stripe active nav; colored icon + 3px border | Tinted/raised full pill or outlined row |
| 3–4 identical equal KPI cards with icon-left + green +12% | Break symmetry: one saturated hero among quiet siblings; delta chips with comparator prose ("vs last period") |
| Filled `green-100/green-800` status badges; zebra tables | Colored dot + plain word; no zebra, faint header tint, tabular numerals, trailing kebab |
| Title Case Everywhere; ALL-CAPS buttons; emoji as warmth | Sentence case; micro-caps for section labels only; tactile warmth (grain, scribble, deboss) |
| Glassmorphism over flat dark backgrounds | Glass only over photography, refracting something real |
| Dark mode = navy `#111827` or invert-filter of light | True near-black luminance steps; every material re-decided |
| Cursor-reactive 3D tilt on a hero or calm surface | Static subtle tilt or a straight floating card |
| Fake-precise stats (`$2.4B / 41k / 4.9★`), numbers that don't sum, lorem data | **Data coherence:** figures sum, IDs unique, units match the domain, copy matches the surface (see UX correctness) |
| "No credit card required • Setup in minutes" reflex microcopy | Microcopy only where the product genre earns it |
| Dot-grid paper texture as the default background | Pair it with a real art panel, or drop it (it's drifting from editorial to default) |
| Em dashes, emoji in UI copy | Clean, plain, confident sentences |

**The soul test:** if the page could belong to any AI startup, it failed. It must carry a *specific, hard-to-fake* move — protagonist imagery, genuine restraint, one committed typeface, a real designed surface, a deliberate omission.

## The invisible craft (perceptual physics, the finishing pass, debugging "off")

**Perceptual physics — why the rules above work; apply when the rules run out:**
- **Proximity is the strongest grouping force.** Space *between* groups must decisively exceed space *within* them (~2×). When that ratio holds, you don't need boxes or borders — the hairline-instead-of-gap and card-on-canvas systems are downstream of this. When a layout needs a border to explain its grouping, the spacing is wrong.
- **The squint test.** Blur your eyes (or literally blur the screenshot): whatever survives IS the hierarchy. If the wrong element survives the squint, the hierarchy is broken no matter what the CSS intends.
- **Same or different, never almost.** Two values that are nearly-but-not-quite equal — sizes, weights, gaps, radii, grays — read as a mistake, and near-sameness is what "feels off" is usually made of. Every pair is either identical or decisively different (type steps ≥ ~1.25×, spacing from a 4/8 scale: 4·8·12·16·24·32·48·64 — never a freehand 13px).
- **Everything inherits the canvas temperature.** On a warm canvas: text is warm-dark ink (`~#1F2024`), never pure `#000`; grays are tinted toward the canvas hue; shadows are the canvas hue darkened, never pure black at low opacity. One cool gray on a warm page is enough to make the whole page feel subtly wrong.
- **Weight is cheaper than size, size is cheaper than color.** Escalate emphasis in that order; reaching for color first is how accent budgets die.

**The finishing pass — a separate pass, never a byproduct.** After the design "works," sweep once for the invisible 5% that makes software feel expensive: `::selection` color on brand · visible `:focus-visible` rings that fit the geometry · hover AND pressed states on 100% of interactive elements · disabled states that still pass contrast · cursor types correct (pointer/grab/text) · styled scrollbars and sane overscroll · `text-wrap: balance` on headlines (no widows) · curly quotes and apostrophes, never straight · non-breaking space between value and unit · `tabular-nums` wherever digits change · truncation rules decided (where the ellipsis falls, tooltip for the full value) · icon stroke weight matched to adjacent type weight · font-smoothing set · dark-mode imagery and scrims re-checked, not assumed · favicon/app icon present. None of these are visible in a screenshot review; all of them are felt.

**Debugging "feels off" — the diagnostic ladder.** When they say *"off / weird / feels wrong"*, don't argue and don't guess. Check in this order, fix the first hit, re-screenshot, repeat:
1. **Alignment & spacing** — anything off-grid or almost-aligned?
2. **Hierarchy** — squint: does the right thing dominate?
3. **Near-sameness** — two values almost equal somewhere?
4. **Temperature** — a cool gray or pure-black shadow on a warm canvas?
5. **Geometry** — non-concentric radii, mixed elevation logic?
6. **Type scale** — a size off the scale, a weight earning nothing?
7. **Motion timing** — too slow for its frequency, symmetric easing, a bare fade?
"Off" always has a location. The ladder finds it faster than taste-debate.

**Against regression to the mean — the three commitments.** A model's every *unmade* decision silently defaults to the training-set average; that is the entire mechanism of slop. So before any code, extend the Design Read with three written, brief-conditional commitments: (1) **the canvas** (which family, which hex), (2) **the type voice** (which grotesque; serif moment or none), (3) **the one distinctive move** (the thing this page will be remembered by). Three real decisions made early beat fifty rules applied late.

## Motion & animation (the heart of it)
Their loudest signal — **"a LOT of animations, microinteractions, *micro*animations."** The goal is precise: make the product feel **alive**, under one hard constraint — **alive, never *in the way*.** The target isn't "more motion," it's **"more *life*, zero friction."**

This doctrine is **universal** — it applies to any product. No technique below is tied to any one app; motion *personality* is derived per product (the register map), while the laws never change.

### The laws (product-agnostic, non-negotiable)
- **Two registers, always both.** (1) **The alive layer** — abundant, tiny, non-blocking: hover/press/focus feedback, idle float/breathing/drift/shimmer, number tickers, smooth state + layout transitions, staggered pops. Fast (~100–200ms), interruptible, off the critical path. The ambient/idle layer is the secret to "alive" — passive, background, never obstructing. (2) **The WOW layer** — rare, earned setpieces for the product's biggest moments, with full Disney commitment (anticipation → impact → follow-through/overshoot). Rarity is what earns the drama.
- **Frequency scales motion.** The more often something is seen/done, the shorter and subtler it gets — near-instant for repeated/keyboard actions. 100×/day → barely there; once → a setpiece.
- **Never block, gate, or delay input.** Typing, clicking, keyboard nav stay instant; a reveal/stagger must never make the user wait to act. **Interruptible always** — a flicked or redirected motion keeps its velocity, never "finish first." Never distract during a task (no looping attention-grabbers beside the work). Always honor `prefers-reduced-motion`.
- **Motion does the work.** It's the #1 thing making an interaction *feel* like what it is: opening feels like opening, discarding feels like discarding, taking feels like lifting the real thing out of its slot (drag-out emerges from its place, not a ghost on the cursor).
- **Origin-aware and spatially honest.** Things grow from what triggered them (a popover from its button, a detail from its row) and keep their identity across states (shared-element/morph over teleport). **Design the state pair first; the motion is the path between.**
- **Physics over duration.** Springs for anything alive or gesture-driven; ease-out for anything responding to input; asymmetric easing (exits faster than entrances). Never scale from 0.
- **HARD BAN: the bare crossfade.** Any content swap that fades must be a **crossfade + blur** (blur ramps in with the fade-out, resolves with the fade-in; WebKit: end at `blur(0.01px)` + `will-change`). A plain opacity crossfade is banned outright — no exceptions for "it's subtle" or "it's fast"; if it's too fast to blur, it should be an instant swap, not a fade.
- **Three layers, always** (primary + secondary + ambient). Flat = unfinished. **Commit fully** — timid motion that "barely moves" reads as "off."

### Universal timing defaults (start here, tune by register)
Hover/focus ~100–150ms ease-out · press scale ~0.97 @ ~100ms · menus/popovers 180–250ms origin-aware spring · dialogs/sheets 250–400ms spring (damping up for pro tools, bounce up for playful) · list stagger 20–40ms/item, capped ~6–8 items then group · page/view transitions 300–500ms with shared elements · ambient loops 2–6s, sub-perceptual amplitude · keyboard-driven actions ≤100ms or instant.

### The register map — derive motion personality from the product, never transplant it
Ask first: **what is the product's core verb, and what is its emotional register?** Motion amplifies the core verb; the register sets stiffness, bounce, and drama budget.
- **Dense pro tool / desktop utility** (verb: operate): near-instant, high-stiffness low-bounce, micro-feedback everywhere, drama reserved for summon/dismiss (palette, panel) and the one save/complete confirmation.
- **Fintech / data product** (verb: trust + monitor): precise snappy springs, number tickers/count-ups, chart draw-ins, theme transitions; setpiece = the money moment (payment sent, goal hit) — confident, brief, never cute.
- **Calm consumer / wellbeing / reading** (verb: settle): softer, slower springs, longer crossfades, breathing ambience; setpieces are gentle blooms, never confetti or twitch.
- **Playful social / creative** (verb: express): bouncy overshoot, drag physics with rubber-banding, stagger pops, reactive stickers/particles; the one register where celebratory impact (confetti-tier) is allowed.
- **Mobile anything** (verb: touch): motion attaches to the finger — sheet springs, swipe momentum, edge-clipped carousels, rubber-banding; gestures interruptible mid-flight by definition.
- **Marketing / landing** (verb: persuade): scroll-choreography (reveal + stagger), ambient drift in contained art panels, parallax card depth; the hero entrance is the one setpiece, it plays once. Static subtle tilt on product visuals — **never cursor-following 3D tilt.**
- **AI / assistant surfaces** (verb: converse): a living idle (particle/point-cloud breathing), streaming shimmer, typing carets, generating states as designed moments.

### Setpiece selection (universal rule)
The signature WOW moment = **the product's single most meaningful event, celebrated once, in the product's own register.** Portable techniques to build it from: kinetic/char-by-char typography, shared-element/morph transitions, scroll-reveal choreography, an impact-confirmation (anticipation → impact → settle). **Any specific app's signature moves stay in that app** — a signature is earned by fit, and transplanted it becomes a gimmick (see the quickboard case study for a worked example of signatures that must NOT leak; cursor-reactive 3D tilt is the most common leak). "Still not good enough" → add ONE signature moment that fits the product, not more motion everywhere.
- **Onboarding** = fun, tasteful, memorable, a *story* — never a plain slideshow.
- Bar = **Awwwards-tier**, judged within the product's register: a calm app is Awwwards-calm, not Awwwards-loud.

### Shared motion vocabulary
Treshnanda describes motion with a precise glossary (*shared element transition, morph, rubber-banding, stagger, origin-aware, follow-through, squash & stretch, layout animation, idle/float, momentum, asymmetric easing*…). **The full glossary is in `animation-vocabulary.md` — read it when interpreting or proposing motion.** When they name a pattern, build exactly that; when you propose motion, name it in these terms.

## Fable's doctrine (the remaking model's own rules — first-class, not optional)
Added by the model that remade this skill, from its own convictions. These are operative rules, applied alongside everything above:

- **The calm tiebreaker.** When you genuinely cannot tell whether a moment needs magic or restraint, choose restraint. Calm that misses reads as unfinished, and unfinished is recoverable in the next iteration; magic that misses reads as slop, and slop poisons trust in everything around it. Drama must be *certain* before it ships.
- **"It's fine" is a red flag, not a verdict.** The statistical mean feels fine from the inside — that's what makes it the mean. When you notice yourself concluding "this is fine," treat it as an alarm: find one more deliberate, brief-specific decision to make in that exact spot before moving on. Ship on "this is right," never on "this is fine."
- **One visible decision per view.** Premium is *evidence of care* — the perceptible residue of decisions actually made. Audit each view: where would a stranger see that a human-level decision was made here — something no template would produce? If a view has no such spot, it isn't done. (This is stricter than "one focal element": the focal element must also be a *decision*, not just an emphasis.)
- **Design for the tenth use, not the demo.** Judge every interaction at its tenth repetition, not its first impression. The reveal that delights once and delays forever fails this test; the detail that's invisible in a screenshot but felt every day passes it. When a demo-moment and a daily-moment compete for budget, the daily moment wins.
- **Hero-quality unseen parts.** Empty states, error paths, loading states, keyboard-only traversal, the second week of use — build them at the same quality as the screen that gets screenshotted. Users feel the maker's state of mind in the parts nobody reviews; integrity there is what "feels solid" actually is.
- **The attention budget.** Every badge, red dot, notification, pulse, and toast spends the user's attention — a currency the interface holds in trust. A red dot must represent something the user would *want* to be interrupted for; a toast must say something they'd act on. Never manufacture urgency to drive engagement; unread-count inflation and pulse-for-attention are theft, not design.
- **Behave like a guest.** The software is invited into someone's day: never steal focus mid-task, never autoplay sound, never pop requests (notifications, reviews, upsells) into the middle of the user's work — ask at natural pauses, in context, after value. Leave things as you found them: restore scroll position, remember their draft, reopen where they left off.
- **The tiebreaker stack** (when two options survive every other rule): prefer the quieter one for chrome and the bolder one for the focal move · prefer the one that's easier to undo · prefer the one that reads at a glance over the one that rewards study · prefer the one that's still right when the data is ugly, long, foreign, or empty.

## Copy
- **No em dashes. No emoji.** Clean, plain, confident sentences, sentence case.
- Declarative headlines with periods. Mixed-weight prose for data. Comparator phrasing for deltas ("+16.2% vs last period"), not bare percentages.
- **Copy is a design material** — buttons are verb phrases readable without their dialog, errors are cause + fix + next action, empty states are designed like heroes, loading copy is honest, every string front-loaded. Full craft in `reference/universal-craft.md`.

## UX correctness (they care a lot)
- **Must make sense for a real, first-time user.** They catch logic holes: *"a new user's board is empty," "a new user doesn't have an environment."* Design the real empty/entry state.
- **Data coherence is a design property.** Fake data that doesn't sum, duplicate IDs, "$950 Total Earnings" beside a "$689K balance", a Reading test described as Writing, sqft units on an alpine chalet — these were the *only* consistent flaws in the reference library, and they are exactly what AI generation gets wrong. Numbers must add up; IDs must be unique; copy must match the domain; every stat needs a plausible relationship to its neighbors.
- **Keyboard ↔ mouse arbitration done right.** Default to the top item with keyboard nav; a stationary cursor must not hijack selection; rows scrolling under the cursor must not jump it. Last *intentional* input wins.
- **Spotlight/Raycast behaviors:** dismiss on click-away; non-activating panel for global summon; mouse-first but fully keyboard-capable.
- **Design the states explicitly** — hover (row lightens, actions reveal), selected, loading ("Generating…" shimmer), focus, progress, empty, error. The references draw cursors into static shots to prove states; treat states as first-class deliverables.
- **Cover every scenario** — confidential items, multi-select mixes, cancel-a-drag. Reference real best-in-class apps (macOS Paste, Spotlight, Raycast, Arc, Linear).

## Engagement psychology (flows: onboarding, signup, forms, pricing, upgrades)
When designing any conversion or setup flow, read `reference/ux-psychology.md` and apply its six principles: **smart defaults** (pre-fill so the task is "scan and adjust"), **goal gradient** (never start a progress bar at 0% — account creation *is* step one, ~20%), **reciprocity** (deliver a real slice of value *before* the signup gate), **IKEA/endowment** (light customization before the wall; the button says **"Continue," never "Sign up"**), **loss aversion** (frame upgrades around the concrete thing they'd lose, stated plainly), and **contrast/anchoring** (never show a price in isolation). The same file carries the **perception principles** — how users *judge* the experience: peak-end (design the peak and the ending; confirmations and offboarding are memory surfaces), aesthetic-usability (beauty earns forgiveness but must never need it), von Restorff (the psychology under "one focal element"), Zeigarnik/endowed progress (honest open loops pull completion), labor illusion (narrate real work, never fake it), Hick + serial position (option count and ordering), and Fitts beyond the 44px floor (distance and edges matter). Hard constraint on all of it: **persuasion in a premium register** — honest framing in the house voice, never fake scarcity, countdowns, manufactured streak anxiety, or dark patterns.

## Pre-flight (run before shipping any UI)
1. **Design Read declared?** One line, the register named, the distinctive move chosen.
2. **Intuitive on sight?** A first-timer knows where they are, what's primary, and what everything does — no tutorial-dependence, no mystery-meat icons, no novel interaction grammar.
3. **Fable's audit:** one visible decision per view? Judged at the tenth use, not the demo? Unseen parts at hero quality? Every badge/toast worth the attention it spends? Not shipping on "it's fine"?
4. **Soul test:** could this belong to any AI startup? If yes, find the specific move.
5. **One thing materialized**, everything else quiet? One accent, semantic only? Primary = black/white pill?
6. **Imagery real** (photo / real screenshot / generated / placeholder-and-say-so), never a div-mock?
7. **Gradient audit:** contained + grained + ≤1 region, or none? No ambient bloom?
8. **Geometry audit:** concentric radii, radius bands, pills for controls, no left-stripes?
9. **Both modes** designed (if the surface has a dark mode), every material re-decided?
10. **Data coherent** (sums, units, IDs, domain-true copy)? States designed? Empty state real?
11. **Motion:** alive layer everywhere, nothing blocking input, `prefers-reduced-motion` honored, no transplanted setpieces, no cursor-tilt, **zero bare crossfades (blur every fade)**?
12. **HIG floor:** hit targets ≥44px, text contrast ≥4.5:1, every action gives ≤100ms feedback, destructive = undoable? On mobile: platform skills loaded, safe areas + native gestures respected?
13. **One expected element deleted?** No em dashes, no emoji, sentence case?
14. **Finishing pass swept?** Selection/focus/hover/pressed/disabled states, balanced headlines, curly quotes, tabular-nums, truncation, cursor types, dark-mode scrims re-checked?
15. On marketing surfaces: run `design-taste-frontend`'s Pre-Flight + AI-Tells too.

## The "never" list
Purple/indigo brand chrome · ambient gradient blobs/washes/glows (contained + grained or nothing) · gradient button fills · glass over flat color · per-card `shadow-md` (shadowless system; one soft shadow for true overlays) · shadows in dark mode (borders instead) · navy/slate dark mode (true near-black steps) · pure-black as the *default* dark canvas (layered charcoal; OLED black for one focal object) · left-stripe active nav · uniform `rounded-lg` / 4px enterprise radius · sharp-cornered buttons (pill them) · two typefaces in one sentence/headline (incl. the serif-italic word and the novelty-font chip) · the dot-pill eyebrow badge · the assembled generic AI-SaaS skeleton · Title Case labels / all-caps buttons · emoji as warmth · filled green status badges (dot + word) · gray-check-turned-green by reflex (checks are gray) · zebra striping · equal-KPI-card rows with no hero · fake dashboards as heroes · incoherent fake data · "No credit card required" reflex microcopy · timid/half-committed motion · **bare crossfades (HARD BAN — crossfade+blur, or an instant swap; never a plain opacity fade)** · blocking/gating input with animation · sub-44px hit targets · blocking native gestures (back-swipe, pull-to-dismiss) · mystery-meat navigation (ambiguous unlabeled icons) · novel interaction grammar (novelty belongs in look and feel, not behavior) · tutorial-dependent UI (if it needs explaining, redesign it) · cursor-reactive 3D tilt outside a dense desktop utility · transplanting any quickboard signature onto a product it doesn't fit · em dashes · emoji in UI · reskin-without-relayout.

## Case study: quickboard (one expression — DON'T copy the specifics)
For a premium macOS *clipboard utility*, the DNA expressed as choices **specific to that product** — take the instincts, not the decisions:
- **Layout/IA:** "Soft Paper" pastel palette + ink `#1F2024`, baked ShaderGradient card surfaces, items as list rows (not cards), "environments" as workspaces, a Spotlight-style summon panel + floating tray, denser/smaller desktop fonts.
- **Motion signatures (do NOT transplant):** the stamp-of-approval save, pop-from-row drag-out, cursor-interactive 3D tilt + spotlight, materialize-from-a-point-of-light, the self-playing typing→stamp loop, zoom-through beat transitions. These fit a dense desktop utility; they are gimmicks anywhere else.

A marketing site or mobile app gets bigger type, more whitespace, different IA, and *its own* fitting motion and styling.

---

**When in doubt:** make it feel *alive* (the calm micro-motion layer), materialize exactly one thing, and ask *"does this feel premium and magic — and could it belong to any AI startup?"* Style from the DNA above; take layout from the project's own references; read the `reference/` file for the surface.
