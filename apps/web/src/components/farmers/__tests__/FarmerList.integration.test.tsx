/**
 * FarmerList Integration Tests
 * Tests the complete farmer list functionality with real-world scenarios
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../test/test-utils';
import FarmerList from '../FarmerList';

// Mock API responses
const mockFarmers = [
  {
    id: '1',
    name: 'John Farmer',
    email: 'john@example.com',
    phone: '+1234567890',
    address: '123 Farm Road',
    registrationDate: '2024-01-15',
    isActive: true,
  },
  {
    id: '2', 
    name: 'Jane Grower',
    email: 'jane@example.com',
    phone: '+0987654321',
    address: '456 Agriculture Ave',
    registrationDate: '2024-02-20',
    isActive: true,
  },
  {
    id: '3',
    name: 'Bob Producer',
    email: 'bob@example.com', 
    phone: '+1122334455',
    address: '789 Harvest Lane',
    registrationDate: '2024-03-10',
    isActive: false,
  },
];

describe('FarmerList Integration Tests', () => {
  describe('Data Loading and Display', () => {
    it('should render farmer list with all farmer information', () => {
      renderWithProviders(<FarmerList farmers={mockFarmers} />);

      // Check header
      expect(screen.getByRole('heading', { name: /farmers/i })).toBeInTheDocument();

      // Check all farmers are displayed
      expect(screen.getByText('John Farmer')).toBeInTheDocument();
      expect(screen.getByText('Jane Grower')).toBeInTheDocument();
      expect(screen.getByText('Bob Producer')).toBeInTheDocument();

      // Check contact information
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('+1234567890')).toBeInTheDocument();
    });

    it('should show active/inactive status correctly', () => {
      renderWithProviders(<FarmerList farmers={mockFarmers} />);

      // Active farmers should show active status
      const johnRow = screen.getByText('John Farmer').closest('tr');
      expect(johnRow).toHaveTextContent(/active/i);

      const janeRow = screen.getByText('Jane Grower').closest('tr');
      expect(janeRow).toHaveTextContent(/active/i);

      // Inactive farmer should show inactive status
      const bobRow = screen.getByText('Bob Producer').closest('tr');
      expect(bobRow).toHaveTextContent(/inactive/i);
    });
  });

  describe('Search Functionality', () => {
    it('should filter farmers by name', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FarmerList farmers={mockFarmers} />);

      const searchInput = screen.getByPlaceholderText(/search farmers/i);
      await user.type(searchInput, 'John');

      // Only John should be visible
      expect(screen.getByText('John Farmer')).toBeInTheDocument();
      expect(screen.queryByText('Jane Grower')).not.toBeInTheDocument();
      expect(screen.queryByText('Bob Producer')).not.toBeInTheDocument();
    });

    it('should filter farmers by email', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FarmerList farmers={mockFarmers} />);

      const searchInput = screen.getByPlaceholderText(/search farmers/i);
      await user.type(searchInput, 'jane@example.com');

      // Only Jane should be visible
      expect(screen.queryByText('John Farmer')).not.toBeInTheDocument();
      expect(screen.getByText('Jane Grower')).toBeInTheDocument();
      expect(screen.queryByText('Bob Producer')).not.toBeInTheDocument();
    });

    it('should filter farmers by phone number', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FarmerList farmers={mockFarmers} />);

      const searchInput = screen.getByPlaceholderText(/search farmers/i);
      await user.type(searchInput, '+1122334455');

      // Only Bob should be visible
      expect(screen.queryByText('John Farmer')).not.toBeInTheDocument();
      expect(screen.queryByText('Jane Grower')).not.toBeInTheDocument();
      expect(screen.getByText('Bob Producer')).toBeInTheDocument();
    });

    it('should clear search results when search is cleared', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FarmerList farmers={mockFarmers} />);

      const searchInput = screen.getByPlaceholderText(/search farmers/i);
      
      // Search for John
      await user.type(searchInput, 'John');
      expect(screen.getByText('John Farmer')).toBeInTheDocument();
      expect(screen.queryByText('Jane Grower')).not.toBeInTheDocument();

      // Clear search
      await user.clear(searchInput);
      
      // All farmers should be visible again
      await waitFor(() => {
        expect(screen.getByText('John Farmer')).toBeInTheDocument();
        expect(screen.getByText('Jane Grower')).toBeInTheDocument();
        expect(screen.getByText('Bob Producer')).toBeInTheDocument();
      });
    });
  });

  describe('Action Buttons', () => {
    it('should call onEdit when edit button is clicked', async () => {
      const user = userEvent.setup();
      const mockOnEdit = jest.fn();
      
      renderWithProviders(
        <FarmerList farmers={mockFarmers} onEdit={mockOnEdit} />
      );

      const editButtons = screen.getAllByRole('button', { name: /edit/i });
      await user.click(editButtons[0]);

      expect(mockOnEdit).toHaveBeenCalledWith(mockFarmers[0]);
    });

    it('should call onDelete when delete button is clicked', async () => {
      const user = userEvent.setup();
      const mockOnDelete = jest.fn();
      
      renderWithProviders(
        <FarmerList farmers={mockFarmers} onDelete={mockOnDelete} />
      );

      const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
      await user.click(deleteButtons[0]);

      expect(mockOnDelete).toHaveBeenCalledWith(mockFarmers[0]);
    });

    it('should call onAdd when add farmer button is clicked', async () => {
      const user = userEvent.setup();
      const mockOnAdd = jest.fn();
      
      renderWithProviders(
        <FarmerList farmers={mockFarmers} onAdd={mockOnAdd} />
      );

      const addButton = screen.getByRole('button', { name: /add.*farmer/i });
      await user.click(addButton);

      expect(mockOnAdd).toHaveBeenCalled();
    });
  });

  describe('Loading and Error States', () => {
    it('should show loading state', () => {
      renderWithProviders(
        <FarmerList farmers={[]} isLoading={true} />
      );

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
      expect(screen.queryByText('John Farmer')).not.toBeInTheDocument();
    });

    it('should show error state with retry option', async () => {
      const user = userEvent.setup();
      const mockOnRetry = jest.fn();
      const error = new Error('Failed to load farmers');
      
      renderWithProviders(
        <FarmerList 
          farmers={[]} 
          error={error} 
          onRetry={mockOnRetry} 
        />
      );

      expect(screen.getByText(/failed to load farmers/i)).toBeInTheDocument();
      
      const retryButton = screen.getByRole('button', { name: /retry/i });
      await user.click(retryButton);

      expect(mockOnRetry).toHaveBeenCalled();
    });

    it('should show empty state when no farmers exist', () => {
      renderWithProviders(<FarmerList farmers={[]} />);

      expect(screen.getByText(/no farmers found/i)).toBeInTheDocument();
      expect(screen.getByText(/get started by adding your first farmer/i)).toBeInTheDocument();
    });
  });

  describe('Sorting and Pagination', () => {
    it('should sort farmers by name when name header is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FarmerList farmers={mockFarmers} />);

      const nameHeader = screen.getByRole('button', { name: /name/i });
      await user.click(nameHeader);

      // Check if farmers are sorted alphabetically
      const farmerNames = screen.getAllByTestId('farmer-name');
      expect(farmerNames[0]).toHaveTextContent('Bob Producer');
      expect(farmerNames[1]).toHaveTextContent('Jane Grower');
      expect(farmerNames[2]).toHaveTextContent('John Farmer');
    });

    it('should handle pagination when there are many farmers', () => {
      const manyFarmers = Array.from({ length: 25 }, (_, i) => ({
        id: `farmer-${i}`,
        name: `Farmer ${i}`,
        email: `farmer${i}@example.com`,
        phone: `+123456789${i}`,
        address: `${i} Farm Street`,
        registrationDate: '2024-01-01',
        isActive: true,
      }));

      renderWithProviders(<FarmerList farmers={manyFarmers} />);

      // Should show pagination controls
      expect(screen.getByText(/showing.*of.*farmers/i)).toBeInTheDocument();
      
      // Should show page navigation
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should be accessible to screen readers', () => {
      renderWithProviders(<FarmerList farmers={mockFarmers} />);

      // Check for proper headings
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      
      // Check for table accessibility
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByRole('table')).toHaveAccessibleName();

      // Check for button accessibility
      const editButtons = screen.getAllByRole('button', { name: /edit/i });
      editButtons.forEach(button => {
        expect(button).toHaveAccessibleName();
      });
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FarmerList farmers={mockFarmers} />);

      const searchInput = screen.getByPlaceholderText(/search farmers/i);
      searchInput.focus();
      expect(searchInput).toHaveFocus();

      // Tab to first action button
      await user.tab();
      expect(screen.getAllByRole('button')[0]).toHaveFocus();
    });
  });

  describe('Performance', () => {
    it('should handle large datasets efficiently', () => {
      const largeFarmerList = Array.from({ length: 1000 }, (_, i) => ({
        id: `farmer-${i}`,
        name: `Farmer ${i}`,
        email: `farmer${i}@example.com`,
        phone: `+123456789${i}`,
        address: `${i} Farm Street`,
        registrationDate: '2024-01-01',
        isActive: i % 2 === 0,
      }));

      const startTime = performance.now();
      renderWithProviders(<FarmerList farmers={largeFarmerList} />);
      const endTime = performance.now();

      // Should render in reasonable time (less than 500ms)
      expect(endTime - startTime).toBeLessThan(500);
    });

    it('should virtualize large lists for better performance', () => {
      const largeFarmerList = Array.from({ length: 1000 }, (_, i) => ({
        id: `farmer-${i}`,
        name: `Farmer ${i}`,
        email: `farmer${i}@example.com`,
        phone: `+123456789${i}`,
        address: `${i} Farm Street`,
        registrationDate: '2024-01-01',
        isActive: true,
      }));

      renderWithProviders(<FarmerList farmers={largeFarmerList} />);

      // Should only render visible items in DOM
      const visibleFarmers = screen.getAllByTestId('farmer-row');
      expect(visibleFarmers.length).toBeLessThan(100); // Should be virtualized
    });
  });
});