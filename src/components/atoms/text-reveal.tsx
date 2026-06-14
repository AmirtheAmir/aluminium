"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const STAGGER = 0.035;

interface TextRevealProps {
  children: string;
  className?: string;
  center?: boolean;
  active?: boolean;
}

export function TextReveal({
  children,
  className,
  center = false,
  active,
}: TextRevealProps) {
  const letters = children.split("");
  const middleIndex = (letters.length - 1) / 2;

  function getDelay(index: number) {
    return STAGGER * (center ? Math.abs(index - middleIndex) : index);
  }

  return (
    <motion.span
      className={cn("relative block overflow-hidden", className)}
      animate={active === undefined ? undefined : active ? "hovered" : "initial"}
      initial="initial"
      whileHover={active === undefined ? "hovered" : undefined}
    >
      <span className="block">
        {letters.map((letter, index) => {
          return (
            <motion.span
              className="inline-block"
              key={`${letter}-${index}`}
              transition={{ ease: "easeInOut", delay: getDelay(index) }}
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          );
        })}
      </span>

      <span className="absolute inset-0 block">
        {letters.map((letter, index) => {
          return (
            <motion.span
              className="inline-block"
              key={`${letter}-${index}`}
              transition={{ ease: "easeInOut", delay: getDelay(index) }}
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          );
        })}
      </span>
    </motion.span>
  );
}
