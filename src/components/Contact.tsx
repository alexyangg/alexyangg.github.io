"use client";

import { useState } from "react";

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/alex-yang-" },
  { label: "GitHub", href: "https://github.com/alexyangg" },
];

const resume = {
  label: "Resume",
  href: "/Alex_Yang_Resume.pdf",
};

export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

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
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Honeypot: bots often fill this, humans won't */}
          <div className="hidden" aria-hidden="true">
            <label>
              Company
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>
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
            disabled={status === "sending"}
            className="
              cursor-pointer w-full rounded-full
              bg-neutral-900 text-white
              dark:bg-white dark:text-neutral-900
              px-5 py-2.5 text-sm font-medium
              hover:opacity-90 transition
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>

          {/* Status message */}
          {status === "success" && (
            <p className="text-sm text-green-600 dark:text-green-400">
              Message sent! I’ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
          )}
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
