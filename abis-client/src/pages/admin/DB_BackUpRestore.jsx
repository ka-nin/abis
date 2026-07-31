import { ArchiveIcon, DatabaseIcon, CalendarIcon, RefreshIcon } from '../../components/icons'

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
    </div>
  )
}