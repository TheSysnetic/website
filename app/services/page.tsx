import Link from "next/link";
import { services } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import SceneController from "@/components/layout/SceneController";
import PageHero from "@/components/ui/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import Process from "@/components/sections/Process";

export const metadata = pageMetadata({
  title: "Services — Web, Mobile, Cloud, UI/UX & Marketing",
  description:
    "Web application development, mobile apps, cloud & DevOps, UI/UX design, low-code solutions and digital marketing — end-to-end product services from Sysnetic in Nürnberg.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <SceneController shape="sphere" side={1} />
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Services", path: "/services/" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              url: `https://thesysnetic.com/services/${s.slug}/`,
            })),
          },
        ]}
      />
      <PageHero
        eyebrow="Services"
        crumbs={[{ label: "Services", href: "/services/" }]}
        title={
          <>
            Everything your product <span className="text-gradient">needs to win.</span>
          </>
        }
        intro="Strategy, design, engineering and growth under one roof. Pick a single discipline or let us carry your product end-to-end."
      />

      <section aria-label="Service list" className="relative pb-32">
        <div className="container-x">
          <ul className="border-t border-line">
            {services.map((s) => (
              <li key={s.slug} className="border-b border-line" data-reveal>
                <Link
                  href={`/services/${s.slug}/`}
                  data-cursor="Explore"
                  className="group grid grid-cols-12 items-center gap-4 py-10 transition-colors duration-500 md:py-14"
                >
                  <span className="col-span-2 font-mono text-sm text-accent md:col-span-1">{s.index}</span>
                  <h2 className="display col-span-10 text-4xl transition-transform duration-700 ease-out-expo group-hover:translate-x-4 md:col-span-5 md:text-6xl">
                    {s.title}
                  </h2>
                  <p className="col-span-12 text-muted md:col-span-5">{s.summary}</p>
                  <span className="col-span-12 hidden justify-end md:col-span-1 md:flex">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                        <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Process />
    </>
  );
}
