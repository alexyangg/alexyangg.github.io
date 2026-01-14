const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/alex-yang-" },
  { label: "GitHub", href: "https://github.com/alexyangg" },
];

const resume = {
  label: "Resume",
  href: "/Alex_Yang_Resume.pdf",
};

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Contact</h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          Have a question, opportunity, or just want to say hi?
        </p>
      </div>

      {/* Card */}
      <div className="mx-auto max-w-xl rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white dark:bg-neutral-950 p-6 shadow-sm">
        <form
          action="mailto:alexemail67@gmail.com"
          method="post"
          encType="text/plain"
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="
              w-full rounded-lg
              bg-white/30 dark:bg-black/30
              border border-white/20
              px-4 py-3 text-sm
              placeholder:text-neutral-500
              focus:outline-none focus:ring-2 focus:ring-primary
            "
          />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            className="
              w-full rounded-lg
              bg-white/30 dark:bg-black/30
              border border-white/20
              px-4 py-3 text-sm
              placeholder:text-neutral-500
              focus:outline-none focus:ring-2 focus:ring-primary
            "
          />

          <textarea
            name="message"
            placeholder="Your message"
            rows={4}
            required
            className="
              w-full rounded-lg
              bg-white/30 dark:bg-black/30
              border border-white/20
              px-4 py-3 text-sm
              placeholder:text-neutral-500
              focus:outline-none focus:ring-2 focus:ring-primary
            "
          />

          <button
            type="submit"
            className="cursor-pointer w-full rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
          >
            Send message
          </button>
        </form>

        {/* Socials */}
        <div className="mt-10 text-center">
          <p className="text-neutral-600 dark:text-neutral-300 mb-2">
            Or connect with me on
          </p>

          <div className="flex justify-center gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-primary"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Resume */}
        <div className="mt-6 text-center">
          <a
            href={resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 dark:text-neutral-400 underline underline-offset-4 hover:text-primary"
          >
            {resume.label}
          </a>
        </div>
      </div>
    </section>
  );
}
