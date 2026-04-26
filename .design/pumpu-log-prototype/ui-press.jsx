// ui-press.jsx — shared press-feedback button.
// Drop-in replacement for <button>: same props/style, plus a tactile
// scale + dim on press. Pointer events keep touch + mouse + leave/cancel
// all releasing the pressed state cleanly.
//
// Size tokens (apply to BOTH icon-square and text buttons):
//   xs — 32px tall (chip stepper +/-, set count stepper, tiny inline actions)
//   sm — 40px tall (icon back, secondary actions, inline)
//   md — 56px tall (full-width primary CTA, modal actions)
// Pass size="xs" | "sm" | "md". Pixel values still come from the merged style,
// so callers can override (just don't override `height` if you want the token).

const BTN_SIZE = {
  xs: { height: 32, fontSize: 12, paddingX: 10, radius: 10,  iconRadius: 10 },
  sm: { height: 40, fontSize: 13, paddingX: 14, radius: 12,  iconRadius: 12 },
  md: { height: 56, fontSize: 16, paddingX: 22, radius: 18,  iconRadius: 16 },
};

function PressButton({ onClick, style, children, disabled, scale = 0.96, size, iconOnly = false, ...rest }) {
  const [pressed, setPressed] = React.useState(false);
  const down = (e) => {
    if (disabled) return;
    try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch (_) {}
    setPressed(true);
  };
  const up = () => setPressed(false);
  const tok = size ? BTN_SIZE[size] : null;
  const sizeStyle = tok ? (iconOnly ? {
    width: tok.height, height: tok.height,
    borderRadius: tok.iconRadius, padding: 0,
  } : {
    height: tok.height,
    padding: `0 ${tok.paddingX}px`,
    borderRadius: tok.radius,
    fontSize: tok.fontSize,
    fontWeight: 700,
    letterSpacing: -0.1,
  }) : {};
  return (
    <button
      onPointerDown={down}
      onPointerUp={up}
      onPointerCancel={up}
      onPointerLeave={up}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...sizeStyle,
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
window.BTN_SIZE = BTN_SIZE;
