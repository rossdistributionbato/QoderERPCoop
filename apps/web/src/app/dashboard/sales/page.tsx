'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { createClientComponentSupabase } from '@/lib/supabase';

// Temporary icons
const ShoppingCart = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>🛒</span>;
const Plus = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>➕</span>;
const Calendar = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>📅</span>;
const User = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>👤</span>;
const Receipt = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>🧾</span>;

interface Sale {
  id: string;
  customer_name: string;
  customer_phone: string;
  sale_date: string;
  products: {
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }[];
  total_amount: number;
  payment_method: 'cash' | 'card' | 'upi' | 'credit';
  payment_status: 'paid' | 'pending' | 'partial';
  discount_amount: number;
  tax_amount: number;
  notes?: string;
  created_at: string;
  mill_id: string;
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const supabase = createClientComponentSupabase();

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const { data, error } = await supabase
        .from('sales_orders')
        .select(`
          *,
          customers (
            name,
            phone
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Map sales_orders data to Sale interface format
      const mappedSales = (data || []).map((order: any) => ({
        id: order.id,
        customer_name: order.customers?.name || order.customer_id || 'Unknown Customer',
        customer_phone: order.customers?.phone || 'N/A',
        sale_date: order.order_date || order.created_at || '',
        products: [], // Would need to join with sales_items table
        total_amount: order.total_amount || 0,
        payment_method: 'cash' as 'cash' | 'card' | 'upi' | 'credit', // sales_orders doesn't have payment_method field
        payment_status: 'pending' as 'paid' | 'pending' | 'partial', // sales_orders doesn't have payment_status field
        discount_amount: order.discount_amount || 0,
        tax_amount: order.tax_amount || 0,
        notes: order.remarks,
        created_at: order.created_at || '',
        mill_id: order.mill_id || ''
      }));

      setSales(mappedSales);
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSales = sales.filter(sale => {
    if (filter === 'all') return true;
    return sale.payment_status === filter;
  });

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'cash': return 'bg-blue-100 text-blue-800';
      case 'card': return 'bg-purple-100 text-purple-800';
      case 'upi': return 'bg-green-100 text-green-800';
      case 'credit': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate stats
  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total_amount, 0);
  const todaySales = sales.filter(sale => 
    new Date(sale.sale_date).toDateString() === new Date().toDateString()
  ).length;
  const pendingSales = sales.filter(sale => sale.payment_status === 'pending').length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sales Management</h1>
            <p className="text-gray-600">Track and manage your rice mill sales</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            <Plus className="h-4 w-4" />
            <span>New Sale</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">{totalSales}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-lg">
                <span className="text-white text-lg">₱</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₱{(totalRevenue / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-purple-500 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Sales</p>
                <p className="text-2xl font-bold text-gray-900">{todaySales}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-orange-500 p-3 rounded-lg">
                <span className="text-white text-lg">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Sales</p>
                <p className="text-2xl font-bold text-gray-900">{pendingSales}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Sales' },
              { key: 'paid', label: 'Paid' },
              { key: 'pending', label: 'Pending' },
              { key: 'partial', label: 'Partial' },
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sales Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Sales Records ({filteredSales.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading sales...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          {new Date(sale.sale_date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{sale.customer_name}</div>
                            <div className="text-sm text-gray-500">{sale.customer_phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.products?.length || 0} items
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₱{sale.total_amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentMethodColor(sale.payment_method)}`}>
                          {sale.payment_method.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(sale.payment_status)}`}>
                          {sale.payment_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">
                          <Receipt className="h-4 w-4" />
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}