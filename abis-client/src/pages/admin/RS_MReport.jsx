import { useMemo, useRef, useState } from 'react'
import { DownloadIcon, ArchiveIcon, InfoCircleIcon, CheckCircleIcon } from '../../components/icons'

const MIGRATION_STATS = [
  {
    key: 'recordsImported',
    label: 'Records Imported',
    value: '8.4M',
    icon: DownloadIcon,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    key: 'lastBatch',
    label: 'Last Batch',
    value: '85,240',
    icon: ArchiveIcon,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    key: 'errorRate',
    label: 'Error Rate',
    value: '0.8%',
    icon: InfoCircleIcon,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    key: 'dataQuality',
    label: 'Data Quality',
    value: '98.2%',
    icon: CheckCircleIcon,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
]

const MONTHLY_IMPORT_VOLUME = [
  { label: 'Jan', value: 0.78 },
  { label: 'Feb', value: 0.92 },
  { label: 'Mar', value: 1.06 },
  { label: 'Apr', value: 0.9 },
  { label: 'May', value: 1.08 },
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

function MonthlyImportVolumeChart() {
  const svgRef = useRef(null)
  const [hoverIndex, setHoverIndex] = useState(null)

  const points = useMemo(
    () =>
      MONTHLY_IMPORT_VOLUME.map((d, i) => ({
        x: PAD_L + (i / (MONTHLY_IMPORT_VOLUME.length - 1)) * PLOT_W,
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
      <h2 className="text-sm font-semibold text-slate-900">Monthly Import Volume (2026)</h2>

      <div className="relative mt-4">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="w-full"
          onMouseMove={handleMove}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="importVolFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
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

          <path d={areaPath} fill="url(#importVolFill)" stroke="none" />
          <path d={linePath} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {hover && (
            <line x1={hover.x} x2={hover.x} y1={PAD_T} y2={PAD_T + PLOT_H} stroke="#c3c2b7" strokeWidth="1" strokeDasharray="3 3" />
          )}

          {points.map((p, i) => (
            <circle
              key={p.label}
              cx={p.x}
              cy={p.y}
              r={hoverIndex === i ? 5 : 0}
              fill="#10b981"
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

export default function RS_MReport() {
  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MIGRATION_STATS.map(({ key, ...card }) => (
          <StatCard key={key} {...card} />
        ))}
      </div>

      <MonthlyImportVolumeChart />
    </div>
  )
}