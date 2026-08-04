import { useState } from 'react'
import { FingerprintMark, CheckCircleIcon, XCircleIcon, AlertTriangleIcon } from '../../components/icons'

const MATCH_THRESHOLD = 72

const PROBE = {
  id: 'FP-88210',
  vrn: 'VRN-2026-005512',
  biometric: 'Fingerprint (Right Index)',
  capturedAt: 'Jul 27, 2026 09:14 AM',
  station: 'Station 2',
}

const CANDIDATES = [
  { rank: 1, vrn: 'VRN-2019-441207', name: 'SANTOS, Maria Cruz', precinct: 'QC-0089-A', score: 94.6, biometric: 'FP + Face' },
  { rank: 2, vrn: 'VRN-2021-118842', name: 'SANTOS, Maria C.', precinct: 'QC-0091-C', score: 88.2, biometric: 'FP Only' },
  { rank: 3, vrn: 'VRN-2016-902314', name: 'SANTOS, Maria Corazon', precinct: 'MM-0021-B', score: 76.4, biometric: 'FP + Face' },
  { rank: 4, vrn: 'VRN-2022-330198', name: 'SANTOS, Ma. Cristina', precinct: 'QC-0089-A', score: 68.9, biometric: 'FP Only' },
  { rank: 5, vrn: 'VRN-2018-775501', name: 'SANTOS, Marissa C.', precinct: 'CEB-0041-A', score: 54.1, biometric: 'Face Only' },
]

const DECISION_STYLES = {
  Accepted: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-red-50 text-red-600',
  Flagged: 'bg-amber-50 text-amber-700',
}

function DecisionBadge({ decision }) {
  if (!decision) return <span className="text-xs text-slate-400">No decision</span>
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${DECISION_STYLES[decision]}`}>
      {decision}
    </span>
  )
}

export default function MatchCandidates() {
  const [decisions, setDecisions] = useState({})

  const setDecision = (rank, decision) => {
    setDecisions((prev) => ({ ...prev, [rank]: prev[rank] === decision ? undefined : decision }))
  }

  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FingerprintMark className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">1:N Match Results — Probe {PROBE.id}</p>
            <p className="text-xs text-slate-400">
              {PROBE.biometric} · Captured {PROBE.capturedAt} · {PROBE.station}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          <AlertTriangleIcon className="h-4 w-4 flex-shrink-0" />
          Match threshold is {MATCH_THRESHOLD}%. Candidates scoring below threshold are unlikely matches and
          shown for reviewer context only.
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Candidate Matches</h2>
          <p className="text-sm text-slate-400">{CANDIDATES.length} candidates returned</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Rank</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">VRN</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Name</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Precinct</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Biometric</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Match Score</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Decision</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CANDIDATES.map((c) => {
                const meetsThreshold = c.score >= MATCH_THRESHOLD
                return (
                  <tr key={c.rank} className="transition-colors hover:bg-slate-50">
                    <td className="whitespace-nowrap px-3 py-3 text-sm font-semibold text-slate-500">#{c.rank}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-blue-600">{c.vrn}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-slate-900">{c.name}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{c.precinct}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{c.biometric}</td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${meetsThreshold ? 'bg-emerald-500' : 'bg-slate-300'}`}
                            style={{ width: `${c.score}%` }}
                          />
                        </div>
                        <span className={`text-sm font-semibold ${meetsThreshold ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {c.score.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <DecisionBadge decision={decisions[c.rank]} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setDecision(c.rank, 'Accepted')}
                          aria-label="Accept candidate"
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-emerald-600 transition-colors hover:bg-emerald-50"
                        >
                          <CheckCircleIcon className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDecision(c.rank, 'Rejected')}
                          aria-label="Reject candidate"
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-red-500 transition-colors hover:bg-red-50"
                        >
                          <XCircleIcon className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDecision(c.rank, 'Flagged')}
                          aria-label="Flag candidate for review"
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-amber-600 transition-colors hover:bg-amber-50"
                        >
                          <AlertTriangleIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}