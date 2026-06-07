import { NavigationButton } from "@/components/atoms/navigation-button";
import { cn } from "@/lib/utils";

const navigationItems = [
  "Operations",
  "Use Cases",
  "Pricing",
  "FAQS",
];

interface NavigationLinksProps {
  className?: string;
}

export function NavigationLinks({ className }: NavigationLinksProps) {
  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        "flex w-full justify-center",
        className
      )}
    >
      {navigationItems.map((item) => (
        <NavigationButton key={item}>
          {item}
        </NavigationButton>
      ))}
    </nav>
  );
}
