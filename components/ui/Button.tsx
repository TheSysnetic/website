import Link from "next/link";
import type { ReactNode } from "react";
import Magnetic from "./Magnetic";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
};

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden>
      <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Button({ href, children, variant = "primary", className = "", external }: Props) {
  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm font-medium tracking-tight transition-colors duration-500";
  const styles =
    variant === "primary"
      ? "bg-accent text-white shadow-[0_0_40px_-8px_var(--color-accent)]"
      : "border border-white/15 text-fg hover:border-white/40";
  const fill = variant === "primary" ? "bg-white" : "bg-white/10";
  const inner = (
    <>
      <span className={`absolute inset-0 translate-y-full rounded-full ${fill} transition-transform duration-500 ease-out-expo group-hover:translate-y-0`} />
      <span className={`relative z-10 ${variant === "primary" ? "group-hover:text-ink" : ""} transition-colors duration-500`}>{children}</span>
      <span className={`relative z-10 ${variant === "primary" ? "group-hover:text-ink" : ""} transition-colors duration-500`}>
        <Arrow />
      </span>
    </>
  );
  return (
    <Magnetic strength={0.25}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles} ${className}`} data-cursor="hide">
          {inner}
        </a>
      ) : (
        <Link href={href} className={`${base} ${styles} ${className}`} data-cursor="hide">
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}
