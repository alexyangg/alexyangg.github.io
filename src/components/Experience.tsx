import { experience } from "@/content/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <h2 className="text-3xl font-bold mb-8">Experience</h2>
      <div className="space-y-6">
        {experience.map((e) => (
          <div key={e.role} className="border rounded-2xl p-6">
            <div className="flex justify-between">
              <h3 className="font-semibold">{e.role}</h3>
              <span className="text-sm text-neutral-500">{e.date}</span>
            </div>
            <p className="italic text-sm">{e.org}</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              {e.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
