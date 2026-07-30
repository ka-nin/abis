import { useState } from 'react'
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  FileTextIcon,
} from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'

const SECTIONS = [
  {
    title: '1. Collection of Biometric Data',
    body: 'The National Election Commission (NEC) collects biometric data including fingerprints and facial images pursuant to Republic Act No. 10367 (Mandatory Biometrics Voter Registration Act). This data is used solely for voter identification and de-duplication purposes.',
  },
  {
    title: '2. Data Processing and Storage',
    body: 'All biometric data is encrypted using AES-256 encryption and stored in a secured government data center compliant with ISO 27001. Access is strictly controlled and limited to authorized NEC personnel.',
  },
  {
    title: '3. Purpose of Use',
    body: 'Your biometric data is used exclusively for voter identification, de-duplication, and election integrity purposes. It will not be used for any other government or private purpose without your explicit consent.',
  },
  {
    title: '4. Data Sharing and Third Parties',
    body: 'Your biometric data will not be shared with third parties, including private entities, without proper legal authority as mandated by RA 10173 (Data Privacy Act of 2012).',
  },
  {
    title: '5. Your Rights',
    body: 'You have the right to access, correct, and request the deletion of your biometric data, subject to legal retention requirements under COMELEC regulations.',
  },
  {
    title: '6. Consent Withdrawal',
    body: 'You may withdraw your consent at any time by visiting your local COMELEC office, though this may affect your ability to complete voter registration.',
  },
]

export default function TermsCon({ onBack, onDecline, onAccept }) {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <BrandLockup />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600">
          <FileTextIcon className="h-4 w-4" />
          Legal
        </span>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900">
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 text-base text-slate-500">
          Please read and accept the terms before proceeding.
        </p>

        <div className="mt-8 max-h-80 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-6 text-left">
            {SECTIONS.map(({ title, body }) => (
              <div key={title}>
                <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-left">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-600">
            I have read, understood, and agree to the Terms and Conditions and Privacy
            Notice of the National Election Commission Automated Biometrics
            Identification System.
          </span>
        </label>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </button>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={onDecline}
              className="text-sm font-semibold text-slate-500 transition-colors hover:text-slate-700"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={onAccept}
              disabled={!agreed}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:shadow-none"
            >
              Accept &amp; Continue
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}