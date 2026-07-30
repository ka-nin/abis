import { InfoCircleIcon } from '../../components/icons'

const NOTIFICATIONS = [
  {
    type: 'critical',
    title: 'Biometric mismatch detected',
    description: 'Voter ID #VRN-2026-008821 — fingerprint score below threshold (0.42)',
    time: '5 min ago',
  },
  {
    type: 'warning',
    title: 'PhilSys API response time elevated',
    description: 'Average response time: 340ms (threshold: 200ms)',
    time: '18 min ago',
  },
  {
    type: 'warning',
    title: 'Duplicate alerts pending review',
    description: '34 duplicate pairs require adjudication decision',
    time: '1 hr ago',
  },
  {
    type: 'info',
    title: 'Daily batch sync completed',
    description: 'PSA Civil Registry — 1,240,000 records synchronized',
    time: '3 hrs ago',
  },
  {
    type: 'info',
    title: 'System backup completed',
    description: 'Full database backup successful — 2.4TB archived',
    time: '6 hrs ago',
  },
  {
    type: 'success',
    title: 'Maintenance window completed',
    description: 'ABIS Matching Engine updated to v4.2.1 with improved accuracy',
    time: 'Yesterday',
  },
]

const TYPE_STYLES = {
  critical: { border: 'border-red-400', icon: 'text-red-500' },
  warning: { border: 'border-amber-400', icon: 'text-amber-500' },
  info: { border: 'border-blue-400', icon: 'text-blue-500' },
  success: { border: 'border-emerald-400', icon: 'text-emerald-500' },
}

function NotificationCard({ type, title, description, time }) {
  const style = TYPE_STYLES[type] ?? TYPE_STYLES.info
  return (
    <div className={`flex items-start gap-3 rounded-xl border-2 bg-white px-4 py-3 ${style.border}`}>
      <span className={`mt-0.5 flex-shrink-0 ${style.icon}`}>
        <InfoCircleIcon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-0.5 text-sm text-slate-500">{description}</p>
      </div>
      <span className="flex-shrink-0 text-xs text-slate-400">{time}</span>
    </div>
  )
}

export default function Notifications() {
  return (
    <div className="max-h-[calc(100vh-260px)] space-y-3 overflow-y-auto pr-1">
      {NOTIFICATIONS.map((notification) => (
        <NotificationCard key={notification.title} {...notification} />
      ))}
    </div>
  )
}