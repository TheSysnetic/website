"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/lib/content";
import SceneSection from "@/components/layout/SceneSection";
import Button from "@/components/ui/Button";
import ProjectVisual from "@/components/ui/ProjectVisual";

/**
 * Sticky, stacking project panels. Each panel recedes (scale + dim overlay) as the next one
 * slides over it. Only transform/opacity are animated — no filters — so it stays smooth.
 */
export default function WorkStack() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-work-card]");
        cards.forEach((card, i) => {
          const panel = card.querySelector("[data-panel]");
          const dim = card.querySelector("[data-dim]");
          const visual = card.querySelector("[data-visual]");
          const float = card.querySelector("[data-visual-float]");

          // the visual rises and settles as the panel arrives (2D only: 3D transforms inside
          // stacked sticky layers cause z-order glitches and flicker)
          gsap.fromTo(
            visual,
            { y: 90, scale: 0.94 },
            { y: 0, scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top 20%", scrub: 0.6 } },
          );
          gsap.fromTo(float, { y: 50, x: 20 }, { y: 0, x: 0, ease: "none", scrollTrigger: { trigger: card, start: "top 90%", end: "top 15%", scrub: 0.6 } });

          const next = cards[i + 1];
          if (!next) return;
          const tl = gsap.timeline({ scrollTrigger: { trigger: next, start: "top bottom", end: "top 14%", scrub: 0.6 } });
          tl.to(panel, { scale: 0.92, ease: "none" }, 0).to(dim, { opacity: 0.65, ease: "none" }, 0);
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <SceneSection shape="wave" side={0} intensity={0.85} className="relative py-32 md:py-40" ariaLabel="Selected work">
      <div ref={root} className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow" data-reveal>Selected work</p>
            <h2 data-split className="display mt-6 text-[clamp(2.5rem,6vw,5.5rem)]">
              Our collaborative <span className="text-gradient">creations.</span>
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-muted" data-reveal>
            A few of the products we&apos;ve designed, built and launched with our partners.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-6 lg:mt-20 lg:gap-[10vh]">
          {projects.map((p, i) => (
            <article key={p.slug} data-work-card className="relative isolate lg:sticky lg:top-[11vh]" style={{ zIndex: i + 1 }}>
              <Link href={`/work/${p.slug}/`} data-cursor="View" className="group block" aria-label={`${p.name} case study`}>
                <div
                  data-panel
                  className="relative origin-top overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#090c18] [transform:translateZ(0)]"
                >
                  {/* soft accent wash so each panel has its own mood */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{ background: `radial-gradient(70% 90% at 85% 40%, ${p.accent}1f, transparent 65%)` }}
                  />
                  <div className="relative grid items-center gap-10 p-6 md:p-10 lg:min-h-[74vh] lg:grid-cols-12 lg:gap-6 lg:p-14">
                    <div className="flex flex-col justify-between gap-8 lg:col-span-4 lg:h-full">
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg/50">
                        <span className="text-accent">0{i + 1}</span> / 0{projects.length} — {p.industry}
                      </p>
                      <div>
                        <h3 className="display text-4xl md:text-5xl">{p.name}</h3>
                        <p className="mt-4 max-w-sm leading-relaxed text-fg/65">{p.tagline}</p>
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {p.services.map((s) => (
                            <li key={s} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-fg/70">{s}</li>
                          ))}
                        </ul>
                      </div>
                      <span className="inline-flex items-center gap-3 text-sm text-fg/80 transition-colors group-hover:text-accent">
                        View case study
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                          ↗
                        </span>
                      </span>
                    </div>
                    <div className="lg:col-span-8">
                      <div data-visual className="origin-bottom will-change-transform">
                        <ProjectVisual project={p} priority={i === 0} sizes="(min-width: 1024px) 55vw, 90vw" />
                      </div>
                    </div>
                  </div>
                  <div data-dim aria-hidden className="pointer-events-none absolute inset-0 bg-ink opacity-0" />
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-20 flex justify-center" data-reveal>
          <Button href="/work/" variant="ghost">All projects</Button>
        </div>
      </div>
    </SceneSection>
  );
}
