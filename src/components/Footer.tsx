"use client";

// const socials = [
//   { label: "GitHub", href: "https://github.com/yourusername" },
//   { label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
//   { label: "Twitter", href: "https://twitter.com/yourusername" },
// ];

export default function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Auto-fitting columns */}
        {/* <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        > */}
        {/* Brand / Contact */}
        {/* <div className="space-y-2">
            <p className="text-lg font-semibold">First Last</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Fullstack Engineer
            </p>
            <p className="text-sm">
              <a
                href="mailto:email@example.com"
                className="underline underline-offset-4 hover:text-primary"
              >
                email@example.com
              </a>
            </p>
          </div> */}

        {/* Socials */}
        {/* <div className="space-y-2">
            <p className="font-medium">Elsewhere</p>
            <ul className="space-y-1 text-sm">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 dark:text-neutral-400 hover:text-primary"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}
        {/* </div> */}

        {/* Bottom line */}
        <div className="pt-10 text-center text-s text-neutral-500">
          Built with 💚 by Alex Yang
        </div>
      </div>
    </footer>
  );
}
