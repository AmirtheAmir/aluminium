import { cn } from "@/lib/utils";

export type BillingPeriod = "monthly" | "yearly";

interface BillingToggleProps {
  activePeriod: BillingPeriod;
  className?: string;
  onPeriodChange: (period: BillingPeriod) => void;
}

const billingPeriods: { label: string; value: BillingPeriod }[] = [
  { label: "Monthly", value: "monthly" },
  { label: "Year", value: "yearly" },
];

export function BillingToggle({
  activePeriod,
  className,
  onPeriodChange,
}: BillingToggleProps) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-2 border p-1 border-border-primary md:w-1/6",
        className,
      )}
    >
      {billingPeriods.map((period) => {
        const active = period.value === activePeriod;

        return (
          <button
            className={cn(
              "type-s-button-strong cursor-pointer px-4 py-3 text-center uppercase transition-colors",
              active
                ? "bg-background-inverse text-text-inverse"
                : "bg-background-primary text-text-primary",
            )}
            key={period.value}
            onClick={() => onPeriodChange(period.value)}
            type="button"
          >
            {period.label}
          </button>
        );
      })}
    </div>
  );
}
