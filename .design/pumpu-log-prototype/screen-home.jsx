// screen-home.jsx — Home / Dashboard

function ScreenHome({ t, onStart, onTab, onRoutine, onAddProgram, onSettings, empty = false }) {
  const today = '4월 25일 · 토요일';
  const stats = empty ? [
    { label: '이번 주', value: '0', unit: '/ 0회' },
    { label: '연속', value: '0', unit: '일' },
    { label: '총 볼륨', value: '0', unit: 'kg' },
  ] : [
    { label: '이번 주', value: '4', unit: '/ 5회' },
    { label: '연속', value: '12', unit: '일' },
    { label: '총 볼륨', value: '8.2', unit: 'k kg' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 110 }}>
      {/* Header */}
      <div style={{ padding: '60px 20px 16px' }}>
        <div style={{ ...TYPE.bodySm, color: t.textDim, letterSpacing: 0.2 }}>{today}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
          <h1 style={{ ...TYPE.displayMd, margin: 0 }}>오늘의 운동</h1>
          <PressButton onClick={onSettings} style={{
            width: 40, height: 40, borderRadius: 16,
            background: t.surface, border: `1px solid ${t.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', padding: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke={t.text} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h0a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke={t.text} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </PressButton>
        </div>
      </div>

      {/* Hero — Today's workout (or empty state CTA) */}
      <div style={{ padding: '4px 20px 0' }}>
        {empty ? (
          <PressRow onClick={onAddProgram} style={{
            background: t.surface, borderRadius: 28, padding: '26px 22px',
            position: 'relative', overflow: 'hidden', cursor: 'pointer',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: t.accent, letterSpacing: 1.2 }}>
                {Icon.flame(t.accent, 14)}
                시작하기
              </div>
              <div style={{ marginTop: 12, fontSize: 24, fontWeight: 800, color: t.text, letterSpacing: -0.6, lineHeight: 1.2 }}>
                첫 프로그램을<br/>추가해보세요.
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: t.textDim, fontWeight: 500, lineHeight: 1.5 }}>
                템플릿을 고르거나 직접 만들 수 있어요.
              </div>
              <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  height: 44, padding: '0 18px', borderRadius: 24,
                  background: t.accent, color: t.accentInk,
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 14, fontWeight: 700,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke={t.accentInk} strokeWidth="2.4" strokeLinecap="round"/>
                  </svg>
                  프로그램 추가
                </div>
              </div>
            </div>
          </PressRow>
        ) : (
          <PressRow onClick={onStart} style={{
            background: t.grad, borderRadius: 28, padding: '22px 22px 24px',
            position: 'relative', overflow: 'hidden', cursor: 'pointer',
          }}>
            {/* Decorative glow */}
            <div style={{
              position: 'absolute', right: -40, top: -40, width: 180, height: 180,
              borderRadius: '50%', background: 'rgba(255,255,255,0.18)', filter: 'blur(20px)',
            }}/>
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: t.accentInk, letterSpacing: 1.2, opacity: 0.7 }}>
                {Icon.flame(t.accentInk, 14)}
                오늘의 운동 · DAY 4
              </div>
              <div style={{ marginTop: 12, fontSize: 26, fontWeight: 800, color: t.accentInk, letterSpacing: -0.8, lineHeight: 1.1 }}>
                Push Day<br/>가슴 · 어깨 · 삼두
              </div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 14, color: t.accentInk }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.6, letterSpacing: 1 }}>운동</div>
                    <div style={{ ...numStyle(18, 800), marginTop: 2 }}>6</div>
                  </div>
                  <div style={{ width: 1, background: 'rgba(0,0,0,0.15)' }}/>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.6, letterSpacing: 1 }}>예상</div>
                    <div style={{ ...numStyle(18, 800), marginTop: 2 }}>52<span style={{ fontSize: 11, marginLeft: 2 }}>분</span></div>
                  </div>
                </div>
                <div style={{
                  height: 44, padding: '0 18px', borderRadius: 24,
                  background: t.accentInk, color: t.accent,
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 14, fontWeight: 700,
                }}>
                  {Icon.play(t.accent, 14)} 시작
                </div>
              </div>
            </div>
          </PressRow>
        )}
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 8, padding: '20px 20px 0' }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            flex: 1, background: t.surface, borderRadius: 16,
            padding: '14px 12px', border: `1px solid ${t.line}`,
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: t.textDim, letterSpacing: 1, textTransform: 'uppercase' }}>{s.label}</div>
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 3 }}>
              <span style={{ ...numStyle(22), color: t.text }}>{s.value}</span>
              <span style={{ fontSize: 11, color: t.textDim, fontWeight: 600 }}>{s.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* This week chart */}
      <div style={{ padding: '20px 20px 0' }}>
        <Card t={t} padding={18}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.textDim, letterSpacing: 1 }}>이번 주 볼륨</div>
              <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ ...numStyle(28), color: empty ? t.textFaint : t.text }}>{empty ? '0' : '8,240'}</span>
                <span style={{ ...TYPE.bodySm, color: t.textDim }}>kg</span>
              </div>
              {!empty && (
                <div style={{ fontSize: 11, color: t.textFaint, fontWeight: 600, marginTop: 2 }}>
                  지난 주 7,360kg
                </div>
              )}
            </div>
            {!empty && <Chip t={t} accent>+12%</Chip>}
          </div>
          <WeekChart t={t} empty={empty}/>
        </Card>
      </div>

    </div>
  );
}

// Weekly volume bar chart.
function WeekChart({ t, empty = false }) {
  const days = empty ? [
    { d: '월', v: 0, rest: true },
    { d: '화', v: 0, rest: true },
    { d: '수', v: 0, rest: true },
    { d: '목', v: 0, rest: true },
    { d: '금', v: 0, rest: true },
    { d: '토', v: 0, today: true },
    { d: '일', v: 0, rest: true },
  ] : [
    { d: '월', v: 1620, done: true },
    { d: '화', v: 1180, done: true },
    { d: '수', v: 0,    rest: true },
    { d: '목', v: 2040, done: true, peak: true },
    { d: '금', v: 1480, done: true },
    { d: '토', v: 0,    today: true },
    { d: '일', v: 0,    rest: true },
  ];
  const max = 2200;
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const r = setTimeout(() => setShown(true), 80);
    return () => clearTimeout(r);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 96, padding: '0 2px' }}>
        {days.map((d, i) => {
          const pct = (d.v / max) * 100;
          const isRest = d.rest;
          const isToday = d.today;
          const isDone = d.done;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%' }}>
              <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end', position: 'relative', justifyContent: 'center' }}>
                {/* peak label */}
                {d.peak && (
                  <div style={{
                    position: 'absolute',
                    bottom: `${pct}%`,
                    left: '50%',
                    transform: 'translate(-50%, -4px)',
                    fontSize: 10, fontWeight: 700, color: t.accent,
                    whiteSpace: 'nowrap',
                    opacity: shown ? 1 : 0,
                    transition: 'opacity 300ms ease 900ms',
                    letterSpacing: 0.2,
                  }}>2,040</div>
                )}
                <div style={{
                  width: '70%',
                  height: isRest
                    ? 4
                    : isToday
                      ? '100%'
                      : (shown ? `${pct}%` : '0%'),
                  borderRadius: 8,
                  background: isToday
                    ? 'transparent'
                    : isRest
                      ? 'rgba(255,255,255,0.06)'
                      : isDone
                        ? `linear-gradient(180deg, ${t.accent} 0%, ${t.accent}cc 100%)`
                        : 'rgba(255,255,255,0.08)',
                  border: isToday ? `1.5px dashed ${t.accent}88` : 'none',
                  boxShadow: isDone && !isRest ? `0 0 12px ${t.accent}44` : 'none',
                  transition: `height 800ms cubic-bezier(0.22,1,0.36,1) ${100 + i * 70}ms`,
                }}/>
              </div>
              <span style={{
                fontSize: 10,
                color: isToday ? t.accent : isRest ? t.textFaint : t.textDim,
                fontWeight: 700,
                letterSpacing: 0.4,
              }}>{d.d}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RoutineRow({ t, name, sub, days, badge, onClick }) {
  return (
    <PressRow onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px', borderRadius: 16,
      background: t.surface, border: `1px solid ${t.line}`,
      cursor: 'pointer',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 16,
        background: badge ? t.accent : 'rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {Icon.dumbbell(badge ? t.accentInk : t.text, 22)}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{name}</span>
          {badge && <Chip t={t} accent>{badge}</Chip>}
        </div>
        <div style={{ fontSize: 12, color: t.textDim, marginTop: 2 }}>{sub} · {days}</div>
      </div>
      {Icon.chevR(t.textFaint, 14)}
    </PressRow>
  );
}

window.ScreenHome = ScreenHome;
