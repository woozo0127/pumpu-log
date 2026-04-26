// screen-stats.jsx — Stats / History / Programs (Programs > Routines > Exercises)

function ScreenStats({ t, empty = false }) {
  if (empty) {
    return (
      <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 110 }}>
        <div style={{ padding: '60px 20px 12px' }}>
          <div style={{ ...TYPE.bodySm, color: t.textDim }}>최근 12주</div>
          <h1 style={{ ...TYPE.displayMd, margin: '4px 0 0' }}>1RM 추이</h1>
        </div>
        <div style={{ padding: '14px 20px 0' }}>
          <EmptyHero t={t}
            eyebrow="아직 데이터가 없어요"
            title={<>운동을 기록하면<br/>여기에 그래프가 그려져요.</>}
            body="첫 세트를 완료하면 1RM과 부위별 볼륨이 자동으로 쌓여요."
            icon={Icon.trend(t.accent, 14)}
          />
        </div>
        <div style={{ padding: '20px 20px 0' }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: t.textDim, letterSpacing: 1.2, textTransform: 'uppercase', margin: '0 0 12px 4px' }}>
            이번 달 부위별 볼륨
          </h2>
          <Card t={t} padding={18}>
            {['가슴', '등', '하체', '어깨', '팔'].map((p, i, arr) => (
              <div key={p} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
                borderBottom: i < arr.length - 1 ? `1px solid ${t.line}` : 'none',
              }}>
                <span style={{ width: 48, fontSize: 13, fontWeight: 700, color: t.textDim }}>{p}</span>
                <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.04)' }}/>
                <span style={{ ...numStyle(13), color: t.textFaint, minWidth: 56, textAlign: 'right' }}>
                  0<span style={{ fontSize: 10, marginLeft: 2 }}>kg</span>
                </span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    );
  }

  const exercises = [
    { name: '벤치 프레스', curr: 95, prev: 87.5, points: [70, 72.5, 75, 77.5, 80, 82.5, 85, 87.5, 90, 92.5, 92.5, 95] },
    { name: '스쿼트', curr: 130, prev: 120, points: [90, 95, 100, 105, 110, 110, 115, 120, 120, 125, 125, 130] },
    { name: '데드리프트', curr: 150, prev: 145, points: [110, 115, 120, 125, 130, 135, 140, 140, 145, 145, 145, 150] },
  ];
  const [sel, setSel] = React.useState(0);
  const ex = exercises[sel];

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 110 }}>
      <div style={{ padding: '60px 20px 12px' }}>
        <div style={{ ...TYPE.bodySm, color: t.textDim }}>최근 12주</div>
        <h1 style={{ ...TYPE.displayMd, margin: '4px 0 0' }}>1RM 추이</h1>
      </div>

      <div style={{ padding: '6px 16px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {exercises.map((e, i) => (
          <PressButton key={i} onClick={() => setSel(i)} style={{
            flexShrink: 0, padding: '10px 16px', borderRadius: 16, border: 'none', cursor: 'pointer',
            background: i === sel ? t.accent : t.surface,
            color: i === sel ? t.accentInk : t.text,
            fontSize: 13, fontWeight: 700,
          }}>{e.name}</PressButton>
        ))}
      </div>

      <div style={{ padding: '14px 20px 0' }}>
        <Card t={t} padding={20}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.textDim, letterSpacing: 1.2 }}>현재 1RM</div>
              <div style={{ marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <CountUp t={t} value={ex.curr} keyOn={sel}/>
                <span style={{ fontSize: 16, color: t.textDim, fontWeight: 600 }}>kg</span>
              </div>
              <div style={{ marginTop: 4, fontSize: 12, color: t.accent, fontWeight: 700 }}>
                ▲ {(ex.curr - ex.prev).toFixed(1)}kg · 지난달 대비
              </div>
            </div>
          </div>
          <BigChart t={t} points={ex.points}/>
        </Card>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, color: t.textDim, letterSpacing: 1.2, textTransform: 'uppercase', margin: '0 0 12px 4px' }}>
          이번 달 부위별 볼륨
        </h2>
        <Card t={t} padding={18}>
          {[
            { p: '가슴', v: 12400, max: 15000 },
            { p: '등', v: 14200, max: 15000 },
            { p: '하체', v: 8900, max: 15000 },
            { p: '어깨', v: 6400, max: 15000 },
            { p: '팔', v: 5100, max: 15000 },
          ].map((b, i, arr) => (
            <VolBar key={i} t={t} part={b.p} v={b.v} max={b.max} delay={i * 90} last={i === arr.length - 1}/>
          ))}
        </Card>
      </div>
    </div>
  );
}

// Heatmap cell with staggered fade-in.
function HeatCell({ t, intensity, delay }) {
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const r = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(r);
  }, [delay]);
  const target = intensity > 0 ? 0.3 + intensity * 0.7 : 1;
  return (
    <div style={{
      aspectRatio: '1', borderRadius: 8,
      background: intensity > 0 ? t.accent : 'rgba(255,255,255,0.04)',
      opacity: shown ? target : 0,
      transform: shown ? 'scale(1)' : 'scale(0.7)',
      boxShadow: shown && intensity > 0.7 ? `0 0 6px ${t.accent}66` : 'none',
      transition: 'opacity 360ms cubic-bezier(0.22,1,0.36,1), transform 360ms cubic-bezier(0.34,1.56,0.64,1)',
    }}/>
  );
}

// Count-up number used by the 1RM display.
function CountUp({ t, value, keyOn }) {
  const [n, setN] = React.useState(0);
  const rafRef = React.useRef(0);
  React.useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const from = 0, to = value, dur = 700;
    const ease = (x) => 1 - Math.pow(1 - x, 3);
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      setN(from + (to - from) * ease(p));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, keyOn]);
  return (
    <span style={{ ...numStyle(46, 800), color: t.text }}>
      {Number.isInteger(value) ? Math.round(n) : n.toFixed(1)}
    </span>
  );
}

// Volume bar with animated width + count-up label.
function VolBar({ t, part, v, max, delay, last }) {
  const [shown, setShown] = React.useState(false);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const r = setTimeout(() => setShown(true), delay);
    const start = performance.now();
    const dur = 900;
    const ease = (x) => 1 - Math.pow(1 - x, 3);
    let raf;
    const tick = (now) => {
      const elapsed = now - start - delay;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      const p = Math.min(1, elapsed / dur);
      setCount(Math.round(v * ease(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { clearTimeout(r); cancelAnimationFrame(raf); };
  }, [v, delay]);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
      borderBottom: !last ? `1px solid ${t.line}` : 'none',
    }}>
      <span style={{ width: 48, fontSize: 13, fontWeight: 700, color: t.text }}>{part}</span>
      <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <div style={{
          width: shown ? `${(v/max)*100}%` : '0%',
          height: '100%',
          background: t.accent,
          boxShadow: `0 0 8px ${t.accent}88`,
          transition: 'width 900ms cubic-bezier(0.22,1,0.36,1)',
        }}/>
      </div>
      <span style={{ ...numStyle(13), color: t.textDim, minWidth: 56, textAlign: 'right' }}>
        {count.toLocaleString()}<span style={{ fontSize: 10, marginLeft: 2 }}>kg</span>
      </span>
    </div>
  );
}

function BigChart({ t, points }) {  const W = 320, H = 160;
  const min = Math.min(...points) * 0.95;
  const max = Math.max(...points) * 1.05;
  const sx = (i) => (i / (points.length - 1)) * W;
  const sy = (v) => H - ((v - min) / (max - min)) * H;
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${sx(i)},${sy(p)}`).join(' ');
  const area = path + ` L${W},${H} L0,${H} Z`;
  const lastIdx = points.length - 1;

  // Re-trigger animation when points change (tab switch)
  const key = points.join(',');
  const pathRef = React.useRef(null);
  const [len, setLen] = React.useState(0);
  const [phase, setPhase] = React.useState('hidden'); // hidden -> drawing -> done

  React.useLayoutEffect(() => {
    setPhase('hidden');
    if (pathRef.current) {
      const L = pathRef.current.getTotalLength();
      setLen(L);
    }
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => setPhase('drawing'));
      return () => cancelAnimationFrame(r2);
    });
    const tDone = setTimeout(() => setPhase('done'), 1100);
    return () => { cancelAnimationFrame(r1); clearTimeout(tDone); };
  }, [key]);

  return (
    <div style={{ width: '100%', overflow: 'visible' }}>
      <svg width="100%" viewBox={`-4 -10 ${W+8} ${H+24}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="ga2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={t.accent} stopOpacity="0.35"/>
            <stop offset="100%" stopColor={t.accent} stopOpacity="0"/>
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map(y => (
          <line key={y} x1="0" x2={W} y1={H * y} y2={H * y} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 4"/>
        ))}
        <path d={area} fill="url(#ga2)" style={{
          opacity: phase === 'hidden' ? 0 : 1,
          transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1) 200ms',
        }}/>
        <path
          ref={pathRef}
          d={path}
          stroke={t.accent}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: `drop-shadow(0 0 6px ${t.accent}aa)`,
            strokeDasharray: len,
            strokeDashoffset: phase === 'hidden' ? len : 0,
            transition: phase === 'hidden' ? 'none' : 'stroke-dashoffset 1000ms cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        {points.map((p, i) => {
          const isLast = i === lastIdx;
          const delay = (i / (points.length - 1)) * 900 + 100;
          return (
            <circle
              key={i}
              cx={sx(i)} cy={sy(p)}
              r={isLast ? 5 : 2.5}
              fill={isLast ? t.accent : t.text}
              fillOpacity={isLast ? 1 : 0.3}
              style={{
                filter: isLast ? `drop-shadow(0 0 6px ${t.accent})` : 'none',
                opacity: phase === 'hidden' ? 0 : 1,
                transform: phase === 'hidden' ? 'scale(0)' : 'scale(1)',
                transformOrigin: `${sx(i)}px ${sy(p)}px`,
                transformBox: 'view-box',
                transition: `opacity 200ms ease ${delay}ms, transform 400ms cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
              }}
            />
          );
        })}
        <text
          x={sx(lastIdx) - 4} y={sy(points[lastIdx]) - 12}
          textAnchor="end" fill={t.accent} fontSize="11" fontWeight="800"
          style={{
            opacity: phase === 'done' ? 1 : 0,
            transition: 'opacity 400ms ease',
          }}
        >{points[lastIdx]}kg</text>
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, padding: '0 4px', fontSize: 10, fontWeight: 600, color: t.textFaint, letterSpacing: 0.5 }}>
        <span>2월</span><span>3월</span><span>4월</span>
      </div>
    </div>
  );
}

// ─── History screen ────────────────────────────────────────────────────────
function ScreenHistory({ t, onPickSession, empty = false }) {
  if (empty) {
    return (
      <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 110 }}>
        <div style={{ padding: '60px 20px 14px' }}>
          <div style={{ ...TYPE.bodySm, color: t.textDim }}>총 0회</div>
          <h1 style={{ ...TYPE.displayMd, margin: '4px 0 0' }}>운동 기록</h1>
        </div>

        {/* Empty heatmap */}
        <div style={{ padding: '8px 20px 8px' }}>
          <Card t={t} padding={14}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} style={{
                  aspectRatio: '1', borderRadius: 8,
                  background: 'rgba(255,255,255,0.04)',
                }}/>
              ))}
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10, color: t.textFaint, fontWeight: 600 }}>
              <span>4주 전</span>
              <span>이번주</span>
            </div>
          </Card>
        </div>

        <div style={{ padding: '12px 20px 0' }}>
          <EmptyHero t={t}
            eyebrow="아직 기록이 없어요"
            title={<>첫 운동을 시작해보세요.</>}
            body="완료한 운동은 자동으로 여기에 쌓여요."
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke={t.accent} strokeWidth="2"/>
                <path d="M8 9h8M8 13h8M8 17h5" stroke={t.accent} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
          />
        </div>
      </div>
    );
  }

  const items = [
    { date: '4월 23일 · 목', name: 'PPL · Push Day', vol: '3,000kg', sets: 18, dur: '48분', pr: 1 },
    { date: '4월 22일 · 수', name: 'PPL · Leg Day', vol: '5,200kg', sets: 21, dur: '64분' },
    { date: '4월 20일 · 월', name: 'PPL · Pull Day', vol: '2,800kg', sets: 16, dur: '52분', pr: 2 },
    { date: '4월 18일 · 토', name: 'PPL · Push Day', vol: '2,950kg', sets: 18, dur: '50분' },
    { date: '4월 17일 · 금', name: 'PPL · Leg Day', vol: '5,100kg', sets: 20, dur: '62분' },
    { date: '4월 15일 · 수', name: 'PPL · Pull Day', vol: '2,700kg', sets: 15, dur: '49분' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 110 }}>
      <div style={{ padding: '60px 20px 14px' }}>
        <div style={{ ...TYPE.bodySm, color: t.textDim }}>총 32회 · 4월</div>
        <h1 style={{ ...TYPE.displayMd, margin: '4px 0 0' }}>운동 기록</h1>
      </div>

      <div style={{ padding: '8px 20px 8px' }}>
        <Card t={t} padding={14}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {Array.from({ length: 28 }).map((_, i) => {
              const intensity = [0, 0.3, 0.7, 0, 0.5, 0.9, 0.4, 0.6, 0, 0.8, 0.5, 0.3, 0.7, 0.6, 0, 0.4, 0.9, 0.5, 0.7, 0.3, 0.6, 0.8, 0, 0.5, 0.9, 0.6, 0, 0.4][i];
              return (
                <HeatCell key={i} t={t} intensity={intensity} delay={i * 18}/>
              );
            })}
          </div>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10, color: t.textFaint, fontWeight: 600 }}>
            <span>4주 전</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span>적음</span>
              {[0.3, 0.5, 0.7, 1].map(o => (
                <div key={o} style={{ width: 10, height: 10, borderRadius: 4, background: t.accent, opacity: o }}/>
              ))}
              <span>많음</span>
            </div>
            <span>이번주</span>
          </div>
        </Card>
      </div>

      <div style={{ padding: '12px 20px 0' }}>
        {items.map((s, i) => (
          <PressRow key={i} onClick={() => onPickSession && onPickSession(i)} style={{
            display: 'flex', gap: 14, padding: '14px 0',
            borderBottom: i < items.length - 1 ? `1px solid ${t.line}` : 'none',
            cursor: 'pointer',
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: 'rgba(255,255,255,0.04)', flexShrink: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: t.textDim, letterSpacing: 0.3 }}>{s.date.split('·')[1].trim()}</span>
              <span style={{ ...numStyle(15), color: t.text }}>{s.date.split('·')[0].replace('월','').replace('일','').split(' ')[1]}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{s.name}</span>
                {s.pr && <Chip t={t} accent>PR ×{s.pr}</Chip>}
              </div>
              <div style={{ fontSize: 12, color: t.textDim, marginTop: 4, display: 'flex', gap: 10 }}>
                <span>{s.dur}</span>
                <span>·</span>
                <span>{s.sets}세트</span>
                <span>·</span>
                <span>{s.vol}</span>
              </div>
            </div>
            {Icon.chevR(t.textFaint, 14)}
          </PressRow>
        ))}
      </div>
    </div>
  );
}

// ─── Programs screen — list of programs (each has multiple daily routines) ─
function ScreenPrograms({ t, onPick, onAdd, empty = false }) {
  if (empty) {
    return (
      <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 110 }}>
        <div style={{ padding: '60px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ ...TYPE.bodySm, color: t.textDim }}>0개의 활성 프로그램</div>
            <h1 style={{ ...TYPE.displayMd, margin: '4px 0 0' }}>프로그램</h1>
          </div>
          <PressButton onClick={onAdd} style={{
            width: 44, height: 44, borderRadius: 16, padding: 0,
            background: t.accent, color: t.accentInk, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{Icon.plus(t.accentInk, 22)}</PressButton>
        </div>

        <div style={{ padding: '12px 20px 0' }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: t.textDim, letterSpacing: 1.5, textTransform: 'uppercase', margin: '8px 0 12px 4px' }}>
            내 프로그램
          </h2>
          <EmptyHero t={t}
            eyebrow="아직 프로그램이 없어요"
            title={<>첫 프로그램을 만들거나<br/>템플릿에서 골라보세요.</>}
            body="템플릿으로 빠르게 시작하거나, 처음부터 직접 만들 수 있어요."
            ctaLabel="프로그램 추가"
            onCta={onAdd}
            icon={Icon.dumbbell(t.accent, 14)}
          />
        </div>

        {/* Templates still shown — entry point for new users */}
        <div style={{ padding: '24px 20px 0' }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: t.textDim, letterSpacing: 1.5, textTransform: 'uppercase', margin: '8px 0 12px 4px' }}>
            템플릿
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { id: '531', name: '5/3/1 BBB', sub: 'Strength · 빅3 중심', days: 4 },
              { id: 'sl', name: 'StrongLifts 5×5', sub: '입문 · 풀바디', days: 3 },
              { id: 'nsuns', name: 'nSuns 5/3/1', sub: 'Strength · 6일', days: 6 },
            ].map((p) => (
              <PressRow key={p.id} onClick={onAdd} style={{
                background: t.surface, borderRadius: 16, padding: 14,
                border: `1px solid ${t.line}`,
                display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {Icon.dumbbell(t.text, 22)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: t.textDim, marginTop: 2 }}>{p.sub} · {p.days}일</div>
                </div>
                {Icon.chevR(t.textFaint, 14)}
              </PressRow>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const myPrograms = [
    {
      id: 'ppl',
      name: 'PPL Hypertrophy',
      sub: '6일 분할 · 12주차',
      days: 6,
      progress: 0.75,
      active: true,
      routines: ['Push Day', 'Pull Day', 'Leg Day'],
    },
    {
      id: 'upper-lower',
      name: 'Upper / Lower',
      sub: '4일 분할 · 8주차',
      days: 4,
      progress: 0.4,
      routines: ['Upper A', 'Lower A', 'Upper B', 'Lower B'],
    },
  ];
  const templates = [
    { id: '531', name: '5/3/1 BBB', sub: 'Strength · 빅3 중심', days: 4, routines: ['Bench', 'Squat', 'Press', 'Deadlift'] },
    { id: 'sl', name: 'StrongLifts 5×5', sub: '입문 · 풀바디', days: 3, routines: ['Workout A', 'Workout B'] },
    { id: 'nsuns', name: 'nSuns 5/3/1', sub: 'Strength · 6일', days: 6, routines: ['Bench', 'Squat', 'OHP', 'Deadlift'] },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 110 }}>
      <div style={{ padding: '60px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ ...TYPE.bodySm, color: t.textDim }}>{myPrograms.length}개의 활성 프로그램</div>
          <h1 style={{ ...TYPE.displayMd, margin: '4px 0 0' }}>프로그램</h1>
        </div>
        <PressButton onClick={onAdd} style={{
          width: 44, height: 44, borderRadius: 16, padding: 0,
          background: t.accent, color: t.accentInk, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{Icon.plus(t.accentInk, 22)}</PressButton>
      </div>

      {/* My Programs — big cards */}
      <div style={{ padding: '12px 20px 0' }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, color: t.textDim, letterSpacing: 1.5, textTransform: 'uppercase', margin: '8px 0 12px 4px' }}>
          내 프로그램
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {myPrograms.map((p, i) => (
            <PressRow key={p.id} onClick={() => onPick && onPick(p.id)} style={{
              borderRadius: 24, padding: 18, cursor: 'pointer',
              background: p.active ? t.surface : t.surface,
              border: `1px solid ${p.active ? t.accent + '55' : t.line}`,
              boxShadow: p.active ? `0 0 32px ${t.accent}1f` : 'none',
              position: 'relative', overflow: 'hidden',
            }}>
              {p.active && <div style={{
                position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: '50%',
                background: `radial-gradient(circle, ${t.accent}22 0%, transparent 70%)`, pointerEvents: 'none',
              }}/>}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 16,
                  background: p.active ? t.grad : 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {Icon.dumbbell(p.active ? t.accentInk : t.text, 26)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 17, fontWeight: 800, color: t.text, letterSpacing: -0.3 }}>{p.name}</span>
                    {p.active && <Chip t={t} accent>ACTIVE</Chip>}
                  </div>
                  <div style={{ fontSize: 12, color: t.textDim, marginTop: 3 }}>{p.sub}</div>
                </div>
                {Icon.chevR(t.textFaint, 14)}
              </div>
              {/* Routines preview chips */}
              <div style={{ position: 'relative', marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {p.routines.map((r, j) => (
                  <span key={j} style={{
                    fontSize: 11, fontWeight: 600, padding: '5px 10px', borderRadius: 8,
                    background: 'rgba(255,255,255,0.05)', color: t.textDim,
                  }}>{r}</span>
                ))}
              </div>
              {/* progress */}
              <div style={{ position: 'relative', marginTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ width: `${p.progress * 100}%`, height: '100%', background: p.active ? t.accent : t.textFaint }}/>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: t.textDim, letterSpacing: 0.5 }}>
                  {Math.round(p.progress * 100)}%
                </span>
              </div>
            </PressRow>
          ))}
        </div>
      </div>

      {/* Templates */}
      <div style={{ padding: '20px 20px 0' }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, color: t.textDim, letterSpacing: 1.5, textTransform: 'uppercase', margin: '8px 0 12px 4px' }}>
          템플릿
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {templates.map((p) => (
            <PressRow key={p.id} onClick={onAdd} style={{
              background: t.surface, borderRadius: 16, padding: 14,
              border: `1px solid ${t.line}`,
              display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {Icon.dumbbell(t.text, 22)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{p.name}</div>
                <div style={{ fontSize: 11, color: t.textDim, marginTop: 2 }}>{p.sub} · {p.days}일</div>
              </div>
              {Icon.chevR(t.textFaint, 14)}
            </PressRow>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Program Detail — list of daily routines ──────────────────────────────
function ScreenProgram({ t, onBack, onPickRoutine }) {
  const program = {
    name: 'PPL Hypertrophy',
    sub: '6일 분할 · 12주차 · 4/6주',
    week: 4,
    totalWeeks: 6,
    routines: [
      { id: 'push', name: 'Push Day', sub: '가슴·어깨·삼두', n: 6, est: 52, days: '월·목', last: '4월 23일', active: true },
      { id: 'pull', name: 'Pull Day', sub: '등·이두', n: 5, est: 48, days: '화·금', last: '4월 20일' },
      { id: 'legs', name: 'Leg Day', sub: '하체·코어', n: 7, est: 64, days: '수·토', last: '4월 22일' },
    ],
  };

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 110 }}>
      {/* Hero */}
      <div style={{
        position: 'relative', padding: '60px 20px 24px',
        background: t.grad, color: t.accentInk,
        borderRadius: '0 0 28px 28px', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -60, bottom: -60, width: 240, height: 240,
          borderRadius: '50%', background: 'rgba(255,255,255,0.15)', filter: 'blur(40px)',
        }}/>
        <BackButton t={t} onClick={onBack} onHero/>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, opacity: 0.7 }}>PROGRAM</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1.0, margin: '6px 0 12px' }}>{program.name}</h1>
          <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.85 }}>{program.sub}</div>
          {/* week dots */}
          <div style={{ display: 'flex', gap: 4, marginTop: 14 }}>
            {Array.from({ length: program.totalWeeks }).map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 4, borderRadius: 4,
                background: i < program.week ? t.accentInk : 'rgba(0,0,0,0.15)',
              }}/>
            ))}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, marginTop: 6, opacity: 0.7, letterSpacing: 0.5 }}>
            WEEK {program.week} / {program.totalWeeks}
          </div>
        </div>
      </div>

      {/* Routines list */}
      <div style={{ padding: '22px 20px 0' }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, color: t.textDim, letterSpacing: 1.2, textTransform: 'uppercase', margin: '0 0 12px 4px' }}>
          일별 루틴 · {program.routines.length}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {program.routines.map((r, i) => (
            <PressRow key={r.id} onClick={() => onPickRoutine && onPickRoutine()} style={{
              background: t.surface, borderRadius: 16, padding: 16,
              border: `1px solid ${r.active ? t.accent + '55' : t.line}`,
              boxShadow: r.active ? `0 0 24px ${t.accent}22` : 'none',
              cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: r.active ? t.accent : 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ ...numStyle(15), color: r.active ? t.accentInk : t.text }}>D{i+1}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{r.name}</span>
                    {r.active && <Chip t={t} accent>NEXT</Chip>}
                  </div>
                  <div style={{ fontSize: 12, color: t.textDim, marginTop: 2 }}>
                    {r.sub} · {r.n}운동 · 약 {r.est}분
                  </div>
                </div>
                {Icon.chevR(t.textFaint, 14)}
              </div>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: t.textFaint, fontWeight: 600 }}>
                <span>{r.days}</span>
                <span>마지막 · {r.last}</span>
              </div>
            </PressRow>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenStats, ScreenHistory, ScreenPrograms, ScreenProgram });
