"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [scrollLen, setScrollLen] = useState(0);
  const [pinH, setPinH] = useState(0);

  // Measure horizontal distance + pin viewport height
  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const viewportWidth = viewport.clientWidth;
      const totalWidth = track.scrollWidth;
      const maxTranslate = Math.max(0, totalWidth - viewportWidth);

      setScrollLen(maxTranslate);
      setPinH(window.innerHeight);

      // force a sync after measuring (prevents stale translate on refresh)
      requestAnimationFrame(() => window.dispatchEvent(new Event("scroll")));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

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
        const start = rect.top + window.scrollY;

        // progress in px through the pinned horizontal scroll
        const y = window.scrollY - start;
        const clamped = Math.max(0, Math.min(scrollLen, y));

        // translate track
        track.style.transform = `translate3d(${-clamped}px, 0, 0)`;

        // progress bar (Ref more efficient than State)
        const t = scrollLen ? clamped / scrollLen : 0;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${t})`;
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollLen]);

  // Section height ensures pin lasts exactly until last project is shown
  const sectionStyle =
    scrollLen && pinH
      ? { height: `${Math.ceil(pinH + scrollLen)}px` }
      : undefined;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="scroll-mt-28"
      style={sectionStyle}
    >
      {/* Sticky pinned viewport */}
      <div className="sticky" style={{ top: 0, height: "100vh" }}>
        <div className="h-full">
          <div className=" w-full h-full flex items-center">
            <div className="w-full">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Projects
              </h2>
              <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                A few things I've built.
              </p>

              {/* progress bar */}
              <div className="mt-4 h-1.5 w-full rounded-full bg-neutral-200/80 dark:bg-neutral-800/70 overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full origin-left rounded-full bg-neutral-900 dark:bg-white"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>

              {/* projects */}
              <div ref={viewportRef} className="mt-6 overflow-hidden">
                <div
                  ref={trackRef}
                  data-track
                  className="flex gap-6 pr-24 will-change-transform"
                  style={{ transform: "translate3d(0,0,0)" }}
                >
                  {projects.map((p) => (
                    <ProjectCard key={p.title} project={p} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
