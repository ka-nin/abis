import { DownloadIcon, InfoCircleIcon } from '../../components/icons'

const EXPORT_OPTIONS = [
  {
    key: 'fullDatabase',
    label: 'Full Voter Database',
    description: 'All active voter records · ~4.2 GB',
  },
  {
    key: 'biometricHashes',
    label: 'Biometric Hashes',
    description: 'Anonymized biometric identifiers · ~1.8 GB',
  },
  {
    key: 'adjudicationLog',
    label: 'Adjudication Log',
    description: 'All resolved and pending cases · ~240 MB',
  },
  {
    key: 'registrationSummary',
    label: 'Registration Summary',
    description: 'Aggregate by region/district · ~12 MB',
  },
]

function ExportCard({ label, description, onExport }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 px-4 py-3.5">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="mt-0.5 truncate text-xs text-slate-400">{description}</p>
      </div>
      <button
        type="button"
        onClick={onExport}
        aria-label={`Download ${label}`}
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
      >
        <DownloadIcon className="h-4 w-4" />
      </button>
    </div>
  )
}

export default function DM_Export() {
  const handleExport = (key) => {
    // Trigger export for the given dataset
  }

  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Export Voter Data</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {EXPORT_OPTIONS.map((option) => (
            <ExportCard
              key={option.key}
              label={option.label}
              description={option.description}
              onExport={() => handleExport(option.key)}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
          <InfoCircleIcon className="h-4 w-4 flex-shrink-0 text-amber-600" />
          <p className="text-sm text-amber-700">
            All exports are encrypted with AES-256. Access is logged in the audit trail.
          </p>
        </div>
      </div>
    </div>
  )
}
