"use client";

import dynamic from "next/dynamic";

// WebGL is client-only and loaded after first paint so it never blocks content.
const Experience = dynamic(() => import("@/components/three/Experience"), { ssr: false });

export default function ExperienceLoader() {
  return <Experience />;
}
