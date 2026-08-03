import { CheckCircleIcon, DownloadIcon, ShieldCheckIcon } from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'
import RegistrationStepper from '../../components/RegistrationStepper'

const VRN = 'VRN-2026-089235'

const TYPE_CONTENT = {
  new: {
    title: 'Registration Successful!',
    description:
      'Your voter registration has been completed. Your biometrics have been enrolled in the national database.',
    numberLabel: 'Voter Registration Number',
  },
  transfer: {
    title: 'Transfer Complete!',
    description: 'Your voter registration record has been transferred to your new address.',
    numberLabel: 'Voter Registration Number',
  },
  reactivation: {
    title: 'Reactivation Successful!',
    description: 'Your voter registration record has been reactivated and is now active.',
    numberLabel: 'Voter Registration Number',
  },
  correction: {
    title: 'Correction Submitted!',
    description:
      'Your requested corrections have been submitted and will be reflected in your registration record.',
    numberLabel: 'Correction Reference Number',
  },
  sk: {
    title: 'SK Registration Successful!',
    description:
      'Your Sangguniang Kabataan registration has been completed and enrolled in the national database.',
    numberLabel: 'SK Voter Registration Number',
  },
  overseas: {
    title: 'Overseas Voter Certification Issued!',
    description: 'Your certification as an overseas voter has been issued for the next National Elections.',
    numberLabel: 'Overseas Voter Certification Number',
  },
}

const DEFAULT_CONTENT = {
  title: 'Application Submitted Successfully!',
  description: 'Your combined application has been processed and enrolled in the national database.',
  numberLabel: 'Reference Number',
}

const REGISTRATION_FIELDS = [
  { label: 'Name', value: 'Maria C. Santos' },
  { label: 'Date Registered', value: 'Jul 26, 2026' },
  { label: 'Precinct', value: 'QC-0089-A' },
  { label: 'District', value: '1st District, QC' },
]

function QrCodeIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14" y="14" width="3" height="3" fill="currentColor" />
      <rect x="18" y="14" width="3" height="3" fill="currentColor" />
      <rect x="14" y="18" width="3" height="3" fill="currentColor" />
      <rect x="18" y="18" width="3" height="3" fill="currentColor" />
    </svg>
  )
}

function MailIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 7l7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HomeIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 11.5L12 4l8 7.5V19a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-7.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Step12({ types: rawTypes, onDownloadReceipt, onEmailReceipt, onReturnHome }) {
  const types = rawTypes && rawTypes.length ? rawTypes : ['new']
  const content = types.length === 1 ? (TYPE_CONTENT[types[0]] ?? DEFAULT_CONTENT) : DEFAULT_CONTENT

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <BrandLockup />

          <RegistrationStepper currentStep={13} />
        </div>
      </header>

      <main className="mx-auto flex max-w-xl flex-col items-center px-6 py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
          <CheckCircleIcon className="h-9 w-9" />
        </span>

        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
          <ShieldCheckIcon className="h-4 w-4" />
          Step 12 of 12
        </span>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">{content.title}</h1>
        <p className="mt-3 text-base text-slate-500">{content.description}</p>

        <div className="mt-8 w-full rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{content.numberLabel}</p>
          <p className="mt-1 text-2xl font-extrabold text-blue-700">{VRN}</p>

          <div className="mx-auto mt-4 flex h-32 w-32 flex-col items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50">
            <QrCodeIcon className="h-10 w-10 text-slate-300" />
            <p className="text-[10px] text-slate-400">Scan QR Code</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 text-left">
            {REGISTRATION_FIELDS.map((field) => (
              <div key={field.label}>
                <p className="text-xs text-slate-400">{field.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-900">{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid w-full grid-cols-2 gap-4">
          <button
            type="button"
            onClick={onDownloadReceipt}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <DownloadIcon className="h-4 w-4" />
            Receipt
          </button>
          <button
            type="button"
            onClick={onEmailReceipt}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <MailIcon className="h-4 w-4" />
            Email
          </button>
        </div>

        <div className="mt-4 w-full rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3.5">
          <p className="text-sm text-emerald-700">
            A confirmation SMS has been sent to your registered mobile number. Please keep your VRN for your
            records.
          </p>
        </div>

        <button
          type="button"
          onClick={onReturnHome}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
        >
          <HomeIcon className="h-4 w-4" />
          Return to Home
        </button>
      </main>
    </div>
  )
}
