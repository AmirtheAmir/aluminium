import { HeroActions } from "@/components/molecules/hero-actions";
import { HeroCopy } from "@/components/molecules/hero-copy";
import DotField from "@/components/ui/DotField";
import { cn } from "@/lib/utils";

interface OperationsHeroProps {
  className?: string;
}

export function OperationsHero({ className }: OperationsHeroProps) {
  return (
    <section
      className={cn(
        "relative flex h-207 w-full flex-col items-center justify-center overflow-hidden border-x border-b border-border-primary bg-background-primary px-4 pb-12",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full">
        <DotField
          dotRadius={1.5}
          dotSpacing={16}
          bulgeStrength={56}
          glowRadius={112}
          sparkle={false}
          waveAmplitude={1}
          cursorRadius={500}
          cursorForce={0.1}
          bulgeOnly
          gradientFrom="#a7adb4"
          gradientTo="#9199a1"
          glowColor="#d3d6d9"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12">
        <HeroCopy />
        <HeroActions />
      </div>
    </section>
  );
}
