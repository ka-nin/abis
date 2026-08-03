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

const DEACTIVATION_GROUNDS = [
  'Sentenced by final judgment to suffer imprisonment for not less than one (1) year',
  'Convicted by final judgment of a crime involving disloyalty to the duly constituted government, etc.',
  'Declared by competent authority to be insane or incompetent',
  'Failed to vote in two (2) successive preceding regular elections',
  'Loss of Filipino citizenship',
  'Exclusion by a court order',
  'Failure to Validate',
]

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

function RadioOption({ name, checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-4 w-4 accent-blue-600"
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
  const [transferScope, setTransferScope] = useState('')
  const [formerRecordType, setFormerRecordType] = useState('')
  const [deactivationGround, setDeactivationGround] = useState('')
  const [citizenshipType, setCitizenshipType] = useState('')
  const [skCivilStatus, setSkCivilStatus] = useState('')
  const [isIndigenous, setIsIndigenous] = useState(false)
  const [isIlliterate, setIsIlliterate] = useState(false)
  const [isSeniorCitizen, setIsSeniorCitizen] = useState(false)
  const [isPWD, setIsPWD] = useState(false)
  const [disabilityType, setDisabilityType] = useState('')
  const [assistanceNeeded, setAssistanceNeeded] = useState('')
  const [appWilling, setAppWilling] = useState('')
  const [skPrecinctStatus, setSkPrecinctStatus] = useState('')
  const [skConsent, setSkConsent] = useState('')
  const [overseasApplicationFor, setOverseasApplicationFor] = useState('')
  const [statusAbroad, setStatusAbroad] = useState([])
  const [otherOverseasTransaction, setOtherOverseasTransaction] = useState('')
  const [recaptureReason, setRecaptureReason] = useState('')

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

  const toggleStatusAbroad = (status) => {
    setStatusAbroad((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status],
    )
  }

  const heading =
    types.length > 1
      ? `Combined Application: ${types.map((t) => TYPE_LABELS[t] ?? t).join(' + ')}`
      : `Application for ${TYPE_LABELS[types[0]] ?? 'Voter Registration'}`

  const showAddress = !isCorrection && !isOverseas && !isTransfer

  const sections = [
    isReactivation && 'reactivation',
    'personal',
    isTransfer && 'previousRecord',
    isCorrection && 'correction',
    isSK && 'guardian',
    isOverseas && 'overseas',
    showAddress && 'address',
    'specialCategories',
    !isOverseas && 'supportingDocument',
    isTransfer && 'transferRecord',
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
          {isReactivation && (
            <Section
              roman={romanOf('reactivation')}
              icon={RefreshIcon}
              title="APPLICATION FOR REACTIVATION OF REGISTRATION RECORD"
            >
              <div className="flex flex-col gap-4 text-left">
                <div>
                  <SubHeading>Reason for Deactivation</SubHeading>
                  <div className="flex flex-col gap-2.5">
                    {DEACTIVATION_GROUNDS.map((ground, index) => (
                      <RadioOption
                        key={ground}
                        name="deactivationGround"
                        checked={deactivationGround === ground}
                        onChange={() => setDeactivationGround(ground)}
                        label={`${index + 1}. ${ground}`}
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-xs italic text-slate-500">
                    That said ground no longer exists, as evidenced by the attached certification/order of the
                    court (in cases of 1, 2, 3, 5, and 6).
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Precinct No." required>
                    <TextInput placeholder="e.g. 0045A" />
                  </Field>
                  <Field label="Date of Deactivation">
                    <TextInput type="date" />
                  </Field>
                </div>
                <Field label="Explanation / Supporting Details">
                  <Textarea rows={3} placeholder="Briefly explain the circumstances for your reactivation request" />
                </Field>
              </div>
            </Section>
          )}

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

              {isSK && (
                <>
                  <div>
                    <SubHeading>Residence / Address</SubHeading>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <Field label="Province">
                        <TextInput placeholder="" />
                      </Field>
                      <Field label="City/District/Municipality" required>
                        <TextInput placeholder="Quezon City" />
                      </Field>
                      <Field label="Barangay" required>
                        <TextInput placeholder="Barangay 1" />
                      </Field>
                    </div>
                    <div className="mt-4">
                      <Field label="House No. / Street / Sitio / Purok">
                        <TextInput placeholder="123 Sampaguita Street" />
                      </Field>
                    </div>
                  </div>

                  <div>
                    <SubHeading>Citizenship Type</SubHeading>
                    <div className="flex flex-wrap gap-6">
                      <RadioOption
                        name="citizenshipType"
                        checked={citizenshipType === 'birth'}
                        onChange={() => setCitizenshipType('birth')}
                        label="By Birth"
                      />
                      <RadioOption
                        name="citizenshipType"
                        checked={citizenshipType === 'naturalized'}
                        onChange={() => setCitizenshipType('naturalized')}
                        label="Naturalized"
                      />
                      <RadioOption
                        name="citizenshipType"
                        checked={citizenshipType === 'reacquired'}
                        onChange={() => setCitizenshipType('reacquired')}
                        label="Reacquired"
                      />
                    </div>
                    {(citizenshipType === 'naturalized' || citizenshipType === 'reacquired') && (
                      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="Date of Naturalization / Reacquisition">
                          <TextInput type="date" />
                        </Field>
                        <Field label="Certificate No. / Order of Approval">
                          <TextInput placeholder="" />
                        </Field>
                      </div>
                    )}
                  </div>

                  <div>
                    <SubHeading>Civil Status</SubHeading>
                    <div className="flex flex-wrap gap-6">
                      <RadioOption
                        name="skCivilStatus"
                        checked={skCivilStatus === 'single'}
                        onChange={() => setSkCivilStatus('single')}
                        label="Single"
                      />
                      <RadioOption
                        name="skCivilStatus"
                        checked={skCivilStatus === 'married'}
                        onChange={() => setSkCivilStatus('married')}
                        label="Married"
                      />
                      <RadioOption
                        name="skCivilStatus"
                        checked={skCivilStatus === 'widow'}
                        onChange={() => setSkCivilStatus('widow')}
                        label="Widow/er"
                      />
                      <RadioOption
                        name="skCivilStatus"
                        checked={skCivilStatus === 'separated'}
                        onChange={() => setSkCivilStatus('separated')}
                        label="Legally Separated"
                      />
                    </div>
                    {skCivilStatus === 'married' && (
                      <div className="mt-3">
                        <Field label="Name of Spouse">
                          <TextInput placeholder="Full name of spouse" />
                        </Field>
                      </div>
                    )}
                  </div>

                  <div>
                    <SubHeading>Period of Residence</SubHeading>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <Field label="In the City/Municipality — Years">
                        <TextInput placeholder="e.g. 5" />
                      </Field>
                      <Field label="In the City/Municipality — Months">
                        <TextInput placeholder="e.g. 6" />
                      </Field>
                      <Field label="In the Philippines — Years">
                        <TextInput placeholder="e.g. 15" />
                      </Field>
                    </div>
                  </div>
                </>
              )}

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
                  <Field label="Father's Name">
                    <TextInput placeholder="Full name" />
                  </Field>
                  <Field label="Mother's Maiden Name">
                    <TextInput placeholder="Full maiden name" />
                  </Field>
                </div>
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
            <Section roman={romanOf('overseas')} icon={GlobeIcon} title="APPLICATION FOR CERTIFICATION / REGISTRATION AS OVERSEAS VOTER">
              <div className="flex flex-col gap-6 text-left">
                <div>
                  <SubHeading>Application For</SubHeading>
                  <div className="flex flex-wrap gap-6">
                    <RadioOption
                      name="overseasApplicationFor"
                      checked={overseasApplicationFor === 'certification'}
                      onChange={() => setOverseasApplicationFor('certification')}
                      label="Certification"
                    />
                    <RadioOption
                      name="overseasApplicationFor"
                      checked={overseasApplicationFor === 'registration'}
                      onChange={() => setOverseasApplicationFor('registration')}
                      label="Registration"
                    />
                  </div>
                </div>

                <div>
                  <SubHeading>Part I — Personal Information</SubHeading>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Gender (Specify)">
                      <TextInput placeholder="e.g. Non-binary" />
                    </Field>
                    <Field label="Name of Spouse (If Married)">
                      <TextInput placeholder="Full name of spouse" />
                    </Field>
                  </div>

                  <div className="mt-4">
                    <SubHeading>Status Abroad</SubHeading>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <CheckboxOption checked={statusAbroad.includes('OFW')} onChange={() => toggleStatusAbroad('OFW')} label="OFW" />
                      <CheckboxOption checked={statusAbroad.includes('Immigrant')} onChange={() => toggleStatusAbroad('Immigrant')} label="Immigrant" />
                      <CheckboxOption checked={statusAbroad.includes('Seafarer')} onChange={() => toggleStatusAbroad('Seafarer')} label="Seafarer" />
                      <CheckboxOption checked={statusAbroad.includes('Dual Citizen')} onChange={() => toggleStatusAbroad('Dual Citizen')} label="Dual Citizen" />
                      <CheckboxOption checked={statusAbroad.includes('Others')} onChange={() => toggleStatusAbroad('Others')} label="Others" />
                    </div>
                    {statusAbroad.includes('Others') && (
                      <div className="mt-3">
                        <Field label="Specify">
                          <TextInput placeholder="Specify status abroad" />
                        </Field>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <SubHeading>Residence in the Philippines Before Leaving Abroad</SubHeading>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="City/Municipality" required>
                        <TextInput placeholder="Quezon City" />
                      </Field>
                      <Field label="Province">
                        <TextInput placeholder="" />
                      </Field>
                    </div>
                  </div>

                  <div className="mt-4">
                    <SubHeading>Residence Abroad</SubHeading>
                    <Field label="Complete Mailing Address" required>
                      <TextInput placeholder="Complete address abroad" />
                    </Field>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <Field label="City/State">
                        <TextInput placeholder="" />
                      </Field>
                      <Field label="Postal Code">
                        <TextInput placeholder="" />
                      </Field>
                      <Field label="Country" required>
                        <TextInput placeholder="e.g. United Arab Emirates" />
                      </Field>
                    </div>
                  </div>

                  <div className="mt-4">
                    <SubHeading>Post and Country Where Applicant Intends to Vote</SubHeading>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Post" required>
                        <TextInput placeholder="e.g. Philippine Embassy, Abu Dhabi" />
                      </Field>
                      <Field label="Country" required>
                        <TextInput placeholder="e.g. United Arab Emirates" />
                      </Field>
                    </div>
                  </div>

                  <div className="mt-4">
                    <SubHeading>Passport/ID Information</SubHeading>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <Field label="Passport/ID No." required>
                        <TextInput placeholder="e.g. P1234567A" />
                      </Field>
                      <Field label="Issued On">
                        <TextInput type="date" />
                      </Field>
                      <Field label="Issued At">
                        <TextInput placeholder="e.g. DFA Manila" />
                      </Field>
                    </div>
                  </div>

                  <div className="mt-4">
                    <SubHeading>Contact Details</SubHeading>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Telephone No.">
                        <TextInput placeholder="" />
                      </Field>
                      <Field label="Mobile No.">
                        <TextInput placeholder="09XX XXX XXXX" />
                      </Field>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <Field label="Email Address">
                        <TextInput type="email" placeholder="yourname@email.com" />
                      </Field>
                      <Field label="Facebook Account">
                        <TextInput placeholder="" />
                      </Field>
                      <Field label="Other Social Media Accounts">
                        <TextInput placeholder="" />
                      </Field>
                    </div>
                  </div>

                  <Field label="Existing Local Precinct / Registration No." required className="mt-4">
                    <TextInput placeholder="e.g. 0045A" />
                  </Field>
                </div>

                <div>
                  <SubHeading>Part II — Authorized Representative in the Philippines</SubHeading>
                  <p className="mb-3 text-sm text-slate-500">Optional. Provide details of your authorized representative for this application.</p>
                  <Field label="Name">
                    <TextInput placeholder="Full name of representative" />
                  </Field>
                  <div className="mt-4">
                    <Field label="Address">
                      <TextInput placeholder="Complete address in the Philippines" />
                    </Field>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Field label="Landline No.">
                      <TextInput placeholder="" />
                    </Field>
                    <Field label="Mobile No.">
                      <TextInput placeholder="09XX XXX XXXX" />
                    </Field>
                    <Field label="E-mail Address">
                      <TextInput type="email" placeholder="" />
                    </Field>
                  </div>
                </div>

                <div>
                  <SubHeading>Other Overseas Voter Transactions</SubHeading>
                  <p className="mb-3 text-sm text-slate-500">
                    Select if this application also covers any of the following (optional).
                  </p>
                  <div className="flex flex-col gap-3">
                    <div>
                      <RadioOption
                        name="otherOverseasTransaction"
                        checked={otherOverseasTransaction === 'recapture'}
                        onChange={() => setOtherOverseasTransaction('recapture')}
                        label="Application for Recapture of Biometrics"
                      />
                      {otherOverseasTransaction === 'recapture' && (
                        <div className="mt-2 flex flex-wrap gap-6 pl-7">
                          <RadioOption
                            name="recaptureReason"
                            checked={recaptureReason === 'complete'}
                            onChange={() => setRecaptureReason('complete')}
                            label="To complete biometrics"
                          />
                          <RadioOption
                            name="recaptureReason"
                            checked={recaptureReason === 'changeName'}
                            onChange={() => setRecaptureReason('changeName')}
                            label="For Application for Change of Name/Correction of Entries"
                          />
                        </div>
                      )}
                    </div>

                    <RadioOption
                      name="otherOverseasTransaction"
                      checked={otherOverseasTransaction === 'reinstatement'}
                      onChange={() => setOtherOverseasTransaction('reinstatement')}
                      label="Application for Reinstatement of Name Inadvertently Omitted in the National Registry of Overseas Voters"
                    />

                    <div>
                      <RadioOption
                        name="otherOverseasTransaction"
                        checked={otherOverseasTransaction === 'changeName'}
                        onChange={() => setOtherOverseasTransaction('changeName')}
                        label="Application for Change of Name due to Marriage or Court Order/Correction of Entries"
                      />
                      {otherOverseasTransaction === 'changeName' && (
                        <div className="mt-3 grid grid-cols-1 gap-4 pl-7 sm:grid-cols-2">
                          <Field label="Present Data/Information">
                            <TextInput placeholder="" />
                          </Field>
                          <Field label="New/Corrected Data/Information">
                            <TextInput placeholder="" />
                          </Field>
                        </div>
                      )}
                    </div>

                    <div>
                      <RadioOption
                        name="otherOverseasTransaction"
                        checked={otherOverseasTransaction === 'withdraw'}
                        onChange={() => setOtherOverseasTransaction('withdraw')}
                        label="Request to Withdraw the Application for Registration/Certification Pending Approval"
                      />
                      {otherOverseasTransaction === 'withdraw' && (
                        <div className="mt-3 pl-7">
                          <Field label="Date and Place of Application as Overseas Voter">
                            <TextInput placeholder="" />
                          </Field>
                        </div>
                      )}
                    </div>

                    <div>
                      <RadioOption
                        name="otherOverseasTransaction"
                        checked={otherOverseasTransaction === 'changeAddress'}
                        onChange={() => setOtherOverseasTransaction('changeAddress')}
                        label="Application for Change of Address (within the same Post and Country)"
                      />
                      {otherOverseasTransaction === 'changeAddress' && (
                        <div className="mt-3 grid grid-cols-1 gap-4 pl-7 sm:grid-cols-2">
                          <Field label="Date and Place of Registration/Certification">
                            <TextInput placeholder="" />
                          </Field>
                          <Field label="New Address">
                            <TextInput placeholder="" />
                          </Field>
                        </div>
                      )}
                    </div>

                    <RadioOption
                      name="otherOverseasTransaction"
                      checked={otherOverseasTransaction === 'updatePhoto'}
                      onChange={() => setOtherOverseasTransaction('updatePhoto')}
                      label="Application for Updating of Photograph and/or Signature"
                    />
                  </div>
                </div>
              </div>
            </Section>
          )}

          {showAddress && (
            <Section roman={romanOf('address')} icon={MapPinIcon} title="DECLARATION OF ADDRESS">
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
            {isSK ? (
              <div className="flex flex-col gap-5 text-left">
                <p className="text-sm text-slate-500">
                  Check all that apply. This information will be used to identify your special
                  needs during elections.
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <CheckboxOption checked={isIndigenous} onChange={() => setIsIndigenous((v) => !v)} label="Indigenous People" />
                  <CheckboxOption checked={isIlliterate} onChange={() => setIsIlliterate((v) => !v)} label="Illiterate" />
                  <CheckboxOption checked={isSeniorCitizen} onChange={() => setIsSeniorCitizen((v) => !v)} label="Senior Citizen" />
                  <CheckboxOption checked={isPWD} onChange={() => setIsPWD((v) => !v)} label="Person with Disability" />
                </div>
                {isIndigenous && (
                  <Field label="Tribe">
                    <TextInput placeholder="Name of tribe" />
                  </Field>
                )}

                {isPWD && (
                  <div>
                    <SubHeading>Type of Disability</SubHeading>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {[
                        'Deaf / Hard of Hearing',
                        'Psychosocial',
                        'Intellectual',
                        'Speech and Language',
                        'Learning',
                        'Visual',
                        'Mental',
                        'Cancer',
                        'Physical',
                        'Rare Disease',
                      ].map((option) => (
                        <RadioOption
                          key={option}
                          name="disabilityType"
                          checked={disabilityType === option}
                          onChange={() => setDisabilityType(option)}
                          label={option}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <SubHeading>Assistance Needed</SubHeading>
                  <div className="flex flex-wrap gap-6">
                    <RadioOption
                      name="assistanceNeeded"
                      checked={assistanceNeeded === 'assistor'}
                      onChange={() => setAssistanceNeeded('assistor')}
                      label="Assistor"
                    />
                    <RadioOption
                      name="assistanceNeeded"
                      checked={assistanceNeeded === 'communication'}
                      onChange={() => setAssistanceNeeded('communication')}
                      label="Communication Assistance"
                    />
                    <RadioOption
                      name="assistanceNeeded"
                      checked={assistanceNeeded === 'visual'}
                      onChange={() => setAssistanceNeeded('visual')}
                      label="Visual Assistance"
                    />
                    <RadioOption
                      name="assistanceNeeded"
                      checked={assistanceNeeded === 'none'}
                      onChange={() => setAssistanceNeeded('none')}
                      label="None"
                    />
                  </div>
                </div>

                {(isSeniorCitizen || isPWD) && (
                  <div>
                    <SubHeading>For Senior Citizens and PWDs</SubHeading>
                    <p className="mb-2 text-sm text-slate-600">
                      Are you willing to vote in the Accessible Polling Place (APP) located on the ground floor
                      of the voting center on the day of the Elections?
                    </p>
                    <div className="flex gap-6">
                      <RadioOption
                        name="appWilling"
                        checked={appWilling === 'yes'}
                        onChange={() => setAppWilling('yes')}
                        label="Yes"
                      />
                      <RadioOption
                        name="appWilling"
                        checked={appWilling === 'no'}
                        onChange={() => setAppWilling('no')}
                        label="No"
                      />
                    </div>
                  </div>
                )}

                {(isIlliterate || isPWD || isSeniorCitizen || isIndigenous) && (
                  <Field label="Assistor's Name (filled out and attach Certification/Attestation Form)">
                    <TextInput placeholder="Full name of assistor" />
                  </Field>
                )}
              </div>
            ) : (
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
            )}
          </Section>

          {!isOverseas && (
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
          )}

          {isTransfer && (
            <Section roman={romanOf('transferRecord')} icon={SwapIcon} title="APPLICATION FOR TRANSFER OF REGISTRATION RECORD">
              <div className="flex flex-col gap-6 text-left">
                <div>
                  <SubHeading>Type of Transfer</SubHeading>
                  <div className="flex flex-col gap-3">
                    <RadioOption
                      name="transferScope"
                      checked={transferScope === 'same'}
                      onChange={() => setTransferScope('same')}
                      label="Within the same City/Municipality/District"
                    />
                    <RadioOption
                      name="transferScope"
                      checked={transferScope === 'another'}
                      onChange={() => setTransferScope('another')}
                      label="From another City/Municipality/District (Accomplish Personal Information at the back)"
                    />
                    <RadioOption
                      name="transferScope"
                      checked={transferScope === 'foreignPost'}
                      onChange={() => setTransferScope('foreignPost')}
                      label="From foreign post to local OEO other than original place of registration"
                    />
                  </div>
                </div>

                <div>
                  <SubHeading>I am a duly registered voter in</SubHeading>
                  <div className="flex flex-col gap-4">
                    <div>
                      <RadioOption
                        name="formerRecordType"
                        checked={formerRecordType === 'local'}
                        onChange={() => setFormerRecordType('local')}
                        label="Local voter — former address (Precinct No. / Barangay / City / Province)"
                      />
                      <div className="mt-3 grid grid-cols-1 gap-4 pl-7 sm:grid-cols-2">
                        <Field label="Precinct No.">
                          <TextInput placeholder="e.g. 0045A" />
                        </Field>
                        <Field label="Barangay">
                          <TextInput placeholder="Barangay San Isidro" />
                        </Field>
                        <Field label="City/District/Municipality of">
                          <TextInput placeholder="Manila" />
                        </Field>
                        <Field label="Province of">
                          <TextInput placeholder="" />
                        </Field>
                      </div>
                    </div>

                    <div>
                      <RadioOption
                        name="formerRecordType"
                        checked={formerRecordType === 'overseas'}
                        onChange={() => setFormerRecordType('overseas')}
                        label="Overseas voter — foreign post located in (Country)"
                      />
                      <div className="mt-3 grid grid-cols-1 gap-4 pl-7 sm:grid-cols-2">
                        <Field label="Foreign post located in">
                          <TextInput placeholder="e.g. Philippine Embassy, Abu Dhabi" />
                        </Field>
                        <Field label="Country of">
                          <TextInput placeholder="e.g. United Arab Emirates" />
                        </Field>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <SubHeading>My New Residence Is</SubHeading>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_240px]">
                    <Field label="House No. &amp; Street / Sitio / Purok">
                      <TextInput placeholder="123 Sampaguita Street" />
                    </Field>
                    <Field label="Barangay">
                      <TextInput placeholder="Barangay 1" />
                    </Field>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="City/Municipality/District">
                      <TextInput placeholder="Quezon City" />
                    </Field>
                    <Field label="Province">
                      <TextInput placeholder="" />
                    </Field>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="I have resided in my new residence for (years)">
                      <TextInput placeholder="e.g. 2" />
                    </Field>
                    <Field label="and (months)">
                      <TextInput placeholder="e.g. 6" />
                    </Field>
                  </div>
                </div>
              </div>
            </Section>
          )}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            {isSK ? (
              <>
                <h2 className="text-left text-sm font-bold tracking-wide text-slate-900">
                  OATH, NOTICE AND CONSENT (KATIPUNAN NG KABATAAN)
                </h2>

                <label className="mt-4 flex w-fit cursor-pointer items-center gap-3 text-left text-sm font-semibold text-slate-700">
                  <input type="checkbox" checked readOnly className="h-4 w-4 rounded accent-blue-600" />
                  Registration
                </label>

                <p className="mt-4 text-left text-sm leading-relaxed text-slate-600">
                  I do solemnly swear that the above statements regarding my person are true and correct; that I
                  possess all the qualifications and none of the disqualifications of a voter of Katipunan ng
                  Kabataan; that I am:
                </p>

                <div className="mt-3 flex flex-col gap-2.5">
                  <RadioOption
                    name="skPrecinctStatus"
                    checked={skPrecinctStatus === 'none'}
                    onChange={() => setSkPrecinctStatus('none')}
                    label="Not registered in any precinct"
                  />
                  <RadioOption
                    name="skPrecinctStatus"
                    checked={skPrecinctStatus === 'another'}
                    onChange={() => setSkPrecinctStatus('another')}
                    label="Registered in a precinct of another City/Municipality/District in the Philippines"
                  />
                </div>

                <p className="mt-4 text-left text-sm leading-relaxed text-slate-600">
                  and that I have reviewed the entries encoded in the VRS and I confirm that the same are correct,
                  accurate and consistent with the information I supplied in this application form. Moreover, by
                  affixing my signature below, I authorize and give my consent to the Commission on Elections and
                  the concerned Election Registration Board to collect and process the personal data I supplied
                  herein for purposes of voter&apos;s registration and elections, and for other purposes and
                  allowable disclosures under B.P. Blg. 881, R.A. No. 8189, 10173 and 10367, and the relevant
                  resolutions of the Commission on Elections. Furthermore, I understand that when I reach eighteen
                  (18) years of age, the personal data I supplied herein will be further processed by the
                  Commission on Elections, and upon approval by the Election Registration Board, will be included
                  in and consolidated with the database of voters who are at least eighteen (18) years of age for
                  subsequent elections and for other lawful purposes and allowable disclosures mentioned above, to
                  which further processing and its purposes I:
                </p>

                <div className="mt-3 flex flex-wrap gap-6">
                  <RadioOption
                    name="skConsent"
                    checked={skConsent === 'give'}
                    onChange={() => setSkConsent('give')}
                    label="Give my consent"
                  />
                  <RadioOption
                    name="skConsent"
                    checked={skConsent === 'withhold'}
                    onChange={() => setSkConsent('withhold')}
                    label="Do not give my consent"
                  />
                </div>

                <p className="mt-4 text-left text-sm leading-relaxed text-slate-600">
                  and that when I reach thirty one (31) years of age, my personal data in the Katipunan ng
                  Kabataan database will be deleted accordingly.
                </p>
              </>
            ) : isOverseas ? (
              <>
                <h2 className="text-left text-sm font-bold tracking-wide text-slate-900">
                  PART III — OATH AND APPLICATION TO VOTE OVERSEAS
                </h2>
                <p className="mt-4 text-left text-sm leading-relaxed text-slate-600">
                  I swear that the above statements are true and correct; that I possess all the qualifications
                  and none of the disqualifications of an overseas voter; that I hereby apply to vote overseas;
                  that my name be included in the Lists of Overseas Voters; and that I give consent to the
                  processing of the information stated herein by the Commission on Elections for registration,
                  election and other purposes as may be provided by law including B.P. Blg. 881, R.A. No. 8189,
                  R.A. No. 9189, R.A. No. 10367 and R.A. No. 10173 also known as the Data Privacy Act of 2012.
                </p>
              </>
            ) : (
              <>
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
              </>
            )}

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