import { CaseList } from './adjudicationShared'

const ERROR_CASES = [
  {
    id: 'ADJ-2026-0881',
    voter: 'SINTOS, Ana A.',
    type: 'Errors',
    description: 'System error during biometric capture session',
    age: '2 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0880',
    voter: 'DE GUZMAN, Suzan C.',
    type: 'Errors',
    description: 'System error during biometric capture session',
    age: '2 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0879',
    voter: 'CRUZ, Alyssa Mae',
    type: 'Errors',
    description: 'System error during biometric capture session',
    age: '3 days',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'ADJ-2026-0878',
    voter: 'BAUTISTA, Pedro',
    type: 'Errors',
    description: 'System error during biometric capture session',
    age: '3 days',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'ADJ-2026-0877',
    voter: 'MENDOZA, Rosa',
    type: 'Errors',
    description: 'System error during biometric capture session',
    age: '4 days',
    priority: 'low',
    status: 'resolved',
  },
  {
    id: 'ADJ-2026-0876',
    voter: 'GARCIA, Luis',
    type: 'Errors',
    description: 'System error during biometric capture session',
    age: '5 days',
    priority: 'high',
    status: 'open',
  },
  {
    id: 'ADJ-2026-0875',
    voter: 'TORRES, Carmen',
    type: 'Errors',
    description: 'System error during biometric capture session',
    age: '5 days',
    priority: 'medium',
    status: 'resolved',
  },
]

export default function Adj_Errors() {
  return <CaseList cases={ERROR_CASES} />
}