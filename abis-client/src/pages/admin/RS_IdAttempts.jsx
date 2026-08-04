import { SearchIcon, CheckCircleIcon, XCircleIcon, TrendUpIcon, FingerprintMark, CameraIcon, EyeIcon } from '../../components/icons'

const ATTEMPT_STATS = [
  {
    key: 'totalAttempts',
    label: 'Total Identification Attempts',
    value: '3,842,150',
    icon: SearchIcon,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    key: 'successfulMatches',
    label: 'Successful Matches',
    value: '3,758,940',
    icon: CheckCircleIcon,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    key: 'failedAttempts',
    label: 'Failed / No Match',
    value: '83,210',
    icon: XCircleIcon,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
  },
  {
    key: 'successRate',
    label: 'Success Rate',
    value: '97.8%',
    icon: TrendUpIcon,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
]

const ATTEMPTS_BY_MODALITY = [
  { key: 'fingerprint', label: 'Fingerprint', icon: FingerprintMark, attempts: '2,140,600', matched: '2,092,180', matchRate: '97.7%' },
  { key: 'face', label: 'Face', icon: CameraIcon, attempts: '1,520,300', matched: '1,491,020', matchRate: '98.1%' },
  { key: 'iris', label: 'Iris', icon: EyeIcon, attempts: '181,250', matched: '175,740', matchRate: '96.9%' },
]

const MATCHED_BY_JURISDICTION = [
  { region: 'NCR', attempts: '842,100', matched: '824,320', matchRate: '97.9%' },
  { region: 'Region I', attempts: '312,450', matched: '303,940', matchRate: '97.3%' },
  { region: 'Region III', attempts: '648,900', matched: '635,180', matchRate: '97.9%' },
  { region: 'Region IV-A', attempts: '712,340', matched: '697,860', matchRate: '98.0%' },
  { region: 'Region V', attempts: '294,600', matched: '286,520', matchRate: '97.3%' },
  { region: 'Region VII', attempts: '486,200', matched: '474,940', matchRate: '97.7%' },
  { region: 'Region XI', attempts: '318,760', matched: '310,180', matchRate: '97.3%' },
  { region: 'Overseas (All Posts)', attempts: '226,800', matched: '221,300', matchRate: '97.6%' },
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

function AttemptsByModalityCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">Attempts by Modality</h2>
      <ul className="mt-3 divide-y divide-slate-100">
        {ATTEMPTS_BY_MODALITY.map((m) => (
          <li key={m.key} className="flex items-center gap-3 py-3.5">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <m.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-900">{m.label}</p>
              <p className="text-xs text-slate-400">{m.attempts} attempts · {m.matched} matched</p>
            </div>
            <span className="flex-shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              {m.matchRate}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function MatchedByJurisdictionCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">Matched Records by Jurisdiction</h2>
      <p className="mt-1 text-xs text-slate-400">Identification attempts and successful matches per region.</p>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Jurisdiction</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Attempts</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Matched</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Match Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MATCHED_BY_JURISDICTION.map((row) => (
              <tr key={row.region} className="transition-colors hover:bg-slate-50">
                <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-slate-900">{row.region}</td>
                <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{row.attempts}</td>
                <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{row.matched}</td>
                <td className="whitespace-nowrap px-3 py-3">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {row.matchRate}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function RS_IdAttempts() {
  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ATTEMPT_STATS.map(({ key, ...card }) => (
          <StatCard key={key} {...card} />
        ))}
      </div>

      <AttemptsByModalityCard />
      <MatchedByJurisdictionCard />
    </div>
  )
}