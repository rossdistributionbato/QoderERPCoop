'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
// Temporary icon replacements
const Wheat = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>🌾</span>;
const Users = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>👥</span>;
const Package = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>📦</span>;
const TrendingUp = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>📈</span>;
const Calculator = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>🔢</span>;
const FileText = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>📄</span>;
const BarChart3 = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>📊</span>;
const Target = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>🎯</span>;
const Award = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>🏆</span>;
const Wrench = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>🔧</span>;
const Factory = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>🏭</span>;
const Settings = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>⚙️</span>;
const LogOut = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>🚪</span>;
const Menu = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>☰</span>;
const X = ({ className }: { className?: string }) => <span className={`${className} inline-block`}>❌</span>;
import { useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/auth/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Wheat className="h-12 w-12 text-primary-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: TrendingUp },
    { name: 'Farmers', href: '/dashboard/farmers', icon: Users },
    { name: 'Procurement', href: '/dashboard/procurement', icon: Wheat },
    { name: 'Production', href: '/dashboard/production', icon: Factory },
    { name: 'Inventory', href: '/dashboard/inventory', icon: Package },
    { name: 'Sales', href: '/dashboard/sales', icon: Calculator },
    { name: 'Reports', href: '/dashboard/reports', icon: FileText },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'KPIs', href: '/dashboard/kpi', icon: Target },
    { name: 'Executive', href: '/dashboard/executive', icon: Award },
    { name: 'Report Builder', href: '/dashboard/report-builder', icon: Wrench },
    { name: 'Users', href: '/dashboard/users', icon: Users },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  // Helper function to determine if a navigation item is current
  const isCurrentPage = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`relative z-50 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        
        <div className="fixed inset-0 z-50 flex">
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex flex-shrink-0 items-center px-4">
              <Wheat className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">RiceMillOS</span>
            </div>
            <nav className="mt-5 flex-shrink-0 h-full divide-y divide-gray-200 overflow-y-auto">
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isCurrentPage(item.href)
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={(e) => {
                      console.log(`📱 Mobile nav: Clicking ${item.name} -> ${item.href}`);
                      setSidebarOpen(false);
                    }}
                  >
                    <item.icon className="mr-4 h-6 w-6 text-gray-400" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 border-r border-gray-200">
          <div className="flex h-16 shrink-0 items-center">
            <Wheat className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">RiceMillOS</span>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                          isCurrentPage(item.href)
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50'
                        }`}
                        onClick={() => console.log(`🖥️ Desktop nav: Clicking ${item.name} -> ${item.href}`)}
                      >
                        <item.icon className="h-6 w-6 shrink-0" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Welcome back, {user.user_metadata?.full_name || user.email}
              </h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Profile dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-5 w-5 text-gray-400" />
                  <span className="hidden sm:block">Sign out</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}