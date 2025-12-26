"use client";

import { useEffect, useMemo, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_OFFSET = 96; // px, adjust if nav height changes

const items = [
  { id: "home", label: "Home", href: "#home" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "experience", label: "Experience", href: "#experience" },
  // { id: "contact", label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");

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
    // smooth-scroll instead of instant jump
    e.preventDefault();
    if (id === "home") {
      window.history.pushState(null, "", "#home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    window.history.pushState(null, "", `#${id}`);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
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

// "use client";

// import { useEffect, useState } from "react";
// import ThemeToggle from "@/components/ThemeToggle";

// const sections = [
//   { id: "home", label: "Home", href: "#home" },
//   { id: "projects", label: "Projects", href: "#projects" },
//   { id: "experience", label: "Experience", href: "#experience" },
// ];

// export default function Navbar() {
//   const [active, setActive] = useState("home");

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActive(entry.target.id);
//           }
//         });
//       },
//       {
//         rootMargin: "-40% 0px -50% 0px",
//         threshold: 0.01,
//       }
//     );

//     sections.forEach((s) => {
//       const el = document.getElementById(s.id);
//       if (el) observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, []);

//   const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
//     e.preventDefault();

//     // update URL hash (so href updates) without a jump
//     window.history.pushState(null, "", `#${id}`);

//     if (id === "home") {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       return;
//     }

//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
//       <nav className="flex items-center gap-1 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-950/70 backdrop-blur px-2 py-2 shadow-sm">
//         {sections.map((s) => {
//           const isActive = active === s.id;
//           return (
//             <a
//               key={s.id}
//               href={s.href}
//               onClick={(e) => onClick(e, s.id)}
//               className={`px-3 py-2 text-sm rounded-full transition
//                 ${
//                   isActive
//                     ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
//                     : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
//                 }`}
//             >
//               {s.label}
//             </a>
//           );
//         })}
//         <div className="ml-1">
//           <ThemeToggle />
//         </div>
//       </nav>
//     </div>
//   );
// }
