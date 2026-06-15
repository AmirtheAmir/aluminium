import { ButtonSecondary } from "@/components/atoms/button-secondary";

export function PaymentSuccessSection() {
  return (
    <section className="flex min-h-[calc(100vh-32px)] w-full items-center justify-center border border-border-primary bg-background-primary">
      <div className="flex max-w-xl flex-col items-center text-center">
        <h1 className="type-h2 text-text-primary">Payment Successful</h1>
        <p className="type-m-body-500 mt-6 text-text-primary">
          Your Aluminium plan is now active. We&apos;ve received your payment
          and your request is ready to move forward. Our team will review the
          details and contact you shortly with the next steps.
        </p>
        <ButtonSecondary
          className="mt-12 justify-center"
          href="/"
          icon="none"
          tone="inverse"
        >
          Return To Home
        </ButtonSecondary>
      </div>
    </section>
  );
}
