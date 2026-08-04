import { useState } from 'react'
import { FingerprintMark, WifiIcon, CheckCircleIcon, XCircleIcon, AlertTriangleIcon } from '../../components/icons'

const TODAY_STATS = [
  { key: 'scans', label: 'Scans', value: '1,842' },
  { key: 'matches', label: 'Matches', value: '1,798' },
  { key: 'matchRate', label: 'Match Rate', value: '97.6%' },
  { key: 'avgQuality', label: 'Avg Quality', value: '84.2' },
  { key: 'rejections', label: 'Rejections', value: '44' },
]

const LATEST_CAPTURE = {
  vrn: 'VRN-2026-005512',
  nfiq: 62,
  minutiaeCount: 48,
  ridgeClarity: 81,
}

const DECISION_STYLES = {
  Accepted: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-red-50 text-red-600',
  Flagged: 'bg-amber-50 text-amber-700',
}

function QualityMetric({ label, value, unit = '', pass }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-bold text-slate-900">
        {value}
        {unit}
      </p>
      <span
        className={`mt-1.5 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${
          pass ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
        }`}
      >
        {pass ? 'Pass' : 'Below Threshold'}
      </span>
    </div>
  )
}

function Field({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-xs text-slate-500">{label}</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
      />
    </label>
  )
}

export default function FingerPScan() {
  const [settings, setSettings] = useState({
    matchThreshold: '0.72',
    qualityThreshold: '60',
    maxRetries: '3',
    timeout: '30',
  })

  const [decision, setDecision] = useState(null)

  const updateField = (key) => (event) => {
    setSettings((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const handleApplySettings = () => {
    // Persist device settings
  }

  const handleTestDevice = () => {
    // Trigger a test scan on the connected device
  }

  const handleCalibrate = () => {
    // Start device calibration routine
  }

  const qualityThreshold = Number(settings.qualityThreshold) || 0
  const nfiqPass = LATEST_CAPTURE.nfiq >= qualityThreshold

  return (
    <div className="max-h-[calc(100vh-260px)] overflow-y-auto pr-1">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FingerprintMark className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">Fingerprint Scanner</p>
                <p className="text-xs text-slate-400">Device management &amp; matching parameters</p>
              </div>
            </div>
            <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <WifiIcon className="h-3 w-3" />
              Connected
            </span>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-14">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-500">
              <FingerprintMark className="h-6 w-6" />
            </span>
            <p className="mt-3 text-sm text-slate-400">Device Preview</p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Match Threshold" value={settings.matchThreshold} onChange={updateField('matchThreshold')} />
            <Field label="Quality Threshold" value={settings.qualityThreshold} onChange={updateField('qualityThreshold')} />
            <Field label="Max Retries" value={settings.maxRetries} onChange={updateField('maxRetries')} />
            <Field label="Timeout (sec)" value={settings.timeout} onChange={updateField('timeout')} />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleApplySettings}
              className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700"
            >
              Apply Settings
            </button>
            <button
              type="button"
              onClick={handleTestDevice}
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Test Device
            </button>
            <button
              type="button"
              onClick={handleCalibrate}
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Calibrate
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Today's Stats</p>
          <ul className="mt-3 divide-y divide-slate-100">
            {TODAY_STATS.map((stat) => (
              <li key={stat.key} className="flex items-center justify-between py-3">
                <span className="text-sm text-slate-500">{stat.label}</span>
                <span className="text-sm font-semibold text-slate-900">{stat.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Latest Capture Quality</h2>
            <p className="text-xs text-slate-400">{LATEST_CAPTURE.vrn} · NFIQ 2.0 scale (0–100, higher is better)</p>
          </div>
          {decision && (
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${DECISION_STYLES[decision]}`}>
              {decision}
            </span>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <QualityMetric label="NFIQ 2.0 Score" value={LATEST_CAPTURE.nfiq} pass={nfiqPass} />
          <QualityMetric label="Minutiae Count" value={LATEST_CAPTURE.minutiaeCount} pass={LATEST_CAPTURE.minutiaeCount >= 30} />
          <QualityMetric label="Ridge Clarity" value={LATEST_CAPTURE.ridgeClarity} unit="%" pass={LATEST_CAPTURE.ridgeClarity >= 60} />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setDecision((d) => (d === 'Accepted' ? null : 'Accepted'))}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
          >
            <CheckCircleIcon className="h-4 w-4" />
            Accept
          </button>
          <button
            type="button"
            onClick={() => setDecision((d) => (d === 'Rejected' ? null : 'Rejected'))}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
          >
            <XCircleIcon className="h-4 w-4" />
            Reject
          </button>
          <button
            type="button"
            onClick={() => setDecision((d) => (d === 'Flagged' ? null : 'Flagged'))}
            className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-100"
          >
            <AlertTriangleIcon className="h-4 w-4" />
            Flag for Review
          </button>
        </div>
      </div>
    </div>
  )
}
