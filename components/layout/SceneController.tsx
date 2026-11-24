"use client";

import { useEffect } from "react";
import { setScene, type ShapeName } from "@/lib/scene";

/** Sets the background scene state for a whole page. */
export default function SceneController({
  shape,
  intensity = 1,
  side = 1,
  logo = false,
}: {
  shape: ShapeName;
  intensity?: number;
  side?: number;
  logo?: boolean;
}) {
  useEffect(() => {
    setScene(shape, { intensity, side, logo });
  }, [shape, intensity, side, logo]);
  return null;
}
