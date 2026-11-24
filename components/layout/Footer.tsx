import Link from "next/link";
import { nav, services, site } from "@/lib/content";
import Button from "@/components/ui/Button";
import Clock from "@/components/ui/Clock";
import FooterCta from "./FooterCta";

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-line bg-ink/80 backdrop-blur-xl">
      <div className="container-x pt-24 md:pt-32">
        <FooterCta>
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <h2 data-split className="display max-w-3xl text-[clamp(2.75rem,7vw,6.5rem)]">
            Have an idea?
            <br />
            <span className="text-gradient">Let&apos;s build it.</span>
          </h2>
          <div data-reveal>
            <Button href="/contact/">Start a project</Button>
          </div>
        </div>

        <div className="hairline my-16 md:my-20" />
        </FooterCta>

        <div className="grid grid-cols-2 gap-10 text-sm md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <p className="eyebrow mb-5">Studio</p>
            <address className="not-italic leading-relaxed text-fg/80">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.country}
            </address>
            <p className="mt-4 font-mono text-xs text-muted">
              Local time · <Clock />
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow mb-5">Explore</p>
            <ul className="space-y-2.5">
              {[{ label: "Home", href: "/" }, ...nav].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-fg/80 transition-colors hover:text-accent">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow mb-5">Services</p>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`} className="text-fg/80 transition-colors hover:text-accent">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-3">
            <p className="eyebrow mb-5">Contact</p>
            <ul className="space-y-2.5">
              <li><a href={`mailto:${site.email}`} className="text-fg/80 transition-colors hover:text-accent">{site.email}</a></li>
              <li><a href={site.phoneHref} className="text-fg/80 transition-colors hover:text-accent">{site.phone}</a></li>
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-fg/80 transition-colors hover:text-accent">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container-x mt-20 select-none" aria-hidden>
        <p className="display text-outline translate-y-[18%] text-center text-[clamp(4rem,21vw,22rem)] leading-none">Sysnetic</p>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Sysnetic. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy/" className="hover:text-fg">Privacy Policy</Link>
            <Link href="/terms/" className="hover:text-fg">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
