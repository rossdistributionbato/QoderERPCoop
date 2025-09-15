'use client';

import { useState, useEffect } from 'react';
import { 
  DollarSign, TrendingUp, Users, Package, Target, AlertTriangle,
  Calendar, Clock, Award, Zap, ArrowUpRight, ArrowDownRight,
  BarChart3, PieChart, Activity, CheckCircle, Eye, MapPin
} from 'lucide-react';

interface ExecutiveMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: any;
  color: string;
  subtitle?: string;
}

interface BusinessInsight {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'risk' | 'achievement' | 'alert';
  priority: 'high' | 'medium' | 'low';
  impact: string;
  action?: string;
}

const ExecutiveDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const executiveMetrics: ExecutiveMetric[] = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: '₱12.4L',
      change: '+26.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-green-500',
      subtitle: 'vs ₱9.8L last month'
    },
    {
      id: 'profit',
      title: 'Net Profit',
      value: '₱4.2L',
      change: '+31.2%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-blue-500',
      subtitle: '34.2% margin'
    },
    {
      id: 'customers',
      title: 'Active Customers',
      value: '284',
      change: '+23',
      changeType: 'positive',
      icon: Users,
      color: 'bg-purple-500',
      subtitle: '87.5% retention rate'
    },
    {
      id: 'efficiency',
      title: 'Operational Efficiency',
      value: '92.3%',
      change: '+4.1%',
      changeType: 'positive',
      icon: Zap,
      color: 'bg-orange-500',
      subtitle: 'Overall performance'
    }
  ];

  const businessInsights: BusinessInsight[] = [
    {
      id: 'market_expansion',
      title: 'Market Expansion Opportunity',
      description: 'Premium rice segment showing 45% growth potential in neighboring districts',
      type: 'opportunity',
      priority: 'high',
      impact: '₱2.8L additional revenue potential',
      action: 'Schedule market research meeting'
    },
    {
      id: 'quality_improvement',
      title: 'Quality Score Achievement',
      description: 'Quality metrics exceeded industry standards for 3 consecutive months',
      type: 'achievement',
      priority: 'medium',
      impact: 'Customer satisfaction up 12%'
    },
    {
      id: 'inventory_risk',
      title: 'Inventory Risk Alert',
      description: 'Premium rice stock running low during peak demand season',
      type: 'risk',
      priority: 'high',
      impact: 'Potential revenue loss of ₱85k',
      action: 'Increase procurement by 40%'
    },
    {
      id: 'cost_optimization',
      title: 'Cost Optimization Success',
      description: 'Processing costs reduced by 15% through efficiency improvements',
      type: 'achievement',
      priority: 'medium',
      impact: '₱1.2L annual savings'
    }
  ];

  const revenueBreakdown = [
    { name: 'Premium Rice', value: 620000, percentage: 50, color: '#10B981' },
    { name: 'Regular Rice', value: 480000, percentage: 39, color: '#3B82F6' },
    { name: 'Rice Bran', value: 140000, percentage: 11, color: '#F59E0B' }
  ];

  const regionalPerformance = [
    { region: 'Local District', revenue: 620000, growth: 28.5, customers: 145 },
    { region: 'Neighboring Cities', revenue: 480000, growth: 22.1, customers: 89 },
    { region: 'Export Markets', revenue: 140000, growth: 45.3, customers: 12 }
  ];

  const productivityMetrics = [
    { name: 'Daily Processing', current: 2400, target: 2800, unit: 'kg' },
    { name: 'Conversion Rate', current: 68.5, target: 70.0, unit: '%' },
    { name: 'Quality Score', current: 92.3, target: 95.0, unit: '%' },
    { name: 'Equipment Uptime', current: 94.2, target: 96.0, unit: '%' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading executive dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
          <p className="text-gray-600 mt-2">Strategic insights and key business metrics</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-sm">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {executiveMetrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${metric.color} p-3 rounded-lg`}>
                <metric.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                metric.changeType === 'positive' ? 'text-green-600' : 
                metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {metric.changeType === 'positive' ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : metric.changeType === 'negative' ? (
                  <ArrowDownRight className="h-4 w-4" />
                ) : null}
                <span className="ml-1">{metric.change}</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</p>
              {metric.subtitle && (
                <p className="text-xs text-gray-500">{metric.subtitle}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Business Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Strategic Insights</h2>
          <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
            View All Insights
          </button>
        </div>
        
        <div className="space-y-4">
          {businessInsights.map((insight) => (
            <div key={insight.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    insight.type === 'opportunity' ? 'bg-blue-100' :
                    insight.type === 'achievement' ? 'bg-green-100' :
                    insight.type === 'risk' ? 'bg-red-100' :
                    'bg-yellow-100'
                  }`}>
                    {insight.type === 'opportunity' ? (
                      <Target className={`h-4 w-4 ${
                        insight.type === 'opportunity' ? 'text-blue-600' : ''
                      }`} />
                    ) : insight.type === 'achievement' ? (
                      <Award className="h-4 w-4 text-green-600" />
                    ) : insight.type === 'risk' ? (
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    ) : (
                      <Activity className="h-4 w-4 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{insight.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        insight.priority === 'high' ? 'bg-red-100 text-red-800' :
                        insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {insight.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                    <p className="text-sm font-medium text-gray-900">{insight.impact}</p>
                    {insight.action && (
                      <button className="text-xs text-primary-600 hover:text-primary-800 font-medium mt-2">
                        {insight.action} →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Analysis & Regional Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Analysis</h3>
          <div className="space-y-4">
            {revenueBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">₱{(item.value / 100000).toFixed(1)}L</p>
                  <p className="text-xs text-gray-500">{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Revenue Trend Visualization */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">Monthly Trend</span>
              <span className="text-sm text-green-600 font-medium">+26.5% growth</span>
            </div>
            <div className="h-16 bg-gray-50 rounded-lg flex items-end justify-between px-2 py-2">
              {[65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 95].map((height, index) => (
                <div 
                  key={index}
                  className="bg-primary-500 rounded-t-sm w-4 transition-all hover:bg-primary-600"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Regional Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Regional Performance</h3>
          <div className="space-y-4">
            {regionalPerformance.map((region, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-900">{region.region}</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    region.growth > 30 ? 'text-green-600' : 
                    region.growth > 20 ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    +{region.growth}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Revenue</p>
                    <p className="font-semibold text-gray-900">₱{(region.revenue / 100000).toFixed(1)}L</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Customers</p>
                    <p className="font-semibold text-gray-900">{region.customers}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Productivity Metrics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Operational Productivity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productivityMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    strokeWidth="3"
                    fill="none"
                    stroke="currentColor"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-primary-600"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={`${(metric.current / metric.target) * 100}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-900">
                    {((metric.current / metric.target) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <h4 className="font-medium text-gray-900 text-sm mb-1">{metric.name}</h4>
              <p className="text-lg font-bold text-gray-900">{metric.current}{metric.unit}</p>
              <p className="text-xs text-gray-500">Target: {metric.target}{metric.unit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Ready for your next strategic move?</h3>
            <p className="text-primary-100">Access detailed reports and analytics to make informed decisions</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-gray-100 font-medium text-sm">
              View Reports
            </button>
            <button className="border border-primary-400 text-white px-4 py-2 rounded-lg hover:bg-primary-500 font-medium text-sm">
              Schedule Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;