import { MARK_POLYGONS } from "@/components/three/shapes";

/** The Sysnetic blade mark as inline SVG. */
export default function Mark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="170 180 660 640" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      {MARK_POLYGONS.map((poly, i) => (
        <polygon key={i} points={poly.map((p) => p.join(",")).join(" ")} fill="currentColor" />
      ))}
    </svg>
  );
}
