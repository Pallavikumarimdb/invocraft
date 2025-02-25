import { useEffect, useState } from 'react';
import apiClient from "@/services/apiClient";
import { Customer } from '@/app/dashboard/types/customer';

const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await apiClient.get('/customers');
        const { data } = response;
        setCustomers(data);
      } catch (err) {
        setError('Error fetching customers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return { customers, setCustomers, loading, error };
};

export default useCustomers;