import { useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { RefreshIcon } from '../../components/icons'
import SM_AuditLogs from './SM_AuditLogs'
import SM_UserManagement from './SM_UserManagement'
import SM_AccessControl from './SM_AccessControl'
import SM_MatchingConfig from './SM_MatchingConfig'

const TABS = ['Settings', 'Audit Logs', 'User Management', 'Access Control', 'Matching Configuration']

const SYSTEM_INFO_READONLY = [
  { key: 'organization', label: 'Organization', value: 'National Election Commission (COMELEC)' },
  { key: 'environment', label: 'Environment', value: 'Production' },
  { key: 'version', label: 'Version', value: 'v4.2.1' },
  { key: 'buildDate', label: 'Build Date', value: '2026-07-01' },
]

function SystemInformationCard() {
  const [systemName, setSystemName] = useState('NEC-ABIS Production System')

  const handleSaveChanges = () => {
    // Persist system information
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">System Information</h2>

      <div className="mt-4 space-y-4">
        <label className="block">
          <span className="text-xs text-slate-500">System Name</span>
          <input
            type="text"
            value={systemName}
            onChange={(event) => setSystemName(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>

        {SYSTEM_INFO_READONLY.map((field) => (
          <label key={field.key} className="block">
            <span className="text-xs text-slate-500">{field.label}</span>
            <input
              type="text"
              value={field.value}
              readOnly
              className="mt-1.5 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
            />
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSaveChanges}
        className="mt-5 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  )
}

function ChangePasswordCard() {
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })

  const updateField = (key) => (event) => {
    setPasswords((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const handleUpdatePassword = () => {
    // Submit password change
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">Change Password</h2>

      <div className="mt-4 space-y-4">
        <label className="block">
          <span className="text-xs text-slate-500">Current Password</span>
          <input
            type="password"
            value={passwords.current}
            onChange={updateField('current')}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>
        <label className="block">
          <span className="text-xs text-slate-500">New Password</span>
          <input
            type="password"
            value={passwords.next}
            onChange={updateField('next')}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>
        <label className="block">
          <span className="text-xs text-slate-500">Confirm New Password</span>
          <input
            type="password"
            value={passwords.confirm}
            onChange={updateField('confirm')}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <p className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Minimum 12 characters with uppercase, numbers, and symbols.
        </p>
      </div>

      <button
        type="button"
        onClick={handleUpdatePassword}
        className="mt-5 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700"
      >
        Update Password
      </button>
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="max-h-[calc(100vh-260px)] overflow-y-auto pr-1">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SystemInformationCard />
        <ChangePasswordCard />
      </div>
    </div>
  )
}

export default function SM_Settings({ onNavigate, onLogout, onBellClick }) {
  const [activeTab, setActiveTab] = useState('Settings')

  return (
    <AdminLayout
      active="system"
      onNavigate={onNavigate}
      onLogout={onLogout}
      onBellClick={onBellClick}
      title="System Management"
      subtitle="Settings, audit logs, and user administration"
      headerActions={
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          <RefreshIcon className="h-4 w-4" />
          Refresh
        </button>
      }
    >
      <div className="mb-5 flex gap-1 overflow-x-auto border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Settings' && <SettingsTab />}
      {activeTab === 'Audit Logs' && <SM_AuditLogs />}
      {activeTab === 'User Management' && <SM_UserManagement />}
      {activeTab === 'Access Control' && <SM_AccessControl />}
      {activeTab === 'Matching Configuration' && <SM_MatchingConfig />}
    </AdminLayout>
  )
}