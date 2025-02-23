import { Customer } from "../types/customer";
import { Invoice } from "../types/invoice";

export const mockCustomers: Customer[] = [
    {
      id: "1",
      name: "John Doe Enterprises",
      email: "john@doeenterprises.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business St, New York, NY 10001",
      vatNumber: "VAT123456",
      registrationNumber: "REG789012",
      totalInvoices: 12,
      totalPaid: 10000,
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Smith Co",
      email: "sarah@smithco.com",
      phone: "+1 (555) 987-6543",
      address: "456 Commerce Ave, Los Angeles, CA 90001",
      vatNumber: "VAT789012",
      registrationNumber: "REG345678",
      totalInvoices: 8,
      totalPaid: 15000,
      status: "active",
    },
    {
      id: "3",
      name: "Tech Solutions Inc",
      email: "contact@techsolutions.com",
      phone: "+1 (555) 456-7890",
      address: "789 Innovation Blvd, San Francisco, CA 94105",
      vatNumber: "VAT345678",
      registrationNumber: "REG901234",
      totalInvoices: 15,
      totalPaid: 25000,
      status: "active",
    },
  ];
export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    dateIssued: '2024-03-20',
    dueDate: '2024-04-19',
    logo: '/company-logo.png',

    companyName: 'Tech Solutions Inc.',
    companyAddress: '123 Business Ave, Tech City, TC 12345',
    companyPhone: '+1 (555) 123-4567',
    companyEmail: 'billing@techsolutions.com',
    companyTaxId: 'TAX-123456789',

    customerName: 'Acme Corp',
    customerAddress: '456 Client Street, Business Town, BT 67890',
    customerPhone: '+1 (555) 987-6543',
    customerEmail: 'accounts@acmecorp.com',
    referenceId: 'PO-2024-001',

    items: [
      {
        id: '1',
        description: 'Web Development Services',
        quantity: 40,
        unitPrice: 150,
        subtotal: 6000,
        tax: 600,
        lineTotal: 6600
      },
      {
        id: '2',
        description: 'UI/UX Design',
        quantity: 20,
        unitPrice: 125,
        subtotal: 2500,
        tax: 250,
        lineTotal: 2750
      }
    ],
    subtotal: 8500,
    taxAmount: 850,
    discount: 600,
    amount: 8750,

    paymentTerms: 'Net 30',
    paymentMethods: ['Bank Transfer', 'Credit Card'],
    bankDetails: 'Bank: ABC Bank\nAccount: 1234567890\nSWIFT: ABCDEF12',
    paymentInstructions: 'Please include invoice number in payment reference',

    notes: 'Thank you for your business!',
    terms: 'Late payments are subject to a 1.5% monthly fee',
    status: 'pending'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-001',
    dateIssued: '2024-03-20',
    dueDate: '2024-04-19',
    logo: '/company-logo.png',

    companyName: 'Tech Solutions Inc.',
    companyAddress: '123 Business Ave, Tech City, TC 12345',
    companyPhone: '+1 (555) 123-4567',
    companyEmail: 'billing@techsolutions.com',
    companyTaxId: 'TAX-123456789',

    customerName: 'Acme Corp',
    customerAddress: '456 Client Street, Business Town, BT 67890',
    customerPhone: '+1 (555) 987-6543',
    customerEmail: 'accounts@acmecorp.com',
    referenceId: 'PO-2024-001',

    items: [
      {
        id: '1',
        description: 'Web Development Services',
        quantity: 40,
        unitPrice: 150,
        subtotal: 6000,
        tax: 600,
        lineTotal: 6600
      },
      {
        id: '2',
        description: 'UI/UX Design',
        quantity: 20,
        unitPrice: 125,
        subtotal: 2500,
        tax: 250,
        lineTotal: 2750
      }
    ],
    subtotal: 8500,
    taxAmount: 850,
    discount: 600,
    amount: 8750,

    paymentTerms: 'Net 30',
    paymentMethods: ['Bank Transfer', 'Credit Card'],
    bankDetails: 'Bank: ABC Bank\nAccount: 1234567890\nSWIFT: ABCDEF12',
    paymentInstructions: 'Please include invoice number in payment reference',

    notes: 'Thank you for your business!',
    terms: 'Late payments are subject to a 1.5% monthly fee',
    status: 'paid'
  },
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    dateIssued: '2024-03-20',
    dueDate: '2024-04-19',
    logo: '/company-logo.png',

    companyName: 'Tech Solutions Inc.',
    companyAddress: '123 Business Ave, Tech City, TC 12345',
    companyPhone: '+1 (555) 123-4567',
    companyEmail: 'billing@techsolutions.com',
    companyTaxId: 'TAX-123456789',

    customerName: 'Acme Corp',
    customerAddress: '456 Client Street, Business Town, BT 67890',
    customerPhone: '+1 (555) 987-6543',
    customerEmail: 'accounts@acmecorp.com',
    referenceId: 'PO-2024-001',

    items: [
      {
        id: '3',
        description: 'Web Development Services',
        quantity: 40,
        unitPrice: 150,
        subtotal: 6000,
        tax: 600,
        lineTotal: 6600
      },
      {
        id: '2',
        description: 'UI/UX Design',
        quantity: 20,
        unitPrice: 125,
        subtotal: 2500,
        tax: 250,
        lineTotal: 2750
      }
    ],
    subtotal: 8500,
    taxAmount: 850,
    discount: 600,
    amount: 8750,

    paymentTerms: 'Net 30',
    paymentMethods: ['Bank Transfer', 'Credit Card'],
    bankDetails: 'Bank: ABC Bank\nAccount: 1234567890\nSWIFT: ABCDEF12',
    paymentInstructions: 'Please include invoice number in payment reference',

    notes: 'Thank you for your business!',
    terms: 'Late payments are subject to a 1.5% monthly fee',
    status: 'overdue'
  },
  

];


  