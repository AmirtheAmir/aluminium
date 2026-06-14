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
      <legend className="type-h4-700 text-text-primary">{title}</legend>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
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
