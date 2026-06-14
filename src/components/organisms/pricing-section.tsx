"use client";

import { useState } from "react";

import {
  PlanCard,
  type PricingPlan,
} from "@/components/molecules/plan-card";
import {
  BillingToggle,
  type BillingPeriod,
} from "@/components/molecules/billing-toggle";
import { SectionIntro } from "@/components/molecules/section-intro";
import { cn } from "@/lib/utils";

interface PricingSectionProps {
  className?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    prices: {
      monthly: 79,
      yearly: 750,
    },
    description:
      "For small teams that need a clearer way to manage daily tasks, ownership, and recurring work workflows.",
    features: [
      "Core workflow structure",
      "Task and ownership tracking",
      "Basic process templates",
      "Team workspace setup",
      "Documentation included",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    prices: {
      monthly: 149,
      yearly: 1510,
    },
    description:
      "For growing teams that need stronger coordination, and more consistent operational processes across their organization.",
    features: [
      "Everything in Starter",
      "Multi-team process views",
      "Approval and status tracking",
      "Advanced workflow templates",
      "Operational reporting",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    prices: {
      monthly: 279,
      yearly: 2800,
    },
    description:
      "For larger businesses managing complex workflows, repeated processes, and cross functional operations.",
    features: [
      "Everything in Growth",
      "Custom process systems",
      "Role-based workflow access",
      "Priority implementation support",
      "Advanced team reporting",
    ],
  },
];

export function PricingSection({ className }: PricingSectionProps) {
  const [activePeriod, setActivePeriod] = useState<BillingPeriod>("monthly");

  return (
    <section
      className={cn(
        "flex w-full flex-col border-b border-border-primary bg-background-primary py-36",
        className,
      )}
      id="pricing"
    >
      <SectionIntro
        eyebrow="Pricing"
        subtitle="Designed for businesses that need clearer workflows, stronger ownership, and more structured ways to manage daily work."
        title="For Teams Managing Layered Workflows, Moving Parts, And Operational Complexity"
      />

      <BillingToggle
        activePeriod={activePeriod}
        className="mt-12"
        onPeriodChange={setActivePeriod}
      />

      <div className="mt-6 grid w-full grid-cols-1 gap-3 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <PlanCard key={plan.name} period={activePeriod} plan={plan} />
        ))}
      </div>
    </section>
  );
}
