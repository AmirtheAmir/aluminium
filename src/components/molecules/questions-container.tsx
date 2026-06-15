"use client";

import { QuestionnaireQuestion } from "@/components/molecules/questionnaire-question";

export interface QuestionnaireItem {
  answers: string[];
  id: string;
  title: string;
}

interface QuestionsContainerProps {
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, answer: string) => void;
  questions: QuestionnaireItem[];
}

export function QuestionsContainer({
  answers,
  onAnswerChange,
  questions,
}: QuestionsContainerProps) {
  return (
    <div className="flex flex-col gap-12 min-[680px]:gap-20">
      {questions.map((question) => (
        <QuestionnaireQuestion
          answers={question.answers}
          key={question.id}
          onChange={(answer) => onAnswerChange(question.id, answer)}
          selectedAnswer={answers[question.id]}
          title={question.title}
        />
      ))}
    </div>
  );
}
