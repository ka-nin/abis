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
        className={`inline-block transform rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
        style={{ height: '1.125rem', width: '1.125rem' }}
      />
    </button>
  )
}

export default function CustomizeDashboard({ items = [], onToggle, onReset, onClose }) {
  return (
    <div className="max-h-[70vh] overflow-y-auto p-5">
      <h2 className="text-sm font-semibold text-slate-900">Customize Dashboard</h2>
      <p className="mt-1 text-xs text-slate-400">Show or hide tabs on the dashboard.</p>

      <ul className="mt-4 divide-y divide-slate-100">
        {items.map((item) => (
          <li key={item.key} className="flex items-center justify-between py-3.5">
            <span className="text-sm text-slate-700">{item.label}</span>
            <Toggle checked={item.enabled} onChange={() => onToggle?.(item.key)} />
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700"
        >
          Save Layout
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Reset to Default
        </button>
      </div>
    </div>
  )
}