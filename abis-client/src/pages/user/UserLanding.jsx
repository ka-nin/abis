import {
  FingerprintMark,
  ShieldCheckIcon,
  LockIcon,
  BadgeCheckIcon,
  ArrowRightIcon,
  HelpCircleIcon,
  CheckCircleIcon,
} from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'

function TrustItem({ icon, label }) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-slate-500">
      {icon}
      <span>{label}</span>
    </div>
  )
}

function ScanIllustration() {
  return (
    <div className="relative mx-auto flex h-[420px] w-[420px] max-w-full items-center justify-center sm:h-[480px] sm:w-[480px]">
      {/* soft radial backdrop */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 via-blue-50/60 to-transparent" />

      {/* concentric rings */}
      <div className="absolute h-[92%] w-[92%] rounded-full border border-blue-100" />
      <div className="absolute h-[70%] w-[70%] rounded-full border border-blue-200/70" />
      <div className="absolute h-[48%] w-[48%] rounded-full border border-blue-200" />

      {/* decorative dots on rings */}
      <span className="absolute left-[10%] top-[38%] h-2 w-2 rounded-full bg-blue-300" />
      <span className="absolute left-[6%] top-[47%] h-1.5 w-1.5 rounded-full bg-blue-200" />
      <span className="absolute right-[6%] top-[52%] h-2 w-2 rounded-full bg-blue-300" />

      {/* center card with fingerprint */}
      <div className="relative flex h-[46%] w-[46%] items-center justify-center rounded-full bg-white shadow-xl shadow-blue-900/5">
        <FingerprintMark className="h-[500px] w-[500px] text-blue-700 translate-y-[-30px]" />
      </div>

      {/* Verified card */}
      <div className="absolute -top-2 right-2 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg shadow-slate-900/10 sm:right-4">
        <CheckCircleIcon className="h-8 w-8 shrink-0 text-emerald-500" />
        <div className="text-left">
          <p className="text-sm font-semibold text-slate-900">Verified</p>
          <p className="text-xs text-slate-400">849,120 voters</p>
        </div>
        <div className="ml-2 flex flex-col items-end gap-1">
          <span className="text-xs font-semibold text-emerald-500">92%</span>
          <span className="h-1.5 w-12 overflow-hidden rounded-full bg-slate-100">
            <span className="block h-full w-[92%] rounded-full bg-emerald-500" />
          </span>
        </div>
      </div>

      {/* Match rate card */}
      <div className="absolute bottom-10 -left-2 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg shadow-slate-900/10 sm:-left-6">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-700">
          <FingerprintMark className="h-5 w-5 text-white" />
        </span>
        <div className="text-left">
          <p className="text-sm font-semibold text-slate-900">99.7% Match Rate</p>
          <p className="text-xs text-slate-400">Biometric accuracy</p>
        </div>
      </div>

      {/* Enrollment active pill */}
      <div className="absolute -bottom-2 right-0 flex items-center gap-2 rounded-full border border-slate-100 bg-white px-4 py-2 shadow-md shadow-slate-900/5 sm:right-2">
        <span className="h-2 w-2 rounded-full bg-blue-500" />
        <span className="text-xs font-medium text-slate-600">Enrollment Active</span>
      </div>
    </div>
  )
}

export default function UserLanding({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <BrandLockup />

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-full border border-blue-200 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
            >
              EN / Language
            </button>
            <button
              type="button"
              aria-label="Help"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:bg-slate-50"
            >
              <HelpCircleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:gap-8">
        <div className="text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <ShieldCheckIcon className="h-4 w-4" />
            Automated Biometrics Identification System
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">
            Secure Voter
            <br />
            <span className="text-blue-600">Registration</span>
            <br />
            Portal
          </h1>

          <p className="mt-6 text-lg text-slate-500">
            One Identity. One Vote. A Secure Future
          </p>

          <button
            type="button"
            onClick={onStart}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition-transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/30"
          >
            Start Voter Registration
            <ArrowRightIcon className="h-5 w-5" />
          </button>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <TrustItem
              icon={<ShieldCheckIcon className="h-4 w-4 text-blue-600" />}
              label="Encrypted & Secure"
            />
            <TrustItem
              icon={<LockIcon className="h-4 w-4 text-blue-600" />}
              label="Privacy Protected"
            />
            <TrustItem
              icon={<BadgeCheckIcon className="h-4 w-4 text-blue-600" />}
              label="DICT Compliant"
            />
          </div>
        </div>

        <ScanIllustration />
      </main>
    </div>
  )
}