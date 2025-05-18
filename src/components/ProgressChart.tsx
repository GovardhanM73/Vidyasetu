import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { Subject, TimeRange, ProgressData, subjectColors } from './data/progressData';

interface ProgressChartProps {
  data: ProgressData[];
  selectedSubject: Subject;
  timeRange: TimeRange;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ 
  data, 
  selectedSubject, 
  timeRange 
}) => {
  const showAllSubjects = selectedSubject === 'all';

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPhysics" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorChemistry" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorMathematics" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
            interval={timeRange === 'monthly' ? 'preserveEnd' : 0}
            angle={timeRange === 'monthly' ? -45 : 0}
            textAnchor={timeRange === 'monthly' ? 'end' : 'middle'}
            height={60}
          />
          <YAxis 
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(value) => [`${value}%`]}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            formatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
          />
          
          {(showAllSubjects || selectedSubject === 'physics') && (
            <Area
              type="monotone"
              dataKey="physics"
              stroke={subjectColors.physics.stroke}
              fill={`url(#${subjectColors.physics.gradient})`}
              strokeWidth={2}
            />
          )}
          {(showAllSubjects || selectedSubject === 'chemistry') && (
            <Area
              type="monotone"
              dataKey="chemistry"
              stroke={subjectColors.chemistry.stroke}
              fill={`url(#${subjectColors.chemistry.gradient})`}
              strokeWidth={2}
            />
          )}
          {(showAllSubjects || selectedSubject === 'mathematics') && (
            <Area
              type="monotone"
              dataKey="mathematics"
              stroke={subjectColors.mathematics.stroke}
              fill={`url(#${subjectColors.mathematics.gradient})`}
              strokeWidth={2}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;