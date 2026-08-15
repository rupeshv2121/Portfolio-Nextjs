import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import type React from "react";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Rupesh Varshney — Full Stack Developer",
  description:
    "Agent-style portfolio of Rupesh Varshney — full stack developer working with React, Next.js, Node.js, TypeScript, LangChain and LangGraph. Explore projects, internships and skills through an interactive terminal.",
  keywords: [
    "Rupesh Varshney",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "LangGraph",
    "Portfolio",
  ],
  authors: [{ name: "Rupesh Varshney", url: "https://github.com/rupeshv2121" }],
  openGraph: {
    title: "Rupesh Varshney — Full Stack Developer",
    description:
      "Interactive, agent-style portfolio: projects, internships, and skills explored through a terminal and command palette.",
    url: "https://portfolio-nextjs-blush.vercel.app/",
    siteName: "Rupesh Varshney",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${dmSans.variable} font-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}
