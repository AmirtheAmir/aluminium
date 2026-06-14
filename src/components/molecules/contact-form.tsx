"use client";

import { useState } from "react";

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

function isEmailValid(email: string) {
  return emailPattern.test(email);
}

export function ContactForm({ className, onSubmit }: ContactFormProps) {
  const [values, setValues] = useState(initialValues);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [emailError, setEmailError] = useState("");
  const complete =
    values.firstName.length > 0 &&
    values.lastName.length > 0 &&
    values.email.length > 0 &&
    isEmailValid(values.email) &&
    values.date &&
    values.time.length > 0;

  function updateValue<Key extends keyof ContactFormValues>(
    key: Key,
    value: ContactFormValues[Key],
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));

    if (key === "email") {
      setEmailError("");
    }
  }

  function handleSubmit() {
    if (!isEmailValid(values.email)) {
      setEmailError(emailErrorMessage);
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
    <div className={cn("relative flex h-full gap-20 flex-col justify-between", className)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <FormInput
            onChange={(value) => updateValue("firstName", value)}
            placeholder="First Name"
            value={values.firstName}
          />
          <FormInput
            onChange={(value) => updateValue("lastName", value)}
            placeholder="Last Name"
            value={values.lastName}
          />
        </div>

        <FormInput
          error={emailError}
          onChange={(value) => updateValue("email", value)}
          placeholder="Email"
          type="email"
          value={values.email}
        />

        <div className="relative">
          <div className="flex items-center gap-1">
            <button
              className={cn(
                "type-p-body flex basis-1/2 cursor-pointer border border-x-0 border-t-0 p-4 text-left transition-colors",
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
                "type-p-body flex basis-1/2 cursor-pointer border border-x-0 border-t-0 p-4 text-left transition-colors",
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

          {calendarOpen && (
            <div className="absolute top-[calc(100%+12px)] left-0 z-20 w-108">
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
          multiline
          onChange={(value) => updateValue("message", value)}
          placeholder="Short Message"
          value={values.message}
        />
      </div>

      <ButtonPrimary
        className={cn(
          "w-full",
          !complete && "text-text-tertiary",
        )}
        onClick={handleSubmit}
      >
        Send Request
      </ButtonPrimary>
    </div>
  );
}
