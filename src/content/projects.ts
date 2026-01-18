export type Project = {
  title: string;
  image: string; // path under /public
  description: string;
  tech: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "Patient Management System",
    image: "/assets/project_images/patient_management.png",
    description:
      "A production-style backend system built with microservices to manage patients, billing, authentication, and analytics using REST, gRPC, and Kafka message streaming.",
    tech: [
      "Java",
      "Spring Boot",
      // "Spring Cloud Gateway",
      "gRPC",
      "Kafka",
      "PostgreSQL",
      "Docker",
      "AWS (ECS, RDS, MSK, CloudFormation)",
      // "LocalStack",
      // "CloudFormation",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/alexyangg/patient-management",
      },
    ],
  },
  {
    title: "WasteNot",
    image: "/assets/project_images/wastenot.png",
    description:
      "A smart web app that generates recipes from leftover ingredients in your pantry to reduce food waste. Top 10 (of 81) project for the TELUS Sponsor Prize at nwHacks 2025.",
    tech: [
      "Node.js",
      "Express.js",
      "React",
      "MongoDB",
      "Spoonacular API",
      "Google Maps API",
      "JWT",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/alexyangg/nwhacks2025" },
      {
        label: "Devpost",
        href: "https://devpost.com/software/wastenot-gomst0",
      },
    ],
  },
  {
    title: "ExpressMart",
    image: "/assets/project_images/expressmart.png",
    description:
      "A full-stack web application designed for a product marketplace, allowing users to create and sell their products.",
    tech: ["Node.js", "Express.js", "React", "MongoDB"],
    links: [
      { label: "GitHub", href: "https://github.com/alexyangg/express-mart" },
      {
        label: "Website",
        href: "https://expressmart.onrender.com/",
      },
    ],
  },
  {
    title: "Komorebi",
    image: "/assets/project_images/discord_bot.png",
    description:
      "A multipurpose Discord bot with 34 commands, including moderation, leveling, and an economy system.",
    tech: ["JavaScript", "Node.js", "Discord.js", "MongoDB", "Mongoose"],
    links: [
      { label: "GitHub", href: "https://github.com/alexyangg/discord_bot" },
      {
        label: "View on Discord",
        href: "https://discord.com/application-directory/859496216256970762",
      },
    ],
  },
  {
    title: "AutoMarket",
    image: "/assets/project_images/automarket.png",
    description:
      "A Java car marketplace app where users can browse and purchase cars with a Swing UI and tests.",
    tech: ["Java", "JUnit", "Swing"],
    links: [
      { label: "GitHub", href: "https://github.com/alexyangg/AutoMarket" },
      { label: "Video demo", href: "/automarket" },
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
      { label: "Video demo", href: "/pong" },
    ],
  },
];
