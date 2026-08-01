import { DownloadIcon } from '../../components/icons'

const AUDIT_LOGS = [
  { timestamp: '2026-07-26 09:14:23', user: 'admin.reyes', action: 'EXPORT', entity: 'Voter Records', ip: '10.1.2.48', result: 'OK' },
  { timestamp: '2026-07-26 09:02:11', user: 'operator.cruz', action: 'VIEW', entity: 'Adjudication Case', ip: '10.1.2.51', result: 'OK' },
  { timestamp: '2026-07-26 08:55:40', user: 'api.service', action: 'UPDATE', entity: 'Biometric Record', ip: '10.1.1.10', result: 'OK' },
  { timestamp: '2026-07-26 08:48:12', user: 'admin.santos', action: 'DELETE', entity: 'Duplicate Record', ip: '10.1.2.49', result: 'OK' },
  { timestamp: '2026-07-26 08:22:01', user: 'unknown', action: 'LOGIN', entity: 'Admin Portal', ip: '203.112.34.8', result: 'Failed' },
  { timestamp: '2026-07-26 08:00:00', user: 'system', action: 'BACKUP', entity: 'Full Database', ip: 'localhost', result: 'OK' },
]

const RESULT_STYLES = {
  OK: 'bg-emerald-50 text-emerald-700',
  Failed: 'bg-red-50 text-red-600',
}

function ResultBadge({ result }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${RESULT_STYLES[result] || 'bg-slate-100 text-slate-600'}`}>
      {result}
    </span>
  )
}

function handleExportLogs() {
  // Trigger audit log export
}

export default function DB_AudLogArch() {
  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Audit Log Archive</h2>
          <button
            type="button"
            onClick={handleExportLogs}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <DownloadIcon className="h-4 w-4" />
            Export Logs
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Timestamp</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">User</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Action</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Entity</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">IP Address</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {AUDIT_LOGS.map((log) => (
                <tr key={`${log.timestamp}-${log.user}`} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-sm text-slate-700">{log.timestamp}</td>
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-sm text-slate-700">{log.user}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm font-semibold text-slate-900">{log.action}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{log.entity}</td>
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-sm text-slate-400">{log.ip}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ResultBadge result={log.result} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}