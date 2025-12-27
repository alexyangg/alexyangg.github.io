import Image from "next/image";
import type { Project } from "@/content/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group w-[360px] md:w-[420px] shrink-0 overflow-hidden rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-md transition">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold tracking-tight">
          {project.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs rounded-full bg-neutral-100 dark:bg-neutral-900 px-3 py-1 text-neutral-700 dark:text-neutral-200"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100"
            >
              {l.label} →
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
