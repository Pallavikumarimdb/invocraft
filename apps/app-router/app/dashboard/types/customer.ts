export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  vatNumber: string;
  registrationNumber: string;
  totalInvoices: number;
  totalPaid: number;
  status: "active" | "inactive";
} 