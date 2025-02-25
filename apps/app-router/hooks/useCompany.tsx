import { useEffect, useState } from 'react';
import apiClient from "@/services/apiClient";
import { Company } from '@/app/dashboard/types/company';

const useCompany = () => {
  const [company, setCompany] = useState<Company | null>(null); // Assume a single company object
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await apiClient.get('/onboarding');
        const { data } = response;
        setCompany(data);
      } catch (err) {
        setError('Error fetching customers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return { company, setCompany, loading, error };
};

export default useCompany;