import { useState } from 'react'
import { ShieldIcon } from '../../components/icons'

const ROLES = ['Super Admin', 'DBA', 'Operator', 'Auditor']

const MODULES = [
  'Dashboard',
  'Data Migration',
  'Identification & Verification',
  'Adjudication',
  'Reports & Statistics',
  'Database & Backup',
  'System Management',
]

const PERMISSION_LEVELS = ['None', 'View', 'Edit', 'Full']

const DEFAULT_MATRIX = {
  'Super Admin': { Dashboard: 'Full', 'Data Migration': 'Full', 'Identification & Verification': 'Full', Adjudication: 'Full', 'Reports & Statistics': 'Full', 'Database & Backup': 'Full', 'System Management': 'Full' },
  DBA: { Dashboard: 'View', 'Data Migration': 'Full', 'Identification & Verification': 'View', Adjudication: 'None', 'Reports & Statistics': 'View', 'Database & Backup': 'Full', 'System Management': 'None' },
  Operator: { Dashboard: 'View', 'Data Migration': 'None', 'Identification & Verification': 'Edit', Adjudication: 'Edit', 'Reports & Statistics': 'View', 'Database & Backup': 'None', 'System Management': 'None' },
  Auditor: { Dashboard: 'View', 'Data Migration': 'View', 'Identification & Verification': 'View', Adjudication: 'View', 'Reports & Statistics': 'View', 'Database & Backup': 'View', 'System Management': 'None' },
}

const LEVEL_STYLES = {
  None: 'text-slate-400',
  View: 'text-blue-600',
  Edit: 'text-amber-600',
  Full: 'text-emerald-600',
}

export default function SM_AccessControl() {
  const [matrix, setMatrix] = useState(DEFAULT_MATRIX)

  const updatePermission = (role, moduleName, level) => {
    setMatrix((prev) => ({
      ...prev,
      [role]: { ...prev[role], [moduleName]: level },
    }))
  }

  const handleSaveChanges = () => {
    // Persist the role-permission matrix
  }

  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2">
          <ShieldIcon className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-semibold text-slate-900">Role-Permission Matrix</h2>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Set the access level each role has per module. Changes apply to all users assigned that role.
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">Module</th>
                {ROLES.map((role) => (
                  <th key={role} className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                    {role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MODULES.map((moduleName) => (
                <tr key={moduleName} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-slate-900">{moduleName}</td>
                  {ROLES.map((role) => (
                    <td key={role} className="whitespace-nowrap px-3 py-3">
                      <select
                        value={matrix[role][moduleName]}
                        onChange={(event) => updatePermission(role, moduleName, event.target.value)}
                        className={`rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
                          LEVEL_STYLES[matrix[role][moduleName]]
                        }`}
                      >
                        {PERMISSION_LEVELS.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <button
            type="button"
            onClick={handleSaveChanges}
            className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700"
          >
            Save Changes
          </button>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            {PERMISSION_LEVELS.map((level) => (
              <span key={level} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${LEVEL_STYLES[level].replace('text-', 'bg-')}`} />
                {level}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}