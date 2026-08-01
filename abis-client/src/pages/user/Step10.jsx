import { useEffect, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, FingerprintMark, CameraIcon, CheckCircleIcon } from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'
import RegistrationStepper from '../../components/RegistrationStepper'

const TICK_MS = 2000 // temporary fixed delay per matching tick
const TICK_STEP = 20

const FINGERPRINT_FINAL = 99.3
const FACE_FINAL = 97.8
const CONFIDENCE_FINAL = 98.7

function ScanTargetIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

export default function Step10({ onBack, onContinue }) {
  const [progress, setProgress] = useState(0)
  const isComplete = progress >= 100

  useEffect(() => {
    if (isComplete) return
    const timer = setTimeout(() => setProgress((p) => Math.min(p + TICK_STEP, 100)), TICK_MS)
    return () => clearTimeout(timer)
  }, [progress, isComplete])

  const fingerprintScore = ((FINGERPRINT_FINAL * progress) / 100).toFixed(1)
  const faceScore = ((FACE_FINAL * progress) / 100).toFixed(1)
  const confidence = ((CONFIDENCE_FINAL * progress) / 100).toFixed(1)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <BrandLockup />

          <RegistrationStepper currentStep={10} />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 rotate-45 items-center justify-center rounded-2xl border-2 border-blue-500 bg-white">
            <ScanTargetIcon className="h-7 w-7 -rotate-45 text-blue-600" />
          </div>

          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <ScanTargetIcon className="h-4 w-4" />
            Step 10 of 12
          </span>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {isComplete ? 'Matching Complete' : 'Biometric Matching'}
          </h1>
          <p className="mt-3 text-base text-slate-500">
            {isComplete
              ? 'Analysis completed. No duplicate records found.'
              : 'Comparing biometrics against the national database...'}
          </p>
        </div>

        <div className="mx-auto mt-8 w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 text-left">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Matching Progress</span>
            <span className="font-bold text-slate-900">{progress}%</span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-300 to-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="flex items-center gap-1.5 text-xs text-slate-500">
                <FingerprintMark className="h-3.5 w-3.5" />
                Fingerprint
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{fingerprintScore}%</p>
              <p className="text-xs font-medium text-emerald-600">Similarity Score</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="flex items-center gap-1.5 text-xs text-slate-500">
                <CameraIcon className="h-3.5 w-3.5" />
                Face Match
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{faceScore}%</p>
              <p className="text-xs font-medium text-emerald-600">Similarity Score</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-4 grid max-w-xl grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">{confidence}%</p>
            <p className="mt-1 text-xs text-slate-500">Identity Confidence</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">0</p>
            <p className="mt-1 text-xs text-slate-500">Duplicates Found</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">Low</p>
            <p className="mt-1 text-xs text-slate-500">Risk Score</p>
          </div>
        </div>

        {isComplete && (
          <div className="mx-auto mt-4 flex max-w-xl items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-left">
            <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
            <div>
              <p className="text-sm font-semibold text-emerald-800">Identity Verified — No Duplicate Found</p>
              <p className="mt-0.5 text-xs text-emerald-700">
                This applicant does not match any existing record in the database.
              </p>
            </div>
          </div>
        )}

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
            disabled={!isComplete}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors enabled:hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            Proceed to Final Check
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  )
}
