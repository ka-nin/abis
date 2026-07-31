import { useState } from 'react'
import { SearchIcon } from '../../components/icons'

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

export function CaseList({ cases }) {
  const [search, setSearch] = useState('')

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
                    <button type="button" className="hover:underline">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}