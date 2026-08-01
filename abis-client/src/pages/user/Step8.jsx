import { useEffect, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, CameraIcon, RefreshIcon, CheckCircleIcon } from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'
import RegistrationStepper from '../../components/RegistrationStepper'

const CAPTURE_DELAY_MS = 1000 // temporary fixed delay to "load" capture quality per eye

const EYES = ['left', 'right']
const EYE_LABELS = { left: 'Left Eye', right: 'Right Eye' }

const LIVE_QUALITY = { sharpness: 82, focus: 79, iqs: 78 }
const FINAL_QUALITY = { sharpness: 97, focus: 95, iqs: 96 }

const QUALITY_METRICS = [
  { key: 'sharpness', label: 'Sharpness', suffix: '%' },
  { key: 'focus', label: 'Focus', suffix: '%' },
  { key: 'iqs', label: 'IQS Score', suffix: '' },
]

function TargetIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    </svg>
  )
}

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

function IrisTarget({ done }) {
  return (
    <div className="relative flex h-40 w-40 items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-white/95" />
      <div className="absolute inset-3 rounded-full border border-blue-100" />
      <div className="absolute inset-7 rounded-full border border-blue-200" />
      <div className="absolute inset-11 rounded-full border border-blue-200" />
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-slate-900">
        <span className="h-3 w-2.5 -translate-x-1 -translate-y-1 rounded-full bg-slate-400/70" />
      </div>
      {done && (
        <span className="absolute -top-1 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow">
          <CheckIcon className="h-4 w-4" />
        </span>
      )}
    </div>
  )
}

export default function Step8({ onBack, onContinue }) {
  const [activeEye, setActiveEye] = useState('left')
  const [capturingEye, setCapturingEye] = useState(null)
  const [doneEyes, setDoneEyes] = useState({ left: false, right: false })

  useEffect(() => {
    if (!capturingEye) return
    const eye = capturingEye
    const timer = setTimeout(() => {
      setDoneEyes((prev) => ({ ...prev, [eye]: true }))
      setCapturingEye(null)
      setActiveEye(eye === 'left' ? 'right' : 'left')
    }, CAPTURE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [capturingEye])

  const allDone = doneEyes.left && doneEyes.right
  const activeDone = doneEyes[activeEye]
  const activeCapturing = capturingEye === activeEye
  const quality = activeDone ? FINAL_QUALITY : LIVE_QUALITY

  const handleCapture = (eye) => {
    if (doneEyes[eye] || capturingEye) return
    setCapturingEye(eye)
  }

  const handleRetake = (eye) => {
    setDoneEyes((prev) => ({ ...prev, [eye]: false }))
    setActiveEye(eye)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <BrandLockup />

          <RegistrationStepper currentStep={8} />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <RefreshIcon className="h-4 w-4" />
            Step 8 of 12
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Iris Scan</h1>
          <p className="mt-3 text-base text-slate-500">
            Position each eye within the scanner frame. Keep still and look directly at the camera.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-xl gap-3">
          {EYES.map((eye) => {
            const isDone = doneEyes[eye]
            const isActive = activeEye === eye
            return (
              <button
                key={eye}
                type="button"
                onClick={() => setActiveEye(eye)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  isDone
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                    : isActive
                      ? 'border-blue-400 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300'
                }`}
              >
                {isDone ? (
                  <CheckCircleIcon className="h-4 w-4 text-emerald-500" />
                ) : (
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                      isActive ? 'border-blue-600' : 'border-slate-300'
                    }`}
                  >
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />}
                  </span>
                )}
                {EYE_LABELS[eye]}
              </button>
            )
          })}
        </div>

        <div className="relative mx-auto mt-6 h-72 w-full max-w-xl overflow-hidden rounded-2xl bg-slate-900">
          <span className="absolute left-6 top-6 h-6 w-6 rounded-tl border-l-2 border-t-2 border-slate-500/70" />
          <span className="absolute right-6 top-6 h-6 w-6 rounded-tr border-r-2 border-t-2 border-slate-500/70" />
          <span className="absolute bottom-6 left-6 h-6 w-6 rounded-bl border-b-2 border-l-2 border-slate-500/70" />
          <span className="absolute bottom-6 right-6 h-6 w-6 rounded-br border-b-2 border-r-2 border-slate-500/70" />

          <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-blue-400/40" />

          <div className="absolute inset-0 flex items-center justify-center">
            <IrisTarget done={activeDone} />
          </div>

          <button
            type="button"
            onClick={() => handleCapture(activeEye)}
            disabled={activeDone || activeCapturing}
            className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {activeCapturing ? (
              <RefreshIcon className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <CameraIcon className="h-3.5 w-3.5" />
            )}
            Capture
          </button>

          <p className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-xs text-slate-300">
            <span className={`h-1.5 w-1.5 rounded-full ${activeDone ? 'bg-emerald-400' : 'bg-blue-400'}`} />
            {activeDone
              ? `${EYE_LABELS[activeEye]} captured successfully`
              : `Scanning ${activeEye} eye...`}
          </p>
        </div>

        <div className="mx-auto mt-6 w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Capture Quality</p>

          <div className="mt-4 grid grid-cols-3 gap-6">
            {QUALITY_METRICS.map((metric) => {
              const value = quality[metric.key]
              const isGood = value >= 90
              return (
                <div key={metric.key}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{metric.label}</span>
                    <span className={`font-semibold ${isGood ? 'text-emerald-600' : 'text-amber-500'}`}>
                      {value}
                      {metric.suffix}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${isGood ? 'bg-emerald-500' : 'bg-amber-400'}`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3">
            {EYES.map((eye) => (
              <span
                key={eye}
                className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                  doneEyes[eye] ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                {doneEyes[eye] ? (
                  <CheckCircleIcon className="h-4 w-4 text-emerald-500" />
                ) : (
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-slate-200" />
                )}
                {EYE_LABELS[eye]}
              </span>
            ))}
          </div>
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

          <div className="flex items-center gap-3">
            {activeDone && (
              <button
                type="button"
                onClick={() => handleRetake(activeEye)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <RefreshIcon className="h-4 w-4" />
                Retake
              </button>
            )}

            <button
              type="button"
              onClick={allDone ? onContinue : () => handleCapture(activeEye)}
              disabled={!allDone && (activeDone || activeCapturing)}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors enabled:hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
            >
              {allDone ? (
                <>
                  Continue
                  <ArrowRightIcon className="h-4 w-4" />
                </>
              ) : activeCapturing ? (
                <>
                  Capturing...
                  <RefreshIcon className="h-4 w-4 animate-spin" />
                </>
              ) : activeDone ? (
                `${EYE_LABELS[activeEye]} Captured`
              ) : (
                <>
                  Capture {EYE_LABELS[activeEye]}
                  <TargetIcon className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
