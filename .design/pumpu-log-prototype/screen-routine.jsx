// screen-routine.jsx — Routine detail (preview before starting)

function ScreenRoutine({ t, onStart, onBack }) {
  const exercises = [
    { name: '벤치 프레스', sub: '바벨 · 가슴', sets: [{w: 60, r: 12}, {w: 80, r: 8}, {w: 90, r: 6}, {w: 90, r: 6}, {w: 90, r: 6}, {w: 80, r: 8}], pr: '95kg' },
    { name: '인클라인 덤벨 프레스', sub: '덤벨 · 상부 가슴', sets: [{w: 22, r: 10}, {w: 24, r: 8}, {w: 26, r: 8}], pr: '28kg' },
    { name: '오버헤드 프레스', sub: '바벨 · 어깨', sets: [{w: 40, r: 10}, {w: 50, r: 6}, {w: 50, r: 6}], pr: '55kg' },
    { name: '래터럴 레이즈', sub: '덤벨 · 측면 어깨', sets: [{w: 8, r: 15}, {w: 10, r: 12}, {w: 10, r: 12}] },
    { name: '딥스', sub: '맨몸 · 삼두', sets: [{w: 0, r: 12}, {w: 0, r: 10}, {w: 0, r: 8}] },
    { name: '트라이셉 푸시다운', sub: '케이블 · 삼두', sets: [{w: 25, r: 12}, {w: 30, r: 10}, {w: 30, r: 10}] },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 110 }}>
      {/* Hero header */}
      <div style={{
        position: 'relative', padding: '60px 20px 28px',
        background: t.grad, color: t.accentInk,
        borderRadius: '0 0 28px 28px', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -60, bottom: -60, width: 240, height: 240,
          borderRadius: '50%', background: 'rgba(255,255,255,0.15)', filter: 'blur(40px)',
        }}/>
        <BackButton t={t} onClick={onBack} onHero/>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, opacity: 0.7 }}>DAY 4 · PUSH</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1.2, margin: '6px 0 14px' }}>Push Day</h1>
          <div style={{ display: 'flex', gap: 16 }}>
            <Stat label="운동" value="6"/>
            <Sep/>
            <Stat label="세트" value="20"/>
            <Sep/>
            <Stat label="시간" value="52" unit="분"/>
            <Sep/>
            <Stat label="볼륨" value="3.2" unit="t"/>
          </div>
        </div>
      </div>

      {/* Exercise list */}
      <div style={{ padding: '20px 20px 0' }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, color: t.textDim, letterSpacing: 1.2, textTransform: 'uppercase', margin: '0 0 12px 4px' }}>
          오늘의 운동 · {exercises.length}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {exercises.map((ex, i) => (
            <div key={i} style={{
              background: t.surface, border: `1px solid ${t.line}`,
              borderRadius: 16, padding: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 12,
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ ...numStyle(13), color: t.textDim }}>{String(i+1).padStart(2,'0')}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.text, letterSpacing: -0.2 }}>{ex.name}</div>
                  <div style={{ fontSize: 12, color: t.textDim, marginTop: 2 }}>{ex.sub} · {ex.sets.length}세트</div>
                </div>
                {ex.pr && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '4px 8px', borderRadius: 8,
                    background: `${t.accent}15`,
                  }}>
                    {Icon.trophy(t.accent, 13)}
                    <span style={{ fontSize: 11, fontWeight: 700, color: t.accent }}>{ex.pr}</span>
                  </div>
                )}
              </div>
              {/* Set chips — single horizontal scroll row */}
              <SetChipRow t={t} sets={ex.sets} />
            </div>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 20px 38px',
        background: `linear-gradient(180deg, ${t.bg}00 0%, ${t.bg} 30%)`,
      }}>
        <PressButton onClick={onStart} size="md" style={{
          width: '100%', borderRadius: 24, 
          background: t.accent, color: t.accentInk,
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          {Icon.play(t.accentInk, 16)} 운동 시작
        </PressButton>
      </div>
    </div>
  );
}

function SetChipRow({ t, sets }) {
  const wrapRef = React.useRef(null);
  const [overflow, setOverflow] = React.useState({ left: false, right: false });
  const update = React.useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    setOverflow({
      left: el.scrollLeft > 2,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 2,
    });
  }, []);
  React.useEffect(() => {
    update();
    const el = wrapRef.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => { el.removeEventListener('scroll', update); ro.disconnect(); };
  }, [update, sets]);

  return (
    <div style={{ position: 'relative', marginTop: 12, marginLeft: -16, marginRight: -16 }}>
      <div
        ref={wrapRef}
        style={{
          display: 'flex', gap: 6,
          overflowX: 'auto', overflowY: 'hidden',
          padding: '0 16px',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <style>{`.pl-chiprow::-webkit-scrollbar{display:none}`}</style>
        {sets.map((s, j) => (
          <div key={j} style={{
            flex: '0 0 auto',
            padding: '6px 10px', borderRadius: 8,
            background: 'rgba(255,255,255,0.04)',
            fontSize: 12, color: t.textDim,
            fontVariantNumeric: 'tabular-nums',
            whiteSpace: 'nowrap',
          }}>
            {s.w > 0 ? `${s.w}kg × ${s.r}` : `${s.r}회`}
          </div>
        ))}
      </div>
      {/* fade masks signal more content */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: 0, width: 16,
        background: `linear-gradient(90deg, ${t.surface} 0%, ${t.surface}00 100%)`,
        pointerEvents: 'none',
        opacity: overflow.left ? 1 : 0,
        transition: 'opacity 200ms ease',
      }}/>
      <div style={{
        position: 'absolute', top: 0, bottom: 0, right: 0, width: 24,
        background: `linear-gradient(270deg, ${t.surface} 0%, ${t.surface}00 100%)`,
        pointerEvents: 'none',
        opacity: overflow.right ? 1 : 0,
        transition: 'opacity 200ms ease',
      }}/>
    </div>
  );
}

function Stat({ label, value, unit }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.6, letterSpacing: 1 }}>{label}</div>
      <div style={{ marginTop: 2, ...numStyle(20, 800) }}>
        {value}{unit && <span style={{ fontSize: 11, marginLeft: 2 }}>{unit}</span>}
      </div>
    </div>
  );
}

function Sep() {
  return <div style={{ width: 1, background: 'rgba(0,0,0,0.15)' }}/>;
}

window.ScreenRoutine = ScreenRoutine;
