import { useState } from 'react'
import { DownloadIcon, FileTextIcon, MapPinIcon } from '../../components/icons'

function GlobeIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 3c2.5 2.5 3.8 5.8 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.8-3.8-9S9.5 5.5 12 3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const PRECINCTS = ['QC-0089-A', 'QC-0089-B', 'MM-0021-C', 'CEB-0041-A', 'DAV-0012-B']
const POSTS = ['Philippine Embassy, Abu Dhabi', 'Philippine Consulate, Dubai', 'Philippine Embassy, Riyadh']
const PROVINCES = ['Metro Manila', 'Cebu', 'Davao del Sur', 'Bulacan']
const CITIES = ['Quezon City', 'Manila', 'Cebu City', 'Davao City']

const INITIAL_HISTORY = [
  { key: 'h1', type: 'EDCVL', jurisdiction: 'QC-0089-A', generatedOn: 'Jul 26, 2026', records: '412', status: 'Ready' },
  { key: 'h2', type: 'PCVL', jurisdiction: 'MM-0021-C', generatedOn: 'Jul 25, 2026', records: '389', status: 'Ready' },
  { key: 'h3', type: 'Embassy/Post', jurisdiction: 'Philippine Embassy, Abu Dhabi', generatedOn: 'Jul 24, 2026', records: '4,210', status: 'Ready' },
  { key: 'h4', type: 'Province/City', jurisdiction: 'Quezon City', generatedOn: 'Jul 23, 2026', records: '842,900', status: 'Ready' },
]

const STATUS_STYLES = {
  Ready: 'bg-emerald-50 text-emerald-700',
  Processing: 'bg-amber-50 text-amber-700',
}

function GenerationCard({ icon: Icon, title, description, options, optionLabel, onGenerate }) {
  const [selected, setSelected] = useState(options[0])

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>

      <label className="mt-4 block">
        <span className="text-xs text-slate-500">{optionLabel}</span>
        <select
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={() => onGenerate(selected)}
        className="mt-4 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700"
      >
        Generate {title}
      </button>
    </div>
  )
}

export default function RS_VoterLists() {
  const [history, setHistory] = useState(INITIAL_HISTORY)

  const handleGenerate = (type) => (jurisdiction) => {
    setHistory((prev) => [
      {
        key: `${type}-${jurisdiction}-${Date.now()}`,
        type,
        jurisdiction,
        generatedOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        records: '—',
        status: 'Processing',
      },
      ...prev,
    ])
  }

  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <GenerationCard
          icon={FileTextIcon}
          title="EDCVL"
          description="Election Day Computerized Voters List — for use at the polling place on election day."
          options={PRECINCTS}
          optionLabel="Precinct"
          onGenerate={handleGenerate('EDCVL')}
        />
        <GenerationCard
          icon={FileTextIcon}
          title="PCVL"
          description="Precinct Computerized Voters List — full precinct-level voter roll."
          options={PRECINCTS}
          optionLabel="Precinct"
          onGenerate={handleGenerate('PCVL')}
        />
        <GenerationCard
          icon={GlobeIcon}
          title="Embassy/Post Voter List"
          description="Overseas voter list generated per embassy or consular post."
          options={POSTS}
          optionLabel="Post"
          onGenerate={handleGenerate('Embassy/Post')}
        />
        <GenerationCard
          icon={MapPinIcon}
          title="Province/City Voter List"
          description="Local voter list generated per province, city, or municipality."
          options={[...PROVINCES, ...CITIES]}
          optionLabel="Province / City"
          onGenerate={handleGenerate('Province/City')}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Recently Generated Lists</h2>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Type</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Jurisdiction</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Generated On</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Records</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Status</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.map((row) => (
                <tr key={row.key} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-slate-900">{row.type}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{row.jurisdiction}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-400">{row.generatedOn}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{row.records}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm">
                    {row.status === 'Ready' && (
                      <button type="button" className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:underline">
                        <DownloadIcon className="h-3.5 w-3.5" />
                        Download
                      </button>
                    )}
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