export function getLocalDateTime(dateStr: string, timeStr: string) {
  const datePart = dateStr.split("T")[0]; // "2025-08-08"
  const isoDateTime = `${datePart}T${timeStr}Z`; // "2025-08-08T16:30:00Z"
  const date = new Date(isoDateTime);

  if (isNaN(date.getTime())) {
    return { localDate: "Invalid Date", localTime: "Invalid Time" };
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return {
    localDate: date.toLocaleDateString(undefined, dateOptions),
    localTime: date.toLocaleTimeString(undefined, timeOptions),
  };
}
