export default function GeometricBg({ opacity = 0.04 }) {
  return (
    <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="geo" width="80" height="80" patternUnits="userSpaceOnUse">
          <polygon points="40,4 76,22 76,58 40,76 4,58 4,22"
            fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity={opacity * 10} />
          <line x1="40" y1="4"  x2="40" y2="76" stroke="#C9A84C" strokeWidth="0.3" opacity={opacity * 8} />
          <line x1="4"  y1="40" x2="76" y2="40" stroke="#C9A84C" strokeWidth="0.3" opacity={opacity * 8} />
          <circle cx="40" cy="40" r="8" fill="none" stroke="#C9A84C" strokeWidth="0.4" opacity={opacity * 12} />
          <circle cx="40" cy="40" r="2" fill="#C9A84C" opacity={opacity * 15} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geo)" />
    </svg>
  );
}
