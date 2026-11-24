import Mark from "./Mark";

/** Wordmark lock-up: SVG blade mark + live type, so it stays crisp and themeable. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className="h-7 w-7 text-accent" />
      <span className="font-display text-[1.35rem] font-semibold tracking-[-0.04em] text-fg">
        Sysnet<span className="relative">ı<span className="absolute left-1/2 top-[0.18em] h-[0.2em] w-[0.2em] -translate-x-1/2 rounded-full bg-accent" /></span>c
      </span>
    </span>
  );
}
