import React from 'react';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Book,
  Award,
  Settings,
  Edit,
  Clock,
  Calendar,
  BookOpen,
  GraduationCap
} from 'lucide-react';

import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';

function Profile() {
      const { user } = useAuth();
  
  return (
    <main className="flex-grow pt-20 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-600">
            <button className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md hover:bg-gray-50">
              <Edit className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col items-center">
              <div className="absolute -top-16">
                <img
                  src={user?.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white"
                />
              </div>
              <div className="mt-20 text-center">
                <h1 className="text-2xl font-bold text-gray-900"> {user?.name}</h1>
                <p className="text-gray-600">Student</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">{user?.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900">{user?.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <GraduationCap className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-gray-900 font-medium">Class 12 Science</p>
                    <p className="text-gray-600">Mumbai Public School</p>
                    <p className="text-sm text-gray-500">2022 - Present</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Progress & Activities */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-indigo-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Book className="w-6 h-6 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-600">75%</span>
                  </div>
                  <h3 className="font-medium text-gray-900">Courses Completed</h3>
                  <p className="text-sm text-gray-600">15 of 20 courses</p>
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="w-6 h-6 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600">120h</span>
                  </div>
                  <h3 className="font-medium text-gray-900">Learning Hours</h3>
                  <p className="text-sm text-gray-600">This month</p>
                </div>

                <div className="bg-pink-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Award className="w-6 h-6 text-pink-600" />
                    <span className="text-sm font-medium text-pink-600">12</span>
                  </div>
                  <h3 className="font-medium text-gray-900">Certificates</h3>
                  <p className="text-sm text-gray-600">Earned</p>
                </div>
              </div>
            </div>

            {/* Current Courses */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Courses</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="bg-indigo-100 p-3 rounded-lg">
                      <BookOpen className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">Advanced Mathematics</h3>
                      <p className="text-sm text-gray-600">75% Complete</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Continue
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <BookOpen className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">Physics</h3>
                      <p className="text-sm text-gray-600">45% Complete</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    Continue
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900">Completed "Introduction to Calculus"</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Book className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900">Started "Organic Chemistry Basics"</p>
                    <p className="text-sm text-gray-500">Yesterday</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900">Scheduled tutoring session</p>
                    <p className="text-sm text-gray-500">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;