import { experience } from "@/content/experience";
import ExperienceCard from "@/components/ExperienceCard";

export default function Experience() {
  return (
    <section id="experience" className="py-24 scroll-mt-28">
      <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
        Experience
      </h2>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">
        A timeline of my software engineering experience.
      </p>

      <div className="mt-10 space-y-6">
        {experience.map((item) => (
          <ExperienceCard key={`${item.role}-${item.company}`} item={item} />
        ))}
      </div>
    </section>
  );
}
