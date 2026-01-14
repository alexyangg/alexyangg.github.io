import type Lenis from "lenis";

export function scrollToSection(
  id: string,
  lenis: Lenis | null,
  opts?: { offset?: number }
) {
  const offset = opts?.offset ?? 0;

  if (id === "home") {
    if (lenis) {
      lenis.scrollTo(0, { immediate: false, force: true });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset, immediate: false, force: true });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
