'use client';

import { useState, useEffect } from 'react';
import { createClientComponentSupabase } from '@/lib/supabase';

interface TableInfo {
  name: string;
  count: number;
  status: 'checking' | 'success' | 'error';
  error?: string;
}

export default function DatabaseTestPage() {
  const [tables, setTables] = useState<TableInfo[]>([
    { name: 'users', count: 0, status: 'checking' },
    { name: 'mills', count: 0, status: 'checking' },
    { name: 'farmers', count: 0, status: 'checking' },
    { name: 'suppliers', count: 0, status: 'checking' },
    { name: 'paddy_intake', count: 0, status: 'checking' },
    { name: 'production', count: 0, status: 'checking' },
    { name: 'sales', count: 0, status: 'checking' },
    { name: 'inventory', count: 0, status: 'checking' },
    { name: 'payments', count: 0, status: 'checking' },
    { name: 'brayan', count: 0, status: 'checking' },
  ]);
  
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const [supabaseInfo, setSupabaseInfo] = useState<any>(null);

  const supabase = createClientComponentSupabase();

  useEffect(() => {
    testDatabaseConnection();
  }, []);

  const testDatabaseConnection = async () => {
    try {
      // Test basic connection
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.log('Session error (expected for unauthenticated):', sessionError.message);
      }

      // Get basic Supabase info
      setSupabaseInfo({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        connected: true,
        timestamp: new Date().toISOString(),
      });

      setConnectionStatus('connected');

      // Test each table
      for (const table of tables) {
        await testTable(table.name);
      }

    } catch (error) {
      console.error('Database connection failed:', error);
      setConnectionStatus('error');
    }
  };

  const testTable = async (tableName: string) => {
    try {
      // Try to query the table for row count
      const { count, error } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true });

      setTables(prev => prev.map(table => 
        table.name === tableName
          ? { 
              ...table, 
              count: count || 0, 
              status: error ? 'error' : 'success',
              error: error?.message 
            }
          : table
      ));

    } catch (error) {
      console.error(`Error testing table ${tableName}:`, error);
      setTables(prev => prev.map(table => 
        table.name === tableName
          ? { 
              ...table, 
              status: 'error',
              error: (error as Error).message 
            }
          : table
      ));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'checking': return '⏳';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return '❓';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checking': return 'text-yellow-600';
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            RiceMillOS Database Verification
          </h1>
          <p className="text-gray-600">
            Testing Supabase integration and verifying all 10 core tables
          </p>
        </div>

        {/* Connection Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📡 Connection Status
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Supabase Connection</h3>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">
                  {connectionStatus === 'connecting' && '⏳'}
                  {connectionStatus === 'connected' && '✅'}
                  {connectionStatus === 'error' && '❌'}
                </span>
                <span className={`font-medium ${
                  connectionStatus === 'connecting' ? 'text-yellow-600' :
                  connectionStatus === 'connected' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {connectionStatus === 'connecting' && 'Connecting...'}
                  {connectionStatus === 'connected' && 'Connected'}
                  {connectionStatus === 'error' && 'Connection Failed'}
                </span>
              </div>
            </div>

            {supabaseInfo && (
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Configuration</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>URL: {supabaseInfo.url?.substring(0, 30)}...</div>
                  <div>Tested: {new Date(supabaseInfo.timestamp).toLocaleTimeString()}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tables Status */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🗄️ Core Tables Status
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tables.map((table) => (
              <div key={table.name} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 capitalize">
                    {table.name.replace('_', ' ')}
                  </h3>
                  <span className="text-xl">{getStatusIcon(table.status)}</span>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <div className={`font-medium ${getStatusColor(table.status)}`}>
                    {table.status === 'checking' && 'Checking...'}
                    {table.status === 'success' && `${table.count} records`}
                    {table.status === 'error' && 'Error'}
                  </div>
                  
                  {table.error && (
                    <div className="text-xs text-red-500 mt-1 break-words">
                      {table.error}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Tables Status Summary:
              </span>
              <div className="flex space-x-4 text-sm">
                <span className="text-green-600">
                  ✅ {tables.filter(t => t.status === 'success').length} Working
                </span>
                <span className="text-red-600">
                  ❌ {tables.filter(t => t.status === 'error').length} Errors
                </span>
                <span className="text-yellow-600">
                  ⏳ {tables.filter(t => t.status === 'checking').length} Checking
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={testDatabaseConnection}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            disabled={connectionStatus === 'connecting'}
          >
            {connectionStatus === 'connecting' ? 'Testing...' : 'Retest Connection'}
          </button>
          
          <a
            href="http://127.0.0.1:54323"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors text-center"
          >
            Open Supabase Studio
          </a>
          
          <a
            href="/dashboard"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-center"
          >
            Go to Dashboard
          </a>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-2">🔗 Service Endpoints</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <div><strong>Database:</strong> postgresql://postgres:postgres@127.0.0.1:54322/postgres</div>
            <div><strong>API:</strong> http://127.0.0.1:54321</div>
            <div><strong>Studio:</strong> http://127.0.0.1:54323</div>
            <div><strong>Web App:</strong> http://localhost:3000</div>
          </div>
        </div>
      </div>
    </div>
  );
}