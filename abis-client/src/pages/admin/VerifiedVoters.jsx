import { useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { FilterIcon, DownloadIcon, SearchIcon } from '../../components/icons'
import FingerPScan from './FingerPScan'
import FaceRecog from './FaceRecog'
import IrisRecog from './IrisRecog'

const TABS = ['Verified Voters', 'Fingerprint Scanning', 'Face Recognition', 'Iris Recognition']

const VERIFIED_VOTERS = [
  { vrn: 'VRN-2026-001248', name: 'SANTOS, Maria C.', precinct: 'QC-0089-A', biometric: 'FP + Face', idType: 'PhilSys', verifiedOn: 'Jul 26, 2026', status: 'Active' },
  { vrn: 'VRN-2026-001247', name: 'CRUZ, Juan D.', precinct: 'QC-0089-B', biometric: 'FP + Face', idType: 'Passport', verifiedOn: 'Jul 26, 2026', status: 'Active' },
  { vrn: 'VRN-2026-001246', name: 'REYES, Ana M.', precinct: 'MM-0021-C', biometric: 'Face Only', idType: 'UMID', verifiedOn: 'Jul 25, 2026', status: 'Active' },
  { vrn: 'VRN-2026-001245', name: 'BAUTISTA, Pedro L.', precinct: 'CEB-0041-A', biometric: 'FP + Face', idType: "Driver's License", verifiedOn: 'Jul 25, 2026', status: 'Active' },
  { vrn: 'VRN-2026-001244', name: 'MENDOZA, Rosa T.', precinct: 'DAV-0012-B', biometric: 'FP Only', idType: 'PhilSys', verifiedOn: 'Jul 24, 2026', status: 'Pending' },
]

const STATUS_STYLES = {
  Active: 'bg-emerald-50 text-emerald-700',
  Pending: 'bg-amber-50 text-amber-700',
  Rejected: 'bg-red-50 text-red-600',
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  )
}

function VerifiedVotersTab() {
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
              placeholder="Search verified voters..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <p className="text-sm text-slate-400">58,900,000 verified voters</p>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">VRN</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Full Name</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Precinct</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Biometric</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">ID Type</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Verified On</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {VERIFIED_VOTERS.map((voter) => (
                <tr key={voter.vrn} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-blue-600">{voter.vrn}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-slate-900">{voter.name}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{voter.precinct}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{voter.biometric}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{voter.idType}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-400">{voter.verifiedOn}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <StatusBadge status={voter.status} />
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

export default function VerifiedVoters({ onNavigate, onLogout, onBellClick }) {
  const [activeTab, setActiveTab] = useState('Verified Voters')

  return (
    <AdminLayout
      active="identification"
      onNavigate={onNavigate}
      onLogout={onLogout}
      onBellClick={onBellClick}
      title="Identification & Verification"
      subtitle="Voter biometric identification and search"
      headerActions={
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <FilterIcon className="h-4 w-4" />
            Filter
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700"
          >
            <DownloadIcon className="h-4 w-4" />
            Export
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

      {activeTab === 'Verified Voters' && <VerifiedVotersTab />}
      {activeTab === 'Fingerprint Scanning' && <FingerPScan />}
      {activeTab === 'Face Recognition' && <FaceRecog />}
      {activeTab === 'Iris Recognition' && <IrisRecog />}
    </AdminLayout>
  )
}
