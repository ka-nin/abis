import { useState } from 'react'
import RoleSelect from './pages/RoleSelect'
import UserLanding from './pages/user/UserLanding'
import Intro from './pages/user/Intro'
import TermsCon from './pages/user/TermsCon'
import Step1 from './pages/user/Step1'
import Step2 from './pages/user/Step2'
import AdminDashboard from './pages/admin/AdminDashboard'
import DM_Import from './pages/admin/DM_Import'
import VerifiedVoters from './pages/admin/VerifiedVoters'
import Adj_All from './pages/admin/Adj_All'
import AdminLayout from './layouts/AdminLayout'

const ADMIN_PAGE_LABELS = {
  reports: 'Reports & Statistics',
  database: 'Database & Backup',
  system: 'System Management',
}

function AdminPlaceholderPage({ pageKey, onNavigate, onLogout }) {
  const label = ADMIN_PAGE_LABELS[pageKey] || pageKey
  return (
    <AdminLayout
      active={pageKey}
      onNavigate={onNavigate}
      onLogout={onLogout}
      title={label}
      subtitle="This section is under construction."
    >
      <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-center">
        <p className="text-sm font-medium text-slate-500">{label} view is coming soon.</p>
      </div>
    </AdminLayout>
  )
}

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

    if (adminPage !== 'dashboard') {
      return <AdminPlaceholderPage pageKey={adminPage} onNavigate={setAdminPage} onLogout={handleAdminLogout} />
    }

    return <AdminDashboard onNavigate={setAdminPage} onLogout={handleAdminLogout} />
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