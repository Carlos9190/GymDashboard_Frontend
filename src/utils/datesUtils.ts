export function formatDays(days: string[]): string {
    if (days.length === 0) return "";
    if (days.length === 1) return days[0];
    if (days.length === 2) return `${days[0]} and ${days[1]}`;

    const last = days[days.length - 1];
    const rest = days.slice(0, -1).join(", ");
    return `${rest} and ${last}`;
}

export function formatDate(isoString: string): string {
    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
    return formatter.format(date);
}
