import { ClockIcon, ZapIcon, TrendDownIcon } from '../../components/icons'

const QUEUE_STATS = [
  {
    key: 'inQueue',
    label: 'In Queue',
    value: '1,847',
    icon: ClockIcon,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    key: 'processing',
    label: 'Processing',
    value: '312',
    icon: ZapIcon,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    key: 'avgWait',
    label: 'Avg Wait',
    value: '4.2 min',
    icon: TrendDownIcon,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
]

const LIVE_QUEUE = [
  { id: 'Q-001', name: 'Maria Santos', step: 'Biometric Capture', wait: '3 min', station: 'Station 1', status: 'Processing' },
  { id: 'Q-002', name: 'Juan Cruz', step: 'ID Verification', wait: '5 min', station: 'Station 2', status: 'Processing' },
  { id: 'Q-003', name: 'Ana Reyes', step: 'Personal Info', wait: '8 min', station: '—', status: 'Waiting' },
  { id: 'Q-004', name: 'Pedro Bautista', step: 'OTP Verification', wait: '11 min', station: '—', status: 'Waiting' },
  { id: 'Q-005', name: 'Rosa Mendoza', step: 'Registration', wait: '14 min', station: '—', status: 'Waiting' },
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

function StatusBadge({ status }) {
  const isProcessing = status === 'Processing'
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        isProcessing ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
      }`}
    >
      {status}
    </span>
  )
}

export default function Queueing() {
  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {QUEUE_STATS.map(({ key, ...card }) => (
          <StatCard key={key} {...card} />
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Live Queue</h2>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Queue #</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Name</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Step</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Wait</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Station</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {LIVE_QUEUE.map((row) => (
                <tr key={row.id} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-blue-600">{row.id}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-slate-900">{row.name}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{row.step}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{row.wait}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-400">{row.station}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <StatusBadge status={row.status} />
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
