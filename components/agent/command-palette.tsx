"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import {
  Award,
  Bot,
  Briefcase,
  Download,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  MessageCircle,
  Terminal,
  User,
} from "lucide-react";
import { useEffect } from "react";

const sections = [
  { id: "about", label: "About", icon: User },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "skills", label: "Skills", icon: Bot },
  { id: "certifications", label: "Achievements", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function CommandPalette({
  open,
  onOpenChange,
  onNavigate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (sectionId: string) => void;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  const run = (fn: () => void) => {
    onOpenChange(false);
    // let the dialog close before scrolling so focus restore doesn't fight it
    setTimeout(fn, 80);
  };

  const openExternal = (url: string) => window.open(url, "_blank", "noopener");

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Agent command palette"
      description="Jump to a section, open a project, or run a contact action."
      className="border-2 border-orange-500/30 shadow-[0_0_60px_rgba(249,115,22,0.15)] [&_[cmdk-item][data-selected=true]]:bg-orange-500/15 [&_[cmdk-item][data-selected=true]]:text-orange-400"
    >
      {/* The theme's `accent` token is amber, which is unreadable behind the
          item text — override the selected state with a subtle orange tint. */}
      <CommandInput placeholder="Type a command or search projects…" />
      <CommandList className="max-h-[380px]">
        <CommandEmpty>No matching command.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {sections.map(({ id, label, icon: Icon }) => (
            <CommandItem
              key={id}
              value={`goto ${label}`}
              onSelect={() => run(() => onNavigate(id))}
            >
              <Icon className="text-orange-500" />
              <span>Go to {label}</span>
              <CommandShortcut>goto</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Open project">
          {projects.map((project) => (
            <CommandItem
              key={project.title}
              value={`open ${project.title} ${project.tags.join(" ")}`}
              onSelect={() => run(() => openExternal(project.link))}
            >
              {project.agentic ? (
                <Bot className="text-purple-400" />
              ) : (
                <Terminal className="text-blue-400" />
              )}
              <span className="truncate">{project.title}</span>
              <CommandShortcut>open</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            value="download resume cv"
            onSelect={() => run(() => openExternal(profile.resume))}
          >
            <Download className="text-orange-500" />
            <span>Download résumé</span>
            <CommandShortcut>run</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="email contact hire"
            onSelect={() =>
              run(() => {
                window.location.href = `mailto:${profile.email}?subject=Hiring%20Opportunity`;
              })
            }
          >
            <Mail className="text-yellow-500" />
            <span>Email {profile.email}</span>
            <CommandShortcut>run</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="github source code"
            onSelect={() => run(() => openExternal(profile.github))}
          >
            <Github />
            <span>GitHub</span>
            <CommandShortcut>open</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="linkedin"
            onSelect={() => run(() => openExternal(profile.linkedin))}
          >
            <Linkedin className="text-blue-500" />
            <span>LinkedIn</span>
            <CommandShortcut>open</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="whatsapp chat"
            onSelect={() => run(() => openExternal(profile.whatsapp))}
          >
            <MessageCircle className="text-green-500" />
            <span>WhatsApp</span>
            <CommandShortcut>open</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
