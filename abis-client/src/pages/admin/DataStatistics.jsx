import { DownloadIcon, UserIcon, StarIcon, ShieldIcon, AlertTriangleIcon, LockIcon } from '../../components/icons'

const DEMOGRAPHIC_STATS = [
  {
    key: 'male',
    label: 'Male Voters',
    value: '32.1M',
    meta: '49.2% of total',
    icon: UserIcon,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    key: 'female',
    label: 'Female Voters',
    value: '33.1M',
    meta: '50.8% of total',
    icon: UserIcon,
    iconBg: 'bg-pink-50',
    iconColor: 'text-pink-600',
  },
  {
    key: 'seniorCitizen',
    label: 'Senior Citizens (60+)',
    value: '8.4M',
    meta: '12.9% of total',
    icon: StarIcon,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    key: 'pwd',
    label: 'PWD Voters',
    value: '1.2M',
    meta: '1.8% of total',
    icon: ShieldIcon,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    key: 'pdl',
    label: 'PDL Voters',
    value: '84,200',
    meta: 'Persons Deprived of Liberty',
    icon: LockIcon,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
  },
  {
    key: 'hits',
    label: 'Biometric / Watchlist Hits',
    value: '142',
    meta: 'Flagged this month',
    icon: AlertTriangleIcon,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
  },
]

const REGIONAL_STATISTICS = [
  {
    region: 'NCR',
    totalVoters: '12.4M',
    active: '11.2M',
    deactivated: '0.4M',
    pending: '0.8M',
    biometric: '11.8M',
    coverage: '95.2%',
  },
  {
    region: 'Region I',
    totalVoters: '3.2M',
    active: '2.9M',
    deactivated: '0.1M',
    pending: '0.2M',
    biometric: '3.0M',
    coverage: '93.8%',
  },
  {
    region: 'Region III',
    totalVoters: '8.2M',
    active: '7.1M',
    deactivated: '0.3M',
    pending: '0.5M',
    biometric: '7.8M',
    coverage: '95.1%',
  },
  {
    region: 'Region IV-A',
    totalVoters: '10.8M',
    active: '9.8M',
    deactivated: '0.4M',
    pending: '0.6M',
    biometric: '10.2M',
    coverage: '94.4%',
  },
  {
    region: 'Region V',
    totalVoters: '4.8M',
    active: '4.3M',
    deactivated: '0.2M',
    pending: '0.3M',
    biometric: '4.6M',
    coverage: '95.8%',
  },
  {
    region: 'Region VII',
    totalVoters: '6.4M',
    active: '5.8M',
    deactivated: '0.2M',
    pending: '0.4M',
    biometric: '6.1M',
    coverage: '95.3%',
  },
  {
    region: 'Region XI',
    totalVoters: '5.2M',
    active: '4.7M',
    deactivated: '0.2M',
    pending: '0.3M',
    biometric: '4.9M',
    coverage: '94.2%',
  },
]

function DemographicStatCard({ label, value, meta, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{meta}</p>
    </div>
  )
}

function StatCell({ value, isPercentage }) {
  return (
    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
      {isPercentage ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
          {value}
        </span>
      ) : (
        value
      )}
    </td>
  )
}

export default function DataStatistics() {
  const handleExport = () => {
    const csv = [
      ['Region', 'Total Voters', 'Active', 'Deactivated', 'Pending', 'Biometric', 'Coverage'],
      ...REGIONAL_STATISTICS.map((row) => [
        row.region,
        row.totalVoters,
        row.active,
        row.deactivated,
        row.pending,
        row.biometric,
        row.coverage,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data-statistics.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {DEMOGRAPHIC_STATS.map(({ key, ...card }) => (
          <DemographicStatCard key={key} {...card} />
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Data Statistics by Region</h2>
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
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Total Voters
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Deactivated
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Pending
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Biometric
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Coverage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {REGIONAL_STATISTICS.map((row, idx) => (
                <tr
                  key={row.region}
                  className={`transition-colors hover:bg-slate-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-900">
                    {row.region}
                  </td>
                  <StatCell value={row.totalVoters} isPercentage={false} />
                  <StatCell value={row.active} isPercentage={false} />
                  <StatCell value={row.deactivated} isPercentage={false} />
                  <StatCell value={row.pending} isPercentage={false} />
                  <StatCell value={row.biometric} isPercentage={false} />
                  <StatCell value={row.coverage} isPercentage={true} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
