// screens.jsx — All screen components for the workout tracker

// ─── Shared primitives ─────────────────────────────────────────────────────
const T = {
  // Theme tone palettes — keyed by tweak `tone`
  neon: {
    bg: '#0A0B0A',
    surface: '#15171A',
    surfaceHi: '#1E2126',
    line: 'rgba(255,255,255,0.08)',
    text: '#FAFAFA',
    textDim: 'rgba(250,250,250,0.55)',
    textFaint: 'rgba(250,250,250,0.32)',
    accent: '#C8FF1C',         // lime
    accentInk: '#0A0B0A',
    accent2: '#9CFF00',
    grad: 'linear-gradient(135deg, #C8FF1C 0%, #5DFF00 100%)',
    danger: '#FF4D6A',
  },
  midnight: {
    bg: '#0A0E1A',
    surface: '#131827',
    surfaceHi: '#1B2236',
    line: 'rgba(255,255,255,0.06)',
    text: '#F5F7FA',
    textDim: 'rgba(245,247,250,0.55)',
    textFaint: 'rgba(245,247,250,0.32)',
    accent: '#A8FF35',
    accentInk: '#0A0E1A',
    accent2: '#7BD8FF',
    grad: 'linear-gradient(135deg, #A8FF35 0%, #7BD8FF 100%)',
    danger: '#FF6B81',
  },
  carbon: {
    bg: '#0E0E0E',
    surface: '#1A1A1A',
    surfaceHi: '#242424',
    line: 'rgba(255,255,255,0.07)',
    text: '#FFFFFF',
    textDim: 'rgba(255,255,255,0.55)',
    textFaint: 'rgba(255,255,255,0.32)',
    accent: '#D4FF00',
    accentInk: '#0E0E0E',
    accent2: '#FF7A00',
    grad: 'linear-gradient(135deg, #D4FF00 0%, #FF7A00 100%)',
    danger: '#FF3B5C',
  },
};

const FONT = `-apple-system, "SF Pro Display", "SF Pro Text", "Pretendard", system-ui, sans-serif`;

// Numeric display font — heavy + tight
const numStyle = (size, weight = 800) => ({
  fontFamily: FONT,
  fontWeight: weight,
  fontSize: size,
  letterSpacing: -0.04 * size,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: 1,
});

// SVG icon helpers (stroke-based)
const Icon = {
  flame: (c, s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3c1 4 4 5 4 9a4 4 0 11-8 0c0-2 1-3 1-4-2 1-3 3-3 5a6 6 0 1012 0c0-5-3-7-6-10z" fill={c}/>
    </svg>
  ),
  play: (c, s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M7 5l13 7-13 7V5z"/></svg>
  ),
  pause: (c, s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
  ),
  check: (c, s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  plus: (c, s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke={c} strokeWidth="2.4" strokeLinecap="round"/></svg>
  ),
  minus: (c, s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke={c} strokeWidth="2.4" strokeLinecap="round"/></svg>
  ),
  chevR: (c, s = 14) => (
    <svg width={s} height={s} viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  chevL: (c, s = 14) => (
    <svg width={s} height={s} viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  bolt: (c, s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>
  ),
  trophy: (c, s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M7 4h10v4a5 5 0 01-10 0V4z" fill={c}/>
      <path d="M5 5H3v3a3 3 0 003 3M19 5h2v3a3 3 0 01-3 3" stroke={c} strokeWidth="1.6"/>
      <path d="M9 14h6v3H9zM7 19h10v2H7z" fill={c}/>
    </svg>
  ),
  dumbbell: (c, s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <rect x="2" y="9" width="3" height="6" rx="1"/>
      <rect x="5" y="7" width="2" height="10" rx="1"/>
      <rect x="7" y="11" width="10" height="2"/>
      <rect x="17" y="7" width="2" height="10" rx="1"/>
      <rect x="19" y="9" width="3" height="6" rx="1"/>
    </svg>
  ),
  clock: (c, s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8"/>
      <path d="M12 7v5l3 2" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  trend: (c, s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 17l6-6 4 4 8-8M21 7v5h-5" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
};

// Chip
function Chip({ children, t, accent = false }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      height: 18, padding: '0 7px', borderRadius: 999,
      background: accent ? t.accent : 'rgba(255,255,255,0.06)',
      color: accent ? t.accentInk : t.textDim,
      fontSize: 9, fontWeight: 700, letterSpacing: 0.4,
      textTransform: 'uppercase',
    }}>{children}</span>
  );
}

// Glow border card
function Card({ children, t, glow = false, padding = 16, style = {} }) {
  return (
    <div style={{
      background: t.surface,
      borderRadius: 20,
      padding,
      position: 'relative',
      border: `1px solid ${t.line}`,
      boxShadow: glow ? `0 0 0 1px ${t.accent}66, 0 0 32px ${t.accent}22` : 'none',
      ...style,
    }}>{children}</div>
  );
}

// Top bar (custom, not the iOS NavBar — we want full control)
function TopBar({ t, title, sub, onBack, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '8px 20px 14px', minHeight: 44,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
        {onBack && (
          <button onClick={onBack} style={{
            width: 36, height: 36, borderRadius: 12,
            background: 'rgba(255,255,255,0.06)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', padding: 0,
          }}>
            {Icon.chevL(t.text, 16)}
          </button>
        )}
        <div>
          {sub && <div style={{ fontSize: 11, fontWeight: 600, color: t.textDim, textTransform: 'uppercase', letterSpacing: 1 }}>{sub}</div>}
          <div style={{ fontSize: 18, fontWeight: 700, color: t.text, letterSpacing: -0.3 }}>{title}</div>
        </div>
      </div>
      {right}
    </div>
  );
}

// Tab bar (bottom)
function TabBar({ t, current, onChange }) {
  const tabs = [
    { id: 'home', label: '홈', icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill={c}><path d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V11z"/></svg> },
    { id: 'programs', label: '프로그램', icon: (c) => Icon.dumbbell(c, 24) },
    { id: 'history', label: '기록', icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="3" stroke={c} strokeWidth="2"/><path d="M8 9h8M8 13h8M8 17h5" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg> },
    { id: 'stats', label: '통계', icon: (c) => Icon.trend(c, 22) },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      paddingBottom: 28, paddingTop: 10, paddingLeft: 16, paddingRight: 16,
      background: `linear-gradient(180deg, ${t.bg}00 0%, ${t.bg} 30%)`,
      zIndex: 5,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-around',
        background: t.surface,
        borderRadius: 24,
        padding: '8px 4px',
        border: `1px solid ${t.line}`,
      }}>
        {tabs.map(tab => {
          const active = current === tab.id;
          return (
            <button key={tab.id} onClick={() => onChange(tab.id)} style={{
              flex: 1, padding: '8px 4px', border: 'none',
              background: 'transparent', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            }}>
              {tab.icon(active ? t.accent : t.textFaint)}
              <span style={{
                fontSize: 10, fontWeight: 700,
                color: active ? t.accent : t.textFaint,
                letterSpacing: 0.3,
              }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Empty-state hero card — matches Home's empty hero visual language.
// Used across Programs/History/Stats so the empty look is consistent.
function EmptyHero({ t, eyebrow, title, body, ctaLabel, onCta, icon }) {
  return (
    <div style={{
      background: t.surface, borderRadius: 28, padding: '26px 22px',
      position: 'relative', overflow: 'hidden',
      border: `1.5px dashed ${t.line}`,
    }}>
      {/* dotted grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle, ${t.textFaint} 1px, transparent 1px)`,
        backgroundSize: '14px 14px',
        opacity: 0.25,
        pointerEvents: 'none',
      }}/>
      <div style={{ position: 'relative' }}>
        {eyebrow && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: t.accent, letterSpacing: 1.2 }}>
            {icon || Icon.flame(t.accent, 14)}
            {eyebrow}
          </div>
        )}
        <div style={{ marginTop: 12, fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: -0.5, lineHeight: 1.25 }}>
          {title}
        </div>
        {body && (
          <div style={{ marginTop: 8, fontSize: 13, color: t.textDim, fontWeight: 500, lineHeight: 1.5 }}>
            {body}
          </div>
        )}
        {ctaLabel && (
          <div style={{ marginTop: 18 }}>
            <PressButton onClick={onCta} style={{
              height: 44, padding: '0 18px', borderRadius: 24,
              background: t.accent, color: t.accentInk,
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke={t.accentInk} strokeWidth="2.4" strokeLinecap="round"/>
              </svg>
              {ctaLabel}
            </PressButton>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { T, FONT, Icon, Chip, Card, TopBar, TabBar, numStyle, EmptyHero });
