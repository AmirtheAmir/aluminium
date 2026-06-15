import { FaqTrigger } from "@/components/atoms/faq-trigger";
import { cn } from "@/lib/utils";

interface FaqQuestion {
  answer: string;
  question: string;
}

interface FaqListProps {
  className?: string;
  questions: FaqQuestion[];
}

export function FaqList({
  className,
  questions,
}: FaqListProps) {
  return (
    <div
      className={cn("grid w-full grid-cols-1 items-start gap-3 lg:grid-cols-2", className)}
    >
      {questions.map((item) => (
        <FaqTrigger
          answer={item.answer}
          className="self-start"
          key={item.question}
          question={item.question}
        />
      ))}
    </div>
  );
}

export type { FaqQuestion };
