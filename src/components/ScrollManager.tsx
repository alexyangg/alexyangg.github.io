/**
 * Ensures deterministic scroll restoration across reloads
 *
 * - Manually saves scroll position to sessionStorage
 * - Disables browser scroll restoration for consistency
 * - Waits for hydration/layout to settle before restoring scroll
 * - Forces a scroll event so dependent UI (navbar, sections, effects)
 *   stays in sync after restore
 *
 * Intended to be mounted once at the app root.
 */

"use client";

import { useEffect } from "react";

const KEY_Y = "scroll:y";

// Wait for layout/fonts/images to settle a bit
function nextPaint(): Promise<void> {
  return new Promise((r) =>
    requestAnimationFrame(() => requestAnimationFrame(() => r()))
  );
}

export default function ScrollManager() {
  useEffect(() => {
    // Make restoration deterministic
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const save = () => {
      try {
        sessionStorage.setItem(KEY_Y, String(window.scrollY));
      } catch {}
    };

    // Save on refresh / tab close / SPA nav away
    window.addEventListener("pagehide", save);
    window.addEventListener("beforeunload", save);

    const restore = async () => {
      let y = 0;

      try {
        y = Number(sessionStorage.getItem(KEY_Y) ?? "0") || 0;
      } catch {}

      // Let Next.js hydrate + compute layout (important because Projects height depends on measurement)
      await nextPaint();
      await nextPaint();

      // Restore scroll position
      window.scrollTo(0, y);

      // Force all listeners (Projects/Navbar/BackgroundFX) to sync immediately
      window.dispatchEvent(new Event("scroll"));
    };

    // pageshow fires on normal reload + bfcache restores
    const onPageShow = () => {
      restore();
    };

    window.addEventListener("pageshow", onPageShow);

    // Run once on mount too
    restore();

    return () => {
      window.removeEventListener("pagehide", save);
      window.removeEventListener("beforeunload", save);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return null;
}
