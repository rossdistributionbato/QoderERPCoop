'use client';

import { useState } from 'react';
import { 
  Plus, Save, Download, Calendar, Filter, BarChart3, 
  PieChart, LineChart, Table, FileText, Settings,
  Trash2, Edit3, Copy, Eye, Users, Package, DollarSign,
  Wheat, TrendingUp, Clock, Target
} from 'lucide-react';

interface ReportField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'currency' | 'percentage';
  source: string;
  aggregation?: 'sum' | 'avg' | 'count' | 'min' | 'max';
}

interface ReportFilter {
  id: string;
  field: string;
  operator: 'equals' | 'contains' | 'greater' | 'less' | 'between';
  value: any;
  label: string;
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  fields: ReportField[];
  filters: ReportFilter[];
  visualization: 'table' | 'bar' | 'line' | 'pie';
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    enabled: boolean;
  };
}

const ReportBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [reportName, setReportName] = useState('');
  const [selectedFields, setSelectedFields] = useState<ReportField[]>([]);
  const [filters, setFilters] = useState<ReportFilter[]>([]);
  const [visualization, setVisualization] = useState<'table' | 'bar' | 'line' | 'pie'>('table');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [isBuilding, setIsBuilding] = useState(false);

  const availableFields: ReportField[] = [
    // Financial Fields
    { id: 'revenue', name: 'Revenue', type: 'currency', source: 'sales', aggregation: 'sum' },
    { id: 'profit', name: 'Profit', type: 'currency', source: 'sales', aggregation: 'sum' },
    { id: 'cost', name: 'Cost', type: 'currency', source: 'production', aggregation: 'sum' },
    { id: 'margin', name: 'Profit Margin', type: 'percentage', source: 'sales', aggregation: 'avg' },
    
    // Production Fields
    { id: 'paddy_intake', name: 'Paddy Intake', type: 'number', source: 'procurement', aggregation: 'sum' },
    { id: 'rice_output', name: 'Rice Output', type: 'number', source: 'production', aggregation: 'sum' },
    { id: 'conversion_rate', name: 'Conversion Rate', type: 'percentage', source: 'production', aggregation: 'avg' },
    { id: 'quality_score', name: 'Quality Score', type: 'percentage', source: 'production', aggregation: 'avg' },
    
    // Customer Fields
    { id: 'customer_count', name: 'Customer Count', type: 'number', source: 'customers', aggregation: 'count' },
    { id: 'customer_satisfaction', name: 'Customer Satisfaction', type: 'number', source: 'customers', aggregation: 'avg' },
    { id: 'retention_rate', name: 'Retention Rate', type: 'percentage', source: 'customers', aggregation: 'avg' },
    
    // Inventory Fields
    { id: 'stock_level', name: 'Stock Level', type: 'number', source: 'inventory', aggregation: 'sum' },
    { id: 'turnover_rate', name: 'Turnover Rate', type: 'number', source: 'inventory', aggregation: 'avg' },
    { id: 'stock_value', name: 'Stock Value', type: 'currency', source: 'inventory', aggregation: 'sum' },
    
    // Farmer Fields
    { id: 'farmer_count', name: 'Active Farmers', type: 'number', source: 'farmers', aggregation: 'count' },
    { id: 'avg_quality', name: 'Average Quality', type: 'percentage', source: 'farmers', aggregation: 'avg' },
    { id: 'payment_due', name: 'Payment Due', type: 'currency', source: 'farmers', aggregation: 'sum' }
  ];

  const reportTemplates: ReportTemplate[] = [
    {
      id: 'daily_operations',
      name: 'Daily Operations Report',
      description: 'Comprehensive daily operational metrics',
      category: 'Operations',
      icon: BarChart3,
      fields: [
        availableFields.find(f => f.id === 'paddy_intake')!,
        availableFields.find(f => f.id === 'rice_output')!,
        availableFields.find(f => f.id === 'conversion_rate')!,
        availableFields.find(f => f.id === 'quality_score')!
      ],
      filters: [
        { id: '1', field: 'date', operator: 'equals', value: 'today', label: 'Today' }
      ],
      visualization: 'table',
      schedule: { frequency: 'daily', enabled: true }
    },
    {
      id: 'financial_summary',
      name: 'Financial Performance Report',
      description: 'Revenue, costs, and profitability analysis',
      category: 'Financial',
      icon: DollarSign,
      fields: [
        availableFields.find(f => f.id === 'revenue')!,
        availableFields.find(f => f.id === 'cost')!,
        availableFields.find(f => f.id === 'profit')!,
        availableFields.find(f => f.id === 'margin')!
      ],
      filters: [
        { id: '1', field: 'period', operator: 'equals', value: 'month', label: 'This Month' }
      ],
      visualization: 'bar',
      schedule: { frequency: 'monthly', enabled: false }
    },
    {
      id: 'customer_insights',
      name: 'Customer Analysis Report',
      description: 'Customer behavior and satisfaction metrics',
      category: 'Customer',
      icon: Users,
      fields: [
        availableFields.find(f => f.id === 'customer_count')!,
        availableFields.find(f => f.id === 'customer_satisfaction')!,
        availableFields.find(f => f.id === 'retention_rate')!
      ],
      filters: [],
      visualization: 'pie',
      schedule: { frequency: 'weekly', enabled: false }
    },
    {
      id: 'inventory_status',
      name: 'Inventory Status Report',
      description: 'Stock levels, turnover, and inventory value',
      category: 'Inventory',
      icon: Package,
      fields: [
        availableFields.find(f => f.id === 'stock_level')!,
        availableFields.find(f => f.id === 'stock_value')!,
        availableFields.find(f => f.id === 'turnover_rate')!
      ],
      filters: [
        { id: '1', field: 'status', operator: 'equals', value: 'active', label: 'Active Stock' }
      ],
      visualization: 'table'
    }
  ];

  const handleTemplateSelect = (template: ReportTemplate) => {
    setSelectedTemplate(template.id);
    setReportName(template.name);
    setSelectedFields(template.fields);
    setFilters(template.filters);
    setVisualization(template.visualization);
  };

  const handleFieldToggle = (field: ReportField) => {
    const exists = selectedFields.find(f => f.id === field.id);
    if (exists) {
      setSelectedFields(selectedFields.filter(f => f.id !== field.id));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleGenerateReport = async () => {
    setIsBuilding(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsBuilding(false);
    // In real app, this would trigger report generation and download
    alert('Report generated successfully!');
  };

  const categories = Array.from(new Set(reportTemplates.map(t => t.category)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Report Builder</h1>
          <p className="text-gray-600 mt-1">Create custom reports and analytics</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button 
            onClick={handleGenerateReport}
            disabled={selectedFields.length === 0 || isBuilding}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {isBuilding ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <BarChart3 className="h-4 w-4" />
                <span>Generate Report</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: Templates & Configuration */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Templates */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Templates</h3>
            <div className="space-y-3">
              {reportTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedTemplate === template.id
                      ? 'border-primary-300 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <template.icon className="h-5 w-5 text-gray-500" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{template.name}</p>
                      <p className="text-xs text-gray-600">{template.description}</p>
                      <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mt-1">
                        {template.category}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Report Configuration */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration</h3>
            
            {/* Report Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Name
              </label>
              <input
                type="text"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                placeholder="Enter report name"
              />
            </div>

            {/* Date Range */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* Visualization Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visualization
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { type: 'table', icon: Table, label: 'Table' },
                  { type: 'bar', icon: BarChart3, label: 'Bar Chart' },
                  { type: 'line', icon: LineChart, label: 'Line Chart' },
                  { type: 'pie', icon: PieChart, label: 'Pie Chart' }
                ].map((viz) => (
                  <button
                    key={viz.type}
                    onClick={() => setVisualization(viz.type as any)}
                    className={`flex items-center space-x-2 p-2 rounded-lg border text-sm ${
                      visualization === viz.type
                        ? 'border-primary-300 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <viz.icon className="h-4 w-4" />
                    <span>{viz.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Field Selection & Preview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Field Selection */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Fields</h3>
              <span className="text-sm text-gray-500">{selectedFields.length} selected</span>
            </div>

            {/* Selected Fields */}
            {selectedFields.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Fields</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFields.map((field) => (
                    <span
                      key={field.id}
                      className="inline-flex items-center bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full"
                    >
                      {field.name}
                      <button
                        onClick={() => handleFieldToggle(field)}
                        className="ml-1 text-primary-600 hover:text-primary-800"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Available Fields by Category */}
            <div className="space-y-4">
              {['Financial', 'Production', 'Customer', 'Inventory', 'Farmer'].map((category) => {
                const categoryFields = availableFields.filter(field => {
                  if (category === 'Financial') return ['sales'].includes(field.source);
                  if (category === 'Production') return ['production', 'procurement'].includes(field.source);
                  if (category === 'Customer') return field.source === 'customers';
                  if (category === 'Inventory') return field.source === 'inventory';
                  if (category === 'Farmer') return field.source === 'farmers';
                  return false;
                });

                return (
                  <div key={category}>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{category}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {categoryFields.map((field) => {
                        const isSelected = selectedFields.find(f => f.id === field.id);
                        return (
                          <button
                            key={field.id}
                            onClick={() => handleFieldToggle(field)}
                            className={`text-left p-3 rounded-lg border transition-colors ${
                              isSelected
                                ? 'border-primary-300 bg-primary-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900 text-sm">{field.name}</p>
                                <p className="text-xs text-gray-500">
                                  {field.type} • {field.aggregation}
                                </p>
                              </div>
                              {isSelected && (
                                <div className="w-4 h-4 bg-primary-600 rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Report Preview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
            
            {selectedFields.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No Fields Selected</h4>
                <p className="text-gray-600">Select fields from the left panel to preview your report</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{reportName || 'Custom Report'}</h4>
                  <span className="text-sm text-gray-500">{visualization} view</span>
                </div>
                
                {/* Mock Preview Table */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {selectedFields.map((field) => (
                          <th
                            key={field.id}
                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {field.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[1, 2, 3].map((row) => (
                        <tr key={row}>
                          {selectedFields.map((field) => (
                            <td key={field.id} className="px-4 py-2 text-sm text-gray-900">
                              {field.type === 'currency' ? '₱12,500' :
                               field.type === 'percentage' ? '85.2%' :
                               field.type === 'number' ? '1,250' :
                               'Sample Data'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <p className="text-xs text-gray-500">
                  This is a preview with sample data. Actual report will contain real data based on your selections.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;