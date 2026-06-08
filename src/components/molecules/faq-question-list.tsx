import { FaqQuestionItem } from "@/components/atoms/faq-question-item";
import { cn } from "@/lib/utils";

interface FaqQuestion {
  answer: string;
  question: string;
}

interface FaqQuestionListProps {
  className?: string;
  questions: FaqQuestion[];
}

export function FaqQuestionList({
  className,
  questions,
}: FaqQuestionListProps) {
  return (
    <div
      className={cn("grid w-full grid-cols-1 gap-3 md:grid-cols-2", className)}
    >
      {questions.map((item) => (
        <FaqQuestionItem
          answer={item.answer}
          key={item.question}
          question={item.question}
        />
      ))}
    </div>
  );
}

export type { FaqQuestion };
