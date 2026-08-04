import { useMemo, useState } from 'react'
import { DownloadIcon, LockIcon, CheckCircleIcon, RefreshIcon } from '../../components/icons'

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

// Deterministic 64-bit-ish string hash (cyrb53-style) — simulates a SHA-256 block hash for the UI's hash-chain display.
function hashOf(input) {
  let h1 = 0xdeadbeef
  let h2 = 0x41c6ce57
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(14, '0')
}

function buildChain(logs) {
  // Logs are stored newest-first; the hash chain is built oldest-to-newest, then re-reversed for display.
  const chronological = [...logs].reverse()
  const chained = chronological.reduce((acc, log) => {
    const prevHash = acc.length ? acc[acc.length - 1].hash : hashOf('GENESIS')
    const hash = hashOf(prevHash + JSON.stringify(log))
    acc.push({ ...log, prevHash, hash })
    return acc
  }, [])
  return chained.reverse()
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
  const chainedLogs = useMemo(() => buildChain(AUDIT_LOGS), [])
  const [isVerifying, setIsVerifying] = useState(false)
  const [lastVerified, setLastVerified] = useState('Jul 26, 2026 09:20 AM')

  const handleVerifyChain = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setLastVerified(new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }))
      setIsVerifying(false)
    }, 900)
  }

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

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <LockIcon className="h-4 w-4 flex-shrink-0 text-emerald-600" />
            <p className="text-sm text-emerald-700">
              <span className="font-semibold">Chain Integrity: Verified</span> — {chainedLogs.length}/{chainedLogs.length}{' '}
              records validated. Each entry's hash is chained to the previous entry; any alteration breaks the
              chain. Last verified: {lastVerified}.
            </p>
          </div>
          <button
            type="button"
            onClick={handleVerifyChain}
            disabled={isVerifying}
            className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshIcon className={`h-3.5 w-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
            {isVerifying ? 'Verifying...' : 'Re-verify Chain'}
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
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Block Hash</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {chainedLogs.map((log) => (
                <tr key={`${log.timestamp}-${log.user}`} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-sm text-slate-700">{log.timestamp}</td>
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-sm text-slate-700">{log.user}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm font-semibold text-slate-900">{log.action}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{log.entity}</td>
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-sm text-slate-400">{log.ip}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ResultBadge result={log.result} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span title={`Hash: ${log.hash}\nPrev: ${log.prevHash}`} className="font-mono text-xs text-slate-400">
                      {log.hash.slice(0, 10)}…
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <CheckCircleIcon className="h-3.5 w-3.5" />
                      Verified
                    </span>
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
