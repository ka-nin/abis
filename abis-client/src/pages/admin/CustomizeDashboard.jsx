import { useState } from 'react'

const DEFAULT_WIDGETS = [
  { key: 'trendChart', label: 'Registration Trend Chart', enabled: true },
  { key: 'voterStatus', label: 'Voter Status Breakdown', enabled: true },
  { key: 'recentActivity', label: 'Recent Activity Feed', enabled: true },
  { key: 'systemHealth', label: 'System Health Indicators', enabled: true },
  { key: 'queueStatus', label: 'Queue Status Widget', enabled: false },
  { key: 'regionalChart', label: 'Regional Distribution Chart', enabled: false },
  { key: 'operatorPerformance', label: 'Operator Performance Summary', enabled: false },
]

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
        checked ? 'bg-blue-600' : 'bg-slate-200'
      }`}
    >
      <span
        className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
        style={{ height: '1.125rem', width: '1.125rem' }}
      />
    </button>
  )
}

export default function CustomizeDashboard() {
  const [widgets, setWidgets] = useState(DEFAULT_WIDGETS)

  const toggleWidget = (key) => {
    setWidgets((prev) => prev.map((w) => (w.key === key ? { ...w, enabled: !w.enabled } : w)))
  }

  const resetToDefault = () => {
    setWidgets(DEFAULT_WIDGETS)
  }

  const saveLayout = () => {
    // Persist widget configuration
  }

  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Dashboard Widget Configuration</h2>

        <ul className="mt-4 divide-y divide-slate-100">
          {widgets.map((widget) => (
            <li key={widget.key} className="flex items-center justify-between py-3.5">
              <span className="text-sm text-slate-700">{widget.label}</span>
              <Toggle checked={widget.enabled} onChange={() => toggleWidget(widget.key)} />
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={saveLayout}
            className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700"
          >
            Save Layout
          </button>
          <button
            type="button"
            onClick={resetToDefault}
            className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  )
}
