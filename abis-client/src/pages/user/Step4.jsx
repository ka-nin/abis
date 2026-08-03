import { useEffect, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, RefreshIcon, CheckCircleIcon, FileTextIcon } from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'
import RegistrationStepper from '../../components/RegistrationStepper'

const STEP_DURATION_MS = 2000 // temporary fixed delay per check

const EXISTING_RECORD_TYPES = ['transfer', 'reactivation', 'correction', 'overseas']

const NEW_RECORD_CHECKS = [
  'Connecting to PSA National Registry',
  'Validating ID Number',
  'Retrieving Civil Records',
  'Cross-referencing with COMELEC',
  'Identity Confirmed',
]

const EXISTING_RECORD_CHECKS = [
  'Connecting to COMELEC Voter Registration System',
  'Validating ID Number',
  'Retrieving Existing Registration Record',
  'Cross-referencing with PSA Civil Registry',
  'Record Located & Confirmed',
]

const RETRIEVED_INFO = [
  { label: 'Full Name', value: 'Maria C. Santos' },
  { label: 'Date of Birth', value: 'June 12, 1990' },
  { label: 'Civil Status', value: 'Single' },
  { label: 'PSA Record No.', value: '2024-PSA-00891234' },
  { label: 'Address', value: 'Quezon City, NCR' },
]

function CheckItem({ label, status, isFinal }) {
  return (
    <li className="flex items-center gap-3 py-3">
      {status === 'done' && (
        <CheckCircleIcon className={`h-5 w-5 flex-shrink-0 ${isFinal ? 'text-blue-600' : 'text-emerald-500'}`} />
      )}
      {status === 'processing' && <RefreshIcon className="h-5 w-5 flex-shrink-0 animate-spin text-blue-600" />}
      {status === 'pending' && (
        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
          <span className="h-3 w-3 rounded-full border-2 border-slate-200" />
        </span>
      )}

      <p className={`flex-1 text-sm ${status === 'pending' ? 'text-slate-300' : 'font-medium text-slate-900'}`}>
        {label}
      </p>

      {status === 'done' && !isFinal && (
        <span className="flex-shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
          Done
        </span>
      )}
      {status === 'processing' && (
        <span className="flex-shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
          Processing
        </span>
      )}
    </li>
  )
}

export default function Step4({ types: rawTypes, onBack, onContinue }) {
  const types = rawTypes && rawTypes.length ? rawTypes : ['new']
  const isExistingRecord = types.some((t) => EXISTING_RECORD_TYPES.includes(t))
  const RECORD_CHECKS = isExistingRecord ? EXISTING_RECORD_CHECKS : NEW_RECORD_CHECKS

  const [completedCount, setCompletedCount] = useState(0)
  const isComplete = completedCount >= RECORD_CHECKS.length

  useEffect(() => {
    if (isComplete) return
    const timer = setTimeout(() => setCompletedCount((c) => c + 1), STEP_DURATION_MS)
    return () => clearTimeout(timer)
  }, [completedCount, isComplete])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <BrandLockup />

          <RegistrationStepper currentStep={4} />
        </div>
      </header>

      <main className="mx-auto flex max-w-xl flex-col items-center px-6 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          {isComplete ? (
            <CheckCircleIcon className="h-7 w-7 text-emerald-500" />
          ) : (
            <RefreshIcon className="h-7 w-7 animate-spin" />
          )}
        </span>

        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
          <FileTextIcon className="h-4 w-4" />
          Step 4 of 12
        </span>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">
          {isExistingRecord
            ? isComplete
              ? 'Existing Record Retrieved'
              : 'Retrieving Your Registration Record'
            : isComplete
              ? 'Government Records Retrieved'
              : 'Retrieving Government Records'}
        </h1>
        <p className="mt-3 text-base text-slate-500">
          {isExistingRecord
            ? isComplete
              ? 'Your existing registration record has been located and confirmed.'
              : 'Please wait while we locate your existing registration record…'
            : isComplete
              ? 'Your identity has been verified.'
              : 'Please wait while we verify your identity…'}
        </p>

        <div className="mt-8 w-full rounded-2xl border border-slate-200 bg-white p-6 text-left">
          <ul className="divide-y divide-slate-100">
            {RECORD_CHECKS.map((label, index) => {
              const status = index < completedCount ? 'done' : index === completedCount ? 'processing' : 'pending'
              return (
                <CheckItem key={label} label={label} status={status} isFinal={index === RECORD_CHECKS.length - 1} />
              )
            })}
          </ul>
        </div>

        {isComplete && (
          <div className="mt-4 w-full rounded-2xl border border-slate-200 bg-white p-6 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {isExistingRecord ? 'Existing Record Details' : 'Retrieved Information'}
            </p>
            <ul className="mt-3 divide-y divide-slate-100">
              {RETRIEVED_INFO.map((item) => (
                <li key={item.label} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="font-medium text-slate-900">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex w-full items-center justify-between">
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
            disabled={!isComplete}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors enabled:hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:shadow-none"
          >
            Proceed to Biometrics
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  )
}
