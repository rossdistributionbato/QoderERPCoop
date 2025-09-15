'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, BarChart3, PieChart, LineChart, 
  Users, Package, Wheat, DollarSign, Calendar, Filter,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';

interface AnalyticsData {
  revenue: {
    current: number;
    previous: number;
    trend: number[];
    breakdown: { name: string; value: number; color: string }[];
  };
  production: {
    totalPaddy: number;
    totalRice: number;
    conversionRate: number;
    dailyProduction: { date: string; paddy: number; rice: number }[];
  };
  customers: {
    total: number;
    new: number;
    retention: number;
    segments: { name: string; count: number; value: number }[];
  };
  inventory: {
    riceStock: { variety: string; quantity: number; value: number }[];
    paddyStock: { variety: string; quantity: number; days: number }[];
    turnover: number;
  };
}

const AnalyticsDashboard = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  useEffect(() => {
    // Simulate API call to fetch analytics data
    const fetchData = async () => {
      // Mock data - in real app, this would come from your analytics API
      const mockData: AnalyticsData = {
        revenue: {
          current: 1240000,
          previous: 980000,
          trend: [800000, 850000, 920000, 980000, 1100000, 1150000, 1240000],
          breakdown: [
            { name: 'Premium Rice', value: 620000, color: '#10B981' },
            { name: 'Regular Rice', value: 480000, color: '#3B82F6' },
            { name: 'Rice Bran', value: 140000, color: '#F59E0B' }
          ]
        },
        production: {
          totalPaddy: 15600,
          totalRice: 10680,
          conversionRate: 68.5,
          dailyProduction: [
            { date: '2024-01-01', paddy: 520, rice: 356 },
            { date: '2024-01-02', paddy: 480, rice: 328 },
            { date: '2024-01-03', paddy: 550, rice: 377 },
            { date: '2024-01-04', paddy: 510, rice: 349 },
            { date: '2024-01-05', paddy: 490, rice: 336 },
            { date: '2024-01-06', paddy: 530, rice: 363 },
            { date: '2024-01-07', paddy: 540, rice: 370 }
          ]
        },
        customers: {
          total: 284,
          new: 23,
          retention: 87.5,
          segments: [
            { name: 'Wholesalers', count: 45, value: 850000 },
            { name: 'Retailers', count: 128, value: 290000 },
            { name: 'Direct Sales', count: 111, value: 100000 }
          ]
        },
        inventory: {
          riceStock: [
            { variety: 'Basmati Premium', quantity: 2500, value: 750000 },
            { variety: 'Basmati Regular', quantity: 3200, value: 480000 },
            { variety: 'Sona Masoori', quantity: 2800, value: 420000 },
            { variety: 'Ponni Rice', quantity: 1900, value: 285000 }
          ],
          paddyStock: [
            { variety: 'IR64', quantity: 5200, days: 12 },
            { variety: 'Samba', quantity: 3800, days: 8 },
            { variety: 'ADT 43', quantity: 2100, days: 15 }
          ],
          turnover: 8.2
        }
      };
      
      setData(mockData);
    };

    fetchData();
  }, [selectedPeriod]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const periods = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'quarter', name: 'This Quarter' },
    { id: 'year', name: 'This Year' }
  ];

  const metrics = [
    { id: 'revenue', name: 'Revenue', icon: DollarSign },
    { id: 'production', name: 'Production', icon: Wheat },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'inventory', name: 'Inventory', icon: Package }
  ];

  const revenueChange = ((data.revenue.current - data.revenue.previous) / data.revenue.previous * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600 mt-1">Advanced business intelligence and insights</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {periods.map(period => (
              <option key={period.id} value={period.id}>{period.name}</option>
            ))}
          </select>
          <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-green-500 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className={`flex items-center text-sm ${
              revenueChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {revenueChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              <span className="ml-1">{Math.abs(revenueChange).toFixed(1)}%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">₱{(data.revenue.current / 100000).toFixed(1)}L</p>
            <p className="text-xs text-gray-500 mt-1">vs ₱{(data.revenue.previous / 100000).toFixed(1)}L last period</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Wheat className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span className="ml-1">2.1%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
            <p className="text-2xl font-bold text-gray-900">{data.production.conversionRate}%</p>
            <p className="text-xs text-gray-500 mt-1">{data.production.totalPaddy}kg paddy → {data.production.totalRice}kg rice</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-purple-500 p-3 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span className="ml-1">{data.customers.new}</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600">Active Customers</p>
            <p className="text-2xl font-bold text-gray-900">{data.customers.total}</p>
            <p className="text-xs text-gray-500 mt-1">{data.customers.retention}% retention rate</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-orange-500 p-3 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span className="ml-1">0.8x</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600">Inventory Turnover</p>
            <p className="text-2xl font-bold text-gray-900">{data.inventory.turnover}x</p>
            <p className="text-xs text-gray-500 mt-1">Annual turnover rate</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <LineChart className="h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {/* Simulated line chart */}
            <div className="h-48 bg-gray-50 rounded-lg flex items-end justify-between px-4 py-4">
              {data.revenue.trend.map((value, index) => (
                <div 
                  key={index}
                  className="bg-primary-500 rounded-t-sm w-8 transition-all hover:bg-primary-600"
                  style={{ height: `${(value / Math.max(...data.revenue.trend)) * 100}%` }}
                  title={`₱${(value / 100000).toFixed(1)}L`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>7 periods ago</span>
              <span>Current</span>
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Breakdown</h3>
            <PieChart className="h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-3">
            {data.revenue.breakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">₱{(item.value / 100000).toFixed(1)}L</span>
                  <div className="text-xs text-gray-500">
                    {((item.value / data.revenue.current) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Production Analysis */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Daily Production</h3>
            <BarChart3 className="h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            <div className="h-48 bg-gray-50 rounded-lg flex items-end justify-between px-2 py-4">
              {data.production.dailyProduction.slice(-7).map((day, index) => (
                <div key={index} className="flex flex-col items-center w-12">
                  <div 
                    className="bg-blue-500 rounded-t-sm w-4 mr-1"
                    style={{ height: `${(day.paddy / 600) * 100}%` }}
                    title={`Paddy: ${day.paddy}kg`}
                  />
                  <div 
                    className="bg-green-500 rounded-t-sm w-4 ml-1"
                    style={{ height: `${(day.rice / 400) * 100}%` }}
                    title={`Rice: ${day.rice}kg`}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-1" />
                <span className="text-gray-600">Paddy Input</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-1" />
                <span className="text-gray-600">Rice Output</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Customer Segments</h3>
            <Users className="h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {data.customers.segments.map((segment, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{segment.name}</span>
                  <span className="text-sm text-gray-500">{segment.count} customers</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all"
                      style={{ width: `${(segment.value / data.revenue.current) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">₱{(segment.value / 100000).toFixed(1)}L</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Analysis */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Rice Stock</h4>
            <div className="space-y-3">
              {data.inventory.riceStock.map((stock, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-900">{stock.variety}</span>
                    <p className="text-xs text-gray-500">{stock.quantity} kg</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">₱{(stock.value / 1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Paddy Stock</h4>
            <div className="space-y-3">
              {data.inventory.paddyStock.map((stock, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-900">{stock.variety}</span>
                    <p className="text-xs text-gray-500">{stock.quantity} kg</p>
                  </div>
                  <span className={`text-sm font-medium ${
                    stock.days <= 7 ? 'text-red-600' : stock.days <= 14 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {stock.days} days
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;