import { ArrowLeftIcon, ArrowRightIcon, FileTextIcon } from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'
import RegistrationStepper from '../../components/RegistrationStepper'

const FIELD_CONFIG = {
  Name: {
    description: 'Update your name as it should appear on your voter record.',
    inputs: [
      { key: 'current', label: 'Current Full Name (as on file)', placeholder: 'e.g. Maria Cruz Santos' },
      { key: 'corrected', label: 'Corrected Full Name', placeholder: 'e.g. Maria Cruz Santos-Reyes' },
    ],
  },
  'Date of Birth': {
    description: 'Update your date of birth as it should appear on your voter record.',
    inputs: [
      { key: 'current', label: 'Current Date of Birth (as on file)', type: 'date' },
      { key: 'corrected', label: 'Corrected Date of Birth', type: 'date' },
    ],
  },
  'Civil Status': {
    description: 'Update your civil status as it should appear on your voter record.',
    inputs: [
      { key: 'current', label: 'Current Civil Status (as on file)', type: 'select' },
      { key: 'corrected', label: 'Corrected Civil Status', type: 'select' },
    ],
  },
  Address: {
    description: 'Update your address as it should appear on your voter record.',
    inputs: [
      { key: 'current', label: 'Current Address (as on file)', placeholder: 'Complete current address' },
      { key: 'corrected', label: 'Corrected Address', placeholder: 'Complete corrected address' },
    ],
  },
  'Precinct Assignment': {
    description: 'Update your precinct assignment as it should appear on your voter record.',
    inputs: [
      { key: 'current', label: 'Current Precinct No. (as on file)', placeholder: 'e.g. 0045A' },
      { key: 'corrected', label: 'Corrected Precinct No.', placeholder: 'e.g. 0045B' },
    ],
  },
  Other: {
    description: 'Describe the entry to correct, then provide its current and corrected values.',
    inputs: [
      { key: 'description', label: 'Description of Entry', placeholder: 'e.g. Middle Name' },
      { key: 'current', label: 'Current Entry (as on file)', placeholder: 'Current value' },
      { key: 'corrected', label: 'Corrected Entry', placeholder: 'Corrected value' },
    ],
  },
}

const CIVIL_STATUS_OPTIONS = ['Single', 'Married', 'Widowed', 'Separated', 'Divorced']

const inputClass =
  'w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-slate-700">
        {label}
        <span className="ml-0.5 text-red-500">*</span>
      </label>
      {children}
    </div>
  )
}

function FieldInput({ input }) {
  if (input.type === 'select') {
    return (
      <select defaultValue="" className={inputClass}>
        <option value="" disabled>
          Select civil status
        </option>
        {CIVIL_STATUS_OPTIONS.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    )
  }
  return <input type={input.type || 'text'} placeholder={input.placeholder} className={inputClass} />
}

export default function CorrectionEdit({ fields = [], onBack, onContinue }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <BrandLockup />

          <RegistrationStepper currentStep={1} />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <FileTextIcon className="h-4 w-4" />
            Step 1 of 12
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Correction Entry Details
          </h1>
          <p className="mt-3 text-base text-slate-500">
            Provide the current and corrected values for each entry you selected.
          </p>
        </div>

        <div className="my-8 h-0.5 rounded-full bg-blue-600" />

        <div className="flex flex-col gap-6">
          {fields.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
              <p className="text-sm font-medium text-slate-500">
                No entries were selected for correction. Go back to select at least one entry.
              </p>
            </div>
          )}

          {fields.map((field) => {
            const config = FIELD_CONFIG[field]
            if (!config) return null
            return (
              <div key={field} className="rounded-2xl border border-blue-200 bg-white p-6 sm:p-8">
                <h2 className="text-base font-bold tracking-wide text-slate-900">{field}</h2>
                <p className="mt-1 text-sm text-slate-500">{config.description}</p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {config.inputs.map((input) => (
                    <Field key={input.key} label={input.label}>
                      <FieldInput input={input} />
                    </Field>
                  ))}
                </div>
              </div>
            )
          })}
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
            onClick={onContinue}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors hover:bg-blue-800"
          >
            Save &amp; Continue
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  )
}
