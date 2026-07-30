import {
  FingerprintMark,
  ArrowRightIcon,
  ArrowLeftIcon,
  InfoCircleIcon,
  ClockIcon,
  CameraIcon,
  IdCardIcon,
  ShieldIcon,
} from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'

const REQUIREMENTS = [
  {
    icon: IdCardIcon,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    title: 'Valid Government ID',
    description: "Passport, National ID, Driver's License, or any COMELEC-accepted ID",
  },
  {
    icon: ClockIcon,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Estimated Time',
    description: 'The entire process takes approximately 10–15 minutes to complete',
  },
  {
    icon: CameraIcon,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    title: 'Camera Access',
    description: 'You will need to allow camera access for facial recognition enrollment',
  },
  {
    icon: FingerprintMark,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    title: 'Fingerprint Scanner',
    description: 'A fingerprint scanner device must be connected or available at the registration center',
  },
]

export default function Intro({ onBack, onVerify }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <BrandLockup />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
          <InfoCircleIcon className="h-4 w-4" />
          Requirements
        </span>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900">
          Before You Begin
        </h1>
        <p className="mt-3 text-base text-slate-500">
          Please prepare the following before starting your voter registration.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {REQUIREMENTS.map(({ icon: Icon, iconBg, iconColor, title, description }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
              >
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </span>
              <div className="text-left">
                <p className="text-base font-semibold text-slate-900">{title}</p>
                <p className="mt-0.5 text-sm text-slate-500">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
          <div className="text-left">
            <p className="text-base font-semibold text-blue-700">Privacy Notice</p>
            <p className="mt-1 text-sm text-blue-700/80">
              Your biometric data is collected under RA 10367 and will be encrypted and
              stored securely in the NEC database. It will not be shared with third parties
              without legal authority.
            </p>
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
            onClick={onVerify}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors hover:bg-blue-800"
          >
            Proceed
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  )
}