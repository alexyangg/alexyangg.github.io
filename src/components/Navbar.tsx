"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur bg-neutral-900/80 dark:bg-neutral-800/80 rounded-full px-6 py-3 flex gap-6 items-center">
      {["projects", "experience", "contact"].map((item) => (
        <a
          key={item}
          href={`#${item}`}
          className="text-sm text-white hover:opacity-80"
        >
          {item}
        </a>
      ))}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-white"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </nav>
  );
}
