"use client";

import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/profile";
import { CheckCircle2, Flag, Target, Wrench } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const accentClasses = {
  orange: {
    text: "text-orange-500",
    border: "border-orange-500/40",
    ring: "border-orange-500/25",
    dot: "bg-orange-500",
    glow: "shadow-[0_0_40px_rgba(249,115,22,0.10)]",
    chip: "border-orange-500/30",
    hover: "hover:border-orange-500/50",
  },
  blue: {
    text: "text-blue-500",
    border: "border-blue-500/40",
    ring: "border-blue-500/25",
    dot: "bg-blue-500",
    glow: "shadow-[0_0_40px_rgba(59,130,246,0.10)]",
    chip: "border-blue-500/30",
    hover: "hover:border-blue-500/50",
  },
} as const;

/** Reveals the run steps once the card scrolls into view. */
function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}

export default function AgentRunTimeline() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {experience.map((run) => (
        <RunCard key={run.id} run={run} />
      ))}
    </div>
  );
}

function RunCard({ run }: { run: (typeof experience)[number] }) {
  const accent = accentClasses[run.accent];
  const { ref, revealed } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`rounded-xl border-2 ${accent.ring} ${accent.hover} bg-card/60 backdrop-blur-sm ${accent.glow} transition-all duration-500 hover:-translate-y-1`}
    >
      {/* Run header */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/60 px-5 py-3">
        <span className={`h-2 w-2 rounded-full ${accent.dot} animate-pulse`} />
        <span className="text-xs text-muted-foreground">run</span>
        <span className={`text-sm font-semibold ${accent.text}`}>
          {run.id}
        </span>
        <Badge
          variant="secondary"
          className="ml-auto bg-green-500/10 text-green-500"
        >
          completed
        </Badge>
      </div>

      <div className="px-5 py-5 space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className={`text-2xl font-semibold ${accent.text}`}>
              {run.title}
            </h3>
            <p className="text-muted-foreground">
              {run.company} • {run.location}
            </p>
          </div>
          <Badge variant="outline" className={accent.chip}>
            {run.period}
          </Badge>
        </div>

        {/* Objective */}
        <div className="flex items-start gap-2 rounded-md border border-border/60 bg-background/40 px-3 py-2">
          <Target className={`mt-0.5 h-4 w-4 shrink-0 ${accent.text}`} />
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground/80">objective: </span>
            {run.objective}
          </p>
        </div>

        {/* Steps */}
        <ol className="relative space-y-4 pl-6">
          <span className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-orange-500/40 via-border to-transparent" />
          {run.steps.map((step, i) => (
            <li
              key={step.tool + i}
              className={`relative transition-all duration-500 ${
                revealed
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: `${i * 140}ms` }}
            >
              <span
                className={`absolute -left-6 top-1.5 h-3.5 w-3.5 rounded-full border-2 ${accent.border} bg-background`}
              />
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Wrench className="h-3.5 w-3.5 text-blue-400" />
                <span className="text-blue-400">{step.tool}</span>
                <span className="flex items-center gap-1 text-green-500">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {step.result}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{step.action}</p>
            </li>
          ))}
        </ol>

        {/* Stack */}
        <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
          <Flag className={`h-3.5 w-3.5 ${accent.text}`} />
          {run.stack.map((tech) => (
            <Badge key={tech} variant="outline" className={accent.chip}>
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
