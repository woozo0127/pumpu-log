// screen-add-program.jsx — Add program flow (method picker → template/scratch)

// ─── Method picker — choose how to create ──────────────────────────────────
function ScreenAddProgram({ t, onBack, onPick }) {
  const methods = [
    {
      id: 'template',
      title: '템플릿에서 시작',
      sub: '검증된 프로그램으로 빠르게',
      desc: '5/3/1, PPL, StrongLifts 등 검증된 프로그램을 골라서 바로 시작',
      tag: '추천',
      icon: (c) => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={c} strokeWidth="2"/>
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke={c} strokeWidth="2"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke={c} strokeWidth="2"/>
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke={c} strokeWidth="2"/>
        </svg>
      ),
    },
    {
      id: 'scratch',
      title: '처음부터 만들기',
      sub: '내 방식대로 직접 설계',
      desc: '루틴 이름, 일별 분할, 운동을 모두 직접 입력해서 만들기',
      icon: (c) => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M5 12H19" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, overflow: 'auto' }}>
      <div style={{ padding: '60px 20px 8px' }}>
        <PressButton onClick={onBack} style={{
          width: 36, height: 36, borderRadius: 12, marginBottom: 18,
          background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
        }}>{Icon.chevL(t.text, 16)}</PressButton>
        <div style={{ fontSize: 13, color: t.textDim, fontWeight: 600 }}>새 프로그램</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1.0, margin: '4px 0 8px', lineHeight: 1.15 }}>
          어떻게<br/>시작할까요?
        </h1>
        <div style={{ fontSize: 14, color: t.textDim, lineHeight: 1.5 }}>
          템플릿에서 빠르게 시작하거나 직접 설계해 보세요.
        </div>
      </div>

      <div style={{ padding: '24px 20px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {methods.map((m) => (
          <PressRow key={m.id} onClick={() => onPick && onPick(m.id)} style={{
            background: t.surface, borderRadius: 22, padding: 20,
            border: `1px solid ${t.line}`, cursor: 'pointer',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: m.id === 'template' ? t.grad : 'rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {m.icon(m.id === 'template' ? t.accentInk : t.text)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 17, fontWeight: 800, color: t.text, letterSpacing: -0.3 }}>{m.title}</span>
                  {m.tag && <Chip t={t} accent={m.tag === '추천'}>{m.tag}</Chip>}
                </div>
                <div style={{ fontSize: 12, color: t.textDim, marginTop: 3, fontWeight: 600 }}>{m.sub}</div>
                <div style={{ fontSize: 13, color: t.textFaint, marginTop: 10, lineHeight: 1.5 }}>{m.desc}</div>
              </div>
            </div>
          </PressRow>
        ))}
      </div>
    </div>
  );
}

// ─── Template path: catalog of templates ───────────────────────────────────
function ScreenTemplates({ t, onBack, onPick }) {
  const groups = [
    {
      label: 'STRENGTH · 근력 중심',
      items: [
        { id: '531', name: '5/3/1 BBB', sub: '4일 분할 · 빅3 중심', level: '중급', days: 4, weeks: '4주 사이클', popular: true },
        { id: 'sl', name: 'StrongLifts 5×5', sub: '3일 풀바디', level: '입문', days: 3, weeks: '12주' },
        { id: 'nsuns', name: 'nSuns 5/3/1 LP', sub: '6일 분할 · 고볼륨', level: '고급', days: 6, weeks: '4주 사이클' },
      ],
    },
    {
      label: 'HYPERTROPHY · 근비대',
      items: [
        { id: 'ppl6', name: 'PPL Hypertrophy', sub: '6일 분할 · Push/Pull/Legs', level: '중급', days: 6, weeks: '8~12주', popular: true },
        { id: 'ul', name: 'Upper / Lower', sub: '4일 분할', level: '중급', days: 4, weeks: '12주' },
        { id: 'arnold', name: 'Arnold Split', sub: '6일 분할 · 고볼륨', level: '고급', days: 6, weeks: '8주' },
      ],
    },
    {
      label: 'FUNCTIONAL · 컨디셔닝',
      items: [
        { id: 'gz', name: 'GZCLP', sub: '4일 분할 · LP', level: '입문', days: 4, weeks: '12주' },
        { id: '3day', name: '3일 풀바디', sub: '바쁜 직장인용', level: '입문', days: 3, weeks: '8주' },
      ],
    },
  ];

  const levelColor = (l) => l === '입문' ? '#7AE0AA' : l === '중급' ? t.accent : '#FFB37A';

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 110 }}>
      <div style={{ padding: '60px 20px 8px' }}>
        <PressButton onClick={onBack} style={{
          width: 36, height: 36, borderRadius: 12, marginBottom: 18,
          background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
        }}>{Icon.chevL(t.text, 16)}</PressButton>
        <div style={{ fontSize: 13, color: t.textDim, fontWeight: 600 }}>STEP 1 / 2 · 템플릿 선택</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.8, margin: '4px 0 0' }}>어떤 프로그램?</h1>
      </div>

      {/* Filter chips */}
      <div style={{ padding: '16px 16px 4px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {['전체', '입문', '중급', '고급', '3일', '4일', '6일'].map((f, i) => (
          <PressButton key={i} style={{
            flexShrink: 0, padding: '8px 14px', borderRadius: 12, border: 'none', cursor: 'pointer',
            background: i === 0 ? t.accent : t.surface,
            color: i === 0 ? t.accentInk : t.textDim,
            fontSize: 12, fontWeight: 700,
          }}>{f}</PressButton>
        ))}
      </div>

      {groups.map((g, gi) => (
        <div key={gi} style={{ padding: '20px 20px 0' }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: t.textDim, letterSpacing: 1.5, margin: '0 0 12px 4px' }}>
            {g.label}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {g.items.map((p) => (
              <PressRow key={p.id} onClick={() => onPick && onPick(p)} style={{
                background: t.surface, borderRadius: 18, padding: 16,
                border: `1px solid ${t.line}`, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 13,
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>{Icon.dumbbell(t.text, 22)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{p.name}</span>
                    {p.popular && <Chip t={t} accent>인기</Chip>}
                  </div>
                  <div style={{ fontSize: 12, color: t.textDim, marginTop: 3 }}>{p.sub}</div>
                  <div style={{ fontSize: 11, color: t.textFaint, marginTop: 6, display: 'flex', gap: 8 }}>
                    <span style={{ color: levelColor(p.level), fontWeight: 700 }}>● {p.level}</span>
                    <span>{p.days}일/주</span>
                    <span>{p.weeks}</span>
                  </div>
                </div>
                {Icon.chevR(t.textFaint, 14)}
              </PressRow>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Template preview & schedule assignment ────────────────────────────────
function ScreenTemplatePreview({ t, onBack, onConfirm }) {
  // Hardcoded as PPL preview (selected template)
  const program = {
    name: 'PPL Hypertrophy',
    sub: '6일 분할 · Push/Pull/Legs',
    desc: '근비대 중심의 검증된 6일 프로그램. 각 부위를 주 2회 자극해 회복-자극 주기를 최적화합니다.',
    routines: [
      { name: 'Push Day', sub: '가슴·어깨·삼두 · 6운동' },
      { name: 'Pull Day', sub: '등·이두 · 5운동' },
      { name: 'Leg Day', sub: '하체·코어 · 7운동' },
    ],
  };

  const dayLabels = ['월', '화', '수', '목', '금', '토', '일'];
  // Default schedule: Push월목, Pull화금, Legs수토
  const [schedule, setSchedule] = React.useState({
    0: 0, 1: 1, 2: 2, 3: 0, 4: 1, 5: 2, 6: -1, // -1 = rest
  });

  const setDay = (idx, routineIdx) => {
    setSchedule({ ...schedule, [idx]: routineIdx });
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
        <PressButton onClick={onBack} style={{
          width: 36, height: 36, borderRadius: 12, marginBottom: 18,
          background: 'rgba(0,0,0,0.15)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
        }}>{Icon.chevL(t.accentInk, 16)}</PressButton>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, opacity: 0.7 }}>STEP 2 / 2 · 일정 설정</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.9, margin: '6px 0 8px' }}>{program.name}</h1>
          <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.85 }}>{program.sub}</div>
        </div>
      </div>

      {/* Description */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 14, color: t.textDim, lineHeight: 1.6 }}>{program.desc}</div>
      </div>

      {/* Routines list */}
      <div style={{ padding: '20px 20px 0' }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, color: t.textDim, letterSpacing: 1.5, margin: '0 0 10px 4px' }}>
          포함된 루틴
        </h2>
        <Card t={t} padding={4}>
          {program.routines.map((r, i, arr) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px',
              borderBottom: i < arr.length - 1 ? `1px solid ${t.line}` : 'none',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: t.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ ...numStyle(13), color: t.accentInk }}>D{i+1}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{r.name}</div>
                <div style={{ fontSize: 11, color: t.textDim, marginTop: 2 }}>{r.sub}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Schedule assignment */}
      <div style={{ padding: '24px 20px 0' }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, color: t.textDim, letterSpacing: 1.5, margin: '0 0 4px 4px' }}>
          요일 배정
        </h2>
        <div style={{ fontSize: 12, color: t.textFaint, margin: '0 0 14px 4px' }}>각 요일을 탭해서 루틴 또는 휴식으로 변경</div>
        <Card t={t} padding={12}>
          {dayLabels.map((d, i) => {
            const r = schedule[i];
            const routine = r >= 0 ? program.routines[r] : null;
            return (
              <PressRow key={i} onClick={() => setDay(i, (schedule[i] + 1) >= program.routines.length ? -1 : schedule[i] + 1)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 6px',
                borderBottom: i < 6 ? `1px solid ${t.line}` : 'none',
                cursor: 'pointer',
              }}>
                <div style={{ width: 28, fontSize: 13, fontWeight: 700, color: t.text }}>{d}</div>
                {routine ? (
                  <>
                    <div style={{
                      width: 28, height: 28, borderRadius: 9, background: t.accent,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ ...numStyle(11, 800), color: t.accentInk }}>D{r+1}</span>
                    </div>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: t.text }}>{routine.name}</span>
                  </>
                ) : (
                  <>
                    <div style={{
                      width: 28, height: 28, borderRadius: 9, background: 'rgba(255,255,255,0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ fontSize: 14, color: t.textFaint }}>·</span>
                    </div>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: t.textFaint }}>휴식</span>
                  </>
                )}
                <span style={{ fontSize: 11, color: t.textFaint, fontWeight: 600 }}>변경</span>
              </PressRow>
            );
          })}
        </Card>
      </div>

      {/* Bottom CTA */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '14px 20px 26px',
        background: `linear-gradient(to top, ${t.bg}, ${t.bg}f8 70%, ${t.bg}00)`,
      }}>
        <PressButton onClick={onConfirm} style={{
          width: '100%', height: 56, borderRadius: 18, border: 'none', cursor: 'pointer',
          background: t.accent, color: t.accentInk,
          fontSize: 16, fontWeight: 800, letterSpacing: -0.2,
          boxShadow: `0 8px 24px ${t.accent}55`,
        }}>프로그램 시작</PressButton>
      </div>
    </div>
  );
}

// ─── Scratch path: build from scratch ──────────────────────────────────────
function ScreenScratchProgram({ t, api, onBack, onConfirm, onEditRoutine }) {
  const { scratch } = api;
  const name = scratch.name;
  const routines = scratch.routines;

  const setName = (n) => api.setName(n);
  const addRoutine = () => {
    api.setRoutines([...routines, { name: `Day ${routines.length + 1}`, exercises: [] }]);
  };
  const removeRoutine = (i) => {
    api.setRoutines(routines.filter((_, idx) => idx !== i));
  };
  const renameRoutine = (i, v) => {
    api.setRoutines(routines.map((r, idx) => idx === i ? { ...r, name: v } : r));
  };

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 110 }}>
      <div style={{ padding: '60px 20px 8px' }}>
        <PressButton onClick={onBack} style={{
          width: 36, height: 36, borderRadius: 12, marginBottom: 18,
          background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
        }}>{Icon.chevL(t.text, 16)}</PressButton>
        <div style={{ fontSize: 13, color: t.textDim, fontWeight: 600 }}>처음부터 만들기</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.8, margin: '4px 0 0' }}>새 프로그램</h1>
      </div>

      {/* Name input */}
      <div style={{ padding: '20px 20px 0' }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: t.textDim, letterSpacing: 1.2, display: 'block', marginBottom: 8, marginLeft: 4 }}>
          프로그램 이름
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%', padding: '16px 18px',
            background: t.surface, color: t.text,
            border: `1px solid ${t.line}`, borderRadius: 16,
            fontSize: 16, fontWeight: 700, fontFamily: 'inherit',
            outline: 'none',
          }}
        />
      </div>

      {/* Description */}
      <div style={{ padding: '20px 20px 0' }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: t.textDim, letterSpacing: 1.2, display: 'block', marginBottom: 8, marginLeft: 4 }}>
          설명 (선택)
        </label>
        <textarea
          placeholder="이 프로그램의 목표나 특징을 적어주세요..."
          style={{
            width: '100%', padding: '14px 18px', minHeight: 70,
            background: t.surface, color: t.text,
            border: `1px solid ${t.line}`, borderRadius: 16,
            fontSize: 14, fontFamily: 'inherit', resize: 'none',
            outline: 'none',
          }}
        />
      </div>

      {/* Routines */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, padding: '0 4px' }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: t.textDim, letterSpacing: 1.2, margin: 0 }}>
            일별 루틴 · {routines.length}
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {routines.map((r, i) => (
            <div key={i} style={{
              background: t.surface, borderRadius: 16,
              border: `1px solid ${t.line}`,
              overflow: 'hidden',
            }}>
              <div style={{
                padding: 14,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 11,
                  background: t.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ ...numStyle(12), color: t.accentInk }}>D{i+1}</span>
                </div>
                <input
                  value={r.name}
                  onChange={(e) => renameRoutine(i, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    flex: 1, minWidth: 0, padding: 0,
                    background: 'transparent', color: t.text,
                    border: 'none', outline: 'none',
                    fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
                  }}
                />
                <PressButton onClick={(e) => { e.stopPropagation(); removeRoutine(i); }} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: t.textFaint, padding: 4,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M6 18L18 6" stroke={t.textFaint} strokeWidth="2" strokeLinecap="round"/></svg>
                </PressButton>
              </div>
              <PressRow onClick={() => onEditRoutine && onEditRoutine(i)} style={{
                borderTop: `1px solid ${t.line}`,
                padding: '12px 14px',
                display: 'flex', alignItems: 'center', gap: 10,
                cursor: 'pointer',
                background: r.exercises.length === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
              }}>
                {r.exercises.length === 0 ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke={t.accent} strokeWidth="2.5" strokeLinecap="round"/></svg>
                    <span style={{ flex: 1, fontSize: 13, color: t.accent, fontWeight: 700 }}>운동 추가하기</span>
                  </>
                ) : (
                  <>
                    <span style={{ flex: 1, fontSize: 12, color: t.textDim, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.exercises.slice(0, 3).map(e => e.name).join(' · ')}
                      {r.exercises.length > 3 && ` 외 ${r.exercises.length - 3}개`}
                    </span>
                    <span style={{ ...numStyle(13), color: t.text }}>{r.exercises.length}</span>
                    <span style={{ fontSize: 11, color: t.textFaint, fontWeight: 600 }}>운동</span>
                  </>
                )}
                {Icon.chevR(t.textFaint, 12)}
              </PressRow>
            </div>
          ))}

          <PressButton onClick={addRoutine} style={{
            background: 'transparent', border: `1.5px dashed ${t.line}`, borderRadius: 16,
            padding: '14px', cursor: 'pointer', color: t.textDim,
            fontSize: 14, fontWeight: 700, fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke={t.textDim} strokeWidth="2.5" strokeLinecap="round"/></svg>
            루틴 추가
          </PressButton>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '14px 20px 26px',
        background: `linear-gradient(to top, ${t.bg}, ${t.bg}f8 70%, ${t.bg}00)`,
      }}>
        <PressButton onClick={onConfirm} style={{
          width: '100%', height: 56, borderRadius: 18, border: 'none', cursor: 'pointer',
          background: t.accent, color: t.accentInk,
          fontSize: 16, fontWeight: 800, letterSpacing: -0.2,
          boxShadow: `0 8px 24px ${t.accent}55`,
        }}>프로그램 만들기</PressButton>
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenAddProgram,
  ScreenTemplates,
  ScreenTemplatePreview,
  ScreenScratchProgram,
});
