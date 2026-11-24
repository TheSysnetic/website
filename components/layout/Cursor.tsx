"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/** Two-part cursor: a precise dot and a lagging ring that reacts to links and labelled targets. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // elements are always rendered, so refs exist here; bail out (keeping the native cursor) if not
    if (!fine || reduced || !dot.current || !ring.current) return;

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
        // only hide the native pointer once the custom one is actually on screen
        document.documentElement.classList.add("has-cursor");
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, input, textarea, select, label");
      const mode = target?.dataset.cursor;
      if (mode === "hide") {
        // over solid buttons: ring tucks in, but the dot always stays visible
        gsap.to(ring.current, { scale: 0.6, backgroundColor: "rgba(255,255,255,0)", borderColor: "rgba(255,255,255,0.9)", duration: 0.3 });
        gsap.to(dot.current, { scale: 1.4, duration: 0.3 });
        setLabel("");
      } else if (mode) {
        setLabel(mode);
        gsap.to(ring.current, { scale: 2.6, backgroundColor: "rgba(255,31,77,0.95)", borderColor: "rgba(255,31,77,0)", duration: 0.45, ease: "expo.out" });
        gsap.to(dot.current, { scale: 0, duration: 0.3 });
      } else if (target) {
        setLabel("");
        gsap.to(ring.current, { scale: 1.6, backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.5)", duration: 0.45, ease: "expo.out" });
        gsap.to(dot.current, { scale: 0.5, duration: 0.3 });
      } else {
        setLabel("");
        gsap.to(ring.current, { scale: 1, backgroundColor: "rgba(255,255,255,0)", borderColor: "rgba(255,255,255,0.35)", duration: 0.45, ease: "expo.out" });
        gsap.to(dot.current, { scale: 1, duration: 0.3 });
      }
    };
    const down = () => gsap.to(ring.current, { scale: "-=0.25", duration: 0.15, yoyo: true, repeat: 1 });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    // if the pointer leaves the window, restore the native cursor on return until we track it again
    const leave = () => {
      shown = false;
      gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.2 });
      document.documentElement.classList.remove("has-cursor");
    };
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/35 opacity-0"
        aria-hidden
      >
        <span className="font-mono text-[5px] font-medium uppercase tracking-[0.15em] text-white">{label}</span>
      </div>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[101] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent opacity-0" aria-hidden />
    </>
  );
}
