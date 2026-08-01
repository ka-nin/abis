import { useEffect, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, FingerprintMark, CheckCircleIcon, RefreshIcon } from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'
import RegistrationStepper from '../../components/RegistrationStepper'
import leftHand from '../../assets/left_hand.png'
import leftHandCheck from '../../assets/left_hand_check.png'
import rightHand from '../../assets/right_hand.png'
import rightHandCheck from '../../assets/right_hand_check.png'
import scannerImage from '../../assets/Scanner.png'

const STAGES = ['Capture Prints', 'Scan Form', 'Process']
const SCAN_TICK_MS = 1000 // temporary fixed delay per scan tick
const SCAN_TICK_STEP = 20

const SCAN_CHECKLIST = [
  { key: 'left', label: 'Left hand scanned', threshold: 40 },
  { key: 'right', label: 'Right hand scanned', threshold: 70 },
  { key: 'processing', label: 'Processing fingerprints...', threshold: 100 },
]

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

function StageTracker({ activeIndex }) {
  return (
    <div className="mx-auto mt-6 flex max-w-md items-center justify-center">
      {STAGES.map((label, index) => {
        const isDone = index < activeIndex
        const isActive = index === activeIndex
        return (
          <div key={label} className="flex items-center">
            {index !== 0 && (
              <span className={`h-px w-10 ${index <= activeIndex ? 'bg-emerald-400' : 'bg-slate-200'}`} />
            )}
            <div className="flex items-center gap-1.5 px-1">
              {isDone ? (
                <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
              ) : (
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {index + 1}
                </span>
              )}
              <span
                className={`whitespace-nowrap text-xs font-semibold ${
                  isActive ? 'text-blue-700' : isDone ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                {label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function HandCard({ label, image, checkedImage, done, onMark }) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>

      <img src={done ? checkedImage : image} alt={`${label} print guide`} className="mt-3 h-28 w-auto" />

      <button
        type="button"
        onClick={onMark}
        disabled={done}
        className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
          done
            ? 'cursor-default border-emerald-200 bg-emerald-50 text-emerald-600'
            : 'border-blue-200 bg-white text-blue-600 hover:bg-blue-50'
        }`}
      >
        {done && <CheckIcon className="h-3 w-3" />}
        {done ? `${label.split(' ')[0]} Done` : `Mark ${label}`}
      </button>
    </div>
  )
}

function StepRow({ number, status, children }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5">
      {status === 'done' ? (
        <CheckCircleIcon className="h-6 w-6 shrink-0 text-emerald-500" />
      ) : status === 'loading' ? (
        <RefreshIcon className="h-6 w-6 shrink-0 animate-spin text-blue-500" />
      ) : (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-400">
          {number}
        </span>
      )}
      <p className="text-sm text-slate-600">{children}</p>
    </div>
  )
}

export default function Step7({ onBack, onContinue, onSkip }) {
  const [leftDone, setLeftDone] = useState(false)
  const [rightDone, setRightDone] = useState(false)
  const [stage, setStage] = useState('capture') // 'capture' | 'scanning'
  const [scanProgress, setScanProgress] = useState(0)

  const bothHandsDone = leftDone && rightDone
  const isScanning = stage === 'scanning'
  const scanDone = scanProgress >= 100

  useEffect(() => {
    if (!isScanning || scanDone) return
    const timer = setTimeout(() => setScanProgress((p) => Math.min(p + SCAN_TICK_STEP, 100)), SCAN_TICK_MS)
    return () => clearTimeout(timer)
  }, [isScanning, scanProgress, scanDone])

  const handleStartScan = () => {
    setStage('scanning')
    setScanProgress(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <BrandLockup />

          <RegistrationStepper currentStep={7} />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <FingerprintMark className="h-4 w-4" />
            Step 7 of 12
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Fingerprint Capture
          </h1>
          <p className="mt-3 text-base text-slate-500">
            Place your finger on the fingerprint scanner.
            <br />
            Keep it flat and steady until the scan is complete.
          </p>
        </div>

        <StageTracker activeIndex={scanDone ? STAGES.length : isScanning ? 1 : 0} />

        <div className="mx-auto mt-6 flex max-w-3xl flex-col items-start gap-6 lg:flex-row">
          <div className="flex w-full flex-col gap-4 lg:max-w-[420px]">
            <div className="rounded-2xl border-2 border-blue-500 bg-white p-6 text-left">
              <div className="flex items-start gap-3">
                {isScanning ? (
                  <CheckCircleIcon className="h-6 w-6 shrink-0 text-emerald-500" />
                ) : (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    1
                  </span>
                )}
                <p className="text-sm font-semibold text-slate-900">
                  {isScanning
                    ? 'Place your fingerprints on the provided fingerprint form.'
                    : 'Place your fingerprints on the provided fingerprint machine.'}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-6">
                <HandCard
                  label="Left Hand"
                  image={leftHand}
                  checkedImage={leftHandCheck}
                  done={leftDone}
                  onMark={() => setLeftDone(true)}
                />
                <HandCard
                  label="Right Hand"
                  image={rightHand}
                  checkedImage={rightHandCheck}
                  done={rightDone}
                  onMark={() => setRightDone(true)}
                />
              </div>
            </div>

            <StepRow number={2} status={isScanning ? 'done' : 'pending'}>
              Scan the completed fingerprint form.
            </StepRow>
            <StepRow number={3} status={!isScanning ? 'pending' : scanDone ? 'done' : 'loading'}>
              Your fingerprints will be processed.
            </StepRow>
          </div>

          <div className="w-full lg:max-w-[280px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              {!isScanning ? (
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
                    <FingerprintMark className="h-7 w-7 text-slate-300" />
                  </div>
                  <p className="mt-3 text-xs font-medium text-slate-400">Waiting for ink capture</p>
                  <p className="mt-4 text-sm text-slate-500">Mark both hands as done to proceed to scanning.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-2 self-start">
                    <span className={`h-1.5 w-1.5 rounded-full ${scanDone ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                    <p className="text-sm font-semibold text-slate-900">
                      {scanDone ? 'Scan Complete' : 'Scanning...'}
                    </p>
                  </div>

                  <img src={scannerImage} alt="Fingerprint scanner" className="mt-4 h-14 w-24 object-contain" />

                  <div className="mt-4 w-full">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Processing</span>
                      <span>{scanProgress}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-500 transition-all duration-500"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>

                  <ul className="mt-4 w-full space-y-1.5 text-left text-sm">
                    {SCAN_CHECKLIST.map((item) => {
                      const done = scanProgress >= item.threshold
                      return (
                        <li key={item.key} className="flex items-center gap-2">
                          {done ? (
                            <CheckCircleIcon className="h-4 w-4 shrink-0 text-emerald-500" />
                          ) : (
                            <span className="h-3 w-3 shrink-0 rounded-full border-2 border-slate-200" />
                          )}
                          <span className={done ? 'text-slate-700' : 'text-slate-400'}>{item.label}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-3xl">
          {!isScanning ? (
            <button
              type="button"
              onClick={handleStartScan}
              disabled={!bothHandsDone}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-blue-900/20 transition-colors enabled:hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
            >
              Scan Fingerprint Form
            </button>
          ) : (
            <button
              type="button"
              onClick={onContinue}
              disabled={!scanDone}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-emerald-900/20 transition-colors enabled:hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
            >
              Submit
            </button>
          )}

          <div className="mt-3 flex items-center justify-between">
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
              onClick={onSkip}
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
            >
              Skip for now
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
