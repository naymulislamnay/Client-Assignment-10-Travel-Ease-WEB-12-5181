export function formatDateTime(isoString) {
    const date = new Date(isoString);

    // --- TIME ---
    const time = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    // --- DATE ---
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year} | ${time}`;
}