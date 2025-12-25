import { projects } from "@/content/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <h2 className="text-3xl font-bold mb-8">Projects</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p.title}
            className="border rounded-2xl p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p className="text-sm text-neutral-500 mt-2">{p.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 bg-neutral-200 dark:bg-neutral-800 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href={p.github}
              target="_blank"
              className="inline-block mt-4 text-sm underline"
            >
              GitHub →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
