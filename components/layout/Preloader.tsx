"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { markReady } from "@/lib/scene";
import Mark from "@/components/ui/Mark";

/** First-visit intro: counter + mark, then a curtain lift that hands over to the 3D scene. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current!;
    const seen = sessionStorage.getItem("sysnetic:intro") === "1";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduced) {
      gsap.to(el, { autoAlpha: 0, duration: 0.4, onComplete: () => setDone(true) });
      markReady();
      return;
    }

    const state = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("sysnetic:intro", "1");
        setDone(true);
      },
    });
    tl.from(el.querySelectorAll("polygon"), { scale: 0, transformOrigin: "50% 50%", opacity: 0, stagger: 0.12, duration: 0.9, ease: "expo.out" })
      .to(state, { v: 100, duration: 1.6, ease: "power2.inOut", onUpdate: () => setCount(Math.round(state.v)) }, 0)
      .add(() => markReady(), "-=0.2")
      .to(el.querySelector("[data-pl-inner]"), { y: -40, opacity: 0, duration: 0.5, ease: "power2.in" })
      .to(el, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.inOut" }, "-=0.2");
    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;
  return (
    <div
      ref={root}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden
    >
      <div data-pl-inner className="flex flex-col items-center gap-8">
        <Mark className="h-16 w-16 text-accent" />
        <div className="font-mono text-xs tracking-[0.3em] text-muted">
          <span className="inline-block w-[3ch] text-right text-fg tabular-nums">{count}</span>%
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-px bg-accent" style={{ width: `${count}%` }} />
    </div>
  );
}
