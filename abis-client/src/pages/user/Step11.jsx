import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, InfoCircleIcon } from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'
import RegistrationStepper from '../../components/RegistrationStepper'

const EXISTING_RECORD_TYPES = ['transfer', 'reactivation', 'correction', 'overseas']

const SEARCH_STATS = [
  { key: 'checked', value: '869,173', label: 'Records Checked' },
  { key: 'hits', value: '0', label: 'Potential Hits' },
  { key: 'confidence', value: '99.7%', label: 'Confidence' },
]

const NEW_APPLICANT_CHECKLIST = [
  'Identity confirmed against PSA Civil Registry',
  'No existing voter registration found',
  'Fingerprint uniqueness verified',
  'Facial biometric enrolled and validated',
  'Government ID cross-referenced',
  'Liveness detection passed',
  'No blacklist or watchlist match',
]

const EXISTING_RECORD_CHECKLIST = [
  'Identity confirmed against PSA Civil Registry',
  'Existing voter registration record matched',
  'Fingerprint uniqueness verified',
  'Facial biometric validated against record on file',
  'Government ID cross-referenced',
  'Liveness detection passed',
  'No blacklist or watchlist match',
]

export default function Step11({ types: rawTypes, onBack, onContinue }) {
  const types = rawTypes && rawTypes.length ? rawTypes : ['new']
  const isExistingRecord = types.some((t) => EXISTING_RECORD_TYPES.includes(t))
  const checklist = isExistingRecord ? EXISTING_RECORD_CHECKLIST : NEW_APPLICANT_CHECKLIST

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <BrandLockup />

          <RegistrationStepper currentStep={11} />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <CheckCircleIcon className="h-4 w-4" />
            Step 11 of 12
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Hit Checking Results
          </h1>
          <p className="mt-3 text-base text-slate-500">
            Reviewing potential matches in the national voter database.
          </p>
        </div>

        <div className="mx-auto mt-8 w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 text-left">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
              <CheckCircleIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-base font-bold text-slate-900">
                {isExistingRecord ? 'Existing Record Matched & Confirmed' : 'No Duplicate Records Found'}
              </p>
              <p className="mt-0.5 text-sm text-slate-500">
                {isExistingRecord
                  ? 'Searched 869,173 voter records — 1 matching record confirmed'
                  : 'Searched 869,173 voter records — 0 matches found'}
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {(isExistingRecord
              ? [
                  { key: 'checked', value: '869,173', label: 'Records Checked' },
                  { key: 'hits', value: '1', label: 'Matching Record' },
                  { key: 'confidence', value: '99.7%', label: 'Confidence' },
                ]
              : SEARCH_STATS
            ).map((stat) => (
              <div key={stat.key} className="rounded-xl bg-slate-50 p-4 text-center">
                <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-4 w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Verification Checklist</p>
          <ul className="mt-3 space-y-2.5">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                <CheckCircleIcon className="h-4 w-4 shrink-0 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-4 flex max-w-xl items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-left">
          <InfoCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
          <p className="text-sm text-blue-700">
            {isExistingRecord
              ? 'This application is approved. The applicant’s existing Voter Registration Record will be updated upon completion.'
              : 'This application is approved for registration. The applicant will be assigned a Voter Registration Number (VRN) upon completion.'}
          </p>
        </div>

        <div className="mx-auto mt-6 flex max-w-xl items-center justify-between">
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
            onClick={onContinue}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors hover:bg-blue-800"
          >
            Complete Registration
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  )
}
