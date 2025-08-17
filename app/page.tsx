"use client";

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
import { db } from "@/lib/firebase"; // Make sure this path matches your Firebase config file
import image from "@/public/GP4845.jpg";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  ArrowDown,
  Brain,
  BrainCircuitIcon,
  Code,
  DownloadCloud,
  Github,
  Linkedin,
  Mail,
  Palette,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    if (!isLoading) {
      setIsVisible(true);
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return <ModernLoader onComplete={() => setIsLoading(false)} />;
  }

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      await addDoc(collection(db, "contacts"), {
        ...data,
        timestamp: serverTimestamp(),
      });
      toast.success("Message sent successfully!");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Toaster position="top-right" />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
              🚩 Jai Siya Ram 🚩
            </div>
            <div className="hidden md:flex space-x-8">
              {["About", "Projects", "Skills", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 hover:text-orange-500 hover:scale-105 ${
                    activeSection === item.toLowerCase()
                      ? "text-orange-500"
                      : "text-muted-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-yellow-500/10 to-blue-500/10"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
              Full Stack Developer
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed animate-slide-in-left">
              Code with character, design with soul. Bringing ideas to life—one
              stack at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in-right">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-yellow-500 hover:to-blue-500 transition-all duration-500 transform hover:scale-105"
              >
                <span className="relative z-10">View My Work</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="group border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
                <Mail className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-orange-500" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Crafting scalable solutions with precision and purpose.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pb-24 overflow-x-hidden gap-12 md:gap-0">
            {/* Left: Text & Buttons */}
            <div className="space-y-6 w-full md:max-w-[55%]">
              <div className="animate-slide-in-left">
                <h3 className="text-2xl font-semibold mb-4 text-orange-500">
                  Hello, I'm Rupesh Varshney
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I'm a full-stack developer with 1.5+ years of experience
                  creating web applications that combine beautiful design with
                  robust functionality. I specialize in React, Next.js, and
                  modern web technologies.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding, you can find me exploring new design
                  trends, contributing to open-source projects, or experimenting
                  with the latest web technologies.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  download
                  href="https://drive.google.com/open?id=1nkjUXdDwKUQoMAynondRATVzHsWE0ukP&usp=drive_fs"
                  target="_blank"
                  className="border-2 border-orange-500 rounded-lg transition-all duration-300 hover:border-white"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="group text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 border-2 hover:border-orange-500"
                  >
                    <DownloadCloud />
                    Download Resume
                  </Button>
                </Link>

                <Link
                  href="https://github.com/rupeshv2121"
                  target="_blank"
                  className="border-2 border-orange-500 rounded-lg transition-all duration-300 hover:border-white"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="group bg-transparent border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
                  >
                    <Github className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                    GitHub
                  </Button>
                </Link>
                <Link
                  className="border-2 border-blue-500 rounded-lg transition-all duration-300 hover:border-white"
                  href="https://www.linkedin.com/in/rupeshvarshney/"
                  target="_blank"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="group bg-transparent border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
                  >
                    <Linkedin className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    LinkedIn
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Profile Image */}
            <div className="w-full md:max-w-[45%] flex justify-center">
              <div className="relative h-56 w-56 sm:h-64 sm:w-64 flex items-center justify-center">
                {/* Animated gradient border */}
                <div
                  className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 animate-spin-slow"
                  style={{
                    padding: "4px",
                    maskImage:
                      "radial-gradient(circle, white 60%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(circle, white 60%, transparent 100%)",
                  }}
                ></div>
                {/* Inner white ring for separation */}
                <div className="absolute inset-1 rounded-full border-4 border-white"></div>
                {/* Profile image */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-2xl border-2 border-orange-500 bg-card flex items-center justify-center">
                  <Image
                    src={image}
                    alt="Profile"
                    width={250}
                    height={300}
                    className="rounded-full object-cover w-full h-full"
                    style={{
                      filter: "brightness(0.85) contrast(1)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 px-6 bg-gradient-to-br from-orange-500/5 via-yellow-500/5 to-blue-500/5"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground">
              A showcase of my recent work and creative solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce Platform",
                description:
                  "Modern e-commerce solution with React.js and Razorpay integration",
                image:
                  "https://plus.unsplash.com/premium_photo-1739315914931-0589ca36e8fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGUlMjBjb21tZXJjZSUyMHRodW1ibmFpbCUyMHdlYnNpdGV8ZW58MHx8MHx8fDA%3D",
                tags: ["React", "Next.js", "Stripe", "Tailwind"],
                link: "#",
              },
              {
                title: "Portfolio Website",
                description:
                  "Responsive portfolio with modern animations and interactive elements",
                image:
                  "https://assets.awwwards.com/awards/element/2022/05/627be98fa9616400863515.png",
                tags: ["Next.js", "Framer Motion", "Tailwind", "TypeScript"],
                link: "#",
              },
            ].map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:rotate-1 overflow-hidden border-2 hover:border-orange-500/50 pb-4"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/60 via-yellow-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-end p-4">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="cursor-pointer opacity-90 bg-white/90 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
                    >
                      <Link href="https://github.com/rupeshv2121/E-Commerce_">
                        <span className="h-4 w-4 mr-2" />
                        View Project
                      </Link>
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-orange-500 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-gradient-to-r from-orange-500/10 to-blue-500/10 hover:from-orange-500/20 hover:to-blue-500/20 transition-all duration-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-xl text-muted-foreground">
              Technologies and tools I work with
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="h-8 w-8" />,
                title: "Frontend Development",
                skills: [
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "Framer Motion",
                ],
                color: "orange",
              },
              {
                icon: <Palette className="h-8 w-8" />,
                title: "UI/UX Design",
                skills: ["Figma", "Responsive Design", "Prototyping"],
                color: "yellow",
              },
              {
                icon: <Brain className="h-8 w-8" />,
                title: "Backend",
                skills: [
                  "Node.js",
                  "PostgreSQL",
                  "Express.js",
                  "MongoDB",
                  "Firebase",
                ],
                color: "blue",
              },
              {
                icon: <BrainCircuitIcon className="h-8 w-8" />,
                title: "Programming Languages",
                skills: ["Java", "C++", "Python"],
                color: "green",
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl py-2 transition-all duration-500 hover:-translate-y-2 border-2"
                style={{
                  borderColor:
                    category.color === "blue"
                      ? "rgb(59, 130, 246, 0.5)"
                      : category.color === "yellow"
                      ? "rgb(234, 179, 8, 0.5)"
                      : category.color === "green"
                      ? "rgb(34, 197, 94, 0.5)"
                      : "rgb(249, 115, 22, 0.5)",
                }}
              >
                <CardHeader className="text-center">
                  <div
                    className={`mx-auto mb-4 p-3 rounded-full transition-all duration-500 group-hover:scale-110 ${
                      category.color === "blue"
                        ? "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500"
                        : category.color === "yellow"
                        ? "bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500"
                        : category.color === "green"
                        ? "bg-green-500/10 text-green-500 group-hover:bg-green-500"
                        : "bg-orange-500/10 text-orange-500 group-hover:bg-orange-500"
                    } group-hover:text-white`}
                  >
                    {category.icon}
                  </div>
                  <CardTitle
                    className={
                      category.color === "blue"
                        ? "group-hover:text-blue-500"
                        : category.color === "yellow"
                        ? "group-hover:text-yellow-500"
                        : category.color === "green"
                        ? "group-hover:text-green-500"
                        : "group-hover:text-orange-500"
                    }
                  >
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skill}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${skillIndex * 0.1}s` }}
                      >
                        <span className="text-sm">{skill}</span>
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full animate-pulse"
                            style={{
                              background: `linear-gradient(to right, ${
                                category.color === "blue"
                                  ? "#3b82f6"
                                  : category.color === "yellow"
                                  ? "#eab308"
                                  : category.color === "green"
                                  ? "#34d399"
                                  : "#f97316"
                              }, ${
                                category.color === "blue"
                                  ? "#60a5fa"
                                  : category.color === "yellow"
                                  ? "#facc15"
                                  : category.color === "green"
                                  ? "#34d399"
                                  : "#fb923c"
                              })`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-6 bg-gradient-to-br from-orange-500/5 via-yellow-500/5 to-blue-500/5"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-xl text-muted-foreground">
              Ready to bring your ideas to life? Let's start a conversation.
            </p>
          </div>

          <Card className="shadow-2xl border-2 hover:border-orange-500/50 transition-all duration-500">
            <CardContent className="p-8">
              <form className="space-y-6" onSubmit={handleSendMessage}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-">
                    <label className="text-sm font-medium text-orange-500">
                      Name
                    </label>
                    <Input
                      name="name"
                      type="text"
                      placeholder="Your name"
                      className="mt-2 transition-all duration-300 focus:scale-105 focus:border-orange-500 border-2 border-orange-500/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-yellow-500">
                      Email
                    </label>
                    <Input
                      name="email"
                      required
                      type="email"
                      placeholder="your.email@example.com"
                      className="mt-2 border-2 border-orange-500/20 transition-all duration-300 focus:scale-105 focus:border-yellow-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-500">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    type="text"
                    required
                    placeholder="Subject of your message"
                    className="mt-2 border-2 border-orange-500/20 transition-all duration-300 focus:scale-105 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-blue-500"
                  >
                    Message
                  </label>
                  <Textarea
                    name="message"
                    required
                    typeof="text"
                    placeholder="Tell me about yourself..."
                    rows={6}
                    className="mt-2 border-2 border-orange-500/20 transition-all duration-300 focus:scale-105 focus:border-orange-500"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 hover:from-blue-500 hover:via-yellow-500 hover:to-orange-500 transition-all duration-500 transform hover:scale-105"
                  >
                    Send Message
                  </Button>
                  <input type="hidden" name="_captcha" value="false" />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-gradient-to-r from-orange-500/5 via-yellow-500/5 to-blue-500/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-muted-foreground mb-4  ">
            <p>
              <span className="mr-1">© 2025 - ❤️ Jai Siya Ram</span>
            </p>
            <p> Crafted with passion and modern web technologies.</p>
          </div>
          <div className="flex justify-center space-x-6">
            <Button
              variant="outline"
              size="sm"
              className="border-1 border-white hover:bg-transparent hover:text-orange-500 transition-colors duration-300"
            >
              <Github className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-1 border-white hover:border-blue-500 hover:text-blue-500  transition-colors duration-300"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className=" border-1 border-white hover:text-yellow-500 transition-colors duration-300"
            >
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
