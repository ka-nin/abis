import { useMemo, useRef, useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { DownloadIcon, RefreshIcon, UsersIcon, TrendUpIcon, XCircleIcon, StarIcon } from '../../components/icons'
import RS_BioReport from './RS_BioReport'
import RS_AdjAnalytics from './RS_AdjAnalytics'
import RS_MReport from './RS_MReport'

const TABS = ['Voter Reports', 'Biometric Reports', 'Adjudication Analytics', 'Migration Reports']

const VOTER_STATS = [
  {
    key: 'totalRegistered',
    label: 'Total Registered',
    value: '65.2M',
    icon: UsersIcon,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    key: 'newThisMonth',
    label: 'New This Month',
    value: '1,203,000',
    icon: TrendUpIcon,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    key: 'deactivated',
    label: 'Deactivated',
    value: '2.1M',
    icon: XCircleIcon,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
  },
  {
    key: 'coverageRate',
    label: 'Coverage Rate',
    value: '94.8%',
    icon: StarIcon,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
]

const MONTHLY_REGISTRATION = [
  { label: 'Jan', value: 0.95 },
  { label: 'Feb', value: 0.98 },
  { label: 'Mar', value: 1.06 },
  { label: 'Apr', value: 0.92 },
  { label: 'May', value: 1.16 },
  { label: 'Jun', value: 1.32 },
  { label: 'Jul', value: 1.28 },
]
const CHART_TICKS = [0, 0.3, 0.7, 1.1, 1.4]
const CHART_MAX = 1.4

function StatCard({ label, value, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
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

const CHART_W = 900
const CHART_H = 260
const PAD_L = 48
const PAD_R = 12
const PAD_T = 12
const PAD_B = 26
const PLOT_W = CHART_W - PAD_L - PAD_R
const PLOT_H = CHART_H - PAD_T - PAD_B

function MonthlyRegistrationChart() {
  const svgRef = useRef(null)
  const [hoverIndex, setHoverIndex] = useState(null)

  const points = useMemo(
    () =>
      MONTHLY_REGISTRATION.map((d, i) => ({
        x: PAD_L + (i / (MONTHLY_REGISTRATION.length - 1)) * PLOT_W,
        y: PAD_T + PLOT_H - (d.value / CHART_MAX) * PLOT_H,
        value: d.value,
        label: d.label,
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
      <h2 className="text-sm font-semibold text-slate-900">Monthly Voter Registration (2026)</h2>

      <div className="relative mt-4">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="w-full"
          onMouseMove={handleMove}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="voterRegFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a78d6" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#2a78d6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {CHART_TICKS.map((tick) => {
            const y = PAD_T + PLOT_H - (tick / CHART_MAX) * PLOT_H
            return (
              <g key={tick}>
                <line x1={PAD_L} x2={CHART_W - PAD_R} y1={y} y2={y} stroke="#e1e0d9" strokeWidth="1" strokeDasharray="3 3" />
                <text x={PAD_L - 8} y={y + 3} textAnchor="end" fontSize="10" fill="#898781">
                  {tick.toFixed(1)}M
                </text>
              </g>
            )
          })}

          {points.map((p) => (
            <text key={p.label} x={p.x} y={CHART_H - 6} textAnchor="middle" fontSize="10" fill="#898781">
              {p.label}
            </text>
          ))}

          <path d={areaPath} fill="url(#voterRegFill)" stroke="none" />
          <path d={linePath} fill="none" stroke="#2a78d6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {hover && (
            <line x1={hover.x} x2={hover.x} y1={PAD_T} y2={PAD_T + PLOT_H} stroke="#c3c2b7" strokeWidth="1" strokeDasharray="3 3" />
          )}

          {points.map((p, i) => (
            <circle
              key={p.label}
              cx={p.x}
              cy={p.y}
              r={hoverIndex === i ? 5 : 0}
              fill="#2a78d6"
              stroke="#ffffff"
              strokeWidth="2"
              className={hoverIndex === i ? 'opacity-100' : 'opacity-0'}
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
            <p className="font-semibold text-slate-900">{hover.value.toFixed(2)}M</p>
            <p className="text-slate-400">{hover.label}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function VoterReportsTab() {
  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {VOTER_STATS.map(({ key, ...card }) => (
          <StatCard key={key} {...card} />
        ))}
      </div>

      <MonthlyRegistrationChart />
    </div>
  )
}

export default function RS_VReport({ onNavigate, onLogout }) {
  const [activeTab, setActiveTab] = useState('Voter Reports')

  return (
    <AdminLayout
      active="reports"
      onNavigate={onNavigate}
      onLogout={onLogout}
      title="Reports & Statistics"
      subtitle="Detailed analytics and downloadable reports"
      headerActions={
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <DownloadIcon className="h-4 w-4" />
            Export All
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <RefreshIcon className="h-4 w-4" />
            Refresh
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

      {activeTab === 'Voter Reports' && <VoterReportsTab />}
      {activeTab === 'Biometric Reports' && <RS_BioReport />}
      {activeTab === 'Adjudication Analytics' && <RS_AdjAnalytics />}
      {activeTab === 'Migration Reports' && <RS_MReport />}
    </AdminLayout>
  )
}