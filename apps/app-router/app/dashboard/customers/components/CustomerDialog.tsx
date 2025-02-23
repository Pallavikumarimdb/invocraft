'use client';

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit2, Save, X, Trash2 } from "lucide-react";
import { Customer } from "../../types/customer";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";

interface CustomerDialogProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: Customer) => void;
  onDelete?: (customerId: string) => void;
}

export function CustomerDialog({ customer, isOpen, onClose, onSave, onDelete }: CustomerDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(customer);

  useEffect(() => {
    setEditedCustomer(customer);
  }, [customer]);

  const handleInputChange = (field: keyof Customer, value: string | number) => {
    if (editedCustomer) {
      setEditedCustomer({ ...editedCustomer, [field]: value });
    }
  };

  const handleSave = () => {
    if (editedCustomer) {
      onSave(editedCustomer);
      setIsEditing(false);
    }
  };

  const handleStatusToggle = (checked: boolean) => {
    if (editedCustomer) {
      setEditedCustomer({
        ...editedCustomer,
        status: checked ? 'active' : 'inactive'
      });
    }
  };

  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>
              {customer?.name ? `${customer.name}` : 'Add New Customer'}
            </DialogTitle>
            {customer?.id && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={editedCustomer?.status === 'active'}
                    onCheckedChange={handleStatusToggle}
                    disabled={!isEditing}
                  />
                  <span className={`text-sm ${editedCustomer?.status === 'active' ? 'text-green-500' : 'text-gray-500'}`}>
                    {editedCustomer?.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Customer</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this customer? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-700"
                        onClick={() => {
                          if (customer?.id && onDelete) {
                            onDelete(customer.id);
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
          <DialogDescription>
            {customer?.name ? 'View and edit customer details' : 'Enter new customer details'}
          </DialogDescription>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <X className="h-4 w-4 mr-2" />
              ) : (
                <Edit2 className="h-4 w-4 mr-2" />
              )}
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  value={editedCustomer?.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={editedCustomer?.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={editedCustomer?.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Input
                  value={editedCustomer?.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Address</Label>
                <Textarea
                  value={editedCustomer?.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>VAT Number</Label>
                <Input
                  value={editedCustomer?.vatNumber}
                  onChange={(e) => handleInputChange('vatNumber', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>Registration Number</Label>
                <Input
                  value={editedCustomer?.registrationNumber}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>Total Invoices</Label>
                <Input
                  value={editedCustomer?.totalInvoices}
                  type="number"
                  onChange={(e) => handleInputChange('totalInvoices', parseInt(e.target.value))}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>Total Paid</Label>
                <Input
                  value={editedCustomer?.totalPaid}
                  type="number"
                  onChange={(e) => handleInputChange('totalPaid', parseInt(e.target.value))}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {isEditing && (
          <DialogFooter>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
} 