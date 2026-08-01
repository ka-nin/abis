import { useEffect, useRef, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, BadgeCheckIcon, PhoneIcon } from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'
import RegistrationStepper from '../../components/RegistrationStepper'

const OTP_LENGTH = 6
const EXPIRY_SECONDS = 119
const TEMP_OTP = '123456'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function Step2({ onBack, onVerify, onVerifyEmail }) {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [secondsLeft, setSecondsLeft] = useState(EXPIRY_SECONDS)
  const [verified, setVerified] = useState(false)
  const inputRefs = useRef([])

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearInterval(timer)
  }, [secondsLeft])

  const handleChange = (index, rawValue) => {
    const value = rawValue.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[index] = value
    setOtp(next)

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    if (next.every((digit) => digit !== '') && next.join('') === TEMP_OTP) {
      setVerified(true)
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(''))
    setSecondsLeft(EXPIRY_SECONDS)
    inputRefs.current[0]?.focus()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <BrandLockup />

          <RegistrationStepper currentStep={2} />
        </div>
      </header>

      {verified ? (
        <main className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
            <BadgeCheckIcon className="h-10 w-10" />
          </span>

          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <PhoneIcon className="h-4 w-4" />
            Step 2 of 12
          </span>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">
            Verified Successfully
          </h1>
          <p className="mt-3 text-base text-slate-500">
            Your mobile number has been verified.
          </p>

          <button
            type="button"
            onClick={() => onVerify?.(otp.join(''))}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors hover:bg-blue-800"
          >
            Continue
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </main>
      ) : (
        <main className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <PhoneIcon className="h-7 w-7" />
          </span>

          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <PhoneIcon className="h-4 w-4" />
            Step 2 of 12
          </span>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">
            OTP Verification
          </h1>
          <p className="mt-3 text-base text-slate-500">
            Enter the 6-digit code sent to
            <br />
            <span className="font-bold text-slate-900">+63 9XX XXX XX89</span>
          </p>

          <div className="mt-8 flex gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="h-14 w-14 rounded-xl border border-slate-300 bg-white text-center text-xl font-semibold text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            ))}
          </div>

          <div className="mt-5 flex w-full items-center justify-between text-sm">
            <span className="text-slate-500">
              Code expires in <span className="font-bold text-slate-900">{formatTime(secondsLeft)}</span>
            </span>
            {secondsLeft > 0 ? (
              <span className="text-slate-400">Resend in {formatTime(secondsLeft)}</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Resend code
              </button>
            )}
          </div>

          <p className="mt-8 text-sm text-slate-500">
            Didn&apos;t receive a code? Check if your number is correct.
          </p>
          <button
            type="button"
            onClick={onVerifyEmail}
            className="mt-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Verify via Email instead
          </button>

          <div className="mt-10 w-full">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back
            </button>
          </div>
        </main>
      )}
    </div>
  )
}