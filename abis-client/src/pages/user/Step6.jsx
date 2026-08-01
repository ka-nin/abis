import { useEffect, useState } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CameraIcon,
  RefreshIcon,
  CheckCircleIcon,
  UserIcon,
} from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'
import RegistrationStepper from '../../components/RegistrationStepper'

const SCAN_TICK_MS = 1000 // temporary fixed delay per scan tick
const SCAN_TICK_STEP = 10

const QUALITY_CHECKS = [
  { key: 'faceQuality', label: 'Face Quality', final: 92 },
  { key: 'lighting', label: 'Lighting', final: 85 },
  { key: 'sharpness', label: 'Sharpness', final: 95 },
  { key: 'liveness', label: 'Liveness', final: 98 },
]

const TIPS = ['Look directly at camera', 'Remove glasses', 'Ensure bright lighting', 'Keep face centered']

function QualityCheckRow({ label, value }) {
  const isGood = value >= 60
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-600">{label}</span>
        <span className={`font-semibold ${isGood ? 'text-emerald-600' : 'text-red-500'}`}>{value}%</span>
      </div>
      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${isGood ? 'bg-emerald-500' : 'bg-red-500'}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default function Step6({ onBack, onContinue }) {
  const [started, setStarted] = useState(false)
  const [progress, setProgress] = useState(0)
  const isCaptured = progress >= 100
  const isHolding = started && progress >= 80

  useEffect(() => {
    if (!started || progress >= 100) return
    const timer = setTimeout(() => setProgress((p) => Math.min(p + SCAN_TICK_STEP, 100)), SCAN_TICK_MS)
    return () => clearTimeout(timer)
  }, [started, progress])

  const metrics = QUALITY_CHECKS.map((check) => ({
    ...check,
    value: started ? Math.round(check.final * (0.3 + 0.7 * (progress / 100))) : 0,
  }))

  const handleCapture = () => setStarted(true)

  const handleRetake = () => {
    setStarted(false)
    setProgress(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <BrandLockup />

          <RegistrationStepper currentStep={6} />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <CameraIcon className="h-4 w-4" />
            Step 6 of 12
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Face Capture</h1>
          <p className="mt-3 text-base text-slate-500">
            Position your face within the oval guide. Ensure good lighting.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center">
          <div className="flex w-full max-w-[340px] flex-col items-center">
            {/* Placeholder camera preview — real device camera access not wired up yet */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-900">
              <span
                className={`absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold shadow ${
                  isHolding ? 'bg-emerald-50 text-emerald-700' : 'bg-white text-blue-600'
                }`}
              >
                {isHolding ? 'Hold still...' : started ? 'Scanning...' : 'Center your face'}
              </span>

              <span className="absolute left-6 top-6 h-6 w-6 rounded-tl border-l-2 border-t-2 border-slate-500/70" />
              <span className="absolute right-6 top-6 h-6 w-6 rounded-tr border-r-2 border-t-2 border-slate-500/70" />
              <span className="absolute bottom-6 left-6 h-6 w-6 rounded-bl border-b-2 border-l-2 border-slate-500/70" />
              <span className="absolute bottom-6 right-6 h-6 w-6 rounded-br border-b-2 border-r-2 border-slate-500/70" />

              <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-blue-400/40" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-52 w-44 items-center justify-center rounded-[50%] border-2 border-dashed border-blue-400/70">
                  <UserIcon className="h-32 w-32 text-emerald-400" />
                </div>
              </div>
            </div>

            <div className="mt-4 w-full">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{started ? 'Scanning Face' : 'Ready to Scan'}</span>
                <span>{progress}%</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {!started ? (
              <button
                type="button"
                onClick={handleCapture}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors hover:bg-blue-800"
              >
                <CameraIcon className="h-4 w-4" />
                Capture Photo
              </button>
            ) : !isCaptured ? (
              <button
                type="button"
                disabled
                className="mt-4 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-blue-300 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/10"
              >
                <CameraIcon className="h-4 w-4" />
                Scanning...
              </button>
            ) : (
              <div className="mt-4 flex w-full gap-3">
                <button
                  type="button"
                  onClick={handleRetake}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <RefreshIcon className="h-4 w-4" />
                  Retake
                </button>
                <button
                  type="button"
                  onClick={onContinue}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors hover:bg-blue-800"
                >
                  Use Photo
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onBack}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back
            </button>
          </div>

          <div className="w-full max-w-[280px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Quality Checks</p>
              <div className="mt-3 space-y-3">
                {metrics.map((metric) => (
                  <QualityCheckRow key={metric.key} label={metric.label} value={metric.value} />
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Tips</p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                {TIPS.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {isCaptured && (
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <CheckCircleIcon className="h-5 w-5 shrink-0 text-emerald-500" />
                <p className="text-sm font-medium text-emerald-700">Photo captured successfully</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
