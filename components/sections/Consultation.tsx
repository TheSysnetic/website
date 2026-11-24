import SceneSection from "@/components/layout/SceneSection";
import Button from "@/components/ui/Button";
import { site } from "@/lib/content";

export default function Consultation() {
  return (
    <SceneSection shape="logo" side={0} intensity={0.55} className="relative flex min-h-[90svh] items-center py-32" ariaLabel="Free consultation">
      <div className="container-x text-center">
        <p className="eyebrow justify-center" data-reveal>Free consultation</p>
        <h2 data-split className="display mx-auto mt-8 max-w-5xl text-[clamp(2.75rem,8vw,8rem)]">
          Let&apos;s talk about <span className="text-gradient">your next big thing.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg text-fg/70" data-reveal>
          Tell us where you want to go. We&apos;ll help you find the fastest, smartest way to get there — no strings attached.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row" data-reveal>
          <Button href="/contact/">Book a free consultation</Button>
          <a href={`mailto:${site.email}`} className="text-fg/70 underline decoration-accent/60 underline-offset-8 transition-colors hover:text-fg">
            {site.email}
          </a>
        </div>
      </div>
    </SceneSection>
  );
}
