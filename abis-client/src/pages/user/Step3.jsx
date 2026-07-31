import { useRef, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, IdCardIcon, UploadIcon, CameraIcon } from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'
import RegistrationStepper from '../../components/RegistrationStepper'

const ID_OPTIONS = [
  { title: 'Postal ID', description: 'PhilPost-issued' },
  { title: 'PWD Discount ID', description: 'Persons with Disability' },
  { title: "Student's ID / Library Card", description: 'School or library-issued' },
  { title: "Senior Citizen's ID", description: 'OSCA-issued' },
  { title: "Driver's License", description: 'LTO-issued' },
  { title: 'NBI Clearance', description: 'National Bureau of Investigation' },
  { title: 'Philippine Passport', description: 'DFA-issued' },
  { title: 'IBP ID', description: 'Integrated Bar of the Philippines' },
  { title: 'PRC License', description: 'Professional Regulation Commission' },
  { title: 'NCIP Certificate of Confirmation', description: 'National Commission on Indigenous Peoples' },
  { title: 'SSS / GSIS ID or other UMID Card', description: 'Social security or government service' },
  { title: 'National ID Card under PhilSys', description: 'PSA-issued national identity card' },
  { title: 'Any Other Government-Issued Valid ID', description: 'Other valid government ID' },
]

function CheckMark({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IdOption({ title, description, checked, onSelect }) {
  return (
    <label
      className={`flex cursor-pointer items-center justify-between gap-4 px-6 py-4 ${
        checked ? 'bg-blue-50' : 'hover:bg-slate-50'
      }`}
    >
      <div className="flex items-center gap-4">
        <input
          type="radio"
          name="govId"
          checked={checked}
          onChange={onSelect}
          className="h-5 w-5 flex-shrink-0 accent-blue-600"
        />
        <div className="text-left">
          <p className={`text-base font-semibold ${checked ? 'text-blue-700' : 'text-slate-900'}`}>
            {title}
          </p>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
      </div>
      {checked && <CheckMark className="h-5 w-5 flex-shrink-0 text-blue-600" />}
    </label>
  )
}

function MethodOption({ icon: Icon, title, description, checked, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex items-start gap-4 rounded-2xl border p-5 text-left transition-colors ${
        checked ? 'border-blue-400 bg-blue-50' : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50'
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          checked ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className={`text-base font-semibold ${checked ? 'text-blue-700' : 'text-slate-900'}`}>{title}</p>
        <p className="mt-0.5 text-sm text-slate-500">{description}</p>
      </div>
      {checked && <CheckMark className="h-5 w-5 shrink-0 text-blue-600" />}
    </button>
  )
}

export default function Step3({ onBack, onContinue }) {
  const [selected, setSelected] = useState(null)
  const [method, setMethod] = useState(null)
  const [uploadedFileName, setUploadedFileName] = useState('')
  const fileInputRef = useRef(null)

  const handleBrowse = () => fileInputRef.current?.click()

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    setUploadedFileName(file ? file.name : '')
  }

  const isReady = Boolean(selected) && Boolean(method) && (method !== 'upload' || Boolean(uploadedFileName))

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <BrandLockup />

          <RegistrationStepper currentStep={3} />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <IdCardIcon className="h-4 w-4" />
            Step 3 of 12
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Government ID Verification
          </h1>
          <p className="mt-3 text-base text-slate-500">
            Select your primary government-issued ID for identity verification.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="divide-y divide-slate-100">
            {ID_OPTIONS.map((option) => (
              <IdOption
                key={option.title}
                title={option.title}
                description={option.description}
                checked={selected === option.title}
                onSelect={() => setSelected(option.title)}
              />
            ))}
          </div>
        </div>

        {selected && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm text-blue-700">
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
            {selected} selected.
          </div>
        )}

        {selected && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-base font-bold text-slate-900">How would you like to provide your ID?</h2>
            <p className="mt-1 text-sm text-slate-500">Choose one option to continue.</p>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <MethodOption
                icon={UploadIcon}
                title="Upload ID"
                description="Upload a clear photo or scanned copy (PNG, JPG, or PDF)"
                checked={method === 'upload'}
                onSelect={() => setMethod('upload')}
              />
              <MethodOption
                icon={CameraIcon}
                title="Scan ID"
                description="Use a connected camera or scanner to capture your physical ID"
                checked={method === 'scan'}
                onSelect={() => setMethod('scan')}
              />
            </div>

            {method === 'upload' && (
              <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="truncate text-sm text-slate-600">
                  {uploadedFileName || 'No file selected'}
                </p>
                <button
                  type="button"
                  onClick={handleBrowse}
                  className="flex-shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  {uploadedFileName ? 'Change file' : 'Browse file'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf,image/png,image/jpeg,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}

            {method === 'scan' && (
              <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-14">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                  <CameraIcon className="h-6 w-6" />
                </span>
                <p className="mt-3 text-sm text-slate-400">Scan Preview</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-8">
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
            disabled={!isReady}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors enabled:hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:shadow-none"
          >
            Verify ID
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  )
}