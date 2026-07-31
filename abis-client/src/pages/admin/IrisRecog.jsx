import { useState } from 'react'
import { EyeIcon, WifiIcon } from '../../components/icons'

const TODAY_STATS = [
  { key: 'scans', label: 'Scans', value: '248' },
  { key: 'matches', label: 'Matches', value: '242' },
  { key: 'matchRate', label: 'Match Rate', value: '97.6%' },
  { key: 'avgQuality', label: 'Avg Quality', value: '91.4' },
  { key: 'rejections', label: 'Rejections', value: '6' },
]

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

export default function IrisRecog() {
  const [settings, setSettings] = useState({
    matchThreshold: '0.72',
    qualityThreshold: '60',
    maxRetries: '3',
    timeout: '30',
  })

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

  return (
    <div className="max-h-[calc(100vh-260px)] overflow-y-auto pr-1">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <EyeIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">Iris Scanner</p>
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
              <EyeIcon className="h-6 w-6" />
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
    </div>
  )
}
