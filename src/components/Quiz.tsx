"use client";

import { useState, useMemo } from "react";
import type { Question } from "@/lib/questions";

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="mb-10">
      <div className="mb-2 flex items-center justify-between text-xs text-warm-gray">
        <span>
          Question {current + 1} of {total}
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-1 w-full rounded-full bg-warm-border">
        <div
          className="h-1 rounded-full bg-olive transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function ScenarioBadge({ scenario }: { scenario: string }) {
  return (
    <div className="mb-8 rounded-md border border-olive/20 bg-olive/5 px-5 py-4">
      <span className="text-xs font-medium uppercase tracking-wider text-olive-muted">
        Scenario
      </span>
      <div className="mt-1 text-sm font-semibold text-foreground">
        {scenario}
      </div>
    </div>
  );
}

function OptionCard({
  option,
  selected,
  answered,
  isCorrect,
  isSelected,
  onClick,
}: {
  option: { label: string; text: string };
  selected: string | null;
  answered: boolean;
  isCorrect: boolean;
  isSelected: boolean;
  onClick: () => void;
}) {
  let borderClass = "border-warm-border hover:border-olive-muted";
  let bgClass = "bg-card";

  if (answered) {
    if (isCorrect) {
      borderClass = "border-muted-green";
      bgClass = "bg-muted-green-light";
    } else if (isSelected) {
      borderClass = "border-muted-red";
      bgClass = "bg-muted-red-light";
    } else {
      borderClass = "border-warm-border";
      bgClass = "bg-card";
    }
  } else if (isSelected) {
    borderClass = "border-olive";
    bgClass = "bg-olive/5";
  }

  return (
    <button
      onClick={onClick}
      disabled={answered}
      className={`w-full rounded-md border ${borderClass} ${bgClass} p-5 text-left transition-colors disabled:cursor-default`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
            answered && isCorrect
              ? "border-muted-green bg-muted-green text-white"
              : answered && isSelected
                ? "border-muted-red bg-muted-red text-white"
                : isSelected
                  ? "border-olive bg-olive/20 text-olive"
                  : "border-warm-border text-warm-gray"
          }`}
        >
          {answered && isCorrect
            ? "\u2713"
            : answered && isSelected
              ? "\u2717"
              : option.label}
        </div>
        <div className="pt-0.5 text-sm leading-relaxed text-foreground">
          {option.text}
        </div>
      </div>
    </button>
  );
}

function ExplanationPanel({
  question,
  selectedAnswer,
}: {
  question: Question;
  selectedAnswer: string;
}) {
  const [showDistractors, setShowDistractors] = useState(false);
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="mt-8 space-y-4">
      <div
        className={`rounded-md border-l-4 p-5 ${
          isCorrect
            ? "border-l-muted-green bg-muted-green-light"
            : "border-l-muted-red bg-muted-red-light"
        }`}
      >
        <div
          className={`mb-2 text-xs font-semibold uppercase tracking-wider ${
            isCorrect ? "text-muted-green" : "text-muted-red"
          }`}
        >
          {isCorrect ? "Correct" : `Incorrect \u2014 Answer: ${question.correctAnswer}`}
        </div>
        <p className="text-sm leading-relaxed text-foreground">
          {question.explanation}
        </p>
      </div>

      {Object.keys(question.distractorExplanations).length > 0 && (
        <div>
          <button
            onClick={() => setShowDistractors(!showDistractors)}
            className="flex items-center gap-2 text-xs font-medium text-warm-gray hover:text-foreground"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={`transition-transform ${showDistractors ? "rotate-90" : ""}`}
            >
              <path d="M4.5 2.5L8 6l-3.5 3.5" />
            </svg>
            Why each wrong answer is wrong
          </button>

          {showDistractors && (
            <div className="mt-3 space-y-3">
              {Object.entries(question.distractorExplanations).map(
                ([label, text]) => (
                  <div
                    key={label}
                    className="rounded-md bg-cream-dark p-4"
                  >
                    <div className="mb-1 text-xs font-bold text-warm-gray">
                      Option {label}
                    </div>
                    <p className="text-sm leading-relaxed text-warm-gray">
                      {text}
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ScoreScreen({
  questions,
  answers,
  onRestart,
}: {
  questions: Question[];
  answers: Record<string, string>;
  onRestart: () => void;
}) {
  const correct = questions.filter(
    (q) => answers[q.id] === q.correctAnswer
  ).length;
  const total = questions.length;
  const pct = Math.round((correct / total) * 100);

  const taskBreakdown = useMemo(() => {
    const tasks: Record<string, { correct: number; total: number }> = {};
    for (const q of questions) {
      for (const ts of q.taskStatements) {
        if (!tasks[ts]) tasks[ts] = { correct: 0, total: 0 };
        tasks[ts].total++;
        if (answers[q.id] === q.correctAnswer) tasks[ts].correct++;
      }
    }
    return Object.entries(tasks).sort(([a], [b]) => a.localeCompare(b));
  }, [questions, answers]);

  return (
    <div className="text-center">
      <div className="mb-10">
        <div className="mb-2 font-serif text-6xl font-bold text-foreground">{pct}%</div>
        <div className="text-lg text-warm-gray">
          {correct} of {total} correct
        </div>
        {pct >= 80 ? (
          <div className="mt-3 text-sm font-medium text-muted-green">
            Passing score. Nice work.
          </div>
        ) : (
          <div className="mt-3 text-sm font-medium text-olive">
            Below 80% passing threshold. Keep studying.
          </div>
        )}
      </div>

      {taskBreakdown.length > 0 && (
        <div className="mx-auto mb-10 max-w-md">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-warm-gray-light">
            By Task Statement
          </h3>
          <div className="space-y-2">
            {taskBreakdown.map(([task, stats]) => (
              <div
                key={task}
                className="flex items-center justify-between rounded-md border border-warm-border bg-card px-4 py-2.5"
              >
                <span className="text-sm text-foreground">Task {task}</span>
                <span
                  className={`text-sm font-semibold ${
                    stats.correct === stats.total
                      ? "text-muted-green"
                      : stats.correct === 0
                        ? "text-muted-red"
                        : "text-olive"
                  }`}
                >
                  {stats.correct}/{stats.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onRestart}
        className="rounded-md bg-olive px-8 py-3 text-sm font-semibold text-cream transition-colors hover:bg-olive-light"
      >
        Try Again
      </button>
    </div>
  );
}

export function Quiz({ questions }: { questions: Question[] }) {
  const [shuffledQuestions, setShuffledQuestions] = useState(() =>
    shuffle(questions)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [finished, setFinished] = useState(false);

  const question = shuffledQuestions[currentIndex];

  const handleSelect = (label: string) => {
    if (answered) return;
    setSelectedAnswer(label);
    setAnswered(true);
    setAnswers((prev) => ({ ...prev, [question.id]: label }));
  };

  const handleNext = () => {
    if (currentIndex + 1 >= shuffledQuestions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setShuffledQuestions(shuffle(questions));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setAnswers({});
    setFinished(false);
  };

  if (finished) {
    return (
      <ScoreScreen
        questions={shuffledQuestions}
        answers={answers}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div>
      <ProgressBar current={currentIndex} total={shuffledQuestions.length} />

      <ScenarioBadge scenario={question.scenario} />

      <div className="mb-2 flex flex-wrap gap-1.5">
        {question.taskStatements.map((ts) => (
          <span
            key={ts}
            className="rounded-md bg-cream-dark px-2 py-0.5 text-xs text-warm-gray"
          >
            Task {ts}
          </span>
        ))}
      </div>

      <h2 className="mb-8 font-serif text-base font-semibold leading-relaxed text-foreground">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((opt) => (
          <OptionCard
            key={opt.label}
            option={opt}
            selected={selectedAnswer}
            answered={answered}
            isCorrect={opt.label === question.correctAnswer}
            isSelected={opt.label === selectedAnswer}
            onClick={() => handleSelect(opt.label)}
          />
        ))}
      </div>

      {answered && (
        <>
          <ExplanationPanel
            question={question}
            selectedAnswer={selectedAnswer!}
          />
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              className="rounded-md bg-olive px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-olive-light"
            >
              {currentIndex + 1 >= shuffledQuestions.length
                ? "See Results"
                : "Next Question"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
