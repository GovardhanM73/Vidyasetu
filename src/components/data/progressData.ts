import { format, subDays, subMonths, startOfMonth, eachDayOfInterval } from 'date-fns';

export type Subject = 'physics' | 'chemistry' | 'mathematics' | 'all';
export type TimeRange = 'daily' | 'weekly' | 'monthly' | 'quarterly';

export interface ProgressData {
  name: string;
  physics?: number;
  chemistry?: number;
  mathematics?: number;
}

// Generate realistic daily data for the last 7 days
export const generateDailyData = (): ProgressData[] => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    return {
      name: format(date, 'EEE'),
      physics: 65 + Math.floor(Math.random() * 25),
      chemistry: 70 + Math.floor(Math.random() * 20),
      mathematics: 75 + Math.floor(Math.random() * 20),
    };
  });
};

// Generate realistic weekly data for the last 4 weeks
export const generateWeeklyData = (): ProgressData[] => {
  return Array.from({ length: 4 }, (_, i) => {
    const weekNumber = 4 - i;
    return {
      name: `Week ${weekNumber}`,
      physics: 60 + Math.floor(Math.random() * 30),
      chemistry: 65 + Math.floor(Math.random() * 25),
      mathematics: 70 + Math.floor(Math.random() * 25),
    };
  });
};

// Generate realistic monthly data
export const generateMonthlyData = (): ProgressData[] => {
  const today = new Date();
  const monthStart = startOfMonth(subMonths(today, 1));
  const monthEnd = today;
  
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  return days.map(date => ({
    name: format(date, 'MMM dd'),
    physics: 60 + Math.floor(Math.random() * 30),
    chemistry: 65 + Math.floor(Math.random() * 25),
    mathematics: 70 + Math.floor(Math.random() * 25),
  }));
};

// Generate realistic quarterly data
export const generateQuarterlyData = (): ProgressData[] => {
  return Array.from({ length: 3 }, (_, i) => {
    const monthsAgo = 2 - i;
    return {
      name: format(subMonths(new Date(), monthsAgo), 'MMM yyyy'),
      physics: 65 + Math.floor(Math.random() * 25),
      chemistry: 70 + Math.floor(Math.random() * 20),
      mathematics: 75 + Math.floor(Math.random() * 20),
    };
  });
};

export const subjectColors = {
  physics: {
    stroke: '#6366f1',
    gradient: 'colorPhysics',
  },
  chemistry: {
    stroke: '#8b5cf6',
    gradient: 'colorChemistry',
  },
  mathematics: {
    stroke: '#ec4899',
    gradient: 'colorMathematics',
  },
};