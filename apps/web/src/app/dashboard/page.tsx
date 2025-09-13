'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  Package, 
  TrendingUp, 
  Calculator,
  Wheat,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  // Sample dashboard data (will be replaced with real data)
  const stats = [
    {
      name: 'Active Farmers',
      value: '247',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Rice Stock (bags)',
      value: '1,250',
      change: '-8%',
      changeType: 'decrease',
      icon: Package,
      color: 'bg-green-500',
    },
    {
      name: 'Monthly Revenue',
      value: '₹4.8L',
      change: '+25%',
      changeType: 'increase',
      icon: Calculator,
      color: 'bg-purple-500',
    },
    {
      name: 'Conversion Rate',
      value: '72%',
      change: '+2%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'procurement',
      description: 'New paddy intake from Rajesh Kumar',
      amount: '2,500 kg',
      time: '2 hours ago',
      icon: Wheat,
    },
    {
      id: 2,
      type: 'sale',
      description: 'Rice sale to Wholesale Mart',
      amount: '₹25,000',
      time: '4 hours ago',
      icon: Calculator,
    },
    {
      id: 3,
      type: 'farmer',
      description: 'New farmer registration: Priya Sharma',
      amount: '',
      time: '6 hours ago',
      icon: Users,
    },
    {
      id: 4,
      type: 'inventory',
      description: 'Low stock alert: Basmati Premium',
      amount: '45 bags left',
      time: '1 day ago',
      icon: AlertTriangle,
    },
  ];

  const upcomingTasks = [
    { id: 1, title: 'Process quality check for Batch #2024-001', priority: 'high', dueDate: 'Today' },
    { id: 2, title: 'Payment due to 5 farmers', priority: 'medium', dueDate: 'Tomorrow' },
    { id: 3, title: 'Monthly inventory audit', priority: 'low', dueDate: 'This week' },
    { id: 4, title: 'Update farmer contact information', priority: 'medium', dueDate: 'Next week' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Overview of your rice mill operations • {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className={`ml-2 flex items-center text-sm ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.changeType === 'increase' ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      <span className="ml-1">{stat.change}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
              <p className="text-sm text-gray-600">Latest updates from your mill operations</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <activity.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500">{activity.time}</p>
                        {activity.amount && (
                          <p className="text-sm font-medium text-primary-600">{activity.amount}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button className="w-full text-center text-sm text-primary-600 hover:text-primary-500 font-medium">
                  View all activities
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
              <p className="text-sm text-gray-600">Things that need your attention</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{task.title}</p>
                      <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      task.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : task.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button className="w-full text-center text-sm text-primary-600 hover:text-primary-500 font-medium">
                  View all tasks
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
              <div className="text-center">
                <Wheat className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">New Paddy Intake</p>
                <p className="text-xs text-gray-500">Record new procurement</p>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
              <div className="text-center">
                <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Add New Farmer</p>
                <p className="text-xs text-gray-500">Register new supplier</p>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
              <div className="text-center">
                <Calculator className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Record Sale</p>
                <p className="text-xs text-gray-500">Create new sale entry</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}