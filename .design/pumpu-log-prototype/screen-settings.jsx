// screen-settings.jsx — Settings page (minimal)

function ScreenSettings({ t, onBack }) {
  const [unit, setUnit] = React.useState('kg');
  const [restAlert, setRestAlert] = React.useState(true);
  const [haptics, setHaptics] = React.useState(true);
  const [autoStart, setAutoStart] = React.useState(true);
  const [sound, setSound] = React.useState(false);

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ paddingTop: 50 }}>
        <TopBar t={t} title="설정" onBack={onBack}/>
      </div>

      {/* 운동 */}
      <Section t={t} title="운동">
        <SegmentRow t={t} label="단위" value={unit} options={[{v:'kg', l:'kg'}, {v:'lb', l:'lb'}]} onChange={setUnit}/>
        <ToggleRow t={t} label="자동 휴식 타이머" sub="세트 완료 시 자동 시작" value={autoStart} onChange={setAutoStart}/>
        <ToggleRow t={t} label="휴식 종료 알림" sub="진동 + 알림으로 알려요" value={restAlert} onChange={setRestAlert}/>
        <ToggleRow t={t} label="햅틱 피드백" sub="버튼 탭 시 진동" value={haptics} onChange={setHaptics}/>
        <ToggleRow t={t} label="사운드" sub="휴식 종료음" value={sound} onChange={setSound} last/>
      </Section>

      {/* 데이터 */}
      <Section t={t} title="데이터">
        <NavRow t={t} label="데이터 내보내기" sub="CSV로 받기"/>
        <NavRow t={t} label="모든 기록 초기화" danger last/>
      </Section>

      {/* 앱 */}
      <Section t={t} title="앱">
        <NavRow t={t} label="테마" right={<span style={{ fontSize: 12, color: t.textDim }}>다크</span>}/>
        <NavRow t={t} label="언어" right={<span style={{ fontSize: 12, color: t.textDim }}>한국어</span>} last/>
      </Section>

      {/* 정보 */}
      <Section t={t} title="정보">
        <NavRow t={t} label="도움말 · 피드백"/>
        <NavRow t={t} label="이용약관"/>
        <NavRow t={t} label="개인정보 처리방침"/>
        <NavRow t={t} label="버전" right={<span style={{ fontSize: 12, color: t.textDim }}>1.0.4</span>} last/>
      </Section>

      <div style={{
        textAlign: 'center', fontSize: 11, color: t.textFaint, fontWeight: 600,
        marginTop: 28, letterSpacing: 0.5,
      }}>
        Pumpu Log
      </div>
    </div>
  );
}

function Section({ t, title, children }) {
  return (
    <div style={{ padding: '24px 20px 0' }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: t.textDim,
        letterSpacing: 1.4, textTransform: 'uppercase',
        marginBottom: 8, paddingLeft: 4,
      }}>{title}</div>
      <div style={{
        background: t.surface, borderRadius: 16,
        border: `1px solid ${t.line}`,
        overflow: 'hidden',
      }}>{children}</div>
    </div>
  );
}

function ToggleRow({ t, label, sub, value, onChange, last = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 16px',
      borderBottom: last ? 'none' : `1px solid ${t.line}`,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: t.textDim, marginTop: 2 }}>{sub}</div>}
      </div>
      <Switch t={t} value={value} onChange={onChange}/>
    </div>
  );
}

function Switch({ t, value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} style={{
      width: 44, height: 26, borderRadius: 999,
      background: value ? t.accent : 'rgba(255,255,255,0.12)',
      border: 'none', padding: 2, cursor: 'pointer',
      display: 'flex', alignItems: 'center',
      transition: 'background 200ms ease',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: '50%',
        background: value ? t.accentInk : '#fff',
        transform: value ? 'translateX(18px)' : 'translateX(0)',
        transition: 'transform 200ms cubic-bezier(0.22,1,0.36,1)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
      }}/>
    </button>
  );
}

function SegmentRow({ t, label, value, options, onChange }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 16px',
      borderBottom: `1px solid ${t.line}`,
    }}>
      <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: t.text }}>{label}</div>
      <div style={{
        display: 'flex', padding: 2, borderRadius: 12,
        background: 'rgba(255,255,255,0.06)',
      }}>
        {options.map(o => {
          const active = o.v === value;
          return (
            <button key={o.v} onClick={() => onChange(o.v)} style={{
              padding: '6px 14px', borderRadius: 8,
              background: active ? t.accent : 'transparent',
              color: active ? t.accentInk : t.textDim,
              border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: 700,
              transition: 'background 150ms ease',
            }}>{o.l}</button>
          );
        })}
      </div>
    </div>
  );
}

function NavRow({ t, label, sub, right, danger = false, last = false }) {
  return (
    <PressRow style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 16px',
      borderBottom: last ? 'none' : `1px solid ${t.line}`,
      cursor: 'pointer',
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: danger ? t.danger : t.text }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: t.textDim, marginTop: 2 }}>{sub}</div>}
      </div>
      {right}
      {Icon.chevR(t.textFaint, 12)}
    </PressRow>
  );
}

window.ScreenSettings = ScreenSettings;
