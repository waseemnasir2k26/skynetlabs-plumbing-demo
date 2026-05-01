"use client";
import * as React from "react";

/**
 * PipeIsoDiagram — bespoke plumbing flourish.
 *
 * Hand-built isometric SVG of a residential plumbing system:
 *   • Cobalt cold-supply line (top)
 *   • Crimson hot-supply line (parallel below cold)
 *   • Steel vent stack (rising vertical)
 *   • Navy drain main (bottom, slope to sewer)
 *
 * Hover or focus on any pipe → it illuminates cobalt, joints light up,
 * and the matching service slug below scrolls into view. Educational +
 * navigational at once.
 *
 * Width-responsive. Renders as decorative if `interactive={false}`.
 */
type PipeKind = "cold" | "hot" | "vent" | "drain";

interface PipeSegment {
  id: PipeKind;
  label: string;
  serviceSlug: string;            // scrolls to /services/<slug> anchor in #services
  callout: { x: number; y: number; align?: "start" | "middle" | "end" };
  // d = SVG path (isometric — 30° axes)
  d: string;
}

const SEGMENTS: PipeSegment[] = [
  {
    id: "cold",
    label: "COLD SUPPLY · 60 PSI",
    serviceSlug: "pex-repipe",
    callout: { x: 60, y: 70, align: "start" },
    // long horizontal cold line, then drop into manifold
    d: "M 60 110 L 280 80 L 460 100 L 640 70",
  },
  {
    id: "hot",
    label: "HOT SUPPLY · TANKLESS",
    serviceSlug: "tankless-conversion",
    callout: { x: 60, y: 165, align: "start" },
    d: "M 60 200 L 280 170 L 460 190 L 640 160",
  },
  {
    id: "vent",
    label: "VENT STACK · 2\" PVC",
    serviceSlug: "sewer-camera",
    callout: { x: 480, y: 30, align: "middle" },
    d: "M 460 50 L 460 290",
  },
  {
    id: "drain",
    label: "DRAIN MAIN · 4\" SLOPE",
    serviceSlug: "hydro-jetting",
    callout: { x: 60, y: 320, align: "start" },
    d: "M 60 290 L 280 270 L 460 290 L 640 260",
  },
];

const JOINTS: Array<{ x: number; y: number; pipe: PipeKind }> = [
  { x: 60, y: 110, pipe: "cold" },
  { x: 280, y: 80, pipe: "cold" },
  { x: 460, y: 100, pipe: "cold" },
  { x: 640, y: 70, pipe: "cold" },
  { x: 60, y: 200, pipe: "hot" },
  { x: 280, y: 170, pipe: "hot" },
  { x: 460, y: 190, pipe: "hot" },
  { x: 640, y: 160, pipe: "hot" },
  { x: 460, y: 50, pipe: "vent" },
  { x: 460, y: 290, pipe: "drain" },
  { x: 60, y: 290, pipe: "drain" },
  { x: 280, y: 270, pipe: "drain" },
  { x: 640, y: 260, pipe: "drain" },
];

interface PipeIsoDiagramProps {
  className?: string;
  interactive?: boolean;
  compact?: boolean;
}

export function PipeIsoDiagram({
  className,
  interactive = true,
  compact = false,
}: PipeIsoDiagramProps) {
  const [active, setActive] = React.useState<PipeKind | null>(null);

  const handleClick = (slug: string) => {
    if (typeof window === "undefined") return;
    const target = document.getElementById(`service-${slug}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      const services = document.getElementById("services");
      services?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className={className}
      style={{
        background: compact
          ? "transparent"
          : "linear-gradient(180deg, #FFFFFF 0%, #FBFBF8 100%)",
        borderRadius: compact ? 0 : "0.75rem",
        border: compact ? "none" : "1px solid #EAEFF5",
        padding: compact ? 0 : "1.5rem",
      }}
      role={interactive ? "img" : undefined}
      aria-label="Residential plumbing isometric diagram. Hover any line to illuminate its service."
    >
      <svg
        viewBox="0 0 700 360"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {/* Iso ground grid (subtle chrome) */}
        <defs>
          <pattern
            id="iso-grid"
            width="40"
            height="23"
            patternTransform="skewX(-30)"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 0 0 L 0 23 M 0 23 L 40 23" stroke="#9DAEC4" strokeOpacity="0.18" strokeWidth="0.5" fill="none" />
          </pattern>
        </defs>
        <rect width="700" height="360" fill="url(#iso-grid)" opacity="0.6" />

        {/* House envelope (chrome outline, iso) */}
        <path
          d="M 40 320 L 40 60 L 360 30 L 680 60 L 680 320 Z"
          fill="none"
          stroke="#9DAEC4"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="3 4"
        />

        {/* Pipe segments */}
        {SEGMENTS.map((seg) => {
          const isActive = active === seg.id;
          return (
            <g key={seg.id}>
              <path
                d={seg.d}
                className="iso-pipe"
                data-kind={seg.id}
                data-active={isActive ? "true" : "false"}
                stroke={isActive ? "var(--pipe-" + seg.id + ")" : "#9DAEC4"}
                strokeWidth={isActive ? 4 : 3}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity={active && !isActive ? 0.35 : 0.85}
                onMouseEnter={interactive ? () => setActive(seg.id) : undefined}
                onMouseLeave={interactive ? () => setActive(null) : undefined}
                onFocus={interactive ? () => setActive(seg.id) : undefined}
                onBlur={interactive ? () => setActive(null) : undefined}
                onClick={interactive ? () => handleClick(seg.serviceSlug) : undefined}
                tabIndex={interactive ? 0 : -1}
                role={interactive ? "button" : undefined}
                aria-label={`${seg.label}. Click to view service.`}
                style={{ outline: "none" }}
              />
              {/* Mono callout */}
              <text
                x={seg.callout.x}
                y={seg.callout.y}
                textAnchor={seg.callout.align ?? "start"}
                className="pipe-callout"
                style={{
                  fontFamily: "var(--font-mono, JetBrains Mono, ui-monospace)",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fill: isActive ? "var(--pipe-" + seg.id + ")" : "#5C6878",
                  transition: "fill 220ms ease",
                  pointerEvents: "none",
                }}
              >
                {seg.label}
              </text>
            </g>
          );
        })}

        {/* Joints */}
        {JOINTS.map((j, i) => {
          const isActive = active === j.pipe;
          return (
            <circle
              key={i}
              cx={j.x}
              cy={j.y}
              r={isActive ? 5 : 3.5}
              className="iso-joint"
              data-active={isActive ? "true" : "false"}
              style={{
                fill: isActive ? "var(--pipe-" + j.pipe + ")" : "#9DAEC4",
                opacity: active && !isActive ? 0.3 : 1,
                transition: "all 220ms ease",
              }}
            />
          );
        })}

        {/* Fixture icons (kitchen + bath stubs) */}
        <g opacity="0.55">
          {/* Kitchen sink */}
          <rect x="225" y="155" width="50" height="22" fill="none" stroke="#9DAEC4" strokeWidth="1" rx="2" />
          <text x="250" y="148" textAnchor="middle" style={{ fontFamily: "var(--font-mono, ui-monospace)", fontSize: "8px", fill: "#5C6878", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Kitchen
          </text>
          {/* Bathroom */}
          <rect x="600" y="145" width="50" height="22" fill="none" stroke="#9DAEC4" strokeWidth="1" rx="2" />
          <text x="625" y="138" textAnchor="middle" style={{ fontFamily: "var(--font-mono, ui-monospace)", fontSize: "8px", fill: "#5C6878", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Master Bath
          </text>
          {/* Water heater */}
          <rect x="420" y="220" width="30" height="40" fill="none" stroke="#9DAEC4" strokeWidth="1" rx="2" />
          <text x="435" y="275" textAnchor="middle" style={{ fontFamily: "var(--font-mono, ui-monospace)", fontSize: "8px", fill: "#5C6878", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Tankless
          </text>
        </g>
      </svg>

      {/* Legend (interactive) */}
      {interactive && (
        <ul
          className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4"
          style={{ fontFamily: "var(--font-mono, JetBrains Mono, ui-monospace)" }}
        >
          {SEGMENTS.map((seg) => {
            const isActive = active === seg.id;
            return (
              <li key={seg.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(seg.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(seg.id)}
                  onBlur={() => setActive(null)}
                  onClick={() => handleClick(seg.serviceSlug)}
                  className="flex w-full items-center gap-2 rounded border px-3 py-2 text-left text-[10px] uppercase tracking-wider transition-all"
                  style={{
                    borderColor: isActive ? "var(--pipe-" + seg.id + ")" : "#EAEFF5",
                    background: isActive ? "rgba(0,70,168,0.04)" : "transparent",
                    color: isActive ? "var(--pipe-" + seg.id + ")" : "#5C6878",
                    cursor: "pointer",
                  }}
                  aria-label={`Highlight ${seg.label}`}
                >
                  <span
                    aria-hidden
                    style={{
                      display: "inline-block",
                      width: 14,
                      height: 2,
                      background: isActive ? "var(--pipe-" + seg.id + ")" : "#9DAEC4",
                    }}
                  />
                  {seg.id}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
