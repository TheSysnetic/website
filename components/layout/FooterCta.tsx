"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** The footer call-to-action is redundant on the contact page itself. */
export default function FooterCta({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/contact")) return null;
  return <>{children}</>;
}
