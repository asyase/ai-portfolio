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

/** Horizontal on desktop, vertical on mobile. Built from `project.workflow`. */
export function FlowDiagram({ nodes, title }: { nodes: WorkflowNode[]; title: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-bg-raised">
      <div className="p-5 md:p-8">
        <ol className="flex flex-col items-stretch gap-0 xl:flex-row xl:items-stretch" aria-label={`${title} workflow`}>
          {nodes.map((node, i) => {
            const NodeIcon = kindIcon[node.kind];
            const isAi = node.kind === "ai";
            return (
              <li key={node.label} className="flex flex-col items-stretch xl:min-w-0 xl:flex-1 xl:flex-row xl:items-center">
                <div
                  className={cn(
                    "relative rounded-xl border p-4 xl:h-full xl:min-h-[8.5rem] xl:w-full xl:min-w-0",
                    isAi ? "border-accent-line bg-accent-soft" : "border-line-strong bg-surface",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <NodeIcon className={cn("size-4", isAi ? "text-accent" : "text-fg-muted")} aria-hidden="true" />
                    <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.12em] text-fg-subtle">{kindLabel[node.kind]}</span>
                  </div>
                  <p className={cn("mt-4 text-[15px] font-medium leading-snug", isAi ? "text-accent" : "text-fg")}>{node.label}</p>
                  {node.detail && <p className="mt-1 font-mono text-[11px] text-fg-subtle">{node.detail}</p>}
                </div>
                {i < nodes.length - 1 && (
                  <span className="flex items-center justify-center py-2 xl:px-1.5 xl:py-0" aria-hidden="true">
                    <span className="h-5 w-px bg-line-strong xl:h-px xl:w-3" />
                    <span className="sr-only">then</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      <figcaption className="border-t border-line px-5 py-3 font-mono text-[11px] text-fg-subtle md:px-8">
        Simplified data flow · diagram, not a screenshot
      </figcaption>
    </figure>
  );
}
