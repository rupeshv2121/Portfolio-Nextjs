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
import { db } from "@/lib/firebase";
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
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "education",
        "experience",
        "projects",
        "skills",
        "certifications",
        "contact",
      ];
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
    setIsSending(true);
    
    const formData = new FormData(e.currentTarget);
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (emailResponse.ok) {
          toast.success("Message sent successfully! Check your email for confirmation.");
        } else {
          toast.success("Message received! I'll get back to you soon.");
        }
      } catch (emailError) {
        console.warn("Email notification failed:", emailError);
        toast.success("Message received! I'll get back to you soon.");
      }

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSending(false);
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
              {[
                "About",
                "Education",
                "Experience",
                "Projects",
                "Skills",
                "Certifications",
                "Contact",
              ].map((item) => (
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
                onClick={() =>  window.location.href = "mailto:rupeshvarshney7@gmail.com?subject=Hiring%20Opportunity&body=Hi%20Rupesh%2C%0A%0AI%20am%20interested%20in%20hiring%20you%20for%20a%20project."}
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
      <section id="about" className="py-20 px-6 mt-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
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
                  Software Engineering student skilled in MERN, TypeScript, and cloud tools. Currently building an Invoice Generator web app with automated PDF billing. Passionate about scalable systems, problem-solving, and AI integration.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I specialize in full-stack development with React, Next.js, Node.js, and modern web technologies. I have hands-on experience with cloud platforms, databases, and building production-ready applications.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding, you can find me solving DSA problems on LeetCode, contributing to open-source projects, or exploring new technologies and design trends.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  download
                  href="https://drive.google.com/file/d/1R5ghSFkTKu-F0wbl62zLd5SciQzw5uyY/view?usp=sharing"
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

      {/* Education Section */}
      <section id="education" className="my-6 px-6 mb-40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
              Education
            </h2>
            <p className="text-xl text-muted-foreground">
              Academic background and qualifications
            </p>
          </div>

          <div className="space-y-6 lg:flex items-center lg:gap-10">
            <div className="max-w-3xl mx-auto ">
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-orange-500/50 py-5">
              <CardHeader>
                <CardTitle className="text-2xl group-hover:text-orange-500 transition-colors duration-300">
                  Bachelor of Technology (B.Tech)
                </CardTitle>
                <CardDescription className="text-lg">
                  Computer Science & Engineering
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <p className="text-muted-foreground font-medium">
                    Zakir Husain College of Engineering and Technology, AMU
                  </p>
                  <Badge
                    variant="secondary"
                    className="bg-orange-500/10 text-orange-500 w-fit"
                  >
                    CGPA: 9.298
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Affiliated to Aligarh Muslim University</p>
                  <p className="mt-1">August 2023 - August 2027</p>
                </div>
              </CardContent>
            </Card>
            </div>

            <div className="max-w-3xl mx-auto ">
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-orange-500/50 py-5">
              <CardHeader>
                <CardTitle className="text-2xl group-hover:text-orange-500 transition-colors duration-300">
                  Intermediate (Science)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <p className="text-muted-foreground font-medium">
                   Maharishi Vidya Mandir, Aligarh
                  </p>
                  <Badge
                    variant="secondary"
                    className="bg-orange-500/10 text-orange-500 w-fit"
                  >
                    Percentage : 95.4%
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Affiliated to Central Board of Secondary Education (CBSE)</p>
                  <p className="mt-1">April 2021 - April 2022</p>
                </div>
              </CardContent>
            </Card>
            </div>

            <div className="max-w-3xl mx-auto ">
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-orange-500/50 py-5">
              <CardHeader>
                <CardTitle className="text-2xl group-hover:text-orange-500 transition-colors duration-300">
                  High School
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <p className="text-muted-foreground font-medium">
                    Maharishi Vidya Mandir, Aligarh
                  </p>
                  <Badge
                    variant="secondary"
                    className="bg-orange-500/10 text-orange-500 w-fit"
                  >
                    Percentage : 91.6%
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Affiliated to Central Board of Secondary Education (CBSE)</p>
                  <p className="mt-1">April 2019 - April 2020</p>
                </div>
              </CardContent>
            </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-20 px-6 bg-gradient-to-br from-orange-500/5 via-yellow-500/5 to-blue-500/5"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <p className="text-xl text-muted-foreground">
              My journey in Software Development
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-orange-500/50 p-4">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <CardTitle className="text-2xl group-hover:text-orange-500 transition-colors duration-300">
                      Software Developer Intern
                    </CardTitle>
                    <CardDescription className="text-lg mt-2">
                      CoolCliq • Aligarh, India (Remote)
                    </CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-blue-500/10 text-blue-500 w-fit"
                  >
                    August 2025 - October 2025
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>
                      Developed 25+ enhanced modules for B2B travel bookings, including flights, hotels, packages, and visa processing, reducing processing time by 25%
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>
                      Collaborated as contributor to the TechTrailDMC project, actively participating in feature development and bug fixes
                    </span>
                  </li>
                
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>
                      Integrated dashboards and supplier management features, enabling global reach, margin control, verified partner coordination, and real-time tracking
                    </span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2 pt-4">
                  {[
                    "React.js",
                    "Next.js",
                    "Node.js",
                    "MongoDB",
                    "TypeScript",
                    "Tailwind CSS",
                    "Prisma ORM",
                    "Supabase",
                  ].map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="border-orange-500/30"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-blue-500/50 p-4">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <CardTitle className="text-2xl group-hover:text-blue-500 transition-colors duration-300">
                      Software Developer Intern
                    </CardTitle>
                    <CardDescription className="text-lg mt-2">
                      Temflo Pvt. Ltd. • Aligarh, India (Remote)
                    </CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-orange-500/10 text-orange-500 w-fit"
                  >
                    July 2025 - August 2025
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>
                      Improved UI responsiveness, reducing page load time by 20%
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>
                      Designed and implemented responsive UI adaptable to desktop and mobile devices, improving user retention by 15%
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>
                      Implemented multi-language UI, quick actions, and integration with backend APIs for efficient management
                    </span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2 pt-4">
                  {[
                    "React.js",
                    "TypeScript",
                    "REST APIs",
                    "UI/UX Design",
                    "Responsive Design",
                  ].map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="border-blue-500/30"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
           <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">Featured Projects</h2>
            <p className="text-xl text-muted-foreground">
              A showcase of my recent work and creative solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Invoice Generator Web-App",
                description:
                  "Built an SaaS platform integrating Supabase for seamless data retrieval and middleware access control across 4 pricing tiers, eliminating unauthorized access. Developed GST-compliant invoices with automated tax calculations and PDF generation, reducing errors by 95% and creation time by 60%. Created analytics dashboard with real-time metrics and JWT authentication, optimized for <200ms response time serving 1000+ users.",
                image:
                  "https://plus.unsplash.com/premium_photo-1720032304972-1f1142e73253?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
              {
                title: "Portfolio Website",
                description:
                  "Developed a personal portfolio website showcasing projects, technical skills, and achievements. Integrated dynamic SEO and server-side rendering (SSR), improving page load speed by 30% and boosting SEO ranking. Implemented responsive and modern UI/UX designs, ensuring seamless experience across different devices (like desktop, tablet, mobile).",
                image:
                  "https://assets.awwwards.com/awards/element/2022/05/627be98fa9616400863515.png",
                tags: [
                  "Next.js",
                  "TypeScript",
                  "Firebase",
                  "Tailwind CSS",
                  "SSR",
                  "SEO",
                ],
                link: "https://portfolio-nextjs-blush.vercel.app/",
                github: "https://github.com/rupeshv2121/Portfolio-Nextjs",
              },
              {
                title: "Data Analysis Project",
                description:
                  "Diverse data visualization techniques with charts, plots, and dashboards. Created 5+ charts, plots, and dashboards, improving decision-making efficiency by 30%. Comprehensive analysis using Python data science libraries including Pandas, NumPy, Matplotlib, and Seaborn for insights extraction.",
                image:
                  "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGF0YSUyMEFuYWx5c2lzfGVufDB8fDB8fHww",
                tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
                link: "https://github.com/rupeshv2121/Data_Visualization",
                github: "https://github.com/rupeshv2121/Data_Visualization",
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
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/60 via-yellow-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-4">
                    <Link href={project.link} target="_blank">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="cursor-pointer opacity-90 bg-white/90 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
                      >
                        View Project
                      </Button>
                    </Link>

                     <Link href={project.github} target="_blank">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="cursor-pointer opacity-90 bg-white/90 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
                      >
                        Source Code
                      </Button>
                    </Link>
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
           <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">Skills & Expertise</h2>
            <p className="text-xl text-muted-foreground">
              Technologies and tools I work with
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="h-8 w-8" />,
                title: "Programming Languages",
                skills: [
                  { name: "JavaScript (ES6+)", level: 90 },
                  { name: "TypeScript", level: 70 },
                  { name: "Java", level: 75 },
                  { name: "Python", level: 65 },
                  { name: "C++", level: 90 },
                  { name: "C", level: 80 },
                ],
                color: "orange",
              },
              {
                icon: <Brain className="h-8 w-8" />,
                title: "Frameworks & Libraries",
                skills: [
                  { name: "React.js", level: 90 },
                  { name: "Next.js", level: 85 },
                  { name: "Node.js", level: 90 },
                  { name: "Express.js", level: 90 },
                  { name: "Redux", level: 70 },
                  { name: "Tailwind CSS", level: 95 },
                ],
                color: "blue",
              },
              {
                icon: <BrainCircuitIcon className="h-8 w-8" />,
                title: "Database & Cloud",
                skills: [
                  { name: "MongoDB", level: 85 },
                  { name: "PostgreSQL", level: 75 },
                  { name: "SQL", level: 75 },
                  { name: "Firebase", level: 85 },
                  { name: "Supabase", level: 85 },
                  { name: "WebSockets", level: 70 },
                ],
                color: "green",
              },
              {
                icon: <Palette className="h-8 w-8" />,
                title: "Developer Tools",
                skills: [
                  { name: "Git", level: 90 },
                  { name: "Docker", level: 60 },
                  { name: "Postman", level: 95 },
                  { name: "Linux", level: 50 },
                  { name: "Vercel", level: 85 },
                  { name: "CI/CD Pipelines", level: 50 },
                ],
                color: "yellow",
              },
              {
                icon: <Brain className="h-8 w-8" />,
                title: "Data Science",
                skills: [
                  { name: "Pandas", level: 70 },
                  { name: "NumPy", level: 70 },
                  { name: "Matplotlib", level: 50 },
                  { name: "Seaborn", level: 50 },
                  { name: "Data Visualization", level: 60 },
                  { name: "Data Analysis", level: 60 },
                ],
                color: "purple",
              },
              {
                icon: <Code className="h-8 w-8" />,
                title: "Core Concepts",
                skills: [
                  { name: "REST APIs", level: 90 },
                  { name: "OOP", level: 85 },
                  { name: "DSA", level: 85 },
                  { name: "System Design", level: 60 },
                  { name: "DevOps", level: 50 },
                  { name: "Problem Solving", level: 85 },
                ],
                color: "pink",
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
                      : category.color === "purple"
                      ? "rgb(168, 85, 247, 0.5)"
                      : category.color === "pink"
                      ? "rgb(236, 72, 153, 0.5)"
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
                        : category.color === "purple"
                        ? "bg-purple-500/10 text-purple-500 group-hover:bg-purple-500"
                        : category.color === "pink"
                        ? "bg-pink-500/10 text-pink-500 group-hover:bg-pink-500"
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
                        : category.color === "purple"
                        ? "group-hover:text-purple-500"
                        : category.color === "pink"
                        ? "group-hover:text-pink-500"
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
                        key={skill.name}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${skillIndex * 0.1}s` }}
                      >
                        <span className="text-sm">{skill.name}</span>
                        <div className="w-24 h-2 bg-gray-900 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${skill.level}%`,
                              background: `linear-gradient(to right, ${
                                category.color === "blue"
                                  ? "#3b82f6"
                                  : category.color === "yellow"
                                  ? "#eab308"
                                  : category.color === "green"
                                  ? "#22c55e"
                                  : category.color === "purple"
                                  ? "#a855f7"
                                  : category.color === "pink"
                                  ? "#ec4899"
                                  : "#f97316"
                              }, ${
                                category.color === "blue"
                                  ? "#60a5fa"
                                  : category.color === "yellow"
                                  ? "#facc15"
                                  : category.color === "green"
                                  ? "#4ade80"
                                  : category.color === "purple"
                                  ? "#c084fc"
                                  : category.color === "pink"
                                  ? "#f472b6"
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

      {/* Certifications & Achievements Section */}
      <section
        id="certifications"
        className="py-20 px-6 bg-gradient-to-br from-orange-500/5 via-yellow-500/5 to-blue-500/5"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
              Certifications & Achievements
            </h2>
            <p className="text-xl text-muted-foreground">
              Professional certifications and coding achievements
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Certifications */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-6 text-orange-500">
                Certifications
              </h3>

              <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-blue-500/50 py-2">
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-blue-500 transition-colors duration-300">
                    Full Stack Web Development
                  </CardTitle>
                  <CardDescription>Apna College</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge
                    variant="secondary"
                    className="bg-blue-500/10 text-blue-500"
                  >
                    Completed
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-6 text-orange-500">
                Achievements & Leadership
              </h3>

              <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-yellow-500/50 py-2">
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-yellow-500 transition-colors duration-300">
                    <div className="flex justify-between gap-2">
                      <p>Google Student Ambassador</p>
                      <Badge
                        variant="secondary"
                        className="bg-yellow-500/10 text-yellow-500"
                      >
                        August 2025 - Dec 2025
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>Google Gemini AI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Selected as a Google Student Ambassador to represent Google Gemini AI on campus
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-blue-500/50 py-2">
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-blue-500 transition-colors duration-300">
                    <div className="flex justify-between gap-2">
                      <p>IGNITE Hackathon Finalist</p>
                      <Badge
                        variant="secondary"
                        className="bg-blue-500/10 text-blue-500"
                      >
                        2025
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>StartLab Capital</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Finalist at IGNITE Hackathon organized by StartLab Capital (Ongoing)
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-orange-500/50 py-2">
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-orange-500 transition-colors duration-300">
                    <div className="flex justify-between gap-2">
                      <p>LeetCode & GeeksForGeeks</p>
                      <Badge
                        variant="secondary"
                        className="bg-orange-500/10 text-orange-500"
                      >
                        Active
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>Competitive Programming</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Solved 200+ DSA problems on LeetCode and GeeksForGeeks
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-xl text-muted-foreground mb-4">
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
                    disabled={isSending}
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 hover:from-blue-500 hover:via-yellow-500 hover:to-orange-500 transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSending ? (
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      "Send Message"
                    )}
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
            <Link href="https://github.com/rupeshv2121" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="border-1 border-white hover:bg-transparent hover:text-orange-500 transition-colors duration-300"
              >
                <Github className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/rupeshvarshney/" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="border-1 border-white hover:border-blue-500 hover:text-blue-500  transition-colors duration-300"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="mailto:rupeshvarshney7@gmail.com">
              <Button
                variant="outline"
                size="sm"
                className=" border-1 border-white hover:text-yellow-500 transition-colors duration-300"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
