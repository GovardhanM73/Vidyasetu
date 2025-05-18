import React, { useState, useMemo } from 'react';
import ProgressChart from './ProgressChart';
import { 
  Subject, 
  TimeRange, 
  generateDailyData, 
  generateWeeklyData, 
  generateMonthlyData, 
  generateQuarterlyData 
} from './data/progressData';

const ProgressSection: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>('all');
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');

  const data = useMemo(() => {
    switch (timeRange) {
      case 'daily':
        return generateDailyData();
      case 'weekly':
        return generateWeeklyData();
      case 'monthly':
        return generateMonthlyData();
      case 'quarterly':
        return generateQuarterlyData();
      default:
        return generateDailyData();
    }
  }, [timeRange]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900">Learning Progress</h2>
        <div className="flex flex-wrap gap-4">
          {/* Subject Dropdown */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value as Subject)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Subjects</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="mathematics">Mathematics</option>
          </select>

          {/* Time Range Dropdown */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as TimeRange)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>
      </div>

      <ProgressChart 
        data={data}
        selectedSubject={selectedSubject}
        timeRange={timeRange}
      />
    </div>
  );
};

export default ProgressSection;