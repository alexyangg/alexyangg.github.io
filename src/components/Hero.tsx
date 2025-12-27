import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-[calc(100vh-4rem)] pt-20 flex items-center"
    >
      <div className="w-full grid gap-10 md:grid-cols-[1fr_360px] items-center">
        {/* Left */}
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Vancouver • Software Engineer
          </p>

          <h1 className="mt-3 text-5xl md:text-7xl font-semibold tracking-tight">
            Alex Yang
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            I build clean, reliable software and enjoy crafting thoughtful
            interfaces. Here are a few projects and things I've done.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/resume.pdf"
              className="rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="rounded-full border border-neutral-200 dark:border-neutral-800 px-5 py-2.5 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition"
            >
              Contact
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/alex-yang-/"
              target="_blank"
              className="rounded-full border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 transition"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/alexyangg"
              target="_blank"
              className="rounded-full border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 transition"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Right (avatar card) */}
        <div className="flex justify-center md:justify-end">
          <div className="rounded-3xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/60 dark:bg-neutral-950/60 backdrop-blur p-4 shadow-sm">
            <div className="relative h-[320px] w-[320px] overflow-hidden rounded-2xl">
              <Image
                src="/assets/profile-pic.png"
                alt="Alex profile picture"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm">
                <div className="font-medium">Open to opportunities</div>
                <div className="text-neutral-600 dark:text-neutral-400">
                  Full-stack • Backend • UI
                </div>
              </div>
              <span className="text-xs rounded-full bg-neutral-100 dark:bg-neutral-900 px-3 py-1 text-neutral-700 dark:text-neutral-200">
                2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
