"use client";

import { QuestionOption } from "@/components/atoms/question-option";

interface QuestionnaireQuestionProps {
  answers: string[];
  onChange: (answer: string) => void;
  selectedAnswer?: string;
  title: string;
}

export function QuestionnaireQuestion({
  answers,
  onChange,
  selectedAnswer,
  title,
}: QuestionnaireQuestionProps) {
  return (
    <fieldset>
      <legend className="type-h4-700 max-[679px]:type-h5-mobile text-text-primary">
        {title}
      </legend>
      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-3 min-[680px]:gap-x-6">
        {answers.map((answer) => (
          <QuestionOption
            key={answer}
            onSelect={() => onChange(answer)}
            selected={selectedAnswer === answer}
          >
            {answer}
          </QuestionOption>
        ))}
      </div>
    </fieldset>
  );
}
