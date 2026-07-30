import { useState } from 'react'
import RoleSelect from './pages/RoleSelect'
import UserLanding from './pages/user/UserLanding'
import SelfRegistration from './pages/user/SelfRegistration'
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  const [step, setStep] = useState('role')

  if (step === 'admin') {
    return <AdminDashboard onLogout={() => setStep('role')} />
  }

  if (step === 'register') {
    return <SelfRegistration onBack={() => setStep('landing')} />
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