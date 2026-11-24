import Link from "next/link";
import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  intro,
  crumbs = [],
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: { label: string; href: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[78svh] flex-col justify-end pb-16 pt-36 md:pb-24">
      <div className="container-x">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs uppercase tracking-[0.18em] text-muted" data-reveal>
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-fg">Home</Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  <span aria-hidden className="text-accent">/</span>
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-fg/80">{c.label}</span>
                  ) : (
                    <Link href={c.href} className="hover:text-fg">{c.label}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="eyebrow" data-reveal>{eyebrow}</p>
        <h1 data-split="hero" className="display mt-6 max-w-[14ch] text-[clamp(3rem,8vw,8.5rem)]">
          {title}
        </h1>
        {intro && (
          <div className="mt-10 max-w-xl text-lg leading-relaxed text-fg/70" data-reveal>
            {intro}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
