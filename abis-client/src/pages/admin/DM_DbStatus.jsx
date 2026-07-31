import { DatabaseIcon, RefreshIcon, ClockIcon } from '../../components/icons'

const DB_STATS = [
  {
    key: 'dbSize',
    label: 'DB Size',
    value: '2.4 TB',
    icon: DatabaseIcon,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    key: 'lastSync',
    label: 'Last Sync',
    value: '08:00 AM',
    icon: RefreshIcon,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    key: 'pendingSync',
    label: 'Pending Sync',
    value: '1,247',
    icon: ClockIcon,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
]

const AGENCY_CONNECTIONS = [
  {
    key: 'psa',
    name: 'Philippine Statistics Authority (PSA)',
    subtitle: 'Civil Registry · 110.2M records',
    status: 'Connected',
    lastSync: 'Today 08:00 AM',
  },
  {
    key: 'lto',
    name: 'Land Transportation Office (LTO)',
    subtitle: "Driver's License · 28.4M records",
    status: 'Connected',
    lastSync: 'Today 08:00 AM',
  },
  {
    key: 'philsys',
    name: 'PhilSys — National ID',
    subtitle: 'PhilSys Registry · 72.1M records',
    status: 'Connected',
    lastSync: 'Today 07:30 AM',
  },
  {
    key: 'sss',
    name: 'Social Security System (SSS)',
    subtitle: 'UMID Records · 40.8M records',
    status: 'Degraded',
    lastSync: 'Yesterday 09:00 PM',
  },
  {
    key: 'gsis',
    name: 'GSIS',
    subtitle: 'Gov. Employee ID · 1.8M records',
    status: 'Connected',
    lastSync: 'Today 08:00 AM',
  },
]

const STATUS_STYLES = {
  Connected: { badge: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
  Degraded: { badge: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
  Offline: { badge: 'bg-red-50 text-red-600', dot: 'bg-red-500' },
}

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

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Offline
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${style.badge}`}>{status}</span>
}

export default function DM_DbStatus() {
  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {DB_STATS.map(({ key, ...card }) => (
          <StatCard key={key} {...card} />
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Agency Connections</h2>

        <ul className="mt-3 divide-y divide-slate-100">
          {AGENCY_CONNECTIONS.map((agency) => {
            const style = STATUS_STYLES[agency.status] || STATUS_STYLES.Offline
            return (
              <li key={agency.key} className="flex items-center gap-3 py-3.5">
                <span className={`h-2 w-2 flex-shrink-0 rounded-full ${style.dot}`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{agency.name}</p>
                  <p className="truncate text-xs text-slate-400">{agency.subtitle}</p>
                </div>
                <StatusBadge status={agency.status} />
                <span className="w-28 flex-shrink-0 text-right text-xs text-slate-400">{agency.lastSync}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
