export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center gap-4">
      <h1 className="text-5xl md:text-6xl font-bold">Alex Yang</h1>
      <p className="text-neutral-500 dark:text-neutral-400">
        Software Engineer
      </p>
      <div className="flex gap-4 mt-4">
        <a
          href="/resume.pdf"
          className="px-6 py-2 rounded-full border hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition"
        >
          Resume
        </a>
        <a
          href="#contact"
          className="px-6 py-2 rounded-full border hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition"
        >
          Contact
        </a>
      </div>
    </section>
  );
}
