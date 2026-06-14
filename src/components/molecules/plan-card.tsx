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
  period: BillingPeriod;
  plan: PricingPlan;
}

const periodLabels: Record<BillingPeriod, string> = {
  monthly: "/Month",
  yearly: "/Year",
};

export function PlanCard({ period, plan }: PlanCardProps) {
  const [hovered, setHovered] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  async function handleCheckout() {
    if (isCheckingOut) return;

    setIsCheckingOut(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          period,
          plan: plan.id,
        }),
      });
      const data = (await response.json()) as {
        error?: string;
        url?: string;
      };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Unable to start checkout");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout redirect error:", error);
      setIsCheckingOut(false);
    }
  }

  return (
    <article
      className={cn(
        "flex min-w-0 flex-col gap-6 border p-4 transition-colors",
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
            "type-s-button-strong font-bold uppercase transition-colors",
            hovered ? "text-text-secondary-inverse" : "text-text-secondary",
          )}
        >
          {plan.name}
        </p>

        <div className="mt-3 flex items-end gap-1">
          <p
            className={cn(
              "type-h3 transition-colors",
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
              "type-p pb-2 transition-colors",
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
          "type-p-body transition-colors",
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
            "type-s-button uppercase transition-colors",
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

      <ul className="flex flex-col gap-3">
        {plan.features.map((feature) => (
          <PlanFeature inverse={hovered} key={feature}>
            {feature}
          </PlanFeature>
        ))}
      </ul>

      <ButtonPrimary
        className="mt-auto w-full"
        disabled={isCheckingOut}
        onClick={handleCheckout}
        tone={hovered ? "light" : "dark"}
      >
        Get Started
      </ButtonPrimary>
    </article>
  );
}

export type { PricingPlan };
