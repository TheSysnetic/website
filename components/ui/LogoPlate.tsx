import Image from "next/image";
import type { Project } from "@/lib/content";

/** The client's logo centred on a clean white plate. */
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
  return (
    <div className={`relative grid place-items-center overflow-hidden bg-white ${className}`}>
      <div className="relative h-[38%] w-[62%] transition-transform duration-700 ease-out-expo group-hover:scale-105">
        <Image src={project.logo} alt={`${project.name} logo`} fill sizes={sizes} className="object-contain" priority={priority} />
      </div>
    </div>
  );
}
