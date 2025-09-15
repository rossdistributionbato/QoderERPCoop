'use client';

import { useState, useEffect } from 'react';
import { 
  Target, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, 
  Clock, DollarSign, Users, Package, Wheat, BarChart3, Calendar,
  ArrowUpRight, ArrowDownRight, Zap, Award, Activity
} from 'lucide-react';

interface KPITarget {
  id: string;
  name: string;
  category: string;
  current: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  changePercent: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  icon: any;
  color: string;
  description: string;
  lastUpdated: string;
  benchmarkData?: {
    industry: number;
    topPerformer: number;
  };
}

interface KPICategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  kpis: KPITarget[];
}

const KPITracking = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [kpiData, setKpiData] = useState<KPICategory[]>([]);

  useEffect(() => {
    // Simulate API call to fetch KPI data
    const fetchKPIData = async () => {
      const mockData: KPICategory[] = [
        {
          id: 'financial',
          name: 'Financial Performance',
          description: 'Revenue, profitability, and cost metrics',
          icon: DollarSign,
          color: 'bg-green-500',
          kpis: [
            {
              id: 'revenue',
              name: 'Monthly Revenue',
              category: 'financial',
              current: 1240000,
              target: 1500000,
              unit: '₱',
              trend: 'up',
              change: 260000,
              changePercent: 26.5,
              status: 'good',
              icon: DollarSign,
              color: 'text-green-600',
              description: 'Total revenue generated from rice sales',
              lastUpdated: '2 hours ago',
              benchmarkData: {
                industry: 1100000,
                topPerformer: 1800000
              }
            },
            {
              id: 'profit_margin',
              name: 'Profit Margin',
              category: 'financial',
              current: 34.2,
              target: 40.0,
              unit: '%',
              trend: 'up',
              change: 2.1,
              changePercent: 6.5,
              status: 'good',
              icon: TrendingUp,
              color: 'text-blue-600',
              description: 'Net profit as percentage of revenue',
              lastUpdated: '2 hours ago',
              benchmarkData: {
                industry: 28.5,
                topPerformer: 42.0
              }
            },
            {
              id: 'cost_per_kg',
              name: 'Processing Cost per KG',
              category: 'financial',
              current: 18.50,
              target: 16.00,
              unit: '₱',
              trend: 'down',
              change: -1.20,
              changePercent: -6.1,
              status: 'warning',
              icon: BarChart3,
              color: 'text-yellow-600',
              description: 'Total processing cost per kilogram of rice',
              lastUpdated: '3 hours ago'
            }
          ]
        },
        {
          id: 'operational',
          name: 'Operational Efficiency',
          description: 'Production, quality, and processing metrics',
          icon: Wheat,
          color: 'bg-blue-500',
          kpis: [
            {
              id: 'conversion_rate',
              name: 'Paddy to Rice Conversion',
              category: 'operational',
              current: 68.5,
              target: 70.0,
              unit: '%',
              trend: 'up',
              change: 1.2,
              changePercent: 1.8,
              status: 'good',
              icon: Wheat,
              color: 'text-orange-600',
              description: 'Efficiency of paddy to rice conversion process',
              lastUpdated: '1 hour ago',
              benchmarkData: {
                industry: 65.0,
                topPerformer: 72.0
              }
            },
            {
              id: 'quality_score',
              name: 'Quality Score',
              category: 'operational',
              current: 92.3,
              target: 95.0,
              unit: '%',
              trend: 'up',
              change: 0.8,
              changePercent: 0.9,
              status: 'excellent',
              icon: Award,
              color: 'text-teal-600',
              description: 'Average quality rating of processed rice',
              lastUpdated: '30 minutes ago'
            },
            {
              id: 'processing_time',
              name: 'Avg Processing Time',
              category: 'operational',
              current: 2.3,
              target: 2.0,
              unit: 'hours',
              trend: 'down',
              change: -0.4,
              changePercent: -14.8,
              status: 'good',
              icon: Clock,
              color: 'text-purple-600',
              description: 'Average time to process paddy into rice',
              lastUpdated: '1 hour ago'
            },
            {
              id: 'equipment_efficiency',
              name: 'Equipment Efficiency',
              category: 'operational',
              current: 87.5,
              target: 90.0,
              unit: '%',
              trend: 'stable',
              change: 0.2,
              changePercent: 0.2,
              status: 'warning',
              icon: Zap,
              color: 'text-indigo-600',
              description: 'Overall equipment effectiveness rating',
              lastUpdated: '4 hours ago'
            }
          ]
        },
        {
          id: 'customer',
          name: 'Customer & Market',
          description: 'Customer satisfaction and market performance',
          icon: Users,
          color: 'bg-purple-500',
          kpis: [
            {
              id: 'customer_satisfaction',
              name: 'Customer Satisfaction',
              category: 'customer',
              current: 4.7,
              target: 4.8,
              unit: '/5',
              trend: 'up',
              change: 0.2,
              changePercent: 4.4,
              status: 'excellent',
              icon: CheckCircle,
              color: 'text-green-600',
              description: 'Average customer satisfaction rating',
              lastUpdated: '6 hours ago'
            },
            {
              id: 'customer_retention',
              name: 'Customer Retention',
              category: 'customer',
              current: 87.5,
              target: 90.0,
              unit: '%',
              trend: 'up',
              change: 2.3,
              changePercent: 2.7,
              status: 'good',
              icon: Users,
              color: 'text-blue-600',
              description: 'Percentage of customers retained month-over-month',
              lastUpdated: '1 day ago'
            },
            {
              id: 'market_share',
              name: 'Local Market Share',
              category: 'customer',
              current: 23.8,
              target: 30.0,
              unit: '%',
              trend: 'up',
              change: 1.5,
              changePercent: 6.7,
              status: 'good',
              icon: Target,
              color: 'text-red-600',
              description: 'Market share in local rice market',
              lastUpdated: '1 week ago'
            }
          ]
        },
        {
          id: 'inventory',
          name: 'Inventory & Supply',
          description: 'Stock levels, turnover, and supply chain metrics',
          icon: Package,
          color: 'bg-orange-500',
          kpis: [
            {
              id: 'inventory_turnover',
              name: 'Inventory Turnover',
              category: 'inventory',
              current: 8.2,
              target: 10.0,
              unit: 'x',
              trend: 'up',
              change: 0.8,
              changePercent: 10.8,
              status: 'good',
              icon: Package,
              color: 'text-indigo-600',
              description: 'Number of times inventory is sold per year',
              lastUpdated: '1 day ago'
            },
            {
              id: 'stock_accuracy',
              name: 'Stock Accuracy',
              category: 'inventory',
              current: 96.8,
              target: 98.0,
              unit: '%',
              trend: 'stable',
              change: 0.1,
              changePercent: 0.1,
              status: 'good',
              icon: CheckCircle,
              color: 'text-green-600',
              description: 'Accuracy of inventory records vs physical count',
              lastUpdated: '2 days ago'
            },
            {
              id: 'supplier_performance',
              name: 'Supplier Performance',
              category: 'inventory',
              current: 91.2,
              target: 95.0,
              unit: '%',
              trend: 'up',
              change: 3.1,
              changePercent: 3.5,
              status: 'good',
              icon: Activity,
              color: 'text-teal-600',
              description: 'Average supplier delivery and quality performance',
              lastUpdated: '3 days ago'
            }
          ]
        }
      ];
      
      setKpiData(mockData);
    };

    fetchKPIData();
  }, [selectedPeriod]);

  const getAllKPIs = () => {
    return kpiData.flatMap(category => category.kpis);
  };

  const getFilteredKPIs = () => {
    if (selectedCategory === 'all') {
      return getAllKPIs();
    }
    const category = kpiData.find(cat => cat.id === selectedCategory);
    return category ? category.kpis : [];
  };

  const getKPIStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getKPIStatusBg = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100';
      case 'good': return 'bg-blue-100';
      case 'warning': return 'bg-yellow-100';
      case 'critical': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const filteredKPIs = getFilteredKPIs();
  const allKPIs = getAllKPIs();
  
  const overallPerformance = {
    excellent: allKPIs.filter(kpi => kpi.status === 'excellent').length,
    good: allKPIs.filter(kpi => kpi.status === 'good').length,
    warning: allKPIs.filter(kpi => kpi.status === 'warning').length,
    critical: allKPIs.filter(kpi => kpi.status === 'critical').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">KPI Tracking</h1>
          <p className="text-gray-600 mt-1">Monitor key performance indicators and targets</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{overallPerformance.excellent}</p>
            <p className="text-sm text-gray-600">Excellent</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{overallPerformance.good}</p>
            <p className="text-sm text-gray-600">Good</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-600">{overallPerformance.warning}</p>
            <p className="text-sm text-gray-600">Warning</p>
          </div>
          <div className="text-center">
            <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">{overallPerformance.critical}</p>
            <p className="text-sm text-gray-600">Critical</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All KPIs ({allKPIs.length})
        </button>
        {kpiData.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
              selectedCategory === category.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <category.icon className="h-4 w-4" />
            <span>{category.name} ({category.kpis.length})</span>
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredKPIs.map((kpi) => (
          <div key={kpi.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getKPIStatusBg(kpi.status)}`}>
                  <kpi.icon className={`h-5 w-5 ${getKPIStatusColor(kpi.status)}`} />
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  kpi.status === 'excellent' ? 'bg-green-100 text-green-800' :
                  kpi.status === 'good' ? 'bg-blue-100 text-blue-800' :
                  kpi.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {kpi.status.toUpperCase()}
                </span>
              </div>
              <div className={`flex items-center text-xs ${
                kpi.trend === 'up' ? 'text-green-600' : 
                kpi.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {kpi.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : kpi.trend === 'down' ? (
                  <ArrowDownRight className="h-3 w-3" />
                ) : (
                  <div className="w-3 h-3 bg-gray-400 rounded-full" />
                )}
                <span className="ml-1">{kpi.changePercent >= 0 ? '+' : ''}{kpi.changePercent.toFixed(1)}%</span>
              </div>
            </div>

            {/* KPI Name and Description */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{kpi.name}</h4>
              <p className="text-xs text-gray-600">{kpi.description}</p>
            </div>

            {/* Current Value */}
            <div className="mb-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  {kpi.unit === '₱' ? '₱' : ''}{kpi.current.toLocaleString()}{kpi.unit !== '₱' ? kpi.unit : ''}
                </span>
                <span className="text-sm text-gray-500">
                  / {kpi.unit === '₱' ? '₱' : ''}{kpi.target.toLocaleString()}{kpi.unit !== '₱' ? kpi.unit : ''}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{getProgressPercentage(kpi.current, kpi.target).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      kpi.status === 'excellent' ? 'bg-green-500' :
                      kpi.status === 'good' ? 'bg-blue-500' :
                      kpi.status === 'warning' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${getProgressPercentage(kpi.current, kpi.target)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Benchmark Data */}
            {kpi.benchmarkData && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h5 className="text-xs font-medium text-gray-700 mb-2">Benchmarks</h5>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Industry Avg</span>
                    <span className="font-medium">
                      {kpi.unit === '₱' ? '₱' : ''}{kpi.benchmarkData.industry.toLocaleString()}{kpi.unit !== '₱' ? kpi.unit : ''}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Top Performer</span>
                    <span className="font-medium">
                      {kpi.unit === '₱' ? '₱' : ''}{kpi.benchmarkData.topPerformer.toLocaleString()}{kpi.unit !== '₱' ? kpi.unit : ''}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Last Updated */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Updated {kpi.lastUpdated}</span>
              </div>
              <span className={`${
                kpi.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.change >= 0 ? '+' : ''}{kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* No KPIs Message */}
      {filteredKPIs.length === 0 && (
        <div className="text-center py-12">
          <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No KPIs Found</h3>
          <p className="text-gray-600">No KPIs match the selected category filter.</p>
        </div>
      )}
    </div>
  );
};

export default KPITracking;