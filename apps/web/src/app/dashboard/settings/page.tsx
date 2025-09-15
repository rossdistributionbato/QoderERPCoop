'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

// Unicode Icons
const SettingsIcon = () => <span>⚙️</span>;
const UserIcon = () => <span>👤</span>;
const SecurityIcon = () => <span>🔒</span>;
const NotificationIcon = () => <span>🔔</span>;
const SystemIcon = () => <span>💻</span>;
const SaveIcon = () => <span>💾</span>;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      millName: 'Rice Mill Co-op',
      contactEmail: 'info@ricemillcoop.com',
      phone: '+63 123 456 7890',
      address: 'Barangay Example, Philippines',
      currency: 'PHP',
      timezone: 'Asia/Manila',
      language: 'English'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      qualityAlerts: true,
      inventoryAlerts: true,
      productionAlerts: true,
      paymentReminders: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordRequirements: 'medium',
      loginAttempts: '3'
    },
    system: {
      autoBackup: true,
      backupFrequency: 'daily',
      dataRetention: '365',
      auditLogging: true,
      maintenanceMode: false
    }
  });

  const handleSave = (section: string) => {
    // Here you would save to your backend
    alert(`${section} settings saved successfully!`);
  };

  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'notifications', name: 'Notifications', icon: NotificationIcon },
    { id: 'security', name: 'Security', icon: SecurityIcon },
    { id: 'system', name: 'System', icon: SystemIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your system preferences and configurations</p>
        </div>

        {/* Settings Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                >
                  <tab.icon />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="space-y-6">
          {activeTab === 'general' && (
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mill Name
                    </label>
                    <Input
                      value={settings.general.millName}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, millName: e.target.value }
                      })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <Input
                      type="email"
                      value={settings.general.contactEmail}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, contactEmail: e.target.value }
                      })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      value={settings.general.phone}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, phone: e.target.value }
                      })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <Select
                      value={settings.general.currency}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, currency: e.target.value }
                      })}
                    >
                      <option value="PHP">Philippine Peso (₱)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <Select
                      value={settings.general.timezone}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, timezone: e.target.value }
                      })}
                    >
                      <option value="Asia/Manila">Asia/Manila</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York</option>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <Select
                      value={settings.general.language}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, language: e.target.value }
                      })}
                    >
                      <option value="English">English</option>
                      <option value="Filipino">Filipino</option>
                      <option value="Cebuano">Cebuano</option>
                    </Select>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <Input
                    value={settings.general.address}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, address: e.target.value }
                    })}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave('general')} className="bg-indigo-600 hover:bg-indigo-700">
                    <SaveIcon /> Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, emailNotifications: e.target.checked }
                      })}
                      className="h-4 w-4 text-indigo-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.smsNotifications}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, smsNotifications: e.target.checked }
                      })}
                      className="h-4 w-4 text-indigo-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Quality Alerts</h4>
                      <p className="text-sm text-gray-600">Get notified about quality control issues</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.qualityAlerts}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, qualityAlerts: e.target.checked }
                      })}
                      className="h-4 w-4 text-indigo-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Inventory Alerts</h4>
                      <p className="text-sm text-gray-600">Get notified about low stock levels</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.inventoryAlerts}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, inventoryAlerts: e.target.checked }
                      })}
                      className="h-4 w-4 text-indigo-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Production Alerts</h4>
                      <p className="text-sm text-gray-600">Get notified about production issues</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.productionAlerts}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, productionAlerts: e.target.checked }
                      })}
                      className="h-4 w-4 text-indigo-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Payment Reminders</h4>
                      <p className="text-sm text-gray-600">Get notified about pending payments</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.paymentReminders}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, paymentReminders: e.target.checked }
                      })}
                      className="h-4 w-4 text-indigo-600 rounded"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave('notifications')} className="bg-indigo-600 hover:bg-indigo-700">
                    <SaveIcon /> Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, twoFactorAuth: e.target.checked }
                      })}
                      className="h-4 w-4 text-indigo-600 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <Select
                      value={settings.security.sessionTimeout}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, sessionTimeout: e.target.value }
                      })}
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Requirements
                    </label>
                    <Select
                      value={settings.security.passwordRequirements}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, passwordRequirements: e.target.value }
                      })}
                    >
                      <option value="low">Low (6+ characters)</option>
                      <option value="medium">Medium (8+ chars, mixed case)</option>
                      <option value="high">High (12+ chars, numbers, symbols)</option>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Login Attempts
                    </label>
                    <Select
                      value={settings.security.loginAttempts}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, loginAttempts: e.target.value }
                      })}
                    >
                      <option value="3">3 attempts</option>
                      <option value="5">5 attempts</option>
                      <option value="10">10 attempts</option>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave('security')} className="bg-indigo-600 hover:bg-indigo-700">
                    <SaveIcon /> Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'system' && (
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Automatic Backup</h4>
                      <p className="text-sm text-gray-600">Enable automatic data backups</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.system.autoBackup}
                      onChange={(e) => setSettings({
                        ...settings,
                        system: { ...settings.system, autoBackup: e.target.checked }
                      })}
                      className="h-4 w-4 text-indigo-600 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Backup Frequency
                    </label>
                    <Select
                      value={settings.system.backupFrequency}
                      onChange={(e) => setSettings({
                        ...settings,
                        system: { ...settings.system, backupFrequency: e.target.value }
                      })}
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Retention (days)
                    </label>
                    <Select
                      value={settings.system.dataRetention}
                      onChange={(e) => setSettings({
                        ...settings,
                        system: { ...settings.system, dataRetention: e.target.value }
                      })}
                    >
                      <option value="90">90 days</option>
                      <option value="180">180 days</option>
                      <option value="365">1 year</option>
                      <option value="1095">3 years</option>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Audit Logging</h4>
                      <p className="text-sm text-gray-600">Track all system activities</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.system.auditLogging}
                      onChange={(e) => setSettings({
                        ...settings,
                        system: { ...settings.system, auditLogging: e.target.checked }
                      })}
                      className="h-4 w-4 text-indigo-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Maintenance Mode</h4>
                      <p className="text-sm text-gray-600">Temporarily disable system access</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.system.maintenanceMode}
                      onChange={(e) => setSettings({
                        ...settings,
                        system: { ...settings.system, maintenanceMode: e.target.checked }
                      })}
                      className="h-4 w-4 text-indigo-600 rounded"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave('system')} className="bg-indigo-600 hover:bg-indigo-700">
                    <SaveIcon /> Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}