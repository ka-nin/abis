import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FileTextIcon,
  UserIcon,
  CameraIcon,
  FingerprintMark,
  EyeIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
} from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'
import RegistrationStepper from '../../components/RegistrationStepper'

const BIOMETRIC_STATUS = [
  { key: 'face', label: 'Facial Capture', icon: CameraIcon, status: 'Captured' },
  { key: 'fingerprint', label: 'Fingerprints', icon: FingerprintMark, status: '10/10 Done' },
  { key: 'iris', label: 'Iris Scan', icon: EyeIcon, status: '2/2 Done' },
  { key: 'gov', label: 'Gov. Records', icon: FileTextIcon, status: 'Matched' },
  { key: 'otp', label: 'OTP Verified', icon: ShieldCheckIcon, status: 'Done' },
]

const PERSONAL_INFO = [
  { label: 'Full Name', value: 'Maria C. Santos' },
  { label: 'Date of Birth', value: 'June 12, 1990' },
  { label: 'Gender', value: 'Female' },
  { label: 'Civil Status', value: 'Single' },
  { label: 'Nationality', value: 'Filipino' },
  { label: 'Address', value: 'Quezon City, NCR' },
  { label: 'Mobile', value: '+63 9XX XXX XX89' },
  { label: 'Gov ID', value: 'PhilSys National ID' },
]

const PREVIOUS_RECORD_INFO = [
  { label: 'Previous Precinct No.', value: '0045A' },
  { label: 'Previous Barangay', value: 'Barangay San Isidro' },
  { label: 'Previous City/Municipality', value: 'Manila' },
  { label: 'Reason for Transfer', value: 'Change of residence' },
]

const REACTIVATION_INFO = [
  { label: 'Precinct No.', value: '0045A' },
  { label: 'Date of Deactivation', value: 'Mar 3, 2023' },
  { label: 'Ground for Deactivation', value: 'Failure to vote in two (2) successive elections' },
]

const CORRECTION_INFO = [
  { label: 'Entry to Correct', value: 'Civil Status' },
  { label: 'Current Entry', value: 'Single' },
  { label: 'Corrected Entry', value: 'Married' },
  { label: 'Reason', value: 'Marriage' },
]

const GUARDIAN_INFO = [
  { label: 'Guardian Name', value: 'Juana D. Santos' },
  { label: 'Relationship', value: 'Mother' },
  { label: 'Contact Number', value: '09XX XXX XXXX' },
]

const OVERSEAS_INFO = [
  { label: 'Country of Residence', value: 'United Arab Emirates' },
  { label: 'Post', value: 'Philippine Embassy, Abu Dhabi' },
  { label: 'Passport Number', value: 'P1234567A' },
  { label: 'Existing Precinct No.', value: '0045A' },
]

function InfoBlock({ title, fields }) {
  return (
    <div className="mx-auto mt-4 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 text-left">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</p>
      <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs text-slate-400">{field.label}</p>
              <p className="mt-0.5 truncate text-sm font-semibold text-slate-900">{field.value}</p>
            </div>
            <CheckCircleIcon className="h-4 w-4 flex-shrink-0 text-emerald-500" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Step9({ types: rawTypes, onBack, onContinue }) {
  const types = rawTypes && rawTypes.length ? rawTypes : ['new']
  const has = (key) => types.includes(key)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <BrandLockup />

          <RegistrationStepper currentStep={9} />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <FileTextIcon className="h-4 w-4" />
            Step 9 of 12
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Verification Summary
          </h1>
          <p className="mt-3 text-base text-slate-500">Review your information before final submission.</p>
        </div>

        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-[minmax(0,260px)_1fr]">
          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-blue-500">
              <UserIcon className="h-10 w-10" />
            </span>
            <p className="mt-3 text-base font-bold text-slate-900">Maria C. Santos</p>
            <p className="text-xs text-slate-400">Face captured</p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
              <CheckCircleIcon className="h-3.5 w-3.5" />
              Verified
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Biometric Status</p>
            <ul className="mt-3 divide-y divide-slate-100">
              {BIOMETRIC_STATUS.map(({ key, label, icon: Icon, status }) => (
                <li key={key} className="flex items-center justify-between py-2.5">
                  <span className="flex items-center gap-2 text-sm text-slate-600">
                    <Icon className="h-4 w-4 shrink-0 text-slate-400" />
                    {label}
                  </span>
                  <span className="flex-shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                    {status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <InfoBlock title="Personal Information" fields={PERSONAL_INFO} />
        {has('transfer') && <InfoBlock title="Previous Registration Record" fields={PREVIOUS_RECORD_INFO} />}
        {has('reactivation') && <InfoBlock title="Reactivation Details" fields={REACTIVATION_INFO} />}
        {has('correction') && <InfoBlock title="Correction Details" fields={CORRECTION_INFO} />}
        {has('sk') && <InfoBlock title="Parent / Guardian Information" fields={GUARDIAN_INFO} />}
        {has('overseas') && <InfoBlock title="Overseas Voter Details" fields={OVERSEAS_INFO} />}

        <div className="mx-auto mt-4 flex max-w-2xl items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-left">
          <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            By submitting, you confirm that all information provided is true and correct. Providing false
            information is punishable under election laws.
          </p>
        </div>

        <div className="mx-auto mt-6 flex max-w-2xl items-center justify-between">
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
            Submit for Matching
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  )
}
