"use client";

import { useState } from "react";

import { PrimaryButton } from "@/components/atoms/primary-button";
import { PricingFeatureItem } from "@/components/atoms/pricing-feature-item";
import type { BillingPeriod } from "@/components/molecules/pricing-switch";
import { cn } from "@/lib/utils";

interface PricingPlan {
  description: string;
  features: string[];
  name: string;
  prices: Record<BillingPeriod, string>;
}

interface PricingCardProps {
  period: BillingPeriod;
  plan: PricingPlan;
}

const periodLabels: Record<BillingPeriod, string> = {
  monthly: "/Month",
  yearly: "/Year",
};

export function PricingCard({ period, plan }: PricingCardProps) {
  const [hovered, setHovered] = useState(false);

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
            {plan.prices[period]}
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
          <PricingFeatureItem inverse={hovered} key={feature}>
            {feature}
          </PricingFeatureItem>
        ))}
      </ul>

      <PrimaryButton
        className="mt-auto w-full"
        tone={hovered ? "light" : "dark"}
      >
        Get Started
      </PrimaryButton>
    </article>
  );
}

export type { PricingPlan };
