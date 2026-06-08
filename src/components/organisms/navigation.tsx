import { LogoMark } from "@/components/atoms/logo-mark";
import { SecondaryButton } from "@/components/atoms/secondary-button";
import { NavigationLinks } from "@/components/molecules/navigation-links";
import { cn } from "@/lib/utils";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  return (
    <header
      className={cn(
        "sticky top-6 z-50 grid w-full grid-cols-1 border border-border-primary bg-background-primary md:grid-cols-4",
        className,
      )}
    >
      <LogoMark className="border-0 md:col-span-1 md:border-r md:border-border-primary" />
      <NavigationLinks className="md:col-span-2" />
      <SecondaryButton className="border-0 md:col-span-1 md:border-l md:border-border-primary" />
    </header>
  );
}
