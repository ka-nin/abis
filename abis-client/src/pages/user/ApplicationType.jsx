import { useState } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FileTextIcon,
  GridIcon,
  InfoCircleIcon,
  MapPinIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SwapIcon,
  UserIcon,
  UsersIcon,
} from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'

const CATEGORIES = [
  {
    key: 'local',
    icon: MapPinIcon,
    title: 'Local',
    description: 'Register in person at your local city, municipality, or district field office.',
  },
  {
    key: 'overseas',
    icon: 'globe',
    title: 'Overseas',
    description: 'Register or apply for certification as an overseas voter for the next National Elections.',
  },
  {
    key: 'sk',
    icon: UsersIcon,
    title: 'Sangguniang Kabataan',
    description: 'Register for the Sangguniang Kabataan elections if you are 15 to 17 years old.',
  },
  {
    key: 'rap',
    icon: GridIcon,
    title: 'Registration Anywhere Project',
    description: 'Register at any COMELEC-designated RAP site regardless of your registered address.',
  },
]

const APPLICATION_TYPES = [
  {
    key: 'new',
    icon: UserIcon,
    title: 'Registration for New Voters',
    description:
      'For applicants who will be at least eighteen (18) years old on election day but have not yet registered.',
    categories: ['local', 'rap'],
  },
  {
    key: 'overseas',
    icon: MapPinIcon,
    title: 'Certification as Overseas Voter',
    description:
      'For applicants with existing local registration records who intend to vote overseas in the next National Elections.',
    categories: ['overseas'],
  },
  {
    key: 'transfer',
    icon: SwapIcon,
    title: 'Transfer of Registration',
    description:
      "For applicants who have transferred residence from one city/municipality/district to another, or within the same city/municipality. For overseas voters, this covers a transfer from one Post to another, one country to another within the same Post, or from a Post to a Philippine city/municipality/district.",
    categories: ['local', 'rap', 'overseas'],
  },
  {
    key: 'reactivation',
    icon: RefreshIcon,
    title: 'Reactivation',
    description:
      'For applicants whose records have been deactivated under Section 27 of R.A. 8189, Sections 3 and 10 of R.A. 10367, and Section 14 of R.A. 9189 as amended by R.A. 10590.',
    categories: ['local', 'rap', 'overseas'],
  },
  {
    key: 'validation',
    icon: ShieldCheckIcon,
    title: 'Validation of Biometrics',
    description:
      'For registered voters with incomplete or unvalidated biometrics under R.A. 10367, who need to complete their record to avoid deactivation.',
    categories: ['local', 'rap', 'overseas'],
  },
  {
    key: 'correction',
    icon: FileTextIcon,
    title: 'Correction of Entries',
    description:
      'For applicants who wish to correct their information as reflected in the database, including changes in name and civil status due to marriage.',
    categories: ['local', 'rap', 'overseas', 'sk'],
  },
  {
    key: 'combination',
    icon: GridIcon,
    title: 'Combination of Applications',
    description:
      'For applicants filing more than one application at once, such as transfer with reactivation and correction of entries, among others.',
    categories: ['local', 'rap', 'overseas'],
  },
  {
    key: 'sk',
    icon: UsersIcon,
    title: 'Registration for Sangguniang Kabataan',
    description: 'For applicants who will be fifteen (15) to seventeen (17) years old on election day.',
    categories: ['sk'],
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

function Switch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
        checked ? 'bg-blue-600' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

function CategoryCard({ icon, title, description, onClick }) {
  const Icon = icon === 'globe' ? GlobeIcon : icon
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/10"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <p className="mt-1.5 text-sm text-slate-500">{description}</p>
      </div>
      <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
        Select
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  )
}

function ApplicationOption({ icon: Icon, title, description, checked, onSelect, inputType = 'radio' }) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-4 px-6 py-4 ${
        checked ? 'bg-blue-50' : 'hover:bg-slate-50'
      }`}
    >
      <input
        type={inputType}
        name={inputType === 'radio' ? 'applicationType' : undefined}
        checked={checked}
        onChange={onSelect}
        className={`mt-1 h-5 w-5 flex-shrink-0 accent-blue-600 ${inputType === 'checkbox' ? 'rounded' : ''}`}
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
  const [stage, setStage] = useState('category')
  const [category, setCategory] = useState(null)
  const [type, setType] = useState(null)
  const [combinationMode, setCombinationMode] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState([])

  const selectedCategory = CATEGORIES.find((c) => c.key === category)
  const combinationOption = APPLICATION_TYPES.find((option) => option.key === 'combination')
  const showCombinationToggle = Boolean(combinationOption?.categories.includes(category))
  const availableTypes = APPLICATION_TYPES.filter(
    (option) =>
      option.key !== 'combination' &&
      option.categories.includes(category) &&
      !(combinationMode && option.key === 'new'),
  )

  const isTypeSelected = combinationMode ? selectedTypes.length >= 2 : Boolean(type)

  const resetTypeSelection = () => {
    setType(null)
    setCombinationMode(false)
    setSelectedTypes([])
  }

  const handleSelectCategory = (key) => {
    setCategory(key)
    resetTypeSelection()
    setStage('type')
  }

  const handleBackToCategory = () => {
    setStage('category')
    resetTypeSelection()
  }

  const handleToggleCombination = (next) => {
    setCombinationMode(next)
    setType(null)
    setSelectedTypes([])
  }

  const toggleSelectedType = (key) => {
    setSelectedTypes((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  if (stage === 'type') {
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
              {selectedCategory?.title} — Application Type
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900">
              What type of application is this?
            </h1>
            <p className="mt-3 text-base text-slate-500">
              Select the specific registration application that applies to you.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="divide-y divide-slate-100">
              {showCombinationToggle && (
                <div className="flex items-start justify-between gap-4 bg-slate-50/60 px-6 py-4">
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        combinationMode ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      <GridIcon className="h-5 w-5" />
                    </span>
                    <div className="text-left">
                      <p className={`text-base font-semibold ${combinationMode ? 'text-blue-700' : 'text-slate-900'}`}>
                        {combinationOption.title}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-500">
                        {combinationOption.description} Switch on to select multiple types below.
                      </p>
                    </div>
                  </div>
                  <Switch checked={combinationMode} onChange={handleToggleCombination} />
                </div>
              )}

              {availableTypes.map((option) => (
                <ApplicationOption
                  key={option.key}
                  icon={option.icon}
                  title={option.title}
                  description={option.description}
                  inputType={combinationMode ? 'checkbox' : 'radio'}
                  checked={combinationMode ? selectedTypes.includes(option.key) : type === option.key}
                  onSelect={() =>
                    combinationMode ? toggleSelectedType(option.key) : setType(option.key)
                  }
                />
              ))}
            </div>
          </div>

          {combinationMode && selectedTypes.length < 2 && (
            <p className="mt-3 text-sm text-amber-600">
              Select at least two application types above to combine.
            </p>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBackToCategory}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back
            </button>
            <button
              type="button"
              onClick={() =>
                onContinue?.({
                  category,
                  combination: combinationMode,
                  type: combinationMode ? null : type,
                  types: combinationMode ? selectedTypes : [],
                })
              }
              disabled={!isTypeSelected}
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <BrandLockup />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <FileTextIcon className="h-4 w-4" />
            Application Type
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900">
            How would you like to register?
          </h1>
          <p className="mt-3 text-base text-slate-500">
            Select the registration category that applies to you.
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

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {CATEGORIES.map((c) => (
            <CategoryCard
              key={c.key}
              icon={c.icon}
              title={c.title}
              description={c.description}
              onClick={() => handleSelectCategory(c.key)}
            />
          ))}
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </button>
        </div>
      </main>
    </div>
  )
}