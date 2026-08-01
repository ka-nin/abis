const CONNECTION_DETAILS = [
  { label: 'Host', value: 'db.abis.nec.gov.ph' },
  { label: 'Port', value: '5432' },
  { label: 'Database', value: 'abis_production' },
  { label: 'Schema', value: 'public' },
  { label: 'Connection Pool', value: '32 / 100' },
]

const ACCESS_ROLES = [
  { key: 'superAdmin', name: 'Super Admin', description: 'Full R/W', users: '2 users' },
  { key: 'dba', name: 'DBA', description: 'Schema + R/W', users: '3 users' },
  { key: 'operator', name: 'Operator', description: 'Read Only', users: '48 users' },
  { key: 'apiService', name: 'API Service', description: 'Scoped R/W', users: '6 users' },
]

function DatabaseConnectionCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">Database Connection</h2>

      <ul className="mt-3 divide-y divide-slate-100">
        {CONNECTION_DETAILS.map((detail) => (
          <li key={detail.label} className="flex items-center justify-between py-3">
            <span className="text-sm text-slate-500">{detail.label}</span>
            <span className="font-mono text-sm text-slate-900">{detail.value}</span>
          </li>
        ))}
      </ul>

      <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-emerald-600">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Connected — 2ms latency
      </p>
    </div>
  )
}

function AccessControlCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">Access Control</h2>

      <ul className="mt-3 divide-y divide-slate-100">
        {ACCESS_ROLES.map((role) => (
          <li key={role.key} className="flex items-center gap-3 py-3">
            <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full border-2 border-blue-500" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900">{role.name}</p>
            </div>
            <span className="flex-shrink-0 text-xs text-slate-400">{role.description}</span>
            <span className="flex-shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
              {role.users}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function DB_Access() {
  return (
    <div className="max-h-[calc(100vh-260px)] overflow-y-auto pr-1">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DatabaseConnectionCard />
        <AccessControlCard />
      </div>
    </div>
  )
}