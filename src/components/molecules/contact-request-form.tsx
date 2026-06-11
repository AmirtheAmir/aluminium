"use client";

import { useState } from "react";

import { ContactInput } from "@/components/atoms/contact-input";
import { PrimaryButton } from "@/components/atoms/primary-button";
import { ContactCalendar } from "@/components/organisms/contact-calendar";
import { cn } from "@/lib/utils";

export interface ContactFormValues {
  date: Date | null;
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  time: string;
}

interface ContactRequestFormProps {
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

export function ContactRequestForm({ onSubmit }: ContactRequestFormProps) {
  const [values, setValues] = useState(initialValues);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const complete =
    values.firstName.length > 0 &&
    values.lastName.length > 0 &&
    values.email.length > 0 &&
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
  }

  function handleSubmit() {
    if (!complete) return;

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
    <div className="relative flex flex-col">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <ContactInput
            onChange={(value) => updateValue("firstName", value)}
            placeholder="First Name"
            value={values.firstName}
          />
          <ContactInput
            onChange={(value) => updateValue("lastName", value)}
            placeholder="Last Name"
            value={values.lastName}
          />
        </div>

        <ContactInput
          onChange={(value) => updateValue("email", value)}
          placeholder="Email"
          value={values.email}
        />

        <div className="relative">
          <div className="flex items-center gap-1">
            <button
              className={cn(
                "type-p-body flex basis-3/4 cursor-pointer border border-x-0 border-t-0 p-4 text-left transition-colors",
                values.date
                  ? "border-border-secondary text-text-primary"
                  : "border-border-primary text-text-secondary",
              )}
              onClick={() => setCalendarOpen((open) => !open)}
              type="button"
            >
              {values.date ? dateFormatter.format(values.date) : "Date"}
            </button>
            <span className="h-6 w-px bg-border-primary" />
            <button
              className={cn(
                "type-p-body flex basis-1/4 cursor-pointer border border-x-0 border-t-0 p-4 text-left transition-colors",
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
            <div className="absolute top-[calc(100%+12px)] left-0 z-20 w-full">
              <ContactCalendar
                onDateChange={handleDateChange}
                onTimeChange={handleTimeChange}
                selectedDate={values.date}
                selectedTime={values.time}
              />
            </div>
          )}
        </div>

        <ContactInput
          className="h-42"
          multiline
          onChange={(value) => updateValue("message", value)}
          placeholder="Short Message"
          value={values.message}
        />
      </div>

      <PrimaryButton
        className={cn(
          "mt-20 w-full",
          !complete && "text-text-tertiary",
        )}
        onClick={handleSubmit}
      >
        Send Request
      </PrimaryButton>
    </div>
  );
}
