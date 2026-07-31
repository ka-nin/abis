import { CaseList } from './adjudicationShared'

const BIOMETRIC_CASES = [
  {
    id: 'ADJ-2026-0881',
    voter: 'SANTOS, Maria C.',
    type: 'Biometric',
    description: 'Fingerprint score below threshold (0.42)',
    age: '2 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0880',
    voter: 'DELA CRUZ, Jose',
    type: 'Biometric',
    description: 'Fingerprint score below threshold (0.42)',
    age: '2 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0879',
    voter: 'REYES, Ana M.',
    type: 'Biometric',
    description: 'Fingerprint score below threshold (0.42)',
    age: '3 days',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'ADJ-2026-0878',
    voter: 'BAUTISTA, Pedro',
    type: 'Biometric',
    description: 'Fingerprint score below threshold (0.42)',
    age: '3 days',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'ADJ-2026-0877',
    voter: 'MENDOZA, Rosa',
    type: 'Biometric',
    description: 'Fingerprint score below threshold (0.42)',
    age: '4 days',
    priority: 'low',
    status: 'resolved',
  },
  {
    id: 'ADJ-2026-0876',
    voter: 'GARCIA, Luis',
    type: 'Biometric',
    description: 'Fingerprint score below threshold (0.42)',
    age: '5 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0875',
    voter: 'TORRES, Carmen',
    type: 'Biometric',
    description: 'Fingerprint score below threshold (0.42)',
    age: '5 days',
    priority: 'medium',
    status: 'resolved',
  },
]

export default function Adj_BioMM() {
  return <CaseList cases={BIOMETRIC_CASES} />
}