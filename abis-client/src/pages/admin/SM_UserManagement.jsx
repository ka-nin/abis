import { UserIcon, PlusIcon } from '../../components/icons'

const USERS = [
  { key: 'reyes', name: 'Admin A. Reyes', username: 'admin.reyes', role: 'Super Admin', lastLogin: 'Today 09:00', status: 'Active' },
  { key: 'cruz', name: 'Admin M. Cruz', username: 'admin.cruz', role: 'Super Admin', lastLogin: 'Today 08:30', status: 'Active' },
  { key: 'santos', name: 'DBA J. Santos', username: 'dba.santos', role: 'DBA', lastLogin: 'Today 07:45', status: 'Active' },
  { key: 'garcia', name: 'Op. L. Garcia', username: 'op.garcia', role: 'Operator', lastLogin: 'Yesterday', status: 'Active' },
  { key: 'torres', name: 'Op. R. Torres', username: 'op.torres', role: 'Operator', lastLogin: 'Jul 24, 2026', status: 'Inactive' },
  { key: 'flores', name: 'Audit R. Flores', username: 'audit.flores', role: 'Auditor', lastLogin: 'Today 08:00', status: 'Active' },
]

const STATUS_STYLES = {
  Active: 'bg-emerald-50 text-emerald-700',
  Inactive: 'border border-slate-200 bg-white text-slate-500',
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  )
}

function handleAddUser() {
  // Open add-user flow
}

function handleEditUser(userKey) {
  // Open edit-user flow
}

function handleDisableUser(userKey) {
  // Toggle user disabled state
}

export default function SM_UserManagement() {
  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">User Management</h2>
          <button
            type="button"
            onClick={handleAddUser}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4" />
            Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Name</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Username</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Role</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Last Login</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Status</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {USERS.map((user) => (
                <tr key={user.key} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                        <UserIcon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-slate-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-sm text-slate-500">{user.username}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">{user.role}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-400">{user.lastLogin}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleEditUser(user.key)}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDisableUser(user.key)}
                        className="font-semibold text-red-500 hover:underline"
                      >
                        Disable
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}