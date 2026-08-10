"use client";

import { useState } from "react";

export default function DataGuess({
  question,
  choices,
  answer,
  revealStat,
  explanation,
}: {
  question: string;
  choices: string;
  answer: string;
  revealStat: string;
  explanation: string;
}) {
  const [choice, setChoice] = useState<string | null>(null);
  const correct = choice === answer;
  const options = choices.split("|").map((option) => option.trim());

  return (
    <section className="not-prose my-8 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="border-b border-border bg-gradient-to-r from-sky-400/[0.10] via-card to-emerald-400/[0.10] p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">
          Guess before the graph
        </p>
        <h2 className="mt-2 text-xl font-bold leading-snug text-foreground sm:text-2xl">
          {question}
        </h2>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid gap-2 sm:grid-cols-3" role="group" aria-label={question}>
          {options.map((option) => {
            const selected = choice === option;
            const isAnswer = choice !== null && option === answer;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                onClick={() => setChoice(option)}
                className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 ${
                  isAnswer
                    ? "border-emerald-400/60 bg-emerald-400/[0.10] text-foreground"
                    : selected
                      ? "border-amber-400/60 bg-amber-400/[0.10] text-foreground"
                      : "border-border bg-background/60 text-muted-foreground hover:-translate-y-0.5 hover:text-foreground"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {choice ? (
          <div
            className={`mt-5 rounded-2xl border p-5 ${
              correct
                ? "border-emerald-400/30 bg-emerald-400/[0.07]"
                : "border-amber-400/30 bg-amber-400/[0.07]"
            }`}
            aria-live="polite"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {correct ? "Good read." : `The data points to ${answer}.`}
                </p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {explanation}
                </p>
              </div>
              <p className="shrink-0 text-3xl font-bold tabular-nums text-foreground">
                {revealStat}
              </p>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-xs text-muted-foreground">
            Choose one answer to reveal the result, then inspect the chart below.
          </p>
        )}
      </div>
    </section>
  );
}
