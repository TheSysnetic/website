export default function Marquee({ items, duration = 40, className = "" }: { items: string[]; duration?: number; className?: string }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i} className="flex items-center">
          <span className="px-8">{item}</span>
          <span className="text-accent">✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] ${className}`}>
      <div className="marquee-track flex shrink-0" style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
