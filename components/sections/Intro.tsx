import SceneSection from "@/components/layout/SceneSection";
import Marquee from "@/components/ui/Marquee";
import { stats } from "@/lib/content";

export default function Intro() {
  return (
    <>
      <div className="relative z-10 border-y border-line bg-ink/40 py-6 backdrop-blur-sm">
        <Marquee
          className="display text-2xl text-fg/80 md:text-4xl"
          items={["Web Applications", "Mobile Apps", "Cloud & DevOps", "UI & UX Design", "Low-Code", "Digital Marketing"]}
        />
      </div>

      <SceneSection shape="logo" side={1} className="relative py-32 md:py-48" ariaLabel="About Sysnetic">
        <div className="container-x">
          <p className="eyebrow" data-reveal>Who we are</p>
          <p data-words className="display mt-10 max-w-5xl text-[clamp(1.75rem,3.6vw,3.4rem)] leading-[1.12] tracking-[-0.03em]">
            Founded in 2024, Sysnetic is a team of developers and designers who turn complex problems into simple, beautiful software. We partner with
            ambitious companies worldwide to design, build and scale products that make a measurable difference.
          </p>

          <dl className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-ink/70 p-6 backdrop-blur-md md:p-8" data-reveal>
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="display mt-3 text-5xl md:text-6xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </SceneSection>
    </>
  );
}
