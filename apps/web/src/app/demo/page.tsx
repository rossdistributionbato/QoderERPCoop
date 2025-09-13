'use client';

import Link from 'next/link';
import { useState } from 'react';
// import { 
//   ArrowLeft, 
//   Wheat, 
//   Users, 
//   Package, 
//   Calculator, 
//   TrendingUp, 
//   FileText,
//   Eye,
//   EyeOff,
//   Play
// } from 'lucide-react';

// Temporary icon replacements
const ArrowLeft = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>←</span>;
const Wheat = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>🌾</span>;
const Users = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>👥</span>;
const Package = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>📦</span>;
const Calculator = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>🧮</span>;
const TrendingUp = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>📈</span>;
const FileText = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>📄</span>;
const Eye = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>👁</span>;
const EyeOff = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>🙈</span>;
const Play = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>▶</span>;

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCredentials, setShowCredentials] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <Wheat className="h-6 w-6 text-primary-600" />
                <h1 className="text-xl font-bold text-gray-900">RiceMillOS Demo</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Live Demo
              </div>
              <Link 
                href="/auth/register" 
                className="btn-primary"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Play className="h-8 w-8 text-primary-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Interactive Demo Environment
              </h2>
              <p className="text-gray-600 mb-4">
                Explore RiceMillOS features with sample data. This demo showcases the complete rice mill management workflow from farmer registration to sales reporting.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Demo Credentials</h3>
                    <p className="text-blue-700 text-sm">Use these credentials to explore the full system</p>
                  </div>
                  <button
                    onClick={() => setShowCredentials(!showCredentials)}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    {showCredentials ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="ml-1 text-sm">
                      {showCredentials ? 'Hide' : 'Show'}
                    </span>
                  </button>
                </div>
                {showCredentials && (
                  <div className="mt-3 space-y-2">
                    <div className="bg-white rounded p-3">
                      <div className="text-sm font-medium text-gray-700">Admin User:</div>
                      <div className="text-sm text-gray-600">Email: demo@ricemillos.com</div>
                      <div className="text-sm text-gray-600">Password: demo123</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="text-sm font-medium text-gray-700">Operator User:</div>
                      <div className="text-sm text-gray-600">Email: operator@ricemillos.com</div>
                      <div className="text-sm text-gray-600">Password: operator123</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Demo Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {demoTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Demo Content */}
          <div className="p-6">
            {activeTab === 'dashboard' && <DashboardDemo />}
            {activeTab === 'farmers' && <FarmersDemo />}
            {activeTab === 'inventory' && <InventoryDemo />}
            {activeTab === 'production' && <ProductionDemo />}
            {activeTab === 'sales' && <SalesDemo />}
            {activeTab === 'reports' && <ReportsDemo />}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary-600 rounded-lg shadow-sm p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to implement RiceMillOS in your mill?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            This demo shows just a fraction of RiceMillOS capabilities. 
            Get started with a free trial and transform your rice mill operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/register" 
              className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Schedule Demo Call
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const demoTabs = [
  { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
  { id: 'farmers', name: 'Farmers', icon: Users },
  { id: 'inventory', name: 'Inventory', icon: Package },
  { id: 'production', name: 'Production', icon: Wheat },
  { id: 'sales', name: 'Sales', icon: Calculator },
  { id: 'reports', name: 'Reports', icon: FileText },
];

function DashboardDemo() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Dashboard Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <stat.icon className={`h-8 w-8 ${stat.iconColor}`} />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          <strong>Demo Note:</strong> This dashboard displays sample data. In the live system, 
          all metrics update in real-time based on your mill's actual operations.
        </p>
      </div>
    </div>
  );
}

function FarmersDemo() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Farmer Management</h3>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Sample Farmer Records</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Name</th>
                <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Village</th>
                <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Credit Balance</th>
                <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Last Transaction</th>
              </tr>
            </thead>
            <tbody>
              {sampleFarmers.map((farmer, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-3 text-sm text-gray-900">{farmer.name}</td>
                  <td className="py-3 px-3 text-sm text-gray-600">{farmer.village}</td>
                  <td className="py-3 px-3 text-sm text-gray-600">₹{farmer.credit}</td>
                  <td className="py-3 px-3 text-sm text-gray-600">{farmer.lastTransaction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function InventoryDemo() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Inventory Management</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Rice Stock Levels</h4>
          <div className="space-y-3">
            {riceInventory.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{item.type}</span>
                <span className="text-sm font-medium text-gray-900">{item.quantity} bags</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Paddy Stock</h4>
          <div className="space-y-3">
            {paddyInventory.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{item.variety}</span>
                <span className="text-sm font-medium text-gray-900">{item.quantity} kg</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductionDemo() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Production Tracking</h3>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Today's Production Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">2,450 kg</p>
            <p className="text-sm text-gray-600">Paddy Processed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">1,715 kg</p>
            <p className="text-sm text-gray-600">Rice Produced</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">70%</p>
            <p className="text-sm text-gray-600">Conversion Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SalesDemo() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Sales Management</h3>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Recent Sales</h4>
        <div className="space-y-3">
          {recentSales.map((sale, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{sale.customer}</p>
                <p className="text-xs text-gray-600">{sale.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">₹{sale.amount}</p>
                <p className="text-xs text-gray-600">{sale.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportsDemo() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Reports & Analytics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Monthly Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Revenue</span>
              <span className="text-sm font-medium text-gray-900">₹4,85,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Expenses</span>
              <span className="text-sm font-medium text-gray-900">₹3,20,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Net Profit</span>
              <span className="text-sm font-medium text-green-600">₹1,65,000</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Available Reports</h4>
          <div className="space-y-2">
            {availableReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">{report.name}</span>
                <button className="text-xs text-primary-600 hover:text-primary-800">
                  Generate
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sample data
const dashboardStats = [
  { name: 'Active Farmers', value: '247', icon: Users, iconColor: 'text-blue-600' },
  { name: 'Rice Stock', value: '1,250', icon: Package, iconColor: 'text-green-600' },
  { name: 'Monthly Revenue', value: '₹4.8L', icon: Calculator, iconColor: 'text-purple-600' },
  { name: 'Conversion Rate', value: '72%', icon: TrendingUp, iconColor: 'text-orange-600' },
];

const sampleFarmers = [
  { name: 'Rajesh Kumar', village: 'Gandhipuram', credit: '2,500', lastTransaction: '2 days ago' },
  { name: 'Priya Sharma', village: 'Riverdale', credit: '1,200', lastTransaction: '1 week ago' },
  { name: 'Amit Patel', village: 'Greenfield', credit: '800', lastTransaction: '3 days ago' },
  { name: 'Sunita Devi', village: 'Lakeside', credit: '3,200', lastTransaction: 'Yesterday' },
];

const riceInventory = [
  { type: 'Basmati Premium', quantity: 150 },
  { type: 'Basmati Regular', quantity: 200 },
  { type: 'Sona Masoori', quantity: 180 },
  { type: 'Ponni Rice', quantity: 120 },
];

const paddyInventory = [
  { variety: 'IR64', quantity: 5200 },
  { variety: 'Samba', quantity: 3800 },
  { variety: 'ADT 43', quantity: 2100 },
];

const recentSales = [
  { customer: 'Wholesale Mart', date: 'Today', amount: '25,000', quantity: '50 bags' },
  { customer: 'Local Retailer', date: 'Yesterday', amount: '12,500', quantity: '25 bags' },
  { customer: 'Export Order', date: '2 days ago', amount: '75,000', quantity: '150 bags' },
];

const availableReports = [
  { name: 'Daily Production Report' },
  { name: 'Farmer Payment Summary' },
  { name: 'Inventory Status Report' },
  { name: 'Monthly Financial Report' },
  { name: 'Tax Compliance Report' },
];