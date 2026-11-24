"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Tilts its child towards the cursor (fine pointers only). */
export default function Tilt({ children, className = "", max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = wrap.current!;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rx = gsap.quickTo(inner.current, "rotateX", { duration: 0.6, ease: "power3" });
    const ry = gsap.quickTo(inner.current, "rotateY", { duration: 0.6, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 2 * max);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 2 * max);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  });

  return (
    <div ref={wrap} className={`[perspective:1200px] ${className}`}>
      <div ref={inner} className="h-full will-change-transform [transform-style:preserve-3d]">
        {children}
      </div>
    </div>
  );
}
