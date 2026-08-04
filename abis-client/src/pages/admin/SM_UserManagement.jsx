import { useState } from 'react'
import { UserIcon, PlusIcon } from '../../components/icons'

const INITIAL_USERS = [
  { key: 'reyes', name: 'Admin A. Reyes', username: 'admin.reyes', role: 'Super Admin', lastLogin: 'Today 09:00', status: 'Active' },
  { key: 'cruz', name: 'Admin M. Cruz', username: 'admin.cruz', role: 'Super Admin', lastLogin: 'Today 08:30', status: 'Active' },
  { key: 'santos', name: 'DBA J. Santos', username: 'dba.santos', role: 'DBA', lastLogin: 'Today 07:45', status: 'Active' },
  { key: 'garcia', name: 'Op. L. Garcia', username: 'op.garcia', role: 'Operator', lastLogin: 'Yesterday', status: 'Active' },
  { key: 'torres', name: 'Op. R. Torres', username: 'op.torres', role: 'Operator', lastLogin: 'Jul 24, 2026', status: 'Inactive' },
  { key: 'flores', name: 'Audit R. Flores', username: 'audit.flores', role: 'Auditor', lastLogin: 'Today 08:00', status: 'Active' },
]

const ROLES = ['Super Admin', 'DBA', 'Operator', 'Auditor']

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

function UserFormModal({ mode, initialUser, onClose, onSave }) {
  const [name, setName] = useState(initialUser?.name ?? '')
  const [username, setUsername] = useState(initialUser?.username ?? '')
  const [role, setRole] = useState(initialUser?.role ?? ROLES[0])
  const [error, setError] = useState('')

  const isEdit = mode === 'edit'

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!name.trim() || !username.trim()) {
      setError('Name and username are required.')
      return
    }
    onSave({ name: name.trim(), username: username.trim(), role })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <button type="button" className="fixed inset-0 cursor-default" aria-label="Close dialog" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">{isEdit ? 'Edit User' : 'Add User'}</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-5">
          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          )}

          <label className="block">
            <span className="text-xs text-slate-500">Full Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Admin A. Reyes"
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>

          <label className="block">
            <span className="text-xs text-slate-500">Username</span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              disabled={isEdit}
              placeholder="e.g. admin.reyes"
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
          </label>

          <label className="block">
            <span className="text-xs text-slate-500">Role</span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {ROLES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>

          <div className="mt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700"
            >
              {isEdit ? 'Save Changes' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function SM_UserManagement() {
  const [users, setUsers] = useState(INITIAL_USERS)
  const [modalMode, setModalMode] = useState(null)
  const [editingUser, setEditingUser] = useState(null)

  const handleAddUser = () => {
    setEditingUser(null)
    setModalMode('add')
  }

  const handleEditUser = (userKey) => {
    setEditingUser(users.find((u) => u.key === userKey) ?? null)
    setModalMode('edit')
  }

  const handleDisableUser = (userKey) => {
    setUsers((prev) =>
      prev.map((u) => (u.key === userKey ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u)),
    )
  }

  const closeModal = () => {
    setModalMode(null)
    setEditingUser(null)
  }

  const handleSaveUser = (formValues) => {
    if (modalMode === 'edit' && editingUser) {
      setUsers((prev) => prev.map((u) => (u.key === editingUser.key ? { ...u, ...formValues } : u)))
    } else {
      const key = formValues.username.toLowerCase().replace(/[^a-z0-9]/g, '-') || `user-${Date.now()}`
      setUsers((prev) => [
        ...prev,
        { key, ...formValues, lastLogin: 'Never', status: 'Active' },
      ])
    }
    closeModal()
  }

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
              {users.map((user) => (
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
                        className={`font-semibold hover:underline ${
                          user.status === 'Active' ? 'text-red-500' : 'text-emerald-600'
                        }`}
                      >
                        {user.status === 'Active' ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalMode && (
        <UserFormModal mode={modalMode} initialUser={editingUser} onClose={closeModal} onSave={handleSaveUser} />
      )}
    </div>
  )
}
