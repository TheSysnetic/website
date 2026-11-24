// Procedural point clouds the particle system morphs between.
// Every generator returns exactly `n` xyz triplets so the CPU morph can lerp index-to-index.

/** The Sysnetic mark: two angular blades, traced from the brand favicon (1000×1000 space). */
export const MARK_POLYGONS: [number, number][][] = [
  [
    [183, 488],
    [783, 193],
    [815, 325],
    [300, 519],
    [493, 558],
    [507, 604],
    [203, 571],
  ],
  [
    [248, 760],
    [722, 559],
    [749, 672],
    [260, 807],
  ],
];

/** Mark polygons converted to world units, centred on the origin, y-up. */
export function markShapes(scale = 1): [number, number][][] {
  return MARK_POLYGONS.map((poly) =>
    poly.map(([x, y]) => [((x - 499) / 100) * scale, (-(y - 500) / 100) * scale] as [number, number]),
  );
}

// Small deterministic PRNG so the clouds are identical on every load.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rand: () => number) {
  let u = 0;
  let v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function pointInPolygon(x: number, y: number, poly: [number, number][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function scatter(n: number, rand: () => number) {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = 14 + rand() * 18;
    const th = rand() * Math.PI * 2;
    const ph = Math.acos(2 * rand() - 1);
    out[i * 3] = r * Math.sin(ph) * Math.cos(th);
    out[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
    out[i * 3 + 2] = r * Math.cos(ph) - 10;
  }
  return out;
}

function galaxy(n: number, rand: () => number) {
  const out = new Float32Array(n * 3);
  const arms = 3;
  const tilt = -1.05;
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);
  for (let i = 0; i < n; i++) {
    const r = 0.6 + Math.pow(rand(), 0.75) * 6.2;
    const arm = ((i % arms) / arms) * Math.PI * 2;
    const spread = gaussian(rand) * 0.32 * (0.4 + r / 6);
    const a = arm + r * 0.62 + spread;
    const x = Math.cos(a) * r + gaussian(rand) * 0.12;
    const z = Math.sin(a) * r + gaussian(rand) * 0.12;
    const y = gaussian(rand) * 0.16 * (1.2 - r / 7);
    // tilt the disk towards the camera
    out[i * 3] = x;
    out[i * 3 + 1] = y * ct - z * st;
    out[i * 3 + 2] = y * st + z * ct;
  }
  return out;
}

function logo(n: number, rand: () => number) {
  const out = new Float32Array(n * 3);
  const polys = markShapes(1);
  const areas = polys.map((p) => {
    let a = 0;
    for (let i = 0, j = p.length - 1; i < p.length; j = i++) a += (p[j][0] + p[i][0]) * (p[j][1] - p[i][1]);
    return Math.abs(a / 2);
  });
  const total = areas[0] + areas[1];
  const boxes = polys.map((p) => {
    const xs = p.map((v) => v[0]);
    const ys = p.map((v) => v[1]);
    return [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  });
  const depth = 0.55;
  for (let i = 0; i < n; i++) {
    const k = rand() < areas[0] / total ? 0 : 1;
    const poly = polys[k];
    if (rand() < 0.3) {
      // edge points sharpen the silhouette
      const e = Math.floor(rand() * poly.length);
      const [ax, ay] = poly[e];
      const [bx, by] = poly[(e + 1) % poly.length];
      const t = rand();
      out[i * 3] = ax + (bx - ax) * t;
      out[i * 3 + 1] = ay + (by - ay) * t;
      out[i * 3 + 2] = (rand() < 0.5 ? -1 : 1) * depth * 0.5;
    } else {
      const [x0, x1, y0, y1] = boxes[k];
      let x = 0;
      let y = 0;
      for (let tries = 0; tries < 60; tries++) {
        x = x0 + rand() * (x1 - x0);
        y = y0 + rand() * (y1 - y0);
        if (pointInPolygon(x, y, poly)) break;
      }
      out[i * 3] = x;
      out[i * 3 + 1] = y;
      out[i * 3 + 2] = (rand() - 0.5) * depth;
    }
  }
  return out;
}

function sphere(n: number, rand: () => number) {
  const out = new Float32Array(n * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    const shell = rand() < 0.82 ? 3.1 : 1.2 + rand() * 1.8;
    const r = shell + gaussian(rand) * 0.03;
    out[i * 3] = Math.cos(th) * rad * r;
    out[i * 3 + 1] = y * r;
    out[i * 3 + 2] = Math.sin(th) * rad * r;
  }
  return out;
}

function wave(n: number, rand: () => number) {
  const out = new Float32Array(n * 3);
  const cols = Math.ceil(Math.sqrt(n * 1.6));
  const rows = Math.ceil(n / cols);
  const w = 18;
  const d = 11;
  for (let i = 0; i < n; i++) {
    const cx = i % cols;
    const cz = Math.floor(i / cols);
    const x = (cx / (cols - 1) - 0.5) * w + (rand() - 0.5) * 0.02;
    const z = (cz / (rows - 1) - 0.5) * d;
    out[i * 3] = x;
    out[i * 3 + 1] = Math.sin(x * 0.45) * 0.5 + Math.cos(z * 0.6) * 0.35;
    out[i * 3 + 2] = z;
  }
  return out;
}

function helix(n: number, rand: () => number) {
  const out = new Float32Array(n * 3);
  const len = 16;
  const radius = 1.5;
  for (let i = 0; i < n; i++) {
    const t = (rand() - 0.5) * len;
    const a = t * 0.95;
    if (rand() < 0.16) {
      // rungs between the strands
      const step = Math.round(t / 0.55) * 0.55;
      const as = step * 0.95;
      const u = rand() * 2 - 1;
      out[i * 3] = step;
      out[i * 3 + 1] = Math.cos(as) * radius * u;
      out[i * 3 + 2] = Math.sin(as) * radius * u;
    } else {
      const strand = rand() < 0.5 ? 0 : Math.PI;
      const r = radius + gaussian(rand) * 0.07;
      out[i * 3] = t;
      out[i * 3 + 1] = Math.cos(a + strand) * r;
      out[i * 3 + 2] = Math.sin(a + strand) * r;
    }
  }
  return out;
}

export function buildShapes(n: number) {
  const rand = mulberry32(2024);
  return {
    scatter: scatter(n, rand),
    // order matches SHAPES in lib/scene.ts
    targets: [galaxy(n, rand), logo(n, rand), sphere(n, rand), wave(n, rand), helix(n, rand)],
  };
}

export function buildAttributes(n: number) {
  const rand = mulberry32(7);
  const colors = new Float32Array(n * 3);
  const randoms = new Float32Array(n);
  const speeds = new Float32Array(n);
  const palette = [
    [1.0, 0.12, 0.3], // brand red
    [0.92, 0.94, 1.0], // ice white
    [0.25, 0.45, 1.0], // electric blue
  ];
  for (let i = 0; i < n; i++) {
    const p = rand();
    const c = p < 0.3 ? palette[0] : p < 0.75 ? palette[1] : palette[2];
    colors.set(c, i * 3);
    randoms[i] = rand();
    speeds[i] = 0.6 + rand() * 0.8;
  }
  return { colors, randoms, speeds };
}
