// screen-onboarding.jsx — Onboarding (3 steps)

function ScreenOnboarding({ t, onDone }) {
  const [step, setStep] = React.useState(0);
  const slides = [
    {
      eyebrow: 'PUMPU LOG',
      title: '오늘보다\n조금 더 무겁게.',
      body: '점진적 과부하를 게임처럼.\n매 세트 기록하고 다음 목표를 자동으로 받아보세요.',
      art: 'one',
    },
    {
      eyebrow: '01 / 03',
      title: '세트 하나에\n한 번의 탭.',
      body: '운동 중에는 가볍게.\n무게와 횟수만 바꾸고 체크하면 됩니다.',
      art: 'two',
    },
    {
      eyebrow: '02 / 03',
      title: '지난 기록을 보며\n무게를 정해요.',
      body: '직전 PR과 1RM이 한눈에 보여서\n오늘의 목표 무게를 빠르게 설정할 수 있어요.',
      art: 'three',
    },
  ];
  const s = slides[step];

  return (
    <div style={{
      width: '100%', height: '100%',
      background: t.bg, color: t.text,
      display: 'flex', flexDirection: 'column',
      paddingTop: 64,
    }}>
      {/* Visual */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {s.art === 'one' && <ArtRings t={t} />}
        {s.art === 'two' && <ArtCheck t={t} />}
        {s.art === 'three' && <ArtChart t={t} />}
      </div>

      {/* Copy */}
      <div style={{ padding: '0 28px 24px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.accent, letterSpacing: 2, marginBottom: 14 }}>
          {s.eyebrow}
        </div>
        <h1 style={{
          fontSize: 38, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.4,
          margin: 0, whiteSpace: 'pre-line', color: t.text,
        }}>{s.title}</h1>
        <p style={{
          fontSize: 15, lineHeight: 1.5, color: t.textDim,
          marginTop: 14, whiteSpace: 'pre-line',
        }}>{s.body}</p>
      </div>

      {/* Pagination + CTA */}
      <div style={{ padding: '0 20px 50px' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 18, paddingLeft: 8 }}>
          {slides.map((_, i) => (
            <div key={i} style={{
              height: 4, flex: i === step ? 2 : 1,
              borderRadius: 2,
              background: i === step ? t.accent : 'rgba(255,255,255,0.12)',
              transition: 'all .3s ease',
            }} />
          ))}
        </div>
        <PressButton onClick={() => step < 2 ? setStep(step + 1) : onDone()} style={{
          width: '100%', height: 60, borderRadius: 22,
          background: t.accent, color: t.accentInk,
          border: 'none', cursor: 'pointer',
          fontSize: 17, fontWeight: 700, letterSpacing: -0.2,
          boxShadow: `0 0 40px ${t.accent}55`,
        }}>
          {step < 2 ? '계속' : '시작하기'}
        </PressButton>
      </div>
    </div>
  );
}

// ─── Onboarding artwork ─────────────────────────────────────────────────────
function ArtRings({ t }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="320" height="320" viewBox="0 0 320 320" style={{ filter: `drop-shadow(0 0 60px ${t.accent}66)` }}>
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={t.accent}/>
            <stop offset="100%" stopColor={t.accent2}/>
          </linearGradient>
        </defs>
        {/* concentric arcs */}
        <circle cx="160" cy="160" r="135" stroke="rgba(255,255,255,0.05)" strokeWidth="20" fill="none"/>
        <circle cx="160" cy="160" r="135" stroke="url(#g1)" strokeWidth="20" fill="none"
          strokeDasharray="848" strokeDashoffset="180" strokeLinecap="round" transform="rotate(-90 160 160)"/>
        <circle cx="160" cy="160" r="100" stroke="rgba(255,255,255,0.05)" strokeWidth="16" fill="none"/>
        <circle cx="160" cy="160" r="100" stroke={t.accent} strokeWidth="16" fill="none"
          strokeDasharray="628" strokeDashoffset="220" strokeLinecap="round" strokeOpacity="0.7" transform="rotate(-90 160 160)"/>
        <circle cx="160" cy="160" r="68" stroke="rgba(255,255,255,0.05)" strokeWidth="14" fill="none"/>
        <text x="160" y="156" textAnchor="middle" dominantBaseline="central" fill={t.text} style={{ ...numStyle(56) }}>72</text>
        <text x="160" y="194" textAnchor="middle" dominantBaseline="central" fill={t.textDim} fontSize="11" fontWeight="700" letterSpacing="2">% 1RM</text>
      </svg>
    </div>
  );
}

function ArtCheck({ t }) {
  const sets = [
    { w: 60, r: 12, done: true },
    { w: 70, r: 10, done: true },
    { w: 80, r: 8, done: true },
    { w: 85, r: 6, done: false, active: true },
    { w: 90, r: 4, done: false },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '40px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
      {sets.map((s, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px', borderRadius: 16,
          background: s.active ? `${t.accent}14` : t.surface,
          border: `1px solid ${s.active ? t.accent : t.line}`,
          boxShadow: s.active ? `0 0 24px ${t.accent}33` : 'none',
          opacity: s.done ? 0.55 : 1,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 10,
            background: s.done ? t.accent : 'transparent',
            border: s.done ? 'none' : `1.5px solid ${t.textFaint}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {s.done ? Icon.check(t.accentInk, 16) : <span style={{ fontSize: 12, fontWeight: 700, color: t.textFaint }}>{i+1}</span>}
          </div>
          <div style={{ ...numStyle(20), color: t.text, flex: 1 }}>{s.w}<span style={{ fontSize: 11, color: t.textDim, marginLeft: 4, fontWeight: 600 }}>kg</span></div>
          <div style={{ ...numStyle(20), color: t.text }}>{s.r}<span style={{ fontSize: 11, color: t.textDim, marginLeft: 4, fontWeight: 600 }}>회</span></div>
        </div>
      ))}
    </div>
  );
}

function ArtChart({ t }) {
  const points = [40, 55, 50, 65, 70, 68, 80, 85, 95, 92, 100, 110];
  const W = 280, H = 200;
  const max = 120;
  const path = points.map((p, i) => {
    const x = (i / (points.length - 1)) * W;
    const y = H - (p / max) * H;
    return `${i === 0 ? 'M' : 'L'}${x},${y}`;
  }).join(' ');
  const area = path + ` L${W},${H} L0,${H} Z`;
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={W + 40} height={H + 40} viewBox={`-20 -20 ${W+40} ${H+40}`}>
        <defs>
          <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={t.accent} stopOpacity="0.4"/>
            <stop offset="100%" stopColor={t.accent} stopOpacity="0"/>
          </linearGradient>
        </defs>
        {[0, 0.33, 0.66].map(y => (
          <line key={y} x1="0" x2={W} y1={H * y} y2={H * y} stroke="rgba(255,255,255,0.05)"/>
        ))}
        <path d={area} fill="url(#ga)"/>
        <path d={path} stroke={t.accent} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 8px ${t.accent})` }}/>
        {points.map((p, i) => {
          const x = (i / (points.length - 1)) * W;
          const y = H - (p / max) * H;
          if (i === points.length - 1) return <circle key={i} cx={x} cy={y} r="6" fill={t.accent}/>;
          return null;
        })}
      </svg>
    </div>
  );
}

window.ScreenOnboarding = ScreenOnboarding;
