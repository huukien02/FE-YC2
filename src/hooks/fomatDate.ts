// Ví dụ sử dụng:
// formatDate("string", 'dd/MM/yyyy, hh:mm AM/PM'); // "12/10/2024, 12:22 PM"
// formatDate("string", 'dd-MM-yyyy'); // "12-10-2024"
// formatDate("string", 'yyyy/MM/dd'); // "2024/10/12"

export function formatDate(
  dateStr: string,
  formatType: "dd/MM/yyyy, hh:mm AM/PM" | "dd-MM-yyyy" | "yyyy/MM/dd"
): string {
  const date = new Date(dateStr);

  switch (formatType) {
    case "dd/MM/yyyy, hh:mm AM/PM":
      return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

    case "dd-MM-yyyy":
      return date.toLocaleDateString("en-GB").replace(/\//g, "-");

    case "yyyy/MM/dd":
      return date.toLocaleDateString("en-CA");

    default:
      return "Unsupported format";
  }
}
