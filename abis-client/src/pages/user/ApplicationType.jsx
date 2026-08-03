import { useState } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FileTextIcon,
  GridIcon,
  InfoCircleIcon,
  MapPinIcon,
  RefreshIcon,
  SwapIcon,
  UserIcon,
  UsersIcon,
} from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'

const APPLICATION_TYPES = [
  {
    key: 'new',
    icon: UserIcon,
    title: 'Registration for New Voters',
    description:
      'For applicants who will be at least eighteen (18) years old on election day but have not yet registered.',
  },
  {
    key: 'overseas',
    icon: MapPinIcon,
    title: 'Certification as Overseas Voter',
    description:
      'For applicants with existing local registration records who intend to vote overseas in the next National Elections.',
  },
  {
    key: 'transfer',
    icon: SwapIcon,
    title: 'Transfer of Registration',
    description:
      "For applicants who have transferred residence from one city/municipality/district to another, or within the same city/municipality. For overseas voters, this covers a transfer from one Post to another, one country to another within the same Post, or from a Post to a Philippine city/municipality/district.",
  },
  {
    key: 'reactivation',
    icon: RefreshIcon,
    title: 'Reactivation',
    description:
      'For applicants whose records have been deactivated under Section 27 of R.A. 8189, Sections 3 and 10 of R.A. 10367, and Section 14 of R.A. 9189 as amended by R.A. 10590.',
  },
  {
    key: 'correction',
    icon: FileTextIcon,
    title: 'Correction of Entries',
    description:
      'For applicants who wish to correct their information as reflected in the database, including changes in name and civil status due to marriage.',
  },
  {
    key: 'combination',
    icon: GridIcon,
    title: 'Combination of Applications',
    description:
      'For applicants filing more than one application at once, such as transfer with reactivation and correction of entries, among others.',
  },
  {
    key: 'sk',
    icon: UsersIcon,
    title: 'Registration for Sangguniang Kabataan',
    description: 'For applicants who will be fifteen (15) to seventeen (17) years old on election day.',
  },
]

function CheckMark({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ApplicationOption({ icon: Icon, title, description, checked, onSelect }) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-4 px-6 py-4 ${
        checked ? 'bg-blue-50' : 'hover:bg-slate-50'
      }`}
    >
      <input
        type="radio"
        name="applicationType"
        checked={checked}
        onChange={onSelect}
        className="mt-1 h-5 w-5 flex-shrink-0 accent-blue-600"
      />
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          checked ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1 text-left">
        <p className={`text-base font-semibold ${checked ? 'text-blue-700' : 'text-slate-900'}`}>{title}</p>
        <p className="mt-0.5 text-sm text-slate-500">{description}</p>
      </div>
      {checked && <CheckMark className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />}
    </label>
  )
}

export default function ApplicationType({ onBack, onContinue }) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <BrandLockup />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <FileTextIcon className="h-4 w-4" />
            Application Type
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900">
            What type of application is this?
          </h1>
          <p className="mt-3 text-base text-slate-500">
            Select the registration application that applies to you.
          </p>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-left">
          <InfoCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
          <p className="text-sm text-blue-700/80">
            Pursuant to R.A. 8189, R.A. 10367 and relevant registration laws, the system of
            continuing registration of voters is conducted (1) in the field offices of each
            city/municipality/district, (2) via satellite and special satellite registration,
            (3) via the Register Anywhere Program (RAP), or (4) via overseas registration,
            during the registration period set by the Commission.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="divide-y divide-slate-100">
            {APPLICATION_TYPES.map((type) => (
              <ApplicationOption
                key={type.key}
                icon={type.icon}
                title={type.title}
                description={type.description}
                checked={selected === type.key}
                onSelect={() => setSelected(type.key)}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </button>
          <button
            type="button"
            onClick={() => onContinue?.(selected)}
            disabled={!selected}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors enabled:hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:shadow-none"
          >
            Continue
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  )
}