import { useState } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FileTextIcon,
  UserIcon,
  MapPinIcon,
  ShieldIcon,
  IdCardIcon,
} from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'
import RegistrationStepper from '../../components/RegistrationStepper'

const APPLICATION_TYPES = [
  'New Registration',
  'Transfer with Reactivation',
  'Change of Entry in Registration Record',
  'Transfer of Registration Records',
  'Reactivation of Registration',
  'Senior Citizen (60 years old & above)',
]

const SPECIAL_CATEGORIES = [
  'Person with Disability (PWD)',
  'Illiterate / Assisted Voter',
  'Member of the LGBTQIA+ Community',
  'Senior Citizen (60 years old & above)',
  'Indigenous Cultural Community / Indigenous People (ICC/IP)',
  'Solo Parent',
]

function Section({ roman, icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-blue-200 bg-white p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
          {roman}
        </span>
        <Icon className="h-4 w-4 shrink-0 text-blue-600" />
        <h2 className="text-base font-bold tracking-wide text-slate-900">{title}</h2>
        <span className="ml-2 h-px flex-1 bg-slate-200" />
      </div>
      <div className="mt-6">{children}</div>
    </div>
  )
}

function SubHeading({ children }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
      {children}
    </p>
  )
}

function Field({ label, required, children, className = '' }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'

function TextInput(props) {
  return <input {...props} className={inputClass} />
}

function Select({ children, ...props }) {
  return (
    <select {...props} className={inputClass}>
      {children}
    </select>
  )
}

function RadioOption({ name, value, checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-blue-600"
      />
      {label}
    </label>
  )
}

function CheckboxOption({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded accent-blue-600"
      />
      {label}
    </label>
  )
}

const todayLabel = new Date().toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

export default function Step1({ onBack, onContinue }) {
  const [applicationType, setApplicationType] = useState('New Registration')
  const [specialCategories, setSpecialCategories] = useState([])

  const toggleCategory = (category) => {
    setSpecialCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

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
            Application for Voter Registration
          </h1>
        </div>

        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-left text-sm text-amber-900">
          <span className="font-bold">IMPORTANT:</span> Fill out this form in print using
          CAPITAL LETTERS. All entries must match your supporting document exactly.
          Erasures and alterations are not allowed.
        </div>

        <div className="my-8 h-0.5 rounded-full bg-blue-600" />

        <div className="flex flex-col gap-6">
          <Section roman="I" icon={FileTextIcon} title="TYPE OF APPLICATION">
            <div className="grid grid-cols-1 gap-x-10 gap-y-4 text-left sm:grid-cols-2">
              {APPLICATION_TYPES.map((type) => (
                <RadioOption
                  key={type}
                  name="applicationType"
                  value={type}
                  checked={applicationType === type}
                  onChange={() => setApplicationType(type)}
                  label={type}
                />
              ))}
            </div>
          </Section>

          <Section roman="II" icon={UserIcon} title="PERSONAL INFORMATION">
            <div className="flex flex-col gap-6 text-left">
              <div>
                <SubHeading>Name</SubHeading>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr_1fr_100px]">
                  <Field label="Last Name (Apelyido)" required>
                    <TextInput placeholder="DELA CRUZ" />
                  </Field>
                  <Field label="First Name (Pangalan)" required>
                    <TextInput placeholder="MARIA" />
                  </Field>
                  <Field label="Middle Name (Gitnang Pangalan)">
                    <TextInput placeholder="SANTOS" />
                  </Field>
                  <Field label="Suffix">
                    <TextInput placeholder="" />
                  </Field>
                </div>
              </div>

              <div>
                <SubHeading>Date and Place of Birth</SubHeading>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Field label="Date of Birth" required>
                    <TextInput type="date" />
                  </Field>
                  <Field label="Sex" required>
                    <Select defaultValue="">
                      <option value="" disabled>
                        Select
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                    </Select>
                  </Field>
                  <Field label="Civil Status" required>
                    <Select defaultValue="">
                      <option value="" disabled>
                        Select
                      </option>
                      <option>Single</option>
                      <option>Married</option>
                      <option>Widowed</option>
                      <option>Separated</option>
                      <option>Divorced</option>
                    </Select>
                  </Field>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Field label="City/Municipality of Birth" required>
                    <TextInput placeholder="Quezon City" />
                  </Field>
                  <Field label="Province of Birth">
                    <TextInput placeholder="" />
                  </Field>
                  <Field label="Country of Birth" required>
                    <TextInput defaultValue="Philippines" />
                  </Field>
                </div>
              </div>

              <div>
                <SubHeading>Citizenship &amp; Occupation</SubHeading>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Field label="Citizenship" required>
                    <TextInput placeholder="Filipino" />
                  </Field>
                  <Field label="Profession / Occupation">
                    <TextInput placeholder="e.g. Teacher, Engineer" />
                  </Field>
                  <Field label="TIN / SSS No. (optional)">
                    <TextInput placeholder="XXX-XXX-XXX" />
                  </Field>
                </div>
              </div>

              <div>
                <SubHeading>Contact Information</SubHeading>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Mobile Number" required>
                    <TextInput placeholder="09XX XXX XXXX" />
                  </Field>
                  <Field label="Email Address (optional)">
                    <TextInput type="email" placeholder="yourname@email.com" />
                  </Field>
                </div>
              </div>
            </div>
          </Section>

          <Section roman="III" icon={MapPinIcon} title="DECLARATION OF ADDRESS">
            <div className="flex flex-col gap-4 text-left">
              <p className="text-sm text-slate-500">
                This must be the address of your <strong>place of residence</strong> in the
                barangay where you wish to be registered.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[140px_1fr]">
                <Field label="House / Lot / Unit No.">
                  <TextInput placeholder="123" />
                </Field>
                <Field label="Street Name / Purok / Sitio" required>
                  <TextInput placeholder="Sampaguita Street, Barangay Sta. Mesa" />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Barangay" required>
                  <TextInput placeholder="Barangay 1" />
                </Field>
                <Field label="City / Municipality" required>
                  <TextInput placeholder="Quezon City" />
                </Field>
                <Field label="ZIP Code">
                  <TextInput placeholder="1100" />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Province">
                  <TextInput placeholder="" />
                </Field>
                <Field label="Years in Current Address">
                  <TextInput placeholder="e.g. 5" />
                </Field>
                <Field label="Years in Philippines (if born abroad)">
                  <TextInput placeholder="e.g. 10" />
                </Field>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3.5 text-sm text-blue-700">
                <FileTextIcon className="mt-0.5 h-4 w-4 shrink-0" />
                You must have been a resident of the barangay, city, or municipality for at
                least six (6) months immediately preceding the day of the election.
              </div>
            </div>
          </Section>

          <Section roman="IV" icon={ShieldIcon} title="SPECIAL CATEGORIES">
            <div className="text-left">
              <p className="mb-4 text-sm text-slate-500">
                Check all that apply. This information will be used to identify your special
                needs during elections.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {SPECIAL_CATEGORIES.map((category) => (
                  <CheckboxOption
                    key={category}
                    checked={specialCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    label={category}
                  />
                ))}
              </div>
            </div>
          </Section>

          <Section roman="V" icon={IdCardIcon} title="SUPPORTING DOCUMENT PRESENTED">
            <div className="flex flex-col gap-4 text-left">
              <p className="text-sm text-slate-500">
                Provide details of the government-issued ID presented to the Election
                Officer.
              </p>

              <Field label="Type of ID / Supporting Document" required>
                <Select defaultValue="">
                  <option value="" disabled>
                    Select ID type
                  </option>
                  <option>Philippine Passport</option>
                  <option>National ID (PhilSys)</option>
                  <option>Driver's License</option>
                  <option>UMID</option>
                  <option>PRC ID</option>
                  <option>Postal ID</option>
                  <option>SSS ID</option>
                  <option>GSIS ID</option>
                  <option>Senior Citizen ID</option>
                  <option>PWD ID</option>
                  <option>Other COMELEC-accepted ID</option>
                </Select>
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="ID / Document Number" required>
                  <TextInput placeholder="e.g. A01234567" />
                </Field>
                <Field label="Date Issued">
                  <TextInput type="date" />
                </Field>
                <Field label="Expiry Date">
                  <TextInput type="date" />
                </Field>
              </div>

              <Field label="Issuing Authority / Office">
                <TextInput placeholder="e.g. Department of Foreign Affairs (DFA)" />
              </Field>
            </div>
          </Section>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-left text-sm font-bold tracking-wide text-slate-900">
              APPLICANT&apos;S DECLARATION
            </h2>
            <p className="mt-4 text-left text-sm leading-relaxed text-slate-600">
              I, the undersigned, do hereby affirm that I am a citizen of the Philippines,
              not otherwise disqualified by law, and I have the qualifications required by
              the Constitution and by existing laws for the exercise of the right of
              suffrage. I declare that the entries made above are true, correct and complete
              to the best of my knowledge. I fully understand that any false statement herein
              constitutes a ground for election offense under Section 12 of RA 8189 and other
              applicable laws.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-[1fr_260px]">
              <div>
                <input
                  type="text"
                  placeholder="Signature above printed name"
                  className="w-full border-b border-slate-300 bg-transparent pb-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex items-baseline justify-between gap-3 border-b border-slate-300 pb-2">
                <span className="text-sm text-slate-500">Date</span>
                <span className="font-mono text-sm text-slate-900">{todayLabel}</span>
              </div>
            </div>
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