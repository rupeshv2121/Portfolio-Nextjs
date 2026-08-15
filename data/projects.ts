export type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
  /** Agent-based / AI systems get a distinct treatment in the projects grid. */
  agentic?: boolean;
};

export const projects: Project[] = [
  // AMULate BMW Group - AI-powered Calendar & Task Management (multi-agent)
  {
    title: "AI-Powered Calendar & Task Assistant — AMULate, BMW Group",
    description:
      "A multi-agent productivity platform built with LangChain and LangGraph for intelligent scheduling. Specialised agent workflows handle task prioritisation, calendar scheduling, and automated reminder generation, with a voice-enabled interaction module for hands-free use and Google Calendar API integration. Placed Rank 3 at the AMULATE Hackathon (BMW Group).",
    image: "/AMULateBMWGrou.png",
    tags: [
      "LangGraph",
      "LangChain",
      "Langfuse",
      "Groq",
      "FastAPI",
      "Pydantic",
      "React.js",
      "typescript",
      "shadCN UI",
      "framer-motion",
      "Spline",
      "React Three Fiber",
      "Google Calendar API",
    ],
    link: "https://bmw-alpine-dream-frontend.onrender.com",
    github: "https://github.com/rupeshv2121/Amulate-BMW-Group",
    agentic: true,
  },
  // CampusCure - The Smart Way to Manage Campus Life
  {
    title: "CampusCure - The Smart Way to Manage Campus Life",
    description:
      "Online complaint management for campus issues, Collaborative doubt community for students and faculty, Real-time analytics dashboard, Status updates for complaints and doubts, Secure user authentication (including Face ID), Tailored dashboards for students, faculty, and admins",
    image: "/CampusCure.png",
    tags: [
      "React.js",
      "typescript",
      "Ant Design",
      "framer-motion",
      "recharts",
      "zod",
      "RBAC",
      "Vercel",
      "Node.js",
      "Express",
      "prisma",
      "Supabase",
      "jsonwebtoken",
      "bcryptjs",
      "helmet",
      "cors",
    ],
    link: "https://campus-cure-frontend.vercel.app/",
    github: "https://github.com/rupeshv2121/CampusCure_Frontend",
  },
  // Invoice Generator Web-App
  {
    title: "Invoice Generator Web-App",
    description:
      "A SaaS invoicing platform with subscription management, automated trials, and role-based middleware access control across 4 pricing tiers. GST-compliant invoicing with automated CGST/SGST/IGST calculations and PDF generation reduced errors by 95% and creation time by 60%. Analytics dashboard with real-time metrics and JWT auth, optimised for <200ms response time.",
    image: "/InvoiceGenerator.png",
    tags: [
      "React.js",
      "Node.js",
      "Express",
      "Supabase",
      "JWT",
      "PDF Generation",
    ],
    link: "https://invoice-generator-theta-olive.vercel.app/",
    github: "https://github.com/rupeshv2121/invoice_generator",
  },
  // Out from Cumfurt
  {
    title: "Out from Cumfurt",
    description:
      "Out from Cumfurt is a likely focused on providing a secure and organized platform for managing study materials or online learning resources. Its goal is to facilitate secure, user-friendly study experiences, possibly offering features like resource sharing, user authentication, and study management tools..",
    image: "/OutFromCumfurt.png",
    tags: [
      "React.js",
      "Radix UI",
      "TanStack Query",
      "Zod",
      "Tailwind",
      "Express",
      "Prisma",
      "Supabase",
      "JWT",
      "bcryptjs",
      "helmet",
      "cors",
      "Google APIs",
    ],
    link: "https://secure-study-hub.vercel.app/",
    github: "https://github.com/rupeshv2121/secure-study-hub",
  },
  // CalmPath - Personal Crisis Decision Assistant
  {
    title: "CalmPath - Personal Crisis Decision Assistant",
    description:
      "CalmPath is designed to help people manage emergencies with clear guidance and emotional support. Built with React, TypeScript, and powered by an intuitive AI-like conversational interface, CalmPath provides step-by-step instructions, calming techniques, and emergency escalation support during high-stress situations.",
    image: "/CalmPath.png",
    tags: [
      "React.js",
      "typescript",
      "shadCN UI",
      "framer-motion",
      "Web Speech API",
      "My Memory API",
      "FastAPI",
      "LangGraph",
      "Langfuse",
      "Groq",
      "Pydantic",
      "Swagger UI",
      "cors",
    ],
    link: "https://calm-path-frontend.vercel.app/",
    github: "",
    agentic: true,
  },
  // System Drift
  {
    title: "System Drift",
    description: `System Drift is a React-based single-player game where rules progressively break down, testing the player's ability to adapt to changing systems. Players click colored tiles following instructions that become increasingly unreliable as "entropy" increases, representing the collapse of the game's rule system..`,
    image: "/SystemDrift.png",
    tags: [
      "React.js",
      "TanStack Query",
      "typescript",
      "Tailwind CSS",
      "Radix UI",
      "recharts",
      "Express API",
      "Supabase",
      "Zod",
    ],
    link: "https://system-collapse-frontend.onrender.com/",
    github: "https://github.com/rupeshv2121/system_collapse_frontend",
  },
  // SmartFlow AI - Intelligent Traffic & Emergency Grid
  {
    title: "SmartFlow AI - Intelligent Traffic & Emergency Grid",
    description:
      "SmartFlow AI is a comprehensive AI-driven urban traffic orchestration platform that combines real-time computer vision, adaptive signal control, and emergency-first routing to solve critical urban mobility challenges.",
    image: "/SmartFlowAI.png",
    tags: [
      "React.js",
      "typescript",
      "three.js",
      "React Three Fiber",
      "Socket.IO",
      "Recharts",
      "Node.js",
      "Express",
      "cors",
      "Python",
      "OpenCV",
      "YOLOv5",
      "FastAPI",
    ],
    link: "https://smart-flow-ai-intelligent-traffic-e.vercel.app/",
    github:
      "https://github.com/rupeshv2121/SmartFlow_AI-Intelligent_Traffic_Emergency_Grid-India_Innovate_Hackathon",
    agentic: true,
  },
  // Portfolio Website
  {
    title: "Portfolio Website",
    description:
      "Developed a personal portfolio website showcasing projects, technical skills, and achievements. Integrated dynamic SEO and server-side rendering (SSR), improving page load speed by 30% and boosting SEO ranking. Implemented responsive and modern UI/UX designs, ensuring seamless experience across different devices (like desktop, tablet, mobile).",
    image: "/PortFolioWebsite.png",
    tags: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS", "SSR", "SEO"],
    link: "https://portfolio-nextjs-blush.vercel.app/",
    github: "https://github.com/rupeshv2121/Portfolio-Nextjs",
  },
  // Faculty Management System
  {
    title: "Faculty Management System",
    description:
      "Faculty Management System is a web-based application that helps educational institutions manage faculty information efficiently. It streamlines administrative tasks, reduces manual effort, and provides an organized platform for storing and handling faculty-related data and operations.",
    image: "/FacultyManagementSystem.png",
    tags: ["HTML", "CSS", "JavaScript", "C++"],
    link: "https://faculty-management-system-ten2.onrender.com/landing.html",
    github: "https://github.com/rupeshv2121/Faculty-Management-System",
  },
  // Data Analysis Project
  {
    title: "Data Analysis Project",
    description:
      "Diverse data visualization techniques with charts, plots, and dashboards. Created 5+ charts, plots, and dashboards, improving decision-making efficiency by 30%. Comprehensive analysis using Python data science libraries including Pandas, NumPy, Matplotlib, and Seaborn for insights extraction.",
    image: "/DataAnalysisProject.png",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    link: "https://github.com/rupeshv2121/Data_Visualization",
    github: "https://github.com/rupeshv2121/Data_Visualization",
  },
];
