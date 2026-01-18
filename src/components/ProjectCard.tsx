import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="
        group w-[360px] md:w-[420px] shrink-0 overflow-hidden
        rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70
        bg-white dark:bg-neutral-950 shadow-sm hover:shadow-md transition
        grid
        grid-rows-[220px_auto_72px_auto]
        sm:grid-rows-[240px_auto_80px_auto]
      "
    >
      {/* Image (fixed height so everything below aligns) */}
      <div className="relative w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          className="object-contain group-hover:scale-[1.20] transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Project description */}
      <div className="px-6 pt-6">
        <h3 className="text-lg font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Tech stack container */}
      <div className="px-6 pt-4 overflow-hidden">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs rounded-full bg-neutral-100 dark:bg-neutral-900 px-3 py-1 text-neutral-700 dark:text-neutral-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Links (aligned across ProjectCards) */}
      <div className="px-6 pb-6 pt-5 flex flex-wrap gap-3">
        {project.links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100"
          >
            {l.label} ↗︎
          </Link>
        ))}
      </div>
    </article>
  );
}
