// screen-session.jsx — Past workout session detail (read-only)

function ScreenSession({ t, onBack }) {
  const [note, setNote] = React.useState('컴디션 좋았음. 벤치 PR 갱신. 마지막 세트는 스펬 도움 받음.');

  // Mocked detail for "4월 23일 · Push Day" (matches History first row)
  const session = {
    date: '4월 23일 · 목요일',
    name: 'PPL · Push Day',
    program: 'PPL Hypertrophy · 4주차',
    startedAt: '오후 7:12',
    endedAt: '오후 8:00',
    dur: '48분',
    totalVol: '3,000',
    totalSets: 18,
    totalReps: 122,
    avgRest: '1:32',
    note: '컨디션 좋았음. 벤치 PR 갱신. 마지막 세트는 스폿 도움 받음.',
    prs: [
      { name: '벤치 프레스', detail: '90kg × 6', delta: '+2.5kg' },
    ],
    exercises: [
      {
        name: '벤치 프레스', sub: '바벨 · 가슴',
        sets: [
          { kind: 'W', w: 40, r: 12 },
          { kind: '1', w: 70, r: 8 },
          { kind: '2', w: 80, r: 8 },
          { kind: '3', w: 87.5, r: 6 },
          { kind: '4', w: 90, r: 6, pr: true },
        ],
      },
      {
        name: '인클라인 덤벨 프레스', sub: '덤벨 · 상부 가슴',
        sets: [
          { kind: '1', w: 22.5, r: 10 },
          { kind: '2', w: 25, r: 9 },
          { kind: '3', w: 25, r: 8 },
        ],
      },
      {
        name: '케이블 플라이', sub: '케이블 · 가슴',
        sets: [
          { kind: '1', w: 15, r: 12 },
          { kind: '2', w: 17.5, r: 12 },
          { kind: '3', w: 20, r: 10 },
        ],
      },
      {
        name: '사이드 레터럴 레이즈', sub: '덤벨 · 측면 어깨',
        sets: [
          { kind: '1', w: 8, r: 15 },
          { kind: '2', w: 10, r: 12 },
          { kind: '3', w: 10, r: 12 },
          { kind: '4', w: 10, r: 10 },
        ],
      },
      {
        name: '트라이셉 푸시다운', sub: '케이블 · 삼두',
        sets: [
          { kind: '1', w: 25, r: 12 },
          { kind: '2', w: 30, r: 10 },
          { kind: '3', w: 30, r: 10 },
        ],
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 30 }}>
      {/* Header */}
      <div style={{ padding: '60px 20px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <PressButton onClick={onBack} style={{
            width: 36, height: 36, borderRadius: 12,
            background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
          }}>{Icon.chevL(t.text, 16)}</PressButton>
          <PressButton style={{
            width: 36, height: 36, borderRadius: 12,
            background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
            color: t.text,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v12M12 3l-4 4M12 3l4 4" stroke={t.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6" stroke={t.text} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </PressButton>
        </div>
        <div style={{ fontSize: 12, color: t.textDim, fontWeight: 600 }}>{session.date} · {session.startedAt}</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.8, margin: '4px 0 4px' }}>{session.name}</h1>
        <div style={{ fontSize: 12, color: t.textFaint, fontWeight: 600 }}>{session.program}</div>
      </div>

      {/* Stats grid */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 1, background: t.line, borderRadius: 18, overflow: 'hidden', border: `1px solid ${t.line}` }}>
          {[
            { l: '시간', v: session.dur },
            { l: '볼륨', v: session.totalVol, u: 'kg' },
            { l: '세트', v: String(session.totalSets) },
            { l: '횟수', v: String(session.totalReps) },
          ].map((s, i) => (
            <div key={i} style={{ background: t.surface, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: t.textDim, letterSpacing: 1.2, marginBottom: 6 }}>{s.l}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2 }}>
                <span style={{ ...numStyle(18, 800), color: t.text }}>{s.v}</span>
                {s.u && <span style={{ fontSize: 10, color: t.textDim, fontWeight: 600 }}>{s.u}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PR badges */}
      {session.prs.length > 0 && (
        <div style={{ padding: '14px 20px 0' }}>
          {session.prs.map((pr, i) => (
            <div key={i} style={{
              background: t.grad, borderRadius: 16, padding: '12px 14px',
              display: 'flex', alignItems: 'center', gap: 12,
              color: t.accentInk,
              boxShadow: `0 6px 20px ${t.accent}33`,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 11,
                background: 'rgba(0,0,0,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {Icon.trophy(t.accentInk, 18)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, fontWeight: 800, opacity: 0.7, letterSpacing: 1.5 }}>NEW PR</div>
                <div style={{ fontSize: 14, fontWeight: 800, marginTop: 1, letterSpacing: -0.3 }}>{pr.name} · {pr.detail}</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 800, padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.18)' }}>
                {pr.delta}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Note */}
      {/* Note (editable) */}
      <div style={{ padding: '14px 20px 0' }}>
        <Card t={t} padding={14}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
              <path d="M4 4h16v16H4z" stroke={t.textFaint} strokeWidth="1.5"/>
              <path d="M8 9h8M8 13h8M8 17h5" stroke={t.textFaint} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: t.textDim, letterSpacing: 1.2 }}>NOTE</span>
                {note !== session.note && (
                  <span style={{ fontSize: 9, fontWeight: 700, color: t.accent, letterSpacing: 1 }}>• 수정됨</span>
                )}
              </div>
              <textarea
                className="pl-flush"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="이 세션에 대한 메모를 남겨보세요..."
                rows={Math.max(2, note.split('\n').length)}
                style={{
                  width: '100%', padding: '2px 0 4px',
                  background: 'transparent', color: t.text,
                  border: 'none', outline: 'none', resize: 'none',
                  fontSize: 13, lineHeight: 1.55,
                  fontFamily: 'inherit',
                }}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Exercises */}
      <div style={{ padding: '22px 20px 0' }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, color: t.textDim, letterSpacing: 1.2, margin: '0 0 12px 4px' }}>
          운동 · {session.exercises.length}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {session.exercises.map((ex, ei) => {
            const exVol = ex.sets.reduce((s, x) => s + (x.kind === 'W' ? 0 : x.w * x.r), 0);
            const workSets = ex.sets.filter(s => s.kind !== 'W').length;
            return (
              <Card key={ei} t={t} padding={0}>
                <div style={{ padding: '14px 14px 10px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${t.line}` }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 9,
                    background: 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ ...numStyle(11), color: t.text }}>{ei + 1}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{ex.name}</div>
                    <div style={{ fontSize: 10, color: t.textFaint, marginTop: 2 }}>{ex.sub}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ ...numStyle(13, 800), color: t.text }}>{exVol.toLocaleString()}<span style={{ fontSize: 9, fontWeight: 600, color: t.textFaint, marginLeft: 2 }}>kg</span></div>
                    <div style={{ fontSize: 9, color: t.textFaint, fontWeight: 700, letterSpacing: 0.5, marginTop: 2 }}>{workSets} 작업세트</div>
                  </div>
                </div>
                {/* Sets table */}
                <div style={{ padding: '6px 14px 10px' }}>
                  {/* header row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 1fr 28px', gap: 4, padding: '6px 0', fontSize: 9, color: t.textFaint, fontWeight: 700, letterSpacing: 0.8 }}>
                    <span>SET</span>
                    <span style={{ textAlign: 'right' }}>KG</span>
                    <span style={{ textAlign: 'right' }}>REPS</span>
                    <span/>
                  </div>
                  {ex.sets.map((s, si) => (
                    <div key={si} style={{
                      display: 'grid', gridTemplateColumns: '32px 1fr 1fr 28px', gap: 4,
                      padding: '7px 0', alignItems: 'center',
                      borderTop: si === 0 ? `1px solid ${t.line}` : 'none',
                    }}>
                      <span style={{
                        ...numStyle(11, 800),
                        color: s.kind === 'W' ? t.textFaint : t.text,
                      }}>{s.kind}</span>
                      <span style={{ ...numStyle(13), color: t.text, textAlign: 'right' }}>{s.w}</span>
                      <span style={{ ...numStyle(13), color: t.text, textAlign: 'right' }}>{s.r}</span>
                      <span style={{ textAlign: 'right' }}>
                        {s.pr && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: 18, height: 18, borderRadius: 6,
                            background: t.accent, color: t.accentInk,
                            fontSize: 9, fontWeight: 800,
                          }}>PR</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom spacer */}
      <div style={{ height: 24 }}/>
    </div>
  );
}

window.ScreenSession = ScreenSession;
