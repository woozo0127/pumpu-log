// screen-finish.jsx — Workout finish summary

function ScreenFinish({ t, onDone }) {
  // Volume vs previous PUSH session — the single number that matters.
  const prevVolume = 3000;
  const todayVolume = 3240;
  const diff = todayVolume - prevVolume;
  const pct = Math.round((diff / prevVolume) * 1000) / 10;
  const sign = diff > 0 ? '+' : (diff < 0 ? '−' : '±');
  const positive = diff >= 0;
  const tone = diff === 0 ? t.textDim : (positive ? t.accent : '#ff7a7a');
  const fmt = (n) => n.toLocaleString();

  return (
    <div style={{
      width: '100%', height: '100%', background: t.bg, color: t.text,
      display: 'flex', flexDirection: 'column', overflow: 'auto',
    }}>
      {/* Hero — extra top padding so it clears the dynamic island / status bar */}
      <div style={{
        position: 'relative',
        padding: '110px 24px 60px',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Burst */}
        <div style={{
          position: 'absolute', top: 90, left: '50%', transform: 'translateX(-50%)',
          width: 280, height: 280, borderRadius: '50%',
          background: `radial-gradient(circle, ${t.accent}33 0%, transparent 70%)`,
          filter: 'blur(20px)', pointerEvents: 'none',
        }}/>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: t.accent, letterSpacing: 3, marginBottom: 12 }}>
            COMPLETE
          </div>
          <div style={{ display: 'inline-flex', marginBottom: 22 }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: t.accent, color: t.accentInk,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 60px ${t.accent}88`,
            }}>
              {Icon.check(t.accentInk, 40)}
            </div>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, letterSpacing: -1.4, margin: 0, lineHeight: 1.05 }}>
            잘했어요!
          </h1>
          <p style={{ fontSize: 14, color: t.textDim, marginTop: 16 }}>오늘의 운동을 완료했습니다.</p>
        </div>
      </div>

      {/* PR badge */}
      <div style={{ padding: '0 20px' }}>
        <div style={{
          background: t.grad, borderRadius: 24,
          padding: 16,
          display: 'flex', alignItems: 'center', gap: 14,
          color: t.accentInk,
          boxShadow: `0 12px 40px ${t.accent}44`,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 16,
            background: 'rgba(0,0,0,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {Icon.trophy(t.accentInk, 26)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 800, opacity: 0.7, letterSpacing: 1.5 }}>NEW PR · 개인 최고</div>
            <div style={{ fontSize: 17, fontWeight: 800, marginTop: 2, letterSpacing: -0.3 }}>벤치 프레스 · 90 kg × 6</div>
          </div>
        </div>
      </div>

      {/* Volume vs last session */}
      <div style={{ padding: '16px 20px 0' }}>
        {/* Quick stats — duration + sets */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
          <div style={{
            background: t.surface, borderRadius: 16,
            border: `1px solid ${t.line}`, padding: '14px 16px',
          }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: t.textDim, letterSpacing: 1.4 }}>운동 시간</div>
            <div style={{ marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ ...numStyle(26, 800), color: t.text, letterSpacing: -0.6 }}>52</span>
              <span style={{ fontSize: 12, color: t.textDim, fontWeight: 700 }}>분</span>
            </div>
          </div>
          <div style={{
            background: t.surface, borderRadius: 16,
            border: `1px solid ${t.line}`, padding: '14px 16px',
          }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: t.textDim, letterSpacing: 1.4 }}>완료 세트</div>
            <div style={{ marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ ...numStyle(26, 800), color: t.text, letterSpacing: -0.6 }}>20</span>
              <span style={{ fontSize: 12, color: t.textDim, fontWeight: 700 }}>세트</span>
            </div>
          </div>
        </div>

        <div style={{
          background: t.surface, borderRadius: 24,
          border: `1px solid ${t.line}`, padding: '20px 22px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: t.textDim, letterSpacing: 1.4 }}>운동 볼륨</span>
            <span style={{ fontSize: 11, color: t.textFaint, fontWeight: 600 }}>3일 전 · PUSH</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, minWidth: 0 }}>
              <span style={{ ...numStyle(38, 800), color: t.text, letterSpacing: -1.2, lineHeight: 1 }}>
                {fmt(todayVolume)}
              </span>
              <span style={{ fontSize: 14, color: t.textDim, fontWeight: 700 }}>kg</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ ...numStyle(18, 800), color: tone, letterSpacing: -0.3 }}>
                {sign}{fmt(Math.abs(diff))}<span style={{ fontSize: 11, marginLeft: 2, opacity: 0.85, fontWeight: 700 }}>kg</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: tone, opacity: 0.85, marginTop: 2 }}>
                {sign}{Math.abs(pct)}%
              </div>
            </div>
          </div>
          {/* Comparison bar */}
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 11, color: t.textFaint, fontWeight: 700, minWidth: 56 }}>지난번</span>
            <div style={{ flex: 1, height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ width: `${(prevVolume / Math.max(prevVolume, todayVolume)) * 100}%`, height: '100%', background: t.textFaint, borderRadius: 999 }}/>
            </div>
            <span style={{ ...numStyle(12, 700), color: t.textDim, minWidth: 64, textAlign: 'right' }}>{fmt(prevVolume)}kg</span>
          </div>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 11, color: t.accent, fontWeight: 800, minWidth: 56 }}>오늘</span>
            <div style={{ flex: 1, height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{
                width: `${(todayVolume / Math.max(prevVolume, todayVolume)) * 100}%`, height: '100%',
                background: tone, borderRadius: 999,
                boxShadow: positive ? `0 0 12px ${t.accent}66` : 'none',
              }}/>
            </div>
            <span style={{ ...numStyle(12, 800), color: t.text, minWidth: 64, textAlign: 'right' }}>{fmt(todayVolume)}kg</span>
          </div>
        </div>
      </div>

      <div style={{ height: 20 }}/>
      <div style={{ padding: '0 20px 40px' }}>
        <PressButton onClick={onDone} size="md" style={{
          width: '100%', borderRadius: 24, 
          background: t.accent, color: t.accentInk,
          border: 'none', cursor: 'pointer',
        }}>홈으로</PressButton>
      </div>
    </div>
  );
}

window.ScreenFinish = ScreenFinish;
