import { useEffect, useState } from 'react';
import apiClient from "@/services/apiClient";
import { Invoice } from '@/app/app/dashboard/types/invoice';

const useInvoices = () => {
   const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await apiClient.get('/invoices');
        const { data } = response;
        setInvoices(data);
      } catch (err) {
        setError('Error fetching customers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return { invoices, setInvoices, loading, error };
};

export default useInvoices;