import { useState } from 'react'
import RoleSelect from './pages/RoleSelect'
import UserLanding from './pages/user/UserLanding'
import Intro from './pages/user/Intro'
import TermsCon from './pages/user/TermsCon'
import Step1 from './pages/user/Step1'
import Step2 from './pages/user/Step2'
import Step3 from './pages/user/Step3'
import Step4 from './pages/user/Step4'
import Step5 from './pages/user/Step5'
import Step6 from './pages/user/Step6'
import { ArrowLeftIcon } from './components/icons'
import BrandLockup from './components/BrandLockup'
import AdminDashboard from './pages/admin/AdminDashboard'
import DM_Import from './pages/admin/DM_Import'
import VerifiedVoters from './pages/admin/VerifiedVoters'
import Adj_All from './pages/admin/Adj_All'
import RS_VReport from './pages/admin/RS_VReport'
import DB_SysFiles from './pages/admin/DB_SysFiles'
import SM_Settings from './pages/admin/SM_Settings'

function App() {
  const [step, setStep] = useState('role')
  const [adminPage, setAdminPage] = useState('dashboard')

  if (step === 'admin') {
    const handleAdminLogout = () => setStep('role')

    if (adminPage === 'data-migration') {
      return <DM_Import onNavigate={setAdminPage} onLogout={handleAdminLogout} />
    }

    if (adminPage === 'identification') {
      return <VerifiedVoters onNavigate={setAdminPage} onLogout={handleAdminLogout} />
    }

    if (adminPage === 'adjudication') {
      return <Adj_All onNavigate={setAdminPage} onLogout={handleAdminLogout} />
    }

    if (adminPage === 'reports') {
      return <RS_VReport onNavigate={setAdminPage} onLogout={handleAdminLogout} />
    }

    if (adminPage === 'database') {
      return <DB_SysFiles onNavigate={setAdminPage} onLogout={handleAdminLogout} />
    }

    if (adminPage === 'system') {
      return <SM_Settings onNavigate={setAdminPage} onLogout={handleAdminLogout} />
    }

    return <AdminDashboard onNavigate={setAdminPage} onLogout={handleAdminLogout} />
  }

  if (step === 'step6') {
    return <Step6 onBack={() => setStep('step5')} onContinue={() => setStep('landing')} />
  }

  if (step === 'step5') {
    return (
      <Step5
        onBack={() => setStep('step4')}
        onSelectFace={() => setStep('step6')}
        onSelectFingerprint={() => setStep('landing')}
      />
    )
  }

  if (step === 'step4') {
    return <Step4 onBack={() => setStep('step3')} onContinue={() => setStep('step5')} />
  }

  if (step === 'step3') {
    return <Step3 onBack={() => setStep('step2')} onContinue={() => setStep('step4')} />
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