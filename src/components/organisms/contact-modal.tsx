"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ContactForm } from "@/components/molecules/contact-form";
import { XIcon } from "@/components/ui/x";

interface ContactModalProps {
  onClose: () => void;
  open: boolean;
}

export function ContactModal({
  onClose,
  open,
}: ContactModalProps) {
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

  useEffect(() => {
    if (!open || !submitted) return;

    const timeoutId = window.setTimeout(handleClose, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [handleClose, open, submitted]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-background-tinted p-6 backdrop-blur-sm"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={handleClose}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          <motion.section
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-modal="true"
            className="grid min-h-162 w-6/12 grid-cols-1 gap-4 border border-border-secondary bg-background-primary p-4 md:grid-cols-2"
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {submitted ? (
              <div className="col-span-full flex h-full flex-col items-center justify-center text-center">
                <h2 className="type-h2 text-text-primary uppercase">
                  Successfully Sent
                </h2>
                <p className="type-m-body-500 mt-6 max-w-md text-text-primary">
                  Thank you for reaching out.
                  <br />
                  Our support team will review your message and get back to you
                  shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="flex min-h-0 flex-col justify-between">
                  <div className="flex flex-col gap-8">
                    <h2 className="type-h2 text-text-primary uppercase">
                      Talk To Aluminium
                    </h2>
                    <h3 className="type-h5 text-text-primary uppercase">
                      Ready To Structure Your Team&apos;s Process?
                    </h3>
                  </div>

                  <p className="type-m-body-500 text-text-primary">
                    Leave your phone number, email, and a short message about
                    your current situation. Our support team will review your
                    request and get back to you with the next step.
                  </p>
                </div>

                <div className="flex min-w-0 flex-col gap-1">
                  <button
                    aria-label="Close contact modal"
                    className="ml-auto flex cursor-pointer items-center justify-center text-text-primary"
                    onClick={handleClose}
                    type="button"
                  >
                    <XIcon aria-hidden="true" size={18} />
                  </button>
                  <ContactForm
                    className="min-h-0 flex-1"
                    onSubmit={() => setSubmitted(true)}
                  />
                </div>
              </>
            )}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
