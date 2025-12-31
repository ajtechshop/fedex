import { Shipment } from "@/types/shipment";

/**
 * CSV Generation Engine | AJ TECH
 * 
 * Handles escaping and formatting of shipment data into FedEx-compatible CSV strings.
 * Core Logic:
 * - Columns: Package Number, SO/INV, Dimensions (in), Weight (lb).
 * - Dimension units are auto-rounded up (ceil) for logistics compatibility.
 * - Volume (ft³) is for UI display only and is excluded from exported CSV.
 */
export function generateCSV(shipments: Shipment[], globalReference: string): string {
  // Sophisticated headers with units
  const headers = ["Package Number", "SO/INV", "Length (in)", "Width (in)", "Height (in)", "Weight (lb)"];

  // Create CSV rows with new order (SO/INV is 2nd)
  const rows = shipments.map((shipment, index) => [
    (index + 1).toString(), // Package Number
    escapeCSVField(globalReference), // SO/INV
    shipment.length.toString(),
    shipment.width.toString(),
    shipment.height.toString(),
    shipment.weight.toString()
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");

  return csvContent;
}

/**
 * Escapes CSV field values that contain commas, quotes, or newlines
 */
function escapeCSVField(field: string): string {
  if (!field) return "";

  // If field contains comma, quote, or newline, wrap in quotes and escape internal quotes
  if (field.includes(",") || field.includes('"') || field.includes("\n")) {
    return `"${field.replace(/"/g, '""')}"`;
  }

  return field;
}

/**
 * Downloads CSV content as a file
 */
export function downloadCSV(content: string, filename: string = "fedex_shipments.csv"): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
