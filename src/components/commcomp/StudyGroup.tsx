import React from 'react';
import { Users, Calendar, BookOpen } from 'lucide-react';
import { useStudyGroups } from '../context/StudyGroupContext';

interface StudyGroupProps {
  id: string;
  name: string;
  subject: string;
  description: string;
  members: {
    id: string;
    name: string;
    avatar: string;
    role: 'leader' | 'member';
  }[];
  maxMembers: number;
  nextMeeting: string;
  joinedStatus: 'joined' | 'open' | 'full';
}

const StudyGroup: React.FC<StudyGroupProps> = ({
  id,
  name,
  subject,
  description,
  members,
  maxMembers,
  nextMeeting,
  joinedStatus,
}) => {
  const { joinGroup, leaveGroup } = useStudyGroups();

  const handleJoinLeave = () => {
    if (joinedStatus === 'joined') {
      leaveGroup(id);
    } else if (joinedStatus === 'open') {
      joinGroup(id);
    }
  };

  const getStatusButton = () => {
    switch (joinedStatus) {
      case 'joined':
        return (
          <button
            onClick={handleJoinLeave}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors duration-200"
          >
            Leave Group
          </button>
        );
      case 'full':
        return (
          <button disabled className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed">
            Full ({members.length}/{maxMembers})
          </button>
        );
      case 'open':
        return (
          <button
            onClick={handleJoinLeave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
          >
            Join Group ({members.length}/{maxMembers})
          </button>
        );
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        {getStatusButton()}
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="flex items-center space-x-2 text-gray-600 mb-2">
        <BookOpen className="w-4 h-4" />
        <span>{subject}</span>
      </div>
      
      <div className="flex items-center space-x-2 text-gray-600 mb-4">
        <Calendar className="w-4 h-4" />
        <span>Next meeting: {nextMeeting}</span>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Members</h4>
        <div className="flex flex-wrap gap-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-full"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-4 h-4 rounded-full"
              />
              <span className="text-sm text-gray-600">{member.name}</span>
              {member.role === 'leader' && (
                <span className="text-xs text-indigo-600">(Leader)</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyGroup;