# Reference: Engagement psychology

Six behavioral principles for flows — onboarding, signup, forms, pricing, upsells, upgrades. These shape *structure and sequencing*, not visuals. The taste constraint on all of them: **persuasion in a premium register.** Confident, honest framing that respects the user — never countdown timers, fake scarcity, guilt-trip modals, or sleazy dark-pattern energy. If a tactic would embarrass a brand like Linear or Arc, it fails the bar even if it converts.

## 1. Smart defaults (kill decision fatigue)
A blank form with many open choices makes people choose nothing and leave. Pre-fill every field you reasonably can with the most common / most sensible value — 70–90% of users keep defaults, and they read a default as the app's recommendation. This turns the task from "fill this out from scratch" into **"scan and adjust,"** which is fundamentally easier.
- Fewer visible choices beats more: curate options, collapse the long tail behind "more."
- A default is a design decision — pick the one a first-time user should have (this pairs with the "a new user's board is empty" instinct: design the real entry state, then pre-fill it intelligently).

## 2. Goal gradient (never start at 0%)
People accelerate toward a finish line they feel close to. An onboarding progress bar sitting at 0% with five empty steps is deflating.
- **Count what they've already done as progress.** Creating the account *is* step one — the bar starts at ~20%, never 0%.
- Keep steps few and visibly shrinking. The head start is framing, not a lie: they genuinely did do that step.
- This composes with the motion doctrine: progress ticking up is a legitimate micro-feedback moment (alive layer), and completing onboarding is a legitimate earned setpiece (WOW layer).

## 3. Reciprocity (give value before the gate)
Demanding an email before showing anything reads as holding results hostage. Let the user experience a core slice of the product first, then ask.
- Pattern: run the scan / generate the preview / show the score and top findings **free and instantly** → gate the *full* breakdown behind account creation. They've received something; signing up now feels like a fair trade, not a toll.
- The pre-signup experience must be genuinely useful on its own, not a teaser skeleton.

## 4. IKEA / endowment effect (make them build something first)
People value what they made and defend what they own. An email+password wall has nothing tying the user to it — so put light customization *before* the wall: pick a name, choose a palette, set a goal, complete one real lesson/action.
- By the time the account prompt appears, leaving means throwing away work they did. The prompt's button says **"Continue"** — never "Sign up." They're not starting a relationship; they're preserving one.
- Keep the pre-wall investment small and pleasant (2–3 tasteful choices), not a 10-field quiz — this must not conflict with principle 1.

## 5. Loss aversion (frame the stakes, stay classy)
Losing something hurts roughly twice as much as gaining the same thing feels good. When asking a user to act (upgrade, renew, enable backup), show what they stand to **lose** concretely, not just what they'd gain.
- "You're about to lose access to *these 214 files*" (specific, theirs, visible) beats "Upgrade for more storage" (abstract, generic). A decline button that owns the consequence ("I'll risk it") outconverts a mushy "Maybe later."
- **Taste line:** the loss must be real and stated plainly in the house copy voice — clean, confident sentences, no emoji, no manufactured urgency, no red-alarm theatrics. State the true consequence and let it do the work.

## 6. Contrast effect (control the anchor)
Every number is judged relative to what was seen immediately before it. A price shown in isolation is judged absolutely — $50/mo alone reads as "$600 a year."
- Never show a cost in isolation. Sequence deliberately: annual-vs-monthly side by side, the recommended tier flanked by a pricier one, the $49 add-on offered right under the $1,900 item where it reads as a rounding error.
- Same tool works on effort: "2 minutes to set up" lands harder right after naming the hours the manual way costs.
- Visually this obeys the existing rules: one focal element (the recommended option is *the* dominant thing), hierarchy from dominance and weight, one accent marking the primary action.

## Perception principles (how users judge the experience — design for the judgment, not just the flow)

**7. Peak-end rule.** People don't remember an experience's average — they remember its **peak moment and its ending**. This is the psychological justification for the motion doctrine's WOW layer: budget the drama for one designed peak (the milestone, the money moment) and make endings land (a completion screen, a well-crafted send-off, even a good sign-out). A session that ends on a dead settings page is remembered worse than the same session ending on "here's what you accomplished." Offboarding, receipts, and confirmations are peak-end surfaces, not afterthoughts.

**8. Aesthetic-usability effect.** Beautiful interfaces are *perceived* as easier to use and are forgiven more errors. This is why "premium" is a functional goal, not vanity — but it cuts both ways: beauty masks usability problems in testing, so never let polish exempt a flow from the intuitive-by-default check. The taste earns forgiveness; it must not need it.

**9. Von Restorff (isolation) effect.** In a field of similar things, the one different thing is what's noticed and remembered. This is the psychology under "one focal element per view" and "materialize exactly one thing": distinctiveness is a budget, and spending it everywhere spends it nowhere. It also means the thing you make different will be assumed *important* — never isolate a trivial element.

**10. Zeigarnik effect + endowed progress.** Open loops occupy the mind; visible incomplete progress pulls toward completion. A profile-strength meter at 70%, a checklist with one unchecked item, "2 of 6 tasks" — these recruit the user's own psychology toward finishing. Taste constraint: open loops must be *closable* and honest — a progress meter that can never reach 100% or a streak engineered to manufacture anxiety is a dark pattern, not a principle.

**11. Labor illusion.** Work that shows its effort is valued more than instant magic — "Analyzing 214 files… checking dependencies…" feels more trustworthy and more valuable than a result that appears in 80ms. Use it only where work genuinely happens (AI generation, scans, searches): name the real steps, stagger the real results in. Faking latency to seem thorough violates the honesty rule; *narrating* real latency is the premium move (and pairs with the loading-copy rules in `universal-craft.md`).

**12. Hick's law + serial position.** Decision time grows with the number and complexity of options — the mechanism under smart defaults and progressive disclosure. And in any list or menu, the first and last positions are remembered and chosen most: order menus by importance, put the primary action first or last (never buried mid-list), and chunk long information into groups of 3–4 (card numbers, onboarding steps, feature lists).

**13. Fitts's law, beyond the 44px floor.** Time-to-target depends on size *and distance*: put the next action where the user already is (the button near the thing it acts on, the confirm near the trigger), make frequent targets bigger, and remember screen edges and corners are effectively infinite-size targets on desktop (why docks and menu bars live there). A perfectly sized button in the wrong corner is still slow.

## How these compose (the default premium funnel)
Try-before-gate (3) → light ownership-building customization (4) → "Continue" wall, progress already at 20% (2) → smart-defaulted setup (1) → upgrade moments framed around concrete loss (5) with prices anchored, never naked (6). Onboarding stays what the taste already demands — a fun, memorable *story* — these principles are the plot structure under it.
