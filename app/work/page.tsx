import Link from "next/link";
import { projects } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import SceneController from "@/components/layout/SceneController";
import PageHero from "@/components/ui/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import ProjectVisual from "@/components/ui/ProjectVisual";

export const metadata = pageMetadata({
  title: "Work — Case Studies",
  description:
    "Selected Sysnetic projects: websites and web applications designed, built and launched for Reparametrize Ateliers, Burak Technologies, Product House and Byte Forge Technologies.",
  path: "/work/",
});

export default function WorkPage() {
  return (
    <>
      <SceneController shape="wave" side={0} intensity={0.8} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Work", path: "/work/" }])} />
      <PageHero
        eyebrow="Selected work"
        crumbs={[{ label: "Work", href: "/work/" }]}
        title={
          <>
            Work that <span className="text-gradient">moves people.</span>
          </>
        }
        intro="A selection of products we've designed, engineered and launched together with our partners."
      />

      <section aria-label="Projects" className="relative pb-32">
        <div className="container-x grid gap-x-8 gap-y-20 md:grid-cols-2">
          {projects.map((p, i) => (
            <article key={p.slug} className={i % 2 === 1 ? "md:mt-40" : ""} data-reveal>
              <Link href={`/work/${p.slug}/`} data-cursor="View" className="group block">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#090c18] p-6 md:p-10">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-100"
                    style={{ background: `radial-gradient(80% 80% at 70% 30%, ${p.accent}26, transparent 65%)` }}
                  />
                  <div className="relative transition-transform duration-[1.2s] ease-out-expo group-hover:-translate-y-2 group-hover:scale-[1.02]">
                    <ProjectVisual project={p} priority={i < 2} sizes="(min-width: 768px) 40vw, 85vw" />
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <h2 className="display text-3xl md:text-4xl">{p.name}</h2>
                    <p className="mt-2 text-muted">{p.tagline}</p>
                  </div>
                  <span className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-muted">{p.industry}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
