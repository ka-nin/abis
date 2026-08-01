import { useEffect, useState } from 'react'
import {
  ShieldCheckIcon,
  ShieldIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CameraIcon,
  FingerprintMark,
  RefreshIcon,
  CheckCircleIcon,
} from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'
import RegistrationStepper from '../../components/RegistrationStepper'

const AGENCY_STEP_DURATION_MS = 1000 // temporary fixed delay per agency check

const AGENCY_LABELS = ['PSA', 'PhilSys', 'LTO', 'COMELEC DB']

function CheckIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MethodCard({ icon: Icon, iconBg, iconColor, title, subtitle, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-center transition-colors hover:border-blue-300 hover:shadow-md"
    >
      <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}>
        <Icon className="h-7 w-7" />
      </span>
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-slate-900">{title}</p>
        <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-400">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        Not yet completed
      </span>
    </button>
  )
}

export default function Step5({ onBack, onSelectFace, onSelectFingerprint }) {
  const [completedAgencies, setCompletedAgencies] = useState(0)
  const backgroundDone = completedAgencies >= AGENCY_LABELS.length
  const backgroundProgress = Math.round((completedAgencies / AGENCY_LABELS.length) * 100)

  useEffect(() => {
    if (backgroundDone) return
    const timer = setTimeout(() => setCompletedAgencies((c) => c + 1), AGENCY_STEP_DURATION_MS)
    return () => clearTimeout(timer)
  }, [completedAgencies, backgroundDone])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <BrandLockup />

          <RegistrationStepper currentStep={5} />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <ShieldCheckIcon className="h-4 w-4" />
            Step 5 of 12
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Biometric Verification
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-slate-500">
            While the system is retrieving your data from authorized government agencies, we will begin the
            biometric verification process.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border-2 border-blue-500 bg-white p-6 text-left">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ShieldIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-base font-bold text-slate-900">Purpose</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                To verify your identity, we will compare your current biometric data with the biometric
                information associated with the valid ID you provided.
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                  Proceed to <span className="font-semibold text-slate-900">Step 6</span> for Facial Recognition
                  capture
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                  Proceed to <span className="font-semibold text-slate-900">Step 7</span> for Fingerprint capture
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          <MethodCard
            icon={CameraIcon}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
            title="Face Recognition"
            subtitle="Step 6 — Facial capture via camera"
            onSelect={onSelectFace}
          />
          <MethodCard
            icon={FingerprintMark}
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
            title="Fingerprint Capture"
            subtitle="Step 7 — Ten-print ink & scanner"
            onSelect={onSelectFingerprint}
          />
        </div>

        <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 text-left">
          {backgroundDone ? (
            <div className="flex items-center gap-3">
              <CheckCircleIcon className="h-5 w-5 shrink-0 text-emerald-500" />
              <p className="text-sm font-medium text-slate-700">
                Identity information retrieved successfully. You may now proceed with biometric capture.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-3">
                <RefreshIcon className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-blue-600" />
                <p className="text-sm text-slate-600">
                  Your identity information is being retrieved in the background while you complete the
                  biometric steps.
                </p>
              </div>

              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${backgroundProgress}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-400">
                Retrieving from government databases... {backgroundProgress}%
              </p>
            </>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            {AGENCY_LABELS.map((label, index) => {
              const done = index < completedAgencies
              return (
                <span
                  key={label}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    done ? 'bg-emerald-50 text-emerald-700' : 'border border-slate-200 bg-white text-slate-400'
                  }`}
                >
                  {done ? <CheckIcon className="h-3 w-3" /> : <RefreshIcon className="h-3 w-3 animate-spin" />}
                  {label}
                </span>
              )
            })}
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-2xl items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </button>

          {backgroundDone && (
            <button
              type="button"
              onClick={onSelectFace}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors hover:bg-blue-800"
            >
              Begin Face Recognition
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
