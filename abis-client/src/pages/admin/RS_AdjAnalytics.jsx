import { useEffect, useRef, useState } from 'react'
import { AlertTriangleIcon, CheckCircleIcon, ClockIcon, TrendUpIcon } from '../../components/icons'

const ADJUDICATION_STATS = [
  {
    key: 'totalCases',
    label: 'Total Cases',
    value: '12,847',
    icon: AlertTriangleIcon,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    key: 'resolved',
    label: 'Resolved',
    value: '11,204',
    icon: CheckCircleIcon,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    key: 'pending',
    label: 'Pending',
    value: '1,609',
    icon: ClockIcon,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    key: 'resolutionRate',
    label: 'Resolution Rate',
    value: '87.2%',
    icon: TrendUpIcon,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
]

const CASES_BY_TYPE = [
  { label: 'Biometric', value: 4820 },
  { label: 'Duplicates', value: 3280 },
  { label: 'Invalid ID', value: 2380 },
  { label: 'Gov Mismatch', value: 1980 },
  { label: 'Errors', value: 1080 },
  { label: 'Hits', value: 140 },
]
const CHART_TICKS = [0, 1500, 3000, 4500, 6000]
const CHART_MAX = 6000

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

const CHART_H = 260
const PAD_L = 48
const PAD_R = 12
const PAD_T = 12
const PAD_B = 26
const PLOT_H = CHART_H - PAD_T - PAD_B
const BAR_MAX_WIDTH = 56
const DEFAULT_CHART_W = 800

function useContainerWidth() {
  const ref = useRef(null)
  const [width, setWidth] = useState(DEFAULT_CHART_W)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const measured = entries[0]?.contentRect.width
      if (measured) setWidth(measured)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, width]
}

function CasesByTypeChart() {
  const [containerRef, chartW] = useContainerWidth()
  const [hoverIndex, setHoverIndex] = useState(null)
  const plotW = chartW - PAD_L - PAD_R
  const slotWidth = plotW / CASES_BY_TYPE.length
  const barWidth = Math.min(BAR_MAX_WIDTH, slotWidth * 0.5)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">Cases by Type</h2>

      <div ref={containerRef} className="relative mt-4">
        <svg viewBox={`0 0 ${chartW} ${CHART_H}`} className="w-full">
          {CHART_TICKS.map((tick) => {
            const y = PAD_T + PLOT_H - (tick / CHART_MAX) * PLOT_H
            return (
              <g key={tick}>
                <line x1={PAD_L} x2={chartW - PAD_R} y1={y} y2={y} stroke="#e1e0d9" strokeWidth="1" />
                <text x={PAD_L - 8} y={y + 3} textAnchor="end" fontSize="10" fill="#898781">
                  {tick.toLocaleString()}
                </text>
              </g>
            )
          })}

          {CASES_BY_TYPE.map((d, i) => {
            const slotX = PAD_L + i * slotWidth
            const barX = slotX + (slotWidth - barWidth) / 2
            const barHeight = (d.value / CHART_MAX) * PLOT_H
            const barY = PAD_T + PLOT_H - barHeight
            return (
              <g key={d.label} onMouseEnter={() => setHoverIndex(i)} onMouseLeave={() => setHoverIndex(null)}>
                <rect
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={Math.max(barHeight, 2)}
                  rx="4"
                  fill="#1d4ed8"
                  opacity={hoverIndex === null || hoverIndex === i ? 1 : 0.55}
                />
                <rect x={slotX} y={PAD_T} width={slotWidth} height={PLOT_H} fill="transparent" />
                <text x={slotX + slotWidth / 2} y={CHART_H - 6} textAnchor="middle" fontSize="10" fill="#898781">
                  {d.label}
                </text>
              </g>
            )
          })}
        </svg>

        {hoverIndex !== null && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs shadow-lg"
            style={{
              left: `${((PAD_L + hoverIndex * slotWidth + slotWidth / 2) / chartW) * 100}%`,
              top: `${((PAD_T + PLOT_H - (CASES_BY_TYPE[hoverIndex].value / CHART_MAX) * PLOT_H) / CHART_H) * 100}%`,
            }}
          >
            <p className="font-semibold text-slate-900">{CASES_BY_TYPE[hoverIndex].value.toLocaleString()}</p>
            <p className="text-slate-400">{CASES_BY_TYPE[hoverIndex].label}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function RS_AdjAnalytics() {
  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ADJUDICATION_STATS.map(({ key, ...card }) => (
          <StatCard key={key} {...card} />
        ))}
      </div>

      <CasesByTypeChart />
    </div>
  )
}