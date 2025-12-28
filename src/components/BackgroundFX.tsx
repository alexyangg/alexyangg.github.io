"use client";

import { useEffect, useRef } from "react";

export default function BackgroundFX() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const shapesRef = useRef<HTMLDivElement | null>(null);

  const SHAPES = [
    // Top area
    {
      cls: "rounded-full border-2",
      x: -120,
      y: -120,
      w: 560,
      h: 560,
      opacity: "opacity-90",
      border: "border-neutral-300/80 dark:border-neutral-700/70",
      glow: true,
    },

    {
      cls: "rounded-full border-2",
      x: "calc(100% - 540px)",
      y: 40,
      w: 720,
      h: 720,
      opacity: "opacity-80",
      border: "border-neutral-300/70 dark:border-neutral-700/60",
    },

    {
      cls: "rounded-[72px] border-2 rotate-[12deg]",
      x: 80,
      y: "calc(100% - 220px)",
      w: 560,
      h: 560,
      opacity: "opacity-85",
      border: "border-neutral-300/70 dark:border-neutral-700/55",
    },

    {
      cls: "rounded-[44px] border-2 rotate-[-10deg]",
      x: "calc(100% - 320px)",
      y: 320,
      w: 260,
      h: 260,
      opacity: "opacity-95",
      border: "border-emerald-500/60",
      glow: true,
    },

    // Mid page
    {
      cls: "rotate-45 border-2",
      x: 140,
      y: 900,
      w: 180,
      h: 180,
      opacity: "opacity-80",
      border: "border-neutral-300/70 dark:border-neutral-700/55",
    },

    {
      cls: "border-2",
      x: "calc(100% - 460px)",
      y: 1050,
      w: 220,
      h: 220,
      opacity: "opacity-75",
      border: "border-neutral-300/65 dark:border-neutral-700/50",
    },

    {
      cls: "border-2 rounded-full",
      x: 260,
      y: 1250,
      w: 420,
      h: 420,
      opacity: "opacity-70",
      border: "border-neutral-300/60 dark:border-neutral-700/45",
    },

    // Lower (shows up around Experience)
    {
      cls: "rounded-[56px] border-2 rotate-[8deg]",
      x: 80,
      y: 1600,
      w: 420,
      h: 420,
      opacity: "opacity-70",
      border: "border-neutral-300/60 dark:border-neutral-700/45",
    },

    {
      cls: "rounded-full border-2",
      x: "calc(100% - 520px)",
      y: 1750,
      w: 520,
      h: 520,
      opacity: "opacity-65",
      border: "border-neutral-300/55 dark:border-neutral-700/40",
    },
  ] as const;

  useEffect(() => {
    const grid = gridRef.current;
    const shapes = shapesRef.current;
    if (!grid || !shapes) return;

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    if (prefersReduced) return;

    let raf = 0;

    // mouse normalized [-1, 1]
    let mx = 0;
    let my = 0;

    const update = () => {
      raf = 0;

      const yReal = window.scrollY;

      // Freeze parallax during Projects pinned range by removing that scroll segment
      let y = yReal;

      const proj = document.getElementById("projects");
      if (proj) {
        const start = proj.offsetTop;
        const end = proj.offsetTop + proj.offsetHeight - window.innerHeight;

        if (yReal >= start && yReal <= end) {
          // inside pinned range: freeze at entry
          y = start;
        } else if (yReal > end) {
          // after pinned range: subtract the pinned “extra scroll” so motion resumes smoothly
          y = yReal - (end - start);
        }
      }

      // Scroll parallax
      const gridY = -y * 0.08; // slow
      const shapesY = -y * 0.56; // faster / more noticeable change

      // Mouse parallax
      const gridX = mx * 18;
      const gridMY = my * 12;

      const shapesX = mx * 36;
      const shapesMY = my * 28;

      grid.style.transform = `translate3d(${gridX}px, ${gridY + gridMY}px, 0)`;
      shapes.style.transform = `translate3d(${shapesX}px, ${
        shapesY + shapesMY
      }px, 0)`;
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    const onScroll = () => schedule();

    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
      schedule();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-white dark:bg-neutral-950"
    >
      {/* <div
        className="absolute inset-0 opacity-[0.10] dark:opacity-[0.5]"
        style={{
          backgroundImage: "url(/assets/noise.png)",
          backgroundRepeat: "repeat",
          mixBlendMode: "soft-light",
        }}
      /> */}

      {/* Base subtle tint (static) */}
      <div
        className="absolute inset-0 opacity-70 dark:opacity-75"
        style={{
          background:
            "radial-gradient(900px 520px at 18% 12%, rgba(34,197,94,0.18), rgba(34,197,94,0) 62%)," +
            "radial-gradient(1100px 700px at 85% 20%, rgba(0,0,0,0.10), rgba(0,0,0,0) 60%)",
        }}
      />

      {/* Layer 1: Moving grid (slowest) */}
      <div
        ref={gridRef}
        className="absolute -inset-[100vh] will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.14] dark:opacity-[0.12]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="gridSmall"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
            <pattern
              id="gridBig"
              width="240"
              height="240"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 240 0 L 0 0 0 240"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </pattern>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill="url(#gridSmall)"
            className="text-neutral-300 dark:text-neutral-800"
          />
          <rect
            width="100%"
            height="100%"
            fill="url(#gridBig)"
            className="text-neutral-200 dark:text-neutral-900"
            opacity="0.55"
          />
        </svg>

        {/* faint vignette so edges feel softer */}
        <div
          className="absolute inset-0 opacity-60 dark:opacity-70"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.08) 100%)",
          }}
        />
      </div>

      {/* Layer 2: Moving shapes (faster) */}
      <div
        ref={shapesRef}
        className="pointer-events-none absolute inset-0 z-10 will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        {SHAPES.map((s, i) => {
          const style: React.CSSProperties = {
            position: "absolute",
            left: typeof s.x === "number" ? `${s.x}px` : s.x,
            top: typeof s.y === "number" ? `${s.y}px` : s.y,
            width: `${s.w}px`,
            height: `${s.h}px`,
            boxShadow: s.glow
              ? "0 0 140px rgba(34,197,94,0.22), 0 0 40px rgba(34,197,94,0.22)"
              : undefined,
          };

          return (
            <div
              key={i}
              style={style}
              className={`${s.cls} ${s.border} ${s.opacity}`}
            />
          );
        })}

        {/* crosshair lines */}
        <div className="absolute left-24 top-[420px] h-[2px] w-[360px] bg-neutral-300/70 dark:bg-neutral-700/50 opacity-75" />
        <div className="absolute left-[220px] top-72 w-[2px] h-[360px] bg-neutral-300/70 dark:bg-neutral-700/50 opacity-75" />

        <div className="absolute right-24 top-[1320px] h-[2px] w-[420px] bg-neutral-300/60 dark:bg-neutral-700/45 opacity-65" />
        <div className="absolute right-[240px] top-[1200px] w-[2px] h-[420px] bg-neutral-300/60 dark:bg-neutral-700/45 opacity-65" />
      </div>
    </div>
  );
}
