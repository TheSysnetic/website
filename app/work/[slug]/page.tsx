import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, site } from "@/lib/content";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import SceneController from "@/components/layout/SceneController";
import PageHero from "@/components/ui/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import LogoPlate from "@/components/ui/LogoPlate";

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
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = projects.findIndex((x) => x.slug === slug);
  if (idx === -1) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const host = p.website.replace(/^https?:\/\//, "");

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
            image: absoluteUrl(p.logo),
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

      <section aria-label="Client" className="relative">
        <div className="container-x">
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/10 p-4 md:p-8"
            style={{
              background: `radial-gradient(120% 80% at 100% 0%, ${p.accent}59 0%, transparent 55%), radial-gradient(90% 60% at 0% 100%, ${p.accent}26 0%, transparent 60%), rgb(14 16 28 / 0.78)`,
            }}
            data-reveal
          >
            <div className="h-1 w-24 rounded-full" style={{ background: p.accent }} />
            <LogoPlate project={p} className="mt-6 aspect-[16/9] rounded-[1.5rem] md:aspect-[21/8]" sizes="(min-width: 1024px) 700px, 80vw" priority />
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

      <section aria-label="Next project" className="relative border-t border-line">
        <Link href={`/work/${next.slug}/`} data-cursor="Next" className="group container-x grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="eyebrow">Next project</p>
            <p className="display mt-6 text-[clamp(2.5rem,6vw,5.5rem)] transition-colors duration-500 group-hover:text-accent">{next.name}</p>
            <p className="mt-4 max-w-md text-muted">{next.tagline}</p>
          </div>
          <div
            className="rounded-3xl border border-white/10 p-4 transition-transform duration-[1.2s] ease-out-expo group-hover:-translate-y-2"
            style={{ background: `radial-gradient(120% 80% at 100% 0%, ${next.accent}59 0%, transparent 55%), rgb(14 16 28 / 0.78)` }}
          >
            <LogoPlate project={next} className="aspect-[16/9] rounded-2xl" sizes="(min-width: 768px) 40vw, 90vw" />
          </div>
        </Link>
      </section>
    </>
  );
}
