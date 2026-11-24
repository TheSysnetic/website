import SceneSection from "@/components/layout/SceneSection";
import Button from "@/components/ui/Button";
import Clock from "@/components/ui/Clock";

export default function Hero() {
  return (
    <SceneSection shape="galaxy" logo side={1} className="relative flex min-h-[100svh] flex-col justify-end pb-10 pt-32 md:pb-14">
      <div className="container-x">
        <p className="eyebrow" data-reveal>
          Software studio · Nürnberg, Germany
        </p>
        <h1 data-split="hero" className="display mt-6 max-w-[11ch] text-[clamp(3.1rem,7.6vw,8.75rem)]">
          Digital products, <span className="text-gradient">engineered</span> to move.
        </h1>

        <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md" data-reveal>
            <p className="text-lg leading-relaxed text-fg/75">
              We design and build web apps, mobile apps and cloud platforms for ambitious companies — fast, beautiful and built to scale.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/contact/">Start a project</Button>
              <Button href="/work/" variant="ghost">
                See our work
              </Button>
            </div>
          </div>

          <div className="hidden items-end gap-12 font-mono text-xs uppercase tracking-[0.2em] text-muted md:flex" data-reveal>
            <div>
              <p className="text-fg/40">Local time</p>
              <p className="mt-2 text-fg">
                <Clock />
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-10 w-6 justify-center rounded-full border border-white/25">
                <span className="mt-2 h-2 w-0.5 animate-bounce rounded-full bg-accent" />
              </span>
              Scroll
            </div>
          </div>
        </div>
      </div>
    </SceneSection>
  );
}
