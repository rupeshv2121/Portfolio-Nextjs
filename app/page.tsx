"use client";

import AgentRunTimeline from "@/components/agent/agent-run-timeline";
import AgentTerminal from "@/components/agent/agent-terminal";
import CommandPalette from "@/components/agent/command-palette";
import ProjectGrid from "@/components/agent/project-grid";
import ModernLoader from "@/components/modern-loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  achievements,
  certifications,
  education,
  profile,
  skillGroups,
} from "@/data/profile";
import { db } from "@/lib/firebase";
import image from "@/public/GP4845.jpg";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  Bot,
  Code,
  Cpu,
  Database,
  DownloadCloud,
  Github,
  Layers,
  Linkedin,
  Mail,
  Search,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const SECTIONS = [
  "About",
  "Education",
  "Experience",
  "Projects",
  "Skills",
  "Achievements",
] as const;

/** Section ids differ from labels only for Achievements (legacy anchor). */
const sectionId = (label: string) =>
  label === "Achievements" ? "certifications" : label.toLowerCase();

const skillIcons = {
  code: Code,
  layers: Layers,
  bot: Bot,
  database: Database,
  wrench: Wrench,
  cpu: Cpu,
} as const;

const skillAccent = {
  orange: { border: "rgb(249, 115, 22, 0.5)", from: "#f97316", to: "#fb923c" },
  blue: { border: "rgb(59, 130, 246, 0.5)", from: "#3b82f6", to: "#60a5fa" },
  purple: { border: "rgb(168, 85, 247, 0.5)", from: "#a855f7", to: "#c084fc" },
  green: { border: "rgb(34, 197, 94, 0.5)", from: "#22c55e", to: "#4ade80" },
  yellow: { border: "rgb(234, 179, 8, 0.5)", from: "#eab308", to: "#facc15" },
  pink: { border: "rgb(236, 72, 153, 0.5)", from: "#ec4899", to: "#f472b6" },
} as const;

const achievementAccent: Record<string, string> = {
  orange: "hover:border-orange-500/50 bg-orange-500/10 text-orange-500",
  blue: "hover:border-blue-500/50 bg-blue-500/10 text-blue-500",
  yellow: "hover:border-yellow-500/50 bg-yellow-500/10 text-yellow-500",
  green: "hover:border-green-500/50 bg-green-500/10 text-green-500",
  purple: "hover:border-purple-500/50 bg-purple-500/10 text-purple-500",
  pink: "hover:border-pink-500/50 bg-pink-500/10 text-pink-500",
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      const ids = [
        "hero",
        ...SECTIONS.map((label) => sectionId(label)),
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      // Save to Firebase
      await addDoc(collection(db, "contacts"), {
        ...data,
        timestamp: serverTimestamp(),
      });

      // Try to send email notification (non-blocking)
      try {
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (emailResponse.ok) {
          toast.success(
            "Message sent successfully! Check your email for confirmation."
          );
        } else {
          toast.success("Message received! I'll get back to you soon.");
        }
      } catch (emailError) {
        console.warn("Email notification failed:", emailError);
        toast.success("Message received! I'll get back to you soon.");
      }

      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return <ModernLoader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Toaster position="top-right" />

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onNavigate={scrollToSection}
      />

      {/* Navigation */}
      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 bg-clip-text text-xl font-bold text-transparent">
              🚩 Jai Siya Ram 🚩
            </div>

            <div className="hidden items-center space-x-8 md:flex">
              {SECTIONS.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(sectionId(item))}
                  className={`text-sm font-medium transition-all duration-300 hover:scale-105 hover:text-orange-500 ${
                    activeSection === sectionId(item)
                      ? "text-orange-500"
                      : "text-muted-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className="flex items-center gap-2 rounded-md border border-orange-500/30 px-2.5 py-1.5 text-xs text-muted-foreground transition-all duration-300 hover:border-orange-500 hover:text-orange-500"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="rounded border border-border px-1 py-0.5 text-[10px]">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero — agent terminal */}
      <section
        id="hero"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 pb-16"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-yellow-500/10 to-blue-500/10" />
        <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
          <div className="animate-fade-in-up">
            <div className="mb-5 flex justify-center">
              <span className="flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/5 px-3 py-1 text-xs text-orange-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                {profile.status}
              </span>
            </div>

            <h1 className="mb-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              {profile.role}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
              {profile.tagline}
            </p>

            <AgentTerminal onNavigate={scrollToSection} />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="About Me"
            subtitle="Crafting scalable solutions with precision and purpose."
          />

          <div className="flex flex-col items-center justify-between gap-12 overflow-x-hidden pb-16 md:flex-row md:gap-0">
            <div className="w-full space-y-6 md:max-w-[55%]">
              <div className="animate-slide-in-left">
                <h3 className="mb-4 text-2xl font-semibold text-orange-500">
                  Hello, I'm {profile.name}
                </h3>
                {profile.summary.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="mb-4 leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border-2 border-orange-500 transition-all duration-300 hover:border-white"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="group border-2 text-orange-500 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                  >
                    <DownloadCloud />
                    Download Resume
                  </Button>
                </Link>

                <Link
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border-2 border-orange-500 transition-all duration-300 hover:border-white"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="group border-orange-500 bg-transparent text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-white"
                  >
                    <Github className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                    GitHub
                  </Button>
                </Link>

                <Link
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border-2 border-blue-500 transition-all duration-300 hover:border-white"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="group border-blue-500 bg-transparent text-blue-500 transition-all duration-300 hover:bg-blue-500 hover:text-white"
                  >
                    <Linkedin className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    LinkedIn
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex w-full justify-center md:max-w-[45%]">
              <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
                <div
                  className="absolute inset-0 animate-spin-slow rounded-full border-4 border-transparent bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500"
                  style={{
                    padding: "4px",
                    maskImage:
                      "radial-gradient(circle, white 60%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(circle, white 60%, transparent 100%)",
                  }}
                />
                <div className="absolute inset-1 rounded-full border-4 border-white" />
                <div className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border-2 border-orange-500 bg-card shadow-2xl sm:h-56 sm:w-56">
                  <Image
                    src={image}
                    alt="Profile"
                    width={250}
                    height={300}
                    className="h-full w-full rounded-full object-cover"
                    style={{ filter: "brightness(0.85) contrast(1)" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Education"
            subtitle="Academic background and qualifications"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {education.map((entry) => (
              <Card
                key={entry.degree}
                className="group border-2 py-5 transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/50 hover:shadow-xl"
              >
                <CardHeader>
                  <CardTitle className="text-xl transition-colors duration-300 group-hover:text-orange-500">
                    {entry.degree}
                  </CardTitle>
                  {entry.field && (
                    <CardDescription className="text-lg">
                      {entry.field}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium text-muted-foreground">
                      {entry.institute}
                    </p>
                    <Badge
                      variant="secondary"
                      className="w-fit bg-orange-500/10 text-orange-500"
                    >
                      {entry.score}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>{entry.affiliation}</p>
                    <p className="mt-1">{entry.period}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience — rendered as agent runs */}
      <section
        id="experience"
        className="bg-gradient-to-br from-orange-500/5 via-yellow-500/5 to-blue-500/5 px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Professional Experience"
            subtitle="Two completed runs — objective, steps taken, outcome"
          />
          <AgentRunTimeline />
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Featured Projects"
            subtitle="Shipped work — agent-based systems first"
          />
          <ProjectGrid />
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Skills & Expertise"
            subtitle="Technologies and tools I work with"
          />

          <div className="grid gap-8 md:grid-cols-3">
            {skillGroups.map((category) => {
              const Icon =
                skillIcons[category.icon as keyof typeof skillIcons] ?? Code;
              const accent =
                skillAccent[category.color as keyof typeof skillAccent];

              return (
                <Card
                  key={category.title}
                  className="group border-2 py-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                  style={{ borderColor: accent.border }}
                >
                  <CardHeader className="text-center">
                    <div
                      className="mx-auto mb-4 w-fit rounded-full p-3 transition-all duration-500 group-hover:scale-110"
                      style={{
                        backgroundColor: `${accent.from}1a`,
                        color: accent.from,
                      }}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center justify-between gap-3 rounded-md p-2 transition-all duration-300 hover:bg-muted/50"
                        >
                          <span className="text-sm">{skill.name}</span>
                          <div className="h-2 w-20 shrink-0 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{
                                width: `${skill.level}%`,
                                background: `linear-gradient(to right, ${accent.from}, ${accent.to})`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications & Achievements */}
      <section
        id="certifications"
        className="bg-gradient-to-br from-orange-500/5 via-yellow-500/5 to-blue-500/5 px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Achievements & Certifications"
            subtitle="Hackathons, honours and professional certifications"
          />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="mb-6 text-2xl font-semibold text-orange-500">
                Achievements & Leadership
              </h3>
              {achievements.map((item) => {
                const accent =
                  achievementAccent[item.accent] ?? achievementAccent.orange;
                const [hoverBorder, badgeBg, badgeText] = accent.split(" ");
                return (
                  <Card
                    key={item.title}
                    className={`group border-2 py-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${hoverBorder}`}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <p>{item.title}</p>
                          <Badge
                            variant="secondary"
                            className={`${badgeBg} ${badgeText}`}
                          >
                            {item.badge}
                          </Badge>
                        </div>
                      </CardTitle>
                      <CardDescription>{item.org}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {item.detail}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="space-y-4">
              <h3 className="mb-6 text-2xl font-semibold text-orange-500">
                Certifications
              </h3>
              {certifications.map((cert) => (
                <Card
                  key={cert.title}
                  className="group border-2 py-2 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-xl"
                >
                  <CardHeader>
                    <CardTitle className="text-lg transition-colors duration-300 group-hover:text-blue-500">
                      {cert.title}
                    </CardTitle>
                    <CardDescription>{cert.org}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge
                      variant="secondary"
                      className="bg-blue-500/10 text-blue-500"
                    >
                      {cert.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Let's Work Together</h2>
            <p className="mb-4 text-xl text-muted-foreground">
              Ready to bring your ideas to life? Let's start a conversation.
            </p>
          </div>

          <Card className="border-2 shadow-2xl transition-all duration-500 hover:border-orange-500/50">
            <CardContent className="p-8">
              <form className="space-y-6" onSubmit={handleSendMessage}>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="text-sm font-medium text-orange-500"
                    >
                      Name
                    </label>
                    <Input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      className="mt-2 border-2 border-orange-500/20 transition-all duration-300 focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="text-sm font-medium text-yellow-500"
                    >
                      Email
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      className="mt-2 border-2 border-orange-500/20 transition-all duration-300 focus:border-yellow-500"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="text-sm font-medium text-blue-500"
                  >
                    Subject
                  </label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Subject of your message"
                    className="mt-2 border-2 border-orange-500/20 transition-all duration-300 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-blue-500"
                  >
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    placeholder="Tell me about yourself..."
                    rows={6}
                    className="mt-2 border-2 border-orange-500/20 transition-all duration-300 focus:border-orange-500"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSending}
                    className="group w-full bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 transition-all duration-500 hover:from-blue-500 hover:via-yellow-500 hover:to-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSending ? (
                      <span className="flex items-center gap-2">
                        <span className="h-5 w-5 animate-spin rounded-full border-3 border-white border-t-transparent" />
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-gradient-to-r from-orange-500/5 via-yellow-500/5 to-blue-500/5 px-6 py-12">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-4 text-muted-foreground">
            <p>
              <span className="mr-1">© 2026 - ❤️ Jai Siya Ram</span>
            </p>
            <p>Crafted with passion and modern web technologies.</p>
          </div>
          <div className="flex justify-center space-x-6">
            <Link href={profile.github} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="border-1 border-white transition-colors duration-300 hover:bg-transparent hover:text-orange-500"
              >
                <Github className="h-4 w-4" />
              </Button>
            </Link>
            <Link
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="border-1 border-white transition-colors duration-300 hover:border-blue-500 hover:text-blue-500"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={`mailto:${profile.email}`}>
              <Button
                variant="outline"
                size="sm"
                className="border-1 border-white transition-colors duration-300 hover:text-yellow-500"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>

      <Link
        href={profile.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-6 bottom-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-110 hover:shadow-[0_16px_40px_rgba(37,211,102,0.45)]"
      >
        <svg
          viewBox="0 0 32 32"
          className="h-8 w-8"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.11 17.44c-.27-.14-1.59-.79-1.84-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.2-1.33-.82-.73-1.37-1.63-1.53-1.9-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.61-1.48-.84-2.02-.22-.54-.45-.47-.61-.48l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.26s.98 2.63 1.12 2.81c.14.18 1.91 2.92 4.62 4.1.65.28 1.15.45 1.54.58.65.21 1.25.18 1.72.11.52-.08 1.59-.65 1.81-1.27.22-.61.22-1.14.16-1.27-.07-.14-.25-.2-.52-.34Zm-3.09 8.29h-.01c-1.95 0-3.86-.52-5.53-1.52l-.4-.24-4.11 1.08 1.1-4.01-.26-.41a10.27 10.27 0 0 1-1.57-5.44C5.24 9.18 9.78 4.64 15.38 4.64c2.72 0 5.28 1.06 7.22 3s3 4.49 3 7.22c0 5.6-4.54 10.17-10.18 10.17Zm8.67-18.84A12.2 12.2 0 0 0 15.38 2.9C8.43 2.9 2.79 8.54 2.79 15.49c0 2.21.58 4.37 1.69 6.28L2.7 29.1l7.52-1.76a12.58 12.58 0 0 0 5.16 1.11h.01c6.94 0 12.58-5.64 12.58-12.59a12.2 12.2 0 0 0-3.28-8.47Z" />
        </svg>
      </Link>
    </div>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-12 text-center">
      <h2 className="mb-3 bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
        {title}
      </h2>
      <p className="text-xl text-muted-foreground">{subtitle}</p>
    </div>
  );
}
