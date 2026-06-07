"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const STAGGER = 0.035;

interface AnimatedTextProps {
  children: string;
  className?: string;
  center?: boolean;
  active?: boolean;
}

export function AnimatedText({
  children,
  className,
  center = false,
  active,
}: AnimatedTextProps) {
  return (
    <motion.span
      className={cn("relative block overflow-hidden", className)}
      animate={active === undefined ? undefined : active ? "hovered" : "initial"}
      initial="initial"
      whileHover={active === undefined ? "hovered" : undefined}
    >
      <span className="block">
        {children.split("").map((letter, index) => {
          const delay = center
            ? STAGGER * Math.abs(index - (children.length - 1) / 2)
            : STAGGER * index;

          return (
            <motion.span
              className="inline-block"
              key={`${letter}-${index}`}
              transition={{ ease: "easeInOut", delay }}
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
        {children.split("").map((letter, index) => {
          const delay = center
            ? STAGGER * Math.abs(index - (children.length - 1) / 2)
            : STAGGER * index;

          return (
            <motion.span
              className="inline-block"
              key={`${letter}-${index}`}
              transition={{ ease: "easeInOut", delay }}
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
