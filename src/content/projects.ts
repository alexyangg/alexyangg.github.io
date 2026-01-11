export type Project = {
  title: string;
  image: string; // path under /public
  description: string;
  tech: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "Komorebi",
    image: "/assets/discord_bot.png",
    description:
      "A multipurpose Discord bot with 34 commands, including moderation, leveling, and an economy system.",
    tech: ["JavaScript", "Node.js", "Discord.js", "MongoDB", "Mongoose"],
    links: [
      { label: "GitHub", href: "https://github.com/alexyangg/discord_bot" },
      {
        label: "Invite",
        href: "https://discord.com/application-directory/859496216256970762",
      },
    ],
  },
  {
    title: "AutoMarket",
    image: "/assets/automarket.png",
    description:
      "A Java car marketplace app where users can browse and purchase cars with a Swing UI and tests.",
    tech: ["Java", "JUnit", "Swing"],
    links: [
      { label: "GitHub", href: "https://github.com/alexyangg/AutoMarket" },
      { label: "Video demo", href: "/projects/AutoMarket/automarket.html" },
    ],
  },
  {
    title: "Pong",
    image: "/assets/pong.png",
    description:
      "A classic Pong clone in Java with game loop, player controls, and collision logic.",
    tech: ["Java"],
    links: [
      { label: "GitHub", href: "https://github.com/alexyangg/Pong" },
      { label: "Video demo", href: "/projects/Pong/pong.html" },
    ],
  },
];
