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
  title: "My Portfolio",
  description: "Modern portfolio with animations and interactive elements",
  generator: "v0.app",
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
