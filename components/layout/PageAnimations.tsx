"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { onReady } from "@/lib/scene";
import { getLenis } from "./SmoothScroll";

/**
 * Declarative scroll animations for a page. Markup opts in with data attributes:
 *  - data-split           → headline lines slide up from a mask when scrolled into view
 *  - data-split="hero"    → same, but plays after the intro instead of on scroll
 *  - data-reveal          → fade/slide up (batched)
 *  - data-parallax="0.2"  → scrubbed vertical drift
 *  - data-words           → paragraph words brighten as you scroll through it
 */
export default function PageAnimations({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  // The root template only remounts when the *top-level* segment changes (/ → /services),
  // not for nested moves (/services → /services/cloud-solutions). Re-run on every path change.
  const pathname = usePathname();

  useGSAP(
    () => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const reduced = prefersReducedMotion();

      // page enter
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" });

      if (reduced) {
        gsap.set(q("[data-reveal]"), { opacity: 1 });
        gsap.set(q("[data-split]"), { visibility: "visible" });
        return;
      }

      const splits: SplitText[] = [];
      let disposeReady: (() => void) | undefined;
      let cancelled = false;
      // run() fires asynchronously (after fonts + intro), so collect its animations and
      // ScrollTriggers in our own context; reverting it on unmount stops triggers leaking across pages
      const ctx = gsap.context(() => {}, el);

      const run = () =>
        ctx.add(() => {
          if (cancelled) return;

          // A client-side navigation can arrive while the previous page was scrolled far down.
          // Start the new page at the top *before* measuring triggers, otherwise every reveal
          // below that old position counts as "already passed".
          if (!window.location.hash) {
            getLenis()?.scrollTo(0, { immediate: true, force: true });
            window.scrollTo(0, 0);
          }

          q("[data-split]").forEach((node) => {
            const split = SplitText.create(node, { type: "lines", mask: "lines", linesClass: "split-line-inner", autoSplit: false });
            splits.push(split);
            gsap.set(node, { visibility: "visible" });
            const tween = gsap.from(split.lines, { yPercent: 115, rotate: 2, duration: 1.3, stagger: 0.09, ease: "expo.out", paused: true });
            if (node.getAttribute("data-split") === "hero") {
              tween.delay(0.15).play();
            } else {
              // play on enter; if it's already above the viewport (e.g. reload mid-page), just show it
              ScrollTrigger.create({
                trigger: node,
                start: "top 88%",
                onEnter: () => tween.play(),
                onEnterBack: () => tween.play(),
                onLeave: () => tween.progress(1),
              });
            }
          });

          const reveal = (batch: Element[], animate: boolean) => {
            const fresh = batch.filter((n) => !(n as HTMLElement).dataset.revealed);
            if (!fresh.length) return;
            fresh.forEach((n) => ((n as HTMLElement).dataset.revealed = "1"));
            if (animate) gsap.fromTo(fresh, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08, ease: "expo.out", overwrite: true });
            else gsap.set(fresh, { opacity: 1, y: 0 });
          };
          ScrollTrigger.batch(q("[data-reveal]"), {
            start: "top 90%",
            onEnter: (batch) => reveal(batch, true),
            onEnterBack: (batch) => reveal(batch, true),
            onLeave: (batch) => reveal(batch, false),
          });

          q("[data-parallax]").forEach((node) => {
            const amount = parseFloat(node.getAttribute("data-parallax") || "0.2");
            gsap.fromTo(node, { yPercent: -amount * 50 }, { yPercent: amount * 50, ease: "none", scrollTrigger: { trigger: node, start: "top bottom", end: "bottom top", scrub: true } });
          });

          q("[data-words]").forEach((node) => {
            const split = SplitText.create(node, { type: "words" });
            splits.push(split);
            gsap.fromTo(
              split.words,
              { opacity: 0.12 },
              { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: node, start: "top 80%", end: "bottom 45%", scrub: true } },
            );
          });

          ScrollTrigger.refresh();
        });

      // wait for webfonts so line splits are measured correctly, and for the intro to finish
      document.fonts.ready.then(() => {
        if (!cancelled) disposeReady = onReady(run);
      });

      return () => {
        cancelled = true;
        disposeReady?.();
        ctx.revert();
        splits.forEach((s) => s.revert());
        // elements that persist across navigations (the footer) must be revealable again
        el.querySelectorAll<HTMLElement>("[data-revealed]").forEach((n) => delete n.dataset.revealed);
      };
    },
    { scope: root, dependencies: [pathname], revertOnUpdate: true },
  );

  return <div ref={root}>{children}</div>;
}
