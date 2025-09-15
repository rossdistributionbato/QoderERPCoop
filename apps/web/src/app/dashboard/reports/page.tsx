'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, DollarSign, Users, Package, Wheat, 
  Calendar, Download, Filter, RefreshCw, PieChart, LineChart,
  FileText, Settings, ArrowUpRight, ArrowDownRight, Target,
  Activity, Clock, AlertTriangle, CheckCircle, Zap, Eye
} from 'lucide-react';

interface KPIMetric {
  id: string;
  name: string;
  value: string | number;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  trend: number[];
  icon: any;
  color: string;
  target?: string;
  unit?: string;
}

interface ReportData {
  id: string;
  name: string;
  description: string;
  category: string;
  lastGenerated: string;
  status: 'ready' | 'generating' | 'error';
  icon: any;
}

const Reports = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const kpiMetrics: KPIMetric[] = [
    {
      id: 'revenue',
      name: 'Total Revenue',
      value: '₱12.4L',
      change: '+23.5%',
      changeType: 'increase',
      trend: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 95],
      icon: DollarSign,
      color: 'bg-green-500',
      target: '₱15L',
      unit: '₱'
    },
    {
      id: 'profit_margin',
      name: 'Profit Margin',
      value: '34.2%',
      change: '+4.3%',
      changeType: 'increase',
      trend: [28, 32, 30, 35, 31, 34, 32, 38, 35, 34, 36, 34],
      icon: TrendingUp,
      color: 'bg-blue-500',
      target: '40%',
      unit: '%'
    },
    {
      id: 'active_farmers',
      name: 'Active Farmers',
      value: 284,
      change: '+12',
      changeType: 'increase',
      trend: [220, 230, 240, 250, 260, 265, 270, 275, 278, 282, 284, 284],
      icon: Users,
      color: 'bg-purple-500',
      target: '300',
      unit: 'farmers'
    },
    {
      id: 'conversion_rate',
      name: 'Paddy to Rice Conversion',
      value: '68.5%',
      change: '+2.1%',
      changeType: 'increase',
      trend: [65, 66, 67, 66, 68, 67, 69, 68, 69, 68, 69, 68.5],
      icon: Wheat,
      color: 'bg-orange-500',
      target: '70%',
      unit: '%'
    },
    {
      id: 'inventory_turnover',
      name: 'Inventory Turnover',
      value: '8.2x',
      change: '+0.8x',
      changeType: 'increase',
      trend: [6.5, 7.1, 7.3, 7.8, 7.9, 8.0, 8.1, 8.2, 8.0, 8.1, 8.2, 8.2],
      icon: Package,
      color: 'bg-indigo-500',
      target: '10x',
      unit: 'times'
    },
    {
      id: 'quality_score',
      name: 'Quality Score',
      value: '92.3%',
      change: '+1.2%',
      changeType: 'increase',
      trend: [88, 89, 90, 91, 90, 92, 91, 93, 92, 92, 92, 92.3],
      icon: Target,
      color: 'bg-teal-500',
      target: '95%',
      unit: '%'
    },
    {
      id: 'avg_processing_time',
      name: 'Avg Processing Time',
      value: '2.3 hrs',
      change: '-0.4 hrs',
      changeType: 'increase', // Decrease in time is good
      trend: [3.2, 3.0, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.3, 2.2, 2.3, 2.3],
      icon: Clock,
      color: 'bg-yellow-500',
      target: '2 hrs',
      unit: 'hours'
    },
    {
      id: 'customer_satisfaction',
      name: 'Customer Satisfaction',
      value: '4.7/5',
      change: '+0.2',
      changeType: 'increase',
      trend: [4.2, 4.3, 4.4, 4.5, 4.4, 4.6, 4.5, 4.7, 4.6, 4.7, 4.7, 4.7],
      icon: CheckCircle,
      color: 'bg-green-600',
      target: '4.8/5',
      unit: 'rating'
    }
  ];

  const reportCategories = [
    {
      id: 'operational',
      name: 'Operational Reports',
      description: 'Production, inventory, and processing reports',
      reports: [
        {
          id: 'daily_production',
          name: 'Daily Production Report',
          description: 'Detailed breakdown of daily production activities',
          lastGenerated: '2 hours ago',
          status: 'ready' as const,
          icon: Activity
        },
        {
          id: 'inventory_status',
          name: 'Inventory Status Report',
          description: 'Current stock levels and inventory movements',
          lastGenerated: '1 hour ago',
          status: 'ready' as const,
          icon: Package
        },
        {
          id: 'quality_analysis',
          name: 'Quality Analysis Report',
          description: 'Quality metrics and rejection analysis',
          lastGenerated: '3 hours ago',
          status: 'ready' as const,
          icon: Target
        },
        {
          id: 'yield_efficiency',
          name: 'Yield Efficiency Report',
          description: 'Conversion rates and efficiency metrics',
          lastGenerated: '5 hours ago',
          status: 'generating' as const,
          icon: Wheat
        }
      ]
    },
    {
      id: 'financial',
      name: 'Financial Reports',
      description: 'Revenue, costs, and profitability analysis',
      reports: [
        {
          id: 'profit_loss',
          name: 'Profit & Loss Statement',
          description: 'Comprehensive financial performance report',
          lastGenerated: '1 day ago',
          status: 'ready' as const,
          icon: DollarSign
        },
        {
          id: 'cash_flow',
          name: 'Cash Flow Report',
          description: 'Cash inflows and outflows analysis',
          lastGenerated: '6 hours ago',
          status: 'ready' as const,
          icon: TrendingUp
        },
        {
          id: 'farmer_payments',
          name: 'Farmer Payment Summary',
          description: 'Outstanding payments and payment history',
          lastGenerated: '4 hours ago',
          status: 'ready' as const,
          icon: Users
        },
        {
          id: 'cost_analysis',
          name: 'Cost Analysis Report',
          description: 'Detailed cost breakdown and analysis',
          lastGenerated: '12 hours ago',
          status: 'error' as const,
          icon: BarChart3
        }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics & Insights',
      description: 'Trends, forecasts, and business intelligence',
      reports: [
        {
          id: 'trend_analysis',
          name: 'Trend Analysis Report',
          description: 'Market trends and seasonal patterns',
          lastGenerated: '2 days ago',
          status: 'ready' as const,
          icon: LineChart
        },
        {
          id: 'customer_insights',
          name: 'Customer Insights Report',
          description: 'Customer behavior and preferences analysis',
          lastGenerated: '1 day ago',
          status: 'ready' as const,
          icon: Eye
        },
        {
          id: 'predictive_analytics',
          name: 'Predictive Analytics Report',
          description: 'Demand forecasting and predictive insights',
          lastGenerated: '3 days ago',
          status: 'generating' as const,
          icon: Zap
        }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'kpis', name: 'KPIs & Metrics', icon: Target },
    { id: 'reports', name: 'Reports Library', icon: FileText },
    { id: 'analytics', name: 'Analytics Hub', icon: PieChart },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const periods = [
    { id: 'today', name: 'Today' },
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'quarter', name: 'This Quarter' },
    { id: 'year', name: 'This Year' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive business intelligence and reporting</p>
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
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                selectedTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {selectedTab === 'overview' && <OverviewTab kpiMetrics={kpiMetrics} />}
      {selectedTab === 'kpis' && <KPIsTab kpiMetrics={kpiMetrics} />}
      {selectedTab === 'reports' && <ReportsTab reportCategories={reportCategories} />}
      {selectedTab === 'analytics' && <AnalyticsTab />}
      {selectedTab === 'settings' && <SettingsTab />}
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ kpiMetrics }: { kpiMetrics: KPIMetric[] }) => {
  const topMetrics = kpiMetrics.slice(0, 4);
  
  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topMetrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className={`${metric.color} p-3 rounded-lg`}>
                <metric.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`flex items-center text-sm ${
                metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.changeType === 'increase' ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <span className="ml-1">{metric.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">{metric.name}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              {metric.target && (
                <p className="text-xs text-gray-500 mt-1">Target: {metric.target}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Highlights</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="ml-2 text-sm font-medium text-green-800">Revenue Target Achieved</span>
              </div>
              <span className="text-sm text-green-600">103% of target</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="ml-2 text-sm font-medium text-blue-800">Quality Improvement</span>
              </div>
              <span className="text-sm text-blue-600">+1.2% this month</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="ml-2 text-sm font-medium text-yellow-800">Inventory Alert</span>
              </div>
              <span className="text-sm text-yellow-600">Low stock: Premium Rice</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Report Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="ml-2 text-sm text-gray-700">Daily Production Report</span>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="ml-2 text-sm text-gray-700">Financial Summary</span>
              </div>
              <span className="text-xs text-gray-500">6 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="ml-2 text-sm text-gray-700">Farmer Payment Report</span>
              </div>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
          </div>
          <button className="w-full mt-4 text-sm text-primary-600 hover:text-primary-800 font-medium">
            View All Reports →
          </button>
        </div>
      </div>
    </div>
  );
};

// KPIs Tab Component  
const KPIsTab = ({ kpiMetrics }: { kpiMetrics: KPIMetric[] }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiMetrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${metric.color} p-2 rounded-lg`}>
                <metric.icon className="h-5 w-5 text-white" />
              </div>
              <div className={`flex items-center text-xs ${
                metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.changeType === 'increase' ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span className="ml-1">{metric.change}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">{metric.name}</p>
              <p className="text-xl font-bold text-gray-900">{metric.value}</p>
              {metric.target && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Target: {metric.target}</span>
                  <span className="text-gray-500">Progress: 85%</span>
                </div>
              )}
            </div>

            {/* Mini Trend Chart Placeholder */}
            <div className="mt-4 h-12 bg-gray-50 rounded flex items-end justify-between px-1">
              {metric.trend.map((value, index) => (
                <div 
                  key={index}
                  className="bg-primary-200 rounded-sm w-2"
                  style={{ height: `${(value / Math.max(...metric.trend)) * 100}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Reports Tab Component
const ReportsTab = ({ reportCategories }: { reportCategories: any[] }) => {
  return (
    <div className="space-y-6">
      {reportCategories.map((category) => (
        <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
            <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {category.reports.map((report: ReportData) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <report.icon className="h-5 w-5 text-gray-600" />
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    report.status === 'ready' ? 'bg-green-100 text-green-800' :
                    report.status === 'generating' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {report.status}
                  </span>
                </div>
                
                <h4 className="font-medium text-gray-900 text-sm mb-2">{report.name}</h4>
                <p className="text-xs text-gray-600 mb-3">{report.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{report.lastGenerated}</span>
                  <button className="text-xs text-primary-600 hover:text-primary-800 flex items-center">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Analytics Tab Component
const AnalyticsTab = () => {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <PieChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics Coming Soon</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Interactive charts, trend analysis, and predictive insights will be available in the next update.
        </p>
      </div>
    </div>
  );
};

// Settings Tab Component  
const SettingsTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Settings</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Report Period
            </label>
            <select className="border border-gray-300 rounded-lg px-3 py-2 w-full">
              <option>This Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auto-Generate Reports
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-700">Daily Production Report</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-700">Weekly Financial Summary</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">Monthly Analytics Report</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Notifications
            </label>
            <input 
              type="email" 
              placeholder="your-email@example.com"
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            />
          </div>
          
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;