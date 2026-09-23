import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

const SWEEP = 270; // degrees of travel, -135° → +135°
const TICKS = 28;

// Rounded so server and browser trig agree exactly (avoids hydration mismatches).
const round = (n: number) => Math.round(n * 100) / 100;
const polar = (deg: number, r: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [round(100 + r * Math.cos(a)), round(100 + r * Math.sin(a))];
};

const arc = (from: number, to: number, r: number) => {
  const [x0, y0] = polar(from, r);
  const [x1, y1] = polar(to, r);
  const large = to - from > 180 ? 1 : 0;
  return `M${x0} ${y0}A${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
};

/**
 * A rotary dimmer, like the keypads we install. Drag around the dial or use
 * the arrow keys; exposed to assistive tech as a slider.
 */
export function Dial({
  value,
  onChange,
  className,
  label = "Dimmer level",
}: {
  value: number;
  onChange: (v: number) => void;
  className?: string;
  label?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const angle = -SWEEP / 2 + (value / 100) * SWEEP;

  const fromPointer = (e: PointerEvent<SVGSVGElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    let deg = (Math.atan2(dx, -dy) * 180) / Math.PI;
    deg = Math.max(-SWEEP / 2, Math.min(SWEEP / 2, deg));
    onChange(Math.round(((deg + SWEEP / 2) / SWEEP) * 100));
  };

  const onKey = (e: KeyboardEvent) => {
    const step = {
      ArrowUp: 5,
      ArrowRight: 5,
      ArrowDown: -5,
      ArrowLeft: -5,
      PageUp: 10,
      PageDown: -10,
    }[e.key];
    if (step) onChange(Math.max(0, Math.min(100, value + step)));
    else if (e.key === "Home") onChange(0);
    else if (e.key === "End") onChange(100);
    else return;
    e.preventDefault();
  };

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-valuetext={`${value}%`}
      data-cursor="Drag to dim"
      onKeyDown={onKey}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        fromPointer(e);
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) fromPointer(e);
      }}
      className={cn(
        "cursor-grab touch-none select-none rounded-full active:cursor-grabbing",
        className,
      )}
    >
      <defs>
        <radialGradient id="dial-knob" cx="40%" cy="30%" r="80%">
          <stop offset="0" stopColor="#3a3632" />
          <stop offset="0.6" stopColor="#1f1d1b" />
          <stop offset="1" stopColor="#141312" />
        </radialGradient>
        <filter id="dial-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* ticks */}
      {Array.from({ length: TICKS }).map((_, i) => {
        const deg = -SWEEP / 2 + (i / (TICKS - 1)) * SWEEP;
        const [x0, y0] = polar(deg, 92);
        const [x1, y1] = polar(deg, i % 3 === 0 ? 84 : 87);
        const on = deg <= angle;
        return (
          <line
            key={i}
            x1={x0}
            y1={y0}
            x2={x1}
            y2={y1}
            stroke={on ? "#ffe7c2" : "currentColor"}
            strokeOpacity={on ? 1 : 0.25}
            strokeWidth={1.2}
          />
        );
      })}

      {/* track + lit arc */}
      <path
        d={arc(-SWEEP / 2, SWEEP / 2, 76)}
        stroke="currentColor"
        strokeOpacity={0.12}
        strokeWidth={2}
        fill="none"
      />
      {value > 0 && (
        <>
          <path
            d={arc(-SWEEP / 2, angle, 76)}
            stroke="#f2c88b"
            strokeWidth={5}
            fill="none"
            opacity={0.5}
            filter="url(#dial-glow)"
          />
          <path
            d={arc(-SWEEP / 2, angle, 76)}
            stroke="#ffe7c2"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}

      {/* knob */}
      <circle cx="100" cy="100" r="62" fill="url(#dial-knob)" stroke="rgb(214 202 189 / 0.18)" />
      <circle cx="100" cy="100" r="54" fill="none" stroke="rgb(214 202 189 / 0.06)" />
      <g transform={`rotate(${angle} 100 100)`}>
        <line
          x1="100"
          y1="46"
          x2="100"
          y2="60"
          stroke="#ece4da"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="100"
          cy="42"
          r="2.4"
          fill={value > 0 ? "#ffe7c2" : "#6b635b"}
          style={{ filter: value > 0 ? "drop-shadow(0 0 4px #f2c88b)" : undefined }}
        />
      </g>
      <text
        x="100"
        y="108"
        textAnchor="middle"
        fill="#ece4da"
        style={{ fontFamily: "var(--font-display)", fontSize: 26 }}
      >
        {value}%
      </text>
    </svg>
  );
}
