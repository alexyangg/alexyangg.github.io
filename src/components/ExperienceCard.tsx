"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import type { ExperienceItem } from "@/content/experience";

export default function ExperienceCard({ item }: { item: ExperienceItem }) {
  const [open, setOpen] = useState(false);
  const regionId = useId();

  return (
    <MotionConfig reducedMotion="user">
      {/* Smoothly animates the card’s size changes */}
      <motion.article
        layout="size"
        transition={{ layout: { duration: 0.32, ease: "easeInOut" } }}
        className={[
          "rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70",
          "bg-white dark:bg-neutral-950 p-4 md:p-5 shadow-sm",
          "transition",
          "hover:shadow-md hover:-translate-y-[1px]",
          "hover:border-neutral-300/70 dark:hover:border-neutral-700/70",
          "hover:ring-2 hover:ring-neutral-200/60 dark:hover:ring-neutral-800/60",
          "focus-within:shadow-md",
          "overflow-hidden", // important for height animations
        ].join(" ")}
      >
        {/* Make the whole card clickable */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={regionId}
          className="w-full text-left cursor-pointer outline-none"
        >
          <div className="relative grid gap-5 md:gap-6 md:grid-cols-[minmax(0,30%)_minmax(0,70%)] items-start pr-30">
            <div className="absolute right-0 top-0 flex items-center gap-2">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 select-none">
                {open ? "Hide" : "Click for details"}
              </span>

              <motion.span
                aria-hidden="true"
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.18 }}
                className={[
                  "inline-flex h-8 w-8 items-center justify-center rounded-full",
                  "border border-neutral-200/70 dark:border-neutral-800/70",
                  "bg-white dark:bg-neutral-950 text-neutral-500",
                  "transition-colors",
                  "group-hover:text-neutral-700 dark:group-hover:text-neutral-300",
                ].join(" ")}
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5.5 7.5L10 12l4.5-4.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </div>

            {/* Left side: logo + role + company + date/location */}
            <div className="min-w-0 pr-6 md:pr-8">
              <div className="flex items-start gap-4">
                {/* Logo (hyper-linked) */}
                {item.companyUrl ? (
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Open ${item.company} website`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white dark:bg-neutral-950"
                  >
                    {item.logoSrc ? (
                      <Image
                        src={item.logoSrc}
                        alt={item.logoAlt ?? `${item.company} logo`}
                        fill
                        sizes="48px"
                        className="object-contain p-1.5"
                      />
                    ) : (
                      <div className="h-full w-full grid place-items-center">
                        <span className="text-xs font-semibold text-neutral-500">
                          {item.company.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </a>
                ) : (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white dark:bg-neutral-950">
                    {item.logoSrc ? (
                      <Image
                        src={item.logoSrc}
                        alt={item.logoAlt ?? `${item.company} logo`}
                        fill
                        sizes="48px"
                        className="object-contain p-1.5"
                      />
                    ) : (
                      <div className="h-full w-full grid place-items-center">
                        <span className="text-xs font-semibold text-neutral-500">
                          {item.company.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="min-w-0">
                  <h3 className="text-base md:text-lg font-semibold tracking-tight leading-tight text-neutral-900 dark:text-neutral-50">
                    {item.role}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300 truncate">
                    {item.companyUrl ? (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="underline underline-offset-4 decoration-neutral-300/70 dark:decoration-neutral-700/70 hover:decoration-neutral-500 dark:hover:decoration-neutral-400"
                        aria-label={`Open ${item.company} website`}
                      >
                        {item.company}
                      </a>
                    ) : (
                      item.company
                    )}
                  </p>

                  {/* Date/location  */}
                  <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <div className="whitespace-nowrap">{item.date}</div>
                    {item.location ? (
                      <div className="whitespace-nowrap">{item.location}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: summary/impact points */}
            <div id={regionId} className="min-w-0 pt-[2px]">
              {/* Smoothly animated swap: height + opacity so the card doesn’t snap */}
              <AnimatePresence initial={false} mode="sync">
                {!open ? (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.26, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      initial={{ y: 6 }}
                      animate={{ y: 0 }}
                      exit={{ y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200"
                    >
                      {item.summary}
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="impact"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: 6 }}
                      animate={{ y: 0 }}
                      exit={{ y: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ul className="space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
                        {item.impactPoints.map((p) => (
                          <li key={p} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </button>
      </motion.article>
    </MotionConfig>
  );
}
