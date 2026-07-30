import { useState } from 'react'
import RoleSelect from './pages/RoleSelect'
import UserLanding from './pages/user/UserLanding'
import Intro from './pages/user/Intro'
import TermsCon from './pages/user/TermsCon'
import Step1 from './pages/user/Step1'
import Step2 from './pages/user/Step2'
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  const [step, setStep] = useState('role')

  if (step === 'admin') {
    return <AdminDashboard onLogout={() => setStep('role')} />
  }

  if (step === 'step2') {
    return (
      <Step2
        onBack={() => setStep('step1')}
        onVerify={() => setStep('landing')}
        onVerifyEmail={() => setStep('landing')}
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