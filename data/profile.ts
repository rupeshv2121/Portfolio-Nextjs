/**
 * Single source of truth for résumé data.
 * Everything the page renders about Rupesh comes from here so the terminal,
 * command palette and the static sections can never drift apart.
 */

export const profile = {
  name: "Rupesh Varshney",
  handle: "rupesh.varshney",
  role: "Full Stack Developer",
  tagline:
    "Code with character, design with soul. Bringing ideas to life—one stack at a time.",
  status: "open to SDE / AI roles",
  location: "Aligarh, India",
  email: "rupeshvarshney7@gmail.com",
  phone: "+91 9456467877",
  github: "https://github.com/rupeshv2121",
  linkedin: "https://www.linkedin.com/in/rupeshvarshney/",
  leetcode: "https://leetcode.com/u/rupesh2108/",
  whatsapp: "https://wa.me/919456467877",
  resume:
    "https://drive.google.com/file/d/16tF3K0BXCndDlIMA9jfEh6YLS2xybkq3/view?usp=sharing",
  summary: [
    "Computer Engineering undergraduate (CGPA 9.437) with software engineering experience across two internships and a strong foundation in data structures, algorithms, and object-oriented programming using Java and C++.",
    "I specialize in full-stack development with React, Next.js, Node.js, and modern web technologies, and I build agent-based systems with LangChain and LangGraph. Hands-on with cloud platforms, databases, and shipping production-ready applications.",
    "When I'm not coding you'll find me solving DSA problems on LeetCode, contributing to open source, or exploring new technologies and design trends.",
  ],
} as const;

export const education = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Engineering",
    institute: "Zakir Husain College of Engineering and Technology, AMU",
    affiliation: "Affiliated to Aligarh Muslim University",
    score: "CGPA: 9.437",
    period: "August 2023 - August 2027",
  },
  {
    degree: "Intermediate (Science + Information Technology)",
    field: "",
    institute: "Maharishi Vidya Mandir, Aligarh",
    affiliation: "Affiliated to Central Board of Secondary Education (CBSE)",
    score: "Percentage : 95.4%",
    period: "April 2021 - April 2022",
  },
  {
    degree: "High School",
    field: "",
    institute: "Maharishi Vidya Mandir, Aligarh",
    affiliation: "Affiliated to Central Board of Secondary Education (CBSE)",
    score: "Percentage : 91.6%",
    period: "April 2019 - April 2020",
  },
];

/**
 * Experience modelled as "agent runs": each role is a run, each bullet a step
 * with a tool name and an observed outcome. Rendered by AgentRunTimeline.
 */
export const experience = [
  {
    id: "coolcliq",
    company: "CoolCliq",
    title: "Software Developer Intern",
    location: "Aligarh, India (Remote)",
    period: "August 2025 - October 2025",
    accent: "orange" as const,
    objective:
      "Ship and harden B2B travel booking modules on a live production codebase.",
    steps: [
      {
        tool: "build_module",
        action:
          "Developed and enhanced modules for B2B travel bookings — flights, hotels, packages, and visa processing.",
        result: "processing time ↓ 25%",
      },
      {
        tool: "contribute",
        action:
          "Core contributor to the TechTrailDMC project, driving feature development and bug fixes in a live production codebase.",
        result: "shipped to production",
      },
      {
        tool: "compose_ui",
        action:
          "Built 25+ reusable React and TypeScript UI components for booking, supplier onboarding, and real-time management.",
        result: "25+ components",
      },
      {
        tool: "integrate",
        action:
          "Integrated dashboards and supplier-management features enabling global reach, margin control, verified partner coordination, and real-time lead tracking.",
        result: "real-time lead tracking",
      },
    ],
    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "Prisma ORM",
      "Supabase",
    ],
  },
  {
    id: "temflo",
    company: "Temflo Pvt. Ltd.",
    title: "Software Developer Intern",
    location: "Aligarh, India (Remote)",
    period: "July 2025 - August 2025",
    accent: "blue" as const,
    objective:
      "Make the product fast, responsive and usable across devices and languages.",
    steps: [
      {
        tool: "optimize",
        action: "Improved UI responsiveness and trimmed render work.",
        result: "page load time ↓ 20%",
      },
      {
        tool: "compose_ui",
        action:
          "Designed and shipped a responsive UI adaptable to desktop and mobile devices.",
        result: "user retention ↑ 15%",
      },
      {
        tool: "integrate",
        action:
          "Implemented multi-language UI, quick actions, and REST API integration with asynchronous data fetching.",
        result: "real-time data management",
      },
    ],
    stack: [
      "React.js",
      "TypeScript",
      "REST APIs",
      "i18n",
      "UI/UX Design",
      "Responsive Design",
    ],
  },
];

export const skillGroups = [
  {
    title: "Languages",
    icon: "code",
    color: "orange",
    skills: [
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "TypeScript", level: 80 },
      { name: "C++", level: 90 },
      { name: "Java", level: 75 },
      { name: "Python", level: 70 },
      { name: "C", level: 80 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: "layers",
    color: "blue",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Node.js / Express", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "FastAPI", level: 70 },
      { name: "Redux Toolkit", level: 70 },
    ],
  },
  {
    title: "Agentic & AI",
    icon: "bot",
    color: "purple",
    skills: [
      { name: "LangChain", level: 80 },
      { name: "LangGraph", level: 80 },
      { name: "Multi-agent workflows", level: 75 },
      { name: "Tool / function calling", level: 75 },
      { name: "Langfuse tracing", level: 65 },
      { name: "OpenCV", level: 60 },
    ],
  },
  {
    title: "Database & Cloud",
    icon: "database",
    color: "green",
    skills: [
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 85 },
      { name: "Supabase", level: 85 },
      { name: "Prisma ORM", level: 80 },
      { name: "Firebase", level: 85 },
      { name: "MySQL", level: 75 },
    ],
  },
  {
    title: "Developer Tools",
    icon: "wrench",
    color: "yellow",
    skills: [
      { name: "Git", level: 90 },
      { name: "Postman", level: 95 },
      { name: "Vercel", level: 85 },
      { name: "Docker", level: 65 },
      { name: "Linux", level: 60 },
      { name: "CI/CD Pipelines", level: 55 },
    ],
  },
  {
    title: "Core CS",
    icon: "cpu",
    color: "pink",
    skills: [
      { name: "Data Structures & Algorithms", level: 85 },
      { name: "Object-Oriented Programming", level: 85 },
      { name: "DBMS", level: 80 },
      { name: "Operating Systems", level: 75 },
      { name: "Computer Networks", level: 75 },
      { name: "System Design", level: 60 },
    ],
  },
];

export const achievements = [
  {
    title: "Delhi Next 2.0 — Top 60 Nationally",
    org: "Government of NCT of Delhi",
    badge: "Top 60",
    accent: "orange",
    detail:
      "Selected among the top 60 students nationally to present an idea directly to Delhi government ministries.",
  },
  {
    title: "AMULATE Hackathon — Rank 3",
    org: "BMW Group",
    badge: "Rank 3",
    accent: "blue",
    detail:
      "Placed 3rd building an AI-powered productivity assistant with a BMW-themed showcase.",
  },
  {
    title: "IGNITE Hackathon Finalist",
    org: "StartLab Capital",
    badge: "2025",
    accent: "yellow",
    detail: "Finalist at the IGNITE Hackathon organized by StartLab Capital.",
  },
  {
    title: "India Innovates Hackathon Finalist",
    org: "SmartFlow AI",
    badge: "Finalist",
    accent: "green",
    detail:
      "Finalist for SmartFlow AI, an intelligent traffic and emergency-response grid.",
  },
  {
    title: "Google Student Ambassador",
    org: "Google Gemini AI",
    badge: "Aug 2025 - Dec 2025",
    accent: "purple",
    detail:
      "Selected as a Google Student Ambassador to represent Google Gemini AI on campus.",
  },
  {
    title: "LeetCode & GeeksForGeeks",
    org: "Competitive Programming",
    badge: "300+ solved",
    accent: "pink",
    detail: "Solved 300+ DSA problems across LeetCode and GeeksForGeeks.",
  },
];

export const certifications = [
  {
    title: "Full Stack Web Development",
    org: "Apna College",
    status: "Completed",
  },
];
