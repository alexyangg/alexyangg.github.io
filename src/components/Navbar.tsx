"use client";

import { useEffect, useMemo, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useLenis } from "@/components/LenisProvider";

const NAV_OFFSET = 96; // px, adjust if nav height changes

const items = [
  { id: "home", label: "Home", href: "#home" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "experience", label: "Experience", href: "#experience" },
  // { id: "contact", label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");

  const lenis = useLenis();
  const ids = useMemo(() => items.map((i) => i.id), []);

  useEffect(() => {
    const getActive = () => {
      const candidates = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          const top = el.getBoundingClientRect().top;
          return { id, dist: Math.abs(top - NAV_OFFSET) };
        })
        .filter(Boolean) as { id: string; dist: number }[];

      if (candidates.length === 0) return;

      candidates.sort((a, b) => a.dist - b.dist);
      setActive(candidates[0].id);
    };

    getActive();
    window.addEventListener("scroll", getActive, { passive: true });
    window.addEventListener("resize", getActive);
    return () => {
      window.removeEventListener("scroll", getActive);
      window.removeEventListener("resize", getActive);
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
          offset: -NAV_OFFSET,
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
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <a
              key={it.id}
              href={it.href}
              onClick={(e) => onClick(e, it.id)}
              className={`px-3 py-2 text-sm rounded-full transition
                ${
                  isActive
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
                }`}
            >
              {it.label}
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
