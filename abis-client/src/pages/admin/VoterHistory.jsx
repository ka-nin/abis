import { useState } from 'react'
import { SearchIcon, FileTextIcon, SwapIcon, XCircleIcon, RefreshIcon, UserIcon } from '../../components/icons'

const VOTER_RECORDS = {
  'VRN-2026-001248': {
    name: 'SANTOS, Maria C.',
    precinct: 'QC-0089-A',
    timeline: [
      {
        key: 'registered',
        type: 'Registration',
        icon: UserIcon,
        color: 'bg-blue-500',
        date: 'Mar 14, 2019',
        detail: 'New voter registration filed and approved — Precinct QC-0045-B.',
      },
      {
        key: 'correction',
        type: 'Correction of Entries',
        icon: FileTextIcon,
        color: 'bg-amber-500',
        date: 'Jun 02, 2021',
        detail: 'Civil status corrected from Single to Married following marriage certificate submission.',
      },
      {
        key: 'transfer',
        type: 'Transfer of Registration',
        icon: SwapIcon,
        color: 'bg-violet-500',
        date: 'Feb 18, 2023',
        detail: 'Transferred within the same City/Municipality/District — new precinct QC-0089-A.',
      },
      {
        key: 'deactivation',
        type: 'Deactivation',
        icon: XCircleIcon,
        color: 'bg-red-500',
        date: 'Nov 05, 2024',
        detail: 'Deactivated for failure to vote in two (2) successive preceding regular elections.',
      },
      {
        key: 'reactivation',
        type: 'Reactivation',
        icon: RefreshIcon,
        color: 'bg-emerald-500',
        date: 'Jul 26, 2026',
        detail: 'Reactivation approved by the Election Registration Board — biometrics re-verified.',
      },
    ],
  },
}

export default function VoterHistory() {
  const [query, setQuery] = useState('VRN-2026-001248')
  const [activeVrn, setActiveVrn] = useState('VRN-2026-001248')

  const record = VOTER_RECORDS[activeVrn]

  const handleSearch = (event) => {
    event.preventDefault()
    setActiveVrn(query.trim())
  }

  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Registration History Trace</h2>
        <p className="mt-1 text-xs text-slate-400">
          Look up a voter by VRN to view their full registration timeline — corrections, transfers,
          deactivations, and reactivations.
        </p>
        <form onSubmit={handleSearch} className="relative mt-3 max-w-sm">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by VRN..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </form>
      </div>

      {record ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">{record.name}</p>
              <p className="text-xs text-slate-400">{activeVrn} · Precinct {record.precinct}</p>
            </div>
            <span className="text-xs text-slate-400">{record.timeline.length} events</span>
          </div>

          <ol className="mt-6 flex flex-col gap-6 border-l border-slate-200 pl-6">
            {record.timeline.map((event) => {
              const Icon = event.icon
              return (
                <li key={event.key} className="relative">
                  <span
                    className={`absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full text-white ${event.color}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-xs text-slate-400">{event.date}</p>
                  <p className="text-sm font-semibold text-slate-900">{event.type}</p>
                  <p className="mt-0.5 text-sm text-slate-600">{event.detail}</p>
                </li>
              )
            })}
          </ol>
        </div>
      ) : (
        <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-center">
          <p className="text-sm font-medium text-slate-500">No registration history found for "{activeVrn}".</p>
        </div>
      )}
    </div>
  )
}