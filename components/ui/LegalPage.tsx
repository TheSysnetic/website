import SceneController from "@/components/layout/SceneController";
import PageHero from "@/components/ui/PageHero";

export default function LegalPage({
  title,
  path,
  updated,
  sections,
}: {
  title: string;
  path: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <>
      <SceneController shape="galaxy" side={1} intensity={0.35} />
      <PageHero eyebrow={`Last updated ${updated}`} crumbs={[{ label: title, href: path }]} title={title} />
      <section className="relative pb-32">
        <div className="container-x">
          <div className="max-w-3xl space-y-14">
            {sections.map((s) => (
              <div key={s.heading} data-reveal>
                <h2 className="display text-2xl md:text-3xl">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-4 leading-relaxed text-fg/75">{p}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
