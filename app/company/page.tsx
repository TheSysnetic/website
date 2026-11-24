import { stats, values } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import SceneController from "@/components/layout/SceneController";
import SceneSection from "@/components/layout/SceneSection";
import PageHero from "@/components/ui/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import Spotlight from "@/components/ui/Spotlight";
import Process from "@/components/sections/Process";

export const metadata = pageMetadata({
  title: "Company — About Sysnetic",
  description:
    "Founded in 2024 in Nürnberg, Sysnetic is a team of experienced developers and designers building innovative, high-quality software for clients worldwide. Our mission, values and approach.",
  path: "/company/",
});

export default function CompanyPage() {
  return (
    <>
      <SceneController shape="logo" side={1} intensity={0.9} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Company", path: "/company/" }])} />
      <PageHero
        eyebrow="About us"
        crumbs={[{ label: "Company", href: "/company/" }]}
        title={
          <>
            Built by makers, <span className="text-gradient">for makers.</span>
          </>
        }
        intro="Sysnetic is a team of highly experienced developers and designers who bring years of expertise and creativity to every product we touch."
      />

      <SceneSection shape="logo" side={1} intensity={0.9} className="relative py-24 md:py-32" ariaLabel="Who we are">
        <div className="container-x">
          <p className="eyebrow" data-reveal>Who we are</p>
          <p data-words className="display mt-10 max-w-5xl text-[clamp(1.6rem,3.2vw,3rem)] leading-[1.15] tracking-[-0.03em]">
            Founded in 2024, Sysnetic is a dynamic technology company focused on developing innovative solutions for clients worldwide. By leveraging the
            power of technology, we solve complex problems and propel business growth — always staying ahead of the curve with modern, efficient and
            effective tools.
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

      <SceneSection shape="sphere" side={-1} intensity={0.8} className="relative py-24 md:py-40" ariaLabel="Our mission">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow" data-reveal>Our mission</p>
            <h2 data-split className="display mt-6 text-[clamp(2.25rem,4.5vw,4rem)]">
              Empower our clients to thrive in a fast-moving world.
            </h2>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-fg/75" data-reveal>
              <p>
                Our objective is to provide innovative technology solutions that contribute directly to our clients&apos; success — products that help
                them reach their goals and push the boundaries of what is possible.
              </p>
              <p>
                We collaborate closely with every client to understand their specific needs, then design solutions that meet and surpass their
                expectations. Technology, for us, is a tool for positive change: helping businesses adapt to the digital age and stay competitive.
              </p>
            </div>
          </div>
        </div>
      </SceneSection>

      <SceneSection shape="galaxy" side={1} intensity={0.6} className="relative py-24 md:py-32" ariaLabel="Our values">
        <div className="container-x">
          <p className="eyebrow" data-reveal>Core values</p>
          <h2 data-split className="display mt-6 max-w-3xl text-[clamp(2.25rem,4.5vw,4rem)]">
            The foundation of everything we do.
          </h2>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Spotlight key={v.title} className="glass rounded-[2rem] bg-ink/60 p-8">
                <div data-reveal>
                  <span className="font-mono text-sm text-accent">0{i + 1}</span>
                  <h3 className="display mt-14 text-3xl">{v.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{v.text}</p>
                </div>
              </Spotlight>
            ))}
          </div>
        </div>
      </SceneSection>

      <Process />
    </>
  );
}
