import { useEffect, useState } from 'react'
import {
  ArrowLeftIcon,
  SearchIcon,
  UserIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  CameraIcon,
  FingerprintMark,
  EyeIcon,
  ShieldCheckIcon,
  RefreshIcon,
  ClockIcon,
} from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'

const VOTERS_DB = [
  { vrn: 'VRN-2019-441207', name: 'SANTOS, Maria Cruz', precinct: 'QC-0089-A', status: 'Active' },
  { vrn: 'VRN-2021-118842', name: 'CRUZ, Juan D.', precinct: 'QC-0089-B', status: 'Already Voted' },
  { vrn: 'VRN-2016-902314', name: 'REYES, Ana M.', precinct: 'MM-0021-C', status: 'Deactivated' },
  { vrn: 'VRN-2022-330198', name: 'BAUTISTA, Pedro L.', precinct: 'CEB-0041-A', status: 'Transferred' },
  { vrn: 'VRN-2020-556781', name: 'MENDOZA, Rosa T.', precinct: 'DAV-0012-B', status: 'Active' },
]

const STATUS_CONFIG = {
  Active: {
    badge: 'bg-emerald-50 text-emerald-700',
    icon: CheckCircleIcon,
    eligible: true,
    message: 'This voter is eligible to vote at this precinct.',
  },
  Deactivated: {
    badge: 'bg-red-50 text-red-600',
    icon: XCircleIcon,
    eligible: false,
    message: 'This registration record is deactivated and cannot vote unless the status is corrected.',
  },
  Transferred: {
    badge: 'bg-amber-50 text-amber-700',
    icon: AlertTriangleIcon,
    eligible: false,
    message: 'This voter has been transferred to a different precinct and cannot vote here.',
  },
  'Already Voted': {
    badge: 'border border-slate-200 bg-white text-slate-500',
    icon: XCircleIcon,
    eligible: false,
    message: 'This voter has already been marked as voted for this election.',
  },
}

const MODALITIES = [
  { key: 'face', label: 'Face', icon: CameraIcon },
  { key: 'fingerprint', label: 'Fingerprint', icon: FingerprintMark },
  { key: 'iris', label: 'Iris', icon: EyeIcon },
]

function scoreFor(vrn, modality, attemptIndex) {
  let sum = 0
  for (let i = 0; i < vrn.length; i++) sum += vrn.charCodeAt(i)
  return 40 + ((sum + modality.length * 7 + attemptIndex * 13) % 55)
}

export default function StatusLookup({ onBack }) {
  const [query, setQuery] = useState('')
  const [searchError, setSearchError] = useState('')
  const [selectedVoter, setSelectedVoter] = useState(null)

  const [scanState, setScanState] = useState('idle') // idle | scanning | done
  const [activeModality, setActiveModality] = useState(null)
  const [lastResult, setLastResult] = useState(null)
  const [attempts, setAttempts] = useState([])
  const [attemptCounter, setAttemptCounter] = useState(0)

  const [showEscalation, setShowEscalation] = useState(false)
  const [chairmanName, setChairmanName] = useState('')
  const [overrideCode, setOverrideCode] = useState('')
  const [escalationReason, setEscalationReason] = useState('')
  const [escalationApproved, setEscalationApproved] = useState(false)

  const [votedConfirmed, setVotedConfirmed] = useState(false)

  const failedStreak =
    attempts.filter((a) => a.result === 'No Match').length - attempts.filter((a) => a.result === 'Match').length

  useEffect(() => {
    if (scanState !== 'scanning') return
    const timer = setTimeout(() => {
      const score = scoreFor(selectedVoter.vrn, activeModality, attemptCounter)
      const match = score >= 72
      const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      setAttempts((prev) => [...prev, { time, modality: activeModality, result: match ? 'Match' : 'No Match', score }])
      setAttemptCounter((c) => c + 1)
      setLastResult({ modality: activeModality, match, score })
      setScanState('done')
    }, 1200)
    return () => clearTimeout(timer)
  }, [scanState, activeModality, selectedVoter, attemptCounter])

  const resetVerification = () => {
    setScanState('idle')
    setActiveModality(null)
    setLastResult(null)
    setAttempts([])
    setAttemptCounter(0)
    setShowEscalation(false)
    setChairmanName('')
    setOverrideCode('')
    setEscalationReason('')
    setEscalationApproved(false)
    setVotedConfirmed(false)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    const q = query.trim().toLowerCase()
    if (!q) return
    const found = VOTERS_DB.find(
      (v) => v.vrn.toLowerCase().includes(q) || v.name.toLowerCase().includes(q) || v.precinct.toLowerCase().includes(q),
    )
    if (found) {
      setSelectedVoter(found)
      setSearchError('')
      resetVerification()
    } else {
      setSelectedVoter(null)
      setSearchError('No voter record found matching that VRN, name, or precinct.')
    }
  }

  const handleNewVerification = () => {
    setSelectedVoter(null)
    setQuery('')
    setSearchError('')
    resetVerification()
  }

  const runScan = (modality) => {
    setActiveModality(modality)
    setScanState('scanning')
  }

  const statusConfig = selectedVoter ? STATUS_CONFIG[selectedVoter.status] : null
  const verified = lastResult?.match
  const canEscalate = failedStreak >= 2 || (statusConfig && !statusConfig.eligible)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <BrandLockup />
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
            <ShieldCheckIcon className="h-4 w-4" />
            Election Day Verification Kiosk
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Voter Verification</h1>
          <p className="mt-3 text-base text-slate-500">
            Look up a voter by VRN, name, or precinct, then verify their identity before they cast a ballot.
          </p>
        </div>

        <form onSubmit={handleSearch} className="mx-auto mt-8 flex max-w-xl items-center gap-3">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by VRN, name, or precinct..."
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors hover:bg-blue-800"
          >
            Search
          </button>
        </form>
        {searchError && <p className="mx-auto mt-3 max-w-xl text-center text-sm text-red-600">{searchError}</p>}

        {selectedVoter && statusConfig && (
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-500">
                <UserIcon className="h-8 w-8" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold text-slate-900">{selectedVoter.name}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPinIcon className="h-3.5 w-3.5" />
                  Precinct {selectedVoter.precinct}
                </p>
                <p className="text-xs text-slate-400">{selectedVoter.vrn}</p>
              </div>
              <span
                className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusConfig.badge}`}
              >
                <statusConfig.icon className="h-3.5 w-3.5" />
                {selectedVoter.status}
              </span>
            </div>

            <div
              className={`mt-4 rounded-xl px-4 py-3 text-sm ${
                statusConfig.eligible ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
              }`}
            >
              {statusConfig.message}
            </div>

            {statusConfig.eligible && !votedConfirmed && (
              <div className="mt-5">
                <p className="text-sm font-semibold text-slate-900">Biometric Verification</p>
                <p className="mt-1 text-xs text-slate-400">
                  Select a modality to verify this voter against their record on file.
                </p>

                <div className="mt-3 grid grid-cols-3 gap-3">
                  {MODALITIES.map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => runScan(m.key)}
                      disabled={scanState === 'scanning'}
                      className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                        activeModality === m.key
                          ? 'border-blue-400 bg-blue-50'
                          : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50'
                      }`}
                    >
                      <m.icon className={`h-6 w-6 ${activeModality === m.key ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span className="text-xs font-semibold text-slate-700">{m.label}</span>
                    </button>
                  ))}
                </div>

                {scanState === 'scanning' && (
                  <div className="mt-4 flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
                    <RefreshIcon className="h-4 w-4 flex-shrink-0 animate-spin text-blue-600" />
                    <p className="text-sm text-blue-700">Scanning {activeModality}...</p>
                  </div>
                )}

                {scanState === 'done' && lastResult && (
                  <div className={`mt-4 flex items-start gap-3 rounded-xl px-4 py-3 ${verified ? 'bg-emerald-50' : 'bg-red-50'}`}>
                    {verified ? (
                      <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                    ) : (
                      <XCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-semibold ${verified ? 'text-emerald-700' : 'text-red-600'}`}>
                        {verified ? 'Verified — Voter May Proceed' : 'No Match'}
                      </p>
                      <p className="text-xs text-slate-500">
                        {lastResult.modality} match score: {lastResult.score}%
                      </p>
                      {!verified && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => runScan(activeModality)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            <RefreshIcon className="h-3.5 w-3.5" />
                            Retry {activeModality}
                          </button>
                          {MODALITIES.filter((m) => m.key !== activeModality).map((m) => (
                            <button
                              key={m.key}
                              type="button"
                              onClick={() => runScan(m.key)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              <m.icon className="h-3.5 w-3.5" />
                              Try {m.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {verified && !votedConfirmed && (
                  <button
                    type="button"
                    onClick={() => setVotedConfirmed(true)}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-500/30 transition-colors hover:bg-emerald-700"
                  >
                    <CheckCircleIcon className="h-4 w-4" />
                    Confirm &amp; Mark as Voted
                  </button>
                )}
              </div>
            )}

            {votedConfirmed && (
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                <p className="text-sm font-semibold text-emerald-700">Voter marked as voted. Thank you.</p>
              </div>
            )}

            {canEscalate && !escalationApproved && !votedConfirmed && (
              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangleIcon className="h-4 w-4 text-amber-600" />
                    <p className="text-sm font-semibold text-slate-900">Escalation</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowEscalation((v) => !v)}
                    className="text-xs font-semibold text-amber-700 hover:underline"
                  >
                    {showEscalation ? 'Hide' : 'Escalate to EB Chairman'}
                  </button>
                </div>

                {showEscalation && (
                  <div className="mt-3 flex flex-col gap-3">
                    <label className="block">
                      <span className="text-xs text-slate-500">EB Chairman Name</span>
                      <input
                        type="text"
                        value={chairmanName}
                        onChange={(event) => setChairmanName(event.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-slate-500">Override Code / PIN</span>
                      <input
                        type="password"
                        value={overrideCode}
                        onChange={(event) => setOverrideCode(event.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-slate-500">Reason for Override</span>
                      <textarea
                        value={escalationReason}
                        onChange={(event) => setEscalationReason(event.target.value)}
                        rows={2}
                        placeholder="e.g. Biometric mismatch due to worn fingerprint; identity confirmed manually via ID"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </label>
                    <button
                      type="button"
                      disabled={!chairmanName || !overrideCode}
                      onClick={() => setEscalationApproved(true)}
                      className="inline-flex w-fit items-center rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-amber-500/30 transition-colors enabled:hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-amber-300"
                    >
                      Approve Override
                    </button>
                  </div>
                )}
              </div>
            )}

            {escalationApproved && !votedConfirmed && (
              <div className="mt-5 flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="text-sm font-semibold text-amber-700">
                  Override approved by {chairmanName}. Voter may proceed under EB Chairman authorization.
                </p>
                <button
                  type="button"
                  onClick={() => setVotedConfirmed(true)}
                  className="inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-500/30 transition-colors hover:bg-emerald-700"
                >
                  <CheckCircleIcon className="h-4 w-4" />
                  Confirm &amp; Mark as Voted
                </button>
              </div>
            )}

            {attempts.length > 0 && (
              <div className="mt-5">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <ClockIcon className="h-3.5 w-3.5" />
                  Attempt Log
                </p>
                <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200">
                  {attempts.map((a, i) => (
                    <li key={i} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                      <span className="text-slate-400">{a.time}</span>
                      <span className="capitalize text-slate-700">{a.modality}</span>
                      <span className="text-slate-500">{a.score}%</span>
                      <span className={`font-semibold ${a.result === 'Match' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {a.result}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="button"
              onClick={handleNewVerification}
              className="mt-6 inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              New Verification
            </button>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </button>
        </div>
      </main>
    </div>
  )
}
