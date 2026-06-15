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
  const rows = questions.reduce<FaqQuestion[][]>((groupedRows, question) => {
    const currentRow = groupedRows[groupedRows.length - 1];

    if (!currentRow || currentRow.length === 2) {
      groupedRows.push([question]);
      return groupedRows;
    }

    currentRow.push(question);
    return groupedRows;
  }, []);

  return (
    <>
      {/* Mobile layout */}
      <div className={cn("flex w-full flex-col gap-3 lg:hidden", className)}>
        {questions.map((item) => (
          <FaqTrigger
            key={item.question}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>

      {/* Desktop layout */}
      <div className={cn("hidden w-full flex-col gap-3 lg:flex", className)}>
        {rows.map((row) => (
          <div
            className="grid grid-cols-2 items-start gap-3"
            key={row[0].question}
          >
            {row.map((item) => (
              <FaqTrigger
                answer={item.answer}
                className="self-start"
                key={item.question}
                question={item.question}
              />
            ))}
            {row.length === 1 && <div aria-hidden="true" />}
          </div>
        ))}
      </div>
    </>
  );
}

export type { FaqQuestion };
