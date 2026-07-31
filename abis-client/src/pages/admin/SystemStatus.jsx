import { CpuIcon, ServerIcon, ArchiveIcon, WifiIcon } from '../../components/icons'

const METRICS = [
  {
    key: 'cpu',
    label: 'CPU Usage',
    value: '42%',
    percent: 42,
    icon: CpuIcon,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    barColor: 'bg-blue-500',
    trackColor: 'bg-blue-100',
  },
  {
    key: 'memory',
    label: 'Memory',
    value: '6.2 / 16 GB',
    percent: 38.75,
    icon: ServerIcon,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    barColor: 'bg-emerald-500',
    trackColor: 'bg-emerald-100',
  },
  {
    key: 'storage',
    label: 'Storage',
    value: '2.4 / 8 TB',
    percent: 30,
    icon: ArchiveIcon,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    barColor: 'bg-amber-500',
    trackColor: 'bg-amber-100',
  },
  {
    key: 'network',
    label: 'Network I/O',
    value: '124 MB/s',
    percent: 62,
    icon: WifiIcon,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    barColor: 'bg-blue-500',
    trackColor: 'bg-blue-100',
  },
]

const SERVICES = [
  { name: 'ABIS Matching Engine', status: 'Running', uptime: '99.98%', latency: '12ms' },
  { name: 'Biometric Database', status: 'Running', uptime: '99.99%', latency: '4ms' },
  { name: 'PSA Gateway', status: 'Running', uptime: '99.82%', latency: '84ms' },
  { name: 'LTO Gateway', status: 'Running', uptime: '99.75%', latency: '91ms' },
  { name: 'PhilSys API', status: 'Degraded', uptime: '97.42%', latency: '340ms' },
  { name: 'COMELEC Main DB', status: 'Running', uptime: '99.99%', latency: '2ms' },
  { name: 'Audit Log Service', status: 'Running', uptime: '100%', latency: '1ms' },
]

const STATUS_STYLES = {
  Running: { dot: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-700' },
  Degraded: { dot: 'bg-amber-500', pill: 'bg-amber-50 text-amber-700' },
}

function MetricCard({ label, value, percent, icon: Icon, iconBg, iconColor, barColor, trackColor }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </span>
        <div className="min-w-0">
          <p className="text-xs text-slate-500">{label}</p>
          <p className="text-base font-bold text-slate-900">{value}</p>
        </div>
      </div>
      <div className={`mt-3 h-1.5 w-full overflow-hidden rounded-full ${trackColor}`}>
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${Math.min(percent, 100)}%` }} />
      </div>
    </div>
  )
}

function ServiceRow({ name, status, uptime, latency }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.Running
  return (
    <li className="flex items-center gap-3 py-3">
      <span className={`h-2 w-2 flex-shrink-0 rounded-full ${style.dot}`} />
      <p className="min-w-0 flex-1 truncate text-sm font-medium text-slate-900">{name}</p>
      <span className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.pill}`}>{status}</span>
      <span className="w-16 flex-shrink-0 text-right text-xs tabular-nums text-slate-400">{uptime}</span>
      <span className="w-14 flex-shrink-0 text-right text-xs tabular-nums text-slate-400">{latency}</span>
    </li>
  )
}

export default function SystemStatus() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map(({ key, ...metric }) => (
          <MetricCard key={key} {...metric} />
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Service Health</h2>
        <ul className="mt-2 max-h-[420px] divide-y divide-slate-100 overflow-y-auto">
          {SERVICES.map((service) => (
            <ServiceRow key={service.name} {...service} />
          ))}
        </ul>
      </div>
    </div>
  )
}