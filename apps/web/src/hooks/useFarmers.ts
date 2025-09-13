/**
 * useFarmers Hook
 * Manages farmer data and operations
 */

import { useState, useEffect } from 'react';
import { useSupabase } from '@/app/providers';

interface Farmer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  registrationDate: string;
  isActive: boolean;
}

interface FarmersHook {
  farmers: Farmer[];
  isLoading: boolean;
  error: any;
  refetch: () => Promise<void>;
  createFarmer: (farmer: Partial<Farmer>) => Promise<{ data: any; error: any }>;
  updateFarmer: (id: string, farmer: Partial<Farmer>) => Promise<{ data: any; error: any }>;
  deleteFarmer: (id: string) => Promise<{ data: any; error: any }>;
}

export function useFarmers(): FarmersHook {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { supabase } = useSupabase();

  const fetchFarmers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('farmers')
        .select('*')
        .order('name');

      if (fetchError) {
        setError(fetchError);
        return;
      }

      const mappedFarmers = data?.map((farmer: any) => ({
        id: farmer.id,
        name: farmer.name,
        email: farmer.email,
        phone: farmer.phone,
        address: farmer.address,
        registrationDate: farmer.registration_date,
        isActive: farmer.is_active,
      })) || [];

      setFarmers(mappedFarmers);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createFarmer = async (farmerData: Partial<Farmer>) => {
    try {
      const { data, error: createError } = await supabase
        .from('farmers')
        .insert([{
          name: farmerData.name,
          email: farmerData.email,
          phone: farmerData.phone,
          address: farmerData.address,
          is_active: farmerData.isActive ?? true,
          registration_date: new Date().toISOString(),
        }])
        .select()
        .single();

      if (createError) {
        return { data: null, error: createError };
      }

      // Refresh the list
      await fetchFarmers();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const updateFarmer = async (id: string, farmerData: Partial<Farmer>) => {
    try {
      const { data, error: updateError } = await supabase
        .from('farmers')
        .update({
          name: farmerData.name,
          email: farmerData.email,
          phone: farmerData.phone,
          address: farmerData.address,
          is_active: farmerData.isActive,
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        return { data: null, error: updateError };
      }

      // Refresh the list
      await fetchFarmers();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const deleteFarmer = async (id: string) => {
    try {
      const { data, error: deleteError } = await supabase
        .from('farmers')
        .delete()
        .eq('id', id);

      if (deleteError) {
        return { data: null, error: deleteError };
      }

      // Refresh the list
      await fetchFarmers();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  return {
    farmers,
    isLoading,
    error,
    refetch: fetchFarmers,
    createFarmer,
    updateFarmer,
    deleteFarmer,
  };
}