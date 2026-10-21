import { Bot, Database, Inbox, Send, Settings2, Zap } from "lucide-react";
import type { WorkflowNode, WorkflowNodeKind } from "@/data/projects";
import { cn } from "@/lib/utils";

const kindIcon: Record<WorkflowNodeKind, React.ComponentType<{ className?: string }>> = {
  input: Inbox,
  trigger: Zap,
  ai: Bot,
  process: Settings2,
  storage: Database,
  output: Send,
};

const kindLabel: Record<WorkflowNodeKind, string> = {
  input: "Input",
  trigger: "Trigger",
  ai: "AI step",
  process: "Processing",
  storage: "Storage",
  output: "Output",
};

/** Numbered steps in a grid (1, 2 or 3 per row), so labels never get squeezed. Built from `project.workflow`. */
export function FlowDiagram({ nodes, title }: { nodes: WorkflowNode[]; title: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-bg-raised">
      <div className="p-5 md:p-8">
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label={`${title} workflow`}>
          {nodes.map((node, i) => {
            const NodeIcon = kindIcon[node.kind];
            const isAi = node.kind === "ai";
            return (
              <li
                key={node.label}
                className={cn(
                  "relative min-w-0 rounded-xl border p-4",
                  isAi ? "border-accent-line bg-accent-soft" : "border-line-strong bg-surface",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                    <NodeIcon className={cn("size-4", isAi ? "text-accent" : "text-fg-muted")} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">{kindLabel[node.kind]}</span>
                </div>
                <p className={cn("mt-3 text-[15px] font-medium leading-snug", isAi ? "text-accent" : "text-fg")}>{node.label}</p>
                {node.detail && <p className="mt-1 font-mono text-[11px] leading-relaxed text-fg-subtle">{node.detail}</p>}
                {i < nodes.length - 1 && <span className="sr-only">then</span>}
              </li>
            );
          })}
        </ol>
      </div>
      <figcaption className="border-t border-line px-5 py-3 font-mono text-[11px] text-fg-subtle md:px-8">
        Simplified data flow, read in step order · diagram, not a screenshot
      </figcaption>
    </figure>
  );
}
