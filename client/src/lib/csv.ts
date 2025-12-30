import { Shipment } from "@/types/shipment";

/**
 * Converts an array of shipments to FedEx-compatible CSV format
 */
export function generateCSV(shipments: Shipment[]): string {
  // FedEx CSV headers (all lowercase as per spec)
  const headers = [
    "company",
    "attention",
    "street1",
    "street2",
    "city",
    "state",
    "zipcode",
    "width",
    "height",
    "length",
    "weight",
    "carrier",
    "service",
    "phone",
    "reference1",
    "reference2",
    "invoice",
    "options1",
    "options2",
    "options3",
    "email1",
    "email2",
    "email3",
    "residential",
    "fedex_po",
    "fedex_dp",
    "box",
    "order_name"
  ];

  // Create CSV rows
  const rows = shipments.map(shipment => [
    escapeCSVField(shipment.company),
    escapeCSVField(shipment.attention),
    escapeCSVField(shipment.street1),
    escapeCSVField(shipment.street2 || ""),
    escapeCSVField(shipment.city),
    escapeCSVField(shipment.state),
    escapeCSVField(shipment.zipcode),
    shipment.width.toString(),
    shipment.height.toString(),
    shipment.length.toString(),
    shipment.weight.toString(),
    "FEDEX", // Default carrier
    "FEDEX_GROUND", // Default service
    escapeCSVField(shipment.phone),
    escapeCSVField(shipment.reference1 || ""),
    escapeCSVField(shipment.reference2 || ""),
    "", // invoice
    "", // options1
    "", // options2
    "", // options3
    "", // email1
    "", // email2
    "", // email3
    shipment.residential ? "true" : "", // residential
    "", // fedex_po
    "", // fedex_dp
    "", // box
    "" // order_name
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
