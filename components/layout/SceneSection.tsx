"use client";

import { useRef, type ReactNode } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { setScene, type ShapeName } from "@/lib/scene";

/** A section that switches the background 3D scene while it occupies the middle of the viewport. */
export default function SceneSection({
  shape,
  side = 1,
  intensity = 1,
  logo = false,
  className = "",
  id,
  children,
  ariaLabel,
}: {
  shape: ShapeName;
  side?: number;
  intensity?: number;
  logo?: boolean;
  className?: string;
  id?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const activate = () => setScene(shape, { side, intensity, logo });
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 55%",
      end: "bottom 45%",
      onEnter: activate,
      onEnterBack: activate,
    });
    if (st.isActive) activate();
  });
  return (
    <section ref={ref} id={id} className={className} aria-label={ariaLabel}>
      {children}
    </section>
  );
}
