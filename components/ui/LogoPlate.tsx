import Image from "next/image";
import type { Project } from "@/lib/content";

/**
 * The client's logo centred on a clean white plate. The logo is sized from its real proportions
 * and capped at `logoMaxWidth`, so raster logos are never stretched beyond their resolution.
 */
export default function LogoPlate({
  project,
  className = "",
  sizes = "360px",
  priority,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [w, h] = project.logoSize;
  return (
    <div className={`relative grid place-items-center overflow-hidden bg-white ${className}`}>
      <div
        className="relative w-[62%] transition-transform duration-700 ease-out-expo group-hover:scale-105"
        style={{ maxWidth: project.logoMaxWidth }}
      >
        <Image
          src={project.logo}
          alt={`${project.name} logo`}
          width={w}
          height={h}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
