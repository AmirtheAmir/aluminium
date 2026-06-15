"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "framer-motion";

import { ButtonPrimary } from "@/components/atoms/button-primary";
import { ButtonSecondary } from "@/components/atoms/button-secondary";
import {
  QuestionsContainer,
  type QuestionnaireItem,
} from "@/components/molecules/questions-container";
import { XIcon } from "@/components/ui/x";
import { cn } from "@/lib/utils";

interface OperationsQuestionnaireModalProps {
  onClose: () => void;
  open: boolean;
}

type Plan = "starter" | "growth" | "scale";
type ModalStep = "questions" | "recommendation";

interface RecommendationAnswers {
  biggestProblem: string[];
  currentManagement: string[];
  needsApprovalTracking: boolean;
  needsCustomSetup: boolean;
  role: string;
  teamSize: string;
}

interface RecommendedPlan {
  description: string;
  id: Plan;
  name: string;
  price: number;
}

const questionnaireItems: QuestionnaireItem[] = [
  {
    id: "role",
    title: "What Best Describes You?",
    answers: [
      "Business Owner",
      "Founder",
      "Operations Manager",
      "Team Lead",
      "Project Manager",
      "Other",
    ],
  },
  {
    id: "team-size",
    title: "How Many People Are In Your Team?",
    answers: ["1 - 5 People", "6 - 15 People", "16 - 50 People", "50+ People"],
  },
  {
    id: "current-management",
    title: "How Do You Currently Manage Daily Operations?",
    answers: [
      "Messages And Manual Follow-Ups",
      "Spreadsheets And Documents",
      "Project Management Tools",
      "Internal Systems",
      "A Mix Of Several Tools",
    ],
  },
  {
    id: "approval-tracking",
    title: "Do You Need Approval And Status Tracking?",
    answers: ["No", "Yes"],
  },
  {
    id: "biggest-problem",
    title: "What Is Your Biggest Operational Problem Right Now?",
    answers: [
      "Unclear Task Ownership",
      "Too Many Manual Follow-Ups",
      "Approval Delays",
      "Messy Repeated Processes",
    ],
  },
  {
    id: "priority-support",
    title: "Do You Need Custom Setup Or Priority Support?",
    answers: ["No", "Yes"],
  },
];

const recommendedPlans: Record<Plan, RecommendedPlan> = {
  starter: {
    id: "starter",
    name: "Starter",
    price: 79,
    description:
      "For small teams that need a clearer way to manage daily tasks, ownership, and recurring workflows.",
  },
  growth: {
    id: "growth",
    name: "Growth",
    price: 149,
    description:
      "For growing teams that need stronger coordination and more consistent operational processes.",
  },
  scale: {
    id: "scale",
    name: "Scale",
    price: 279,
    description:
      "For larger businesses managing complex workflows, repeated processes, and cross-functional operations.",
  },
};

const MODAL_SCROLL_SPRING = {
  damping: 45,
  mass: 0.8,
  restDelta: 0.5,
  stiffness: 180,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getAnswer(answers: Record<string, string>, questionId: string) {
  return answers[questionId] ?? "";
}

function getWheelDelta(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 16;
  }

  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }

  return event.deltaY;
}

function toRecommendationAnswers(
  answers: Record<string, string>,
): RecommendationAnswers {
  return {
    biggestProblem: getAnswer(answers, "biggest-problem")
      ? [getAnswer(answers, "biggest-problem")]
      : [],
    currentManagement: getAnswer(answers, "current-management")
      ? [getAnswer(answers, "current-management")]
      : [],
    needsApprovalTracking: getAnswer(answers, "approval-tracking") === "Yes",
    needsCustomSetup: getAnswer(answers, "priority-support") === "Yes",
    role: getAnswer(answers, "role"),
    teamSize: getAnswer(answers, "team-size"),
  };
}

function recommendPlan(answers: RecommendationAnswers): Plan {
  const score: Record<Plan, number> = {
    starter: 0,
    growth: 0,
    scale: 0,
  };

  if (
    answers.role === "Business Owner" ||
    answers.role === "Founder" ||
    answers.role === "Team Lead"
  ) {
    score.starter += 1;
    score.growth += 1;
  }

  if (
    answers.role === "Operations Manager" ||
    answers.role === "Project Manager"
  ) {
    score.growth += 2;
    score.scale += 1;
  }

  if (answers.teamSize === "1 - 5 People") {
    score.starter += 3;
  }

  if (answers.teamSize === "6 - 15 People") {
    score.starter += 1;
    score.growth += 3;
  }

  if (answers.teamSize === "16 - 50 People") {
    score.growth += 3;
    score.scale += 1;
  }

  if (answers.teamSize === "50+ People") {
    score.scale += 4;
  }

  if (
    answers.currentManagement.includes("Messages And Manual Follow-Ups") ||
    answers.currentManagement.includes("Spreadsheets And Documents")
  ) {
    score.starter += 2;
    score.growth += 1;
  }

  if (answers.currentManagement.includes("Project Management Tools")) {
    score.growth += 2;
  }

  if (
    answers.currentManagement.includes("Internal Systems") ||
    answers.currentManagement.includes("A Mix Of Several Tools")
  ) {
    score.scale += 3;
  }

  if (answers.needsApprovalTracking) {
    score.growth += 3;
    score.scale += 1;
  } else {
    score.starter += 2;
  }

  if (answers.biggestProblem.includes("Unclear Task Ownership")) {
    score.starter += 2;
    score.growth += 1;
  }

  if (
    answers.biggestProblem.includes("Too Many Manual Follow-Ups") ||
    answers.biggestProblem.includes("Approval Delays") ||
    answers.biggestProblem.includes("Messy Repeated Processes")
  ) {
    score.growth += 3;
  }

  if (answers.biggestProblem.includes("Poor Visibility Across Teams")) {
    score.scale += 3;
  }

  if (answers.needsCustomSetup) {
    score.scale += 4;
  } else {
    score.starter += 1;
    score.growth += 1;
  }

  if (score.scale >= score.growth && score.scale >= score.starter) {
    return "scale";
  }

  if (score.growth >= score.starter) {
    return "growth";
  }

  return "starter";
}

function Highlight({ children }: { children: string }) {
  return <span className="font-semibold underline">{children}</span>;
}

export function OperationsQuestionnaireModal({
  onClose,
  open,
}: OperationsQuestionnaireModalProps) {
  const questionsScrollRef = useRef<HTMLDivElement>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState<ModalStep>("questions");
  const shouldReduceMotion = useReducedMotion();
  const recommendationAnswers = toRecommendationAnswers(answers);
  const recommendedPlan =
    recommendedPlans[recommendPlan(recommendationAnswers)];
  const complete = questionnaireItems.every((question) => answers[question.id]);

  const handleClose = useCallback(() => {
    setAnswers({});
    setStep("questions");
    onClose();
  }, [onClose]);

  function handleNext() {
    if (!complete) return;

    setStep("recommendation");
  }

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const previousPageScrollLocked = document.body.dataset.pageScrollLocked;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;

    document.body.dataset.pageScrollLocked = "true";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      if (previousPageScrollLocked === undefined) {
        delete document.body.dataset.pageScrollLocked;
      } else {
        document.body.dataset.pageScrollLocked = previousPageScrollLocked;
      }

      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    if (!open || step !== "questions" || shouldReduceMotion) return;

    const scrollElement = questionsScrollRef.current;

    if (!scrollElement) return;

    const scrollContainer = scrollElement;

    let targetScrollTop = scrollContainer.scrollTop;
    let isAnimating = false;
    let scrollAnimation: AnimationPlaybackControls | null = null;

    function getMaxScrollTop() {
      return Math.max(
        scrollContainer.scrollHeight - scrollContainer.clientHeight,
        0,
      );
    }

    function stopScrollAnimation() {
      scrollAnimation?.stop();
      scrollAnimation = null;
      isAnimating = false;
    }

    function handleWheel(event: WheelEvent) {
      if (
        event.ctrlKey ||
        event.metaKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ) {
        return;
      }

      const deltaY = getWheelDelta(event);

      if (deltaY === 0) return;

      event.preventDefault();
      event.stopPropagation();

      targetScrollTop = clamp(targetScrollTop + deltaY, 0, getMaxScrollTop());

      scrollAnimation?.stop();
      isAnimating = true;
      scrollAnimation = animate(scrollContainer.scrollTop, targetScrollTop, {
        ...MODAL_SCROLL_SPRING,
        type: "spring",
        onUpdate: (value) => {
          scrollContainer.scrollTop = value;
        },
        onComplete: () => {
          isAnimating = false;
          targetScrollTop = scrollContainer.scrollTop;
        },
      });
    }

    function handleScroll() {
      if (!isAnimating) {
        targetScrollTop = scrollContainer.scrollTop;
      }
    }

    function handleResize() {
      targetScrollTop = clamp(targetScrollTop, 0, getMaxScrollTop());
    }

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    scrollContainer.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", handleResize);

    return () => {
      stopScrollAnimation();
      scrollContainer.removeEventListener("wheel", handleWheel);
      scrollContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [open, shouldReduceMotion, step]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-background-tinted p-4 backdrop-blur-sm"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={handleClose}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          <motion.section
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-modal="true"
            className="relative flex h-162 max-h-[calc(100vh-48px)] w-6/12 flex-col overflow-hidden border border-border-secondary bg-background-primary p-4"
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <button
              aria-label="Close questions modal"
              className="absolute right-4 top-4 z-10 flex cursor-pointer items-center justify-center text-text-primary"
              onClick={handleClose}
              type="button"
            >
              <XIcon aria-hidden="true" size={16} />
            </button>

            {step === "questions" ? (
              <div
                className="scrollbar-none flex flex-col gap-12 overflow-y-auto overscroll-contain"
                data-native-scroll
                ref={questionsScrollRef}
              >
                <h2 className="type-h2 text-text-primary uppercase">
                  Questions
                </h2>

                <div>
                  <QuestionsContainer
                    answers={answers}
                    onAnswerChange={(questionId, answer) =>
                      setAnswers((currentAnswers) => {
                        if (currentAnswers[questionId] !== answer) {
                          return {
                            ...currentAnswers,
                            [questionId]: answer,
                          };
                        }

                        const nextAnswers = { ...currentAnswers };

                        delete nextAnswers[questionId];

                        return nextAnswers;
                      })
                    }
                    questions={questionnaireItems}
                  />
                </div>

                <ButtonSecondary
                  className={cn(
                    "w-full justify-center",
                    !complete && "text-text-tertiary",
                  )}
                  icon="none"
                  onClick={handleNext}
                  tone="inverse"
                >
                  Next
                </ButtonSecondary>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between">
                <div>
                  <h2 className="type-h2 text-text-primary uppercase">
                    Tell Us More
                  </h2>
                  <p className="type-m-500 mt-12 text-text-primary">
                    Based on your answers, the{" "}
                    <Highlight>{recommendedPlan.name}</Highlight> plan is the
                    best fit for your team. You described yourself as a{" "}
                    <Highlight>
                      {recommendationAnswers.role || "team operator"}
                    </Highlight>{" "}
                    working with a{" "}
                    <Highlight>
                      {recommendationAnswers.teamSize || "focused team"}
                    </Highlight>
                    , and your current operations are mostly managed through{" "}
                    <Highlight>
                      {recommendationAnswers.currentManagement[0] ||
                        "daily workflow tools"}
                    </Highlight>
                    . Since your biggest challenge is{" "}
                    <Highlight>
                      {recommendationAnswers.biggestProblem[0] ||
                        "organizing repeated work"}
                    </Highlight>{" "}
                    and you{" "}
                    <Highlight>
                      {recommendationAnswers.needsApprovalTracking
                        ? "need approval and status tracking"
                        : "do not need approval and status tracking"}
                    </Highlight>
                    , Aluminium can help your team structure responsibilities,
                    manage daily tasks, and keep operations moving with the
                    right level of complexity.
                  </p>
                </div>

                <article className="flex flex-col gap-6 border border-border-secondary bg-background-inverse p-4 text-text-inverse">
                  <div>
                    <p className="type-s-button-600 text-text-secondary-inverse uppercase">
                      {recommendedPlan.name}
                    </p>
                    <div className="mt-3 flex items-end gap-1">
                      <p className="type-h3">${recommendedPlan.price}</p>
                      <p className="type-m-500 pb-2 text-text-inactive-inverse-primary">
                        /Month
                      </p>
                    </div>
                  </div>

                  <p className="type-m-body-500">{recommendedPlan.description}</p>

                  <ButtonPrimary
                    className="w-full"
                    href="#pricing"
                    onClick={handleClose}
                    tone="light"
                  >
                    Go To Pricing
                  </ButtonPrimary>
                </article>
              </div>
            )}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
