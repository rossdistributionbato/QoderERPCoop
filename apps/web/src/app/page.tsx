import Link from 'next/link';
// import { Wheat, Users, Package, TrendingUp, Calculator, FileText } from 'lucide-react';

// Temporary icon replacements
const Wheat = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>🌾</span>;
const Users = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>👥</span>;
const Package = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>📦</span>;
const TrendingUp = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>📈</span>;
const Calculator = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>🧮</span>;
const FileText = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>📄</span>;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Wheat className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">RiceMillOS</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/auth/login" className="text-gray-700 hover:text-primary-600">
                Login
              </Link>
              <Link href="/auth/register" className="btn-primary">
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Digital Rice Mill
            <span className="text-primary-600"> Management</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your rice mill operations with our comprehensive digital solution. 
            Manage farmers, track production, control inventory, and boost profitability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="btn-primary text-lg px-8 py-3">
              Start Free Trial
            </Link>
            <Link href="/demo" className="btn-secondary text-lg px-8 py-3">
              View Demo
            </Link>
            <Link href="/database-test" className="bg-green-600 text-white hover:bg-green-700 text-lg px-8 py-3 rounded-lg transition-colors">
              Test Database
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Complete Rice Mill Solution
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600 mr-3" />
                  <h4 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h4>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose RiceMillOS?
              </h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary-600 font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">
                Expected Results
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Efficiency Improvement</span>
                  <span className="text-2xl font-bold text-success-600">30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Error Reduction</span>
                  <span className="text-2xl font-bold text-success-600">90%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Profit Increase</span>
                  <span className="text-2xl font-bold text-success-600">15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Processing Time</span>
                  <span className="text-2xl font-bold text-primary-600">-30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Rice Mill?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of rice mills already using RiceMillOS to boost their operations.
          </p>
          <Link href="/auth/register" className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-colors">
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Wheat className="h-6 w-6" />
                <span className="text-xl font-bold">RiceMillOS</span>
              </div>
              <p className="text-gray-400">
                Complete digital solution for rice mill management.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact">Features</Link></li>
                <li><Link href="/contact">Pricing</Link></li>
                <li><Link href="/demo">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact">Documentation</Link></li>
                <li><Link href="/contact">Help Center</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact">About</Link></li>
                <li><Link href="/contact">Privacy</Link></li>
                <li><Link href="/contact">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RiceMillOS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Users,
    title: 'Farmer Management',
    description: 'Complete farmer database with credit tracking, transaction history, and communication tools.',
  },
  {
    icon: Wheat,
    title: 'Procurement System',
    description: 'Digital paddy intake with quality parameters, automatic calculations, and instant receipts.',
  },
  {
    icon: Package,
    title: 'Inventory Control',
    description: 'Real-time stock tracking, automated alerts, and multi-location inventory management.',
  },
  {
    icon: Calculator,
    title: 'Financial Management',
    description: 'Automated bookkeeping, payment tracking, and comprehensive financial reporting.',
  },
  {
    icon: TrendingUp,
    title: 'Production Analytics',
    description: 'Yield tracking, efficiency analysis, and production optimization insights.',
  },
  {
    icon: FileText,
    title: 'Reports & Compliance',
    description: 'Automated report generation, tax calculations, and regulatory compliance tools.',
  },
];

const benefits = [
  {
    title: 'Mobile-First Design',
    description: 'Works perfectly on smartphones and tablets, with offline capabilities for rural areas.',
  },
  {
    title: 'Real-Time Updates',
    description: 'Live inventory tracking, instant notifications, and synchronized data across all devices.',
  },
  {
    title: 'Cost-Effective Solution',
    description: 'Affordable pricing with no hidden costs. Pay only for what you use.',
  },
  {
    title: 'Easy Implementation',
    description: 'Quick setup with comprehensive training and ongoing support.',
  },
];