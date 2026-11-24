"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { nav, site } from "@/lib/content";
import Logo from "@/components/ui/Logo";
import Magnetic from "@/components/ui/Magnetic";

function RollText({ children }: { children: string }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">{children}</span>
      <span className="absolute inset-0 block translate-y-full text-accent transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > last && y > 200);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const el = menu.current!;
    tl.current = gsap
      .timeline({ paused: true })
      .set(el, { display: "flex" })
      .fromTo(el, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 100% 0%)", duration: 0.9, ease: "expo.inOut" })
      .from(el.querySelectorAll("[data-menu-item]"), { yPercent: 120, stagger: 0.06, duration: 0.8, ease: "expo.out" }, "-=0.45");
    return () => {
      tl.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (open) tl.current?.play();
    else tl.current?.reverse();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => pathname?.startsWith(href.replace(/\/$/, ""));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-out-expo ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div
          className={`container-x flex h-20 items-center justify-between transition-[background,backdrop-filter] duration-500 md:h-24 ${
            scrolled && !open ? "" : ""
          }`}
        >
          <Link href="/" aria-label="Sysnetic — home" className="relative z-10" data-cursor="hide">
            <Logo />
          </Link>

          <nav aria-label="Primary" className={`hidden items-center gap-1 rounded-full px-2 py-1.5 transition-colors duration-500 md:flex ${scrolled ? "glass" : ""}`}>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative rounded-full px-4 py-2 text-sm ${isActive(item.href) ? "text-fg" : "text-fg/70"}`}
              >
                <RollText>{item.label}</RollText>
                {isActive(item.href) && <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
            <Magnetic strength={0.3}>
              <Link
                href="/contact/"
                data-cursor="hide"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-ink"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-accent transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
                <span className="relative transition-colors duration-500 group-hover:text-white">Let&apos;s talk</span>
                <span className="relative h-1.5 w-1.5 rounded-full bg-accent transition-colors duration-500 group-hover:bg-white" />
              </Link>
            </Magnetic>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 md:hidden"
            >
              <span className={`absolute h-px w-5 bg-fg transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-px w-5 bg-fg transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menu}
        className="fixed inset-0 z-40 hidden flex-col justify-between bg-ink-2 px-6 pb-10 pt-28"
        aria-hidden={!open}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
            <div key={item.href} className="overflow-hidden">
              <Link data-menu-item href={item.href} className="display flex items-baseline gap-4 text-5xl" tabIndex={open ? 0 : -1}>
                <span className="font-mono text-xs tracking-widest text-muted">0{i + 1}</span>
                {item.label}
              </Link>
            </div>
          ))}
        </nav>
        <div className="overflow-hidden">
          <div data-menu-item className="flex flex-col gap-1 text-sm text-muted">
            <a href={`mailto:${site.email}`} className="text-fg" tabIndex={open ? 0 : -1}>{site.email}</a>
            <a href={site.phoneHref} tabIndex={open ? 0 : -1}>{site.phone}</a>
          </div>
        </div>
      </div>
    </>
  );
}
