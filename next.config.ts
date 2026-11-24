import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static output (./out) — deployable to any static host, including the
  // existing Apache/PHP hosting (contact form handled by public/contact.php).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
