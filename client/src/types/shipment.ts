export interface Shipment {
  id: string;
  length: number;
  width: number;
  height: number;
  weight: number;
}

export interface ShipmentFormData {
  length: string;
  width: string;
  height: string;
  weight: string;
}
