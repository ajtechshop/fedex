export interface Shipment {
  id: string;
  name: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  reference: string; // INV# or SO#
  residential: boolean;
}

export interface ShipmentFormData {
  name: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  reference: string;
  residential: boolean;
}
