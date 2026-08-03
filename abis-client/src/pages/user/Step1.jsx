import { useState } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FileTextIcon,
  UserIcon,
  MapPinIcon,
  ShieldIcon,
  IdCardIcon,
  SwapIcon,
  RefreshIcon,
  UsersIcon,
} from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'
import RegistrationStepper from '../../components/RegistrationStepper'

const TYPE_LABELS = {
  new: 'New Voter Registration',
  transfer: 'Transfer of Registration',
  reactivation: 'Reactivation of Registration',
  correction: 'Correction of Entries',
  sk: 'Sangguniang Kabataan Registration',
  overseas: 'Certification as Overseas Voter',
}

const SPECIAL_CATEGORIES = [
  'Person with Disability (PWD)',
  'Illiterate / Assisted Voter',
  'Member of the LGBTQIA+ Community',
  'Senior Citizen (60 years old & above)',
  'Indigenous Cultural Community / Indigenous People (ICC/IP)',
  'Solo Parent',
]

const CORRECTABLE_FIELDS = ['Name', 'Date of Birth', 'Civil Status', 'Address', 'Precinct Assignment', 'Other']

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

function GlobeIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 3c2.5 2.5 3.8 5.8 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.8-3.8-9S9.5 5.5 12 3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

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

function Textarea(props) {
  return <textarea {...props} className={inputClass} />
}

function Select({ children, ...props }) {
  return (
    <select {...props} className={inputClass}>
      {children}
    </select>
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

export default function Step1({ types: rawTypes, onBack, onContinue }) {
  const types = rawTypes && rawTypes.length ? rawTypes : ['new']
  const has = (key) => types.includes(key)
  const isTransfer = has('transfer')
  const isReactivation = has('reactivation')
  const isCorrection = has('correction')
  const isSK = has('sk')
  const isOverseas = has('overseas')

  const [specialCategories, setSpecialCategories] = useState([])
  const [correctFields, setCorrectFields] = useState([])

  const toggleCategory = (category) => {
    setSpecialCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleCorrectField = (field) => {
    setCorrectFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field],
    )
  }

  const heading =
    types.length > 1
      ? `Combined Application: ${types.map((t) => TYPE_LABELS[t] ?? t).join(' + ')}`
      : `Application for ${TYPE_LABELS[types[0]] ?? 'Voter Registration'}`

  const showAddress = !isCorrection && !isOverseas
  const addressTitle = isTransfer ? 'NEW ADDRESS (TRANSFERRING TO)' : 'DECLARATION OF ADDRESS'

  const sections = [
    'personal',
    isTransfer && 'previousRecord',
    isReactivation && 'reactivation',
    isCorrection && 'correction',
    isSK && 'guardian',
    isOverseas && 'overseas',
    showAddress && 'address',
    'specialCategories',
    'supportingDocument',
  ].filter(Boolean)
  const romanOf = (key) => ROMAN[sections.indexOf(key)] ?? ''

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
            {heading}
          </h1>
        </div>

        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-left text-sm text-amber-900">
          <span className="font-bold">IMPORTANT:</span> Fill out this form in print using
          CAPITAL LETTERS. All entries must match your supporting document exactly.
          Erasures and alterations are not allowed.
        </div>

        <div className="my-8 h-0.5 rounded-full bg-blue-600" />

        <div className="flex flex-col gap-6">
          <Section roman={romanOf('personal')} icon={UserIcon} title="PERSONAL INFORMATION">
            <div className="flex flex-col gap-6 text-left">
              {isCorrection && (
                <p className="text-sm text-slate-500">
                  Enter your information exactly as currently reflected in the COMELEC database.
                  Use the Correction Details section below to specify the entries to be corrected.
                </p>
              )}

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
                <div className={`grid grid-cols-1 gap-4 ${isSK ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
                  <Field label="Date of Birth" required>
                    <TextInput type="date" />
                    {isSK && (
                      <p className="mt-1 text-xs text-slate-400">Must be 15 to 17 years old on election day.</p>
                    )}
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
                  {!isSK && (
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
                  )}
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
                  <Field label={isSK ? 'Occupation / Grade Level' : 'Profession / Occupation'}>
                    <TextInput placeholder={isSK ? 'e.g. Student, Grade 10' : 'e.g. Teacher, Engineer'} />
                  </Field>
                  {!isSK && (
                    <Field label="TIN / SSS No. (optional)">
                      <TextInput placeholder="XXX-XXX-XXX" />
                    </Field>
                  )}
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

          {isTransfer && (
            <Section roman={romanOf('previousRecord')} icon={SwapIcon} title="PREVIOUS REGISTRATION RECORD">
              <div className="flex flex-col gap-4 text-left">
                <p className="text-sm text-slate-500">
                  Provide the details of your existing voter registration record before the transfer.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Field label="Previous Precinct No." required>
                    <TextInput placeholder="e.g. 0045A" />
                  </Field>
                  <Field label="Previous Barangay" required>
                    <TextInput placeholder="Barangay San Isidro" />
                  </Field>
                  <Field label="Previous City/Municipality" required>
                    <TextInput placeholder="Manila" />
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Previous Province">
                    <TextInput placeholder="" />
                  </Field>
                  <Field label="Reason for Transfer" required>
                    <Select defaultValue="">
                      <option value="" disabled>
                        Select reason
                      </option>
                      <option>Change of residence</option>
                      <option>Transfer of Post (overseas)</option>
                      <option>Other</option>
                    </Select>
                  </Field>
                </div>
              </div>
            </Section>
          )}

          {isReactivation && (
            <Section roman={romanOf('reactivation')} icon={RefreshIcon} title="REACTIVATION DETAILS">
              <div className="flex flex-col gap-4 text-left">
                <p className="text-sm text-slate-500">
                  Provide the details of your deactivated registration record.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Precinct No." required>
                    <TextInput placeholder="e.g. 0045A" />
                  </Field>
                  <Field label="Date of Deactivation">
                    <TextInput type="date" />
                  </Field>
                </div>
                <Field label="Ground for Deactivation" required>
                  <Select defaultValue="">
                    <option value="" disabled>
                      Select ground
                    </option>
                    <option>Sentenced by final judgment to imprisonment of not less than one (1) year</option>
                    <option>Convicted of a crime involving disloyalty to the government</option>
                    <option>Declared insane or incompetent</option>
                    <option>Failure to vote in two (2) successive preceding regular elections</option>
                    <option>Loss of Filipino citizenship</option>
                    <option>Exclusion by a court order</option>
                    <option>Failure to validate biometrics (R.A. 10367)</option>
                    <option>Other</option>
                  </Select>
                </Field>
                <Field label="Explanation / Supporting Details">
                  <Textarea rows={3} placeholder="Briefly explain the circumstances for your reactivation request" />
                </Field>
              </div>
            </Section>
          )}

          {isCorrection && (
            <Section roman={romanOf('correction')} icon={FileTextIcon} title="CORRECTION DETAILS">
              <div className="flex flex-col gap-4 text-left">
                <p className="text-sm text-slate-500">
                  Check the entries you wish to correct, then provide the current and corrected values.
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {CORRECTABLE_FIELDS.map((field) => (
                    <CheckboxOption
                      key={field}
                      checked={correctFields.includes(field)}
                      onChange={() => toggleCorrectField(field)}
                      label={field}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Current Entry (as on file)" required>
                    <TextInput placeholder="e.g. Maria Cruz Santos" />
                  </Field>
                  <Field label="Corrected Entry" required>
                    <TextInput placeholder="e.g. Maria Cruz Santos-Reyes" />
                  </Field>
                </div>
                <Field label="Reason for Correction" required>
                  <Select defaultValue="">
                    <option value="" disabled>
                      Select reason
                    </option>
                    <option>Marriage</option>
                    <option>Annulment / Court Order</option>
                    <option>Clerical or typographical error</option>
                    <option>Legal name change</option>
                    <option>Other</option>
                  </Select>
                </Field>
              </div>
            </Section>
          )}

          {isSK && (
            <Section roman={romanOf('guardian')} icon={UsersIcon} title="PARENT / GUARDIAN INFORMATION">
              <div className="flex flex-col gap-4 text-left">
                <p className="text-sm text-slate-500">
                  Required for applicants who are minors (15–17 years old) applying for Sangguniang Kabataan
                  registration.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Parent / Guardian Full Name" required>
                    <TextInput placeholder="Full name" />
                  </Field>
                  <Field label="Relationship to Applicant" required>
                    <TextInput placeholder="e.g. Mother, Father, Legal Guardian" />
                  </Field>
                </div>
                <Field label="Parent / Guardian Contact Number" required>
                  <TextInput placeholder="09XX XXX XXXX" />
                </Field>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 rounded accent-blue-600" />
                  I confirm that I am the parent/legal guardian of the applicant and consent to this Sangguniang
                  Kabataan registration.
                </label>
              </div>
            </Section>
          )}

          {isOverseas && (
            <Section roman={romanOf('overseas')} icon={GlobeIcon} title="OVERSEAS VOTER DETAILS">
              <div className="flex flex-col gap-4 text-left">
                <p className="text-sm text-slate-500">
                  Provide your current overseas residence and existing local registration record.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Country of Residence" required>
                    <TextInput placeholder="e.g. United Arab Emirates" />
                  </Field>
                  <Field label="Foreign Post / Embassy or Consulate Jurisdiction" required>
                    <TextInput placeholder="e.g. Philippine Embassy, Abu Dhabi" />
                  </Field>
                </div>
                <Field label="Foreign Address" required>
                  <TextInput placeholder="Complete address abroad" />
                </Field>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Field label="Passport Number" required>
                    <TextInput placeholder="e.g. P1234567A" />
                  </Field>
                  <Field label="Passport Expiry Date">
                    <TextInput type="date" />
                  </Field>
                  <Field label="Years Residing Abroad">
                    <TextInput placeholder="e.g. 3" />
                  </Field>
                </div>
                <Field label="Existing Local Precinct / Registration No." required>
                  <TextInput placeholder="e.g. 0045A" />
                </Field>
              </div>
            </Section>
          )}

          {showAddress && (
            <Section roman={romanOf('address')} icon={MapPinIcon} title={addressTitle}>
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
          )}

          <Section roman={romanOf('specialCategories')} icon={ShieldIcon} title="SPECIAL CATEGORIES">
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

          <Section roman={romanOf('supportingDocument')} icon={IdCardIcon} title="SUPPORTING DOCUMENT PRESENTED">
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