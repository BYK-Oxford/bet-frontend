export function getLocalDateTime(dateStr: string, timeStr: string) {
  const utcDateTime = new Date(`${dateStr}T${timeStr}Z`);

  const localDate = utcDateTime.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short", // e.g. "Aug"
  });

  const localTime = utcDateTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return { localDate, localTime };
}
