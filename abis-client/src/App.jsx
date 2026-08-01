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
import Step7 from './pages/user/Step7'
import Step8 from './pages/user/Step8'
import Step9 from './pages/user/Step9'
import Step10 from './pages/user/Step10'
import Step11 from './pages/user/Step11'
import Step12 from './pages/user/Step12'
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
  const [dashboardTab, setDashboardTab] = useState('Overview')

  if (step === 'admin') {
    const handleAdminLogout = () => setStep('role')
    const goToNotifications = () => {
      setDashboardTab('Alerts & Notifications')
      setAdminPage('dashboard')
    }

    if (adminPage === 'data-migration') {
      return <DM_Import onNavigate={setAdminPage} onLogout={handleAdminLogout} onBellClick={goToNotifications} />
    }

    if (adminPage === 'identification') {
      return <VerifiedVoters onNavigate={setAdminPage} onLogout={handleAdminLogout} onBellClick={goToNotifications} />
    }

    if (adminPage === 'adjudication') {
      return <Adj_All onNavigate={setAdminPage} onLogout={handleAdminLogout} onBellClick={goToNotifications} />
    }

    if (adminPage === 'reports') {
      return <RS_VReport onNavigate={setAdminPage} onLogout={handleAdminLogout} onBellClick={goToNotifications} />
    }

    if (adminPage === 'database') {
      return <DB_SysFiles onNavigate={setAdminPage} onLogout={handleAdminLogout} onBellClick={goToNotifications} />
    }

    if (adminPage === 'system') {
      return <SM_Settings onNavigate={setAdminPage} onLogout={handleAdminLogout} onBellClick={goToNotifications} />
    }

    return (
      <AdminDashboard
        onNavigate={setAdminPage}
        onLogout={handleAdminLogout}
        onBellClick={goToNotifications}
        initialTab={dashboardTab}
      />
    )
  }

  if (step === 'step12') {
    return <Step12 onReturnHome={() => setStep('landing')} />
  }

  if (step === 'step11') {
    return <Step11 onBack={() => setStep('step10')} onContinue={() => setStep('step12')} />
  }

  if (step === 'step10') {
    return <Step10 onBack={() => setStep('step9')} onContinue={() => setStep('step11')} />
  }

  if (step === 'step9') {
    return <Step9 onBack={() => setStep('step8')} onContinue={() => setStep('step10')} />
  }

  if (step === 'step8') {
    return <Step8 onBack={() => setStep('step7')} onContinue={() => setStep('step9')} />
  }

  if (step === 'step7') {
    return (
      <Step7
        onBack={() => setStep('step6')}
        onContinue={() => setStep('step8')}
        onSkip={() => setStep('step8')}
      />
    )
  }

  if (step === 'step6') {
    return <Step6 onBack={() => setStep('step5')} onContinue={() => setStep('step7')} />
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