/**
 * PaddyIntakeForm Component
 * Implemented following TDD approach - tests were written first
 */

'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFarmers } from '@/hooks/useFarmers';
import { usePaddyIntake } from '@/hooks/usePaddyIntake';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Alert } from '@/components/ui/Alert';

// Form validation schema
const paddyIntakeSchema = z.object({
  farmerId: z.string().min(1, 'Farmer is required'),
  weight: z.number().positive('Weight must be positive'),
  moistureContent: z.number()
    .min(10, 'Moisture content must be between 10% and 25%')
    .max(25, 'Moisture content must be between 10% and 25%'),
  qualityGrade: z.enum(['A', 'B', 'C'], { 
    required_error: 'Quality grade is required' 
  }),
  pricePerKg: z.number().positive('Price must be positive'),
});

type PaddyIntakeFormData = z.infer<typeof paddyIntakeSchema>;

interface PaddyIntakeFormProps {
  onCancel?: () => void;
  onSuccess?: (data: any) => void;
  farmers?: any[];
}

export default function PaddyIntakeForm({ 
  onCancel, 
  onSuccess, 
  farmers: propFarmers 
}: PaddyIntakeFormProps) {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const { farmers: hookFarmers, isLoading: farmersLoading } = useFarmers();
  const { submitPaddyIntake, isLoading: submitting, error } = usePaddyIntake();
  
  const farmers = propFarmers || hookFarmers || [];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid }
  } = useForm<PaddyIntakeFormData>({
    resolver: zodResolver(paddyIntakeSchema),
    mode: 'onBlur',
  });

  const weight = watch('weight');
  const pricePerKg = watch('pricePerKg');

  // Auto-calculate total amount
  useEffect(() => {
    if (weight && pricePerKg) {
      const total = weight * pricePerKg;
      setTotalAmount(total);
    } else {
      setTotalAmount(0);
    }
  }, [weight, pricePerKg]);

  const calculateTotal = () => {
    if (weight && pricePerKg) {
      const total = weight * pricePerKg;
      setTotalAmount(total);
    }
  };

  const onSubmit = async (data: PaddyIntakeFormData) => {
    try {
      const submissionData = {
        ...data,
        totalAmount,
        date: new Date().toISOString(),
      };

      const result = await submitPaddyIntake(submissionData);
      
      if (result.error) {
        // Error will be handled by the error state from the hook
        return;
      }

      // Success
      setShowSuccess(true);
      reset();
      setTotalAmount(0);
      
      if (onSuccess) {
        onSuccess(result.data);
      }

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  const handleCancel = () => {
    reset();
    setTotalAmount(0);
    setShowSuccess(false);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Paddy Intake Registration
        </h2>

        {showSuccess && (
          <Alert 
            type="success" 
            message="Paddy intake recorded successfully!"
            className="mb-6"
          />
        )}

        {error && (
          <Alert 
            type="error" 
            message={error.message || 'An error occurred'}
            className="mb-6"
          />
        )}

        <form onSubmit={handleSubmit(onSubmit)} role="form" className="space-y-6">
          {/* Farmer Selection */}
          <div>
            <label htmlFor="farmerId" className="block text-sm font-medium text-gray-700 mb-2">
              Farmer *
            </label>
            <select
              id="farmerId"
              {...register('farmerId')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={farmersLoading || submitting}
            >
              <option value="">Select a farmer</option>
              {farmers.map((farmer) => (
                <option key={farmer.id} value={farmer.id}>
                  {farmer.name} - {farmer.phone}
                </option>
              ))}
            </select>
            {errors.farmerId && (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errors.farmerId.message}
              </p>
            )}
          </div>

          {/* Weight */}
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg) *
            </label>
            <input
              id="weight"
              type="number"
              step="0.1"
              {...register('weight', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={submitting}
            />
            {errors.weight && (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errors.weight.message}
              </p>
            )}
          </div>

          {/* Moisture Content */}
          <div>
            <label htmlFor="moistureContent" className="block text-sm font-medium text-gray-700 mb-2">
              Moisture Content (%) *
            </label>
            <input
              id="moistureContent"
              type="number"
              step="0.1"
              min="10"
              max="25"
              {...register('moistureContent', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={submitting}
            />
            {errors.moistureContent && (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errors.moistureContent.message}
              </p>
            )}
          </div>

          {/* Quality Grade */}
          <div>
            <label htmlFor="qualityGrade" className="block text-sm font-medium text-gray-700 mb-2">
              Quality Grade *
            </label>
            <select
              id="qualityGrade"
              {...register('qualityGrade')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={submitting}
            >
              <option value="">Select quality grade</option>
              <option value="A">Grade A - Premium</option>
              <option value="B">Grade B - Standard</option>
              <option value="C">Grade C - Basic</option>
            </select>
            {errors.qualityGrade && (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errors.qualityGrade.message}
              </p>
            )}
          </div>

          {/* Price per Kg */}
          <div>
            <label htmlFor="pricePerKg" className="block text-sm font-medium text-gray-700 mb-2">
              Price per Kg (₱) *
            </label>
            <input
              id="pricePerKg"
              type="number"
              step="0.01"
              {...register('pricePerKg', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={submitting}
            />
            {errors.pricePerKg && (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errors.pricePerKg.message}
              </p>
            )}
          </div>

          {/* Total Amount (Calculated) */}
          <div>
            <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Total Amount (₱)
            </label>
            <input
              id="totalAmount"
              type="text"
              value={totalAmount.toFixed(2)}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
            />
          </div>

          {/* Calculate Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={calculateTotal}
              className="btn-secondary"
              disabled={!weight || !pricePerKg || submitting}
            >
              Calculate Total
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={!isValid || submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Intake'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}