import { CaseList } from './adjudicationShared'

const INVALID_ID_CASES = [
  {
    id: 'ADJ-2026-0881',
    voter: 'SANTOS, Maria C.',
    type: 'Invalid Id',
    description: 'Provided ID could not be verified with issuer',
    age: '2 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0880',
    voter: 'DELA CRUZ, Jose',
    type: 'Invalid Id',
    description: 'Provided ID could not be verified with issuer',
    age: '2 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0879',
    voter: 'REYES, Ana M.',
    type: 'Invalid Id',
    description: 'Provided ID could not be verified with issuer',
    age: '3 days',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'ADJ-2026-0878',
    voter: 'BAUTISTA, Pedro',
    type: 'Invalid Id',
    description: 'Provided ID could not be verified with issuer',
    age: '3 days',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'ADJ-2026-0877',
    voter: 'MENDOZA, Rosa',
    type: 'Invalid Id',
    description: 'Provided ID could not be verified with issuer',
    age: '4 days',
    priority: 'low',
    status: 'resolved',
  },
  {
    id: 'ADJ-2026-0876',
    voter: 'GARCIA, Luis',
    type: 'Invalid Id',
    description: 'Provided ID could not be verified with issuer',
    age: '5 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0875',
    voter: 'TORRES, Carmen',
    type: 'Invalid Id',
    description: 'Provided ID could not be verified with issuer',
    age: '5 days',
    priority: 'medium',
    status: 'resolved',
  },
]

export default function Adj_InvID() {
  return <CaseList cases={INVALID_ID_CASES} />
}