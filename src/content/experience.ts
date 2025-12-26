export type ExperienceItem = {
  role: string;
  company: string;
  date: string;
  location?: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Executive Director of Graphic Design",
    company: "Project Hastings",
    date: "Sep 2021 – Jan 2023",
    points: [
      "Oversaw graphic design projects end-to-end, ensuring deadlines and quality standards.",
      "Collaborated cross-functionally to understand design needs and align on goals.",
      "Helped distribute 35,000+ meals and supported fundraising of $40,000+ to address food disparity.",
    ],
  },
  {
    role: "Air Cadet",
    company: "Royal Canadian Air Cadets",
    date: "Sep 2018 – Jan 2022",
    points: [
      "Achieved rank of Sergeant and Proficiency Level 5.",
      "Delivered lessons on leadership, aviation, and survival to junior cadets.",
      "Led drill practice and provided feedback to improve drill proficiency.",
    ],
  },
  {
    role: "Crew Member",
    company: "McDonald's",
    date: "Nov 2021 – Feb 2022",
    points: [
      "Provided customer service in a fast-paced environment and resolved issues efficiently.",
      "Collaborated with team members to maintain smooth operations during peak hours.",
      "Followed strict health and safety procedures for food prep and cleanliness.",
    ],
  },
];
