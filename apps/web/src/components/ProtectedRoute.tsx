'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, usePermissions } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredRole?: string;
  fallbackPath?: string;
}

export default function ProtectedRoute({
  children,
  requiredPermission,
  requiredRole,
  fallbackPath = '/auth/login'
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const { hasPermission, userRole } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      console.log('🔐 ProtectedRoute check:', {
        user: user?.email,
        userRole,
        requiredRole,
        requiredPermission,
        hasPermission: hasPermission(requiredPermission || '')
      });

      // Check if user is authenticated
      if (!user) {
        console.log('🔐 ProtectedRoute: No user, redirecting to login');
        router.push(fallbackPath);
        return;
      }

      // Check role requirement
      if (requiredRole && userRole !== requiredRole) {
        console.log('🔐 ProtectedRoute: Wrong role, redirecting to dashboard');
        router.push('/dashboard'); // Redirect to dashboard if wrong role
        return;
      }

      // Check permission requirement
      if (requiredPermission && !hasPermission(requiredPermission)) {
        console.log('🔐 ProtectedRoute: No permission, redirecting to dashboard');
        router.push('/dashboard'); // Redirect to dashboard if no permission
        return;
      }

      console.log('🔐 ProtectedRoute: Access granted');
    }
  }, [user, loading, userRole, requiredRole, requiredPermission, router, hasPermission, fallbackPath]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated or authorized
  if (!user || (requiredRole && userRole !== requiredRole) || (requiredPermission && !hasPermission(requiredPermission))) {
    return null;
  }

  return <>{children}</>;
}