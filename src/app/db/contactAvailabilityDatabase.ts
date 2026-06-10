const unavailableDatesByMonth: Record<string, number[]> = {
  "2026-06": [3, 8, 12, 17, 23, 29],
};

function getMonthKey(year: number, month: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

function createUnavailableDates(year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dates = new Set<number>();
  let seed = year * 37 + month * 19;

  while (dates.size < 6) {
    seed = (seed * 17 + 11) % daysInMonth;
    dates.add(seed + 1);
  }

  return Array.from(dates);
}

export function getUnavailableContactDates(year: number, month: number) {
  return (
    unavailableDatesByMonth[getMonthKey(year, month)] ??
    createUnavailableDates(year, month)
  );
}
