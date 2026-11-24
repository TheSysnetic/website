import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import Header from "@/components/layout/Header";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/layout/Cursor";
import Preloader from "@/components/layout/Preloader";
import ExperienceLoader from "@/components/layout/ExperienceLoader";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["400", "500", "600", "700"], display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-jb", weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sysnetic — Web, Mobile & Cloud Software Studio in Nürnberg",
    template: "%s — Sysnetic",
  },
  description: site.description,
  keywords: ["software development", "web development", "mobile app development", "UI UX design", "cloud solutions", "AWS", "digital marketing", "Nürnberg", "Germany"],
  openGraph: {
    type: "website",
    siteName: "Sysnetic",
    title: "Sysnetic — Digital products, engineered to move",
    description: site.description,
    url: site.url,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Sysnetic" }],
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "Sysnetic", description: site.description, images: ["/og.png"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#05070f",
  colorScheme: "dark",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sysnetic",
  url: site.url,
  logo: `${site.url}/brand/sysnetic-logo-light.png`,
  email: site.email,
  telephone: site.phone,
  foundingDate: String(site.founded),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: "90459",
    addressLocality: "Nürnberg",
    addressCountry: "DE",
  },
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* hide animatable elements only when JS is available (no-JS users see everything) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2">
          Skip to content
        </a>
        <ExperienceLoader />
        <Preloader />
        <SmoothScroll />
        <Header />
        {children}
        <Cursor />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
