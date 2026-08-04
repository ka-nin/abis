import {
  ShieldCheckIcon,
  ArrowRightIcon,
  FingerprintMark,
} from '../components/icons'
import BrandLockup from '../components/BrandLockup'
import groupIcon from '../assets/Group.png'

function RoleCard({ icon, image, iconBg, iconColor, title, description, actionLabel, onClick }) {
  const Icon = icon
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-white p-8 text-left transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/10"
    >
      <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}>
        {image ? (
          <img src={image} alt="" className="h-8 w-8 object-contain" />
        ) : (
          <Icon className={`h-7 w-7 ${iconColor}`} />
        )}
      </span>
      <div>
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <p className="mt-1.5 text-sm text-slate-500">{description}</p>
      </div>
      <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
        {actionLabel}
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  )
}

export default function RoleSelect({ onSelectUser, onSelectAdmin, onSelectElectionDay }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/40">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-4">
          <BrandLockup />
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
          <ShieldCheckIcon className="h-4 w-4" />
          Automated Biometrics Identification System
        </span>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Welcome to ABIS
        </h1>
        <p className="mt-3 text-lg text-slate-500">
          Please select how you'd like to continue.
        </p>

        <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          <RoleCard
            image={groupIcon}
            iconBg="bg-blue-50"
            title="Voter"
            description="Register to vote or check the status of your existing voter registration."
            actionLabel="Continue as Voter"
            onClick={onSelectUser}
          />
          <RoleCard
            icon={FingerprintMark}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
            title="Election Day"
            description="Verify voter identity and eligibility at the polling place on election day."
            actionLabel="Open Verification Kiosk"
            onClick={onSelectElectionDay}
          />
          <RoleCard
            icon={ShieldCheckIcon}
            iconBg="bg-slate-100"
            iconColor="text-slate-700"
            title="Administrator"
            description="Access the admin dashboard to manage biometric enrollment and voter records."
            actionLabel="Continue as Admin"
            onClick={onSelectAdmin}
          />
        </div>
      </main>
    </div>
  )
}