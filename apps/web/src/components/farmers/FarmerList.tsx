'use client';

import { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Phone, 
  MapPin,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface Farmer {
  id: string;
  mill_id: string;
  name: string;
  phone: string;
  address: string;
  village: string;
  aadhar_number?: string | null;
  bank_account?: string | null;
  bank_ifsc?: string | null;
  credit_limit: number;
  current_balance: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface FarmerListProps {
  farmers: Farmer[];
  isLoading?: boolean;
  error?: string | null;
  onEdit?: (farmer: Farmer) => void;
  onDelete?: (farmer: Farmer) => void;
  onAdd?: () => void;
  onRetry?: () => void;
}

export default function FarmerList({
  farmers,
  isLoading = false,
  error = null,
  onEdit,
  onDelete,
  onAdd,
  onRetry
}: FarmerListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter farmers based on search term
  const filteredFarmers = useMemo(() => {
    if (!searchTerm.trim()) return farmers;
    
    const lowercaseSearch = searchTerm.toLowerCase();
    return farmers.filter(farmer =>
      farmer.name.toLowerCase().includes(lowercaseSearch) ||
      farmer.village.toLowerCase().includes(lowercaseSearch) ||
      farmer.phone.includes(searchTerm)
    );
  }, [farmers, searchTerm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center" data-testid="loading">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600 mr-3" />
          <span className="text-lg text-gray-600">Loading farmers...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Farmers</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="btn-primary"
              aria-label="Retry loading farmers"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Farmers</h1>
            <p className="text-gray-600">Manage your farmer database</p>
          </div>
          <button
            onClick={onAdd}
            className="btn-primary flex items-center gap-2"
            aria-label="Add new farmer"
          >
            <Plus className="h-5 w-5" />
            Add New Farmer
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search farmers by name, village, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            aria-label="Search farmers"
          />
        </div>
      </div>

      {/* Farmers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {farmers.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No farmers registered yet</h3>
            <p className="text-gray-600 mb-6">Start by adding your first farmer to begin managing your supplier network.</p>
            <button
              onClick={onAdd}
              className="btn-primary flex items-center gap-2 mx-auto"
            >
              <Plus className="h-5 w-5" />
              Add First Farmer
            </button>
          </div>
        ) : filteredFarmers.length === 0 ? (
          <div className="p-12 text-center">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No farmers found</h3>
            <p className="text-gray-600">Try adjusting your search terms or clear the search to see all farmers.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200" role="table">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" role="columnheader">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" role="columnheader">
                    Village
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" role="columnheader">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" role="columnheader">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" role="columnheader">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFarmers.map((farmer) => (
                  <tr key={farmer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{farmer.name}</div>
                          <div className="text-sm text-gray-500">{farmer.aadhar_number || 'No Aadhar'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        {farmer.village}
                      </div>
                      <div className="text-sm text-gray-500">{farmer.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Phone className="h-4 w-4 text-gray-400 mr-1" />
                        {farmer.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatCurrency(farmer.current_balance)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Limit: {formatCurrency(farmer.credit_limit)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEdit?.(farmer)}
                          className="text-primary-600 hover:text-primary-900"
                          aria-label={`Edit ${farmer.name}`}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete?.(farmer)}
                          className="text-red-600 hover:text-red-900"
                          aria-label={`Delete ${farmer.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Results count */}
        {filteredFarmers.length > 0 && (
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <p className="text-sm text-gray-700">
              Showing {filteredFarmers.length} of {farmers.length} farmers
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}