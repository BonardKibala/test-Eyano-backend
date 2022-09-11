export function getFirstAndLastDayOfMonth(month?: number) {
  const now = new Date();
  if (month) {
    now.setMonth(month);
    return {
      firstDayOfMonth: new Date(now.getFullYear(), month, 2),
      lastDayOfMonth: new Date(
        now.getFullYear(),
        month,
        daysInThisMonth(now) + 1,
      ),
    };
  }
  return {
    firstDayOfMonth: new Date(now.getFullYear(), now.getMonth(), 2),
    lastDayOfMonth: new Date(
      now.getFullYear(),
      now.getMonth(),
      daysInThisMonth(now) + 1,
    ),
  };
}

function daysInThisMonth(now: Date) {
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}
