import { useRef, useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { RefreshIcon, DownloadIcon, ArchiveIcon, ClockIcon, CheckCircleIcon } from '../../components/icons'
import DM_Export from './DM_Export'
import DM_DbStatus from './DM_DbStatus'
import DM_Quality from './DM_Quality'

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

const FIELD_MAPPING = [
  { source: 'voter_id', target: 'voter_id', type: 'String', status: 'Matched' },
  { source: 'last_name', target: 'last_name', type: 'String', status: 'Matched' },
  { source: 'first_name', target: 'first_name', type: 'String', status: 'Matched' },
  { source: 'middle_name', target: 'middle_name', type: 'String', status: 'Matched' },
  { source: 'birthdate', target: 'date_of_birth', type: 'Date', status: 'Transformed' },
  { source: 'sex', target: 'sex', type: 'Enum', status: 'Matched' },
  { source: 'address', target: 'residence_address', type: 'String', status: 'Transformed' },
  { source: 'precinct_code', target: 'precinct_id', type: 'String', status: 'Matched' },
  { source: 'ov_status', target: '—', type: '—', status: 'Unmapped' },
]

const MAPPING_STATUS_STYLES = {
  Matched: 'bg-emerald-50 text-emerald-700',
  Transformed: 'bg-blue-50 text-blue-700',
  Unmapped: 'bg-amber-50 text-amber-700',
}

const MIGRATION_PHASES = [
  { key: 'phase1', label: 'Phase 1', description: 'NCR & Region III' },
  { key: 'phase2', label: 'Phase 2', description: 'Luzon regions (I, IV-A, V)' },
  { key: 'phase3', label: 'Phase 3', description: 'Visayas & Mindanao regions' },
]

const RECENT_IMPORTS = [
  { filename: 'voters_region3_batch4.csv', records: '85,240', duplicates: 142, status: 'Success', date: 'Jul 26, 2026', by: 'Admin Reyes' },
  { filename: 'voters_ncr_update.xlsx', records: '12,100', duplicates: 18, status: 'Success', date: 'Jul 25, 2026', by: 'Admin Cruz' },
  { filename: 'voters_region7_export.csv', records: '34,800', duplicates: 96, status: 'Partial', date: 'Jul 24, 2026', by: 'Admin Santos' },
  { filename: 'batch_biometric_sync.json', records: '5,200', duplicates: 4, status: 'Success', date: 'Jul 23, 2026', by: 'System' },
]

const TABS = ['Import Data', 'Export Data', 'Database Status', 'Quality & Monitoring']

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
  const [migrationMode, setMigrationMode] = useState('full')
  const [phase, setPhase] = useState('phase1')
  const [rollbackPoint, setRollbackPoint] = useState('Jul 26, 2026 07:55 AM')

  const handleBrowse = () => fileInputRef.current?.click()

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleCreateRollbackPoint = () => {
    setRollbackPoint(new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }))
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
        <h2 className="text-sm font-semibold text-slate-900">Field Mapping / Compatibility Matrix</h2>
        <p className="mt-1 text-xs text-slate-400">
          How source columns map onto ABIS database fields for this import template.
        </p>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Source Column</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Target Field</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Data Type</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {FIELD_MAPPING.map((row) => (
                <tr key={row.source} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-sm text-slate-700">{row.source}</td>
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-sm text-slate-700">{row.target}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-500">{row.type}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        MAPPING_STATUS_STYLES[row.status] || 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Migration Mode</h2>
        <p className="mt-1 text-xs text-slate-400">Choose how this batch should be applied to the database.</p>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { key: 'full', label: 'Full Migration', description: 'Replace matching records entirely' },
            { key: 'incremental', label: 'Incremental', description: 'New & updated records only' },
            { key: 'phased', label: 'Phased Rollout', description: 'Apply in region-based phases' },
          ].map((mode) => (
            <button
              key={mode.key}
              type="button"
              onClick={() => setMigrationMode(mode.key)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                migrationMode === mode.key ? 'border-blue-400 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <p className={`text-sm font-semibold ${migrationMode === mode.key ? 'text-blue-700' : 'text-slate-900'}`}>
                {mode.label}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">{mode.description}</p>
            </button>
          ))}
        </div>

        {migrationMode === 'phased' && (
          <div className="mt-4 flex flex-wrap gap-2">
            {MIGRATION_PHASES.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setPhase(p.key)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  phase === p.key
                    ? 'border-blue-400 bg-blue-600 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {p.label} — {p.description}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2">
          <ArchiveIcon className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-semibold text-slate-900">Rollback Plan</h2>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          A restore point lets this batch be reverted without affecting records committed afterward.
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50">
              <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
            </span>
            <div>
              <p className="text-xs text-slate-400">Last Rollback Point</p>
              <p className="text-sm font-semibold text-slate-900">{rollbackPoint}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCreateRollbackPoint}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <ClockIcon className="h-4 w-4" />
            Create Rollback Point Now
          </button>
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Rollback points are retained for 30 days. Reverting a batch restores affected records to their
          state at the selected point and logs the action to the audit trail.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Recent Imports</h2>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Filename</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Records</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Duplicates</th>
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
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-amber-600">{row.duplicates}</td>
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
      {activeTab === 'Quality & Monitoring' && <DM_Quality />}
    </AdminLayout>
  )
}
