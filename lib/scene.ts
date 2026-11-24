// Shared, mutable state that bridges the DOM (scroll / routes) and the WebGL scene.
// Intentionally not React state: the render loop reads it every frame without re-rendering.

export const SHAPES = {
  galaxy: 0,
  logo: 1,
  sphere: 2,
  wave: 3,
  helix: 4,
} as const;

export type ShapeName = keyof typeof SHAPES;

type SceneState = {
  shape: number;
  /** show the solid 3D logo (home hero only) */
  logo: boolean;
  /** particle opacity multiplier, 0..1 */
  intensity: number;
  /** bumps each time the shape changes; drives the scatter burst */
  changedAt: number;
  /** horizontal placement: -1 left, 0 centre, 1 right */
  side: number;
};

export const scene: SceneState = {
  shape: SHAPES.galaxy,
  logo: false,
  intensity: 1,
  changedAt: 0,
  side: 1,
};

export function setScene(
  shape: ShapeName,
  opts: Partial<Pick<SceneState, "logo" | "intensity" | "side">> = {},
) {
  const next = SHAPES[shape];
  if (next !== scene.shape) {
    scene.shape = next;
    scene.changedAt = performance.now();
  }
  if (opts.logo !== undefined) scene.logo = opts.logo;
  if (opts.intensity !== undefined) scene.intensity = opts.intensity;
  if (opts.side !== undefined) scene.side = opts.side;
}

// --- intro / preloader coordination -------------------------------------
let ready = false;
const listeners = new Set<() => void>();

export function markReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function onReady(fn: () => void) {
  if (ready) fn();
  else listeners.add(fn);
  return () => listeners.delete(fn);
}

export function isReady() {
  return ready;
}
