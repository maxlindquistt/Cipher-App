# Cipher Tool: design overhaul spec (single screen, blue theme kept)

Source: ui-ux-designer review, 2026-11-17. Status: **proposal, awaiting owner approval.**

## 1. Critique (ranked)

**Critical**
1. **Global `div` rule** (`src/app.css`). Every div gets `margin: 20px`, centred text, `align-items/justify-content: center` and the text colour. Nested divs stack up margins, which causes horizontal overflow next to `width: 100%` children and centres body text in the info card lists. Delete the rule and scope the styles to a `.app` wrapper.
2. **No visible focus on the Encode/Decode toggle.** The radios are `opacity: 0; width: 0`. On top of that, the global `:focus { outline: 0 }` in `src/components/dropdown/dropdown.css` removes outlines across the whole app. This fails WCAG 2.4.7.
3. **Missing accessible names.** "Cipher Method:" is a bare text node, so the `<select>` has no label. The textareas only have headings and a placeholder. This fails 1.3.1 and 4.1.2.
4. **Stale output.** In `cipherTool.tsx` the effect only runs `if (inputText)`, so clearing the input leaves the old result. An empty shift field becomes `parseInt('')`, which is `NaN`, and that goes to the cipher.

**High**
5. The settings panel sits between the input and the output, which pushes the output below the fold on mobile.
6. The info card isn't tied to the selected cipher. The heading "Encrypted text" also stays the same in Decode mode.
7. Contrast and palette breaks: `strong` is `#505050` on `#00002c` (about 2.5:1), labels are beige `#D2C1B6`, the toggle is a light-grey pill and the fields are near-white. Black shadows don't show on navy.
8. Mobile text shrinks to 14px and then 13px. The minimum should be 16px.

**Medium**
9. Touch targets are under 44px (shift buttons and toggle labels).
10. The page opens with filler ("Welcome to the…") and everything is centred.
11. There's no copy action and no way to round-trip (encode, then decode).

**Low**
12. `Button` is never used and its hover does nothing. "Vigenere" in the dropdown is missing the è. There are no landmarks (`header`, `main`, `aside`).

## 2. Layout

Flow: choose cipher, set mode, set key, type, read the result, copy or swap. Settings go above the workspace, never between input and output.

- **Desktop (≥1100px):** a 1200px-max container in a `1fr 340px` grid. The left column has a settings bar (one row), then input and output side by side with a swap button between them. The right column has the info card, `position: sticky; top: 24px`.
- **Tablet (720–1099px):** same left column, with the info card moved below at full width.
- **Mobile (<720px):** one column. Header, cipher, mode, key, input, action row, output, info card. Textareas are `min-height: 120px`.
- The key slot always takes space. Atbash shows "No key needed", so the layout doesn't jump.

```
DESKTOP >=1100
+------------------------------------------------------------------------+
| Cipher Tool                                                            |
| Encode and decode text with Caesar, Vigenère and Atbash ciphers.       |
+------------------------------------------------------------------------+
| +-- Settings -------------------------------------------+ +-About---+  |
| | Cipher           Mode                Shift            | | How the |  |
| | [Caesar     v]   [Encode | Decode]   [-] [ 3 ] [+]    | | Caesar  |  |
| |                                      A -> D           | | cipher  |  |
| +-------------------------------------------------------+ | works   |  |
| Plain text                  Encoded text                  | ...     |  |
| +-----------------------+   +-----------------------+    | Example |  |
| |                       |   |                       |    | HELLO ->|  |
| |                       |[<>]                       |    | KHOOR   |  |
| |                       |   |                       |    |         |  |
| +-----------------------+   +-----------------------+    | > Notes |  |
| 12 characters    [Clear]                    [Copy]       +---------+  |
+------------------------------------------------------------------------+

MOBILE <720
+------------------------------+
| Cipher Tool                  |
| Encode and decode text ...   |
| Cipher                       |
| [Caesar                  v]  |
| Mode                         |
| [   Encode   |   Decode   ]  |
| Shift                        |
| [ - ]   [  3  ]   [ + ]      |
| A -> D                       |
| Plain text                   |
| +--------------------------+ |
| |                          | |
| +--------------------------+ |
| [Clear]  [Swap <>]   [Copy]  |
| Encoded text                 |
| +--------------------------+ |
| |                          | |
| +--------------------------+ |
| +- How Caesar works -------+ |
| | ...  > General notes     | |
| +--------------------------+ |
+------------------------------+
```

## 3. Design tokens

```css
:root {
  /* Blue palette */
  --color-bg:            #00001d; /* page (kept) */
  --color-surface:       #0b1440; /* panels, info card */
  --color-surface-2:     #12205a; /* fields, secondary buttons */
  --color-surface-hover: #1a2c75;
  --color-border-subtle: #1e2c6b; /* decorative only */
  --color-border:        #4a6cc4; /* control borders: 3.6:1 on surface, 3.1:1 on surface-2 */
  --color-text:          #e6f0ff; /* 17.9:1 bg, 15.4:1 surface, 13.2:1 surface-2 */
  --color-text-muted:    #9fb3d9; /* 9.8:1 bg, 8.4:1 surface, 7.2:1 surface-2 */
  --color-accent:        #5b9dff; /* 7.6:1 bg, 6.5:1 surface, 5.6:1 surface-2 */
  --color-accent-hover:  #7fb3ff;
  --color-accent-active: #4a8cf5;
  --color-on-accent:     #00001d; /* text on accent: 7.6:1 */
  --color-focus:         #9cc4ff; /* focus ring, used with offset */
  --color-disabled-text: #7d8fbf; /* 5.5:1 on surface */

  /* Spacing (4px base) */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px; --space-7: 48px;

  /* Radii */
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px; --radius-pill: 999px;

  /* Type: base never below 16px */
  --font-ui: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, "Cascadia Code", "SF Mono", Menlo, Consolas, monospace;
  /* OPTIONAL web font: "IBM Plex Mono" 400/600, prepended to --font-mono */
  --text-sm: 0.875rem;
  --text-md: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.5rem;
  --text-2xl: clamp(1.75rem, 1.2rem + 2.5vw, 2.75rem); /* h1, weight 800 */
  --leading-body: 1.6;

  --control-h: 44px;
  --shadow-panel: 0 8px 32px rgba(4, 12, 60, 0.6);
  --dur: 150ms;
}
```

Use monospace for both text areas so the letters line up between input and output.

## 4. Component specs

**Global:** delete the `div` rule in `src/app.css`, the global `:focus` rule in `dropdown.css`, and the 13/14px rules in `public/styles.css`. Set `body { font: var(--text-md)/var(--leading-body) var(--font-ui); color: var(--color-text); background: var(--color-bg); }`. Text is left-aligned everywhere. Use `<header>`, `<main class="layout">`, `<section aria-labelledby>` for the tool and `<aside>` for the info card.

**Header:** left-aligned `h1` "Cipher Tool" at `--text-2xl`/800, plus a one-line subtitle in `--color-text-muted`. No card around it. Vertical padding `--space-6` on desktop, `--space-5` on mobile.

**Settings bar:** a `--color-surface` panel with `--radius-lg`, `--space-5` padding and a 1px subtle border. On desktop it's a flex row with `gap: var(--space-5); align-items: flex-end; flex-wrap: wrap`. Each label sits above its control (`--text-sm`/600, muted, `--space-2` gap).

**Cipher selector:** native `<select id="cipher">` with `<label for="cipher">Cipher</label>`. 44px high, `--color-surface-2` background, 1px `--color-border`, `--radius-sm`, custom chevron (`appearance: none` plus an SVG background). Options are "Caesar", "Vigenère" and "Atbash". Full width on mobile, 200px minimum on desktop.

**Encode/Decode toggle:** `<fieldset>` with `<legend>Mode</legend>` and two native radios, hidden with the visually-hidden clip pattern (not `width: 0`). The track is `--color-surface-2` with a 1px border, `--radius-pill` and 4px padding. Labels are `min-height: 44px` with `padding: 0 var(--space-5)`. The selected option gets `--color-accent` background, `--color-on-accent` text and weight 600. Focus: `label:has(input:focus-visible) { outline: 2px solid var(--color-focus); outline-offset: 2px; }`. Full width on mobile with two equal halves.

**Caesar options:** label "Shift" on `input#shift`, with [−] [input] [+] at 44×44 each (the input is 64px wide). Use `inputmode="numeric"` and `aria-describedby="shift-hint"`. The value wraps: + goes 25 to 0, − goes 0 to 25. An empty field counts as 0 while typing and is set to 0 on blur. Never send NaN. Add a muted live hint `#shift-hint`, for example "A → D".

**Vigenère options:** label "Keyword" on `input#key`, with `autocomplete="off" autocapitalize="none" spellcheck="false"` and `aria-describedby="key-hint"`. The hint reads "Letters A–Z. Empty keyword leaves text unchanged." The field is 44px high, at least 14rem wide, uses `--color-surface-2` and `--font-mono`.

**Atbash:** muted text "No key needed: A↔Z, B↔Y…" in the same slot.

**Input:** `<label for="input-text">` that reads "Plain text" in Encode mode and "Cipher text" in Decode mode. The textarea uses `--font-mono` at 16px, `min-height` 240px on desktop and 120px on mobile, `resize: vertical`, `--color-surface-2`, 1px `--color-border`, `--radius-md` and `--space-4` padding. Placeholder: "Type or paste text…". Below it, a character count (muted, `--text-sm`) and a Clear button (secondary, disabled when empty).

**Output:** the label reads "Encoded text" or "Decoded text". Use a `readonly` textarea with the input's styling plus `box-shadow: inset 3px 0 0 var(--color-accent)`. Empty state: "Result appears here as you type".
- **Copy** (primary): `navigator.clipboard.writeText`. The label shows "Copied" for 2s and a polite status is announced. Disabled when the output is empty.
- **Swap** (secondary): moves the output into the input and flips the mode. On mobile it has the icon plus visible text "Swap"; on desktop it's icon-only with `aria-label="Swap input and output"`.

**Info card:** `<aside aria-labelledby="info-title">` on `--color-surface` with `--radius-lg` and `--space-5` padding. Lift `selectedCipher` state into `App` so the content follows the selection. It contains:
- an `h2` "How the Caesar cipher works" (`--text-xl`)
- 2–3 sentences
- a monospace example (`HELLO → KHOOR`, shift 3)
- `<details><summary>General notes</summary>` with the current tips

`strong` uses `--color-text` at weight 700. Keep the list arrows, in `--color-accent`.

**Button states** (shared `.btn`, reusing the `Button` component):
| State | Primary | Secondary |
|---|---|---|
| Default | bg `--color-accent`, text `--color-on-accent`, 600 | bg `--color-surface-2`, 1px `--color-border`, text `--color-text` |
| Hover | `--color-accent-hover` | bg `--color-surface-hover` |
| Active | `--color-accent-active`, `translateY(1px)` | same transform |
| Focus-visible | `outline: 2px solid var(--color-focus); outline-offset: 2px` | same |
| Disabled | bg transparent, 1px dashed `--color-border-subtle`, text `--color-disabled-text`, `cursor: not-allowed` | same |

All buttons: `min-height: 44px; min-width: 44px; padding: 0 var(--space-4); border-radius: var(--radius-sm); transition: background-color var(--dur) ease-out, transform var(--dur) ease-out;`.

## 5. Interaction and accessibility

- Every control has a `<label for>` or a fieldset/legend. Placeholders never stand in for labels. Hints are linked with `aria-describedby`.
- Focus order follows the visual order: cipher, mode, key, input, Clear, Swap, output, Copy, info `<summary>`. Never use CSS `order:`.
- Live output: keep the visible readonly textarea and add a visually hidden `<div role="status" aria-live="polite" aria-atomic="true">`, updated with a 500ms debounce. If the result is ≤200 characters, announce the text; otherwise announce "Output updated, N characters". Copy and Swap confirmations go to the same region.
- Clear the output when the input is empty. Never pass NaN to the cipher.
- Every interactive element is at least 44×44px, with at least 8px between neighbours.
- Motion: only colour and transform transitions at 150ms, plus a `prefers-reduced-motion: reduce` override.
- Works at 320px wide and 200% zoom with no horizontal scroll. Remove fixed `min-width`s (400/300/250px).
