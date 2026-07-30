import { useState } from 'react'
import UserLanding from './pages/user/UserLanding'
import SelfRegistration from './pages/user/SelfRegistration'

function App() {
  const [step, setStep] = useState('landing')

  if (step === 'register') {
    return (
      <SelfRegistration onBack={() => setStep('landing')} />
    )
  }

  return <UserLanding onStart={() => setStep('register')} />
}

export default App