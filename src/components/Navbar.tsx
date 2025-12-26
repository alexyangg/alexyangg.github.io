"use client";

import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-2 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-950/60 backdrop-blur px-3 py-2 shadow-sm">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="px-3 py-2 text-sm rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
          >
            {l.label}
          </a>
        ))}
        <div className="ml-1">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
