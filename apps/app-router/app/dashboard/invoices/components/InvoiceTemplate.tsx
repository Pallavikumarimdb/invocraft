import { Invoice } from "../../types/invoice";
import { DollarSign } from "lucide-react";
import Image from "next/image";

interface InvoiceTemplateProps {
  invoice: Invoice;
}

export function InvoiceTemplate({ invoice }: InvoiceTemplateProps) {
  const calculateSubtotal = () => {
    return invoice.items?.reduce((acc, item) => 
      acc + (item.quantity * item.unitPrice), 0
    ) || 0;
  };

  const calculateTax = () => {
    return invoice.items?.reduce((acc, item) => {
      const itemTotal = item.quantity * item.unitPrice;
      return acc + (itemTotal * (item.tax || 0));
    }, 0) || 0;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    return subtotal + tax;
  };

  return (
    <div className="bg-white p-8 shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
          <p className="text-gray-600">Invoice Number: {invoice.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <div className="w-32 h-12 bg-gray-200 flex items-center justify-center">
            <p className="text-center">Company Logo</p>
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="flex justify-between mb-8">
        <div>
          <p className="text-gray-600">Date Issued: {invoice.dateIssued}</p>
          <p className="text-gray-600">Due Date: {invoice.dueDate}</p>
        </div>
      </div>

      {/* Company and Client Information */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">From:</h2>
          <div className="text-gray-600">
            <p className="font-bold">{invoice.companyName}</p>
            <p>{invoice.companyAddress}</p>
            <p>Phone: {invoice.companyPhone}</p>
            <p>Email: {invoice.companyEmail}</p>
            <p>Tax ID: {invoice.companyTaxId}</p>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">To:</h2>
          <div className="text-gray-600">
            <p className="font-bold">{invoice.customerName}</p>
            <p>{invoice.customerAddress}</p>
            <p>Phone: {invoice.customerPhone}</p>
            <p>Email: {invoice.customerEmail}</p>
            {invoice.referenceId && <p>Reference: {invoice.referenceId}</p>}
          </div>
        </div>
      </div>

      {/* Invoice Items */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Description</th>
              <th className="text-right p-2">Quantity</th>
              <th className="text-right p-2">Unit Price</th>
              <th className="text-right p-2">Tax</th>
              <th className="text-right p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items?.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.description}</td>
                <td className="text-right p-2">{item.quantity}</td>
                <td className="text-right p-2">${item.unitPrice.toFixed(2)}</td>
                <td className="text-right p-2">{((item.tax || 0) * 100).toFixed(0)}%</td>
                <td className="text-right p-2">
                  ${(item.quantity * item.unitPrice * (1 + (item.tax || 0))).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax:</span>
            <span>${calculateTax().toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Payment Information</h2>
        <div className="text-gray-600">
          <p className="mb-1">Payment Terms: {invoice.paymentTerms}</p>
          <p className="mb-1">Payment Instructions: {invoice.paymentInstructions}</p>
          <p className="mb-1">Bank Details: {invoice.bankDetails}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-8">
        <p>Thank you for your business!</p>
        <p className="mt-2">
          For any queries, please contact us at {invoice.companyEmail} or call {invoice.companyPhone}
        </p>
      </div>
    </div>
  );
} 