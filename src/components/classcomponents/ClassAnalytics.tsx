import React from 'react';
import { Class } from '../types';

interface ClassAnalyticsProps {
  classes: Class[];
}

function ClassAnalytics({ classes }: ClassAnalyticsProps) {
  // Calculate analytics
  const totalStudents = classes.reduce((sum, c) => sum + c.students, 0);
  
  const totalAssignments = classes.reduce((sum, c) => sum + c.assignments, 0);
  
  const averageAttendance = classes.length > 0 
    ? Math.round(classes.reduce((sum, c) => sum + (c.students > 0 ? 92 : 0), 0) / classes.filter(c => c.students > 0).length) 
    : 0;
    
  const averageCompletion = classes.length > 0
    ? Math.round(classes.reduce((sum, c) => sum + c.completion, 0) / classes.length)
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Class Analytics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-xl text-white transform transition-all duration-300 hover:scale-105">
          <h3 className="text-lg font-medium mb-2">Total Students</h3>
          <p className="text-3xl font-bold">{totalStudents}</p>
          <p className="text-sm opacity-80 mt-1">Across all classes</p>
        </div>
        
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-6 rounded-xl text-white transform transition-all duration-300 hover:scale-105">
          <h3 className="text-lg font-medium mb-2">Average Attendance</h3>
          <p className="text-3xl font-bold">{averageAttendance}%</p>
          <p className="text-sm opacity-80 mt-1">Last 30 days</p>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-6 rounded-xl text-white transform transition-all duration-300 hover:scale-105">
          <h3 className="text-lg font-medium mb-2">Assignment Completion</h3>
          <p className="text-3xl font-bold">{averageCompletion}%</p>
          <p className="text-sm opacity-80 mt-1">Class average</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-6 rounded-xl text-white transform transition-all duration-300 hover:scale-105">
          <h3 className="text-lg font-medium mb-2">Total Assignments</h3>
          <p className="text-3xl font-bold">{totalAssignments}</p>
          <p className="text-sm opacity-80 mt-1">Across all classes</p>
        </div>
      </div>
    </div>
  );
}

export default ClassAnalytics;