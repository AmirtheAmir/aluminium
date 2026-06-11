"use client";

import { useState } from "react";

import { FrequentlyAskedQuestions } from "@/components/organisms/frequently-asked-questions";
import { ContactRequestModal } from "@/components/organisms/contact-request-modal";
import { Footer } from "@/components/organisms/footer";
import { Navigation } from "@/components/organisms/navigation";
import { OperationsHero } from "@/components/organisms/operations-hero";
import { PricingPlans } from "@/components/organisms/pricing-plans";
import { ProcessShowcase } from "@/components/organisms/process-showcase";
import { StructuredFlow } from "@/components/organisms/structured-flow";
import { UseCases } from "@/components/organisms/use-cases";
import { WorkflowChallenge } from "@/components/organisms/workflow-challenge";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="flex flex-1 flex-col px-12 pt-6" id="top">
      <div className="mx-auto flex w-full max-w-336 flex-1 flex-col">
        <Navigation onContactClick={() => setContactOpen(true)} />
        <OperationsHero onContactClick={() => setContactOpen(true)} />
        <WorkflowChallenge />
        <ProcessShowcase />
        <UseCases />
        <StructuredFlow />
        <PricingPlans />
        <FrequentlyAskedQuestions />
        <Footer onContactClick={() => setContactOpen(true)} />
      </div>
      <ContactRequestModal
        onClose={() => setContactOpen(false)}
        open={contactOpen}
      />
    </main>
  );
}
