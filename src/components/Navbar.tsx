"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useLenis } from "@/components/LenisProvider";

const NAV_OFFSET = 96; // px from top, used for determining current section

const sections = [
  { id: "home", label: "Home", href: "#home" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "experience", label: "Experience", href: "#experience" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");

  const lenis = useLenis();
  const ids = useMemo(() => sections.map((s) => s.id), []);
  const lastHashRef = useRef<string>("");

  useEffect(() => {
    const computeActive = () => {
      const y = window.scrollY;

      const homeEl = document.getElementById("home");
      const projEl = document.getElementById("projects");
      const expEl = document.getElementById("experience");

      // Near top => Home
      if (y < 10) return "home";

      // Lock to Projects while projects horizontal scroll is still in progress
      if (projEl) {
        const start = projEl.offsetTop; // absolute doc position
        const end = projEl.offsetTop + projEl.offsetHeight - window.innerHeight; // end of pinned scroll area

        // If we're inside the projects pinned scroll range, keep it as active section
        if (y >= start - NAV_OFFSET && y < end + NAV_OFFSET) {
          return "projects";
        }
      }

      // After projects finishes, normal logic: whichever section top is closest to NAV_OFFSET
      const candidates = [
        { id: "home", el: homeEl },
        { id: "projects", el: projEl },
        { id: "experience", el: expEl },
      ].filter((c): c is { id: string; el: HTMLElement } => !!c.el);

      let bestId = "home";
      let bestDist = Number.POSITIVE_INFINITY;

      for (const c of candidates) {
        const top = c.el.getBoundingClientRect().top;
        const dist = Math.abs(top - NAV_OFFSET);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = c.id;
        }
      }

      return bestId;
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const id = computeActive();

        setActive((prev) => (prev === id ? prev : id));

        const newHash = `#${id}`;
        if (lastHashRef.current !== newHash) {
          lastHashRef.current = newHash;
          // don’t pollute back button history
          window.history.replaceState(null, "", newHash);
        }
      });
    };

    // run once on mount (in case you load with a hash)
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    window.history.pushState(null, "", `#${id}`);

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
              href={s.href}
              onClick={(e) => onClick(e, s.id)}
              className={`px-3 py-2 text-sm rounded-full transition ${
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
