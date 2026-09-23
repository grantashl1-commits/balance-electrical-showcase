import { useId, useMemo } from "react";
import { cn } from "@/lib/utils";
import houseImg from "@/assets/sign-house.webp";

/*
  The house from the Balance site sign, as a stage for light.
  All geometry is in the render's own pixel space (906 × 585) so the line
  drawing and every light fixture sit exactly on the photograph.
*/

export const HOUSE_W = 906;
export const HOUSE_H = 585;
export const HOUSE_SRC = houseImg;

// Deterministic PRNG so server and client draw identical stones and stars.
function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const mid = (a: number[], b: number[]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const f = (n: number) => n.toFixed(1);

/** A soft closed blob through jittered points — a tree canopy or a river stone. */
function blob(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  n: number,
  jitter: number,
  r: () => number,
) {
  const pts = Array.from({ length: n }, (_, k) => {
    const a = (k / n) * Math.PI * 2;
    const s = 1 + (r() * 2 - 1) * jitter;
    return [cx + Math.cos(a) * rx * s, cy + Math.sin(a) * ry * s];
  });
  let d = `M${f(mid(pts[0], pts[1])[0])} ${f(mid(pts[0], pts[1])[1])}`;
  for (let i = 1; i <= n; i++) {
    const p = pts[i % n];
    const m = mid(p, pts[(i + 1) % n]);
    d += `Q${f(p[0])} ${f(p[1])} ${f(m[0])} ${f(m[1])}`;
  }
  return d + "Z";
}

function useDrawingPaths() {
  return useMemo(() => {
    const r = rng(7);
    const paths: { d: string; w?: number; o?: number }[] = [];
    const battens = (x0: number, x1: number, y0: number, y1: number) => {
      let d = "";
      for (let x = x0; x <= x1; x += 9) d += `M${x} ${y0}V${y1}`;
      paths.push({ d, w: 0.6, o: 0.55 });
    };

    // Treeline behind the roof
    let tl = "M0 352";
    for (let x = 0; x < HOUSE_W; x += 24) {
      const peak = 350 - (10 + r() * 30);
      tl += `Q${x + 12} ${f(peak)} ${x + 24} ${f(346 + r() * 5)}`;
    }
    paths.push({ d: tl, w: 0.8, o: 0.6 });

    // Roof slab, walls, glazing, entry
    paths.push({ d: "M32 348H870V374H32Z", w: 1.4 });
    paths.push({ d: "M0 374H165V452H0" });
    battens(8, 160, 377, 450);
    paths.push({ d: "M165 374V452M195 376H292V432H195ZM226 376V432M258 376V432" });
    paths.push({ d: "M292 374V446M430 374V446" });
    battens(300, 424, 377, 445);
    paths.push({ d: "M432 380H500V446H432ZM466 380V446M500 374H534V446M538 374V446H778V374" });
    paths.push({ d: "M850 374V448M778 448H870" });
    // Plinth, lawns, path, road
    paths.push({ d: "M32 446H538V455H32Z" });
    paths.push({ d: "M0 459H414M584 459H906M425 455L372 493M535 455L586 493" });
    paths.push({ d: "M0 493H906M0 566H906", w: 0.8, o: 0.7 });

    // Planting along the plinth
    let plants = "";
    for (let x = 58; x < 520; x += 16) plants += `M${x} 446q8 -${f(7 + r() * 7)} 16 0`;
    for (let x = 546; x < 880; x += 16) plants += `M${x} 452q8 -${f(8 + r() * 8)} 16 0`;
    paths.push({ d: plants, w: 0.7, o: 0.7 });

    // River stones on the feature wall
    let stones = "";
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 11; col++) {
        const cx = 548 + col * 21.5 + (row % 2) * 10 + (r() - 0.5) * 5;
        const cy = 385 + row * 16.5 + (r() - 0.5) * 3;
        if (cx > 772) continue;
        stones += blob(cx, cy, 9 + r() * 2, 6.5 + r() * 1.5, 6, 0.18, r);
      }
    }
    paths.push({ d: stones, w: 0.55, o: 0.55 });

    // Trees
    paths.push({
      d: "M133 468V300M133 402L112 362M133 384L158 346M133 352L117 306M133 336L150 298",
      w: 1,
    });
    paths.push({ d: blob(130, 255, 74, 100, 16, 0.14, r), w: 0.9 });
    paths.push({ d: blob(134, 262, 46, 64, 11, 0.16, r), w: 0.6, o: 0.5 });
    paths.push({
      d: "M757 468V312M757 408L778 370M757 386L734 350M757 356L772 312M757 340L742 300",
      w: 1,
    });
    paths.push({ d: blob(764, 266, 72, 104, 16, 0.14, r), w: 0.9 });
    paths.push({ d: blob(760, 272, 44, 66, 11, 0.16, r), w: 0.6, o: 0.5 });

    return paths;
  }, []);
}

/** Architectural line drawing traced over the render. Paths carry `data-draw`. */
export function HouseDrawing({ className }: { className?: string }) {
  const paths = useDrawingPaths();
  return (
    <svg
      viewBox={`0 0 ${HOUSE_W} ${HOUSE_H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("absolute inset-0 h-full w-full", className)}
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          data-draw=""
          pathLength={1}
          strokeWidth={p.w ?? 1.1}
          opacity={p.o ?? 0.9}
        />
      ))}
    </svg>
  );
}

const SOFFIT = [40, 85, 130, 312, 352, 394, 822];
const GRAZE = [566, 620, 674, 728];
const SPIKES = [70, 150, 232, 334, 612, 700, 800, 862];
const BOLLARDS: [number, number, number][] = [
  [446, 466, 24],
  [520, 466, 24],
  [418, 484, 30],
  [549, 484, 30],
];

/**
 * Five lighting channels + stars, drawn in screen blend over the photo.
 * Uses `slice` framing, so it tracks an `object-cover` image of any box shape.
 * Groups carry `data-ch="1".."5"` and `data-stars` for timelines to drive.
 */
export function HouseLights({ className, lit = false }: { className?: string; lit?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `${n}-${uid}`;
  const stars = useMemo(() => {
    const r = rng(21);
    const out: [number, number, number][] = [];
    while (out.length < 46) {
      const x = r() * HOUSE_W;
      const y = r() * 200;
      const inTree = (Math.abs(x - 130) < 90 && y > 145) || (Math.abs(x - 764) < 90 && y > 150);
      if (!inTree) out.push([x, y, 0.4 + r() * 1.1]);
    }
    return out;
  }, []);

  const group = { opacity: lit ? 1 : 0 };

  return (
    <svg
      viewBox={`0 0 ${HOUSE_W} ${HOUSE_H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("absolute inset-0 h-full w-full", className)}
      style={{ mixBlendMode: "screen" }}
      aria-hidden
    >
      <defs>
        <radialGradient id={id("down")} cx="50%" cy="0%" r="72%" fx="50%" fy="0%">
          <stop offset="0" stopColor="#fff2da" stopOpacity="0.8" />
          <stop offset="0.18" stopColor="#ffdcaa" stopOpacity="0.42" />
          <stop offset="0.5" stopColor="#ffc98a" stopOpacity="0.12" />
          <stop offset="0.82" stopColor="#ffc47e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("up")} cx="50%" cy="100%" r="72%" fx="50%" fy="100%">
          <stop offset="0" stopColor="#fff2da" stopOpacity="0.8" />
          <stop offset="0.18" stopColor="#ffd9a3" stopOpacity="0.4" />
          <stop offset="0.5" stopColor="#ffc98a" stopOpacity="0.11" />
          <stop offset="0.82" stopColor="#ffc47e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("warm")} r="50%">
          <stop offset="0" stopColor="#fff0d6" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="#ffd39b" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffc47e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("canopy")} cx="50%" cy="70%" r="46%">
          <stop offset="0" stopColor="#ffe2b0" stopOpacity="0.5" />
          <stop offset="0.45" stopColor="#ffc67d" stopOpacity="0.16" />
          <stop offset="1" stopColor="#ffc67d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("glass")} cx="50%" cy="40%" r="75%">
          <stop offset="0" stopColor="#ffe6bd" stopOpacity="0.85" />
          <stop offset="0.6" stopColor="#ffc27e" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffab5e" stopOpacity="0.3" />
        </radialGradient>
      </defs>

      <g data-stars="" style={group}>
        {stars.map(([x, y, s], i) => (
          <circle
            key={i}
            cx={f(x)}
            cy={f(y)}
            r={f(s)}
            fill="#f4ecdf"
            opacity={0.35 + (s / 1.5) * 0.5}
          />
        ))}
      </g>

      {/* CH1 — soffit LED strip + downlight scallops */}
      <g data-ch="1" style={group}>
        <line
          x1="34"
          y1="375.5"
          x2="868"
          y2="375.5"
          stroke="#ffcf94"
          strokeWidth="9"
          opacity="0.14"
        />
        <line x1="34" y1="375" x2="868" y2="375" stroke="#fff1d9" strokeWidth="1" opacity="0.75" />
        {SOFFIT.map((x) => (
          <ellipse key={x} cx={x} cy={433} rx={22} ry={58} fill={`url(#${id("down")})`} />
        ))}
      </g>

      {/* CH2 — grazing uplights on the stone wall */}
      <g data-ch="2" style={group}>
        {GRAZE.map((x) => (
          <g key={x}>
            <ellipse cx={x} cy={398} rx={30} ry={50} fill={`url(#${id("up")})`} />
            <circle cx={x} cy={443} r={1.6} fill="#fff4e2" opacity="0.9" />
          </g>
        ))}
      </g>

      {/* CH3 — path bollards + garden spikes */}
      <g data-ch="3" style={group}>
        {BOLLARDS.map(([x, y, rx]) => (
          <g key={x}>
            <ellipse cx={x} cy={y} rx={rx} ry={rx / 4} fill={`url(#${id("warm")})`} />
            <circle cx={x} cy={y - 5} r={1.8} fill="#fff4e2" />
          </g>
        ))}
        {SPIKES.map((x) => (
          <g key={x}>
            <ellipse cx={x} cy={426} rx={16} ry={20} fill={`url(#${id("up")})`} />
            <circle cx={x} cy={441} r={1.4} fill="#fff4e2" />
          </g>
        ))}
      </g>

      {/* CH4 — tree uplights */}
      <g data-ch="4" style={group}>
        <ellipse cx="131" cy="282" rx="84" ry="122" fill={`url(#${id("canopy")})`} />
        <ellipse cx="133" cy="420" rx="11" ry="52" fill={`url(#${id("up")})`} />
        <circle cx="133" cy="467" r="2.2" fill="#fff4e2" />
        <ellipse cx="764" cy="284" rx="82" ry="124" fill={`url(#${id("canopy")})`} />
        <ellipse cx="757" cy="420" rx="11" ry="52" fill={`url(#${id("up")})`} />
        <circle cx="757" cy="467" r="2.2" fill="#fff4e2" />
      </g>

      {/* CH5 — interior glow through the glazing */}
      <g data-ch="5" style={group}>
        <ellipse cx="466" cy="410" rx="78" ry="54" fill={`url(#${id("warm")})`} opacity="0.4" />
        <rect x="196" y="377" width="95" height="54" fill={`url(#${id("glass")})`} opacity="0.62" />
        <rect x="433" y="381" width="66" height="64" fill={`url(#${id("glass")})`} opacity="0.7" />
        <rect x="501" y="377" width="32" height="68" fill={`url(#${id("glass")})`} opacity="0.25" />
        <ellipse cx="466" cy="453" rx="72" ry="9" fill={`url(#${id("warm")})`} />
        <ellipse cx="243" cy="440" rx="60" ry="7" fill={`url(#${id("warm")})`} opacity="0.8" />
      </g>
    </svg>
  );
}
