import type { Project } from "@/lib/content";
import BrowserFrame from "./BrowserFrame";

/**
 * Layered composition of a project's real screens: a main browser window with a second
 * page floating in front, lit by the project's accent colour. Replaces flat device mockups.
 */
export default function ProjectVisual({
  project,
  sizes = "(min-width: 1024px) 50vw, 90vw",
  priority,
  className = "",
}: {
  project: Project;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const host = project.website.replace(/^https?:\/\/(www\.)?/, "");
  return (
    <div className={`relative ${className}`}>
      {/* accent light behind the windows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[12%] opacity-60 blur-3xl"
        style={{ background: `radial-gradient(50% 45% at 55% 50%, ${project.accent}55, transparent 70%)` }}
      />
      <div className="relative pb-[14%] pr-[10%]">
        <BrowserFrame src={project.screens[0]} alt={`${project.name} — home page`} url={host} sizes={sizes} priority={priority} />
        <div className="absolute bottom-0 right-0 w-[52%]" data-visual-float>
          <BrowserFrame
            src={project.screens[1]}
            alt={`${project.name} — inner page`}
            url={host}
            sizes="(min-width: 1024px) 26vw, 46vw"
            className="ring-1 ring-black/40"
          />
        </div>
      </div>
    </div>
  );
}
