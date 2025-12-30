export interface Shipment {
  id: string;
  company: string;
  attention: string;
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
  reference1?: string;
  reference2?: string;
  residential: boolean;
}

export interface ShipmentFormData {
  company: string;
  attention: string;
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
  reference1: string;
  reference2: string;
  residential: boolean;
}
