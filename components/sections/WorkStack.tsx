"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/lib/content";
import SceneSection from "@/components/layout/SceneSection";
import Button from "@/components/ui/Button";
import Tilt from "@/components/ui/Tilt";
import ProjectCard, { ProjectEndCard } from "@/components/ui/ProjectCard";

/** Selected work: logo cards that rise in with a stagger and tilt towards the cursor. */
export default function WorkStack() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-work-card]",
          { y: 80, opacity: 0, rotateX: -8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: "[data-work-grid]", start: "top 80%" },
          },
        );
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

        <div data-work-grid className="mt-16 grid gap-5 [perspective:1400px] md:grid-cols-2 lg:mt-20 xl:grid-cols-4">
          {projects.map((p, i) => (
            <div key={p.slug} data-work-card className="min-h-[460px]">
              <Tilt className="h-full">
                <ProjectCard project={p} index={i} priority={i === 0} />
              </Tilt>
            </div>
          ))}
          <div data-work-card className="min-h-[300px] xl:min-h-[460px]">
            <ProjectEndCard />
          </div>
        </div>

        <div className="mt-16 flex justify-center" data-reveal>
          <Button href="/work/" variant="ghost">All projects</Button>
        </div>
      </div>
    </SceneSection>
  );
}
