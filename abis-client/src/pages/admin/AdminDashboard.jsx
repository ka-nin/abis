import { useMemo, useRef, useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import SystemStatus from './SystemStatus'
import Notifications from './Notifications'
import DataVisualization from './DataVisualization'
import DataStatistics from './DataStatistics'
import Queueing from './Queueing'
import CustomizeDashboard from './CustomizeDashboard'
import {
  RefreshIcon,
  PlusIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  TrendUpIcon,
  TrendDownIcon,
  InfoCircleIcon,
} from '../../components/icons'

const TABS = [
  'Overview',
  'System Status',
  'Alerts & Notifications',
  'Data Visualization',
  'Data Statistics',
  'Queueing',
  'Customize Dashboard',
]

const STAT_CARDS = [
  {
    key: 'total',
    label: 'Total Voters',
    value: '65,200,000',
    meta: 'Nationwide',
    delta: '+1,247 today',
    direction: 'up',
    tone: 'good',
    icon: UsersIcon,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    key: 'active',
    label: 'Active Voters',
    value: '58,900,000',
    meta: 'Verified & enrolled',
    delta: '90.3% of total',
    direction: 'up',
    tone: 'good',
    icon: CheckCircleIcon,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    key: 'deactivated',
    label: 'Deactivated',
    value: '2,100,000',
    meta: 'Requires review',
    delta: '-32 this week',
    direction: 'down',
    tone: 'bad',
    icon: XCircleIcon,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
  },
  {
    key: 'pending',
    label: 'Pending',
    value: '4,200,000',
    meta: 'Awaiting verification',
    delta: '+89 new',
    direction: 'down',
    tone: 'bad',
    icon: ClockIcon,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
]

const TREND_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const TREND_VALUES = [1180, 1340, 1300, 1120, 1520, 1980, 1700]
const TREND_TICKS = [0, 550, 1100, 1650, 2200]
const TREND_MAX = 2200

const VOTER_STATUS = [
  { key: 'active', label: 'Active', value: 58.9, color: '#10b981' },
  { key: 'pending', label: 'Pending', value: 4.2, color: '#f59e0b' },
  { key: 'deactivated', label: 'Deactivated', value: 2.1, color: '#ef4444' },
]

const RECENT_ACTIVITY = [
  { title: 'New registration completed', subtitle: 'Maria C. Santos', time: '2 min ago', dot: 'bg-emerald-500' },
  { title: 'Duplicate alert flagged', subtitle: 'System', time: '15 min ago', dot: 'bg-amber-500' },
  { title: 'Biometric verification passed', subtitle: 'Juan D. Cruz', time: '32 min ago', dot: 'bg-emerald-500' },
  { title: 'Adjudication resolved', subtitle: 'Operator Reyes', time: '1 hr ago', dot: 'bg-blue-500' },
  { title: 'Batch import completed (5,200 records)', subtitle: 'Data Migration', time: '3 hrs ago', dot: 'bg-blue-500' },
]

function StatCard({ label, value, meta, delta, direction, tone, icon: Icon, iconBg, iconColor }) {
  const TrendIcon = direction === 'up' ? TrendUpIcon : TrendDownIcon
  const toneClass = tone === 'good' ? 'text-emerald-600' : 'text-red-500'
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{meta}</p>
      <p className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${toneClass}`}>
        <TrendIcon className="h-3.5 w-3.5" />
        {delta}
      </p>
    </div>
  )
}

function smoothPath(points) {
  if (points.length < 2) return ''
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] || p2
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

const CHART_W = 600
const CHART_H = 260
const PAD_L = 44
const PAD_R = 12
const PAD_T = 12
const PAD_B = 26
const PLOT_W = CHART_W - PAD_L - PAD_R
const PLOT_H = CHART_H - PAD_T - PAD_B

function RegistrationTrendChart() {
  const svgRef = useRef(null)
  const [hoverIndex, setHoverIndex] = useState(null)

  const points = useMemo(
    () =>
      TREND_VALUES.map((v, i) => ({
        x: PAD_L + (i / (TREND_VALUES.length - 1)) * PLOT_W,
        y: PAD_T + PLOT_H - (v / TREND_MAX) * PLOT_H,
        value: v,
        day: TREND_DAYS[i],
      })),
    [],
  )

  const linePath = useMemo(() => smoothPath(points), [points])
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${PAD_T + PLOT_H} L ${points[0].x} ${PAD_T + PLOT_H} Z`

  const handleMove = (event) => {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const ratio = (event.clientX - rect.left) / rect.width
    const svgX = ratio * CHART_W
    let nearest = 0
    let best = Infinity
    points.forEach((p, i) => {
      const dist = Math.abs(p.x - svgX)
      if (dist < best) {
        best = dist
        nearest = i
      }
    })
    setHoverIndex(nearest)
  }

  const hover = hoverIndex !== null ? points[hoverIndex] : null

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Registration Trend</h2>
          <p className="text-xs text-slate-400">Daily registrations — last 7 days</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
          <TrendUpIcon className="h-3.5 w-3.5" />
          +14.2%
        </span>
      </div>

      <div className="relative mt-4">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="w-full"
          onMouseMove={handleMove}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a78d6" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#2a78d6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {TREND_TICKS.map((tick) => {
            const y = PAD_T + PLOT_H - (tick / TREND_MAX) * PLOT_H
            return (
              <g key={tick}>
                <line x1={PAD_L} x2={CHART_W - PAD_R} y1={y} y2={y} stroke="#e1e0d9" strokeWidth="1" />
                <text x={PAD_L - 8} y={y + 3} textAnchor="end" fontSize="10" fill="#898781">
                  {tick.toLocaleString()}
                </text>
              </g>
            )
          })}

          {points.map((p) => (
            <text key={p.day} x={p.x} y={CHART_H - 6} textAnchor="middle" fontSize="10" fill="#898781">
              {p.day}
            </text>
          ))}

          <path d={areaPath} fill="url(#trendFill)" stroke="none" />
          <path d={linePath} fill="none" stroke="#2a78d6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {hover && (
            <line
              x1={hover.x}
              x2={hover.x}
              y1={PAD_T}
              y2={PAD_T + PLOT_H}
              stroke="#c3c2b7"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          )}

          {points.map((p, i) => (
            <circle
              key={p.day}
              cx={p.x}
              cy={p.y}
              r={hoverIndex === i ? 5 : i === points.length - 1 ? 4 : 0}
              fill="#2a78d6"
              stroke="#ffffff"
              strokeWidth="2"
              className={hoverIndex === i || i === points.length - 1 ? 'opacity-100' : 'opacity-0'}
            />
          ))}
        </svg>

        {hover && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs shadow-lg"
            style={{
              left: `${(hover.x / CHART_W) * 100}%`,
              top: `${(hover.y / CHART_H) * 100}%`,
            }}
          >
            <p className="font-semibold text-slate-900">{hover.value.toLocaleString()}</p>
            <p className="text-slate-400">{hover.day}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function VoterStatusDonut() {
  const total = VOTER_STATUS.reduce((sum, s) => sum + s.value, 0)
  const r = 42
  const circumference = 2 * Math.PI * r
  let cumulative = 0
  const segments = VOTER_STATUS.map((s) => {
    const length = (s.value / total) * circumference
    const dash = Math.max(length - 3, 0)
    const offset = -cumulative
    cumulative += length
    return { ...s, dash, offset }
  })

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">Voter Status</h2>

      <div className="mt-4 flex items-center justify-center">
        <svg viewBox="0 0 120 120" className="h-40 w-40">
          {segments.map((s) => (
            <circle
              key={s.key}
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={`${s.dash} ${circumference - s.dash}`}
              strokeDashoffset={s.offset}
              transform="rotate(-90 60 60)"
            />
          ))}
        </svg>
      </div>

      <ul className="mt-4 space-y-2.5">
        {VOTER_STATUS.map((s) => (
          <li key={s.key} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              {s.label}
            </span>
            <span className="font-semibold text-slate-900">{s.value}M</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RecentActivity() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">Recent Activity</h2>
      <ul className="mt-3 divide-y divide-slate-100">
        {RECENT_ACTIVITY.map((item) => (
          <li key={item.title} className="flex items-center gap-3 py-3">
            <span className={`h-2 w-2 flex-shrink-0 rounded-full ${item.dot}`} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900">{item.title}</p>
              <p className="truncate text-xs text-slate-400">{item.subtitle}</p>
            </div>
            <span className="flex-shrink-0 text-xs text-slate-400">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-3">
        <p className="flex items-center gap-2 text-sm text-blue-700">
          <InfoCircleIcon className="h-4 w-4 flex-shrink-0" />
          System is operating normally. Last biometric database sync: Today at 08:00 AM.
        </p>
        <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Online
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map(({ key, ...card }) => (
          <StatCard key={key} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RegistrationTrendChart />
        </div>
        <VoterStatusDonut />
      </div>

      <RecentActivity />
    </div>
  )
}

function PlaceholderTab({ name }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-center">
      <p className="text-sm font-medium text-slate-500">{name} view is coming soon.</p>
    </div>
  )
}

export default function AdminDashboard({ onNavigate, onLogout }) {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <AdminLayout
      active="dashboard"
      onNavigate={onNavigate}
      onLogout={onLogout}
      title="Dashboard"
      subtitle="National Election Commission — ABIS Overview"
      headerActions={
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <RefreshIcon className="h-4 w-4" />
            Refresh
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4" />
            New Registration
          </button>
        </div>
      }
    >
      <div className="mb-5 flex gap-1 overflow-x-auto border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && <OverviewTab />}
      {activeTab === 'System Status' && <SystemStatus />}
      {activeTab === 'Alerts & Notifications' && <Notifications />}
      {activeTab === 'Data Visualization' && <DataVisualization />}
      {activeTab === 'Data Statistics' && <DataStatistics />}
      {activeTab === 'Queueing' && <Queueing />}
      {activeTab === 'Customize Dashboard' && <CustomizeDashboard />}
      {![
        'Overview',
        'System Status',
        'Alerts & Notifications',
        'Data Visualization',
        'Data Statistics',
        'Queueing',
        'Customize Dashboard',
      ].includes(activeTab) && <PlaceholderTab name={activeTab} />}
    </AdminLayout>
  )
}