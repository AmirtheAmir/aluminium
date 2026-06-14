import {
  FaqList,
  type FaqQuestion,
} from "@/components/molecules/faq-list";
import { SectionIntro } from "@/components/molecules/section-intro";
import { cn } from "@/lib/utils";

interface FaqSectionProps {
  className?: string;
}

const faqQuestions: FaqQuestion[] = [
  {
    question: "What is Aluminium used for?",
    answer:
      "Aluminium is used to organize tasks, approvals, ownership, and recurring workflows into structured processes that are easier to manage.",
  },
  {
    question: "Is Aluminium suitable for small teams?",
    answer:
      "Yes. Aluminium helps small teams create clearer workflows, track responsibilities, and reduce repeated follow-ups as daily work moves forward.",
  },
  {
    question: "Can we customize workflows?",
    answer:
      "Yes. Workflows can be shaped around the way your team handles requests, approvals, handoffs, recurring tasks, and operational updates.",
  },
  {
    question: "Does Aluminium replace our current tools?",
    answer:
      "Aluminium is designed to structure operational work around your team, so it can support the tools and communication habits you already rely on.",
  },
  {
    question: "Can Aluminium help with ownership?",
    answer:
      "Yes. Aluminium gives teams a clearer way to assign responsibility, track approvals, and understand who owns each step in a process.",
  },
  {
    question: "Is Aluminium built for complex operations?",
    answer:
      "Yes. Aluminium is built for layered workflows with multiple moving parts, repeated processes, and cross-functional responsibilities.",
  },
];

export function FaqSection({
  className,
}: FaqSectionProps) {
  return (
    <section
      className={cn(
        "flex w-full flex-col gap-12 bg-background-primary py-36",
        className,
      )}
      id="faqs"
    >
      <SectionIntro
        eyebrow="FAQS"
        subtitle="Everything you need to know before using Aluminium to structure workflows, manage operations, and improve team productivity."
        title="Frequently Asked Questions"
      />
      <FaqList questions={faqQuestions} />
    </section>
  );
}
