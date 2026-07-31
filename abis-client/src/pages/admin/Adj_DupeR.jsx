import { CaseList } from './adjudicationShared'

const DUPLICATE_CASES = [
  {
    id: 'ADJ-2026-0881',
    voter: 'SANTOS, Maria C.',
    type: 'Duplicates',
    description: 'Possible duplicate record detected',
    age: '2 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0880',
    voter: 'DELA CRUZ, Jose',
    type: 'Duplicates',
    description: 'Possible duplicate record detected',
    age: '2 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0879',
    voter: 'REYES, Ana M.',
    type: 'Duplicates',
    description: 'Possible duplicate record detected',
    age: '3 days',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'ADJ-2026-0878',
    voter: 'BAUTISTA, Pedro',
    type: 'Duplicates',
    description: 'Possible duplicate record detected',
    age: '3 days',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'ADJ-2026-0877',
    voter: 'MENDOZA, Rosa',
    type: 'Duplicates',
    description: 'Possible duplicate record detected',
    age: '4 days',
    priority: 'low',
    status: 'resolved',
  },
  {
    id: 'ADJ-2026-0876',
    voter: 'GARCIA, Luis',
    type: 'Duplicates',
    description: 'Possible duplicate record detected',
    age: '5 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0875',
    voter: 'TORRES, Carmen',
    type: 'Duplicates',
    description: 'Possible duplicate record detected',
    age: '5 days',
    priority: 'medium',
    status: 'resolved',
  },
]

export default function Adj_DupeR() {
  return <CaseList cases={DUPLICATE_CASES} />
}