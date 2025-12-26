import type { ExperienceItem } from "@/content/experience";

export default function ExperienceCard({ item }: { item: ExperienceItem }) {
  return (
    <article className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white dark:bg-neutral-950 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
        <div>
          <h3 className="text-base md:text-lg font-semibold tracking-tight">
            {item.role}
          </h3>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            {item.company}
            {item.location ? ` • ${item.location}` : ""}
          </p>
        </div>
        <p className="text-sm text-neutral-500 whitespace-nowrap">
          {item.date}
        </p>
      </div>

      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
        {item.points.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
