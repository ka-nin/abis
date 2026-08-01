import { useRef, useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { RefreshIcon, DownloadIcon } from '../../components/icons'
import DM_Export from './DM_Export'
import DM_DbStatus from './DM_DbStatus'

const REQUIRED_COLUMNS = [
  'voter_id',
  'last_name',
  'first_name',
  'middle_name',
  'birthdate',
  'sex',
  'address',
  'precinct_code',
]

const RECENT_IMPORTS = [
  { filename: 'voters_region3_batch4.csv', records: '85,240', status: 'Success', date: 'Jul 26, 2026', by: 'Admin Reyes' },
  { filename: 'voters_ncr_update.xlsx', records: '12,100', status: 'Success', date: 'Jul 25, 2026', by: 'Admin Cruz' },
  { filename: 'voters_region7_export.csv', records: '34,800', status: 'Partial', date: 'Jul 24, 2026', by: 'Admin Santos' },
  { filename: 'batch_biometric_sync.json', records: '5,200', status: 'Success', date: 'Jul 23, 2026', by: 'System' },
]

const TABS = ['Import Data', 'Export Data', 'Database Status']

const STATUS_STYLES = {
  Success: 'bg-emerald-50 text-emerald-700',
  Partial: 'bg-amber-50 text-amber-700',
  Failed: 'bg-red-50 text-red-600',
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  )
}

function ImportDataTab() {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleBrowse = () => fileInputRef.current?.click()

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
  }

  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Import Voter Records</h2>

        <div
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
            isDragging ? 'border-blue-400 bg-blue-50/50' : 'border-slate-200'
          }`}
        >
          <DownloadIcon className="h-8 w-8 text-slate-300" />
          <p className="mt-3 text-sm font-semibold text-slate-700">Drag &amp; drop CSV file here</p>
          <p className="mt-1 text-xs text-slate-400">or click to browse — supports .csv, .xlsx, .json</p>
          <button
            type="button"
            onClick={handleBrowse}
            className="mt-4 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700"
          >
            Browse File
          </button>
          <input ref={fileInputRef} type="file" accept=".csv,.xlsx,.json" className="hidden" />
        </div>

        <div className="mt-4 rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Required Columns</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {REQUIRED_COLUMNS.map((col) => (
              <span key={col} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                {col}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Recent Imports</h2>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Filename</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Records</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Status</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Date</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RECENT_IMPORTS.map((row) => (
                <tr key={row.filename} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-slate-900">{row.filename}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{row.records}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-400">{row.date}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-400">{row.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function DM_Import({ onNavigate, onLogout, onBellClick }) {
  const [activeTab, setActiveTab] = useState('Import Data')

  return (
    <AdminLayout
      active="data-migration"
      onNavigate={onNavigate}
      onLogout={onLogout}
      onBellClick={onBellClick}
      title="Data Migration"
      subtitle="Import, export, and monitor database operations"
      headerActions={
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          <RefreshIcon className="h-4 w-4" />
          Sync Now
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

      {activeTab === 'Import Data' && <ImportDataTab />}
      {activeTab === 'Export Data' && <DM_Export />}
      {activeTab === 'Database Status' && <DM_DbStatus />}
    </AdminLayout>
  )
}
