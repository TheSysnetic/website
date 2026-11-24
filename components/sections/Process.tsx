"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { process } from "@/lib/content";
import SceneSection from "@/components/layout/SceneSection";

export default function Process() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        "[data-process-line]",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-process-grid]", start: "top 75%", end: "bottom 60%", scrub: true } },
      );
      gsap.utils.toArray<HTMLElement>("[data-process-step]").forEach((step, i) => {
        gsap.fromTo(
          step.querySelector("[data-dot]"),
          { scale: 0.4, backgroundColor: "rgba(255,255,255,0.2)" },
          { scale: 1, backgroundColor: "#ff1f4d", scrollTrigger: { trigger: "[data-process-grid]", start: `top+=${i * 60} 70%`, toggleActions: "play none none reverse" } },
        );
      });
    },
    { scope: root },
  );

  return (
    <SceneSection shape="helix" side={0} intensity={0.65} className="relative py-32 md:py-48" ariaLabel="Our process">
      <div ref={root} className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow" data-reveal>How we work</p>
          <h2 data-split className="display mt-6 text-[clamp(2.5rem,6vw,5.5rem)]">
            From idea to impact, <span className="text-gradient">in four moves.</span>
          </h2>
        </div>

        <div data-process-grid className="relative mt-[30vh] md:mt-[38vh]">
          <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-line md:block">
            <div data-process-line className="h-full origin-left bg-gradient-to-r from-accent to-electric" />
          </div>
          <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
            {process.map((p) => (
              <li key={p.index} data-process-step className="relative">
                <span data-dot className="relative z-10 block h-[15px] w-[15px] rounded-full border-4 border-ink" />
                <div className="glass mt-6 rounded-3xl bg-ink/60 p-6" data-reveal>
                  <p className="font-mono text-sm text-accent">{p.index}</p>
                  <h3 className="display mt-3 text-3xl">{p.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SceneSection>
  );
}
