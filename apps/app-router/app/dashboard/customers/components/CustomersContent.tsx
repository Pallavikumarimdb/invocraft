'use client';

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Users, Plus, Search, Mail, Phone, MapPin, Building2, ArrowUpRight, Eye } from "lucide-react";
import { CustomerDialog } from "./CustomerDialog";
import { Customer } from "../../types/customer";
import { mockCustomers } from "../../data/mockData";
import axios from "axios";
import apiClient from "@/services/apiClient";



interface CustomersContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function CustomersContent({ searchQuery, setSearchQuery }: CustomersContentProps) {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDialogOpen(true);
  };


  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch('/customers'); 
      const data = await response.json();
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  const handleSaveCustomer = async (customer: Customer) => {
    try {
        const { data } = await apiClient.post('/customers', customer);
        setCustomers((prev) => [...prev, data]);
    } catch (error) {
      console.error('Error saving customer:', error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    try {
      await axios.delete(`/customers/${customerId}`);
      setCustomers((prev) => prev.filter((c) => c.id !== customerId));
    } catch (error) {
      console.error('Error deleting customer:', error);
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
            id: String(Date.now()), // Temporary ID for new customer
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
            key={customer.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleCustomerClick(customer)}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{customer.name}</h3>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card click event
                            handleCustomerClick(customer);
                          }}
                        >
                          <Eye className="h-3 w-3" />
                          <span>View/Edit</span>
                        </Button>
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
        onDelete={handleDeleteCustomer}
      />
    </div>
  );
} 