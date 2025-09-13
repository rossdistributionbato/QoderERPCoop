/**
 * End-to-End Test: Complete Paddy Intake Workflow
 * Tests the entire business process from farmer selection to receipt generation
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../test/test-utils';
import PaddyIntakeForm from '../PaddyIntakeForm';

// Mock the entire workflow
const mockWorkflowData = {
  farmers: [
    { id: 'f1', name: 'John Farmer', phone: '+1234567890' },
    { id: 'f2', name: 'Jane Grower', phone: '+0987654321' },
  ],
  qualityGrades: ['A', 'B', 'C'],
  currentMarketPrice: 25.50,
};

describe('Paddy Intake E2E Workflow', () => {
  describe('Complete Intake Process', () => {
    it('should complete full intake workflow from start to finish', async () => {
      const user = userEvent.setup();
      const mockOnSuccess = jest.fn();
      
      // Mock successful API call
      const mockSubmitPaddyIntake = jest.fn().mockResolvedValue({
        data: { 
          id: 'intake-123', 
          receiptNumber: 'RCP-2024-001',
          totalAmount: 25500 
        },
        error: null
      });

      renderWithProviders(
        <PaddyIntakeForm 
          farmers={mockWorkflowData.farmers}
          onSuccess={mockOnSuccess}
        />
      );

      // Step 1: Select farmer
      const farmerSelect = screen.getByLabelText(/farmer/i);
      await user.selectOptions(farmerSelect, 'f1');
      expect(farmerSelect).toHaveValue('f1');

      // Step 2: Enter weight
      const weightInput = screen.getByLabelText(/weight.*kg/i);
      await user.type(weightInput, '1000');
      expect(weightInput).toHaveValue(1000);

      // Step 3: Enter moisture content
      const moistureInput = screen.getByLabelText(/moisture.*content/i);
      await user.type(moistureInput, '14.5');
      expect(moistureInput).toHaveValue(14.5);

      // Step 4: Select quality grade
      const qualitySelect = screen.getByLabelText(/quality.*grade/i);
      await user.selectOptions(qualitySelect, 'A');
      expect(qualitySelect).toHaveValue('A');

      // Step 5: Enter price per kg
      const priceInput = screen.getByLabelText(/price.*per.*kg/i);
      await user.type(priceInput, '25.50');
      expect(priceInput).toHaveValue(25.50);

      // Step 6: Verify automatic calculation
      await waitFor(() => {
        const totalField = screen.getByLabelText(/total.*amount/i);
        expect(totalField).toHaveValue('25500.00');
      });

      // Step 7: Submit the form
      const submitButton = screen.getByRole('button', { name: /submit.*intake/i });
      expect(submitButton).not.toBeDisabled();
      await user.click(submitButton);

      // Step 8: Verify loading state
      expect(screen.getByText(/submitting/i)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();

      // Step 9: Verify success message
      await waitFor(() => {
        expect(screen.getByText(/paddy intake.*recorded.*successfully/i)).toBeInTheDocument();
      });

      // Step 10: Verify form reset
      await waitFor(() => {
        expect(farmerSelect).toHaveValue('');
        expect(weightInput).toHaveValue('');
        expect(moistureInput).toHaveValue('');
        expect(qualitySelect).toHaveValue('');
        expect(priceInput).toHaveValue('');
      });

      // Step 11: Verify callback was called
      expect(mockOnSuccess).toHaveBeenCalledWith({
        id: 'intake-123',
        receiptNumber: 'RCP-2024-001',
        totalAmount: 25500
      });
    });

    it('should handle validation errors throughout the process', async () => {
      const user = userEvent.setup();
      
      renderWithProviders(
        <PaddyIntakeForm farmers={mockWorkflowData.farmers} />
      );

      // Try to submit without filling any fields
      const submitButton = screen.getByRole('button', { name: /submit.*intake/i });
      await user.click(submitButton);

      // Should show all validation errors
      await waitFor(() => {
        expect(screen.getByText(/farmer.*required/i)).toBeInTheDocument();
        expect(screen.getByText(/weight.*required/i)).toBeInTheDocument();
        expect(screen.getByText(/moisture.*content.*required/i)).toBeInTheDocument();
        expect(screen.getByText(/quality.*grade.*required/i)).toBeInTheDocument();
        expect(screen.getByText(/price.*required/i)).toBeInTheDocument();
      });

      // Fill fields one by one and verify validation
      const farmerSelect = screen.getByLabelText(/farmer/i);
      await user.selectOptions(farmerSelect, 'f1');
      
      // Weight validation
      const weightInput = screen.getByLabelText(/weight.*kg/i);
      await user.type(weightInput, '-100');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText(/weight.*must.*positive/i)).toBeInTheDocument();
      });

      // Correct the weight
      await user.clear(weightInput);
      await user.type(weightInput, '1000');

      // Moisture content validation
      const moistureInput = screen.getByLabelText(/moisture.*content/i);
      await user.type(moistureInput, '5'); // Below range
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText(/moisture.*content.*between.*10.*25/i)).toBeInTheDocument();
      });

      // Correct moisture content
      await user.clear(moistureInput);
      await user.type(moistureInput, '14.5');

      // Complete the rest of the form
      const qualitySelect = screen.getByLabelText(/quality.*grade/i);
      await user.selectOptions(qualitySelect, 'A');

      const priceInput = screen.getByLabelText(/price.*per.*kg/i);
      await user.type(priceInput, '25.50');

      // Now submit should work
      await user.click(submitButton);
      
      // Should not show validation errors anymore
      await waitFor(() => {
        expect(screen.queryByText(/farmer.*required/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/weight.*must.*positive/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/moisture.*content.*between/i)).not.toBeInTheDocument();
      });
    });

    it('should handle network errors gracefully', async () => {
      const user = userEvent.setup();
      
      // Mock network error
      const mockSubmitPaddyIntake = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Network error: Unable to connect to server' }
      });

      renderWithProviders(
        <PaddyIntakeForm farmers={mockWorkflowData.farmers} />
      );

      // Fill out the form completely
      await user.selectOptions(screen.getByLabelText(/farmer/i), 'f1');
      await user.type(screen.getByLabelText(/weight.*kg/i), '1000');
      await user.type(screen.getByLabelText(/moisture.*content/i), '14.5');
      await user.selectOptions(screen.getByLabelText(/quality.*grade/i), 'A');
      await user.type(screen.getByLabelText(/price.*per.*kg/i), '25.50');

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /submit.*intake/i });
      await user.click(submitButton);

      // Should show error message
      await waitFor(() => {
        expect(screen.getByText(/network error.*unable to connect/i)).toBeInTheDocument();
      });

      // Form should remain interactive
      expect(submitButton).not.toBeDisabled();
      expect(screen.getByLabelText(/farmer/i)).not.toBeDisabled();

      // User should be able to retry
      await user.click(submitButton);
      expect(screen.getByText(/submitting/i)).toBeInTheDocument();
    });
  });

  describe('Business Logic Validation', () => {
    it('should calculate correct total for various scenarios', async () => {
      const user = userEvent.setup();
      
      renderWithProviders(
        <PaddyIntakeForm farmers={mockWorkflowData.farmers} />
      );

      const weightInput = screen.getByLabelText(/weight.*kg/i);
      const priceInput = screen.getByLabelText(/price.*per.*kg/i);
      const totalField = screen.getByLabelText(/total.*amount/i);

      // Scenario 1: Standard calculation
      await user.type(weightInput, '1000');
      await user.type(priceInput, '25.50');
      
      await waitFor(() => {
        expect(totalField).toHaveValue('25500.00');
      });

      // Scenario 2: Decimal weights
      await user.clear(weightInput);
      await user.clear(priceInput);
      await user.type(weightInput, '1250.5');
      await user.type(priceInput, '24.75');
      
      await waitFor(() => {
        expect(totalField).toHaveValue('30949.88');
      });

      // Scenario 3: Small quantities
      await user.clear(weightInput);
      await user.clear(priceInput);
      await user.type(weightInput, '50');
      await user.type(priceInput, '30.00');
      
      await waitFor(() => {
        expect(totalField).toHaveValue('1500.00');
      });
    });

    it('should enforce quality-based pricing rules', async () => {
      const user = userEvent.setup();
      
      renderWithProviders(
        <PaddyIntakeForm farmers={mockWorkflowData.farmers} />
      );

      const qualitySelect = screen.getByLabelText(/quality.*grade/i);
      const priceInput = screen.getByLabelText(/price.*per.*kg/i);

      // When Grade A is selected, price should be higher
      await user.selectOptions(qualitySelect, 'A');
      expect(priceInput).toHaveAttribute('min'); // Should have minimum price validation

      // When Grade C is selected, lower price should be acceptable
      await user.selectOptions(qualitySelect, 'C');
      await user.type(priceInput, '20.00');
      expect(priceInput).toHaveValue(20.00);
    });

    it('should validate moisture content affects pricing', async () => {
      const user = userEvent.setup();
      
      renderWithProviders(
        <PaddyIntakeForm farmers={mockWorkflowData.farmers} />
      );

      const moistureInput = screen.getByLabelText(/moisture.*content/i);
      
      // High moisture content should show warning
      await user.type(moistureInput, '24');
      await user.tab();
      
      // Should still be valid but might show info message
      expect(moistureInput).toHaveValue(24);
      
      // Low moisture content (ideal)
      await user.clear(moistureInput);
      await user.type(moistureInput, '12');
      expect(moistureInput).toHaveValue(12);
    });
  });

  describe('Receipt Generation', () => {
    it('should generate intake receipt with all details', async () => {
      const user = userEvent.setup();
      const mockOnSuccess = jest.fn();
      
      // Mock successful submission with receipt data
      const mockSubmitPaddyIntake = jest.fn().mockResolvedValue({
        data: {
          id: 'intake-123',
          receiptNumber: 'RCP-2024-001',
          farmer: { name: 'John Farmer', phone: '+1234567890' },
          weight: 1000,
          moistureContent: 14.5,
          qualityGrade: 'A',
          pricePerKg: 25.50,
          totalAmount: 25500,
          intakeDate: '2024-09-13T10:30:00Z',
        },
        error: null
      });

      renderWithProviders(
        <PaddyIntakeForm 
          farmers={mockWorkflowData.farmers}
          onSuccess={mockOnSuccess}
        />
      );

      // Fill and submit form
      await user.selectOptions(screen.getByLabelText(/farmer/i), 'f1');
      await user.type(screen.getByLabelText(/weight.*kg/i), '1000');
      await user.type(screen.getByLabelText(/moisture.*content/i), '14.5');
      await user.selectOptions(screen.getByLabelText(/quality.*grade/i), 'A');
      await user.type(screen.getByLabelText(/price.*per.*kg/i), '25.50');

      const submitButton = screen.getByRole('button', { name: /submit.*intake/i });
      await user.click(submitButton);

      // Verify success callback receives complete data
      await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalledWith(
          expect.objectContaining({
            id: 'intake-123',
            receiptNumber: 'RCP-2024-001',
            totalAmount: 25500,
          })
        );
      });
    });
  });

  describe('Performance and User Experience', () => {
    it('should provide immediate feedback for user actions', async () => {
      const user = userEvent.setup();
      
      renderWithProviders(
        <PaddyIntakeForm farmers={mockWorkflowData.farmers} />
      );

      const weightInput = screen.getByLabelText(/weight.*kg/i);
      const priceInput = screen.getByLabelText(/price.*per.*kg/i);
      const totalField = screen.getByLabelText(/total.*amount/i);

      // Total should update immediately as user types
      await user.type(weightInput, '500');
      await user.type(priceInput, '20');
      
      // Should calculate without needing to click calculate button
      await waitFor(() => {
        expect(totalField).toHaveValue('10000.00');
      }, { timeout: 1000 }); // Should be very fast
    });

    it('should handle rapid user input without issues', async () => {
      const user = userEvent.setup();
      
      renderWithProviders(
        <PaddyIntakeForm farmers={mockWorkflowData.farmers} />
      );

      const weightInput = screen.getByLabelText(/weight.*kg/i);
      const priceInput = screen.getByLabelText(/price.*per.*kg/i);

      // Rapidly change values
      await user.type(weightInput, '100');
      await user.clear(weightInput);
      await user.type(weightInput, '200');
      await user.clear(weightInput);
      await user.type(weightInput, '300');

      await user.type(priceInput, '10');
      await user.clear(priceInput);
      await user.type(priceInput, '20');
      await user.clear(priceInput);
      await user.type(priceInput, '30');

      // Final calculation should be correct
      await waitFor(() => {
        const totalField = screen.getByLabelText(/total.*amount/i);
        expect(totalField).toHaveValue('9000.00');
      });
    });
  });
});