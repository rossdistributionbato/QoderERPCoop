/**
 * usePaddyIntake Hook
 * Manages paddy intake operations and state
 */

import { useState } from 'react';
import { useSupabase } from '@/app/providers';

interface PaddyIntakeData {
  farmerId: string;
  weight: number;
  moistureContent: number;
  qualityGrade: 'A' | 'B' | 'C';
  pricePerKg: number;
  totalAmount: number;
  date: string;
}

interface PaddyIntakeHook {
  submitPaddyIntake: (data: PaddyIntakeData) => Promise<{ data: any; error: any }>;
  isLoading: boolean;
  error: any;
}

export function usePaddyIntake(): PaddyIntakeHook {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { supabase } = useSupabase();

  const submitPaddyIntake = async (data: PaddyIntakeData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: result, error: submitError } = await supabase
        .from('paddy_intakes')
        .insert([{
          farmer_id: data.farmerId,
          weight: data.weight,
          moisture_content: data.moistureContent,
          quality_grade: data.qualityGrade,
          price_per_kg: data.pricePerKg,
          total_amount: data.totalAmount,
          intake_date: data.date,
          created_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (submitError) {
        setError(submitError);
        return { data: null, error: submitError };
      }

      return { data: result, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitPaddyIntake,
    isLoading,
    error,
  };
}