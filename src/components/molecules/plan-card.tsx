"use client";

import { useState } from "react";

import AnimatedCounter from "@/components/atoms/animated-counter";
import { ButtonPrimary } from "@/components/atoms/button-primary";
import { PlanFeature } from "@/components/atoms/plan-feature";
import type { BillingPeriod } from "@/components/molecules/billing-toggle";
import { cn } from "@/lib/utils";

type PricingPlanId = "starter" | "growth" | "scale";

interface PricingPlan {
  description: string;
  features: string[];
  id: PricingPlanId;
  name: string;
  prices: Record<BillingPeriod, number>;
}

interface PlanCardProps {
  onCheckout: (plan: PricingPlan) => void;
  period: BillingPeriod;
  plan: PricingPlan;
}

const periodLabels: Record<BillingPeriod, string> = {
  monthly: "/Month",
  yearly: "/Year",
};

export function PlanCard({ onCheckout, period, plan }: PlanCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className={cn(
        "flex min-w-0 flex-col gap-4 border p-3 transition-colors lg:gap-6 lg:p-4",
        hovered
          ? "border-border-secondary bg-background-inverse"
          : "border-border-primary bg-background-primary",
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col">
        <p
          className={cn(
            "type-s-button-600 font-bold uppercase transition-colors",
            hovered ? "text-text-secondary-inverse" : "text-text-secondary",
          )}
        >
          {plan.name}
        </p>

        <div className="mt-2 flex items-end gap-1 lg:mt-3">
          <p
            className={cn(
              "type-plan-price transition-colors",
              hovered ? "text-text-inverse" : "text-text-primary",
            )}
          >
            $
            <AnimatedCounter
              duration={0.1}
              from={0}
              separator=","
              to={plan.prices[period]}
            />
          </p>
          <p
            className={cn(
              "type-plan-period pb-2 transition-colors",
              hovered
                ? "text-text-inactive-inverse-primary"
                : "text-text-inactive-primary",
            )}
          >
            {periodLabels[period]}
          </p>
        </div>
      </div>

      <p
        className={cn(
          "type-plan-body transition-colors",
          hovered ? "text-text-inverse" : "text-text-primary",
        )}
      >
        {plan.description}
      </p>

      <div className="flex items-center gap-3">
        <span
          className={cn(
            "h-px flex-1 transition-colors",
            hovered ? "bg-text-inactive-inverse-primary" : "bg-border-primary",
          )}
        />
        <p
          className={cn(
            "type-plan-label uppercase transition-colors",
            hovered
              ? "text-text-inactive-inverse-primary"
              : "text-text-inactive-primary",
          )}
        >
          Features
        </p>
        <span
          className={cn(
            "h-px flex-1 transition-colors",
            hovered ? "bg-text-inactive-inverse-primary" : "bg-border-primary",
          )}
        />
      </div>

      <ul className="flex flex-col gap-2 lg:gap-3">
        {plan.features.map((feature) => (
          <PlanFeature inverse={hovered} key={feature}>
            {feature}
          </PlanFeature>
        ))}
      </ul>

      <ButtonPrimary
        className="mt-auto w-full lg:w-full"
        onClick={() => onCheckout(plan)}
        tone={hovered ? "light" : "dark"}
      >
        Get Started
      </ButtonPrimary>
    </article>
  );
}

export type { PricingPlan };
