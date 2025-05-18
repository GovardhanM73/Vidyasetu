import React, { useState } from 'react';
import { 
  MessageSquare,
  Users,
  Award,
  Search,
  ThumbsUp,
  MessageCircle,
  Share2,
  User,
  TrendingUp
} from 'lucide-react';

function Community() {
  const [activeTab, setActiveTab] = useState('discussions');

  return (
    <main className="flex-grow pt-20 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Community</h1>
          <p className="text-gray-600">Connect, share, and learn with fellow students</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Members</p>
                <p className="text-2xl font-bold text-gray-900">2,547</p>
              </div>
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Discussions</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
              <MessageSquare className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Questions Solved</p>
                <p className="text-2xl font-bold text-gray-900">8,567</p>
              </div>
              <Award className="w-8 h-8 text-pink-600" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Discussions */}
          <div className="lg:w-2/3">
            {/* Search Bar */}
            <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Discussion Tabs */}
            <div className="bg-white rounded-xl shadow-lg mb-6">
              <div className="flex p-2">
                <button
                  onClick={() => setActiveTab('discussions')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                    activeTab === 'discussions'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Recent Discussions
                </button>
                <button
                  onClick={() => setActiveTab('trending')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                    activeTab === 'trending'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Trending
                </button>
                <button
                  onClick={() => setActiveTab('unanswered')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                    activeTab === 'unanswered'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Unanswered
                </button>
              </div>
            </div>

            {/* Discussion Posts */}
            <div className="space-y-6">
              {/* Discussion Post */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-start space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
                    alt="User avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Help with Integration Problem</h3>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      I'm struggling with this integration problem. Can someone help me understand the steps?
                    </p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-500 hover:text-indigo-600">
                        <ThumbsUp className="w-5 h-5 mr-1" />
                        <span>24</span>
                      </button>
                      <button className="flex items-center text-gray-500 hover:text-indigo-600">
                        <MessageCircle className="w-5 h-5 mr-1" />
                        <span>12</span>
                      </button>
                      <button className="flex items-center text-gray-500 hover:text-indigo-600">
                        <Share2 className="w-5 h-5 mr-1" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* More discussion posts... */}
            </div>
          </div>

          {/* Right Column - Leaderboard & Mentors */}
          <div className="lg:w-1/3 space-y-6">
            {/* Leaderboard */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Contributors</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-100 w-8 h-8 rounded-full flex items-center justify-center text-yellow-600 font-semibold">
                      1
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
                      alt="User avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium text-gray-900">Priya Sharma</span>
                  </div>
                  <span className="text-sm text-gray-600">2,345 pts</span>
                </div>
                {/* More leaderboard entries... */}
              </div>
            </div>

            {/* Available Mentors */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Mentors</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                      alt="Mentor avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Dr. Rajesh Kumar</p>
                      <p className="text-sm text-gray-600">Physics Expert</p>
                    </div>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                    Message
                  </button>
                </div>
                {/* More mentor entries... */}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Trending Topics</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-pink-600" />
                  <span className="text-gray-600">#Mathematics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-600">#Physics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-600">#Chemistry</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Community;