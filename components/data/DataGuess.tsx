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
    <section className="paper-panel not-prose my-8">
      <div className="border-b border-border p-5 sm:p-6">
        <p className="w-fit rounded-full border border-data/20 bg-data-wash px-3 py-1 text-xs font-semibold text-data">
          Guess before the graph
        </p>
        <h2 className="mt-3 text-xl leading-snug text-foreground sm:text-2xl">
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
                // .paper-control fixes its own colours, so the two marked states swap it for utilities.
                className={`flex items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold ${
                  isAnswer
                    ? "rounded-[0.875rem] border border-field bg-field-wash text-foreground"
                    : selected
                      ? "rounded-[0.875rem] border border-decision bg-decision-wash text-foreground"
                      : "paper-control"
                }`}
              >
                {option}
                {/* A mark as well as a colour: tick on the answer, cross on a wrong pick. */}
                {(isAnswer || selected) && (
                  <svg className={`size-4 shrink-0 ${isAnswer ? "text-field" : "text-decision"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={isAnswer ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {choice ? (
          <div
            className={`mt-5 rounded-2xl p-5 ${correct ? "bg-field-wash" : "bg-decision-wash"}`}
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
              <p className={`shrink-0 text-4xl font-semibold leading-none tabular-nums ${correct ? "text-field" : "text-decision"}`}>
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
