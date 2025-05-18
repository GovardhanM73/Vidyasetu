import React from 'react';
import { Video, Users, Calendar, FileText, CheckCircle, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Class } from '../types';

interface ClassCardProps {
  classItem: Class;
  onDelete: (id: number) => void;
}

function ClassCard({ classItem, onDelete }: ClassCardProps) {
  const handleManageClick = () => {
    if (classItem.meetLink) {
      window.open(classItem.meetLink, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 p-3 rounded-xl">
              <Video className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{classItem.name}</h3>
              <p className="text-sm text-gray-600">{classItem.subject}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit class"
            >
              <Edit className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Delete class"
              onClick={() => onDelete(classItem.id)}
            >
              <Trash2 className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            {classItem.students} Students
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {classItem.schedule}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FileText className="w-4 h-4 mr-2" />
            {classItem.assignments} Assignments
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 mr-2" />
            {classItem.completion}% Complete
          </div>
        </div>

        {classItem.meetLink && (
          <div className="mb-4 bg-blue-50 p-3 rounded-lg flex items-center justify-between">
            <span className="text-sm text-blue-700 font-medium">Google Meet Available</span>
            <a 
              href={classItem.meetLink} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Join
            </a>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            classItem.status === 'active' 
              ? 'bg-green-100 text-green-600'
              : classItem.status === 'upcoming'
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-gray-100 text-gray-600'
          }`}>
            {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
          </span>
          <button 
            onClick={handleManageClick}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Manage Class
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClassCard;