'use client';

import { useState, useEffect } from 'react';
import { createClientComponentSupabase } from '@/lib/supabase';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Temporary icons
const Users = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>👥</span>;
const Plus = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>➕</span>;
const Search = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>🔍</span>;
const Phone = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>📞</span>;
const MapPin = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>📍</span>;
const Eye = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>👁</span>;

interface Farmer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  village: string;
  tehsil: string;
  district: string;
  state: string;
  pincode: string;
  aadhar_number?: string;
  bank_account_number?: string;
  bank_ifsc_code?: string;
  total_land_area?: number;
  paddy_land_area?: number;
  created_at: string;
  updated_at: string;
  mill_id: string;
}

export default function FarmersPage() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const supabase = createClientComponentSupabase();

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const { data, error } = await supabase
        .from('farmers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Map farmers data to expected format
      const mappedFarmers = (data || []).map((farmer: any) => ({
        id: farmer.id,
        name: `${farmer.first_name} ${farmer.last_name}`,
        phone: farmer.phone || '',
        email: farmer.email || '',
        address: farmer.address || '',
        village: farmer.village || '',
        tehsil: 'N/A', // Farmers table doesn't have tehsil field
        district: farmer.district || '',
        state: farmer.state || '',
        pincode: farmer.pincode || '',
        aadhar_number: '',
        paddy_land_area: undefined, // Farmers table doesn't have paddy_land_area field
        created_at: farmer.created_at,
        updated_at: farmer.updated_at,
        mill_id: farmer.mill_id || ''
      }));

      setFarmers(mappedFarmers);
    } catch (error) {
      console.error('Error fetching farmers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.phone.includes(searchTerm) ||
    farmer.village.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Farmer Management</h1>
            <p className="text-gray-600">Manage farmer profiles and information</p>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Farmer</span>
          </button>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search farmers by name, phone, or village..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{farmers.length}</div>
              <div className="text-sm text-gray-500">Total Farmers</div>
            </div>
          </div>
        </div>

        {/* Farmers Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading farmers...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFarmers.map((farmer) => (
              <div key={farmer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{farmer.name}</h3>
                      <p className="text-sm text-gray-500">ID: {farmer.id.slice(0, 8)}...</p>
                    </div>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{farmer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{farmer.village}, {farmer.district}</span>
                  </div>
                  {farmer.paddy_land_area && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Land:</span> {farmer.paddy_land_area} acres
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Added {new Date(farmer.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-sm text-primary-600 hover:text-primary-700">Edit</button>
                      <button className="text-sm text-red-600 hover:text-red-700">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredFarmers.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No farmers found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first farmer'}
            </p>
            <button 
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add First Farmer</span>
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}