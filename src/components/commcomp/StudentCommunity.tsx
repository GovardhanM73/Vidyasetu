import React, { useState } from 'react';
import { MessageSquare, Users, Award, BookOpen, Calendar } from 'lucide-react';

// Import shared components
import StatsCard from '../shared/StatsCard';
import SearchBar from '../shared/SearchBar';
import Tabs from '../shared/Tabs';
import DiscussionPost from '../shared/DiscussionPost';
import Leaderboard from '../shared/Leaderboard';
import TrendingTopics from '../shared/TrendingTopics';
import QuestionForm from '../shared/QuestionForm';

// Import student specific components
import StudyGroup from './StudyGroup';
import CreateGroupForm from './CreateGroupForm';
import { useCommunity } from '../context/CommunityContext';
import { useStudyGroups } from '../context/StudyGroupContext';

const StudentCommunity: React.FC = () => {
  const [activeTab, setActiveTab] = useState('latest');
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const { questions, addQuestion } = useCommunity();
  const { studyGroups, createGroup } = useStudyGroups();

  // Sample data
  const studentStats = [
    { title: 'Study Groups', value: studyGroups.length.toString(), icon: Users, iconColor: 'text-indigo-600' },
    { title: 'Discussions Joined', value: '47', icon: MessageSquare, iconColor: 'text-purple-600' },
    { title: 'Badges Earned', value: '8', icon: Award, iconColor: 'text-pink-600' },
  ];

  const discussionTabs = ['Latest', 'Popular', 'My Questions'];

  const topStudents = [
    { rank: 1, name: 'Raj Patel', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', points: 5678 },
    { rank: 2, name: 'Aisha Wong', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', points: 5432 },
    { rank: 3, name: 'Leo Kim', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', points: 4987 },
    { rank: 4, name: 'Maya Johnson', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', points: 3654 }
  ];

  const trendingTopics = [
    { name: 'StudyTips', color: 'text-indigo-600' },
    { name: 'ExamPrep', color: 'text-purple-600' },
    { name: 'Chemistry', color: 'text-green-600' },
    { name: 'ComputerScience', color: 'text-blue-600' }
  ];

  const handleQuestionSubmit = (title: string, content: string, tags: string[]) => {
    addQuestion({
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
      author: 'Current Student',
      title,
      content,
      tags,
    });
  };

  const handleCreateGroup = (groupData: {
    name: string;
    subject: string;
    description: string;
    maxMembers: number;
    nextMeeting: string;
  }) => {
    createGroup(groupData);
    setShowCreateGroup(false);
  };

  return (
    <main className="bg-gray-50 min-h-screen pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Community</h1>
          <p className="text-gray-600">Connect with fellow students, join study groups, and get your questions answered</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {studentStats.map((stat, index) => (
            <StatsCard 
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconColor={stat.iconColor}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Discussions */}
          <div className="lg:w-2/3">
            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar placeholder="Search discussions, questions, and study groups..." />
            </div>

            {/* Question Form */}
            <div className="mb-6">
              <QuestionForm onSubmit={handleQuestionSubmit} />
            </div>

            {/* Discussion Tabs */}
            <div className="mb-6">
              <Tabs 
                tabs={discussionTabs} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />
            </div>

            {/* Discussion Posts */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Questions & Discussions</h2>
              {questions.map((post) => (
                <DiscussionPost 
                  key={post.id}
                  {...post}
                />
              ))}
              <div className="flex justify-center mt-6">
                <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center transition-colors duration-200">
                  View more discussions
                </button>
              </div>
            </div>

            {/* Study Groups */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Study Groups</h2>
                <button
                  onClick={() => setShowCreateGroup(true)}
                  className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Create New Group
                </button>
              </div>

              {showCreateGroup ? (
                <div className="mb-6">
                  <CreateGroupForm
                    onSubmit={handleCreateGroup}
                    onCancel={() => setShowCreateGroup(false)}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studyGroups.map((group) => (
                    <StudyGroup 
                      key={group.id}
                      {...group}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Leaderboard & Resources */}
          <div className="lg:w-1/3 space-y-6">
            {/* Top Students Leaderboard */}
            <Leaderboard 
              title="Top Students" 
              users={topStudents} 
            />

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <div className="bg-purple-100 text-purple-600 flex flex-col items-center justify-center w-12 h-12 rounded-lg">
                    <span className="text-sm font-bold">NOV</span>
                    <span className="text-lg font-bold">15</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Math Competition</h3>
                    <p className="text-sm text-gray-600">9:00 AM - 12:00 PM</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="bg-blue-100 text-blue-600 flex flex-col items-center justify-center w-12 h-12 rounded-lg">
                    <span className="text-sm font-bold">NOV</span>
                    <span className="text-lg font-bold">18</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Science Fair Preparation</h3>
                    <p className="text-sm text-gray-600">3:30 PM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <TrendingTopics topics={trendingTopics} />

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-white/20 hover:bg-white/30 rounded-lg p-3 flex flex-col items-center transition-colors duration-200">
                  <MessageSquare className="w-6 h-6 mb-1" />
                  <span className="text-sm">Ask Question</span>
                </button>
                <button className="bg-white/20 hover:bg-white/30 rounded-lg p-3 flex flex-col items-center transition-colors duration-200">
                  <Users className="w-6 h-6 mb-1" />
                  <span className="text-sm">Find Group</span>
                </button>
                <button className="bg-white/20 hover:bg-white/30 rounded-lg p-3 flex flex-col items-center transition-colors duration-200">
                  <BookOpen className="w-6 h-6 mb-1" />
                  <span className="text-sm">Resources</span>
                </button>
                <button className="bg-white/20 hover:bg-white/30 rounded-lg p-3 flex flex-col items-center transition-colors duration-200">
                  <Calendar className="w-6 h-6 mb-1" />
                  <span className="text-sm">Events</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StudentCommunity;