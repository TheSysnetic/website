import { projects } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import SceneController from "@/components/layout/SceneController";
import PageHero from "@/components/ui/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import Tilt from "@/components/ui/Tilt";
import ProjectCard, { ProjectEndCard } from "@/components/ui/ProjectCard";

export const metadata = pageMetadata({
  title: "Work — Case Studies",
  description:
    "Selected Sysnetic projects: websites and online stores designed, built and launched for KhushGhar, Reparametrize Ateliers and Product House.",
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
        <div className="container-x grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <article key={p.slug} className="min-h-[500px]" data-reveal>
              <Tilt className="h-full">
                <ProjectCard project={p} index={i} priority={i < 3} />
              </Tilt>
            </article>
          ))}
          <div className="min-h-[300px] md:col-span-2 xl:col-span-3 xl:min-h-[220px]" data-reveal>
            <ProjectEndCard />
          </div>
        </div>
      </section>
    </>
  );
}
