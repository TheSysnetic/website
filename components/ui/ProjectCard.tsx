import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/lib/content";
import LogoPlate from "./LogoPlate";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Project card: accent-tinted glass, logo plate, and a short summary. Links to the case study. */
export default function ProjectCard({ project, index, priority }: { project: Project; index: number; priority?: boolean }) {
  const { accent } = project;
  return (
    <Link
      href={`/work/${project.slug}/`}
      data-cursor="View"
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 p-6 text-left backdrop-blur-xl transition-colors duration-500 hover:border-white/25 md:p-7"
      style={{
        background: `radial-gradient(120% 80% at 100% 0%, ${accent}59 0%, transparent 55%), radial-gradient(90% 60% at 0% 100%, ${accent}26 0%, transparent 60%), rgb(14 16 28 / 0.78)`,
      }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[13px] tabular-nums text-fg/60">{String(index + 1).padStart(2, "0")}</span>
        <span className="rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wide" style={{ color: accent, background: `${accent}1f` }}>
          {project.category}
        </span>
      </div>

      <LogoPlate project={project} className="mt-6 aspect-[16/9] rounded-2xl" priority={priority} />

      <div className="mt-auto pt-8">
        <div className="flex items-end justify-between gap-4">
          <h3 className="display min-w-0 flex-1 break-words text-3xl md:text-[2.1rem] xl:text-[1.8rem]">{project.name}</h3>
          <span
            className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:text-ink"
            style={{ "--accent": accent } as CSSProperties}
          >
            <span className="absolute h-11 w-11 scale-0 rounded-full bg-[var(--accent)] transition-transform duration-500 group-hover:scale-100" />
            <Arrow className="relative h-5 w-5" />
          </span>
        </div>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-muted">{project.industry}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-fg/70">{project.tagline}</p>
      </div>
    </Link>
  );
}

/** Closing card that invites the visitor to start a project. */
export function ProjectEndCard() {
  return (
    <Link
      href="/contact/"
      data-cursor="Talk"
      className="group flex h-full w-full flex-col justify-between rounded-3xl border border-dashed border-white/15 p-7 transition-colors hover:border-white/40"
    >
      <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">What&apos;s next</span>
      <span className="display text-4xl">
        Your product
        <br />
        <span className="text-gradient">could be here.</span>
      </span>
      <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors group-hover:text-fg">
        Let&apos;s talk <Arrow className="h-4 w-4" />
      </span>
    </Link>
  );
}
