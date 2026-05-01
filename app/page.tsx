import { HeroMosaic } from "@/components/sections/HeroMosaic";
import { ServicesIsoGrid } from "@/components/sections/ServicesIsoGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { FAQv2 } from "@/components/sections/FAQv2";
import { CTABanner } from "@/components/sections/CTABanner";
import { siteConfig } from "@/lib/config";

/**
 * Plumbing — bespoke section order per brief 2026-05-01.
 *
 *   1. Hero       — image-mosaic (4-tile, includes iso pipe diagram)
 *   2. Services   — iso-illustration-grid (PipeIsoDiagram nav + 6 service cards w/ mini iso SVGs)
 *   3. Process    — numbered-rail (4 steps)
 *   4. TrustStrip — credential row (ROC + bonded + NSF + family-owned + brand partners)
 *   5. CaseStudy  — split-image-text (1979 Arcadia ranch repipe)
 *   6. FAQ        — accordion-clinical (8 plumbing-specific Qs)
 *   7. CTABanner  — split-photo + booking form
 *
 * Why this beats default: visitors want to see what we do (Services iso) before
 * credentials. Process before Trust because "first hour in my house" outranks
 * license number. Stats killed (fake-feeling for plumbing). FAQ critical
 * because plumbing FAQ traffic is huge.
 */
export default function HomePage() {
  return (
    <>
      {/* 1. Hero — 4-tile image mosaic w/ embedded iso pipe diagram */}
      <HeroMosaic />

      {/* 2. Services — iso-illustration grid + PipeIsoDiagram nav widget */}
      <ServicesIsoGrid />

      {/* 3. Process — numbered rail "What to expect" */}
      <ProcessTimeline />

      {/* 4. TrustStrip — ROC + bonded + NSF + family-owned + brand partners */}
      <TrustStrip />

      {/* 5. Case Study — single featured project */}
      {siteConfig.case_study && <CaseStudy />}

      {/* 6. FAQ — accordion-clinical */}
      {(siteConfig.modules?.faq !== false) && <FAQv2 />}

      {/* 7. CTA Banner — split-photo + booking */}
      <CTABanner />
    </>
  );
}
