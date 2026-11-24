import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sysnetic",
    short_name: "Sysnetic",
    start_url: "/",
    display: "browser",
    background_color: "#05070f",
    theme_color: "#05070f",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
