import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  children,
  as: Tag = "h2",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="eyebrow" data-reveal>{eyebrow}</p>
      <Tag data-split className="display mt-6 text-[clamp(2.5rem,6vw,5.5rem)]">{title}</Tag>
      {children && <div data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{children}</div>}
    </div>
  );
}
