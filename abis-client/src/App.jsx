import { useState } from 'react'
import RoleSelect from './pages/RoleSelect'
import UserLanding from './pages/user/UserLanding'
import Intro from './pages/user/Intro'
import TermsCon from './pages/user/TermsCon'
import Step1 from './pages/user/Step1'
import Step2 from './pages/user/Step2'
import Step3 from './pages/user/Step3'
import { ArrowLeftIcon } from './components/icons'
import BrandLockup from './components/BrandLockup'

function AdminPlaceholder({ onBack }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-4">
          <BrandLockup />
        </div>
      </header>
      <main className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Admin Portal</h1>
        <p className="mt-2 text-sm text-slate-500">
          The admin login screen hasn't been built yet.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </button>
      </main>
    </div>
  )
}

function App() {
  const [step, setStep] = useState('role')

  if (step === 'admin') {
    return <AdminPlaceholder onBack={() => setStep('role')} />
  }

  if (step === 'step3') {
    return <Step3 onBack={() => setStep('step2')} onVerify={() => setStep('landing')} />
  }

  if (step === 'step2') {
    return (
      <Step2
        onBack={() => setStep('step1')}
        onVerify={() => setStep('step3')}
        onVerifyEmail={() => setStep('step3')}
      />
    )
  }

  if (step === 'step1') {
    return <Step1 onBack={() => setStep('terms')} onContinue={() => setStep('step2')} />
  }

  if (step === 'terms') {
    return (
      <TermsCon
        onBack={() => setStep('register')}
        onDecline={() => setStep('landing')}
        onAccept={() => setStep('step1')}
      />
    )
  }

  if (step === 'register') {
    return (
      <Intro onBack={() => setStep('landing')} onVerify={() => setStep('terms')} />
    )
  }

  if (step === 'landing') {
    return <UserLanding onStart={() => setStep('register')} />
  }

  return (
    <RoleSelect
      onSelectUser={() => setStep('landing')}
      onSelectAdmin={() => setStep('admin')}
    />
  )
}

export default App