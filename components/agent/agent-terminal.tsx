"use client";

import { achievements, education, experience, profile, skillGroups } from "@/data/profile";
import { projects } from "@/data/projects";
import { ChevronRight, CornerDownLeft, Loader2, Sparkles, Wrench } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Transcript model                                                    */
/* ------------------------------------------------------------------ */

type Line =
  | { kind: "prompt"; text: string }
  | { kind: "thinking"; text: string }
  | { kind: "tool"; name: string; args: string; result: string }
  | { kind: "text"; text: string }
  | { kind: "bullet"; text: string }
  | { kind: "chips"; items: string[] }
  | { kind: "action"; label: string; href: string }
  | { kind: "error"; text: string };

type Command = {
  name: string;
  hint: string;
  /** extra words that should also resolve to this command */
  aliases?: string[];
  run: () => Line[];
};

const list = (items: string[]): Line[] =>
  items.map((text) => ({ kind: "bullet", text }));

/* ------------------------------------------------------------------ */
/* Command registry — deterministic, no model behind it                */
/* ------------------------------------------------------------------ */

function buildCommands(navigate: (id: string) => void): Command[] {
  void navigate;
  return [
    {
      name: "whoami",
      hint: "who is this agent",
      aliases: ["about", "intro", "hello", "hi"],
      run: () => [
        { kind: "thinking", text: "resolving identity from résumé context…" },
        {
          kind: "tool",
          name: "read_profile",
          args: "fields=[name, role, status]",
          result: "1 record",
        },
        { kind: "text", text: `${profile.name} — ${profile.role}, ${profile.location}.` },
        { kind: "text", text: profile.summary[0] },
        { kind: "chips", items: ["React", "Next.js", "Node.js", "TypeScript", "LangGraph", "C++"] },
        { kind: "action", label: "Download résumé", href: profile.resume },
      ],
    },
    {
      name: "experience",
      hint: "internship runs",
      aliases: ["work", "internship", "jobs", "coolcliq", "temflo"],
      run: () => [
        { kind: "thinking", text: "loading completed agent runs…" },
        {
          kind: "tool",
          name: "query_experience",
          args: "order=recent",
          result: `${experience.length} runs`,
        },
        ...experience.flatMap((role): Line[] => [
          {
            kind: "text",
            text: `${role.title} · ${role.company} — ${role.period}`,
          },
          ...list(role.steps.map((s) => `${s.action} (${s.result})`)),
        ]),
      ],
    },
    {
      name: "projects",
      hint: "list shipped work",
      aliases: ["work samples", "build", "portfolio"],
      run: () => [
        { kind: "thinking", text: "scanning project index…" },
        {
          kind: "tool",
          name: "list_projects",
          args: "limit=5, sort=featured",
          result: `${projects.length} projects (${projects.filter((p) => p.agentic).length} agent-based)`,
        },
        ...list(
          projects
            .slice(0, 5)
            .map((p) => `${p.agentic ? "◆ " : "· "}${p.title}`)
        ),
        { kind: "text", text: "Press ⌘K and type a project name to open it." },
      ],
    },
    {
      name: "skills",
      hint: "stack breakdown",
      aliases: ["stack", "tech", "languages"],
      run: () => [
        { kind: "thinking", text: "aggregating capability matrix…" },
        {
          kind: "tool",
          name: "get_skills",
          args: "group=all",
          result: `${skillGroups.length} groups`,
        },
        ...skillGroups.map((group): Line => ({
          kind: "bullet",
          text: `${group.title}: ${group.skills.map((s) => s.name).join(", ")}`,
        })),
      ],
    },
    {
      name: "education",
      hint: "academic record",
      aliases: ["cgpa", "college", "amu", "study"],
      run: () => [
        { kind: "thinking", text: "reading academic record…" },
        {
          kind: "tool",
          name: "get_education",
          args: "",
          result: `${education.length} entries`,
        },
        ...list(
          education.map((e) => `${e.degree} — ${e.institute} · ${e.score} · ${e.period}`)
        ),
      ],
    },
    {
      name: "achievements",
      hint: "hackathons & honours",
      aliases: ["awards", "hackathon", "leetcode", "dsa"],
      run: () => [
        { kind: "thinking", text: "collecting signals…" },
        {
          kind: "tool",
          name: "get_achievements",
          args: "",
          result: `${achievements.length} entries`,
        },
        ...list(achievements.map((a) => `${a.title} — ${a.org} (${a.badge})`)),
      ],
    },
    {
      name: "contact",
      hint: "reach out",
      aliases: ["email", "hire", "reach", "connect"],
      run: () => [
        { kind: "thinking", text: "opening a channel…" },
        {
          kind: "tool",
          name: "get_contact",
          args: "channels=[email, linkedin, github]",
          result: "ok",
        },
        { kind: "text", text: `${profile.email} · ${profile.phone}` },
        { kind: "text", text: `Status: ${profile.status}.` },
        {
          kind: "action",
          label: "Send an email",
          href: `mailto:${profile.email}?subject=Hiring%20Opportunity`,
        },
      ],
    },
    {
      name: "resume",
      hint: "download the pdf",
      aliases: ["cv", "download"],
      run: () => [
        { kind: "thinking", text: "fetching latest résumé…" },
        { kind: "tool", name: "fetch_resume", args: "format=pdf", result: "ready" },
        { kind: "action", label: "Open résumé", href: profile.resume },
      ],
    },
    {
      name: "help",
      hint: "list commands",
      aliases: ["?", "commands"],
      run: () => [
        { kind: "text", text: "Available commands:" },
        ...list([
          "whoami — identity and headline stack",
          "experience — internship runs, step by step",
          "projects — shipped work, agent-based first",
          "skills — capability matrix",
          "education — academic record",
          "achievements — hackathons and honours",
          "contact — how to reach me",
          "resume — download the PDF",
          "clear — reset this transcript",
        ]),
      ],
    },
  ];
}

/* ------------------------------------------------------------------ */
/* Terminal                                                            */
/* ------------------------------------------------------------------ */

export default function AgentTerminal({
  onNavigate,
}: {
  onNavigate: (sectionId: string) => void;
}) {
  const [lines, setLines] = useState<Line[]>([]);
  const [queue, setQueue] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const commands = useRef(buildCommands(onNavigate)).current;

  /** Reveal queued lines one at a time so it reads like a live agent run. */
  useEffect(() => {
    if (queue.length === 0) {
      setBusy(false);
      return;
    }
    setBusy(true);
    const [next, ...rest] = queue;
    const delay = next.kind === "thinking" ? 520 : next.kind === "tool" ? 380 : 180;
    const timer = setTimeout(() => {
      setLines((prev) => [...prev, next]);
      setQueue(rest);
    }, delay);
    return () => clearTimeout(timer);
  }, [queue]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  const submit = useCallback(
    (raw: string) => {
      const query = raw.trim().toLowerCase();
      if (!query || busy) return;
      setInput("");

      if (query === "clear" || query === "cls") {
        setLines([]);
        setQueue([]);
        return;
      }

      const match =
        commands.find((c) => c.name === query) ??
        commands.find(
          (c) =>
            c.aliases?.some((a) => query.includes(a)) || query.includes(c.name)
        );

      setLines((prev) => [...prev, { kind: "prompt", text: raw.trim() }]);
      setQueue(
        match
          ? match.run()
          : [
              {
                kind: "error",
                text: `No route for "${raw.trim()}". Try \`help\` for the command list, or ⌘K to search everything.`,
              },
            ]
      );
    },
    [busy, commands]
  );

  // Boot sequence on first paint.
  useEffect(() => {
    setQueue([
      { kind: "thinking", text: "booting portfolio agent…" },
      {
        kind: "tool",
        name: "load_context",
        args: "résumé, projects, skills",
        result: "context ready",
      },
      { kind: "text", text: `Hi, I'm ${profile.name}. ${profile.role}, ${profile.status}.` },
      { kind: "text", text: "Ask me something below, or press ⌘K to search." },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const suggestions = ["whoami", "experience", "projects", "skills", "contact"];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="rounded-xl border-2 border-orange-500/30 bg-card/70 backdrop-blur-md shadow-[0_0_60px_rgba(249,115,22,0.12)] overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border/60 bg-background/60 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-muted-foreground truncate">
            {profile.handle} — agent session
          </span>
          <span className="ml-auto hidden sm:flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            {busy ? "running" : "idle"}
          </span>
        </div>

        {/* Transcript */}
        <div
          ref={scrollRef}
          className="h-[300px] sm:h-[340px] overflow-y-auto px-4 py-4 text-left text-sm space-y-2 scroll-smooth"
        >
          {lines.map((line, i) => (
            <TranscriptLine key={i} line={line} />
          ))}
          {busy && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-orange-500" />
              <span className="text-xs">working…</span>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
          className="flex items-center gap-2 border-t border-border/60 bg-background/60 px-4 py-3"
        >
          <ChevronRight className="h-4 w-4 shrink-0 text-orange-500" />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="try: projects"
            aria-label="Ask the portfolio agent"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Run command"
            className="rounded-md border border-orange-500/40 p-1.5 text-orange-500 transition-colors hover:bg-orange-500 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-orange-500"
          >
            <CornerDownLeft className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>

      {/* Suggestion chips */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => submit(s)}
            disabled={busy}
            className="rounded-full border border-orange-500/30 px-3 py-1 text-xs text-muted-foreground transition-all duration-300 hover:border-orange-500 hover:text-orange-500 disabled:opacity-40"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function TranscriptLine({ line }: { line: Line }) {
  switch (line.kind) {
    case "prompt":
      return (
        <div className="flex items-start gap-2 pt-2">
          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
          <span className="text-foreground">{line.text}</span>
        </div>
      );
    case "thinking":
      return (
        <div className="flex items-start gap-2 text-muted-foreground italic">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-purple-400" />
          <span className="text-xs">{line.text}</span>
        </div>
      );
    case "tool":
      return (
        <div className="flex flex-wrap items-center gap-2 rounded-md border border-blue-500/25 bg-blue-500/5 px-2.5 py-1.5 text-xs">
          <Wrench className="h-3.5 w-3.5 shrink-0 text-blue-400" />
          <span className="text-blue-400">{line.name}</span>
          {line.args && (
            <span className="text-muted-foreground">({line.args})</span>
          )}
          <span className="ml-auto text-green-500">→ {line.result}</span>
        </div>
      );
    case "bullet":
      return (
        <div className="flex items-start gap-2 pl-1 text-muted-foreground">
          <span className="mt-0.5 text-orange-500">•</span>
          <span>{line.text}</span>
        </div>
      );
    case "chips":
      return (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {line.items.map((item) => (
            <span
              key={item}
              className="rounded border border-orange-500/25 bg-orange-500/5 px-2 py-0.5 text-xs text-orange-400"
            >
              {item}
            </span>
          ))}
        </div>
      );
    case "action":
      return (
        <a
          href={line.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-orange-500/40 px-2.5 py-1 text-xs text-orange-500 transition-colors hover:bg-orange-500 hover:text-white"
        >
          {line.label} ↗
        </a>
      );
    case "error":
      return <div className="text-xs text-red-400">{line.text}</div>;
    case "text":
    default:
      return <div className="text-foreground/90">{line.text}</div>;
  }
}
