// Normalised device pointer (-1..1), tracked on window because the canvas sits
// behind the page with pointer-events disabled.
export const pointer = { x: 0, y: 0, active: false };

let bound = false;
export function bindPointer() {
  if (bound || typeof window === "undefined") return;
  bound = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType === "touch") return;
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.active = true;
    },
    { passive: true },
  );
  document.addEventListener("pointerleave", () => (pointer.active = false));
}
