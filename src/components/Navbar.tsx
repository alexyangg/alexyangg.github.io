"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useLenis } from "@/components/LenisProvider";

const sections = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");

  const lenis = useLenis();
  const ids = useMemo(() => sections.map((s) => s.id), []);

  useEffect(() => {
    const computeActive = () => {
      const anchor = window.innerHeight * 0.5;

      // pick the LAST section whose rect contains the anchor line
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= anchor && rect.bottom > anchor) {
          return ids[i];
        }
      }

      // fallback: closest section top above anchor
      let best = "home";
      let bestScore = Number.NEGATIVE_INFINITY;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const score = anchor - rect.top; // bigger = closer above
        if (score >= 0 && score > bestScore) {
          bestScore = score;
          best = id;
        }
      }
      return best;
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const id = computeActive();
        setActive((prev) => (prev === id ? prev : id));
      });
    };

    // run once on mount
    onScroll();

    // run after layout settles (Projects measures on resize/mount)
    requestAnimationFrame(onScroll);
    setTimeout(onScroll, 0);
    setTimeout(onScroll, 80);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    // Prefer Lenis (it can interrupt an in-progress scroll)
    if (lenis) {
      if (id === "home") {
        lenis.scrollTo(0, { immediate: false, lock: false, force: true });
        return;
      }
      const el = document.getElementById(id);
      if (el)
        lenis.scrollTo(el, {
          offset: 0,
          immediate: false,
          force: true,
        });
      return;
    }

    // Fallback
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-1 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-950/70 backdrop-blur px-2 py-2 shadow-sm">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <a
              key={s.id}
              onClick={(e) => onClick(e, s.id)}
              className={`px-3 py-2 text-sm rounded-full select-none cursor-pointer transition ${
                isActive
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
              }`}
            >
              {s.label}
            </a>
          );
        })}
        <div className="ml-1">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
