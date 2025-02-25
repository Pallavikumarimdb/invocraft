'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Users, Plus, Search, Mail, Phone, MapPin, Building2, Eye } from "lucide-react";
import { CustomerDialog } from "./CustomerDialog";
import { Customer } from "../../types/customer";
import apiClient from "@/services/apiClient";
import useCustomers from "@/hooks/useCustomers";
import { useRouter } from "next/navigation";



interface CustomersContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function CustomersContent({ searchQuery, setSearchQuery }: CustomersContentProps) {
  const { customers, setCustomers } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();



  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );




  const handleCustomerClick = (customer: Customer) => {
    router.push(`/dashboard/customers/${customer._id}`);
  };

  const handleSaveCustomer = async (customer: Customer) => {
    try {
      console.log(customer);
      const response = await apiClient.post('/customers', customer);
      setCustomers((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error saving customer:', error);
    } finally {
      setIsDialogOpen(false);
    }
  };


  
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Customers</h1>
        </div>
        <Button onClick={() => {
          setSelectedCustomer({
            name: '',
            email: '',
            phone: '',
            address: '',
            vatNumber: '',
            registrationNumber: '',
            totalInvoices: 0,
            totalPaid: 0,
            status: 'active'
          });
          setIsDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search customers by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredCustomers.map((customer) => (
          <Card
            key={customer._id} // Use customer._id as the key
            className="hover:shadow-md transition-shadow border border-slate-400 dark:border-slate-800 cursor-pointer"
            onClick={() => handleCustomerClick(customer)}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{customer.name}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Mail className="h-4 w-4" />
                        {customer.email}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        {customer.totalInvoices} Invoices
                      </div>
                      <div className="font-semibold">
                        ${customer.totalPaid.toLocaleString()}
                      </div>
                      <div className={`text-sm ${
                        customer.status === 'active' ? 'text-green-500' : 'text-gray-500'
                      }`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4 text-gray-500" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        {customer.address}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-500">VAT:</span> {customer.vatNumber}
                      </div>
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-500">Reg:</span> {customer.registrationNumber}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CustomerDialog
        customer={selectedCustomer}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedCustomer(null);
        }}
        onSave={handleSaveCustomer}
      />
    </div>
  );
}