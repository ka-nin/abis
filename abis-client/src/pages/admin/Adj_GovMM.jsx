import { CaseList } from './adjudicationShared'

const GOV_CASES = [
  {
    id: 'ADJ-2026-0881',
    voter: 'SANTOS, Maria C.',
    type: 'Gov',
    description: 'Name mismatch with PSA civil registry record',
    age: '2 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0880',
    voter: 'DELA CRUZ, Jose',
    type: 'Gov',
    description: 'Name mismatch with PSA civil registry record',
    age: '2 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0879',
    voter: 'REYES, Ana M.',
    type: 'Gov',
    description: 'Name mismatch with PSA civil registry record',
    age: '3 days',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'ADJ-2026-0878',
    voter: 'BAUTISTA, Pedro',
    type: 'Gov',
    description: 'Name mismatch with PSA civil registry record',
    age: '3 days',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'ADJ-2026-0877',
    voter: 'MENDOZA, Rosa',
    type: 'Gov',
    description: 'Name mismatch with PSA civil registry record',
    age: '4 days',
    priority: 'low',
    status: 'resolved',
  },
  {
    id: 'ADJ-2026-0876',
    voter: 'GARCIA, Luis',
    type: 'Gov',
    description: 'Name mismatch with PSA civil registry record',
    age: '5 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0875',
    voter: 'TORRES, Carmen',
    type: 'Gov',
    description: 'Name mismatch with PSA civil registry record',
    age: '5 days',
    priority: 'medium',
    status: 'resolved',
  },
]

export default function Adj_GovMM() {
  return <CaseList cases={GOV_CASES} />
}