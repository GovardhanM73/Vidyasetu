import React, { useState } from 'react';
import { MessageSquare, Users, Award, Lightbulb, BarChart, BookOpen } from 'lucide-react';

// Import shared components
import StatsCard from '../shared/StatsCard';
import SearchBar from '../shared/SearchBar';
import Tabs from '../shared/Tabs';
import DiscussionPost from '../shared/DiscussionPost';
import Leaderboard from '../shared/Leaderboard';
import TrendingTopics from '../shared/TrendingTopics';

// Import teacher specific components
import ResourceCard from './ResourceCard';
import { useCommunity } from '../../context/CommunityContext';

const TeacherCommunity: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [activeResourceTab, setActiveResourceTab] = useState('popular');
  const { questions } = useCommunity();

  // Sample data
  const teacherStats = [
    { title: 'Resources Shared', value: '24', icon: BookOpen, iconColor: 'text-blue-600' },
    { title: 'Colleagues Connected', value: '83', icon: Users, iconColor: 'text-indigo-600' },
    { title: 'Professional Achievements', value: '12', icon: Award, iconColor: 'text-purple-600' },
  ];

  const discussionTabs = ['Discussions', 'Teaching Techniques', 'Professional Development'];
  const resourceTabs = ['Popular', 'Recent', 'My Uploads'];

  const topEducators = [
    { rank: 1, name: 'Dr. Sarah Chen', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', points: 7845 },
    { rank: 2, name: 'Prof. Michael Brown', avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', points: 6932 },
    { rank: 3, name: 'Dr. Lisa Patel', avatar: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', points: 6487 },
    { rank: 4, name: 'Prof. David Wilson', avatar: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', points: 5923 }
  ];

  const trendingTopics = [
    { name: 'ClassroomManagement', color: 'text-blue-600' },
    { name: 'RemoteLearning', color: 'text-indigo-600' },
    { name: 'StudentAssessment', color: 'text-purple-600' },
    { name: 'ProfessionalDevelopment', color: 'text-pink-600' }
  ];

  const teachingResources = [
    {
      title: 'Interactive Chemistry Lab Simulation',
      type: 'presentation',
      author: 'Dr. Sarah Chen',
      downloads: 345,
      rating: 4.8,
      thumbnailUrl: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: 'Calculus Fundamentals Worksheet',
      type: 'worksheet',
      author: 'Prof. Michael Brown',
      downloads: 287,
      rating: 4.6,
      thumbnailUrl: 'https://images.pexels.com/photos/3243090/pexels-photo-3243090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: 'Literature Analysis Framework',
      type: 'lesson plan',
      author: 'Dr. Lisa Patel',
      downloads: 412,
      rating: 4.9,
      thumbnailUrl: 'https://images.pexels.com/photos/4170629/pexels-photo-4170629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  return (
    <main className="bg-gray-50 min-h-screen pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Community</h1>
          <p className="text-gray-600">Collaborate with colleagues, share resources, and enhance your teaching practices</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {teacherStats.map((stat, index) => (
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
              <SearchBar placeholder="Search discussions, resources, and professional development..." />
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
            <div className="space-y-6 mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Questions</h2>
              {questions.map((post) => (
                <DiscussionPost 
                  key={post.id}
                  {...post}
                  showAnswerForm={true}
                />
              ))}
            </div>

            {/* Teaching Resources */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Teaching Resources</h2>
                <button className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                  Upload Resource
                </button>
              </div>
              
              <div className="mb-6">
                <Tabs 
                  tabs={resourceTabs} 
                  activeTab={activeResourceTab} 
                  onTabChange={setActiveResourceTab} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {teachingResources.map((resource, index) => (
                  <ResourceCard 
                    key={index}
                    {...resource}
                  />
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center transition-colors duration-200">
                  Browse all resources
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Top Educators Leaderboard */}
            <Leaderboard 
              title="Top Educators" 
              users={topEducators} 
            />

            {/* Professional Development */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Workshops</h2>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <div className="bg-blue-100 text-blue-600 flex flex-col items-center justify-center w-12 h-12 rounded-lg">
                    <span className="text-sm font-bold">NOV</span>
                    <span className="text-lg font-bold">20</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Technology Integration Workshop</h3>
                    <p className="text-sm text-gray-600">Virtual • 4:00 PM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="bg-purple-100 text-purple-600 flex flex-col items-center justify-center w-12 h-12 rounded-lg">
                    <span className="text-sm font-bold">DEC</span>
                    <span className="text-lg font-bold">05</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Inclusive Teaching Practices</h3>
                    <p className="text-sm text-gray-600">Main Campus • 9:00 AM - 12:00 PM</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-200">
                View all workshops
              </button>
            </div>

            {/* Trending Topics */}
            <TrendingTopics topics={trendingTopics} />

            {/* Teaching Ideas */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Teaching Ideas Spotlight</h2>
              <div className="space-y-4">
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Project-Based Assessment</h3>
                      <p className="text-sm text-gray-700 mt-1">
                        Allow students to demonstrate learning through creative projects instead of traditional tests.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <BarChart className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Data-Driven Instruction</h3>
                      <p className="text-sm text-gray-700 mt-1">
                        Use formative assessment data to personalize your teaching approach for different students.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-white/20 hover:bg-white/30 rounded-lg p-3 flex flex-col items-center transition-colors duration-200">
                  <MessageSquare className="w-6 h-6 mb-1" />
                  <span className="text-sm">New Topic</span>
                </button>
                <button className="bg-white/20 hover:bg-white/30 rounded-lg p-3 flex flex-col items-center transition-colors duration-200">
                  <BookOpen className="w-6 h-6 mb-1" />
                  <span className="text-sm">Share Resource</span>
                </button>
                <button className="bg-white/20 hover:bg-white/30 rounded-lg p-3 flex flex-col items-center transition-colors duration-200">
                  <Users className="w-6 h-6 mb-1" />
                  <span className="text-sm">Find Mentors</span>
                </button>
                <button className="bg-white/20 hover:bg-white/30 rounded-lg p-3 flex flex-col items-center transition-colors duration-200">
                  <Award className="w-6 h-6 mb-1" />
                  <span className="text-sm">Achievements</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TeacherCommunity;