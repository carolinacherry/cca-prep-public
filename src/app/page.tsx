import Link from "next/link";
import { domains, scenarios } from "@/lib/exam-data";

function DomainCard({ domain }: { domain: (typeof domains)[number] }) {
  return (
    <Link
      href={`/domain/${domain.id}`}
      className="group rounded-md border border-warm-border bg-card p-6 transition-colors hover:border-olive-muted"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium text-warm-gray">
          Domain {domain.id}
        </span>
        <span className="rounded-md bg-olive px-2.5 py-0.5 text-xs font-semibold text-cream">
          {domain.weight}%
        </span>
      </div>
      <h3 className="mb-4 font-serif text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-olive">
        {domain.name}
      </h3>
      <div className="mb-3 h-1 overflow-hidden rounded-full bg-warm-border">
        <div
          className="h-full rounded-full bg-olive-muted"
          style={{ width: `${domain.weight}%` }}
        />
      </div>
      <div className="text-xs text-warm-gray">
        {domain.taskStatements.length} task statements
      </div>
    </Link>
  );
}

function ScenarioCard({ name, index }: { name: string; index: number }) {
  const labels = ["S1", "S2", "S3", "S4", "S5", "S6"];
  return (
    <div className="rounded-md border border-warm-border bg-card px-4 py-3 transition-colors hover:border-olive-muted">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-cream-dark text-[10px] font-bold text-warm-gray">
          {labels[index]}
        </span>
        <span className="text-sm text-foreground">{name}</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
      {/* Hero */}
      <div className="mb-16">
        <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
          CCA Prep
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-warm-gray">
          Interactive study guide for the Claude Certified Architect —
          Foundations certification. Master the five domains, practice with
          scenario-based questions, and track your progress.
        </p>
      </div>

      {/* Exam Overview */}
      <div className="mb-16 rounded-md border border-warm-border bg-card p-8">
        <h2 className="mb-5 text-xs font-semibold uppercase tracking-wider text-warm-gray-light">
          Exam Overview
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div>
            <div className="font-serif text-3xl font-bold text-foreground">60</div>
            <div className="text-xs text-warm-gray">Questions</div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-foreground">120</div>
            <div className="text-xs text-warm-gray">Minutes</div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-olive">720</div>
            <div className="text-xs text-warm-gray">Passing Score</div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-foreground">5</div>
            <div className="text-xs text-warm-gray">Domains</div>
          </div>
        </div>
        <div className="mt-5 border-t border-warm-border pt-5 text-sm leading-relaxed text-warm-gray">
          Scenario-based multiple-choice. Each exam draws 4 of 6 scenarios.
          Questions test applied knowledge across all five domains.
        </div>
      </div>

      {/* Domains */}
      <div className="mb-16">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-wider text-warm-gray-light">
          Domains
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain) => (
            <DomainCard key={domain.id} domain={domain} />
          ))}
        </div>
      </div>

      {/* Scenarios */}
      <div>
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-wider text-warm-gray-light">
          Exam Scenarios
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((scenario, i) => (
            <ScenarioCard key={scenario} name={scenario} index={i} />
          ))}
        </div>
        <p className="mt-4 text-xs text-warm-gray">
          Each exam session selects 4 of 6 scenarios. Questions are framed
          within these applied contexts.
        </p>
      </div>
    </div>
  );
}
