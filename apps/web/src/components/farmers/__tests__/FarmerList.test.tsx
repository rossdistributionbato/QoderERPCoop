import { renderWithProviders, generateMockFarmer } from '@/test/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FarmerList from '../FarmerList';

// TDD: Write tests first, then implement the component
describe('FarmerList Component', () => {
  const mockFarmers = [
    generateMockFarmer({ id: '1', name: 'Rajesh Kumar', village: 'Village A' }),
    generateMockFarmer({ id: '2', name: 'Priya Sharma', village: 'Village B' }),
    generateMockFarmer({ id: '3', name: 'Amit Patel', village: 'Village C' }),
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render farmer list with header', () => {
      renderWithProviders(<FarmerList farmers={mockFarmers} />);
      
      expect(screen.getByRole('heading', { name: /farmers/i })).toBeInTheDocument();
      expect(screen.getByText(/manage your farmer database/i)).toBeInTheDocument();
    });

    it('should render add farmer button', () => {
      renderWithProviders(<FarmerList farmers={mockFarmers} />);
      
      const addButton = screen.getByRole('button', { name: /add new farmer/i });
      expect(addButton).toBeInTheDocument();
      expect(addButton).toBeEnabled();
    });

    it('should render search input', () => {
      renderWithProviders(<FarmerList farmers={mockFarmers} />);
      
      const searchInput = screen.getByPlaceholderText(/search farmers/i);
      expect(searchInput).toBeInTheDocument();
    });

    it('should display farmers in a table format', () => {
      renderWithProviders(<FarmerList farmers={mockFarmers} />);
      
      // Check table headers
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Village')).toBeInTheDocument();
      expect(screen.getByText('Phone')).toBeInTheDocument();
      expect(screen.getByText('Balance')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
      
      // Check farmer data
      mockFarmers.forEach(farmer => {
        expect(screen.getByText(farmer.name)).toBeInTheDocument();
        expect(screen.getByText(farmer.village)).toBeInTheDocument();
      });
    });
  });

  describe('Search Functionality', () => {
    it('should filter farmers by name when searching', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FarmerList farmers={mockFarmers} />);
      
      const searchInput = screen.getByPlaceholderText(/search farmers/i);
      await user.type(searchInput, 'Rajesh');
      
      await waitFor(() => {
        expect(screen.getByText('Rajesh Kumar')).toBeInTheDocument();
        expect(screen.queryByText('Priya Sharma')).not.toBeInTheDocument();
        expect(screen.queryByText('Amit Patel')).not.toBeInTheDocument();
      });
    });

    it('should filter farmers by village when searching', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FarmerList farmers={mockFarmers} />);
      
      const searchInput = screen.getByPlaceholderText(/search farmers/i);
      await user.type(searchInput, 'Village B');
      
      await waitFor(() => {
        expect(screen.getByText('Priya Sharma')).toBeInTheDocument();
        expect(screen.queryByText('Rajesh Kumar')).not.toBeInTheDocument();
        expect(screen.queryByText('Amit Patel')).not.toBeInTheDocument();
      });
    });

    it('should show no results message when no farmers match search', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FarmerList farmers={mockFarmers} />);
      
      const searchInput = screen.getByPlaceholderText(/search farmers/i);
      await user.type(searchInput, 'NonExistentFarmer');
      
      await waitFor(() => {
        expect(screen.getByText(/no farmers found/i)).toBeInTheDocument();
      });
    });

    it('should clear search and show all farmers when search is cleared', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FarmerList farmers={mockFarmers} />);
      
      const searchInput = screen.getByPlaceholderText(/search farmers/i);
      await user.type(searchInput, 'Rajesh');
      await user.clear(searchInput);
      
      await waitFor(() => {
        mockFarmers.forEach(farmer => {
          expect(screen.getByText(farmer.name)).toBeInTheDocument();
        });
      });
    });
  });

  describe('Actions', () => {
    it('should have edit button for each farmer', () => {
      renderWithProviders(<FarmerList farmers={mockFarmers} />);
      
      const editButtons = screen.getAllByRole('button', { name: /edit/i });
      expect(editButtons).toHaveLength(mockFarmers.length);
    });

    it('should have delete button for each farmer', () => {
      renderWithProviders(<FarmerList farmers={mockFarmers} />);
      
      const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
      expect(deleteButtons).toHaveLength(mockFarmers.length);
    });

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
  });

  describe('Loading and Error States', () => {
    it('should show loading state when isLoading is true', () => {
      renderWithProviders(<FarmerList farmers={[]} isLoading={true} />);
      
      expect(screen.getByTestId('loading')).toBeInTheDocument();
      expect(screen.getByText(/loading farmers/i)).toBeInTheDocument();
    });

    it('should show error state when error is provided', () => {
      const errorMessage = 'Failed to load farmers';
      renderWithProviders(
        <FarmerList farmers={[]} error={errorMessage} />
      );
      
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });

    it('should show empty state when no farmers are provided', () => {
      renderWithProviders(<FarmerList farmers={[]} />);
      
      expect(screen.getByText(/no farmers registered yet/i)).toBeInTheDocument();
      expect(screen.getByText(/start by adding your first farmer/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      renderWithProviders(<FarmerList farmers={mockFarmers} />);
      
      const searchInput = screen.getByPlaceholderText(/search farmers/i);
      expect(searchInput).toHaveAttribute('aria-label', 'Search farmers');
      
      const addButton = screen.getByRole('button', { name: /add new farmer/i });
      expect(addButton).toHaveAttribute('aria-label', 'Add new farmer');
    });

    it('should have proper table structure', () => {
      renderWithProviders(<FarmerList farmers={mockFarmers} />);
      
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      
      const headers = screen.getAllByRole('columnheader');
      expect(headers).toHaveLength(5); // Name, Village, Phone, Balance, Actions
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FarmerList farmers={mockFarmers} />);
      
      const searchInput = screen.getByPlaceholderText(/search farmers/i);
      await user.tab();
      expect(searchInput).toHaveFocus();
      
      await user.tab();
      const addButton = screen.getByRole('button', { name: /add new farmer/i });
      expect(addButton).toHaveFocus();
    });
  });

  describe('Performance', () => {
    it('should handle large number of farmers efficiently', () => {
      const largeFarmerList = Array.from({ length: 1000 }, (_, i) =>
        generateMockFarmer({ id: `farmer-${i}`, name: `Farmer ${i}` })
      );
      
      const startTime = performance.now();
      renderWithProviders(<FarmerList farmers={largeFarmerList} />);
      const endTime = performance.now();
      
      // Should render within reasonable time (less than 1 second)
      expect(endTime - startTime).toBeLessThan(1000);
    });
  });
});