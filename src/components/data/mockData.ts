import { Class } from '../types/index';

export const mockClasses: Class[] = [
  {
    id: 1,
    name: 'Advanced Physics',
    subject: 'Physics',
    schedule: 'Mon, Wed, Fri - 2:00 PM',
    students: 45,
    status: 'active',
    nextClass: '2024-03-15T14:00:00',
    completion: 75,
    assignments: 12,
    averageScore: 85,
    meetLink: 'https://meet.google.com/abc-defg-hij'
  },
  {
    id: 2,
    name: 'Organic Chemistry',
    subject: 'Chemistry',
    schedule: 'Tue, Thu - 3:30 PM',
    students: 38,
    status: 'active',
    nextClass: '2024-03-14T15:30:00',
    completion: 60,
    assignments: 8,
    averageScore: 78,
    meetLink: 'https://meet.google.com/klm-nopq-rst'
  },
  {
    id: 3,
    name: 'World History: Modern Era',
    subject: 'History',
    schedule: 'Wed, Fri - 10:00 AM',
    students: 42,
    status: 'active',
    nextClass: '2024-03-15T10:00:00',
    completion: 80,
    assignments: 15,
    averageScore: 82,
    meetLink: 'https://meet.google.com/uvw-xyz1-234'
  },
  {
    id: 4,
    name: 'Introduction to Calculus',
    subject: 'Mathematics',
    schedule: 'Mon, Thu - 1:15 PM',
    students: 50,
    status: 'completed',
    nextClass: '2024-03-18T13:15:00',
    completion: 100,
    assignments: 20,
    averageScore: 88,
    meetLink: 'https://meet.google.com/aaa-bbb-ccc'
  }
];