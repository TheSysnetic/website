"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { services } from "@/lib/content";
import SceneSection from "@/components/layout/SceneSection";
import Spotlight from "@/components/ui/Spotlight";

/** Pinned horizontal scroll through the service lines (desktop); stacked cards on mobile. */
export default function ServicesScroller() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => track.current!.scrollWidth - window.innerWidth;
      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: pin.current, start: "top top", end: () => `+=${distance()}`, scrub: true } });
      // cards tilt in as they travel across the viewport
      gsap.utils.toArray<HTMLElement>("[data-service-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { rotateY: -18, z: -120 },
          { rotateY: 0, z: 0, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "center center", scrub: true } },
        );
      });
    });
    return () => mm.revert();
  });

  return (
    <SceneSection shape="sphere" side={0} intensity={0.9} ariaLabel="Services">
      <div ref={pin} className="relative overflow-hidden lg:flex lg:h-[100svh] lg:items-center">
        <div ref={track} className="flex flex-col gap-6 px-[clamp(1.25rem,4vw,3.5rem)] py-24 [perspective:1400px] lg:flex-row lg:items-stretch lg:gap-8 lg:py-0 lg:pr-[20vw]">
          <div className="flex shrink-0 flex-col justify-between lg:w-[34vw] lg:pr-8">
            <div>
              <p className="eyebrow" data-reveal>What we do</p>
              <h2 data-split className="display mt-6 text-[clamp(2.5rem,5vw,5rem)]">
                Solutions we build <span className="text-gradient">for you.</span>
              </h2>
            </div>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted" data-reveal>
              Six disciplines, one team. From the first sketch to the thousandth deploy, we cover the full life of your product.
            </p>
          </div>

          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}/`} data-service-card data-cursor="Explore" className="block shrink-0 lg:w-[30vw] lg:max-w-[460px] [transform-style:preserve-3d]">
              <Spotlight className="glass bg-ink/60 flex h-full min-h-[24rem] flex-col justify-between rounded-[2rem] p-8 transition-colors duration-500 hover:border-white/25 lg:min-h-[62svh]">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-accent">{s.index}</span>
                  <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">{s.short}</span>
                </div>
                <div className="relative">
                  <h3 className="display text-4xl md:text-5xl">{s.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{s.summary}</p>
                  <ul className="mt-6 space-y-2 border-t border-line pt-6 text-sm text-fg/80">
                    {s.deliverables.slice(0, 3).map((d) => (
                      <li key={d} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Spotlight>
            </Link>
          ))}
        </div>
        <div className="absolute bottom-10 left-[clamp(1.25rem,4vw,3.5rem)] right-[clamp(1.25rem,4vw,3.5rem)] hidden h-px bg-line lg:block">
          <div ref={bar} className="h-full origin-left bg-accent" />
        </div>
      </div>
    </SceneSection>
  );
}
