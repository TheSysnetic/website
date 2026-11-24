import Image from "next/image";

/** A dark, on-brand browser window that frames a real site screenshot. */
export default function BrowserFrame({
  src,
  alt,
  url,
  sizes,
  priority,
  className = "",
}: {
  src: string;
  alt: string;
  url: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#0b0f1d] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.02)] md:rounded-2xl ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.03] px-3 py-2 md:px-4 md:py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-white/15 md:h-2.5 md:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-white/15 md:h-2.5 md:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-white/15 md:h-2.5 md:w-2.5" />
        </div>
        <div className="mx-auto flex max-w-[60%] items-center gap-1.5 truncate rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[9px] text-white/45 md:text-[11px]">
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 shrink-0" aria-hidden>
            <path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          {url}
        </div>
        <span className="w-[42px] md:w-[50px]" aria-hidden />
      </div>
      <div className="relative aspect-[1800/1110]">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" priority={priority} />
      </div>
    </div>
  );
}
