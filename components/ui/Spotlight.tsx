"use client";

import type { ReactNode, PointerEvent } from "react";

/** Card surface with a soft light that follows the cursor. */
export default function Spotlight({ children, className = "" }: { children: ReactNode; className?: string }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div onPointerMove={onMove} className={`group/spot relative overflow-hidden ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--x) var(--y), rgb(255 31 77 / 0.16), transparent 60%)" }}
      />
      {children}
    </div>
  );
}
