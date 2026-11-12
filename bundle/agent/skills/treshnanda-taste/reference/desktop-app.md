# Reference: Desktop / web app (product UI — 8 designs)

Product UI is **sidebar-led, search-first, calm-dense, and shadowless** — a lot of information organized so it still breathes, separated by value shifts and hairlines instead of shadows, with color rationed to semantics and one saturated hero object per screen.

## Canvas & shell
- Light: warm bone (`~#EDECE8`), blush-tinted (`~#F7EFEE`), or warm-gray page behind brighter white cards. Never cold `#F9FAFB` gray.
- Dark: **true near-black, never navy/slate.** Stepped luminance surfaces (`~#050505` void < `#0E0E0E` < `#141414` < `#1A1A1A`), hairline `~#232323` borders, desaturated text (white → `~#9A9A9A` muted). Colored status in dark mode = colored glyph + colored text inside a *dark* pill, never a bright filled badge.
- Accents skew **warm**: orange (`~#F4602A`), coral (`~#F05A50`), amber — or near-monochrome chrome where color arrives only via brand logos, avatars, and status semantics. **Zero purple chrome across all 8.** Multi-stop aurora gradients exist only as ONE hero object (the current-plan card, a banner) — never backgrounds, never buttons.

## Surfaces & depth — the shadowless system
- 8/8 refs are effectively shadowless: separation via canvas-tint vs white (light) or luminance steps + hairline (dark). Real shadows only on floating overlays (popover, command palette, a raised active nav pill).
- Cards 12–20px radius, hairline borders you barely see; full-pill buttons/chips/inputs; even chart bars are top-rounded. Uniform 8px `rounded-lg` everywhere is the slop twin.

## Shell archetypes
- **Grouped-label sidebar** (tiny muted section headers, thin icons, expandable groups, count badges, a pinned alert card at bottom): the default.
- **Settings pattern**: secondary sidebar with "← Go back" + tinted active row, content column with icon+title+muted-subline section rhythm; not-yet-configured sections dimmed (progressive disclosure).
- **Icon-only rail** as an *additional* layer (app-switcher rail left of the nav column), or a **floating detached rail** (theme toggle top, apps middle, help bottom) when there's no sidebar at all.
- **Sidebar-less alternative**: top pill-nav inside a white rounded header bar (active item = black pill) + greeting-as-page-title ("Good morning, Sajibur").
- **3–4 pane splits** for triage surfaces: rail | nav+filters | list | detail.
- **Active state = tinted or raised rounded pill/row, or an outlined rect: 6/6 visible sidebars. Left-border stripe: 0/8.**

## Search is a centerpiece
- Prominent top search on 5/8: a wide pill with **rendered keycaps** ("⌘+K", "⌘F" as actual key shapes), sometimes an "Ask AI" chip *inside* the field. The command palette (big input, caret, caps-tracked section labels ACTIONS / RECENT SEARCH / QUICK ACTIONS, a ✨ AI action row, keyboard-traversable highlighted rows) is a first-class surface.

## Data grammar
- **Break KPI symmetry.** One saturated hero card (orange gradient fill, or a full-height narrative coral panel with editorial prose — "Consumer loans are showing 12% faster repayment…") among quiet white siblings. The 4-equal-KPI row is the one generic pattern; rescue it or avoid it.
- **Delta chips are tinted micro-pills with comparator prose** ("+16.2% vs last period", "than last month") — never bare green percentages.
- **Tables:** no zebra; faint header tint; 10–11px uppercase letterspaced muted headers; leading avatar/service-icon cell; tabular-numeral money; status = small colored dot + plain word; trailing kebab; checkbox column when actionable; rows 44–48px.
- **Mixed-weight prose as data display**: notification sentences with inline bold objects ("Maya Green **assigned you to** **Review final UI assets**"); activity logs with inline avatars and micro-chips; per-teammate spark-bars in the nav.
- **Humanize the data**: avatars/facepiles woven into rows, KPIs, and logs on 6/8.
- **Charts**: two-tone (black + accent) rounded bars, one dashed gridline, dot-annotated sparklines with labeled chips, inline minimal legends — never default-blue chart-library output with a legend box.
- Billing/pricing: the aurora gradient reserved for the ONE "your plan" card (grained); gradient *border* = selected; dotted leader lines ("Next payment ……… Jan 15"); per-plan contextual verbs (Downgrade / Cancel / Upgrade), not uniform "Choose plan".

## Typography
- One grotesque family, 8/8. Hierarchy via weight + size + muted gray, never colored headings. Medium-weight page titles with a muted subline; greeting-as-hero on dashboards; money large semibold tabular; group labels tiny AND muted AND sparse; generous 20–24px card padding.

## Motion (functional micro-feedback)
- Hover-reveal row actions; command-palette spring-summon; popover lift; light↔dark theme transition; toggle/progress fills; chart draw-in on load; count-up numerals. All fast, interruptible, off the critical path.

## Premium vs slop
- DO: warm or true-black canvas; shadowless separation; pill/outlined active nav; ⌘K with keycaps; one hero KPI; comparator-prose deltas; dot+word status; avatar-led tables; black/white pill primaries; every material re-decided in dark mode.
- NEVER: left-stripe nav · equal KPI rows with icon-left + green +12% · filled green-100 badges · zebra tables · shadow-md card grids on gray-100 · navy dark mode / invert-filter dark mode · purple gradient chrome · default-blue charts · colored section headings · Title Case labels.
- **Data coherence guard** (the refs' own flaw): totals must sum, IDs must be unique, metric names must be semantically sane (no "$950 Total Earnings" beside a $689K balance), copy must match the domain. Gorgeous-but-data-illiterate is still slop.
