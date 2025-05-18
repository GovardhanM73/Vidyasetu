import React, { createContext, useContext, useState } from 'react';

export type JoinStatus = 'joined' | 'open' | 'full';

export interface StudyGroup {
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
  joinedStatus: JoinStatus;
  createdAt: string;
}

interface StudyGroupContextType {
  studyGroups: StudyGroup[];
  createGroup: (group: Omit<StudyGroup, 'id' | 'createdAt' | 'joinedStatus' | 'members'>) => void;
  joinGroup: (groupId: string) => void;
  leaveGroup: (groupId: string) => void;
}

const StudyGroupContext = createContext<StudyGroupContextType | undefined>(undefined);

export function StudyGroupProvider({ children }: { children: React.ReactNode }) {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([
    {
      id: '1',
      name: 'Advanced Calculus Group',
      subject: 'Mathematics',
      description: 'Deep dive into advanced calculus concepts and problem-solving techniques.',
      members: [
        {
          id: '1',
          name: 'Sarah Chen',
          avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
          role: 'leader'
        }
      ],
      maxMembers: 15,
      nextMeeting: 'Tomorrow, 4:00 PM',
      joinedStatus: 'open',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Physics Study Circle',
      subject: 'Physics',
      description: 'Weekly discussions on physics concepts and exam preparation.',
      members: [
        {
          id: '2',
          name: 'Michael Brown',
          avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
          role: 'leader'
        }
      ],
      maxMembers: 10,
      nextMeeting: 'Monday, 5:30 PM',
      joinedStatus: 'open',
      createdAt: new Date().toISOString()
    }
  ]);

  const createGroup = (newGroup: Omit<StudyGroup, 'id' | 'createdAt' | 'joinedStatus' | 'members'>) => {
    const group: StudyGroup = {
      id: Math.random().toString(36).substr(2, 9),
      members: [
        {
          id: 'current-user',
          name: 'Current User',
          avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
          role: 'leader'
        }
      ],
      joinedStatus: 'open',
      createdAt: new Date().toISOString(),
      ...newGroup,
    };
    setStudyGroups(prev => [group, ...prev]);
  };

  const joinGroup = (groupId: string) => {
    setStudyGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        const newMembers = [...group.members, {
          id: 'current-user',
          name: 'Current User',
          avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
          role: 'member'
        }];
        return {
          ...group,
          members: newMembers,
          joinedStatus: newMembers.length >= group.maxMembers ? 'full' : 'joined'
        };
      }
      return group;
    }));
  };

  const leaveGroup = (groupId: string) => {
    setStudyGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        const newMembers = group.members.filter(member => member.id !== 'current-user');
        return {
          ...group,
          members: newMembers,
          joinedStatus: 'open'
        };
      }
      return group;
    }));
  };

  return (
    <StudyGroupContext.Provider value={{ studyGroups, createGroup, joinGroup, leaveGroup }}>
      {children}
    </StudyGroupContext.Provider>
  );
}

export function useStudyGroups() {
  const context = useContext(StudyGroupContext);
  if (context === undefined) {
    throw new Error('useStudyGroups must be used within a StudyGroupProvider');
  }
  return context;
}