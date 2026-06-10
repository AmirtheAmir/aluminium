"use client";

import { useMemo, useState } from "react";

import { getUnavailableContactDates } from "@/app/db/contactAvailabilityDatabase";
import { ChevronLeftIcon } from "@/components/ui/chevron-left";
import { ChevronRightIcon } from "@/components/ui/chevron-right";
import { cn } from "@/lib/utils";

interface ContactCalendarProps {
  onDateChange: (date: Date) => void;
  onTimeChange: (time: string) => void;
  selectedDate: Date | null;
  selectedTime: string;
}

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
});

const timeSlots = Array.from({ length: 48 }, (_, index) => {
  const hours = Math.floor(index / 2);
  const minutes = index % 2 === 0 ? "00" : "30";

  return `${String(hours).padStart(2, "0")}:${minutes}`;
});

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
}

function isSameDate(date: Date | null, year: number, month: number, day: number) {
  return (
    date?.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day
  );
}

export function ContactCalendar({
  onDateChange,
  onTimeChange,
  selectedDate,
  selectedTime,
}: ContactCalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = selectedDate ?? new Date();

    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const unavailableDates = useMemo(
    () => getUnavailableContactDates(year, month),
    [month, year],
  );
  const days = useMemo(() => getCalendarDays(year, month), [month, year]);

  function changeMonth(direction: number) {
    setVisibleMonth((currentMonth) => {
      return new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + direction,
        1,
      );
    });
  }

  return (
    <div className="grid w-full grid-cols-4 gap-1 bg-background-inverse p-2 text-text-inverse">
      <div className="col-span-3 flex flex-col gap-3">
        <div className="grid grid-cols-3 items-center text-text-inverse">
          <button
            aria-label="Previous month"
            className="flex size-7 cursor-pointer items-center justify-center"
            onClick={() => changeMonth(-1)}
            type="button"
          >
            <ChevronLeftIcon aria-hidden="true" size={16} />
          </button>
          <p className="type-xs-button-strong text-center">
            {monthFormatter.format(visibleMonth)}
          </p>
          <button
            aria-label="Next month"
            className="ml-auto flex size-7 cursor-pointer items-center justify-center"
            onClick={() => changeMonth(1)}
            type="button"
          >
            <ChevronRightIcon aria-hidden="true" size={16} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-y-2">
          {weekDays.map((day) => (
            <span
              className="type-xs-button flex size-7 items-center justify-center text-text-inactive-inverse-primary"
              key={day}
            >
              {day}
            </span>
          ))}
          {days.map((day, index) => {
            if (!day) {
              return <span aria-hidden="true" className="size-7" key={index} />;
            }

            const unavailable = unavailableDates.includes(day);
            const selected = isSameDate(selectedDate, year, month, day);

            return (
              <button
                className={cn(
                  "type-xs-button flex size-7 items-center justify-center transition-colors",
                  selected
                    ? "bg-background-primary text-text-primary"
                    : "text-text-inverse",
                  unavailable &&
                    "cursor-not-allowed text-text-inactive-inverse-primary line-through",
                  !unavailable && "cursor-pointer",
                )}
                disabled={unavailable}
                key={day}
                onClick={() => onDateChange(new Date(year, month, day))}
                type="button"
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div className="scrollbar-none col-span-1 flex max-h-64 flex-col gap-1 overflow-y-auto border-l border-border-tertiary pl-1">
        {timeSlots.map((time) => {
          const selected = selectedTime === time;

          return (
            <button
              className={cn(
                "type-xs-button flex  cursor-pointer items-center justify-center p-3 transition-colors",
                selected
                  ? "bg-background-primary text-text-primary"
                  : "bg-background-inverse-secondary text-text-inactive-inverse-primary",
              )}
              key={time}
              onClick={() => onTimeChange(time)}
              type="button"
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}
