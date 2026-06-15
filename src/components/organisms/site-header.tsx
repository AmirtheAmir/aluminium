import { BrandMark } from "@/components/atoms/brand-mark";
import { ButtonSecondary } from "@/components/atoms/button-secondary";
import { NavLinks } from "@/components/molecules/nav-links";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  className?: string;
  onContactClick?: () => void;
}

export function SiteHeader({ className, onContactClick }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-4 z-50 grid w-full grid-cols-1 border border-border-primary bg-background-primary md:grid-cols-4",
        className,
      )}
    >
      <BrandMark className="border-0 md:col-span-1 md:border-r md:border-border-primary" />
      <NavLinks className="md:col-span-2" />
      <ButtonSecondary
        className="border-0 md:col-span-1 md:border-l md:border-border-primary"
        onClick={onContactClick}
      />
    </header>
  );
}
