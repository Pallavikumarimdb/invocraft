export interface InvoiceItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  subtotal?: number;
  discount?: number;
  tax?: number;
  lineTotal?: number;
}


export interface InvoiceStats {
  totalInvoices: number;
  paidInvoices: number;
  totalPaidAmount:number;
  paidPercentage: number;
}



export interface Invoice {
  // Header
  _id?: string;
  invoiceNumber: string;
  dateIssued: string;
  dueDate: string;
  logo?: string;

  // Company Information
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyTaxId: string;

  // Client Information
  customerId: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  referenceId?: string;

  // Items and Totals
  items: InvoiceItem[];
  subtotal: number;
  taxAmount: number;
  discount?: number;
  shippingCharges?: number;
  amount?: number; // Grand Total

  // Payment Information
  paymentTerms: string;
  paymentMethods: string[];
  bankDetails: string;
  paymentInstructions: string;

  // Additional Information
  notes?: string;
  terms?: string;
  status: 'pending' | 'paid' | 'overdue';
} 




export interface InvoiceSettings {
  font: 'inter' | 'roboto' | 'arial';
  primaryColor: string;
  showLogo: boolean;
  showDescription: boolean;
  showContactDetails: boolean;
}