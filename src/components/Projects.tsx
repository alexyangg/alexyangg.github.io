import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-24 scroll-mt-28">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Projects
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">
            A few things I've built recently.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}
