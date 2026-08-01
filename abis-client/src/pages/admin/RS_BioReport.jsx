import { useEffect, useRef, useState } from 'react'
import { FingerprintMark, CameraIcon, StarIcon, CheckCircleIcon } from '../../components/icons'

const BIOMETRIC_STATS = [
  {
    key: 'fpEnrolled',
    label: 'FP Enrolled',
    value: '62.1M',
    icon: FingerprintMark,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    key: 'faceEnrolled',
    label: 'Face Enrolled',
    value: '63.8M',
    icon: CameraIcon,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    key: 'avgFpScore',
    label: 'Avg FP Score',
    value: '87.4',
    icon: StarIcon,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    key: 'matchRate',
    label: 'Match Rate',
    value: '97.8%',
    icon: CheckCircleIcon,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
]

const ENROLLMENT_PROGRESS = [
  { label: 'Jan', value: 0.76 },
  { label: 'Feb', value: 0.84 },
  { label: 'Mar', value: 1.02 },
  { label: 'Apr', value: 0.83 },
  { label: 'May', value: 1.14 },
  { label: 'Jun', value: 1.3 },
  { label: 'Jul', value: 1.03 },
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

const CHART_H = 260
const PAD_L = 48
const PAD_R = 12
const PAD_T = 12
const PAD_B = 26
const PLOT_H = CHART_H - PAD_T - PAD_B
const BAR_MAX_WIDTH = 44
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

function EnrollmentProgressChart() {
  const [containerRef, chartW] = useContainerWidth()
  const [hoverIndex, setHoverIndex] = useState(null)
  const plotW = chartW - PAD_L - PAD_R
  const slotWidth = plotW / ENROLLMENT_PROGRESS.length
  const barWidth = Math.min(BAR_MAX_WIDTH, slotWidth * 0.5)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">Biometric Enrollment Progress (2026)</h2>

      <div ref={containerRef} className="relative mt-4">
        <svg viewBox={`0 0 ${chartW} ${CHART_H}`} className="w-full">
          {CHART_TICKS.map((tick) => {
            const y = PAD_T + PLOT_H - (tick / CHART_MAX) * PLOT_H
            return (
              <g key={tick}>
                <line x1={PAD_L} x2={chartW - PAD_R} y1={y} y2={y} stroke="#e1e0d9" strokeWidth="1" />
                <text x={PAD_L - 8} y={y + 3} textAnchor="end" fontSize="10" fill="#898781">
                  {tick.toFixed(1)}M
                </text>
              </g>
            )
          })}

          {ENROLLMENT_PROGRESS.map((d, i) => {
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
                  fill="#10b981"
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
              top: `${((PAD_T + PLOT_H - (ENROLLMENT_PROGRESS[hoverIndex].value / CHART_MAX) * PLOT_H) / CHART_H) * 100}%`,
            }}
          >
            <p className="font-semibold text-slate-900">{ENROLLMENT_PROGRESS[hoverIndex].value.toFixed(2)}M</p>
            <p className="text-slate-400">{ENROLLMENT_PROGRESS[hoverIndex].label}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function RS_BioReport() {
  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BIOMETRIC_STATS.map(({ key, ...card }) => (
          <StatCard key={key} {...card} />
        ))}
      </div>

      <EnrollmentProgressChart />
    </div>
  )
}