"use client";

import { useEffect, useRef } from "react";

function isInteractive(el: Element | null) {
  if (!el) return false;
  const interactiveSelector = [
    "a[href]",
    "button",
    "input",
    "textarea",
    "select",
    "summary",
    "[role='button']",
    "[role='link']",
    "[tabindex]:not([tabindex='-1'])",
    "[data-cursor='pointer']",
  ].join(",");

  return !!(el as HTMLElement).closest(interactiveSelector);
}

function isTextLike(el: Element | null) {
  if (!el) return false;
  const textSelector = ["input", "textarea", "[contenteditable='true']"].join(
    ","
  );
  return !!(el as HTMLElement).closest(textSelector);
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // internal mutable state (no React re-renders on move)
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const visible = useRef(false);
  const hoveringPointer = useRef(false);
  const hoveringText = useRef(false);
  const mouseDown = useRef(false);

  useEffect(() => {
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const canHover = window.matchMedia?.("(hover: hover)")?.matches ?? false;
    const finePointer =
      window.matchMedia?.("(pointer: fine)")?.matches ?? false;

    // Disable on touch devices or reduced motion
    if (prefersReduced || !canHover || !finePointer) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    // Start hidden until we get a move
    dot.style.opacity = "0";
    ringEl.style.opacity = "0";

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;

      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      // dot snaps to pointer (no lag)
      dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;

      if (!visible.current) {
        visible.current = true;
        dot.style.opacity = "1";
        ringEl.style.opacity = "1";
      }
    };

    const onDown = () => {
      mouseDown.current = true;
      ringEl.dataset.down = "true";
    };

    const onUp = () => {
      mouseDown.current = false;
      ringEl.dataset.down = "false";
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;

      hoveringPointer.current = isInteractive(target);
      hoveringText.current = isTextLike(target);

      ringEl.dataset.pointer = hoveringPointer.current ? "true" : "false";
      ringEl.dataset.text = hoveringText.current ? "true" : "false";
      dot.dataset.text = hoveringText.current ? "true" : "false";
    };

    const onOut = () => {
      // When leaving an element, we'll update again on next over.
      // Keep current state to avoid flicker.
    };

    const onLeaveWindow = () => {
      visible.current = false;
      dot.style.opacity = "0";
      ringEl.style.opacity = "0";
    };

    // Smooth ring follow
    let rafId = 0;
    const animate = () => {
      // simple easing
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;

      ringEl.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    // event delegation: catches dynamically-rendered links/buttons too
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });

    window.addEventListener("blur", onLeaveWindow);
    document.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("blur", onLeaveWindow);
      document.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} aria-hidden="true" className="custom-cursor-dot" />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="custom-cursor-ring"
        data-pointer="false"
        data-text="false"
        data-down="false"
      />
    </>
  );
}
