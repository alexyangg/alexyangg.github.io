"use client";

import Image from "next/image";
import { scrollToSection } from "@/lib/scrollToSection";
import { useLenis } from "./LenisProvider";

export default function Hero() {
  const lenis = useLenis();

  return (
    <section
      id="home"
      className="min-h-[calc(100vh-4rem)] pt-20 flex items-center"
    >
      <div className="w-full grid gap-10 md:grid-cols-[1fr_360px] items-center">
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Vancouver • Software Engineer
          </p>

          <h1 className="mt-3 text-5xl md:text-7xl font-semibold tracking-tight">
            Alex Yang
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            Building clean software and thoughtful interfaces, end to end.
          </p>

          <p className="mt-2 max-w-xl text-neutral-600 dark:text-neutral-400">
            Full-stack engineer learning scalable backends, infrastructure, and
            distributed systems.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact", lenis);
              }}
              className="rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-5 py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Contact
            </a>

            <a
              href="https://github.com/alexyangg"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full transition inline-flex items-center"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-11 w-11"
              >
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56v-2.03c-3.2.7-3.87-1.54-3.87-1.54-.53-1.35-1.29-1.71-1.29-1.71-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.71 1.25 3.37.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.69 5.4-5.25 5.68.41.35.77 1.05.77 2.13v3.15c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
              </svg>

              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/alex-yang-"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full transition inline-flex items-center"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                image-rendering="optimizeQuality"
                fill-rule="evenodd"
                clip-rule="evenodd"
                viewBox="0 0 512 512"
                className="h-10 w-10"
              >
                <path
                  fill="#fff"
                  d="M474.919 0H38.592C17.72 0 0 16.504 0 36.841V475.14C0 495.496 11.629 512 32.492 512h436.327C489.718 512 512 495.496 512 475.14V36.841C512 16.504 495.809 0 474.919 0zM195.043 195.043h68.928v35.136h.755c10.505-18.945 41.541-38.177 79.921-38.177 73.655 0 94.214 39.108 94.214 111.538v135.321h-73.148V316.883c0-32.427-12.947-60.883-43.227-60.883-36.768 0-54.295 24.889-54.295 65.758v117.103h-73.148V195.043zM73.139 438.861h73.148V195.043H73.139v243.818zm82.289-329.148c0 25.258-20.457 45.715-45.715 45.715-25.258 0-45.715-20.457-45.715-45.715 0-25.258 20.457-45.715 45.715-45.715 25.258 0 45.715 20.457 45.715 45.715z"
                />
              </svg>

              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right (avatar card) */}
        <div className="flex justify-center md:justify-end">
          <div className="rounded-full border border-neutral-200/70 dark:border-neutral-800/70 bg-white/60 dark:bg-neutral-950/60 backdrop-blur shadow-sm">
            <div className="relative h-[320px] w-[320px] overflow-hidden rounded-full">
              <Image
                src="/assets/profile-pic.png"
                alt="Alex profile picture"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
