"use client";

import { useMemo, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { techStack } from "@/lib/content";
import SceneSection from "@/components/layout/SceneSection";

const categories = ["All", "Frontend", "Backend", "Mobile", "Cloud", "Data"] as const;

export default function TechStack() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const grid = useRef<HTMLUListElement>(null);
  const items = useMemo(() => (active === "All" ? techStack : techStack.filter((t) => t.category === active)), [active]);

  useGSAP(
    () => {
      gsap.fromTo(grid.current!.children, { opacity: 0, y: 16, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.02, ease: "expo.out" });
    },
    { dependencies: [active], scope: grid },
  );

  return (
    <SceneSection shape="galaxy" side={-1} intensity={0.6} className="relative py-32 md:py-40" ariaLabel="Technology">
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow" data-reveal>Tech stack</p>
            <h2 data-split className="display mt-6 text-[clamp(2.5rem,6vw,5.5rem)]">
              Technologies we&apos;re <span className="text-gradient">great in.</span>
            </h2>
          </div>
          <div role="tablist" aria-label="Filter technologies" className="glass flex flex-wrap gap-1 rounded-full p-1.5" data-reveal>
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={active === c}
                onClick={() => setActive(c)}
                className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${active === c ? "bg-fg text-ink" : "text-fg/70 hover:text-fg"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <ul ref={grid} className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {items.map((t) => (
            <li key={t.name} className="glass group flex items-center justify-between rounded-2xl px-5 py-5 transition-colors duration-300 hover:border-accent/50">
              <span className="font-medium">{t.name}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted transition-colors group-hover:text-accent">{t.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </SceneSection>
  );
}
