import type { SmartCare } from '../types';

export const mockSeedData: SmartCare[] = [
  {
    id: 'sc-seed-001',
    title: 'Air conditioning not working in Room 301',
    description: 'The AC unit in meeting room 301',
    createdAt: '2026-05-26T08:30:00.000Z',
  },
  {
    id: 'sc-seed-002',
    title: 'Printer on 2nd floor out of toner',
    description: 'The HP LaserJet on the second floor is out of black toner. There are urgent documents that need printing for tomorrow\'s board meeting.',
    createdAt: '2026-05-26T10:15:00.000Z',
  },
  {
    id: 'sc-seed-003',
    title: 'Wi-Fi connection dropping in open workspace',
    description: 'Multiple employees in the open workspace area (desks 12–24) are experiencing intermittent Wi-Fi disconnections every 10–15 minutes.',
    createdAt: '2026-05-27T09:00:00.000Z',
  },
  {
    id: 'sc-seed-004',
    title: 'Coffee machine leaking in pantry',
    description: 'The Nespresso machine in the 3rd floor pantry is leaking water from the bottom. Please advise if it needs repair or replacement.',
    createdAt: '2026-05-27T14:20:00.000Z',
  },
  {
    id: 'sc-seed-005',
    title: 'Request for additional monitor at workstation 7',
    description: 'Employee at workstation 7 (Finance department) is requesting a second monitor to improve productivity during month-end reporting.',
    createdAt: '2026-05-28T08:00:00.000Z',
  },
];
