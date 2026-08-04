import { useState } from 'react'
import { ArchiveIcon, DatabaseIcon, CalendarIcon, RefreshIcon, AlertTriangleIcon, CheckCircleIcon } from '../../components/icons'

const BACKUP_STATS = [
  {
    key: 'lastBackup',
    label: 'Last Backup',
    value: 'Today 03:00',
    icon: ArchiveIcon,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    key: 'backupSize',
    label: 'Backup Size',
    value: '840 GB',
    icon: DatabaseIcon,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    key: 'retention',
    label: 'Retention',
    value: '30 days',
    icon: CalendarIcon,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
]

const BACKUP_SCHEDULE = [
  { key: 'fullBackup', name: 'Full Backup', frequency: 'Daily at 03:00 AM', last: 'Jul 26, 2026 03:00', status: 'OK' },
  { key: 'incremental', name: 'Incremental', frequency: 'Every 6 hours', last: 'Jul 26, 2026 06:00', status: 'OK' },
  { key: 'transactionLog', name: 'Transaction Log', frequency: 'Every 15 minutes', last: 'Jul 26, 2026 09:15', status: 'OK' },
  { key: 'biometricArchive', name: 'Biometric Archive', frequency: 'Weekly (Sunday)', last: 'Jul 20, 2026 02:00', status: 'OK' },
  { key: 'monthlyArchive', name: 'Monthly Archive', frequency: 'Monthly (1st, 01:00 AM)', last: 'Jul 1, 2026 01:00', status: 'OK' },
]

const ROTATION_SCHEMES = ['FIFO (First In, First Out)', 'Grandfather-Father-Son (GFS)']

const INITIAL_ROTATION_POLICY = [
  { key: 'fullBackup', name: 'Full Backup', retainCount: 7, scheme: 'Grandfather-Father-Son (GFS)' },
  { key: 'incremental', name: 'Incremental', retainCount: 28, scheme: 'FIFO (First In, First Out)' },
  { key: 'transactionLog', name: 'Transaction Log', retainCount: 96, scheme: 'FIFO (First In, First Out)' },
  { key: 'biometricArchive', name: 'Biometric Archive', retainCount: 12, scheme: 'Grandfather-Father-Son (GFS)' },
  { key: 'monthlyArchive', name: 'Monthly Archive', retainCount: 12, scheme: 'Grandfather-Father-Son (GFS)' },
]

const RESTORE_POINTS = [
  { key: 'r1', label: 'Jul 26, 2026 03:00 AM', type: 'Full Backup', size: '840 GB', verified: true },
  { key: 'r2', label: 'Jul 26, 2026 06:00 AM', type: 'Incremental', size: '18 GB', verified: true },
  { key: 'r3', label: 'Jul 25, 2026 03:00 AM', type: 'Full Backup', size: '838 GB', verified: true },
  { key: 'r4', label: 'Jul 20, 2026 02:00 AM', type: 'Biometric Archive', size: '412 GB', verified: true },
  { key: 'r5', label: 'Jul 1, 2026 01:00 AM', type: 'Monthly Archive', size: '830 GB', verified: false },
]

function StatCard({ label, value, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  )
}

function handleRunNow() {
  // Trigger an on-demand backup run
}

function RotationPolicyCard() {
  const [policy, setPolicy] = useState(INITIAL_ROTATION_POLICY)

  const updatePolicy = (key, field, value) => {
    setPolicy((prev) => prev.map((row) => (row.key === key ? { ...row, [field]: value } : row)))
  }

  const handleSave = () => {
    // Persist rotation policy
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">Backup Rotation Scheme</h2>
      <p className="mt-1 text-xs text-slate-400">
        Controls how many copies of each backup type are retained and how older copies are cycled out.
      </p>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Backup Type</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Retain Count</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Rotation Scheme</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {policy.map((row) => (
              <tr key={row.key} className="transition-colors hover:bg-slate-50">
                <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-slate-900">{row.name}</td>
                <td className="whitespace-nowrap px-3 py-3">
                  <input
                    type="number"
                    min="1"
                    value={row.retainCount}
                    onChange={(event) => updatePolicy(row.key, 'retainCount', Number(event.target.value))}
                    className="w-20 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <select
                    value={row.scheme}
                    onChange={(event) => updatePolicy(row.key, 'scheme', event.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  >
                    {ROTATION_SCHEMES.map((scheme) => (
                      <option key={scheme}>{scheme}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="mt-4 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700"
      >
        Save Rotation Policy
      </button>
    </div>
  )
}

function RestoreConfirmModal({ point, onClose }) {
  const [confirmText, setConfirmText] = useState('')
  const [restoreStarted, setRestoreStarted] = useState(false)
  const canConfirm = confirmText.trim().toUpperCase() === 'RESTORE'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <button type="button" className="fixed inset-0 cursor-default" aria-label="Close restore dialog" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <AlertTriangleIcon className="h-4 w-4 text-red-500" />
            <h2 className="text-sm font-semibold text-slate-900">Restore Database</h2>
          </div>
        </div>

        <div className="px-6 py-5">
          {restoreStarted ? (
            <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
              <p className="text-sm text-emerald-700">
                Restore to <strong>{point.label}</strong> has been initiated. The system will be temporarily
                unavailable while the restore completes.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-600">
                You are about to restore the database to the following point. This will overwrite all data
                committed after this restore point and cannot be undone.
              </p>
              <div className="mt-3 rounded-xl bg-slate-50 p-4 text-sm">
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-500">Restore Point</span>
                  <span className="font-semibold text-slate-900">{point.label}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-500">Type</span>
                  <span className="font-semibold text-slate-900">{point.type}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-500">Size</span>
                  <span className="font-semibold text-slate-900">{point.size}</span>
                </div>
              </div>

              <label className="mt-4 block">
                <span className="text-xs text-slate-500">Type RESTORE to confirm</span>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(event) => setConfirmText(event.target.value)}
                  placeholder="RESTORE"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </label>
            </>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            {restoreStarted ? 'Close' : 'Cancel'}
          </button>
          {!restoreStarted && (
            <button
              type="button"
              disabled={!canConfirm}
              onClick={() => setRestoreStarted(true)}
              className="inline-flex items-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-red-500/30 transition-colors enabled:hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
            >
              Confirm Restore
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function RestorePointsCard() {
  const [restoreTarget, setRestoreTarget] = useState(null)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">Available Restore Points</h2>
      <p className="mt-1 text-xs text-slate-400">Restore the database to a previous verified backup.</p>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Restore Point</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Type</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Size</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Verified</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {RESTORE_POINTS.map((point) => (
              <tr key={point.key} className="transition-colors hover:bg-slate-50">
                <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-slate-900">{point.label}</td>
                <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{point.type}</td>
                <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{point.size}</td>
                <td className="whitespace-nowrap px-3 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                      point.verified ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {point.verified ? 'Verified' : 'Unverified'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-sm">
                  <button
                    type="button"
                    onClick={() => setRestoreTarget(point)}
                    className="font-semibold text-red-600 hover:underline"
                  >
                    Restore
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {restoreTarget && <RestoreConfirmModal point={restoreTarget} onClose={() => setRestoreTarget(null)} />}
    </div>
  )
}

export default function DB_BackUpRestore() {
  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {BACKUP_STATS.map(({ key, ...card }) => (
          <StatCard key={key} {...card} />
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Backup Schedule</h2>
          <button
            type="button"
            onClick={handleRunNow}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700"
          >
            <RefreshIcon className="h-4 w-4" />
            Run Now
          </button>
        </div>

        <ul className="divide-y divide-slate-100">
          {BACKUP_SCHEDULE.map((item) => (
            <li key={item.key} className="flex items-center gap-3 py-3.5">
              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="truncate text-xs text-slate-400">{item.frequency}</p>
              </div>
              <span className="flex-shrink-0 text-xs text-slate-400">Last: {item.last}</span>
              <span className="flex-shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                {item.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <RotationPolicyCard />
      <RestorePointsCard />
    </div>
  )
}
