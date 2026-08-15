"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Project, projects } from "@/data/projects";
import { Bot, ExternalLink, Github, Terminal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const PAGE_SIZE = 3;

type Filter = "all" | "agentic";

export default function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered =
    filter === "agentic" ? projects.filter((p) => p.agentic) : projects;
  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;
  const agenticCount = projects.filter((p) => p.agentic).length;

  const setFilterAndReset = (next: Filter) => {
    setFilter(next);
    setVisible(PAGE_SIZE);
  };

  return (
    <>
      {/* Filter bar, styled like a tool selector */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-muted-foreground">filter:</span>
        <button
          onClick={() => setFilterAndReset("all")}
          className={`rounded-full border px-3 py-1 transition-all duration-300 ${
            filter === "all"
              ? "border-orange-500 bg-orange-500/10 text-orange-400"
              : "border-border text-muted-foreground hover:border-orange-500/50"
          }`}
        >
          all ({projects.length})
        </button>
        <button
          onClick={() => setFilterAndReset("agentic")}
          className={`rounded-full border px-3 py-1 transition-all duration-300 ${
            filter === "agentic"
              ? "border-purple-500 bg-purple-500/10 text-purple-400"
              : "border-border text-muted-foreground hover:border-purple-500/50"
          }`}
        >
          agent-based ({agenticCount})
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() =>
              setVisible((current) =>
                Math.min(current + PAGE_SIZE, filtered.length)
              )
            }
            className="border-2 border-orange-400/80 bg-orange-500/10 text-orange-300 transition-all duration-300 hover:bg-orange-500 hover:text-white hover:shadow-[0_0_24px_rgba(251,146,60,0.35)]"
          >
            Load {Math.min(PAGE_SIZE, filtered.length - visible)} more
          </Button>
        </div>
      )}
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const agentic = Boolean(project.agentic);

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl border-2 bg-card/60 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 ${
        agentic
          ? "border-purple-500/30 hover:border-purple-500/60 hover:shadow-[0_0_40px_rgba(168,85,247,0.18)]"
          : "border-border hover:border-orange-500/50 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)]"
      }`}
    >
      {/* Tool-call style header */}
      <div className="flex items-center gap-2 border-b border-border/60 bg-background/50 px-3 py-2 text-[11px]">
        {agentic ? (
          <Bot className="h-3.5 w-3.5 shrink-0 text-purple-400" />
        ) : (
          <Terminal className="h-3.5 w-3.5 shrink-0 text-orange-400" />
        )}
        <span className={agentic ? "text-purple-400" : "text-orange-400"}>
          {agentic ? "agent_workflow" : "build_project"}
        </span>
        <span className="ml-auto text-green-500">→ shipped</span>
      </div>

      <div className="relative overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-end justify-between gap-2 bg-gradient-to-t from-background via-background/40 to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <Link href={project.link} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              variant="secondary"
              className="cursor-pointer bg-white/90 text-orange-600 transition-all duration-300 hover:bg-orange-500 hover:text-white"
            >
              <ExternalLink className="mr-1 h-3.5 w-3.5" />
              Live
            </Button>
          </Link>
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                variant="secondary"
                className="cursor-pointer bg-white/90 text-orange-600 transition-all duration-300 hover:bg-orange-500 hover:text-white"
              >
                <Github className="mr-1 h-3.5 w-3.5" />
                Source
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3
          className={`text-lg font-semibold transition-colors duration-300 ${
            agentic
              ? "group-hover:text-purple-400"
              : "group-hover:text-orange-500"
          }`}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-gradient-to-r from-orange-500/10 to-blue-500/10 text-xs transition-all duration-300 hover:from-orange-500/20 hover:to-blue-500/20"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
