'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Building2, Mail, MapPin, Phone, Edit2, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CustomerDialog } from '../components/CustomerDialog';
import apiClient from '@/services/apiClient';
import { Customer } from '../../types/customer';
import useInvoices from '@/hooks/useInvoices';
import InvoiceBox from '../../invoices/components/InvoiceBox';
import { InvoiceStats } from '../../types/invoice';


export default function CustomerDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const { invoices } = useInvoices()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [stats, setStats] = useState<InvoiceStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (customer?._id) {
          const response = await apiClient.get(`/invoices/stats/${customer._id}`);
          setStats(response.data);
        }
      } catch (error) {
        console.error("Error fetching invoice stats:", error);
      }
    };

    if (customer?._id) {
      fetchStats();
    }
  }, [customer?._id]);


  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (!id) return;
      try {
        const response = await apiClient.get(`/customers/${id}`);
        setCustomer(response.data);
      } catch (err) {
        setError('Error fetching customer details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  const filteredInvoices = invoices.filter((invoice) => invoice.customerId === id);
  console.log(invoices.filter((invoice) => invoice.customerId));
  const handleSaveCustomer = async (updatedCustomer: Customer) => {
    try {
      const response = await apiClient.put(`/customers/${id}`, updatedCustomer);
      setCustomer(response.data);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleDeleteCustomer = async () => {
    try {
      await apiClient.delete(`/customers/${id}`);
      router.push('/dashboard/customers/');
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error || !customer) {
    return <div className="text-red-500 text-center ">{error || 'Customer not found'}</div>;
  }

  return (
    <div className="container  mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Customers
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsDialogOpen(true)}
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Edit Customer
        </Button>
      </div>

      <div className="">
        <div className="pb-10 lg:col-span-1">
          <div className="bg-[#0f0e0d] rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-xl font-bold">{customer.name}</h1>
              <div className={`text-sm px-2 py-1 rounded-full ${customer.status === 'active' ? ' text-green-500' : 'bg-gray-100 text-gray-800'
                }`}>
                {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-500" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>{customer.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-gray-500" />
                <div>
                  <div>VAT: {customer.vatNumber}</div>
                  <div>Reg: {customer.registrationNumber}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] text-slate-200 rounded-lg  flex flex-col items-center">
                  <div className="text-sm text-slate-200">Total Invoices</div>
                  <div className="text-xl font-semibold text-gray-400">{stats?.totalInvoices ?? 0}</div>
                </div>
                <div className="p-4 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] text-slate-300 rounded-lg flex flex-col items-center">
                  <div className="text-sm text-slate-200">Paid Invoices</div>
                  <div className="text-xl font-semibold text-green-600">{stats?.paidInvoices ?? 0}</div>
                </div>
                <div className="p-4 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] text-slate-300 rounded-lg  flex flex-col items-center">
                  <div className="text-sm text-slate-200">Total Paid</div>
                  <div className="text-xl font-semibold text-blue-600">${stats?.totalPaidAmount ?? 0}</div>

                  <div className="mt-4 text-sm text-gray-400">
                    <span className="font-medium">Paid Percentage:</span> {stats?.paidPercentage.toFixed(2) ?? 0}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-lg border border-slate-400 dark:border-slate-800 shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Invoices</h2>

            <div className="grid gap-4">
              <InvoiceBox
                filteredInvoices={filteredInvoices}
              />
            </div>
          </div>
        </div>
      </div>

      <CustomerDialog
        customer={customer}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveCustomer}
        onDelete={handleDeleteCustomer}
      />
    </div>
  );
}