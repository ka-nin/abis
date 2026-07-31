import { useState } from 'react'
import BrandLockup from '../components/BrandLockup'
import {
  GridIcon,
  SwapIcon,
  IdCardIcon,
  ScaleIcon,
  ChartBarIcon,
  DatabaseIcon,
  SettingsIcon,
  LogoutIcon,
  SearchIcon,
  BellIcon,
  UserIcon,
  DotsHorizontalIcon,
} from '../components/icons'

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: GridIcon },
  { key: 'data-migration', label: 'Data Migration', icon: SwapIcon },
  { key: 'identification', label: 'Identification & Verification', icon: IdCardIcon },
  { key: 'adjudication', label: 'Adjudication', icon: ScaleIcon },
  { key: 'reports', label: 'Reports & Statistics', icon: ChartBarIcon },
  { key: 'database', label: 'Database & Backup', icon: DatabaseIcon },
  { key: 'system', label: 'System Management', icon: SettingsIcon },
]

function NavLink({ item, active, onSelect }) {
  const Icon = item.icon
  const isActive = active === item.key
  return (
    <button
      type="button"
      onClick={() => onSelect?.(item.key)}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-50 text-blue-700'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
      <span className="truncate">{item.label}</span>
    </button>
  )
}

export default function AdminLayout({
  active = 'dashboard',
  onNavigate,
  title = 'Dashboard',
  subtitle,
  headerActions,
  adminName = 'Admin A. Reyes',
  adminRole = 'Super Administrator',
  onLogout,
  children,
}) {
  const [search, setSearch] = useState('')

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <aside className="flex h-full w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-5 py-5">
          <BrandLockup subtitle="National Election Commission" />
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.key} item={item} active={active} onSelect={onNavigate} />
          ))}
        </nav>

        <div className="border-t border-slate-100 p-3">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
          >
            <LogoutIcon className="h-5 w-5 flex-shrink-0" />
            Logout
          </button>

          <div className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <UserIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{adminName}</p>
              <p className="truncate text-xs text-slate-400">{adminRole}</p>
            </div>
            <button
              type="button"
              className="flex-shrink-0 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="Account options"
            >
              <DotsHorizontalIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-4 border-b border-slate-200 bg-white px-6 py-3">
          <div className="relative flex-1 max-w-md">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search voters, records..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100"
              aria-label="Notifications"
            >
              <BellIcon className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm shadow-blue-500/30"
              aria-label="Account"
            >
              <UserIcon className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
              {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
            </div>
            {headerActions}
          </div>

          {children}
        </main>
      </div>
    </div>
  )
}