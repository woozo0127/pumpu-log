// ui-press.jsx — shared press-feedback button.
// Drop-in replacement for <button>: same props/style, plus a tactile
// scale + dim on press. Pointer events keep touch + mouse + leave/cancel
// all releasing the pressed state cleanly.

function PressButton({ onClick, style, children, disabled, scale = 0.96, ...rest }) {
  const [pressed, setPressed] = React.useState(false);
  const down = (e) => {
    if (disabled) return;
    try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch (_) {}
    setPressed(true);
  };
  const up = () => setPressed(false);
  return (
    <button
      onPointerDown={down}
      onPointerUp={up}
      onPointerCancel={up}
      onPointerLeave={up}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...style,
        transform: pressed ? `scale(${scale})` : 'scale(1)',
        filter: pressed ? 'brightness(0.85)' : 'brightness(1)',
        transition: 'transform 120ms cubic-bezier(0.32,0.72,0.24,1.1), filter 120ms ease',
        WebkitTapHighlightColor: 'transparent',
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

// PressRow — clickable container (renders as <div>) with the same press feedback.
// Use as a drop-in replacement for <div onClick=...> rows / cards. Slightly
// gentler scale (0.985) so big cards don't feel rubbery.
function PressRow({ onClick, style, children, scale = 0.985, as = 'div', ...rest }) {
  const [pressed, setPressed] = React.useState(false);
  const down = (e) => {
    try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch (_) {}
    setPressed(true);
  };
  const up = () => setPressed(false);
  const Tag = as;
  return (
    <Tag
      onPointerDown={down}
      onPointerUp={up}
      onPointerCancel={up}
      onPointerLeave={up}
      onClick={onClick}
      style={{
        ...style,
        cursor: 'pointer',
        transform: pressed ? `scale(${scale})` : 'scale(1)',
        filter: pressed ? 'brightness(0.92)' : 'brightness(1)',
        transition: 'transform 140ms cubic-bezier(0.32,0.72,0.24,1.1), filter 140ms ease',
        WebkitTapHighlightColor: 'transparent',
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

window.PressButton = PressButton;
window.PressRow = PressRow;
