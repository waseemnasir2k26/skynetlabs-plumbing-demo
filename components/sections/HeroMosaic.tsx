"use client";
import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { renderItalic } from "@/lib/markdown-italic";
import { PipeIsoDiagram } from "@/components/sections/PipeIsoDiagram";

/**
 * Plumbing-bespoke Hero — 4-tile image mosaic.
 *
 * Layout (desktop):
 *   ┌────────┬────────┐    Tile 1: chrome faucet macro
 *   │   1    │   2    │    Tile 2: tech-in-action
 *   ├────────┼────────┤    Tile 3: iso pipe diagram (animated SVG)
 *   │   3    │   4    │    Tile 4: clean kitchen after-shot
 *   └────────┴────────┘
 *
 * Headline overlay sits center-top across the mosaic, on a cream-paper
 * card with cobalt-underlined primary CTA + outlined secondary CTA.
 *
 * Mobile: 2x2 collapses to single column, headline sits above tiles.
 */
export function HeroMosaic() {
  const cfg = siteConfig as unknown as {
    brand: { tagline: string };
    owner: { contact_phone?: string };
    copy?: { h1?: string; sub?: string; primary_cta?: string };
    hero?: { h1?: string; sub?: string; photo_url?: string };
    hero_mosaic?: Array<{ src: string; alt: string; caption?: string }>;
  };
  const { brand, owner, copy, hero } = cfg;
  const tiles: Array<{ src: string; alt: string; caption?: string }> =
    cfg.hero_mosaic ?? [
      { src: hero?.photo_url ?? "", alt: "Plumbing", caption: "" },
      { src: hero?.photo_url ?? "", alt: "Plumbing", caption: "" },
      { src: "iso", alt: "Iso pipe diagram", caption: "" },
      { src: hero?.photo_url ?? "", alt: "Plumbing", caption: "" },
    ];

  const h1Text = copy?.h1 ?? hero?.h1 ?? brand.tagline;
  const subText = copy?.sub ?? hero?.sub ?? brand.tagline;
  const primaryCta = copy?.primary_cta ?? "Book a plumber →";
  const tel = `tel:${owner.contact_phone ?? ""}`;

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden"
      style={{ background: "var(--bg, #FBFBF8)" }}
    >
      {/* Sentinel for StickyTelBar IntersectionObserver */}
      <div id="hero-sentinel" className="absolute bottom-0 left-0 h-1 w-full" aria-hidden />

      <div className="container pb-12 pt-10 md:pb-20 md:pt-16">
        {/* Headline block */}
        <motion.div
          className="mx-auto mb-8 max-w-3xl text-center md:mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <p
            className="mb-4 text-[10px] font-medium uppercase tracking-[0.25em]"
            style={{
              fontFamily: "var(--font-mono, JetBrains Mono, ui-monospace)",
              color: "#0046A8",
            }}
          >
            ROC #312487 · Phoenix · Since 2004
          </p>
          <h1
            className="text-balance text-4xl font-bold leading-[1.05] tracking-[-0.025em] md:text-5xl lg:text-6xl"
            style={{
              fontFamily: "var(--font-display, var(--font-heading), Manrope)",
              color: "#0E1A2E",
            }}
          >
            {renderItalic(h1Text)}
          </h1>
          <p
            className="mx-auto mt-5 max-w-2xl text-base md:text-lg"
            style={{
              fontFamily: "var(--font-body-v2, var(--font-body), Manrope)",
              color: "#5C6878",
              lineHeight: 1.55,
            }}
          >
            {subText}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#quote"
              className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-all hover:opacity-90"
              style={{
                background: "#0046A8",
                color: "#FBFBF8",
                fontFamily: "var(--font-body-v2, Manrope)",
                boxShadow: "0 4px 14px rgba(0,70,168,0.25)",
              }}
            >
              {primaryCta}
            </a>
            {owner.contact_phone && (
              <a
                href={tel}
                className="inline-flex items-center gap-2 rounded-md border-2 px-6 py-3 text-sm font-semibold transition-all hover:bg-[rgba(0,70,168,0.04)]"
                style={{
                  borderColor: "#0046A8",
                  color: "#0046A8",
                  fontFamily: "var(--font-body-v2, Manrope)",
                  background: "transparent",
                }}
              >
                Get an estimate
              </a>
            )}
          </div>
        </motion.div>

        {/* 2x2 mosaic */}
        <motion.div
          className="grid gap-3 md:gap-4"
          style={{
            gridTemplateColumns: "repeat(2, 1fr)",
            gridAutoRows: "minmax(180px, 1fr)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          {tiles.map((tile, i) => (
            <MosaicTile key={i} tile={tile} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function MosaicTile({
  tile,
  index,
}: {
  tile: { src: string; alt: string; caption?: string };
  index: number;
}) {
  const isIso = tile.src === "iso";

  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg"
      style={{
        background: isIso ? "#FFFFFF" : "#EAEFF5",
        border: "1px solid #EAEFF5",
        aspectRatio: "4 / 3",
      }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.08, ease: [0.4, 0, 0.2, 1] }}
    >
      {isIso ? (
        <div className="flex h-full w-full items-center justify-center p-4 md:p-6">
          <PipeIsoDiagram interactive={false} compact />
        </div>
      ) : (
        <Image
          src={tile.src}
          alt={tile.alt}
          fill
          priority={index === 0}
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          style={{ filter: "saturate(0.85)" }}
        />
      )}

      {/* Caption strip */}
      {tile.caption && (
        <div
          className="absolute bottom-0 left-0 right-0 px-3 py-2 md:px-4 md:py-2.5"
          style={{
            background: isIso
              ? "linear-gradient(180deg, transparent 0%, rgba(251,251,248,0.95) 100%)"
              : "linear-gradient(180deg, transparent 0%, rgba(14,26,46,0.85) 100%)",
          }}
        >
          <p
            className="text-[10px] font-medium uppercase tracking-[0.18em] md:text-[11px]"
            style={{
              fontFamily: "var(--font-mono, JetBrains Mono, ui-monospace)",
              color: isIso ? "#0046A8" : "#FBFBF8",
            }}
          >
            {tile.caption}
          </p>
        </div>
      )}
    </motion.div>
  );
}
