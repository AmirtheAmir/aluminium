"use client";

import { useEffect, useRef, useState } from "react";

import { FormInput } from "@/components/atoms/form-input";
import { ButtonPrimary } from "@/components/atoms/button-primary";
import { BookingCalendar } from "@/components/organisms/booking-calendar";
import { cn } from "@/lib/utils";

export interface ContactFormValues {
  date: Date | null;
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  time: string;
}

interface ContactFormProps {
  className?: string;
  onSubmit: () => void;
}

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  date: null,
  email: "",
  firstName: "",
  lastName: "",
  message: "",
  time: "",
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailErrorMessage = "Invalid Email, Please Enter A Valid Email";
const requiredErrorMessage = "This Field Is Required";

function isEmailValid(email: string) {
  return emailPattern.test(email);
}

function isEmpty(value: string) {
  return value.trim().length === 0;
}

export function ContactForm({ className, onSubmit }: ContactFormProps) {
  const calendarWrapperRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState(initialValues);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const complete =
    !isEmpty(values.firstName) &&
    !isEmpty(values.lastName) &&
    !isEmpty(values.email) &&
    isEmailValid(values.email) &&
    values.date &&
    !isEmpty(values.message) &&
    values.time.length > 0;

  useEffect(() => {
    if (!calendarOpen) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (
        target instanceof Node &&
        calendarWrapperRef.current?.contains(target)
      ) {
        return;
      }

      setCalendarOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [calendarOpen]);

  function updateValue<Key extends keyof ContactFormValues>(
    key: Key,
    value: ContactFormValues[Key],
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [key]: undefined,
    }));
  }

  function handleSubmit() {
    const nextErrors: ContactFormErrors = {};

    if (isEmpty(values.firstName)) {
      nextErrors.firstName = requiredErrorMessage;
    }

    if (isEmpty(values.lastName)) {
      nextErrors.lastName = requiredErrorMessage;
    }

    if (!isEmailValid(values.email)) {
      nextErrors.email = emailErrorMessage;
    }

    if (!values.date) {
      nextErrors.date = requiredErrorMessage;
    }

    if (isEmpty(values.message)) {
      nextErrors.message = requiredErrorMessage;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (!complete) {
      return;
    }

    onSubmit();
  }

  function handleDateChange(date: Date) {
    updateValue("date", date);

    if (values.time) {
      setCalendarOpen(false);
    }
  }

  function handleTimeChange(time: string) {
    updateValue("time", time);

    if (values.date) {
      setCalendarOpen(false);
    }
  }

  return (
    <div
      className={cn(
        "relative flex h-full flex-col justify-between gap-12 min-[680px]:gap-20",
        className,
      )}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <FormInput
            error={errors.firstName}
            onChange={(value) => updateValue("firstName", value)}
            placeholder="First Name"
            value={values.firstName}
          />
          <FormInput
            error={errors.lastName}
            onChange={(value) => updateValue("lastName", value)}
            placeholder="Last Name"
            value={values.lastName}
          />
        </div>

        <FormInput
          error={errors.email}
          onChange={(value) => updateValue("email", value)}
          placeholder="Email"
          type="email"
          value={values.email}
        />

        <div className="relative" ref={calendarWrapperRef}>
          <div className="flex items-center gap-1">
            <button
              className={cn(
                "type-m-body-500 max-[679px]:type-s-button-500 flex basis-1/2 cursor-pointer border-b p-4 text-left transition-colors max-[679px]:p-3",
                values.date
                  ? "border-border-secondary text-text-primary"
                  : "border-border-primary text-text-secondary",
              )}
              onClick={() => setCalendarOpen((open) => !open)}
              type="button"
            >
              {values.date ? dateFormatter.format(values.date) : "Date"}
            </button>
            <span className="w-px bg-border-primary" />
            <button
              className={cn(
                "type-m-body-500 max-[679px]:type-s-button-500 flex basis-1/2 cursor-pointer border-b p-4 text-left transition-colors max-[679px]:p-3",
                values.time
                  ? "border-border-secondary text-text-primary"
                  : "border-border-primary text-text-secondary",
              )}
              onClick={() => setCalendarOpen((open) => !open)}
              type="button"
            >
              {values.time || "10:00"}
            </button>
          </div>
          {errors.date && (
            <p className="type-xs-button-500 absolute left-0 -bottom-5 text-text-tertiary">
              {errors.date}
            </p>
          )}

          {calendarOpen && (
            <div className="absolute top-[calc(100%+12px)] left-0 z-20 w-full">
              <BookingCalendar
                onDateChange={handleDateChange}
                onTimeChange={handleTimeChange}
                selectedDate={values.date}
                selectedTime={values.time}
              />
            </div>
          )}
        </div>

        <FormInput
          className="h-42"
          error={errors.message}
          multiline
          onChange={(value) => updateValue("message", value)}
          placeholder="Short Message"
          value={values.message}
        />
      </div>

      <ButtonPrimary
        className={cn(
          "w-full lg:w-full",
          !complete && "text-text-tertiary",
        )}
        onClick={handleSubmit}
      >
        Send Request
      </ButtonPrimary>
    </div>
  );
}
