"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/content/projects";

const NAV_OFFSET = 112;

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [scrollLen, setScrollLen] = useState(0);

  // total width of horizontal content
  const totalCards = useMemo(() => projects.length, []);

  useEffect(() => {
    const measure = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const viewport = track.parentElement as HTMLElement | null;
      const viewportWidth = viewport?.clientWidth ?? window.innerWidth;

      const totalWidth = track.scrollWidth;

      const maxTranslate = Math.max(0, totalWidth - viewportWidth);
      setScrollLen(maxTranslate);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [totalCards]);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;

        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;

        // how far user has scrolled into this section
        const y = window.scrollY - sectionTop;

        // available vertical scroll inside this section
        const maxY = Math.max(1, section.offsetHeight - window.innerHeight);

        // progress 0..1
        const t = Math.min(1, Math.max(0, y / maxY));
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${t})`;
        }

        // translate 0..scrollLen
        const x = -scrollLen * t;

        track.style.transform = `translate3d(${x}px, 0, 0)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollLen]);

  // Section height determines how long the pin lasts.
  // Give it enough vertical scroll space to traverse the horizontal distance.
  // + window.innerHeight to account for sticky viewport.
  const sectionHeightStyle = scrollLen
    ? { height: `calc(${scrollLen}px + 100vh)` }
    : { height: "100vh" };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 scroll-mt-28"
      style={sectionHeightStyle}
    >
      {/* pinned viewport */}
      <div className="sticky" style={{ top: NAV_OFFSET }}>
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Projects
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">
              A few things I've built.
            </p>
          </div>
        </div>

        {/* Horizontal viewport */}
        <div className="mt-10 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            {projects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </div>
        {/* horizontal scroll progress bar */}
        <div className="mt-4 h-1.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
          <div
            ref={progressRef}
            className="h-full origin-left rounded-full bg-neutral-900 dark:bg-white"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
