"use client";

import { useState } from "react";

import { FaqSection } from "@/components/organisms/faq-section";
import { ContactModal } from "@/components/organisms/contact-modal";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import { HeroSection } from "@/components/organisms/hero-section";
import { OperationsQuestionnaireModal } from "@/components/organisms/operations-questionnaire-modal";
import { PricingSection } from "@/components/organisms/pricing-section";
import { ProcessSection } from "@/components/organisms/process-section";
import { WorkflowSection } from "@/components/organisms/workflow-section";
import { SolutionsSection } from "@/components/organisms/solutions-section";
import { ChallengesSection } from "@/components/organisms/challenges-section";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [questionnaireOpen, setQuestionnaireOpen] = useState(false);

  return (
    <main className="m-4 flex flex-1 flex-col" id="top">
      <div className="flex w-full flex-1 flex-col">
        <SiteHeader onContactClick={() => setContactOpen(true)} />
        <HeroSection onQuestionnaireClick={() => setQuestionnaireOpen(true)} />
        <ChallengesSection />
        <ProcessSection />
        <SolutionsSection />
        <WorkflowSection />
        <PricingSection />
        <FaqSection />
        <SiteFooter onContactClick={() => setContactOpen(true)} />
      </div>
      <ContactModal
        onClose={() => setContactOpen(false)}
        open={contactOpen}
      />
      <OperationsQuestionnaireModal
        onClose={() => setQuestionnaireOpen(false)}
        open={questionnaireOpen}
      />
    </main>
  );
}
