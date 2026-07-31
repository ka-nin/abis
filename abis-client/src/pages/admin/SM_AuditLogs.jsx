import { DownloadIcon } from '../../components/icons'

const AUDIT_LOGS = [
  { timestamp: '09:14:23', level: 'INFO', user: 'admin.reyes', action: 'Export', details: 'Voter records export — Region IV-A' },
  { timestamp: '09:02:11', level: 'INFO', user: 'operator.cruz', action: 'View', details: 'Adjudication case ADJ-2026-0881 reviewed' },
  { timestamp: '08:55:40', level: 'INFO', user: 'api.service', action: 'Update', details: 'Biometric record VRN-2026-001248 updated' },
  { timestamp: '08:40:12', level: 'WARN', user: 'admin.santos', action: 'Delete', details: 'Duplicate record flagged for deletion' },
  { timestamp: '08:22:01', level: 'ERROR', user: 'unknown', action: 'Login', details: '3 failed attempts from 203.112.14.8' },
  { timestamp: '08:00:00', level: 'INFO', user: 'system', action: 'Backup', details: 'Automated full backup completed (840 GB)' },
]

const LEVEL_STYLES = {
  INFO: 'border border-blue-200 bg-blue-50 text-blue-600',
  WARN: 'border border-amber-200 bg-amber-50 text-amber-600',
  ERROR: 'border border-red-200 bg-red-50 text-red-600',
}

function LevelBadge({ level }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${LEVEL_STYLES[level] || 'bg-slate-100 text-slate-600'}`}>
      {level}
    </span>
  )
}

function handleExport() {
  // Trigger audit log export
}

export default function SM_AuditLogs() {
  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">System Audit Logs</h2>
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <DownloadIcon className="h-4 w-4" />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Timestamp</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Level</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">User</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Action</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {AUDIT_LOGS.map((log) => (
                <tr key={`${log.timestamp}-${log.user}`} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-sm text-slate-700">{log.timestamp}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <LevelBadge level={log.level} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-sm text-slate-700">{log.user}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-slate-900">{log.action}</td>
                  <td className="px-3 py-3 text-sm text-slate-400">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}