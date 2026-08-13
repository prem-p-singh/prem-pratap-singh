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
    <section className="paper-panel not-prose my-8 overflow-hidden bg-card">
      <div className="border-b border-border bg-card p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-data">
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
                    ? "border-field/60 bg-field-wash text-foreground"
                    : selected
                      ? "border-decision/60 bg-decision-wash text-foreground"
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
                ? "border-field/30 bg-field-wash"
                : "border-decision/30 bg-decision-wash"
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
