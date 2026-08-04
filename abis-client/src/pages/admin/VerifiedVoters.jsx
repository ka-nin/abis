import { useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { FilterIcon, DownloadIcon, SearchIcon, ChevronRightIcon, MapPinIcon } from '../../components/icons'
import FingerPScan from './FingerPScan'
import FaceRecog from './FaceRecog'
import IrisRecog from './IrisRecog'
import MatchCandidates from './MatchCandidates'
import VoterHistory from './VoterHistory'

const TABS = [
  'Verified Voters',
  'Fingerprint Scanning',
  'Face Recognition',
  'Iris Recognition',
  'Match Results',
  'Registration History',
]

const JURISDICTION_TREE = {
  Philippines: {
    'Metro Manila': {
      'Quezon City': { 'Barangay Commonwealth': 42890, 'Barangay Batasan Hills': 38210, 'Barangay Holy Spirit': 29940 },
      Manila: { 'Barangay 1': 8420, 'Barangay 2': 7910, 'Barangay 3': 6540 },
    },
    Cebu: {
      'Cebu City': { 'Barangay Lahug': 15230, 'Barangay Guadalupe': 12980 },
    },
  },
  Overseas: {
    'United Arab Emirates': {
      'Abu Dhabi': { 'Philippine Embassy, Abu Dhabi': 4210 },
      Dubai: { 'Philippine Consulate, Dubai': 3860 },
    },
  },
}

const JURISDICTION_LEVEL_LABELS = ['Country', 'Province', 'City/Municipality', 'Barangay']

const SECTORAL_CATEGORIES = [
  'Person with Disability (PWD)',
  'Senior Citizen',
  'Indigenous Cultural Community / Indigenous People (ICC/IP)',
  'Illiterate / Assisted Voter',
  'Member of the LGBTQIA+ Community',
  'Solo Parent',
  'Person Deprived of Liberty (PDL)',
]

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

function AdvancedSearchPanel() {
  const [fields, setFields] = useState({
    lastName: '',
    firstName: '',
    birthday: '',
    idNumber: '',
    region: '',
    province: '',
    city: '',
    barangay: '',
  })
  const [sectoralFilters, setSectoralFilters] = useState([])

  const updateField = (key) => (event) => {
    setFields((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const toggleSectoralFilter = (category) => {
    setSectoralFilters((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100'

  const handleClear = () => {
    setFields({ lastName: '', firstName: '', birthday: '', idNumber: '', region: '', province: '', city: '', barangay: '' })
    setSectoralFilters([])
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">Advanced Search</h2>
      <p className="mt-1 text-xs text-slate-400">Search by name, birthday, ID number, or jurisdiction.</p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="text-xs text-slate-500">Last Name</span>
          <input type="text" value={fields.lastName} onChange={updateField('lastName')} placeholder="Santos" className={`mt-1.5 ${inputClass}`} />
        </label>
        <label className="block">
          <span className="text-xs text-slate-500">First Name</span>
          <input type="text" value={fields.firstName} onChange={updateField('firstName')} placeholder="Maria" className={`mt-1.5 ${inputClass}`} />
        </label>
        <label className="block">
          <span className="text-xs text-slate-500">Date of Birth</span>
          <input type="date" value={fields.birthday} onChange={updateField('birthday')} className={`mt-1.5 ${inputClass}`} />
        </label>
        <label className="block">
          <span className="text-xs text-slate-500">VRN / ID Number</span>
          <input type="text" value={fields.idNumber} onChange={updateField('idNumber')} placeholder="VRN-2026-001248" className={`mt-1.5 ${inputClass}`} />
        </label>
        <label className="block">
          <span className="text-xs text-slate-500">Region</span>
          <input type="text" value={fields.region} onChange={updateField('region')} placeholder="NCR" className={`mt-1.5 ${inputClass}`} />
        </label>
        <label className="block">
          <span className="text-xs text-slate-500">Province</span>
          <input type="text" value={fields.province} onChange={updateField('province')} placeholder="Metro Manila" className={`mt-1.5 ${inputClass}`} />
        </label>
        <label className="block">
          <span className="text-xs text-slate-500">City / Municipality</span>
          <input type="text" value={fields.city} onChange={updateField('city')} placeholder="Quezon City" className={`mt-1.5 ${inputClass}`} />
        </label>
        <label className="block">
          <span className="text-xs text-slate-500">Barangay</span>
          <input type="text" value={fields.barangay} onChange={updateField('barangay')} placeholder="Barangay Commonwealth" className={`mt-1.5 ${inputClass}`} />
        </label>
      </div>

      <div className="mt-4">
        <span className="text-xs text-slate-500">Special / Sectoral Category</span>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
          {SECTORAL_CATEGORIES.map((category) => (
            <label key={category} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={sectoralFilters.includes(category)}
                onChange={() => toggleSectoralFilter(category)}
                className="h-4 w-4 rounded accent-blue-600"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Clear
        </button>
      </div>
    </div>
  )
}

function JurisdictionBrowser() {
  const [path, setPath] = useState([])

  const node = path.reduce((acc, key) => acc?.[key], JURISDICTION_TREE) ?? JURISDICTION_TREE
  const isLeafLevel = path.length === 3
  const entries = Object.entries(node)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <MapPinIcon className="h-4 w-4 text-blue-600" />
        <h2 className="text-sm font-semibold text-slate-900">Browse by Jurisdiction</h2>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-sm">
        <button
          type="button"
          onClick={() => setPath([])}
          className={`font-semibold ${path.length === 0 ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          All
        </button>
        {path.map((segment, i) => (
          <span key={segment} className="flex items-center gap-1.5">
            <ChevronRightIcon className="h-3.5 w-3.5 text-slate-300" />
            <button
              type="button"
              onClick={() => setPath(path.slice(0, i + 1))}
              className={`font-semibold ${i === path.length - 1 ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {segment}
            </button>
          </span>
        ))}
      </div>

      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {JURISDICTION_LEVEL_LABELS[path.length]}
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        {entries.map(([key, value]) =>
          isLeafLevel ? (
            <span
              key={key}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-700"
            >
              {key}
              <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-500">
                {value.toLocaleString()}
              </span>
            </span>
          ) : (
            <button
              key={key}
              type="button"
              onClick={() => setPath([...path, key])}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              {key}
              <ChevronRightIcon className="h-3.5 w-3.5 text-slate-400" />
            </button>
          ),
        )}
      </div>
    </div>
  )
}

function VerifiedVotersTab() {
  const [search, setSearch] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      {showAdvanced && <AdvancedSearchPanel />}

      <JurisdictionBrowser />

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
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowAdvanced((v) => !v)}
              className={`text-sm font-semibold ${showAdvanced ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {showAdvanced ? 'Hide Advanced Search' : 'Advanced Search'}
            </button>
            <p className="text-sm text-slate-400">58,900,000 verified voters</p>
          </div>
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
      {activeTab === 'Match Results' && <MatchCandidates />}
      {activeTab === 'Registration History' && <VoterHistory />}
    </AdminLayout>
  )
}
