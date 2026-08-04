import {
  ShieldIcon,
  StarIcon,
  UsersIcon,
  HelpCircleIcon,
  BadgeCheckIcon,
  UserIcon,
  LockIcon,
} from '../../components/icons'

const SECTORAL_CATEGORIES = [
  {
    key: 'pwd',
    label: 'Person with Disability (PWD)',
    value: '1.2M',
    icon: ShieldIcon,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    key: 'seniorCitizen',
    label: 'Senior Citizen (60 years old & above)',
    value: '8.4M',
    icon: StarIcon,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    key: 'iccIp',
    label: 'Indigenous Cultural Community / Indigenous People (ICC/IP)',
    value: '624,800',
    icon: UsersIcon,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    key: 'illiterate',
    label: 'Illiterate / Assisted Voter',
    value: '318,400',
    icon: HelpCircleIcon,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    key: 'lgbtqia',
    label: 'Member of the LGBTQIA+ Community',
    value: '412,900',
    icon: BadgeCheckIcon,
    iconBg: 'bg-pink-50',
    iconColor: 'text-pink-600',
  },
  {
    key: 'soloParent',
    label: 'Solo Parent',
    value: '896,200',
    icon: UserIcon,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    key: 'pdl',
    label: 'Person Deprived of Liberty (PDL)',
    value: '84,200',
    icon: LockIcon,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
  },
]

const PWD_SUBTYPES = [
  { label: 'Deaf / Hard of Hearing', value: '182,400' },
  { label: 'Psychosocial', value: '96,700' },
  { label: 'Intellectual', value: '88,300' },
  { label: 'Speech and Language', value: '54,100' },
  { label: 'Learning', value: '112,600' },
  { label: 'Visual', value: '204,800' },
  { label: 'Mental', value: '61,200' },
  { label: 'Cancer', value: '38,900' },
  { label: 'Physical', value: '298,500' },
  { label: 'Rare Disease', value: '12,700' },
]

function SectoralStatCard({ label, value, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="pr-2 text-sm text-slate-500">{label}</p>
        <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  )
}

export default function RS_SectoralReport() {
  return (
    <div className="max-h-[calc(100vh-260px)] space-y-4 overflow-y-auto pr-1">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Special / Sectoral Voter Categories</h2>
        <p className="mt-1 text-xs text-slate-400">
          Combined legend of all special and sectoral categories captured during registration, matching the
          categories offered on the registration form (Sangguniang Kabataan applicants are limited to PWD,
          Illiterate, Senior Citizen, and ICC/IP).
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SECTORAL_CATEGORIES.map(({ key, ...card }) => (
          <SectoralStatCard key={key} {...card} />
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">PWD Breakdown by Type of Disability</h2>
        <p className="mt-1 text-xs text-slate-400">Sub-classification of registered Persons with Disability.</p>

        <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {PWD_SUBTYPES.map((row) => (
            <li key={row.label} className="flex items-center justify-between border-b border-slate-100 py-2 text-sm">
              <span className="text-slate-600">{row.label}</span>
              <span className="font-semibold text-slate-900">{row.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
