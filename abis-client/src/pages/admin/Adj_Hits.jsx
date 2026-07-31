import { CaseList } from './adjudicationShared'

const HITS_CASES = [
  {
    id: 'ADJ-2026-0881',
    voter: 'SANTOS, Maria C.',
    type: 'Hits',
    description: 'Watchlist hit — requires manual review',
    age: '2 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0880',
    voter: 'DELA CRUZ, Jose',
    type: 'Hits',
    description: 'Watchlist hit — requires manual review',
    age: '2 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0879',
    voter: 'REYES, Ana M.',
    type: 'Hits',
    description: 'Watchlist hit — requires manual review',
    age: '3 days',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'ADJ-2026-0878',
    voter: 'BAUTISTA, Pedro',
    type: 'Hits',
    description: 'Watchlist hit — requires manual review',
    age: '3 days',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'ADJ-2026-0877',
    voter: 'MENDOZA, Rosa',
    type: 'Hits',
    description: 'Watchlist hit — requires manual review',
    age: '4 days',
    priority: 'low',
    status: 'resolved',
  },
  {
    id: 'ADJ-2026-0876',
    voter: 'GARCIA, Luis',
    type: 'Hits',
    description: 'Watchlist hit — requires manual review',
    age: '5 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0875',
    voter: 'TORRES, Carmen',
    type: 'Hits',
    description: 'Watchlist hit — requires manual review',
    age: '5 days',
    priority: 'medium',
    status: 'resolved',
  },
]

export default function Adj_Hits() {
  return <CaseList cases={HITS_CASES} />
}