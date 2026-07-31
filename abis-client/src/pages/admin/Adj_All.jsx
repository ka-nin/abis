import { useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { AlertTriangleIcon, CheckCircleIcon } from '../../components/icons'
import { CaseList } from './adjudicationShared'
import Adj_Errors from './Adj_Errors'
import Adj_BioMM from './Adj_BioMM'
import Adj_InvID from './Adj_InvID'

const TABS = ['All', 'Errors', 'Biometric Mismatch', 'Invalid ID', 'Gov. Record Mismatch', 'Hits', 'Duplicate Records']

const CASES = [
  {
    id: 'ADJ-2026-0881',
    voter: 'SANTOS, Maria C.',
    type: 'Biometric',
    description: 'Fingerprint score below threshold (0.42)',
    age: '2 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0880',
    voter: 'DELA CRUZ, Jose',
    type: 'Duplicates',
    description: 'Possible duplicate record detected',
    age: '2 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0879',
    voter: 'REYES, Ana M.',
    type: 'Invalid Id',
    description: 'Provided ID could not be verified with issuer',
    age: '3 days',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'ADJ-2026-0878',
    voter: 'BAUTISTA, Pedro',
    type: 'Gov',
    description: 'Name mismatch with PSA civil registry record',
    age: '3 days',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'ADJ-2026-0877',
    voter: 'MENDOZA, Rosa',
    type: 'Errors',
    description: 'System error during biometric capture session',
    age: '4 days',
    priority: 'low',
    status: 'resolved',
  },
  {
    id: 'ADJ-2026-0876',
    voter: 'GARCIA, Luis',
    type: 'Hits',
    description: 'Watchlist hit — requires manual review',
    age: '5 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0875',
    voter: 'TORRES, Carmen',
    type: 'Biometric',
    description: 'Face recognition liveness check failed',
    age: '5 days',
    priority: 'medium',
    status: 'resolved',
  },
]

function PlaceholderTab({ name }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-center">
      <p className="text-sm font-medium text-slate-500">{name} view is coming soon.</p>
    </div>
  )
}

export default function Adj_All({ onNavigate, onLogout }) {
  const [activeTab, setActiveTab] = useState('All')
  const openCount = CASES.filter((c) => c.status === 'open').length

  return (
    <AdminLayout
      active="adjudication"
      onNavigate={onNavigate}
      onLogout={onLogout}
      title="Adjudication"
      subtitle="Review and resolve flagged registration cases"
      headerActions={
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">
            <AlertTriangleIcon className="h-4 w-4" />
            {openCount} Open Cases
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700"
          >
            <CheckCircleIcon className="h-4 w-4" />
            Batch Resolve
          </button>
        </div>
      }
    >
      <div className="mb-5 flex gap-1 overflow-x-auto border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'All' && <CaseList cases={CASES} />}
      {activeTab === 'Errors' && <Adj_Errors />}
      {activeTab === 'Biometric Mismatch' && <Adj_BioMM />}
      {activeTab === 'Invalid ID' && <Adj_InvID />}
      {!['All', 'Errors', 'Biometric Mismatch', 'Invalid ID'].includes(activeTab) && <PlaceholderTab name={activeTab} />}
    </AdminLayout>
  )
}