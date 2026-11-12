# Shared Animation Vocabulary

The precise terms Treshnanda uses to describe motion (from animations.dev). **When they name a pattern, build exactly that pattern. When you propose motion, name it with these terms** so requests and proposals are unambiguous. Pair with `emil-design-eng` (craft) and `motion-design` (theory).

## Entrances & Exits
How elements appear and disappear.
- **Fade in / Fade out** — appears/disappears by changing opacity.
- **Slide in** — enters by sliding from off-screen (left, right, top, or bottom).
- **Scale in** — grows from smaller to full size as it appears, often paired with a fade.
- **Pop in** — appears with a slight overshoot, like it bounces into place.
- **Reveal** — content uncovered gradually, often by animating a clip-path or mask.
- **Enter / Exit** — the animation an element plays when it's added to or removed from the screen.

## Sequencing & Timing
Coordinating multiple elements or moments.
- **Keyframes** — defined points (0%, 50%, 100%) the browser fills the gaps between.
- **Interpolation / Tween** — generating all the in-between frames between a start and end value.
- **Stagger** — animate several items one after another with a small delay, creating a cascade.
- **Orchestration** — deliberately timing multiple animations so they feel like one coordinated motion.
- **Delay** — time before an animation starts.
- **Duration** — how long an animation takes.
- **Fill mode** — whether an element keeps its first or last frame's styles before/after the animation (e.g. `forwards`).
- **Stepped animation** — divided into discrete steps, like a countdown timer.

## Movement & Transforms
Changing an element's position, size, or angle.
- **Translate** — move along the X or Y axis.
- **Scale** — make bigger or smaller.
- **Rotate** — spin around a point.
- **Skew** — slant along the X or Y axis, shearing out of its rectangular shape.
- **3D tilt / Flip** — rotate in 3D space (`rotateX`/`rotateY`) to add depth.
- **Perspective** — how strong the 3D effect looks; a lower value exaggerates depth.
- **Transform origin** — the anchor point a scale or rotation grows/spins from.
- **Origin-aware animation** — animates out of its trigger (a popover growing from the button that opened it, not from its own center).

## Transitions Between States
Connecting one state, view, or element to another.
- **Crossfade** — one element fades out as another fades in, in the same spot.
- **Continuity transition** — a change that keeps the user oriented by visually connecting before and after.
- **Morph** — one shape smoothly turns into another (Dynamic Island).
- **Shared element transition** — an element travels and transforms from one position into another (thumbnail expanding into a card).
- **Layout animation** — when size/position changes, it animates to the new spot instead of snapping.
- **Accordion / Collapse** — a section smoothly expands and collapses its height.
- **Direction-aware transition** — content slides one way going forward, the opposite going back.

## Scroll
Motion tied to scrolling or navigating between views.
- **Scroll reveal** — elements fade/slide into place as they enter the viewport.
- **Scroll-driven animation** — progress tied directly to scroll position.
- **Parallax** — background and foreground move at different speeds, creating depth.
- **Page transition** — plays when navigating from one page/route to another.
- **View transition** — the browser morphs between two states/pages, connecting shared elements.

## Feedback & Interaction
Responding to the user's actions.
- **Hover effect** — visual change when the cursor moves over an element.
- **Press / Tap feedback** — a subtle scale-down on click, so it feels physical.
- **Hold to confirm** — a progress effect that fills while the user holds a button.
- **Drag** — moving an element by grabbing it, often with momentum on release.
- **Drag to reorder** — dragging list items to rearrange, others shifting to make room.
- **Swipe to dismiss** — dragging off-screen to close (drawer or toast).
- **Rubber-banding** — resistance and snap-back when dragging past a boundary (iOS overscroll).
- **Shake / Wiggle** — a quick side-to-side jitter signaling an error.
- **Ripple** — a circle expanding from the tap point, confirming the press.

## Easing
How speed changes over an animation.
- **Easing** — the rate an animation speeds up/slows down.
- **Ease-out** — fast then slow. The default for UI and anything responding to the user.
- **Ease-in** — slow then fast. Usually avoided; feels sluggish.
- **Ease-in-out** — slow, fast, slow. Good for elements already on screen moving A→B.
- **Linear** — constant speed. Reserve for spinners/marquees.
- **Cubic-bezier** — a custom easing curve for precise control.
- **Asymmetric easing** — accelerates and decelerates at different rates; feels more alive than symmetric.

## Spring Animations
Physics-based motion as an alternative to fixed-duration easing.
- **Spring** — motion driven by physics (tension, mass, damping) rather than a set duration.
- **Stiffness / Tension** — how strongly the spring pulls toward its target; higher = snappier.
- **Damping** — how quickly it settles; lower = more bounce/oscillation.
- **Mass** — how heavy it feels; more mass = slower, more sluggish.
- **Bounce** — a spring that overshoots and settles, adding playfulness.
- **Perceptual duration** — how long a spring feels finished even while micro-settling.
- **Momentum** — motion that carries velocity, especially after a drag/interruption.
- **Velocity** — how fast and in which direction an element moves; a spring carries it into the next animation when interrupted.
- **Interruptible animation** — can be smoothly redirected mid-flight instead of finishing first.

## Looping & Ambient Motion
Animations that run on their own.
- **Marquee** — content scrolling continuously in a loop.
- **Loop** — repeats a set number of times or infinitely.
- **Alternate (yoyo)** — plays forward then reverses each iteration.
- **Orbit** — an element circling another in a continuous path.
- **Pulse** — a gentle repeating scale/opacity change to draw attention.
- **Float** — a gentle continuous up-and-down drift; makes a static element feel alive and weightless.
- **Idle animation** — subtle motion while an element sits waiting to be interacted with.

## Polish & Effects
The small touches that separate good from great.
- **Blur** — a blur filter to soften an element or mask tiny imperfections.
- **Clip-path** — clipping to a shape, for reveals, masks, before/after sliders.
- **Mask** — hide/reveal parts of an element using a shape or gradient (soft, fadeable edges).
- **Before / after slider** — a draggable divider wiping between two overlaid images.
- **Line drawing** — an SVG path that draws itself in, like an invisible pen.
- **Text morph** — text animating character by character when it changes.
- **Skeleton / Shimmer** — a placeholder with a moving sheen while content loads.
- **Number ticker** — digits rolling/counting up to a value.
- **Tabular numbers** — fixed-width digits so numbers don't shift as they change (tickers, timers, counters).
- **Typewriter** — text appearing one character at a time.

## Performance
What keeps motion smooth instead of stuttering.
- **Frame rate (FPS)** — frames per second; 60fps baseline, 120fps on newer displays.
- **Jank** — visible stutter when the browser drops frames.
- **Dropped frame** — a frame the browser missed its deadline to draw.
- **Compositing** — letting the GPU move/fade an element on its own layer without redoing layout/paint.
- **will-change** — a CSS hint that an element is about to animate, promoting it to its own layer early.
- **Layout thrashing** — animating width/height/top/left forces layout recalculation every frame → jank.

## Principles to Know
Concepts that guide when and how to animate.
- **Purposeful animation** — motion should serve a function (orient, give feedback, show relationships), not just decorate.
- **Anticipation** — a small wind-up in the opposite direction before a move.
- **Follow-through** — parts keep moving and settle slightly after the main motion stops, adding weight.
- **Squash & stretch** — deforming as it moves to convey weight, speed, flexibility.
- **Perceived performance** — the right animation makes an interface feel faster.
- **Frequency of use** — the more often a user sees an animation, the shorter and subtler it should be.
- **Spatial consistency** — animate so an element keeps its identity and position across states.
- **Hardware acceleration** — animating transform and opacity lets the GPU keep motion smooth.
- **Reduced motion** — respect `prefers-reduced-motion` by toning down or removing motion.
