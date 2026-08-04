import { useState } from 'react'
import {
  SearchIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  SlidersIcon,
  ScaleIcon,
  UserIcon,
  ClockIcon,
} from '../../components/icons'

export const TYPE_STYLES = {
  Biometric: 'bg-violet-50 text-violet-600',
  Duplicates: 'bg-orange-50 text-orange-600',
  'Invalid Id': 'bg-amber-50 text-amber-600',
  Gov: 'bg-blue-50 text-blue-600',
  Errors: 'bg-red-50 text-red-600',
  Hits: 'bg-pink-50 text-pink-600',
}

export const PRIORITY_STYLES = {
  high: 'bg-red-50 text-red-600',
  medium: 'bg-amber-50 text-amber-600',
  low: 'border border-slate-200 bg-white text-slate-500',
}

export const STATUS_STYLES = {
  open: 'border border-blue-200 bg-blue-50 text-blue-600',
  pending: 'border border-amber-200 bg-amber-50 text-amber-600',
  resolved: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
}

export function Chip({ label, className }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>{label}</span>
}

const COMPARISON_CONFIG = {
  Biometric: {
    mode: 'biometric',
    leftTitle: 'Enrolled Biometric (On File)',
    rightTitle: 'Newly Captured Biometric',
    metrics: [
      { key: 'fingerprint', label: 'Fingerprint Match Score', value: 42 },
      { key: 'face', label: 'Facial Match Score', value: 88 },
      { key: 'minutiae', label: 'Minutiae Match Points', value: 43, display: '17 / 40 points' },
    ],
  },
  Duplicates: {
    mode: 'demographic',
    leftTitle: 'Record A (Existing)',
    rightTitle: 'Record B (New Submission)',
    rows: [
      { label: 'Full Name', left: 'DELA CRUZ, Jose M.', right: 'DELA CRUZ, Jose Miguel', mismatch: true },
      { label: 'Date of Birth', left: 'Mar 14, 1990', right: 'Mar 14, 1990', mismatch: false },
      { label: 'Address', left: 'Brgy. 1, Manila', right: 'Brgy. 1, Manila', mismatch: false },
      { label: 'Precinct', left: 'MNL-0012-A', right: 'MNL-0012-A', mismatch: false },
    ],
  },
  'Invalid Id': {
    mode: 'demographic',
    leftTitle: 'Submitted ID',
    rightTitle: 'Issuer Verification Result',
    rows: [
      { label: 'ID Type', left: 'UMID', right: 'UMID', mismatch: false },
      { label: 'ID Number', left: '01-2345678-9', right: 'Not Found', mismatch: true },
      { label: 'Full Name', left: 'REYES, Ana M.', right: '—', mismatch: true },
    ],
  },
  Gov: {
    mode: 'demographic',
    leftTitle: 'ABIS Record',
    rightTitle: 'PSA Civil Registry Record',
    rows: [
      { label: 'Full Name', left: 'BAUTISTA, Pedro L.', right: 'BAUTISTA, Pedro Luis', mismatch: true },
      { label: 'Date of Birth', left: 'Jan 5, 1985', right: 'Jan 5, 1985', mismatch: false },
      { label: "Mother's Maiden Name", left: 'GARCIA', right: 'GARCIA', mismatch: false },
    ],
  },
  Hits: {
    mode: 'demographic',
    leftTitle: 'Voter Record',
    rightTitle: 'Watchlist Entry',
    rows: [
      { label: 'Full Name', left: 'GARCIA, Luis', right: 'GARCIA, Luis A.', mismatch: true },
      { label: 'Date of Birth', left: 'Jul 9, 1978', right: 'Jul 9, 1978', mismatch: false },
      { label: 'Match Reason', left: '—', right: 'Name + DOB match on national watchlist', mismatch: true },
    ],
  },
  Errors: {
    mode: 'log',
    logExcerpt:
      'ERR_BIOMETRIC_CAPTURE_TIMEOUT — Session terminated after 30s with no fingerprint response. Device: Station 3 (FP-0092). Retry count: 3/3.',
  },
}

const ESCALATION_REVIEWERS = ['Sr. Examiner J. Ramos', 'Sr. Examiner L. Tan', 'Regional Adjudication Board']

function scoreForCase(id) {
  let sum = 0
  for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i)
  return 30 + (sum % 65)
}

function DecisionButtons({ decision, onDecide }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => onDecide(decision === 'Confirmed Hit' ? null : 'Confirmed Hit')}
        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
      >
        <AlertTriangleIcon className="h-4 w-4" />
        Confirmed Hit
      </button>
      <button
        type="button"
        onClick={() => onDecide(decision === 'False Hit' ? null : 'False Hit')}
        className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
      >
        <CheckCircleIcon className="h-4 w-4" />
        False Hit
      </button>
    </div>
  )
}

function ComparisonPanel({ type, threshold }) {
  const config = COMPARISON_CONFIG[type]
  if (!config) return null

  if (config.mode === 'log') {
    return (
      <div className="rounded-xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">System Log Excerpt</p>
        <p className="mt-2 font-mono text-xs text-slate-600">{config.logExcerpt}</p>
      </div>
    )
  }

  if (config.mode === 'biometric') {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {config.metrics.map((metric) => {
          const pass = metric.value >= threshold
          return (
            <div key={metric.key} className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">{metric.label}</p>
              <p className="mt-1 text-xl font-bold text-slate-900">{metric.display || `${metric.value}%`}</p>
              <span
                className={`mt-1.5 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  pass ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                }`}
              >
                {pass ? 'Meets Threshold' : 'Below Threshold'}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Field</th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">{config.leftTitle}</th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">{config.rightTitle}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {config.rows.map((row) => (
            <tr key={row.label} className={row.mismatch ? 'bg-red-50/40' : ''}>
              <td className="whitespace-nowrap px-3 py-2.5 text-sm font-medium text-slate-500">{row.label}</td>
              <td className="whitespace-nowrap px-3 py-2.5 text-sm text-slate-700">{row.left}</td>
              <td className={`whitespace-nowrap px-3 py-2.5 text-sm ${row.mismatch ? 'font-semibold text-red-600' : 'text-slate-700'}`}>
                {row.right}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CaseReviewModal({ caseItem, onClose }) {
  const baseScore = scoreForCase(caseItem.id)
  const [threshold, setThreshold] = useState(72)
  const [decision, setDecision] = useState(null)
  const [examinerName, setExaminerName] = useState('')
  const [examinerCredentials, setExaminerCredentials] = useState('')
  const [remarks, setRemarks] = useState('')
  const [showEscalation, setShowEscalation] = useState(false)
  const [escalationReviewer, setEscalationReviewer] = useState(ESCALATION_REVIEWERS[0])
  const [escalationReason, setEscalationReason] = useState('')
  const [escalated, setEscalated] = useState(false)

  const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
  const meetsThreshold = baseScore >= threshold

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <button type="button" className="fixed inset-0 cursor-default" aria-label="Close review" onClick={onClose} />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-blue-600">{caseItem.id}</p>
              <Chip label={caseItem.type} className={TYPE_STYLES[caseItem.type] || 'bg-slate-100 text-slate-600'} />
              <Chip label={caseItem.priority} className={PRIORITY_STYLES[caseItem.priority] || 'bg-slate-100 text-slate-600'} />
              <Chip label={caseItem.status} className={STATUS_STYLES[caseItem.status] || 'bg-slate-100 text-slate-600'} />
            </div>
            <p className="mt-1 text-base font-semibold text-slate-900">{caseItem.voter}</p>
            <p className="text-sm text-slate-500">{caseItem.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-6 px-6 py-5">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersIcon className="h-4 w-4 text-blue-600" />
                <h3 className="text-sm font-semibold text-slate-900">Matching Score Threshold</h3>
              </div>
              <span className={`text-sm font-semibold ${meetsThreshold ? 'text-emerald-600' : 'text-red-600'}`}>
                System Score: {baseScore}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={threshold}
              onChange={(event) => setThreshold(Number(event.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>0%</span>
              <span className="font-semibold text-slate-600">Threshold: {threshold}%</span>
              <span>100%</span>
            </div>
            <p className={`mt-2 text-xs font-semibold ${meetsThreshold ? 'text-emerald-600' : 'text-red-600'}`}>
              {meetsThreshold ? 'Score meets or exceeds the adjustable threshold.' : 'Score falls below the adjustable threshold.'}
            </p>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <ScaleIcon className="h-4 w-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">Side-by-Side Comparison</h3>
            </div>
            <ComparisonPanel type={caseItem.type} threshold={threshold} />
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">Examiner Log</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs text-slate-500">Examiner Name</span>
                <input
                  type="text"
                  value={examinerName}
                  onChange={(event) => setExaminerName(event.target.value)}
                  placeholder="Full name"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <label className="block">
                <span className="text-xs text-slate-500">Examiner Credentials / ID</span>
                <input
                  type="text"
                  value={examinerCredentials}
                  onChange={(event) => setExaminerCredentials(event.target.value)}
                  placeholder="e.g. Examiner ID EX-0042"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <ClockIcon className="h-3.5 w-3.5" />
              Timestamp: {timestamp}
            </div>
            <label className="mt-3 block">
              <span className="text-xs text-slate-500">Remarks</span>
              <textarea
                value={remarks}
                onChange={(event) => setRemarks(event.target.value)}
                rows={3}
                placeholder="Document findings and rationale for the decision"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Decision</h3>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <DecisionButtons decision={decision} onDecide={setDecision} />
              {decision && (
                <Chip
                  label={decision}
                  className={decision === 'Confirmed Hit' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'}
                />
              )}
            </div>
          </div>

          <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertTriangleIcon className="h-4 w-4 text-amber-600" />
                <h3 className="text-sm font-semibold text-slate-900">Escalation</h3>
              </div>
              {!escalated && (
                <button
                  type="button"
                  onClick={() => setShowEscalation((v) => !v)}
                  className="text-xs font-semibold text-amber-700 hover:underline"
                >
                  {showEscalation ? 'Hide' : 'Escalate to Senior Examiner'}
                </button>
              )}
            </div>

            {escalated ? (
              <p className="mt-2 text-sm text-amber-700">
                Escalated to {escalationReviewer}. Awaiting second-level review.
              </p>
            ) : (
              showEscalation && (
                <div className="mt-3 flex flex-col gap-3">
                  <label className="block">
                    <span className="text-xs text-slate-500">Second-Level Reviewer</span>
                    <select
                      value={escalationReviewer}
                      onChange={(event) => setEscalationReviewer(event.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    >
                      {ESCALATION_REVIEWERS.map((reviewer) => (
                        <option key={reviewer}>{reviewer}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs text-slate-500">Escalation Reason</span>
                    <textarea
                      value={escalationReason}
                      onChange={(event) => setEscalationReason(event.target.value)}
                      rows={2}
                      placeholder="Why does this case need second-level review?"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setEscalated(true)}
                    className="inline-flex w-fit items-center rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-amber-500/30 transition-colors hover:bg-amber-700"
                  >
                    Submit Escalation
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export function CaseList({ cases }) {
  const [search, setSearch] = useState('')
  const [reviewCase, setReviewCase] = useState(null)

  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full max-w-xs">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search cases..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <p className="text-sm text-slate-400">{cases.length} cases</p>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Case ID</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Voter</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Type</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Description</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Age</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Priority</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Status</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cases.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-blue-600">{c.id}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-slate-900">{c.voter}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Chip label={c.type} className={TYPE_STYLES[c.type] || 'bg-slate-100 text-slate-600'} />
                  </td>
                  <td className="px-3 py-3 text-sm text-slate-600">{c.description}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-400">{c.age}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Chip label={c.priority} className={PRIORITY_STYLES[c.priority] || 'bg-slate-100 text-slate-600'} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Chip label={c.status} className={STATUS_STYLES[c.status] || 'bg-slate-100 text-slate-600'} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm font-semibold text-blue-600">
                    <button type="button" onClick={() => setReviewCase(c)} className="hover:underline">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {reviewCase && <CaseReviewModal caseItem={reviewCase} onClose={() => setReviewCase(null)} />}
    </div>
  )
}