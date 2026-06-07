import { Logo } from "@/assets";
import { ContrastIcon } from "@/components/ui/contrast";
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <div
      className={cn(
        "flex min-h-13 items-center justify-center gap-1 border border-border-primary bg-background-primary p-4 text-text-primary",
        className
      )}
    >
      <Logo aria-hidden="true" />
      <ContrastIcon aria-hidden="true" size={10} />
    </div>
  );
}
