import { useState } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  UserIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  AlertTriangleIcon,
} from '../../components/icons'
import BrandLockup from '../../components/BrandLockup'

const DEMO_CREDENTIALS = { username: 'admin', password: 'Admin@123' }
const MAX_ATTEMPTS = 5

export default function AdminLogin({ onBack, onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const locked = attempts >= MAX_ATTEMPTS

  const handleSubmit = (event) => {
    event.preventDefault()
    if (locked) return

    if (!username.trim() || !password) {
      setError('Please enter both username and password.')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      const isValid = username.trim() === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password
      setIsSubmitting(false)
      if (isValid) {
        setError('')
        onLoginSuccess?.()
      } else {
        const nextAttempts = attempts + 1
        setAttempts(nextAttempts)
        setError(
          nextAttempts >= MAX_ATTEMPTS
            ? 'Too many failed attempts. This account is temporarily locked. Contact your system administrator.'
            : `Invalid username or password. ${MAX_ATTEMPTS - nextAttempts} attempt(s) remaining.`,
        )
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-4">
          <BrandLockup />
        </div>
      </header>

      <main className="mx-auto flex max-w-md flex-col items-center px-6 py-16">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <ShieldCheckIcon className="h-7 w-7" />
        </span>
        <h1 className="mt-5 text-center text-3xl font-extrabold tracking-tight text-slate-900">
          Administrator Login
        </h1>
        <p className="mt-2 text-center text-sm text-slate-500">
          Sign in with your administrator credentials to access the ABIS dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 w-full rounded-2xl border border-slate-200 bg-white p-6">
          {error && (
            <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertTriangleIcon className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <label className="block">
            <span className="text-xs text-slate-500">Username / Employee ID</span>
            <div className="relative mt-1.5">
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                disabled={locked}
                autoComplete="username"
                placeholder="admin.reyes"
                className="w-full rounded-xl border border-slate-300 py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-50"
              />
            </div>
          </label>

          <label className="mt-4 block">
            <span className="text-xs text-slate-500">Password</span>
            <div className="relative mt-1.5">
              <LockIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={locked}
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-300 py-2.5 pl-9 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <div className="mt-4 flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="h-4 w-4 rounded accent-blue-600"
              />
              Remember me
            </label>
            <button type="button" className="text-sm font-semibold text-blue-600 hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={locked || isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors enabled:hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
            {!isSubmitting && <ArrowRightIcon className="h-4 w-4" />}
          </button>

          <p className="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-center text-xs text-slate-400">
            Demo credentials — username: <span className="font-mono text-slate-600">admin</span>, password:{' '}
            <span className="font-mono text-slate-600">Admin@123</span>
          </p>
        </form>

        <button
          type="button"
          onClick={onBack}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </button>
      </main>
    </div>
  )
}
