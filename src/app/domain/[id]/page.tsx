"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getDomain } from "@/lib/exam-data";
import type { TaskStatement } from "@/lib/exam-data";
import { getQuestionsByDomain } from "@/lib/questions";
import { Quiz } from "@/components/Quiz";

type StudyStatus = "not-yet" | "studying" | "confident";

const statusConfig: Record<
  StudyStatus,
  { label: string; color: string; bg: string }
> = {
  "not-yet": {
    label: "Not Yet",
    color: "text-warm-gray",
    bg: "bg-warm-border-light",
  },
  studying: {
    label: "Studying",
    color: "text-olive",
    bg: "bg-olive/10",
  },
  confident: {
    label: "Confident",
    color: "text-muted-green",
    bg: "bg-muted-green-light",
  },
};

function StatusButton({
  status,
  onClick,
}: {
  status: StudyStatus;
  onClick: () => void;
}) {
  const config = statusConfig[status];
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-3 py-1 text-xs font-medium ${config.bg} ${config.color} transition-colors hover:opacity-80`}
    >
      {config.label}
    </button>
  );
}

function TaskStatementCard({ task }: { task: TaskStatement }) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<StudyStatus>("not-yet");

  const cycleStatus = () => {
    const order: StudyStatus[] = ["not-yet", "studying", "confident"];
    const next = order[(order.indexOf(status) + 1) % order.length];
    setStatus(next);
  };

  return (
    <div className="rounded-md border border-warm-border bg-card transition-colors hover:border-olive-muted">
      <div className="flex items-start justify-between gap-4 p-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-1 text-left"
        >
          <div className="mb-1 text-xs font-medium text-warm-gray">
            Task {task.id}
          </div>
          <div className="text-sm font-semibold leading-snug text-foreground">
            {task.title}
          </div>
        </button>
        <StatusButton status={status} onClick={cycleStatus} />
      </div>

      {expanded && (
        <div className="border-t border-warm-border px-6 py-5">
          <div className="mb-5">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-warm-gray-light">
              Knowledge of
            </h4>
            <ul className="space-y-1.5">
              {task.knowledge.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-warm-border" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-warm-gray-light">
              Skills in
            </h4>
            <ul className="space-y-1.5">
              {task.skills.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-olive-muted" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DomainPage() {
  const params = useParams();
  const domainId = Number(params.id);
  const domain = getDomain(domainId);

  if (!domain) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h1 className="mb-4 font-serif text-xl font-bold text-foreground">
          Domain not found
        </h1>
        <Link
          href="/"
          className="text-sm text-olive hover:text-olive-light"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:py-20">
      {/* Header */}
      <div className="mb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs text-warm-gray hover:text-foreground"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M8.5 3.5L5 7l3.5 3.5" />
          </svg>
          All Domains
        </Link>
      </div>

      <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-1 text-xs font-medium text-warm-gray">
            Domain {domain.id}
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            {domain.name}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-olive px-3 py-1 text-sm font-semibold text-cream">
            {domain.weight}% of exam
          </span>
          <span className="rounded-md bg-warm-border-light px-3 py-1 text-sm text-warm-gray">
            {domain.taskStatements.length} tasks
          </span>
        </div>
      </div>

      {/* Scenarios */}
      {domain.scenarios.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <span className="text-xs text-warm-gray leading-6">Scenarios:</span>
          {domain.scenarios.map((s) => (
            <span
              key={s}
              className="rounded-md border border-olive-muted/30 bg-cream-dark px-2.5 py-1 text-xs text-olive-light"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Task Statements */}
      <div className="mb-16">
        <h2 className="mb-5 text-xs font-semibold uppercase tracking-wider text-warm-gray-light">
          Task Statements
        </h2>
        <div className="space-y-3">
          {domain.taskStatements.map((task) => (
            <TaskStatementCard key={task.id} task={task} />
          ))}
        </div>
      </div>

      {/* Practice Questions */}
      {(() => {
        const domainQuestions = getQuestionsByDomain(domainId);
        return domainQuestions.length > 0 ? (
          <div>
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-wider text-warm-gray-light">
              Practice Questions
            </h2>
            <Quiz questions={domainQuestions} />
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-warm-border bg-card p-10 text-center">
            <div className="mb-2 font-serif text-sm font-semibold text-foreground">
              Practice Questions
            </div>
            <p className="text-xs text-warm-gray">
              Scenario-based practice questions for this domain are coming soon.
            </p>
          </div>
        );
      })()}
    </div>
  );
}
