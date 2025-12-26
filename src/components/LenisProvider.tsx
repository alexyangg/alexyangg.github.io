// Provider for Lenis to stop the smooth-scrolling early when the user
// clicks a section on the Navbar.
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    if (prefersReduced) return;

    const instance = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    setLenis(instance);

    let rafId = 0;
    const raf = (t: number) => {
      instance.raf(t);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
