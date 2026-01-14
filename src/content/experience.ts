export type ExperienceItem = {
  role: string;
  company: string;
  date: string;
  location?: string;

  companyUrl?: string;
  logoSrc?: string;
  logoAlt?: string;
  summary: string; // shown when collapsed
  impactPoints: string[]; // shown when expanded (full details)
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineer Intern",
    company: "Shopify",
    date: "Jan 2026 – Apr 2026",
    location: "Toronto, ON",
    companyUrl: "https://www.shopify.com",
    // logoSrc: "/assets/logos/shopify.svg",
    logoAlt: "Shopify logo",
    summary:
      "Incoming full-stack engineering intern on Shopify's Website Platform team, building core services used by millions of merchants.",
    impactPoints: [
      "Incoming full-stack intern on the Website Platform team, contributing to high-traffic merchant-facing services",
      "Working with Ruby on Rails, React, and GraphQL to develop and maintain core platform functionality",
      "Collaborating with engineers across frontend and backend to ship reliable, scalable features",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Safe Software",
    date: "Sept 2025 – Dec 2025",
    location: "Surrey, BC",
    companyUrl: "https://www.safe.com",
    // logoSrc: "/assets/logos/safe-software.svg",
    logoAlt: "Safe Software logo",
    summary:
      "Built and optimized internal security tooling to detect third-party dependency vulnerabilities and automate security workflows.",
    impactPoints: [
      "Developed Python scripts to scan internal library dependencies using data from the NIST vulnerability database, achieving 95% scan accuracy",
      "Implemented version parsing, rate limiting, caching, de-duplication, and multithreading to optimize scans and reduce runtime by 35×",
      "Integrated Jira and Slack APIs to automatically create issue tickets and send real-time alerts for newly detected vulnerabilities",
      "Eliminated 90% of manual security triage by automating vulnerability detection and notification pipelines",
      "Built a comprehensive test suite from scratch with 130+ unit and integration tests using pytest, achieving 100% code coverage and preventing regressions",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Cadabble",
    date: "Feb 2025 – Mar 2025",
    location: "Remote",
    companyUrl: "https://cadabble.com",
    // logoSrc: "/assets/logos/cadabble.svg",
    logoAlt: "Cadabble logo",
    summary:
      "Worked on full-stack features to support real-time service submissions and improve performance across the web platform.",
    impactPoints: [
      "Implemented Next.js backend API routes connected to a Prisma-managed Neon Postgres database to support real-time submissions from 20+ agents",
      "Unblocked downstream processing by enabling reliable ingestion of service requests through newly built APIs",
      "Integrated Cloudinary for image uploads, offloading media handling and improving API responsiveness by 1.5×",
      "Optimized frontend performance by implementing Next.js lazy loading, reducing visual layout shifts by 80%",
    ],
  },
  // {
  //   role: "Executive Director of Graphic Design",
  //   company: "Project Hastings",
  //   date: "Sep 2021 – Jan 2023",
  //   location: "Vancouver, BC",
  //   companyUrl: "https://projecthastings.org/",
  //   // logoSrc: "/assets/Cheeky_Poro_Emote.png",
  //   logoAlt: "Project Hastings logo",
  //   summary:
  //     "Led the graphic design function for a nonprofit organization, overseeing branding, campaigns, and visual strategy in support of food security initiatives.",
  //   impactPoints: [
  //     "Directed all graphic design initiatives, managing timelines, deliverables, and quality standards across multiple concurrent projects.",
  //     "Developed and maintained consistent branding across digital, print, and social media materials.",
  //     "Collaborated with operations, marketing, and fundraising teams to translate campaign goals into effective visual assets.",
  //     "Designed promotional materials that supported the distribution of 35,000+ meals and contributed to $40,000+ in fundraising.",
  //     "Mentored and provided feedback to junior designers, improving workflow efficiency and design consistency.",
  //     "Streamlined design processes to reduce turnaround time and improve cross-team communication.",
  //   ],
  // },
  // {
  //   role: "Air Cadet",
  //   company: "Royal Canadian Air Cadets",
  //   date: "Sep 2018 – Jan 2022",
  //   summary: "Achieved rank of Sergeant and Proficiency Level 5.",
  //   impactPoints: [
  //     "Achieved rank of Sergeant and Proficiency Level 5.",
  //     "Delivered lessons on leadership, aviation, and survival to junior cadets.",
  //     "Led drill practice and provided feedback to improve drill proficiency.",
  //   ],
  // },
  // {
  //   role: "Crew Member",
  //   company: "McDonald's",
  //   date: "Nov 2021 – Feb 2022",
  //   summary:
  //     "Provided customer service in a fast-paced environment and resolved issues efficiently.",
  //   impactPoints: [
  //     "Provided customer service in a fast-paced environment and resolved issues efficiently.",
  //     "Collaborated with team members to maintain smooth operations during peak hours.",
  //     "Followed strict health and safety procedures for food prep and cleanliness.",
  //   ],
  // },
];
