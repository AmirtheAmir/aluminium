import { Navigation } from "@/components/organisms/navigation";
import { OperationsHero } from "@/components/organisms/operations-hero";
import { WorkflowChallenge } from "@/components/organisms/workflow-challenge";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col px-12 pt-6">
      <div className="mx-auto flex w-full max-w-336 flex-1 flex-col">
        <Navigation />
        <OperationsHero />
        <WorkflowChallenge />
      </div>
    </main>
  );
}
