// Pixel helpers for logo-background.ts, working on raw RGBA buffers in place.
type RGB = [number, number, number];

// Colour distance under which a pixel counts as background.
const HARD = 38;
// Distance at which an edge pixel is fully opaque again; between HARD and SOFT
// it's an anti-aliased blend of mark and background.
const SOFT = 120;

function dist(d: Buffer, i: number, c: RGB): number {
  return Math.hypot(d[i] - c[0], d[i + 1] - c[1], d[i + 2] - c[2]);
}

function borderIndexes(w: number, h: number): number[] {
  const out: number[] = [];
  for (let x = 0; x < w; x++) out.push(x, (h - 1) * w + x);
  for (let y = 1; y < h - 1; y++) out.push(y * w, y * w + w - 1);
  return out;
}

// The most common border colour and how much of the border it covers.
export function dominantBorderColor(d: Buffer, w: number, h: number) {
  const idx = borderIndexes(w, h);
  const buckets = new Map<number, { n: number; sum: RGB }>();
  let transparent = 0;
  for (const p of idx) {
    const i = p * 4;
    if (d[i + 3] < 16) { transparent++; continue; }
    const key = ((d[i] >> 4) << 8) | ((d[i + 1] >> 4) << 4) | (d[i + 2] >> 4);
    const b = buckets.get(key) ?? { n: 0, sum: [0, 0, 0] as RGB };
    b.n++; b.sum[0] += d[i]; b.sum[1] += d[i + 1]; b.sum[2] += d[i + 2];
    buckets.set(key, b);
  }
  const top = [...buckets.values()].sort((a, b) => b.n - a.n)[0];
  const color: RGB = top ? [top.sum[0] / top.n, top.sum[1] / top.n, top.sum[2] / top.n] : [255, 255, 255];
  const near = idx.filter((p) => d[p * 4 + 3] >= 16 && dist(d, p * 4, color) <= HARD).length;
  return { color, share: near / idx.length, transparentShare: transparent / idx.length };
}

// Clears background-coloured pixels connected to the border (4-way fill), or
// with `enclosed` every background-coloured pixel, holes in letters included.
export function floodBackground(d: Buffer, w: number, h: number, bg: RGB, enclosed = false) {
  const mask = new Uint8Array(w * h);
  if (enclosed) for (let p = 0; p < w * h; p++) if (dist(d, p * 4, bg) <= HARD) mask[p] = 1;
  const stack: number[] = [];
  for (const p of borderIndexes(w, h)) if (dist(d, p * 4, bg) <= HARD) { mask[p] = 1; stack.push(p); }
  while (stack.length) {
    const p = stack.pop()!;
    const x = p % w;
    for (const q of [p - w, p + w, x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1]) {
      if (q < 0 || q >= w * h || mask[q] || dist(d, q * 4, bg) > HARD) continue;
      mask[q] = 1; stack.push(q);
    }
  }
  let cleared = 0;
  for (let p = 0; p < w * h; p++) if (mask[p]) { d[p * 4 + 3] = 0; cleared++; }
  return { mask, cleared };
}

function near(mask: Uint8Array, w: number, h: number, x: number, y: number, r: number, want: 0 | 1) {
  const hits: number[] = [];
  for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
    const nx = x + dx, ny = y + dy;
    if (nx >= 0 && ny >= 0 && nx < w && ny < h && mask[ny * w + nx] === want) hits.push(ny * w + nx);
  }
  return hits;
}

// Pixels within 2px of the cleared area are a blend of mark and background
// (anti-aliasing, JPEG blur). The mark colour is taken from the most distinct
// pixel nearby; the pixel's share of it becomes its alpha, and the background
// tint is removed so no light fringe is left around dark text.
export function edgeSoften(d: Buffer, w: number, h: number, mask: Uint8Array, bg: RGB) {
  const src = Buffer.from(d);
  for (let p = 0; p < w * h; p++) {
    if (mask[p]) continue;
    const x = p % w, y = (p - x) / w;
    if (!near(mask, w, h, x, y, 2, 1).length) continue;
    let fg = p, best = -1;
    for (const q of near(mask, w, h, x, y, 3, 0)) {
      const dq = dist(src, q * 4, bg);
      if (dq > best) { best = dq; fg = q; }
    }
    const i = p * 4, f = fg * 4;
    const span = [src[f] - bg[0], src[f + 1] - bg[1], src[f + 2] - bg[2]];
    const len2 = span[0] ** 2 + span[1] ** 2 + span[2] ** 2;
    if (len2 < SOFT) continue;
    const proj = ((src[i] - bg[0]) * span[0] + (src[i + 1] - bg[1]) * span[1] + (src[i + 2] - bg[2]) * span[2]) / len2;
    const a = Math.min(1, Math.max(0, proj));
    if (a >= 0.98) continue;
    const alpha = Math.max(a, 0.02);
    for (let c = 0; c < 3; c++) d[i + c] = Math.round(Math.min(255, Math.max(0, bg[c] + (src[i + c] - bg[c]) / alpha)));
    d[i + 3] = Math.round(src[i + 3] * a);
  }
}
