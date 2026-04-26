// tokens.jsx — Pumpu Log design tokens
//
// One source of truth for type, spacing, radius, shadow.
// Color is already centralized in `T` (screens.jsx). This file owns
// everything else and exposes helpers that pre-compose common patterns.
//
// Tokens are named by pure UI scale (t-shirt sizing), not by where
// they're used. A token of role X may be used in many contexts —
// pin the meaning to the SCALE, not to the first place it shipped.

// ─── TYPE ──────────────────────────────────────────────────────────────────
//
// Three families × t-shirt sizes:
//   display* — oversized hero numerics & titles
//   heading* — section / page / item titles
//   body*    — paragraph / sub / inline meta text
//   label*   — small functional text (captions, footnotes)
//   eyebrow* — uppercase mini-labels (with letterSpacing)
//
// Each token is a complete style object — spread with `...`.
// Color is intentionally NOT included; pass `color: t.text` at call site.
const TYPE = {
  // Display — biggest numerics & oversized titles
  displayLg:  { fontSize: 38, fontWeight: 800, letterSpacing: -1.2, lineHeight: 1.0 },
  displayMd:  { fontSize: 28, fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.15 },
  displaySm:  { fontSize: 24, fontWeight: 800, letterSpacing: -0.6, lineHeight: 1.2 },

  // Heading — section / card / item titles
  headingLg:  { fontSize: 18, fontWeight: 700, letterSpacing: -0.3, lineHeight: 1.25 },
  headingMd:  { fontSize: 16, fontWeight: 700, letterSpacing: -0.2, lineHeight: 1.3 },
  headingSm:  { fontSize: 15, fontWeight: 700, letterSpacing: -0.1, lineHeight: 1.3 },

  // Body — paragraph / inline text
  bodyLg:     { fontSize: 15, fontWeight: 500, letterSpacing: 0,    lineHeight: 1.5 },
  bodyMd:     { fontSize: 14, fontWeight: 500, letterSpacing: 0,    lineHeight: 1.5 },
  bodySm:     { fontSize: 13, fontWeight: 600, letterSpacing: 0,    lineHeight: 1.4 },

  // Label — small functional text
  labelMd:    { fontSize: 12, fontWeight: 600, letterSpacing: 0,    lineHeight: 1.4 },
  labelSm:    { fontSize: 11, fontWeight: 600, letterSpacing: 0,    lineHeight: 1.4 },

  // Eyebrow — uppercase mini-labels with letterSpacing
  eyebrowLg:  { fontSize: 11, fontWeight: 700, letterSpacing: 1.2,  lineHeight: 1.2, textTransform: 'uppercase' },
  eyebrowSm:  { fontSize: 10, fontWeight: 700, letterSpacing: 1.4,  lineHeight: 1.2, textTransform: 'uppercase' },
};

// ─── SPACING ───────────────────────────────────────────────────────────────
// 4px base scale.
const SP = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 60,
};

// ─── RADIUS ────────────────────────────────────────────────────────────────
// 4px-stepped t-shirt scale. Pin meaning to the size, not the role.
const R = {
  full: 999,
  '3xl': 28,  // hero / oversized cards
  '2xl': 24,
  xl:   20,
  lg:   16,
  md:   12,
  sm:    8,
  xs:    4,
};

// ─── SHADOW ────────────────────────────────────────────────────────────────
const SHADOW = {
  none:   'none',
  inset:  '0 1px 0 rgba(255,255,255,0.04) inset',
  press:  'inset 0 0 0 1px rgba(0,0,0,0.2)',
  glow:   (accent) => `0 0 0 1px ${accent}66, 0 0 32px ${accent}22`,
};

// ─── BORDERS ───────────────────────────────────────────────────────────────
const BORDER = {
  thin:   (t) => `1px solid ${t.line}`,
  dashed: (t) => `1.5px dashed ${t.line}`,
  accent: (t) => `1px solid ${t.accent}`,
};

window.TYPE = TYPE;
window.SP = SP;
window.R = R;
window.SHADOW = SHADOW;
window.BORDER = BORDER;

// ─── BackButton — 36×36 chev-left, two background variants ────────────────
// `onHero={true}` for use over a gradient hero (uses translucent black
// instead of translucent white). `mb` adds bottom margin (default 18 for
// page headers, 0 inside flex rows).
function BackButton({ t, onClick, onHero = false, mb = 18, color }) {
  return (
    <PressButton onClick={onClick} style={{
      width: 36, height: 36, borderRadius: 12, padding: 0,
      marginBottom: mb,
      background: onHero ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.06)',
      border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {Icon.chevL(color || (onHero ? t.accentInk : t.text), 16)}
    </PressButton>
  );
}
window.BackButton = BackButton;
