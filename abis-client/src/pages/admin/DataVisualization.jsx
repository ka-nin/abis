import { useEffect, useRef, useState } from 'react'

const WEEKLY_VOLUME = [
  { label: 'Mon', value: 1180 },
  { label: 'Tue', value: 1340 },
  { label: 'Wed', value: 1120 },
  { label: 'Thu', value: 1520 },
  { label: 'Fri', value: 1580 },
  { label: 'Sat', value: 1980 },
  { label: 'Sun', value: 1170 },
]
const WEEKLY_TICKS = [0, 550, 1100, 1650, 2200]

const REGIONAL_DISTRIBUTION = [
  { label: 'NCR', value: 10800 },
  { label: 'Region III', value: 6200 },
  { label: 'Region IV-A', value: 9800 },
  { label: 'Region VII', value: 5300 },
  { label: 'Region XI', value: 4700 },
  { label: 'Region V', value: 4300 },
]
const REGIONAL_TICKS = [0, 3500, 7000, 10500, 14000]

const ENROLLMENT_TYPES = [
  { label: 'Walk-in Registration', value: 68, color: '#1d4ed8' },
  { label: 'Online Pre-registration', value: 20, color: '#10b981' },
  { label: 'Mobile Registration Unit', value: 12, color: '#f59e0b' },
]

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function pieSlicePath(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${cx} ${cy} L ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 0 ${end.x.toFixed(2)} ${end.y.toFixed(2)} Z`
}

const CHART_H = 240
const PAD_L = 44
const PAD_R = 12
const PAD_T = 12
const PAD_B = 26
const PLOT_H = CHART_H - PAD_T - PAD_B
const BAR_MAX_WIDTH = 24
const DEFAULT_CHART_W = 520

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

function BarChart({ data, ticks, max, color }) {
  const [containerRef, chartW] = useContainerWidth()
  const [hoverIndex, setHoverIndex] = useState(null)
  const plotW = chartW - PAD_L - PAD_R
  const slotWidth = plotW / data.length
  // Cap in measured pixel units so bar thickness matches across cards of different widths.
  const barWidth = Math.min(BAR_MAX_WIDTH, slotWidth * 0.5)

  return (
    <div ref={containerRef} className="relative mt-4">
      <svg viewBox={`0 0 ${chartW} ${CHART_H}`} className="w-full">
        {ticks.map((tick) => {
          const y = PAD_T + PLOT_H - (tick / max) * PLOT_H
          return (
            <g key={tick}>
              <line x1={PAD_L} x2={chartW - PAD_R} y1={y} y2={y} stroke="#e1e0d9" strokeWidth="1" />
              <text x={PAD_L - 8} y={y + 3} textAnchor="end" fontSize="10" fill="#898781">
                {tick.toLocaleString()}
              </text>
            </g>
          )
        })}

        {data.map((d, i) => {
          const slotX = PAD_L + i * slotWidth
          const barX = slotX + (slotWidth - barWidth) / 2
          const barHeight = (d.value / max) * PLOT_H
          const barY = PAD_T + PLOT_H - barHeight
          return (
            <g key={d.label} onMouseEnter={() => setHoverIndex(i)} onMouseLeave={() => setHoverIndex(null)}>
              <rect x={barX} y={barY} width={barWidth} height={Math.max(barHeight, 2)} rx="4" fill={color} opacity={hoverIndex === null || hoverIndex === i ? 1 : 0.55} />
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
            top: `${((PAD_T + PLOT_H - (data[hoverIndex].value / max) * PLOT_H) / CHART_H) * 100}%`,
          }}
        >
          <p className="font-semibold text-slate-900">{data[hoverIndex].value.toLocaleString()}</p>
          <p className="text-slate-400">{data[hoverIndex].label}</p>
        </div>
      )}
    </div>
  )
}

function EnrollmentPieChart() {
  const total = ENROLLMENT_TYPES.reduce((sum, s) => sum + s.value, 0)
  const gapDeg = 2
  let cumulative = 0
  const slices = ENROLLMENT_TYPES.map((s) => {
    const span = (s.value / total) * 360
    const startAngle = cumulative + (span > gapDeg ? gapDeg / 2 : 0)
    const endAngle = cumulative + span - (span > gapDeg ? gapDeg / 2 : 0)
    cumulative += span
    return { ...s, startAngle, endAngle }
  })

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 120 120" className="h-44 w-44">
        {slices.map((s) => (
          <path key={s.label} d={pieSlicePath(60, 60, 56, s.startAngle, s.endAngle)} fill={s.color} />
        ))}
      </svg>
      <ul className="mt-4 w-full space-y-2.5">
        {ENROLLMENT_TYPES.map((s) => (
          <li key={s.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              {s.label}
            </span>
            <span className="font-semibold text-slate-900">{s.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function DataVisualization() {
  const weeklyMax = WEEKLY_TICKS[WEEKLY_TICKS.length - 1]
  const regionalMax = REGIONAL_TICKS[REGIONAL_TICKS.length - 1]

  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold text-slate-900">Weekly Registration Volume</h2>
          <BarChart data={WEEKLY_VOLUME} ticks={WEEKLY_TICKS} max={weeklyMax} color="#10b981" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">Enrollment Type Breakdown</h2>
          <div className="mt-2">
            <EnrollmentPieChart />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Regional Distribution</h2>
        <BarChart data={REGIONAL_DISTRIBUTION} ticks={REGIONAL_TICKS} max={regionalMax} color="#1d4ed8" />
      </div>
    </div>
  )
}