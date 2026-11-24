import Link from "next/link";
import { notFound } from "next/navigation";
import { services, site } from "@/lib/content";
import type { ShapeName } from "@/lib/scene";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import SceneController from "@/components/layout/SceneController";
import PageHero from "@/components/ui/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import Button from "@/components/ui/Button";
import Spotlight from "@/components/ui/Spotlight";

const shapeFor: Record<string, ShapeName> = {
  "web-development": "sphere",
  "mobile-development": "logo",
  "cloud-solutions": "galaxy",
  "ui-ux-design": "wave",
  "low-code": "helix",
  "digital-marketing": "sphere",
};

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return pageMetadata({ title: `${s.title} Services`, description: s.summary, path: `/services/${s.slug}/` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = services.findIndex((x) => x.slug === slug);
  if (idx === -1) notFound();
  const s = services[idx];
  const next = services[(idx + 1) % services.length];
  const shape = shapeFor[s.slug] ?? "sphere";

  return (
    <>
      <SceneController shape={shape} side={1} intensity={0.85} />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Services", path: "/services/" },
            { name: s.title, path: `/services/${s.slug}/` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.title,
            serviceType: s.title,
            description: s.summary,
            url: absoluteUrl(`/services/${s.slug}/`),
            provider: { "@type": "Organization", name: site.name, url: site.url },
            areaServed: "Worldwide",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: s.title,
              itemListElement: s.deliverables.map((d) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: d } })),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />

      <PageHero
        eyebrow={`Service ${s.index}`}
        crumbs={[
          { label: "Services", href: "/services/" },
          { label: s.title, href: `/services/${s.slug}/` },
        ]}
        title={s.title}
        intro={s.summary}
      >
        <div className="mt-10" data-reveal>
          <Button href="/contact/">Discuss your project</Button>
        </div>
      </PageHero>

      <section aria-label="Overview" className="relative py-24 md:py-32">
        <div className="container-x">
          <p className="eyebrow" data-reveal>Overview</p>
          <p data-words className="display mt-10 max-w-5xl text-[clamp(1.6rem,3.2vw,3rem)] leading-[1.15] tracking-[-0.03em]">
            {s.intro}
          </p>
        </div>
      </section>

      <section aria-labelledby="deliverables" className="relative py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal>What&apos;s included</p>
            <h2 id="deliverables" data-split className="display mt-6 text-[clamp(2.25rem,4.5vw,4rem)]">
              What we deliver
            </h2>
          </div>
          <ol className="lg:col-span-7">
            {s.deliverables.map((d, i) => (
              <li key={d} className="flex items-baseline gap-6 border-b border-line py-6 text-xl md:text-2xl" data-reveal>
                <span className="font-mono text-sm text-accent">0{i + 1}</span>
                {d}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="outcomes" className="relative py-24 md:py-32">
        <div className="container-x">
          <p className="eyebrow" data-reveal>Why it matters</p>
          <h2 id="outcomes" data-split className="display mt-6 text-[clamp(2.25rem,4.5vw,4rem)]">
            What you get
          </h2>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {s.outcomes.map((o, i) => (
              <Spotlight key={o.title} className="glass rounded-[2rem] bg-ink/60 p-8 md:p-10">
                <div data-reveal>
                  <span className="font-mono text-sm text-accent">0{i + 1}</span>
                  <h3 className="display mt-10 text-3xl">{o.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{o.text}</p>
                </div>
              </Spotlight>
            ))}
          </div>

          <div className="mt-20" data-reveal>
            <p className="eyebrow">Tools &amp; technologies</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {s.stack.map((t) => (
                <li key={t} className="glass rounded-full px-4 py-2 text-sm text-fg/85">{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq" className="relative py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal>FAQ</p>
            <h2 id="faq" data-split className="display mt-6 text-[clamp(2.25rem,4.5vw,4rem)]">
              Questions, answered
            </h2>
          </div>
          <div className="lg:col-span-7">
            {s.faqs.map((f) => (
              <details key={f.q} className="group border-b border-line py-6" data-reveal>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl md:text-2xl [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-500 group-open:rotate-45 group-open:border-accent">
                    <span className="absolute h-px w-3 bg-fg" />
                    <span className="absolute h-3 w-px bg-fg" />
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Next service" className="relative border-t border-line">
        <Link href={`/services/${next.slug}/`} data-cursor="Next" className="group container-x flex flex-col gap-4 py-20 md:flex-row md:items-end md:justify-between md:py-28">
          <div>
            <p className="eyebrow">Next service</p>
            <p className="display mt-6 text-[clamp(2.5rem,7vw,6.5rem)] transition-colors duration-500 group-hover:text-accent">{next.title}</p>
          </div>
          <p className="max-w-sm text-muted">{next.summary}</p>
        </Link>
      </section>
    </>
  );
}
