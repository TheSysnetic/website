import { site } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import SceneController from "@/components/layout/SceneController";
import PageHero from "@/components/ui/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import ContactForm from "@/components/sections/ContactForm";
import Clock from "@/components/ui/Clock";

export const metadata = pageMetadata({
  title: "Contact — Start a Project",
  description: `Get in touch with Sysnetic for a free consultation. Email ${site.email}, call ${site.phone} or visit us at ${site.address.street}, ${site.address.city}.`,
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <SceneController shape="galaxy" side={1} intensity={0.7} />
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Contact", path: "/contact/" }]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            url: "https://thesysnetic.com/contact/",
            mainEntity: {
              "@type": "ProfessionalService",
              name: site.name,
              email: site.email,
              telephone: site.phone,
              image: "https://thesysnetic.com/og.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: site.address.street,
                postalCode: "90459",
                addressLocality: "Nürnberg",
                addressCountry: "DE",
              },
              geo: { "@type": "GeoCoordinates", latitude: 49.4356, longitude: 11.0755 },
            },
          },
        ]}
      />
      <PageHero
        eyebrow="Contact"
        crumbs={[{ label: "Contact", href: "/contact/" }]}
        title={
          <>
            Let&apos;s build <span className="text-gradient">something great.</span>
          </>
        }
        intro="Our experts are here to help with your tech needs. Tell us about your project and we'll explore the smartest way forward — the first consultation is free."
      />

      <section aria-label="Contact form and details" className="relative pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <ContactForm />
          </div>
          <aside className="space-y-10 lg:col-span-4 lg:col-start-9">
            <div data-reveal>
              <p className="eyebrow">Write to us</p>
              <a href={`mailto:${site.email}`} className="display mt-4 block break-all text-2xl transition-colors hover:text-accent md:text-3xl">
                {site.email}
              </a>
            </div>
            <div data-reveal>
              <p className="eyebrow">Call anytime</p>
              <a href={site.phoneHref} className="display mt-4 block text-2xl transition-colors hover:text-accent md:text-3xl">
                {site.phone}
              </a>
            </div>
            <div data-reveal>
              <p className="eyebrow">Visit us</p>
              <address className="mt-4 text-xl not-italic leading-relaxed">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.country}
              </address>
              <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-muted underline underline-offset-4 hover:text-fg">
                Open in Google Maps ↗
              </a>
              <p className="mt-6 font-mono text-xs text-muted">
                Local time · <Clock />
              </p>
            </div>
            <div data-reveal>
              <p className="eyebrow">Follow</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="glass inline-block rounded-full px-4 py-2 text-sm hover:border-accent">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
