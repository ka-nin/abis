import { useState } from 'react'
import { ScaleIcon, SlidersIcon } from '../../components/icons'

const OPERATIONS = [
  {
    key: 'registration',
    operation: 'New Voter Registration (Duplicate Check)',
    mode: '1:N',
    description: 'Newly captured biometrics are searched against the entire database to detect duplicate enrollees.',
  },
  {
    key: 'electionDay',
    operation: 'Election Day Verification',
    mode: '1:1',
    description: "A voter's live biometric capture is compared only against their own record on file.",
  },
  {
    key: 'validation',
    operation: 'Reactivation / Validation Re-check',
    mode: '1:N',
    description: 'Completed or reactivated biometrics are re-screened against the database before approval.',
  },
  {
    key: 'adjudicationHit',
    operation: 'Adjudication Hit / Watchlist Screening',
    mode: '1:N',
    description: 'Candidate matches below the identification threshold are routed to Adjudication as Hit cases.',
  },
]

const MODE_STYLES = {
  '1:1': 'bg-blue-50 text-blue-700',
  '1:N': 'bg-violet-50 text-violet-700',
}

const INITIAL_THRESHOLDS = [
  { key: 'fingerprint', modality: 'Fingerprint', verification: 65, identification: 85, hit: 42 },
  { key: 'face', modality: 'Face', verification: 70, identification: 88, hit: 45 },
  { key: 'iris', modality: 'Iris', verification: 75, identification: 90, hit: 50 },
]

function OperationModeCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <ScaleIcon className="h-4 w-4 text-blue-600" />
        <h2 className="text-sm font-semibold text-slate-900">Matching Mode by Operation</h2>
      </div>
      <p className="mt-1 text-xs text-slate-400">
        Which matching mode — 1:1 (verification) or 1:N (identification) — each system operation uses.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Operation</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Matching Mode</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {OPERATIONS.map((row) => (
              <tr key={row.key} className="transition-colors hover:bg-slate-50">
                <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-slate-900">{row.operation}</td>
                <td className="whitespace-nowrap px-3 py-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${MODE_STYLES[row.mode]}`}>
                    {row.mode === '1:1' ? '1:1 Verification' : '1:N Identification'}
                  </span>
                </td>
                <td className="px-3 py-3 text-sm text-slate-500">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ThresholdConfigCard() {
  const [thresholds, setThresholds] = useState(INITIAL_THRESHOLDS)

  const updateThreshold = (key, field, value) => {
    setThresholds((prev) => prev.map((row) => (row.key === key ? { ...row, [field]: Number(value) } : row)))
  }

  const handleSave = () => {
    // Persist matching threshold configuration
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <SlidersIcon className="h-4 w-4 text-blue-600" />
        <h2 className="text-sm font-semibold text-slate-900">Matching Thresholds by Mode</h2>
      </div>
      <p className="mt-1 text-xs text-slate-400">
        Separate decision thresholds for 1:1 verification, 1:N identification, and the identification "Hit"
        threshold that routes low-confidence identification matches to Adjudication.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Modality</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">1:1 Verification Threshold</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">1:N Identification Threshold</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Adjudication Hit Threshold</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {thresholds.map((row) => (
              <tr key={row.key} className="transition-colors hover:bg-slate-50">
                <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-slate-900">{row.modality}</td>
                <td className="whitespace-nowrap px-3 py-3">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={row.verification}
                      onChange={(event) => updateThreshold(row.key, 'verification', event.target.value)}
                      className="w-20 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    <span className="text-xs text-slate-400">%</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={row.identification}
                      onChange={(event) => updateThreshold(row.key, 'identification', event.target.value)}
                      className="w-20 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    <span className="text-xs text-slate-400">%</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={row.hit}
                      onChange={(event) => updateThreshold(row.key, 'hit', event.target.value)}
                      className="w-20 rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-sm text-red-600 focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-100"
                    />
                    <span className="text-xs text-slate-400">%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-slate-400">
        Scores at or above the verification/identification threshold are accepted automatically. Scores at or
        below the Hit threshold are routed to Adjudication as a Biometric Mismatch / Hit case; scores between
        the two are held for manual examiner review.
      </p>

      <button
        type="button"
        onClick={handleSave}
        className="mt-4 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700"
      >
        Save Thresholds
      </button>
    </div>
  )
}

export default function SM_MatchingConfig() {
  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <OperationModeCard />
      <ThresholdConfigCard />
    </div>
  )
}
