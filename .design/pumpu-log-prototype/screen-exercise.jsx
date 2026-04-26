// screen-exercise.jsx — Routine editor + exercise library picker

// ─── Routine Editor — edit a single routine's exercise list ───────────────
function ScreenRoutineEditor({ t, api, onBack, onSave, onAddExercise }) {
  // If api is provided & we have a scratch routine being edited, use it.
  // Otherwise fall back to mock data so the screen renders standalone.
  const editingRoutine = api && api.scratch.routines[api.scratch.editingIdx];
  const isScratch = !!editingRoutine;

  const [mockName, setMockName] = React.useState('Push Day');
  const [mockExs, setMockExs] = React.useState([
    { id: 'bp', name: '벤치 프레스', sub: '바벨 · 가슴', sets: 4 },
    { id: 'idp', name: '인클라인 덤벨 프레스', sub: '덤벨 · 상부 가슴', sets: 3 },
    { id: 'cf', name: '케이블 플라이', sub: '케이블 · 가슴', sets: 3 },
    { id: 'sl', name: '사이드 레터럴 레이즈', sub: '덤벨 · 측면 어깨', sets: 4 },
    { id: 'tp', name: '트라이셉 푸시다운', sub: '케이블 · 삼두', sets: 3 },
    { id: 'oe', name: '오버헤드 익스텐션', sub: '덤벨 · 삼두', sets: 3 },
  ]);

  const name = isScratch ? editingRoutine.name : mockName;
  const exercises = isScratch ? editingRoutine.exercises : mockExs;

  const setName = (v) => {
    if (isScratch) {
      api.setRoutines(api.scratch.routines.map((r, idx) =>
        idx === api.scratch.editingIdx ? { ...r, name: v } : r
      ));
    } else {
      setMockName(v);
    }
  };
  const setExercisesArr = (next) => {
    if (isScratch) {
      api.setRoutines(api.scratch.routines.map((r, idx) =>
        idx === api.scratch.editingIdx ? { ...r, exercises: next } : r
      ));
    } else {
      setMockExs(next);
    }
  };

  const remove = (i) => setExercisesArr(exercises.filter((_, idx) => idx !== i));
  const setSets = (i, n) => setExercisesArr(exercises.map((e, idx) =>
    idx === i ? { ...e, sets: Math.max(1, (e.sets || 3) + n) } : e
  ));

  const totalSets = exercises.reduce((s, e) => s + (e.sets || 3), 0);

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 110 }}>
      <div style={{ padding: '60px 20px 8px' }}>
        <BackButton t={t} onClick={onBack}/>
        <div style={{ ...TYPE.bodySm, color: t.textDim }}>루틴 편집</div>
        <input
          className="pl-title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%', padding: '4px 0', marginTop: 4,
            background: 'transparent', color: t.text,
            border: 'none', outline: 'none',
            fontSize: 30, fontWeight: 800, letterSpacing: -1.0, fontFamily: 'inherit',
          }}
        />
        <div style={{ fontSize: 13, color: t.textFaint, marginTop: 4, display: 'flex', gap: 10 }}>
          <span>{exercises.length}운동</span>
          <span>·</span>
          <span>{totalSets}세트</span>
          <span>·</span>
          <span>약 {Math.round(totalSets * 2.5)}분</span>
        </div>
      </div>

      {/* Exercise list */}
      <div style={{ padding: '20px 20px 0' }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, color: t.textDim, letterSpacing: 1.5, margin: '0 0 12px 4px' }}>
          운동 목록
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {exercises.map((ex, i) => (
            <div key={ex.id} style={{
              background: t.surface, borderRadius: 16, padding: 14,
              border: `1px solid ${t.line}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ color: t.textFaint, fontSize: 14, cursor: 'grab' }}>
                  <svg width="14" height="22" viewBox="0 0 14 22" fill={t.textFaint}>
                    <circle cx="3" cy="4" r="1.5"/><circle cx="11" cy="4" r="1.5"/>
                    <circle cx="3" cy="11" r="1.5"/><circle cx="11" cy="11" r="1.5"/>
                    <circle cx="3" cy="18" r="1.5"/><circle cx="11" cy="18" r="1.5"/>
                  </svg>
                </div>
                <div style={{
                  width: 38, height: 38, borderRadius: 12,
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ ...numStyle(13), color: t.text }}>{i + 1}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{ex.name}</div>
                  <div style={{ fontSize: 11, color: t.textDim, marginTop: 2 }}>{ex.sub}</div>
                </div>
                <PressButton onClick={() => remove(i)} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer', padding: 4,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M6 18L18 6" stroke={t.textFaint} strokeWidth="2" strokeLinecap="round"/></svg>
                </PressButton>
              </div>
              {/* Set count stepper */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.line}` }}>
                <span style={{ fontSize: 11, color: t.textDim, fontWeight: 700, letterSpacing: 0.5 }}>세트 수</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <PressButton onClick={() => setSets(i, -1)} size="xs" iconOnly style={{
                    background: 'rgba(255,255,255,0.06)', color: t.text, cursor: 'pointer',
                    border: 'none', fontWeight: 700,
                  }}>−</PressButton>
                  <span style={{ ...numStyle(15), minWidth: 24, textAlign: 'center', color: t.text }}>{ex.sets}</span>
                  <PressButton onClick={() => setSets(i, 1)} size="xs" iconOnly style={{
                    background: t.accent, color: t.accentInk, cursor: 'pointer',
                    border: 'none', fontWeight: 700,
                  }}>+</PressButton>
                </div>
              </div>
            </div>
          ))}

          {/* Add exercise CTA */}
          <PressButton onClick={onAddExercise} style={{
            background: 'transparent', border: `1.5px dashed ${t.accent}66`, borderRadius: 16,
            padding: '16px', cursor: 'pointer', color: t.accent,
            fontSize: 14, fontWeight: 700, fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke={t.accent} strokeWidth="2.5" strokeLinecap="round"/></svg>
            운동 추가
          </PressButton>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '14px 20px 26px',
        background: `linear-gradient(to top, ${t.bg}, ${t.bg}f8 70%, ${t.bg}00)`,
      }}>
        <PressButton onClick={onSave} size="md" style={{
          width: '100%', border: 'none', cursor: 'pointer', 
          background: t.accent, color: t.accentInk,
        }}>저장</PressButton>
      </div>
    </div>
  );
}

// ─── Exercise Library — search & pick exercises ───────────────────────────
function ScreenExerciseLibrary({ t, api, onBack, onConfirm }) {
  const [query, setQuery] = React.useState('');
  const [partFilter, setPartFilter] = React.useState('all');
  const [selected, setSelected] = React.useState({});

  const parts = [
    { id: 'all', label: '전체' },
    { id: 'chest', label: '가슴' },
    { id: 'back', label: '등' },
    { id: 'shoulder', label: '어깨' },
    { id: 'leg', label: '하체' },
    { id: 'arm', label: '팔' },
    { id: 'core', label: '코어' },
  ];

  const library = [
    // Chest
    { id: 'bench', name: '벤치 프레스', sub: '바벨 · 컴파운드', part: 'chest', equip: 'barbell', popular: true },
    { id: 'incline-db', name: '인클라인 덤벨 프레스', sub: '덤벨 · 상부 가슴', part: 'chest', equip: 'dumbbell' },
    { id: 'decline-bp', name: '디클라인 벤치 프레스', sub: '바벨 · 하부 가슴', part: 'chest', equip: 'barbell' },
    { id: 'cable-fly', name: '케이블 플라이', sub: '케이블 · 가슴 격리', part: 'chest', equip: 'cable' },
    { id: 'pec-deck', name: '펙덱 플라이', sub: '머신 · 가슴 격리', part: 'chest', equip: 'machine' },
    { id: 'pushup', name: '푸시업', sub: '맨몸 · 가슴', part: 'chest', equip: 'body' },

    // Back
    { id: 'deadlift', name: '데드리프트', sub: '바벨 · 컴파운드', part: 'back', equip: 'barbell', popular: true },
    { id: 'pullup', name: '풀업', sub: '맨몸 · 등 너비', part: 'back', equip: 'body' },
    { id: 'bb-row', name: '바벨 로우', sub: '바벨 · 등 두께', part: 'back', equip: 'barbell' },
    { id: 'lat-pull', name: '랫 풀다운', sub: '케이블 · 등 너비', part: 'back', equip: 'cable' },
    { id: 'seated-row', name: '시티드 케이블 로우', sub: '케이블 · 등 두께', part: 'back', equip: 'cable' },

    // Shoulder
    { id: 'ohp', name: '오버헤드 프레스', sub: '바벨 · 컴파운드', part: 'shoulder', equip: 'barbell' },
    { id: 'side-lat', name: '사이드 레터럴 레이즈', sub: '덤벨 · 측면 어깨', part: 'shoulder', equip: 'dumbbell', popular: true },
    { id: 'rear-delt', name: '리어 델트 플라이', sub: '덤벨 · 후면 어깨', part: 'shoulder', equip: 'dumbbell' },
    { id: 'face-pull', name: '페이스 풀', sub: '케이블 · 후면 어깨', part: 'shoulder', equip: 'cable' },

    // Leg
    { id: 'squat', name: '바벨 스쿼트', sub: '바벨 · 컴파운드', part: 'leg', equip: 'barbell', popular: true },
    { id: 'rdl', name: '루마니안 데드리프트', sub: '바벨 · 햄스트링', part: 'leg', equip: 'barbell' },
    { id: 'leg-press', name: '레그 프레스', sub: '머신 · 쿼드', part: 'leg', equip: 'machine' },
    { id: 'lunge', name: '런지', sub: '덤벨 · 하체', part: 'leg', equip: 'dumbbell' },
    { id: 'calf-raise', name: '카프 레이즈', sub: '머신 · 종아리', part: 'leg', equip: 'machine' },

    // Arm
    { id: 'bb-curl', name: '바벨 컬', sub: '바벨 · 이두', part: 'arm', equip: 'barbell' },
    { id: 'tri-pushdown', name: '트라이셉 푸시다운', sub: '케이블 · 삼두', part: 'arm', equip: 'cable' },
    { id: 'hammer', name: '해머 컬', sub: '덤벨 · 이두/전완', part: 'arm', equip: 'dumbbell' },
    { id: 'overhead-ext', name: '오버헤드 익스텐션', sub: '덤벨 · 삼두', part: 'arm', equip: 'dumbbell' },

    // Core
    { id: 'plank', name: '플랭크', sub: '맨몸 · 코어', part: 'core', equip: 'body' },
    { id: 'leg-raise', name: '행잉 레그 레이즈', sub: '맨몸 · 하복부', part: 'core', equip: 'body' },
    { id: 'cable-crunch', name: '케이블 크런치', sub: '케이블 · 복근', part: 'core', equip: 'cable' },
  ];

  const filtered = library.filter((x) => {
    if (partFilter !== 'all' && x.part !== partFilter) return false;
    if (query && !x.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const toggle = (id) => setSelected({ ...selected, [id]: !selected[id] });
  const selCount = Object.values(selected).filter(Boolean).length;

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, overflow: 'auto', paddingBottom: selCount > 0 ? 110 : 30 }}>
      <div style={{ padding: '60px 20px 8px' }}>
        <BackButton t={t} onClick={onBack}/>
        <div style={{ ...TYPE.bodySm, color: t.textDim }}>운동 라이브러리</div>
        <h1 style={{ ...TYPE.displayMd, margin: '4px 0 0' }}>운동 추가</h1>
      </div>

      {/* Search */}
      <div style={{ padding: '16px 20px 0' }}>
        <div className="pl-search" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: t.surface, border: `1px solid ${t.line}`,
          borderRadius: 16, padding: '12px 14px',
          transition: 'border-color .15s ease, box-shadow .15s ease, background-color .15s ease',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke={t.textFaint} strokeWidth="2"/>
            <path d="M20 20l-3-3" stroke={t.textFaint} strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="운동 검색..."
            style={{
              flex: 1, padding: 0,
              background: 'transparent', color: t.text,
              border: 'none', outline: 'none',
              fontSize: 14, fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Part filters */}
      <div style={{ padding: '14px 16px 4px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {parts.map((p) => (
          <PressButton key={p.id} onClick={() => setPartFilter(p.id)} style={{
            flexShrink: 0, padding: '8px 14px', borderRadius: 12, border: 'none', cursor: 'pointer',
            background: partFilter === p.id ? t.accent : t.surface,
            color: partFilter === p.id ? t.accentInk : t.textDim,
            fontSize: 12, fontWeight: 700,
          }}>{p.label}</PressButton>
        ))}
      </div>

      {/* Result count */}
      <div style={{ padding: '14px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: t.textFaint, fontWeight: 600 }}>{filtered.length}개의 운동</span>
        {selCount > 0 && <span style={{ fontSize: 12, color: t.accent, fontWeight: 700 }}>{selCount}개 선택됨</span>}
      </div>

      {/* List */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((ex) => {
          const sel = !!selected[ex.id];
          return (
            <PressRow key={ex.id} onClick={() => toggle(ex.id)} style={{
              background: t.surface, borderRadius: 16, padding: 14,
              border: `1.5px solid ${sel ? t.accent : t.line}`,
              boxShadow: sel ? `0 0 16px ${t.accent}33` : 'none',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: 8,
                background: sel ? t.accent : 'transparent',
                border: sel ? 'none' : `1.5px solid ${t.line}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {sel && <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke={t.accentInk} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{ex.name}</span>
                  {ex.popular && <Chip t={t} accent>인기</Chip>}
                </div>
                <div style={{ fontSize: 11, color: t.textDim, marginTop: 2 }}>{ex.sub}</div>
              </div>
            </PressRow>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: t.textFaint, fontSize: 13 }}>
            검색 결과 없음
          </div>
        )}
      </div>

      {/* Floating CTA when selected */}
      {selCount > 0 && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: '14px 20px 26px',
          background: `linear-gradient(to top, ${t.bg}, ${t.bg}f8 70%, ${t.bg}00)`,
        }}>
          <PressButton onClick={() => {
            const picked = library.filter(ex => selected[ex.id])
              .map(ex => ({ id: ex.id, name: ex.name, sub: ex.sub, sets: 3 }));
            onConfirm && onConfirm(picked);
          }} size="md" style={{
            width: '100%', border: 'none', cursor: 'pointer',
            background: t.accent, color: t.accentInk,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            {selCount}개 운동 추가
          </PressButton>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { ScreenRoutineEditor, ScreenExerciseLibrary });
