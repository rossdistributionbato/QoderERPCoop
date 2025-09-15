'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

// Unicode Icons
const PlayIcon = () => <span>▶️</span>;
const PauseIcon = () => <span>⏸️</span>;
const StopIcon = () => <span>⏹️</span>;
const SettingsIcon = () => <span>⚙️</span>;

interface BatchData {
  id: string;
  batchNumber: string;
  startDate: string;
  estimatedCompletion: string;
  actualCompletion?: string;
  status: 'planned' | 'in_progress' | 'completed' | 'paused' | 'quality_check';
  inputMaterial: string;
  plannedQuantity: number;
  processedQuantity: number;
  yieldPercentage: number;
  qualityGrade: string;
  assignedOperator: string;
  equipment: string;
  currentStage: 'cleaning' | 'husking' | 'polishing' | 'grading' | 'packaging';
  stages: BatchStage[];
  qualityChecks: QualityCheck[];
  alerts: BatchAlert[];
}

interface BatchStage {
  name: string;
  status: 'pending' | 'active' | 'completed';
  startTime?: string;
  endTime?: string;
  duration?: number;
  efficiency: number;
  notes?: string;
}

interface QualityCheck {
  id: string;
  timestamp: string;
  parameter: string;
  value: number;
  target: number;
  status: 'pass' | 'fail' | 'warning';
  operator: string;
}

interface BatchAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export default function ProductionManagement() {
  const [activeTab, setActiveTab] = useState('overview');
  const [batches, setBatches] = useState<BatchData[]>([]);
  const [newBatch, setNewBatch] = useState({
    inputMaterial: '',
    plannedQuantity: '',
    qualityGrade: '',
    assignedOperator: '',
    equipment: ''
  });

  // Mock data
  useEffect(() => {
    const mockBatches: BatchData[] = [
      {
        id: '1',
        batchNumber: 'MB-2024-001',
        startDate: '2024-01-15 08:00',
        estimatedCompletion: '2024-01-15 16:00',
        status: 'in_progress',
        inputMaterial: 'Paddy - Grade A',
        plannedQuantity: 1000,
        processedQuantity: 650,
        yieldPercentage: 72.5,
        qualityGrade: 'Premium',
        assignedOperator: 'John Doe',
        equipment: 'Mill Unit 1',
        currentStage: 'polishing',
        stages: [
          { name: 'cleaning', status: 'completed', startTime: '08:00', endTime: '09:30', duration: 90, efficiency: 95 },
          { name: 'husking', status: 'completed', startTime: '09:30', endTime: '11:00', duration: 90, efficiency: 92 },
          { name: 'polishing', status: 'active', startTime: '11:00', efficiency: 88 },
          { name: 'grading', status: 'pending', efficiency: 0 },
          { name: 'packaging', status: 'pending', efficiency: 0 }
        ],
        qualityChecks: [
          { id: 'qc1', timestamp: '09:15', parameter: 'Moisture', value: 14.2, target: 14.0, status: 'pass', operator: 'John Doe' },
          { id: 'qc2', timestamp: '10:45', parameter: 'Broken Rice %', value: 3.1, target: 5.0, status: 'pass', operator: 'John Doe' }
        ],
        alerts: [
          { id: 'a1', type: 'warning', message: 'Mill temperature slightly high', timestamp: '11:15', resolved: false }
        ]
      },
      {
        id: '2',
        batchNumber: 'MB-2024-002',
        startDate: '2024-01-16 09:00',
        estimatedCompletion: '2024-01-16 17:00',
        status: 'planned',
        inputMaterial: 'Paddy - Grade B',
        plannedQuantity: 800,
        processedQuantity: 0,
        yieldPercentage: 0,
        qualityGrade: 'Standard',
        assignedOperator: 'Jane Smith',
        equipment: 'Mill Unit 2',
        currentStage: 'cleaning',
        stages: [
          { name: 'cleaning', status: 'pending', efficiency: 0 },
          { name: 'husking', status: 'pending', efficiency: 0 },
          { name: 'polishing', status: 'pending', efficiency: 0 },
          { name: 'grading', status: 'pending', efficiency: 0 },
          { name: 'packaging', status: 'pending', efficiency: 0 }
        ],
        qualityChecks: [],
        alerts: []
      }
    ];
    setBatches(mockBatches);
  }, []);

  const handleCreateBatch = () => {
    if (!newBatch.inputMaterial || !newBatch.plannedQuantity) {
      alert('Please fill in all required fields');
      return;
    }

    const batch: BatchData = {
      id: (batches.length + 1).toString(),
      batchNumber: `MB-2024-${String(batches.length + 1).padStart(3, '0')}`,
      startDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
      estimatedCompletion: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 16).replace('T', ' '),
      status: 'planned',
      inputMaterial: newBatch.inputMaterial,
      plannedQuantity: parseInt(newBatch.plannedQuantity),
      processedQuantity: 0,
      yieldPercentage: 0,
      qualityGrade: newBatch.qualityGrade,
      assignedOperator: newBatch.assignedOperator,
      equipment: newBatch.equipment,
      currentStage: 'cleaning',
      stages: [
        { name: 'cleaning', status: 'pending', efficiency: 0 },
        { name: 'husking', status: 'pending', efficiency: 0 },
        { name: 'polishing', status: 'pending', efficiency: 0 },
        { name: 'grading', status: 'pending', efficiency: 0 },
        { name: 'packaging', status: 'pending', efficiency: 0 }
      ],
      qualityChecks: [],
      alerts: []
    };

    setBatches([...batches, batch]);
    setNewBatch({ inputMaterial: '', plannedQuantity: '', qualityGrade: '', assignedOperator: '', equipment: '' });
    setActiveTab('overview');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'planned': return 'text-yellow-600 bg-yellow-100';
      case 'paused': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const updateBatchStatus = (batchId: string, newStatus: BatchData['status']) => {
    setBatches(batches.map(batch => 
      batch.id === batchId ? { ...batch, status: newStatus } : batch
    ));
  };

  const activeBatches = batches.filter(b => b.status === 'in_progress');
  const plannedBatches = batches.filter(b => b.status === 'planned');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Production Management</h1>
          <p className="text-gray-600">Manage milling batches and track production progress</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Active Batches</p>
                  <p className="text-2xl font-bold text-blue-600">{activeBatches.length}</p>
                </div>
                <SettingsIcon />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Planned Batches</p>
                  <p className="text-2xl font-bold text-yellow-600">{plannedBatches.length}</p>
                </div>
                <span>🕐</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Total Production</p>
                  <p className="text-2xl font-bold text-green-600">2,450 kg</p>
                </div>
                <span>📈</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Avg Efficiency</p>
                  <p className="text-2xl font-bold text-purple-600">73.2%</p>
                </div>
                <span>🎯</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Batch Overview', icon: '📊' },
                { id: 'workflow', name: 'Workflow Monitor', icon: '🔄' },
                { id: 'quality', name: 'Quality Control', icon: '✅' },
                { id: 'create', name: 'Create Batch', icon: '➕' },
                { id: 'analytics', name: 'Analytics', icon: '📈' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                >
                  <span>{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Production Batches</h2>
              
              <div className="grid gap-4">
                {batches.map((batch) => (
                  <Card key={batch.id} className={`border-l-4 ${
                    batch.status === 'in_progress' ? 'border-l-blue-500' :
                    batch.status === 'planned' ? 'border-l-yellow-500' : 'border-l-green-500'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold">{batch.batchNumber}</h4>
                          <p className="text-gray-600">{batch.inputMaterial}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(batch.status)}`}>
                            {batch.status.replace('_', ' ').toUpperCase()}
                          </span>
                          {batch.status === 'planned' && (
                            <Button 
                              size="sm" 
                              onClick={() => updateBatchStatus(batch.id, 'in_progress')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <PlayIcon /> Start
                            </Button>
                          )}
                          {batch.status === 'in_progress' && (
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateBatchStatus(batch.id, 'paused')}
                              >
                                <PauseIcon /> Pause
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => updateBatchStatus(batch.id, 'completed')}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <StopIcon /> Complete
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Progress</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(batch.processedQuantity / batch.plannedQuantity) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-sm font-medium mt-1">
                            {batch.processedQuantity} / {batch.plannedQuantity} kg
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Operator</p>
                          <p className="font-medium">{batch.assignedOperator}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Equipment</p>
                          <p className="font-medium">{batch.equipment}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Yield</p>
                          <p className="font-medium">{batch.yieldPercentage}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <Card>
              <CardHeader>
                <CardTitle>Create New Milling Batch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Input Material *
                    </label>
                    <Select
                      value={newBatch.inputMaterial}
                      onChange={(e) => setNewBatch({...newBatch, inputMaterial: e.target.value})}
                    >
                      <option value="">Select material</option>
                      <option value="Paddy - Grade A+">Paddy - Grade A+</option>
                      <option value="Paddy - Grade A">Paddy - Grade A</option>
                      <option value="Paddy - Grade B">Paddy - Grade B</option>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Planned Quantity (kg) *
                    </label>
                    <Input
                      type="number"
                      value={newBatch.plannedQuantity}
                      onChange={(e) => setNewBatch({...newBatch, plannedQuantity: e.target.value})}
                      placeholder="Enter quantity"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quality Grade
                    </label>
                    <Select
                      value={newBatch.qualityGrade}
                      onChange={(e) => setNewBatch({...newBatch, qualityGrade: e.target.value})}
                    >
                      <option value="">Select grade</option>
                      <option value="Premium Plus">Premium Plus</option>
                      <option value="Premium">Premium</option>
                      <option value="Standard">Standard</option>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Operator
                    </label>
                    <Select
                      value={newBatch.assignedOperator}
                      onChange={(e) => setNewBatch({...newBatch, assignedOperator: e.target.value})}
                    >
                      <option value="">Select operator</option>
                      <option value="John Doe">John Doe</option>
                      <option value="Jane Smith">Jane Smith</option>
                      <option value="Mike Johnson">Mike Johnson</option>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Equipment
                    </label>
                    <Select
                      value={newBatch.equipment}
                      onChange={(e) => setNewBatch({...newBatch, equipment: e.target.value})}
                    >
                      <option value="">Select equipment</option>
                      <option value="Mill Unit 1">Mill Unit 1</option>
                      <option value="Mill Unit 2">Mill Unit 2</option>
                      <option value="Mill Unit 3">Mill Unit 3</option>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setActiveTab('overview')}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateBatch} className="bg-indigo-600 hover:bg-indigo-700">
                    Create Batch
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'workflow' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Batch Workflow Monitor</h2>
              
              {activeBatches.length > 0 ? (
                <div className="space-y-6">
                  {activeBatches.map((batch) => (
                    <Card key={batch.id} className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-lg">{batch.batchNumber}</CardTitle>
                            <p className="text-gray-600">{batch.inputMaterial} • {batch.assignedOperator}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Current Stage</p>
                            <p className="font-semibold capitalize">{batch.currentStage.replace('_', ' ')}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Stage Progress */}
                        <div className="mb-6">
                          <h4 className="font-medium mb-3">Process Stages</h4>
                          <div className="flex items-center space-x-4 overflow-x-auto">
                            {batch.stages.map((stage, index) => (
                              <div key={stage.name} className="flex items-center">
                                <div className={`flex flex-col items-center min-w-24`}>
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                    stage.status === 'completed' ? 'bg-green-500 text-white' :
                                    stage.status === 'active' ? 'bg-blue-500 text-white' :
                                    'bg-gray-300 text-gray-600'
                                  }`}>
                                    {stage.status === 'completed' ? '✓' : 
                                     stage.status === 'active' ? '⚡' : index + 1}
                                  </div>
                                  <p className="text-xs mt-1 capitalize text-center">{stage.name}</p>
                                  {stage.efficiency > 0 && (
                                    <p className="text-xs text-gray-500">{stage.efficiency}%</p>
                                  )}
                                </div>
                                {index < batch.stages.length - 1 && (
                                  <div className={`w-8 h-0.5 ${
                                    stage.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                                  }`} />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Real-time Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="bg-blue-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Progress</p>
                            <p className="text-lg font-semibold">{((batch.processedQuantity / batch.plannedQuantity) * 100).toFixed(1)}%</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Current Yield</p>
                            <p className="text-lg font-semibold">{batch.yieldPercentage}%</p>
                          </div>
                          <div className="bg-yellow-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Efficiency</p>
                            <p className="text-lg font-semibold">
                              {batch.stages.find(s => s.status === 'active')?.efficiency || 0}%
                            </p>
                          </div>
                          <div className="bg-purple-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Est. Completion</p>
                            <p className="text-lg font-semibold">{batch.estimatedCompletion.split(' ')[1]}</p>
                          </div>
                        </div>

                        {/* Alerts */}
                        {batch.alerts.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">Active Alerts</h4>
                            {batch.alerts.filter(a => !a.resolved).map((alert) => (
                              <div key={alert.id} className={`p-3 rounded border-l-4 ${
                                alert.type === 'error' ? 'bg-red-50 border-red-500' :
                                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                                'bg-blue-50 border-blue-500'
                              }`}>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{alert.message}</p>
                                    <p className="text-sm text-gray-600">{alert.timestamp}</p>
                                  </div>
                                  <Button size="sm" variant="outline">
                                    Resolve
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Quick Actions */}
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <PauseIcon /> Pause
                          </Button>
                          <Button size="sm" variant="outline">
                            ⚡ Next Stage
                          </Button>
                          <Button size="sm" variant="outline">
                            ✅ Quality Check
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            📊 View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-gray-500 text-lg">No active batches to monitor</p>
                    <p className="text-gray-400 mt-2">Start a new batch to see workflow monitoring</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'quality' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Quality Control Dashboard</h2>
              
              <div className="grid gap-6">
                {batches.filter(b => b.status === 'in_progress' || b.qualityChecks.length > 0).map((batch) => (
                  <Card key={batch.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{batch.batchNumber} - Quality Monitoring</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Quality Checks Table */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Recent Quality Checks</h4>
                        {batch.qualityChecks.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-2">Time</th>
                                  <th className="text-left py-2">Parameter</th>
                                  <th className="text-left py-2">Value</th>
                                  <th className="text-left py-2">Target</th>
                                  <th className="text-left py-2">Status</th>
                                  <th className="text-left py-2">Operator</th>
                                </tr>
                              </thead>
                              <tbody>
                                {batch.qualityChecks.map((check) => (
                                  <tr key={check.id} className="border-b">
                                    <td className="py-2">{check.timestamp}</td>
                                    <td className="py-2">{check.parameter}</td>
                                    <td className="py-2">{check.value}</td>
                                    <td className="py-2">{check.target}</td>
                                    <td className="py-2">
                                      <span className={`px-2 py-1 rounded text-xs ${
                                        check.status === 'pass' ? 'bg-green-100 text-green-800' :
                                        check.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                      }`}>
                                        {check.status.toUpperCase()}
                                      </span>
                                    </td>
                                    <td className="py-2">{check.operator}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center py-4">No quality checks recorded yet</p>
                        )}
                      </div>

                      {/* Quick Quality Check */}
                      {batch.status === 'in_progress' && (
                        <div className="bg-gray-50 p-4 rounded">
                          <h5 className="font-medium mb-3">Quick Quality Check</h5>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Parameter</label>
                              <Select>
                                <option>Moisture Content</option>
                                <option>Broken Rice %</option>
                                <option>Foreign Matter</option>
                                <option>Whiteness Index</option>
                              </Select>
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Value</label>
                              <Input type="number" step="0.1" placeholder="Enter value" />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Target</label>
                              <Input type="number" step="0.1" placeholder="Target value" />
                            </div>
                            <div className="flex items-end">
                              <Button className="w-full bg-green-600 hover:bg-green-700">
                                ✅ Record Check
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Production Analytics</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Input</span>
                        <span className="font-semibold">3,000 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Output</span>
                        <span className="font-semibold">2,190 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Yield</span>
                        <span className="font-semibold text-green-600">73.0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue</span>
                        <span className="font-semibold text-blue-600">₱124,500</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Workflow Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Cleaning Stage</span>
                        <span className="font-semibold text-green-600">95%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Husking Stage</span>
                        <span className="font-semibold text-green-600">92%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Polishing Stage</span>
                        <span className="font-semibold text-yellow-600">88%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Overall Efficiency</span>
                        <span className="font-semibold text-blue-600">91.7%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}