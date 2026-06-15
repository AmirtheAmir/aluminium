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
        "grid w-1/2 grid-cols-2 border border-border-primary p-1 lg:w-1/6",
        className,
      )}
    >
      {billingPeriods.map((period) => {
        const active = period.value === activePeriod;

        return (
          <button
            className={cn(
              "type-billing-toggle cursor-pointer px-6 py-3.5 text-center uppercase transition-colors lg:px-4 lg:py-3",
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
