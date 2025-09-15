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
        .from('activities')
        .insert([{
          title: `Paddy Intake - ${data.weight}kg`,
          description: `Quality: ${data.qualityGrade}, Moisture: ${data.moistureContent}%, Price: $${data.pricePerKg}/kg, Total: $${data.totalAmount}`,
          type: 'paddy_intake',
          entity_type: 'farmer',
          entity_id: data.farmerId,
          user_id: '',  // We'll need to get this from auth context
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