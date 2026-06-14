import { HeroCtaGroup } from "@/components/molecules/hero-cta-group";
import { HeroContent } from "@/components/molecules/hero-content";
import DotField from "@/components/ui/DotField";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
  onContactClick?: () => void;
}

export function HeroSection({
  className,
  onContactClick,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative flex h-207 w-full flex-col items-center justify-center overflow-hidden border-x border-b border-border-primary bg-background-primary px-4 pb-12",
        className,
      )}
      id="operations"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full">
        <DotField
          dotRadius={2}
          dotSpacing={16}
          bulgeStrength={56}
          glowRadius={112}
          sparkle={false}
          waveAmplitude={2}
          cursorRadius={500}
          cursorForce={0.1}
          bulgeOnly
          gradientFrom="var(--dot-field-gradient-from)"
          gradientTo="var(--dot-field-gradient-to)"
          glowColor="var(--dot-field-glow-color)"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12">
        <HeroContent />
        <HeroCtaGroup onContactClick={onContactClick} />
      </div>
    </section>
  );
}
