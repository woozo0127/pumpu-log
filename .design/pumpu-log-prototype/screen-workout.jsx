// screen-workout.jsx — Workout in progress (the core screen)
// Two layouts: 'focus' (single set hero) and 'list' (all sets visible)

function ScreenWorkout({ t, layout = 'focus', onFinish, onBack }) {
  const [exIdx, setExIdx] = React.useState(0);
  const [elapsed, setElapsed] = React.useState(847); // 14:07
  const [confirmExit, setConfirmExit] = React.useState(false);
  const [restTime, setRestTime] = React.useState(0); // seconds remaining
  const [restGoal, setRestGoal] = React.useState(90);

  React.useEffect(() => {
    const id = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    if (restTime <= 0) return;
    const id = setInterval(() => setRestTime(r => Math.max(0, r - 1)), 1000);
    return () => clearInterval(id);
  }, [restTime]);

  const initialExercises = [
    { name: '벤치 프레스', sub: '바벨 · 가슴', sets: [
      { w: 60, r: 12, done: true },
      { w: 80, r: 8, done: true },
      { w: 90, r: 6, done: false },
      { w: 90, r: 6, done: false },
    ]},
    { name: '인클라인 덤벨 프레스', sub: '덤벨 · 상부 가슴', sets: [
      { w: 22, r: 10, done: false },
      { w: 24, r: 8, done: false },
      { w: 26, r: 8, done: false },
    ]},
    { name: '오버헤드 프레스', sub: '바벨 · 어깨', sets: [
      { w: 40, r: 10, done: false },
      { w: 50, r: 6, done: false },
      { w: 50, r: 6, done: false },
    ]},
  ];
  const [exercises, setExercises] = React.useState(initialExercises);
  const ex = exercises[exIdx];
  const activeSet = ex.sets.findIndex(s => !s.done);
  const safeActive = activeSet === -1 ? ex.sets.length - 1 : activeSet;
  const totalDone = exercises.reduce((a, e) => a + e.sets.filter(s => s.done).length, 0);
  const totalSets = exercises.reduce((a, e) => a + e.sets.length, 0);
  const progress = totalDone / totalSets;

  const updateSet = (i, key, delta) => {
    setExercises(prev => prev.map((e, idx) => idx === exIdx ? {
      ...e,
      sets: e.sets.map((s, j) => j === i ? { ...s, [key]: Math.max(0, s[key] + delta) } : s),
    } : e));
  };

  const completeSet = (i) => {
    setExercises(prev => prev.map((e, idx) => idx === exIdx ? {
      ...e, sets: e.sets.map((s, j) => j === i ? { ...s, done: !s.done } : s),
    } : e));
    if (!ex.sets[i].done) setRestTime(restGoal);
  };

  const fmt = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, display: 'flex', flexDirection: 'column' }}>
      {/* Top bar — workout meta */}
      <div style={{ padding: '56px 16px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <BackButton t={t} onClick={() => setConfirmExit(true)} mb={0}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textDim, letterSpacing: 1.2, textTransform: 'uppercase' }}>PUSH DAY</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 1 }}>
            {Icon.clock(t.text, 14)}
            <span style={{ ...numStyle(15), color: t.text }}>{fmt(elapsed)}</span>
            <span style={{ fontSize: 12, color: t.textDim, marginLeft: 4 }}>· {totalDone}/{totalSets} 세트</span>
          </div>
        </div>
        <PressButton onClick={onFinish} style={{
          padding: '8px 14px', height: 36, borderRadius: 12,
          background: t.accent, color: t.accentInk, border: 'none', cursor: 'pointer',
          fontSize: 13, fontWeight: 700, letterSpacing: -0.1,
        }}>완료</PressButton>
      </div>

      {/* Progress bar */}
      <div style={{ padding: '0 16px 8px' }}>
        <div style={{ height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          <div style={{ width: `${progress*100}%`, height: '100%', background: t.accent, transition: 'width .3s' }}/>
        </div>
      </div>

      {/* Exercise nav (chips) */}
      <div style={{ padding: '6px 16px 12px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {exercises.map((e, i) => {
          const done = e.sets.every(s => s.done);
          const active = i === exIdx;
          return (
            <PressButton key={i} onClick={() => setExIdx(i)} style={{
              flexShrink: 0, padding: '8px 14px', borderRadius: 12, border: 'none', cursor: 'pointer',
              background: active ? t.accent : t.surface,
              color: active ? t.accentInk : (done ? t.textDim : t.text),
              fontSize: 12, fontWeight: 700,
              opacity: done && !active ? 0.5 : 1,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {done && Icon.check(active ? t.accentInk : t.accent, 12)}
              {e.name}
            </PressButton>
          );
        })}
      </div>

      {/* Body — depending on layout */}
      <div style={{ flex: 1, overflow: 'auto', paddingBottom: 40 }}>
        {layout === 'focus'
          ? <FocusLayout t={t} ex={ex} active={safeActive} updateSet={updateSet} completeSet={completeSet}/>
          : <ListLayout t={t} ex={ex} updateSet={updateSet} completeSet={completeSet}/>}
      </div>

      {/* Rest timer overlay */}
      {restTime > 0 && (
        <RestTimer t={t} time={restTime} goal={restGoal}
          onAdd={() => setRestTime(r => r + 15)}
          onSkip={() => setRestTime(0)}
          onSetGoal={(g) => { setRestGoal(g); setRestTime(g); }}/>
      )}

      {/* Exit confirm dialog */}
      {confirmExit && (
        <ExitDialog t={t}
          onCancel={() => setConfirmExit(false)}
          onConfirm={() => { setConfirmExit(false); onBack && onBack(); }}/>
      )}
    </div>
  );
}

// ─── Exit confirmation dialog ─────────────────────────────────────────────
// Reuses the app's button system (height 56, radius 18, weight 700) with
// a destructive color treatment instead of the lime accent.
// PressButton is loaded globally from ui-press.jsx.
function ExitDialog({ t, onCancel, onConfirm }) {
  const DANGER = '#ff5a5a';
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);
  // Closing animation: fade/slide out, then call the real callback.
  const close = (cb) => {
    setShown(false);
    setTimeout(() => cb && cb(), 260);
  };
  const handleCancel = () => close(onCancel);
  const handleConfirm = () => close(onConfirm);
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 30,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      padding: '0 12px 28px',
    }}>
      {/* Scrim */}
      <div onClick={handleCancel} style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.62)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        opacity: shown ? 1 : 0,
        transition: 'opacity 220ms ease',
      }}/>
      {/* Sheet — same surface treatment as workout cards */}
      <div style={{
        position: 'relative',
        width: '100%',
        background: t.surface,
        borderRadius: 28,
        border: `1px solid ${t.line}`,
        padding: 20,
        boxShadow: '0 24px 60px -10px rgba(0,0,0,0.7)',
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 240ms ease, transform 360ms cubic-bezier(0.32,0.72,0.24,1.1)',
      }}>
        {/* Header — left-aligned, no centered icon block */}
        <div style={{
          fontSize: 11, fontWeight: 700,
          color: DANGER, letterSpacing: 1.4, textTransform: 'uppercase',
          marginBottom: 8,
        }}>
          운동 중단
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: -0.6, lineHeight: 1.2 }}>
          정말 그만둘까요?
        </div>
        <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.5, color: t.textDim }}>
          완료하지 않은 세트는 저장되지 않아요. 지금까지의 진행이 모두 사라집니다.
        </div>

        {/* Buttons — same height/radius/weight as primary CTA, color swapped */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 22 }}>
          <PressButton onClick={handleConfirm} size="md" style={{
            width: '100%', 
            background: DANGER, color: '#fff',
            border: 'none', cursor: 'pointer',
            fontSize: 16, fontWeight: 700, letterSpacing: -0.2,
          }}>
            그만두기
          </PressButton>
          <PressButton onClick={handleCancel} size="md" style={{
            width: '100%',
            background: 'rgba(255,255,255,0.06)', color: t.text,
            border: `1px solid ${t.line}`, cursor: 'pointer',
          }}>
            계속 운동하기
          </PressButton>
        </div>
      </div>
    </div>
  );
}

// ─── Focus layout — big numbers, one set at a time ─────────────────────────
function FocusLayout({ t, ex, active, updateSet, completeSet }) {
  const set = ex.sets[active];
  return (
    <div style={{ padding: '4px 20px 0' }}>
      {/* Title */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.6, margin: 0 }}>{ex.name}</h2>
        <div style={{ fontSize: 13, color: t.textDim, marginTop: 4 }}>{ex.sub}</div>
      </div>

      {/* Hero set card */}
      <div style={{
        background: t.surface, borderRadius: 28, padding: 20,
        border: `1px solid ${t.accent}66`, boxShadow: `0 0 40px ${t.accent}22`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <Chip t={t} accent>SET {active + 1} / {ex.sets.length}</Chip>
          <span style={{ fontSize: 11, color: t.textDim, fontWeight: 600 }}>이전 · 80kg × 8</span>
        </div>

        {/* Stepper rows */}
        <Stepper t={t} label="WEIGHT" value={set.w} unit="kg"
          onMinus={() => updateSet(active, 'w', -2.5)}
          onPlus={() => updateSet(active, 'w', 2.5)}/>
        <div style={{ height: 12 }}/>
        <Stepper t={t} label="REPS" value={set.r} unit="회"
          onMinus={() => updateSet(active, 'r', -1)}
          onPlus={() => updateSet(active, 'r', 1)}/>

        {/* Complete button */}
        <PressButton onClick={() => completeSet(active)} size="md" style={{
          width: '100%', marginTop: 18,
          background: set.done ? 'rgba(255,255,255,0.06)' : t.accent,
          color: set.done ? t.text : t.accentInk,
          border: set.done ? `1px solid ${t.line}` : 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          {set.done ? '완료 취소' : <>{Icon.check(t.accentInk, 18)} 세트 완료</>}
        </PressButton>
      </div>

      {/* All sets — small */}
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {ex.sets.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 14px', borderRadius: 12,
            background: i === active ? `${t.accent}10` : 'transparent',
            border: i === active ? `1px solid ${t.accent}55` : `1px solid transparent`,
            opacity: s.done ? 0.5 : 1,
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 8,
              background: s.done ? t.accent : 'transparent',
              border: s.done ? 'none' : `1.5px solid ${t.textFaint}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {s.done ? Icon.check(t.accentInk, 14) : <span style={{ fontSize: 11, fontWeight: 700, color: t.textFaint }}>{i+1}</span>}
            </div>
            <span style={{ ...TYPE.bodySm, color: t.textDim, flex: 1 }}>SET {i+1}</span>
            <span style={{ ...numStyle(15), color: t.text }}>{s.w}<span style={{ fontSize: 10, color: t.textDim, marginLeft: 3, fontWeight: 600 }}>kg</span></span>
            <span style={{ ...numStyle(15), color: t.text, marginLeft: 14 }}>{s.r}<span style={{ fontSize: 10, color: t.textDim, marginLeft: 3, fontWeight: 600 }}>회</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stepper({ t, label, value, unit, onMinus, onPlus }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)', borderRadius: 16,
      padding: '14px 8px',
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <PressButton onClick={onMinus} style={btnSq(t)}>{Icon.minus(t.text, 18)}</PressButton>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: t.textDim, letterSpacing: 1.5 }}>{label}</div>
        <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6 }}>
          <span style={{ ...numStyle(48, 800), color: t.text }}>{value}</span>
          <span style={{ fontSize: 14, color: t.textDim, fontWeight: 600 }}>{unit}</span>
        </div>
      </div>
      <PressButton onClick={onPlus} style={btnSq(t)}>{Icon.plus(t.text, 18)}</PressButton>
    </div>
  );
}
const btnSq = (t) => ({
  width: 48, height: 48, borderRadius: 16, padding: 0,
  background: t.surfaceHi, border: `1px solid ${t.line}`, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
});

// ─── List layout — all sets editable in a table ────────────────────────────
function ListLayout({ t, ex, updateSet, completeSet }) {
  return (
    <div style={{ padding: '4px 20px 0' }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>{ex.name}</h2>
        <div style={{ fontSize: 13, color: t.textDim, marginTop: 2 }}>{ex.sub}</div>
      </div>

      {/* table header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '36px 1fr 1fr 56px',
        padding: '0 14px 8px', alignItems: 'center', gap: 8,
        fontSize: 10, fontWeight: 700, color: t.textFaint, letterSpacing: 1.2,
      }}>
        <span>SET</span>
        <span style={{ textAlign: 'center' }}>WEIGHT</span>
        <span style={{ textAlign: 'center' }}>REPS</span>
        <span/>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ex.sets.map((s, i) => {
          const isActive = !s.done && ex.sets.findIndex(x => !x.done) === i;
          return (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '36px 1fr 1fr 56px',
              alignItems: 'center', gap: 8,
              padding: 12, borderRadius: 16,
              background: s.done ? 'rgba(255,255,255,0.03)' : t.surface,
              border: `1px solid ${isActive ? t.accent + '66' : t.line}`,
              boxShadow: isActive ? `0 0 24px ${t.accent}22` : 'none',
              opacity: s.done ? 0.55 : 1,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: s.done ? t.accent : 'rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto',
              }}>
                {s.done
                  ? Icon.check(t.accentInk, 14)
                  : <span style={{ fontSize: 12, fontWeight: 700, color: isActive ? t.accent : t.textDim }}>{i+1}</span>}
              </div>
              <InlineStepper t={t} value={s.w} unit="kg" onMinus={() => updateSet(i, 'w', -2.5)} onPlus={() => updateSet(i, 'w', 2.5)}/>
              <InlineStepper t={t} value={s.r} unit="회" onMinus={() => updateSet(i, 'r', -1)} onPlus={() => updateSet(i, 'r', 1)}/>
              <PressButton onClick={() => completeSet(i)} style={{
                width: 44, height: 44, borderRadius: 12, padding: 0,
                background: s.done ? 'rgba(255,255,255,0.06)' : t.accent,
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {Icon.check(s.done ? t.textFaint : t.accentInk, 18)}
              </PressButton>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InlineStepper({ t, value, unit, onMinus, onPlus }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '4px 6px',
    }}>
      <PressButton onClick={onMinus} size="xs" iconOnly style={miniBtn(t)}>{Icon.minus(t.textDim, 14)}</PressButton>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <span style={{ ...numStyle(18), color: t.text }}>{value}</span>
        <span style={{ fontSize: 10, color: t.textDim, marginLeft: 2, fontWeight: 600 }}>{unit}</span>
      </div>
      <PressButton onClick={onPlus} size="xs" iconOnly style={miniBtn(t)}>{Icon.plus(t.textDim, 14)}</PressButton>
    </div>
  );
}
// xs prop owns 32×32 sizing; this stays for color/background only.
const miniBtn = (t) => ({
  background: 'transparent', border: 'none', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
});

// ─── Rest Timer overlay ────────────────────────────────────────────────────
function RestTimer({ t, time, goal, onAdd, onSkip, onSetGoal }) {
  const fmt = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
  const pct = (goal - time) / goal;
  const C = 2 * Math.PI * 70;
  return (
    <div style={{
      position: 'absolute', left: 16, right: 16, bottom: 24, zIndex: 10,
      background: t.surface, border: `1px solid ${t.accent}55`,
      borderRadius: 24, padding: 18,
      boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 60px ${t.accent}33`,
      display: 'flex', alignItems: 'center', gap: 16,
    }}>
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        <svg width="80" height="80" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none"/>
          <circle cx="80" cy="80" r="70" stroke={t.accent} strokeWidth="10" fill="none"
            strokeDasharray={C} strokeDashoffset={C * pct}
            strokeLinecap="round" transform="rotate(-90 80 80)"
            style={{ transition: 'stroke-dashoffset 1s linear', filter: `drop-shadow(0 0 6px ${t.accent})` }}/>
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...numStyle(20, 800), color: t.text, fontVariantNumeric: 'tabular-nums' }}>{fmt(time)}</span>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.accent, letterSpacing: 1.2 }}>휴식 중</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginTop: 2 }}>다음 세트까지</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          <PressButton onClick={onAdd} size="xs" style={pillBtn(t)}>+15초</PressButton>
          <PressButton onClick={onSkip} size="xs" style={pillBtn(t, true)}>건너뛰기</PressButton>
        </div>
      </div>
    </div>
  );
}
// xs prop owns 32×32 sizing; this stays for color/background only.
const pillBtn = (t, dim) => ({
  background: dim ? 'rgba(255,255,255,0.06)' : t.accent,
  color: dim ? t.text : t.accentInk,
  border: 'none', cursor: 'pointer',
  fontSize: 12, fontWeight: 700,
});

window.ScreenWorkout = ScreenWorkout;
