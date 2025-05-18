import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  Calendar, 
  Clock, 
  Award,
  ChevronRight,
  BookCheck,
  Users,
  Star,
  TrendingUp,
  Bell,
  Search,
  BookmarkPlus,
  MessageSquare,
  Brain,
  Zap,
  Plus
} from 'lucide-react';
import StudyTimer from './../components/StudyTimer';
import StudyGoals from './../components/StudyGoals';
import PeerCollaboration from './../components/PeerCollaboration';
import AITutor from './../components/AITutor';
import ProgressSection from './../components/ProgressSection';
import VideoModal from './../components/VideoModal';
{ /*import Dashboard from './Dashboard'; */}
import { useAuth } from '../context/AuthContext';

function DashboardStudent() {
    const { user } = useAuth();
 // const { user } = { user: { name: "Alex" } }; // Mock user data
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAITutor, setShowAITutor] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const [materials] = useState([
    {
      id: 1,
      title: "Wave Motion Lecture Notes",
      type: "PDF",
      subject: "Physics",
      lastAccessed: new Date(2024, 2, 10)
    },
    {
      id: 2,
      title: "Organic Chemistry Video Lecture",
      type: "Video",
      subject: "Chemistry",
      lastAccessed: new Date(2024, 2, 12)
    },
    {
      id: 3,
      title: "Calculus Practice Problems",
      type: "PDF",
      subject: "Mathematics",
      lastAccessed: new Date(2024, 2, 13)
    }
  ]);

  const [upcomingClasses] = useState([
    {
      id: 1,
      subject: "Physics",
      topic: "Wave Motion",
      time: "2:00 PM",
      teacher: "Dr. Rajesh Kumar",
      duration: "1 hour",
      date: "2024-03-15"
    },
    {
      id: 2,
      subject: "Chemistry",
      topic: "Organic Compounds",
      time: "3:30 PM",
      teacher: "Dr. Priya Sharma",
      duration: "1.5 hours",
      date: "2024-03-15"
    }
  ]);

  const handleAddToCalendar = (classItem: any) => {
    // Create calendar event data
    const event = {
      title: `${classItem.subject} - ${classItem.topic}`,
      description: `Class with ${classItem.teacher}\nDuration: ${classItem.duration}`,
      startTime: `${classItem.date}T${classItem.time}`,
      location: "Online Class"
    };

    // Generate Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&dates=${encodeURIComponent(event.startTime)}/${encodeURIComponent(event.startTime)}`;

    // Open in new tab
    window.open(googleCalendarUrl, '_blank');
  };

  const handleJoinClass = (classItem: any) => {
    setSelectedClass(classItem);
    setShowVideoModal(true);
  };

  const [assignments] = useState([
    {
      id: 1,
      subject: "Mathematics",
      title: "Integration Practice Set",
      dueDate: "2024-03-15",
      status: "pending"
    },
    {
      id: 2,
      subject: "Physics",
      title: "Wave Motion Problems",
      dueDate: "2024-03-16",
      status: "submitted"
    }
  ]);

  const [notifications] = useState([
    { id: 1, text: "New assignment posted in Physics", time: "2 mins ago", read: false },
    { id: 2, text: "Your Math test score is available", time: "1 hour ago", read: false },
    { id: 3, text: "Live class reminder: Chemistry at 3 PM", time: "2 hours ago", read: true },
  ]);

  const filteredMaterials = materials.filter(material =>
    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-grow pt-20 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}! 👋</h1>
            <p className="text-gray-600 mt-2">Track your progress and manage your learning journey</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            
            {/* AI Tutor Button */}
            <button
              onClick={() => setShowAITutor(!showAITutor)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700"
            >
              <Brain className="w-5 h-5 mr-2" />
              AI Tutor
            </button>
            
            {/* Notifications */}
            <div className="relative">
              <button 
                className="relative bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-6 h-6 text-gray-600" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 transform translate-x-1 -translate-y-1"></span>
                )}
              </button>

              {/* Notifications Panel */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg z-50">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-indigo-50' : ''}`}
                      >
                        <p className="text-sm text-gray-900">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-gray-900">92%</p>
              </div>
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">85%</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Tasks</p>
                <p className="text-2xl font-bold text-gray-900">24/30</p>
              </div>
              <BookCheck className="w-8 h-8 text-pink-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Study Hours</p>
                <p className="text-2xl font-bold text-gray-900">18h</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Chart */}
            <ProgressSection />

            {/* Upcoming Classes */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Classes</h2>
              <div className="space-y-4">
                {upcomingClasses.map((classItem) => (
                  <div 
                    key={classItem.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-indigo-100 p-3 rounded-lg">
                        <Video className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{classItem.subject}</h3>
                        <p className="text-sm text-gray-600">{classItem.topic}</p>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {classItem.time} • {classItem.duration}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleAddToCalendar(classItem)}
                        className="px-4 py-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"
                      >
                        Add to Calendar
                      </button>
                      <button 
                        onClick={() => handleJoinClass(classItem)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        Join Class
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Assignments</h2>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  New Assignment
                </button>
              </div>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div 
                    key={assignment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <BookOpen className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                        <p className="text-sm text-gray-600">{assignment.subject}</p>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          Due: {assignment.dueDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        assignment.status === 'submitted' 
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </span>
                      <button className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50">
                        <MessageSquare className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Study Timer */}
            <StudyTimer />

            {/* Study Goals */}
            <StudyGoals />

            {/* AI Tutor */}
            <AITutor isVisible={showAITutor} />

            {/* Peer Collaboration */}
            <PeerCollaboration />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal 
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        classInfo={selectedClass}
      />
    </main>
  );
}

export default DashboardStudent;