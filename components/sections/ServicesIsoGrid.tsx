"use client";
import * as React from "react";
import { siteConfig } from "@/lib/config";
import { PipeIsoDiagram } from "@/components/sections/PipeIsoDiagram";

/**
 * ServicesIsoGrid — plumbing-bespoke service section.
 *
 * 1. Top: full PipeIsoDiagram as navigation widget (hover/click pipe → scroll to service).
 * 2. Below: 6 service tiles, each with its own isometric SVG mini-diagram +
 *    long-form blurb. Anchor IDs (`service-<slug>`) match the pipe targets.
 *
 * Scroll-snap rail on mobile horizontal scroll for compact density.
 */

type IsoSvg = (props: { color?: string }) => React.JSX.Element;

const ISO_DIAGRAMS: Record<string, IsoSvg> = {
  "slab-leak-detection": ({ color = "#0046A8" }) => (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      {/* slab outline */}
      <path d="M 10 60 L 110 60 L 110 70 L 10 70 Z" fill="none" stroke="#9DAEC4" strokeWidth="1" />
      <path d="M 10 60 L 30 50 L 110 50 L 90 60" fill="none" stroke="#9DAEC4" strokeWidth="1" strokeDasharray="2 2" />
      {/* hidden pipe under slab */}
      <path d="M 20 65 L 100 65" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* leak indicator */}
      <circle cx="65" cy="65" r="3" fill={color} opacity="0.9" />
      <circle cx="65" cy="65" r="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4">
        <animate attributeName="r" from="3" to="14" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* thermal scan dots */}
      <g opacity="0.6">
        <rect x="55" y="45" width="2" height="2" fill={color} />
        <rect x="60" y="42" width="2" height="2" fill={color} />
        <rect x="65" y="40" width="2" height="2" fill={color} />
        <rect x="70" y="42" width="2" height="2" fill={color} />
        <rect x="75" y="45" width="2" height="2" fill={color} />
      </g>
    </svg>
  ),
  "tankless-conversion": ({ color = "#0046A8" }) => (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      {/* old tank crossed out */}
      <rect x="15" y="20" width="20" height="40" fill="none" stroke="#9DAEC4" strokeWidth="1" opacity="0.5" />
      <line x1="15" y1="20" x2="35" y2="60" stroke="#9DAEC4" strokeWidth="1" opacity="0.5" />
      {/* arrow */}
      <path d="M 45 40 L 65 40 M 60 35 L 65 40 L 60 45" fill="none" stroke="#5C6878" strokeWidth="1" />
      {/* tankless unit */}
      <rect x="75" y="25" width="30" height="35" fill="#FFFFFF" stroke={color} strokeWidth="1.5" rx="2" />
      <line x1="80" y1="32" x2="100" y2="32" stroke={color} strokeWidth="1" />
      <line x1="80" y1="37" x2="100" y2="37" stroke={color} strokeWidth="1" />
      <line x1="80" y1="42" x2="100" y2="42" stroke={color} strokeWidth="1" />
      <circle cx="90" cy="52" r="3" fill={color} opacity="0.6">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
      </circle>
      {/* hot water out */}
      <path d="M 90 25 L 90 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 90 60 L 90 70" stroke="#9DAEC4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "pex-repipe": ({ color = "#0046A8" }) => (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      {/* manifold */}
      <rect x="10" y="30" width="14" height="22" fill="#FFFFFF" stroke={color} strokeWidth="1.5" rx="1" />
      {/* home-run lines */}
      <path d="M 24 35 L 50 25 L 110 22" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M 24 38 L 50 35 L 110 35" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M 24 42 L 50 50 L 110 48" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M 24 47 L 50 60 L 110 65" fill="none" stroke={color} strokeWidth="1.5" />
      {/* fixture stubs */}
      <circle cx="110" cy="22" r="2.5" fill={color} />
      <circle cx="110" cy="35" r="2.5" fill={color} />
      <circle cx="110" cy="48" r="2.5" fill={color} />
      <circle cx="110" cy="65" r="2.5" fill={color} />
    </svg>
  ),
  "hydro-jetting": ({ color = "#0046A8" }) => (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      {/* drain pipe cross-section */}
      <ellipse cx="60" cy="40" rx="50" ry="12" fill="none" stroke="#9DAEC4" strokeWidth="1.5" />
      <ellipse cx="60" cy="40" rx="50" ry="12" fill="none" stroke="#9DAEC4" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      {/* jet head */}
      <rect x="8" y="38" width="6" height="4" fill={color} />
      {/* jet streams */}
      <path d="M 15 40 Q 30 35 45 40" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
      <path d="M 15 40 Q 30 45 45 40" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
      <path d="M 15 40 Q 35 32 55 40" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M 15 40 Q 35 48 55 40" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* PSI label */}
      <text x="80" y="62" style={{ fontFamily: "var(--font-mono, ui-monospace)", fontSize: "8px", fill: color, letterSpacing: "0.06em" }}>4000 PSI</text>
    </svg>
  ),
  "ro-water-treatment": ({ color = "#0046A8" }) => (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      {/* RO membrane stages */}
      <rect x="15" y="25" width="14" height="35" fill="none" stroke="#9DAEC4" strokeWidth="1" rx="1" />
      <rect x="35" y="25" width="14" height="35" fill="none" stroke="#9DAEC4" strokeWidth="1" rx="1" />
      <rect x="55" y="25" width="14" height="35" fill="#FFFFFF" stroke={color} strokeWidth="1.5" rx="1" />
      <rect x="75" y="25" width="14" height="35" fill="none" stroke="#9DAEC4" strokeWidth="1" rx="1" />
      {/* connecting lines */}
      <path d="M 29 42 L 35 42 M 49 42 L 55 42 M 69 42 L 75 42" stroke={color} strokeWidth="1.5" />
      {/* clean water out */}
      <path d="M 89 42 L 110 42" stroke={color} strokeWidth="2" />
      <circle cx="105" cy="42" r="2" fill={color} />
      {/* drop */}
      <path d="M 105 50 L 105 60 M 102 56 L 105 60 L 108 56" fill="none" stroke={color} strokeWidth="1" />
    </svg>
  ),
  "sewer-camera": ({ color = "#0046A8" }) => (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      {/* underground pipe */}
      <path d="M 10 50 L 110 55" stroke="#9DAEC4" strokeWidth="3" />
      <path d="M 10 60 L 110 65" stroke="#9DAEC4" strokeWidth="3" opacity="0.4" />
      {/* camera */}
      <circle cx="80" cy="52" r="4" fill={color} />
      <circle cx="80" cy="52" r="2" fill="#FFFFFF" />
      {/* cable */}
      <path d="M 80 52 Q 50 45 20 30" fill="none" stroke={color} strokeWidth="1.2" />
      {/* light cone */}
      <path d="M 84 52 L 105 47 L 105 57 Z" fill={color} opacity="0.18" />
      {/* GPS pin */}
      <circle cx="20" cy="22" r="3" fill={color} />
      <path d="M 20 25 L 20 30" stroke={color} strokeWidth="1" />
    </svg>
  ),
};

const FALLBACK_ISO: IsoSvg = ({ color = "#0046A8" }) => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
    <path d="M 10 40 L 110 40" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="60" cy="40" r="6" fill="#FFFFFF" stroke={color} strokeWidth="1.5" />
  </svg>
);

export function ServicesIsoGrid() {
  type RawService = {
    slug?: string;
    title?: string;
    name?: string;
    blurb?: string;
    description?: string;
  };
  const cfg = siteConfig as unknown as { services_v2?: RawService[]; services: RawService[] };
  const items = cfg.services_v2
    ? cfg.services_v2.map((s) => ({
        title: s.title ?? "",
        blurb: s.blurb ?? "",
        slug: s.slug ?? "",
      }))
    : cfg.services.map((s) => ({
        title: s.title ?? s.name ?? "",
        blurb: s.blurb ?? s.description ?? "",
        slug: s.slug ?? "",
      }));

  return (
    <section id="services" className="py-20 md:py-28" style={{ background: "#FFFFFF" }}>
      <div className="container">
        {/* Header */}
        <div className="mb-12 max-w-2xl md:mb-16">
          <p
            className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em]"
            style={{ color: "#0046A8", fontFamily: "var(--font-mono, JetBrains Mono, ui-monospace)" }}
          >
            Services · Cold + Hot + Vent + Drain
          </p>
          <h2
            className="text-3xl font-bold leading-[1.1] tracking-[-0.025em] md:text-5xl"
            style={{ color: "#0E1A2E", fontFamily: "var(--font-display, Manrope)" }}
          >
            Six things we do better than anyone in Maricopa County.
          </h2>
          <p
            className="mt-4 max-w-xl text-base"
            style={{ color: "#5C6878", lineHeight: 1.6 }}
          >
            Hover any pipe in the diagram below to highlight the matching service. Click it to jump.
          </p>
        </div>

        {/* Pipe iso navigation widget */}
        <div className="mb-16 md:mb-24">
          <PipeIsoDiagram interactive />
        </div>

        {/* Service tiles */}
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service, i) => {
            const Iso = ISO_DIAGRAMS[service.slug] ?? FALLBACK_ISO;
            return (
              <article
                key={service.slug || i}
                id={`service-${service.slug}`}
                className="group flex flex-col gap-4 scroll-mt-24"
                style={{
                  borderLeft: "1px solid #EAEFF5",
                  paddingLeft: "1.25rem",
                }}
              >
                {/* Iso diagram */}
                <div
                  className="relative w-full"
                  style={{
                    background: "#FBFBF8",
                    border: "1px solid #EAEFF5",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    aspectRatio: "3 / 2",
                  }}
                >
                  <Iso color="#0046A8" />
                </div>
                <h3
                  className="text-xl font-bold leading-tight tracking-[-0.02em] md:text-2xl"
                  style={{ color: "#0E1A2E", fontFamily: "var(--font-display, Manrope)" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#5C6878", maxWidth: "38ch" }}
                >
                  {service.blurb}
                </p>
                <a
                  href={service.slug ? `/services/${service.slug}` : "#services"}
                  className="cobalt-link self-start text-sm font-semibold"
                  style={{ fontFamily: "var(--font-body-v2, Manrope)" }}
                >
                  Read the full spec →
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
