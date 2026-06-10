"use client";

import { useCallback, useEffect, useState } from "react";

import { ContactRequestForm } from "@/components/molecules/contact-request-form";

interface ContactRequestModalProps {
  onClose: () => void;
  open: boolean;
}

export function ContactRequestModal({
  onClose,
  open,
}: ContactRequestModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleClose = useCallback(() => {
    setSubmitted(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background-tinted p-6 backdrop-blur-[16px]"
      onClick={handleClose}
    >
      <section
        aria-modal="true"
        className="grid min-h-[416px] w-full max-w-5xl grid-cols-1 gap-4 border border-border-secondary bg-background-primary p-4 md:w-8/12 md:grid-cols-2"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        {submitted ? (
          <div className="col-span-full flex min-h-[384px] flex-col items-center justify-center text-center">
            <h2 className="type-h2 text-text-primary uppercase">
              Successfully Sent
            </h2>
            <p className="type-p-body mt-6 max-w-md text-text-primary">
              Thank you for reaching out.
              <br />
              Our support team will review your message and get back to you
              shortly.
            </p>
          </div>
        ) : (
          <>
            <div className="flex min-h-[384px] flex-col justify-between">
              <div className="flex flex-col gap-8">
                <h2 className="type-h2 text-text-primary uppercase">
                  Talk To Aluminium
                </h2>
                <h3 className="type-h5 text-text-primary uppercase">
                  Ready To Structure Your Team&apos;s Process?
                </h3>
              </div>

              <p className="type-p-body text-text-primary">
                Leave your phone number, email, and a short message about your
                current situation. Our support team will review your request and
                get back to you with the next step.
              </p>
            </div>

            <div className="min-w-0">
              <ContactRequestForm onSubmit={() => setSubmitted(true)} />
            </div>
          </>
        )}
      </section>
    </div>
  );
}
