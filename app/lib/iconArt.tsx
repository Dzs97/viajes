// Shared icon artwork — vintage travel poster aesthetic.
// Avión (cream), castillo (dark forest green), mar (mustard waves), cielo (terracota).
// Used by app/icon.tsx, app/apple-icon.tsx, and app/icon-* route handlers.

export function IconArt({
  pixelSize,
  maskable = false,
}: {
  pixelSize: number;
  maskable?: boolean;
}) {
  // For maskable, shrink the inner content area to leave a "safe zone" (about 80% of total).
  // The terracota background still fills the full canvas; only the design elements scale down.
  const contentScale = maskable ? 0.8 : 1;
  const offset = (192 * (1 - contentScale)) / 2;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#c84c2a",
      }}
    >
      <svg
        viewBox="0 0 192 192"
        width={pixelSize}
        height={pixelSize}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sky / background (under everything) — also fills mask area */}
        <rect width="192" height="192" fill="#c84c2a" />

        <g
          transform={`translate(${offset}, ${offset}) scale(${contentScale})`}
        >
          {/* Sun / moon — cream circle in upper right */}
          <circle cx="148" cy="50" r="22" fill="#fbf6ec" />

          {/* Horizon haze band — softer warm color */}
          <rect y="98" width="192" height="18" fill="#e87a5d" opacity="0.5" />

          {/* Castle silhouette — dark, vintage poster style */}
          {/* Main keep wall */}
          <rect x="48" y="118" width="96" height="28" fill="#1f2a2a" />
          {/* Left tall tower */}
          <rect x="40" y="98" width="14" height="48" fill="#1f2a2a" />
          <polygon points="38,98 56,98 47,82" fill="#1f2a2a" />
          {/* Right tall tower */}
          <rect x="138" y="98" width="14" height="48" fill="#1f2a2a" />
          <polygon points="136,98 154,98 145,82" fill="#1f2a2a" />
          {/* Center small spire */}
          <rect x="93" y="108" width="6" height="10" fill="#1f2a2a" />
          <polygon points="90,108 102,108 96,99" fill="#1f2a2a" />
          {/* Crenellations on main wall */}
          <rect x="58" y="113" width="6" height="5" fill="#1f2a2a" />
          <rect x="70" y="113" width="6" height="5" fill="#1f2a2a" />
          <rect x="82" y="113" width="6" height="5" fill="#1f2a2a" />
          <rect x="104" y="113" width="6" height="5" fill="#1f2a2a" />
          <rect x="116" y="113" width="6" height="5" fill="#1f2a2a" />
          <rect x="128" y="113" width="6" height="5" fill="#1f2a2a" />

          {/* Sea waves — mustard fill with cream foam highlights */}
          <path
            d="M 0 150 Q 16 146 32 150 T 64 150 T 96 150 T 128 150 T 160 150 T 192 150 L 192 192 L 0 192 Z"
            fill="#b8893a"
          />
          <path
            d="M 0 160 Q 16 156 32 160 T 64 160 T 96 160 T 128 160 T 160 160 T 192 160"
            stroke="#fbf6ec"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M 0 172 Q 16 168 32 172 T 64 172 T 96 172 T 128 172 T 160 172 T 192 172"
            stroke="#fbf6ec"
            strokeWidth="1.2"
            fill="none"
            opacity="0.55"
          />
          <path
            d="M 0 184 Q 16 180 32 184 T 64 184 T 96 184 T 128 184 T 160 184 T 192 184"
            stroke="#fbf6ec"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />

          {/* Airplane — cream silhouette, banking left, upper-mid area */}
          <g transform="translate(70, 56) rotate(-18)">
            {/* Body */}
            <rect x="-22" y="-3" width="46" height="6" rx="3" fill="#fbf6ec" />
            {/* Front wings */}
            <polygon points="0,-3 10,-20 16,-3" fill="#fbf6ec" />
            <polygon points="0,3 10,20 16,3" fill="#fbf6ec" />
            {/* Tail wings */}
            <polygon points="-22,-3 -30,-12 -16,-3" fill="#fbf6ec" />
            <polygon points="-22,3 -30,12 -16,3" fill="#fbf6ec" />
            {/* Nose */}
            <polygon points="24,-3 30,0 24,3" fill="#fbf6ec" />
            {/* Cockpit window dot */}
            <circle cx="14" cy="0" r="1.4" fill="#c84c2a" />
          </g>
        </g>
      </svg>
    </div>
  );
}
