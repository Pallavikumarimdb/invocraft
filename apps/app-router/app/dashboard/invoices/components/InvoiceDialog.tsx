"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Minus } from "lucide-react";
import { Invoice, InvoiceItem } from "../../types/invoice";
import useCustomers from "@/hooks/useCustomers";
import { Textarea } from "@/components/ui/textarea";
import { InvoiceTemplate } from "./InvoiceTemplate";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InvoiceDialogProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: Invoice) => void;
  onDelete?: (invoiceId: string) => void;
}

export function InvoiceDialog({ invoice, isOpen, onClose, onSave, onDelete }: InvoiceDialogProps) {
  const { customers } = useCustomers(); 
  const [editedInvoice, setEditedInvoice] = useState<Invoice | null>(invoice);

  useEffect(() => {
    setEditedInvoice(invoice);
  }, [invoice]);

  const handleInputChange = (field: keyof Invoice, value: any) => {
    if (editedInvoice) {
      setEditedInvoice({ ...editedInvoice, [field]: value });
    }
  };

  const handleCustomerSelect = (customerName: string) => {
    const selectedCustomer = customers.find(c => c.name === customerName);

    if (selectedCustomer && editedInvoice) {
      setEditedInvoice({
        ...editedInvoice,
        //@ts-ignore
        customerId: selectedCustomer._id,
        customerName: selectedCustomer.name,
        customerAddress: selectedCustomer.address,
        customerPhone: selectedCustomer.phone,
        customerEmail: selectedCustomer.email

      });
    }
  };

  const addItem = () => {
    if (editedInvoice) {
      setEditedInvoice({
        ...editedInvoice,
        items: [
          ...editedInvoice.items,
          {
            description: '',
            quantity: 1,
            unitPrice: 0,
            tax: 0,
            subtotal: 0,
            lineTotal: 0
          }
        ]
      });
    }
  };

  const removeItem = (index: number) => {
    if (editedInvoice) {
      const newItems = [...editedInvoice.items];
      newItems.splice(index, 1);
      setEditedInvoice({
        ...editedInvoice,
        items: newItems
      });
    }
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    if (editedInvoice) {
      //@ts-ignore
      setEditedInvoice((prevInvoice) => {
        const newItems = [...(prevInvoice?.items || [])];
        //@ts-ignore
        newItems[index] = {
          ...newItems[index],
          [field]: value, 
          subtotal:
            field === 'quantity' || field === 'unitPrice'
              ? (newItems[index]?.quantity || 0) * (field === 'unitPrice' ? value : newItems[index]?.unitPrice || 0)
              : newItems[index]?.subtotal || 0,
          lineTotal:
            field === 'quantity' || field === 'unitPrice' || field === 'tax'
              ? (newItems[index]?.quantity || 0) * (newItems[index]?.unitPrice || 0) * (1 + (field === 'tax' ? value / 100 : newItems[index]?.tax || 0))
              : newItems[index]?.lineTotal || 0,
        };
  
        return { ...prevInvoice, items: newItems };
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-[900px] max-h-[700px] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>
              {invoice?._id ? `Invoice: ${invoice.invoiceNumber}` : 'Create New Invoice'}
            </DialogTitle>
            {invoice?._id && (
              <div className="flex items-center gap-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-red-500 mr-8 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Invoice</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this invoice? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-700"
                        onClick={() => {
                          if (invoice?._id && onDelete) {
                            onDelete(invoice._id);
                            onClose();
                          }
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        </DialogHeader>

        <Tabs defaultValue="edit" className="w-full">
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Invoice Number</Label>
                <Input
                  value={editedInvoice?.invoiceNumber}
                  onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Customer</Label>
                <Select
                  value={editedInvoice?.customerName}
                  onValueChange={handleCustomerSelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer._id} value={customer.name}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Bill To</Label>
                <Textarea
                  value={editedInvoice?.customerAddress}
                  disabled={true}
                  className="h-20"
                />
              </div>
              <div className="space-y-2">
                <Label>Issue Date</Label>
                <Input
                  type="date"
                  value={editedInvoice?.dateIssued}
                  onChange={(e) => handleInputChange('dateIssued', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={editedInvoice?.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                />
              </div>
              {/* <div className="space-y-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={editedInvoice?.amount}
                  onChange={(e) => handleInputChange('amount', parseFloat(e.target.value))}
                />
              </div> */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={editedInvoice?.status}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Invoice Items */}
            <div className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Invoice Items</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addItem}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
              <div className="space-y-4">
                {editedInvoice?.items?.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-4">
                      <Label>Description</Label>
                      <Input
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>Unit Price</Label>
                      <Input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>Tax (%)</Label>
                      <Input
                        type="number"
                        value={item.tax ? item.tax * 100 : ''}
                        onChange={(e) => updateItem(index, 'tax', parseFloat(e.target.value) / 100)}
                      />
                    </div>
                    <div className="col-span-1">
                      <Label>Total</Label>
                      <p className="mt-2 text-sm text-slate-200">
                        ${
                          //@ts-ignore
                        (item.quantity * item.unitPrice * (1 + (item.tax || 0))).toFixed(2)}
                      </p>
                    </div>
                      <div className="col-span-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(index)}
                          className="mt-8 text-red-500 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    {/* )} */}
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-4 mt-6">
              <h3 className="font-medium">Payment Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Payment Terms</Label>
                  <Input
                    value={editedInvoice?.paymentTerms}
                    onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                    placeholder="e.g., Net 30"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Payment Methods</Label>
                  <Input
                    value={editedInvoice?.paymentMethods?.join(', ')}
                    onChange={(e) => handleInputChange('paymentMethods', e.target.value.split(',').map(m => m.trim()))}
                    placeholder="e.g., Bank Transfer, Credit Card"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Payment Instructions</Label>
                  <Textarea
                    value={editedInvoice?.paymentInstructions}
                    onChange={(e) => handleInputChange('paymentInstructions', e.target.value)}
                    placeholder="Please include invoice number in payment reference"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Bank Details</Label>
                  <Textarea
                    value={editedInvoice?.bankDetails}
                    onChange={(e) => handleInputChange('bankDetails', e.target.value)}
                    placeholder="Bank: ABC Bank&#10;Account: 1234567890&#10;SWIFT: ABCDEF12"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="font-medium">Additional Information</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
                    value={editedInvoice?.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Thank you for your business!"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Terms & Conditions</Label>
                  <Textarea
                    value={editedInvoice?.terms}
                    onChange={(e) => handleInputChange('terms', e.target.value)}
                    placeholder="Late payments are subject to a 1.5% monthly fee"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <div className="overflow-y-auto">
              {editedInvoice && <InvoiceTemplate invoice={editedInvoice} />}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => {
                if (editedInvoice) {
                  onSave(editedInvoice);
                }
              }}>
                <span className="text-slate-300 dark:text-slate-300">Save</span>
              </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
