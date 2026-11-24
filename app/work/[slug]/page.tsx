import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, site } from "@/lib/content";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import SceneController from "@/components/layout/SceneController";
import PageHero from "@/components/ui/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import BrowserFrame from "@/components/ui/BrowserFrame";
import ProjectVisual from "@/components/ui/ProjectVisual";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.name} — Case Study`,
    description: `${p.tagline} ${p.services.join(", ")} by Sysnetic.`,
    path: `/work/${p.slug}/`,
    image: p.screens[0],
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = projects.findIndex((x) => x.slug === slug);
  if (idx === -1) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const host = p.website.replace(/^https?:\/\//, "");
  const bareHost = host.replace(/^www\./, "");

  return (
    <>
      <SceneController shape="wave" side={0} intensity={0.55} />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Work", path: "/work/" },
            { name: p.name, path: `/work/${p.slug}/` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: `${p.name} — website`,
            headline: p.tagline,
            description: p.overview,
            url: absoluteUrl(`/work/${p.slug}/`),
            image: absoluteUrl(p.screens[0]),
            creator: { "@type": "Organization", name: site.name, url: site.url },
            about: { "@type": "Organization", name: p.client, url: p.website },
          },
        ]}
      />

      <PageHero
        eyebrow={`Case study · ${p.industry}`}
        crumbs={[
          { label: "Work", href: "/work/" },
          { label: p.name, href: `/work/${p.slug}/` },
        ]}
        title={p.name}
        intro={p.tagline}
      >
        <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-8 text-sm md:grid-cols-4" data-reveal>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Client</dt>
            <dd className="mt-2">{p.client}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Industry</dt>
            <dd className="mt-2">{p.industry}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Services</dt>
            <dd className="mt-2">{p.services.join(", ")}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Website</dt>
            <dd className="mt-2">
              <a href={p.website} target="_blank" rel="noopener noreferrer" className="underline decoration-accent/60 underline-offset-4 hover:text-accent">
                {host} ↗
              </a>
            </dd>
          </div>
        </dl>
      </PageHero>

      <section aria-label="Project preview" className="relative">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#090c18] px-4 pt-10 md:px-16 md:pt-20" data-reveal>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(60% 70% at 50% 100%, ${p.accent}33, transparent 70%)` }}
            />
            <div data-parallax="0.12" className="relative mx-auto max-w-5xl translate-y-6">
              <BrowserFrame src={p.screens[0]} alt={`${p.name} — home page`} url={bareHost} sizes="(min-width: 1280px) 1024px, 92vw" priority />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="overview" className="relative py-24 md:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow" data-reveal>The client</p>
            <h2 id="overview" data-split className="display mt-6 text-[clamp(2.25rem,4vw,3.75rem)]">
              About the project
            </h2>
          </div>
          <p data-words className="text-xl leading-relaxed text-fg/85 md:text-2xl lg:col-span-8">
            {p.overview}
          </p>
        </div>
      </section>

      <section aria-label="Challenges and solutions" className="relative pb-24 md:pb-36">
        <div className="container-x grid gap-4 md:grid-cols-2">
          <div className="glass rounded-[2rem] bg-ink/60 p-8 md:p-12" data-reveal>
            <p className="eyebrow">The challenge</p>
            <h2 className="display mt-6 text-3xl md:text-4xl">What stood in the way</h2>
            <ul className="mt-10 space-y-5">
              {p.challenges.map((c) => (
                <li key={c} className="flex gap-4 leading-relaxed text-fg/80">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-[2rem] bg-ink/60 p-8 md:p-12" data-reveal>
            <p className="eyebrow">Our solution</p>
            <h2 className="display mt-6 text-3xl md:text-4xl">How we solved it</h2>
            <ul className="mt-10 space-y-5">
              {p.solutions.map((c) => (
                <li key={c} className="flex gap-4 leading-relaxed text-fg/80">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-label="More screens" className="relative pb-24 md:pb-36">
        <div className="container-x grid gap-6 md:grid-cols-2 md:gap-8">
          {p.screens.slice(1).map((src, i) => (
            <div key={src} className={i === 1 ? "md:mt-24" : ""} data-reveal>
              <BrowserFrame src={src} alt={`${p.name} — page design ${i + 2}`} url={bareHost} sizes="(min-width: 768px) 45vw, 92vw" />
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Next project" className="relative border-t border-line">
        <Link href={`/work/${next.slug}/`} data-cursor="Next" className="group container-x grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="eyebrow">Next project</p>
            <p className="display mt-6 text-[clamp(2.5rem,6vw,5.5rem)] transition-colors duration-500 group-hover:text-accent">{next.name}</p>
            <p className="mt-4 max-w-md text-muted">{next.tagline}</p>
          </div>
          <div className="transition-transform duration-[1.2s] ease-out-expo group-hover:-translate-y-2">
            <ProjectVisual project={next} sizes="(min-width: 768px) 40vw, 90vw" />
          </div>
        </Link>
      </section>
    </>
  );
}
