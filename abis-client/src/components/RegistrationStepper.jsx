import { CheckCircleIcon } from './icons'

export const REGISTRATION_STEPS = [
  'Personal Info',
  'Verify',
  'Gov ID',
  'Records',
  'Method',
  'Face',
  'Fingerprint',
  'Iris',
  'Review',
  'Matching',
  'Verify',
  'Complete',
]

export default function RegistrationStepper({ currentStep }) {
  return (
    <div className="overflow-x-auto">
      <ol className="flex w-max min-w-[900px] gap-0">
        {REGISTRATION_STEPS.map((label, i) => {
          const stepNum = i + 1
          const isCurrent = stepNum === currentStep
          const isDone = stepNum < currentStep
          const lineIsDone = i !== 0 && stepNum <= currentStep
          return (
            <li key={stepNum} className="relative flex w-20 flex-col items-center">
              {i !== 0 && (
                <span
                  className={`absolute right-1/2 top-4 h-px w-full ${
                    lineIsDone ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              )}
              {isDone ? (
                <CheckCircleIcon className="relative z-10 h-8 w-8 text-emerald-500" />
              ) : (
                <span
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    isCurrent
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-300 bg-white text-slate-400'
                  }`}
                >
                  {stepNum}
                </span>
              )}
              <span
                className={`mt-1.5 text-center text-[11px] leading-tight ${
                  isCurrent
                    ? 'font-semibold text-blue-700'
                    : isDone
                      ? 'font-medium text-emerald-600'
                      : 'font-medium text-slate-400'
                }`}
              >
                {label}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}