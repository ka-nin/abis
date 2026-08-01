import { useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { RefreshIcon } from '../../components/icons'
import DB_Access from './DB_Access'
import DB_BackUpRestore from './DB_BackUpRestore'
import DB_AudLogArch from './DB_AudLogArch'

const TABS = ['System Files', 'Database Access', 'Backup & Restore', 'Audit Log Archive']

const SYSTEM_FILES = [
  { path: '/var/abis/voters.db', type: 'SQLite DB', size: '2.1 TB', modified: 'Jul 26, 2026 08:00', access: 'R/W' },
  { path: '/var/abis/biometric.bin', type: 'Binary', size: '312 GB', modified: 'Jul 26, 2026 08:00', access: 'R' },
  { path: '/var/abis/audit.log', type: 'Log', size: '4.2 GB', modified: 'Jul 26, 2026 09:14', access: 'R/W' },
  { path: '/var/abis/config.yaml', type: 'Config', size: '48 KB', modified: 'Jul 10, 2026', access: 'R/W' },
  { path: '/var/abis/keys/', type: 'Directory', size: '—', modified: 'Jul 10, 2026', access: 'R' },
  { path: '/var/backup/2026-07-25.tar.gz', type: 'Backup', size: '840 GB', modified: 'Jul 25, 2026 03:00', access: 'R' },
]

function SystemFilesTab() {
  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">System Files</h2>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Path</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Type</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Size</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Modified</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SYSTEM_FILES.map((file) => (
                <tr key={file.path} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-sm text-slate-700">{file.path}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{file.type}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{file.size}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-400">{file.modified}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-400">{file.access}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function DB_SysFiles({ onNavigate, onLogout, onBellClick }) {
  const [activeTab, setActiveTab] = useState('System Files')

  return (
    <AdminLayout
      active="database"
      onNavigate={onNavigate}
      onLogout={onLogout}
      onBellClick={onBellClick}
      title="Database & Backup"
      subtitle="System files, database access, and backup management"
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

      {activeTab === 'System Files' && <SystemFilesTab />}
      {activeTab === 'Database Access' && <DB_Access />}
      {activeTab === 'Backup & Restore' && <DB_BackUpRestore />}
      {activeTab === 'Audit Log Archive' && <DB_AudLogArch />}
    </AdminLayout>
  )
}