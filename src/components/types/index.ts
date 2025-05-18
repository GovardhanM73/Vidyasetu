export interface Class {
  id: number;
  name: string;
  subject: string;
  schedule: string;
  students: number;
  status: 'active' | 'completed' | 'upcoming';
  nextClass: string;
  completion: number;
  assignments: number;
  averageScore: number;
  meetLink?: string;
}

export interface NewClassData {
  name: string;
  subject: string;
  schedule: string;
  startDate: string;
  startTime: string;
  duration: number;
  description: string;
}