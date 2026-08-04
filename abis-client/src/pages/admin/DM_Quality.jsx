import {
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon,
  ScaleIcon,
  MapPinIcon,
} from '../../components/icons'

function GlobeIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 3c2.5 2.5 3.8 5.8 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.8-3.8-9S9.5 5.5 12 3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const QUALITY_CHECKS = [
  {
    key: 'completeness',
    label: 'Field Completeness',
    value: '98.2%',
    status: 'Pass',
    detail: '1,204 records with missing required fields',
  },
  {
    key: 'duplicates',
    label: 'Duplicate Detection',
    value: '312 found',
    status: 'Warning',
    detail: 'Flagged for manual review before commit',
  },
  {
    key: 'format',
    label: 'Format Validation',
    value: '99.1%',
    status: 'Pass',
    detail: '764 records with invalid date/ID format',
  },
  {
    key: 'referential',
    label: 'Referential Integrity',
    value: '99.8%',
    status: 'Pass',
    detail: '96 records reference an unknown precinct',
  },
]

const QUALITY_STATUS_STYLES = {
  Pass: { badge: 'bg-emerald-50 text-emerald-700', icon: CheckCircleIcon, iconColor: 'text-emerald-600' },
  Warning: { badge: 'bg-amber-50 text-amber-700', icon: AlertTriangleIcon, iconColor: 'text-amber-600' },
  Fail: { badge: 'bg-red-50 text-red-600', icon: XCircleIcon, iconColor: 'text-red-500' },
}

const DUPLICATE_RECORDS = [
  { id: 'DUP-1042', names: 'SANTOS, Maria C. / SANTOS, Maria Cruz', confidence: '96%', region: 'NCR', status: 'Pending Review' },
  { id: 'DUP-1043', names: 'CRUZ, Juan D. / CRUZ, Juan Dela', confidence: '91%', region: 'Region III', status: 'Pending Review' },
  { id: 'DUP-1044', names: 'REYES, Ana M. / REYES, Ana Marie', confidence: '88%', region: 'Region IV-A', status: 'Merged' },
  { id: 'DUP-1045', names: 'BAUTISTA, Pedro L. / BAUTISTA, Pedro Luis', confidence: '94%', region: 'Region VII', status: 'Pending Review' },
  { id: 'DUP-1046', names: 'MENDOZA, Rosa T. / MENDOZA, Rosa Teresa', confidence: '82%', region: 'Region XI', status: 'Dismissed' },
]

const DUPLICATE_STATUS_STYLES = {
  'Pending Review': 'bg-amber-50 text-amber-700',
  Merged: 'bg-emerald-50 text-emerald-700',
  Dismissed: 'border border-slate-200 bg-white text-slate-500',
}

const OV_STATS = [
  { key: 'detected', label: 'OV Records Detected', value: '4,812' },
  { key: 'annotated', label: 'Auto-Annotated OV', value: '4,690' },
  { key: 'conflicts', label: 'OV Conflicts (Needs Review)', value: '122' },
]

const OV_CONFLICTS = [
  { id: 'VRN-2026-004812', postCountry: 'Philippine Embassy, Abu Dhabi · UAE', reason: 'Existing local precinct still active', status: 'Pending Review' },
  { id: 'VRN-2026-004901', postCountry: 'Philippine Consulate, Dubai · UAE', reason: 'Duplicate OV annotation from prior batch', status: 'Pending Review' },
  { id: 'VRN-2026-005044', postCountry: 'Philippine Embassy, Riyadh · Saudi Arabia', reason: 'Missing Post/Country reference', status: 'Resolved' },
]

const OV_CONFLICT_STATUS_STYLES = {
  'Pending Review': 'bg-amber-50 text-amber-700',
  Resolved: 'bg-emerald-50 text-emerald-700',
}

const MONITORING_ROWS = [
  { date: 'Jul 26, 2026', jurisdiction: 'Region III', processed: '85,240', success: '84,910', errors: '330' },
  { date: 'Jul 25, 2026', jurisdiction: 'NCR', processed: '12,100', success: '12,088', errors: '12' },
  { date: 'Jul 24, 2026', jurisdiction: 'Region VII', processed: '34,800', success: '33,960', errors: '840' },
  { date: 'Jul 23, 2026', jurisdiction: 'Overseas (Multiple Posts)', processed: '5,200', success: '5,180', errors: '20' },
  { date: 'Jul 22, 2026', jurisdiction: 'Region IV-A', processed: '28,450', success: '28,401', errors: '49' },
  { date: 'Jul 21, 2026', jurisdiction: 'Region XI', processed: '9,640', success: '9,602', errors: '38' },
]

function QualityCheckCard({ label, value, status, detail }) {
  const style = QUALITY_STATUS_STYLES[status] || QUALITY_STATUS_STYLES.Pass
  const Icon = style.icon
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${style.badge}`}>
          <Icon className={`h-5 w-5 ${style.iconColor}`} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
      <span className={`mt-2 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${style.badge}`}>
        {status}
      </span>
      <p className="mt-2 text-xs text-slate-400">{detail}</p>
    </div>
  )
}

export default function DM_Quality() {
  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <ScaleIcon className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-semibold text-slate-900">Data Quality &amp; Integrity Checks</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUALITY_CHECKS.map((check) => (
            <QualityCheckCard key={check.key} {...check} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Duplicate Records Found</h2>
          <p className="text-sm text-slate-400">{DUPLICATE_RECORDS.length} clusters</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Cluster ID</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Matched Names</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Confidence</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Region</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DUPLICATE_RECORDS.map((row) => (
                <tr key={row.id} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-blue-600">{row.id}</td>
                  <td className="px-3 py-3 text-sm text-slate-700">{row.names}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{row.confidence}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{row.region}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        DUPLICATE_STATUS_STYLES[row.status] || 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <GlobeIcon className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-semibold text-slate-900">Overseas Voter (OV) Annotation Handling</h2>
        </div>
        <p className="mb-4 text-sm text-slate-500">
          Records identified as overseas voters during migration are automatically tagged with an OV
          annotation and cross-checked against existing local precinct assignments. Conflicts are routed
          for manual review.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {OV_STATS.map((stat) => (
            <div key={stat.key} className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">{stat.label}</p>
              <p className="mt-1 text-xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">VRN</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Post / Country</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Conflict Reason</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {OV_CONFLICTS.map((row) => (
                <tr key={row.id} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-blue-600">{row.id}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{row.postCountry}</td>
                  <td className="px-3 py-3 text-sm text-slate-600">{row.reason}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        OV_CONFLICT_STATUS_STYLES[row.status] || 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <MapPinIcon className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-semibold text-slate-900">Monitoring by Date &amp; Jurisdiction</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Date</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Jurisdiction</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Processed</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Success</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Errors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MONITORING_ROWS.map((row) => (
                <tr key={`${row.date}-${row.jurisdiction}`} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-400">{row.date}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-slate-900">{row.jurisdiction}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{row.processed}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-emerald-600">{row.success}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-red-500">{row.errors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}