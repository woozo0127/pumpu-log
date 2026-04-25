// screen-home.jsx — Home / Dashboard

function ScreenHome({ t, onStart, onTab, onRoutine }) {
  const today = '4월 25일 · 토요일';
  const stats = [
    { label: '이번 주', value: '4', unit: '/ 5회' },
    { label: '연속', value: '12', unit: '일' },
    { label: '총 볼륨', value: '8.2', unit: 'k kg' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 110 }}>
      {/* Header */}
      <div style={{ padding: '60px 20px 16px' }}>
        <div style={{ fontSize: 13, color: t.textDim, fontWeight: 600, letterSpacing: 0.2 }}>{today}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.8, margin: 0 }}>오늘의 운동</h1>
          <PressButton style={{
            width: 40, height: 40, borderRadius: 14,
            background: t.surface, border: `1px solid ${t.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', padding: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 00-5-5.9V4a1 1 0 10-2 0v1.1A6 6 0 006 11v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke={t.text} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </PressButton>
        </div>
      </div>

      {/* Hero — Today's workout */}
      <div style={{ padding: '4px 20px 0' }}>
        <PressRow onClick={onStart} style={{
          background: t.grad, borderRadius: 28, padding: '22px 22px 24px',
          position: 'relative', overflow: 'hidden', cursor: 'pointer',
          boxShadow: `0 20px 50px -10px ${t.accent}55`,
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
                height: 44, padding: '0 18px', borderRadius: 22,
                background: t.accentInk, color: t.accent,
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: 14, fontWeight: 700,
              }}>
                {Icon.play(t.accent, 14)} 시작
              </div>
            </div>
          </div>
        </PressRow>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 8, padding: '20px 20px 0' }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            flex: 1, background: t.surface, borderRadius: 18,
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
                <span style={{ ...numStyle(28), color: t.text }}>8,240</span>
                <span style={{ fontSize: 13, color: t.textDim, fontWeight: 600 }}>kg</span>
              </div>
              <div style={{ fontSize: 11, color: t.textFaint, fontWeight: 600, marginTop: 2 }}>
                지난 주 7,360kg
              </div>
            </div>
            <Chip t={t} accent>+12%</Chip>
          </div>
          <WeekChart t={t}/>
        </Card>
      </div>

    </div>
  );
}

// Weekly volume bar chart.
function WeekChart({ t }) {
  const days = [
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
                  borderRadius: 6,
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
      padding: '14px 16px', borderRadius: 18,
      background: t.surface, border: `1px solid ${t.line}`,
      cursor: 'pointer',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 14,
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
