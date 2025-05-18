import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  Bell, 
  Calendar, 
  Clock, 
  Award,
  TrendingUp,
  BookCheck,
  CheckCircle,
  Users,
  FileText,
  Edit,
  Plus,
  ChevronRight,
  Upload,
  MessageSquare,
  Search,
  Filter,
  MoreVertical,
  X,
  AlertCircle,
  Check,
  Download,
  ExternalLink,
  Settings,
  Trash2,
  Eye,
  Play,
  Image,
  Link,
  File
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAuth } from '../context/AuthContext';

// Sample data for charts
const learningData = [
  { name: 'Mon', hours: 2, students: 42 },
  { name: 'Tue', hours: 3, students: 38 },
  { name: 'Wed', hours: 4, students: 45 },
  { name: 'Thu', hours: 3, students: 39 },
  { name: 'Fri', hours: 5, students: 44 },
  { name: 'Sat', hours: 6, students: 48 },
  { name: 'Sun', hours: 4, students: 40 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'];

// Initial data structures
const initialClasses = [
  {
    id: 1,
    name: 'Advanced Physics',
    subject: 'Physics',
    schedule: 'Mon, Wed, Fri - 2:00 ',
    description: 'Wave Motion and Optics',
    students: 32,
    status: 'active',
    nextClass: '2024-03-15T14:00:00'
  }
];

const initialAssignments = [
  {
    id: 1,
    title: 'Wave Motion Problems',
    subject: 'Physics',
    dueDate: '2024-03-20',
    description: 'Solve problems 1-10 from Chapter 5',
    status: 'active',
    maxScore: 100
  }
];

const initialResources = [
  {
    id: 1,
    title: 'Wave Motion Notes',
    subject: 'Physics',
    type: 'PDF',
    url: 'https://example.com/notes.pdf',
    uploadDate: '2024-03-10'
  }
];

const initialAnnouncements = [
  {
    id: 1,
    title: 'Upcoming Physics Test',
    content: 'Prepare for Chapter 5 test next week',
    date: '2024-03-10',
    priority: 'high'
  }
];

function DashboardTeacher() {
  const { user } = useAuth();
  
  // State management for data
  const [classes, setClasses] = useState(initialClasses);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [resources, setResources] = useState(initialResources);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  
  // Form states for different modals
  const [newClass, setNewClass] = useState({
    name: '',
    subject: '',
    schedule: '',
    description: ''
  });
  
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    subject: '',
    dueDate: '',
    description: '',
    maxScore: 100
  });
  
  const [newResource, setNewResource] = useState({
    title: '',
    subject: '',
    type: 'PDF',
    file: null,
    description: ''
  });
  
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'normal'
  });

  // UI state management
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New assignment submission from Rahul Sharma", time: "2 mins ago", read: false, type: 'assignment' },
    { id: 2, text: "5 students joined Advanced Physics class", time: "10 mins ago", read: false, type: 'class' },
    { id: 3, text: "Upcoming class reminder: Chemistry at 2 PM", time: "15 mins ago", read: true, type: 'reminder' },
    { id: 4, text: "Low attendance alert in Mathematics class", time: "30 mins ago", read: false, type: 'alert' },
  ]);
  
  const [showQuickActionModal, setShowQuickActionModal] = useState(false);
  const [quickActionType, setQuickActionType] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [analyticsPeriod, setAnalyticsPeriod] = useState('week');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handler functions for data operations
  const handleCreateClass = () => {
    setLoading(true);
    try {
      const newClassData = {
        id: classes.length + 1,
        ...newClass,
        students: 0,
        status: 'active',
        nextClass: new Date().toISOString()
      };
      setClasses([...classes, newClassData]);
      setSuccessMessage('New class created successfully!');
      setShowQuickActionModal(false);
      setNewClass({ name: '', subject: '', schedule: '', description: '' });
      
      // Add notification
      const notification = {
        id: notifications.length + 1,
        text: `New class "${newClassData.name}" has been created`,
        time: 'Just now',
        type: 'class',
        read: false
      };
      setNotifications([notification, ...notifications]);
    } catch (error) {
      setErrorMessage('Failed to create class. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = () => {
    setLoading(true);
    try {
      const newAssignmentData = {
        id: assignments.length + 1,
        ...newAssignment,
        status: 'active',
        submissions: 0
      };
      setAssignments([...assignments, newAssignmentData]);
      setSuccessMessage('New assignment created successfully!');
      setShowQuickActionModal(false);
      setNewAssignment({ title: '', subject: '', dueDate: '', description: '', maxScore: 100 });
      
      // Add notification
      const notification = {
        id: notifications.length + 1,
        text: `New assignment "${newAssignmentData.title}" has been posted`,
        time: 'Just now',
        type: 'assignment',
        read: false
      };
      setNotifications([notification, ...notifications]);
    } catch (error) {
      setErrorMessage('Failed to create assignment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadResource = () => {
    setLoading(true);
    try {
      const newResourceData = {
        id: resources.length + 1,
        ...newResource,
        uploadDate: new Date().toISOString(),
        downloads: 0
      };
      setResources([...resources, newResourceData]);
      setSuccessMessage('Resource uploaded successfully!');
      setShowQuickActionModal(false);
      setNewResource({ title: '', subject: '', type: 'PDF', file: null, description: '' });
      
      // Add notification
      const notification = {
        id: notifications.length + 1,
        text: `New resource "${newResourceData.title}" has been uploaded`,
        time: 'Just now',
        type: 'resource',
        read: false
      };
      setNotifications([notification, ...notifications]);
    } catch (error) {
      setErrorMessage('Failed to upload resource. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAnnouncement = () => {
    setLoading(true);
    try {
      const newAnnouncementData = {
        id: announcements.length + 1,
        ...newAnnouncement,
        date: new Date().toISOString()
      };
      setAnnouncements([...announcements, newAnnouncementData]);
      setSuccessMessage('Announcement posted successfully!');
      setShowQuickActionModal(false);
      setNewAnnouncement({ title: '', content: '', priority: 'normal' });
      
      // Add notification
      const notification = {
        id: notifications.length + 1,
        text: `New announcement: "${newAnnouncementData.title}"`,
        time: 'Just now',
        type: 'announcement',
        read: false
      };
      setNotifications([notification, ...notifications]);
    } catch (error) {
      setErrorMessage('Failed to post announcement. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Modal content based on action type
  const renderModalContent = () => {
    switch (quickActionType) {
      case 'class':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
              <input
                type="text"
                value={newClass.name}
                onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter class name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={newClass.subject}
                onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
              <input
                type="text"
                value={newClass.schedule}
                onChange={(e) => setNewClass({ ...newClass, schedule: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Mon, Wed, Fri - 2:00 PM"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newClass.description}
                onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter class description"
                rows={3}
              />
            </div>
            <button
              onClick={handleCreateClass}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Class'}
            </button>
          </div>
        );

      case 'assignment':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Title</label>
              <input
                type="text"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter assignment title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                value={newAssignment.subject}
                onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Subject</option>
                {classes.map(classItem => (
                  <option key={classItem.id} value={classItem.subject}>
                    {classItem.subject}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={newAssignment.dueDate}
                onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newAssignment.description}
                onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter assignment description"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Score</label>
              <input
                type="number"
                value={newAssignment.maxScore}
                onChange={(e) => setNewAssignment({ ...newAssignment, maxScore: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                min="0"
                max="100"
              />
            </div>
            <button
              onClick={handleCreateAssignment}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Assignment'}
            </button>
          </div>
        );

      case 'resource':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resource Title</label>
              <input
                type="text"
                value={newResource.title}
                onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter resource title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                value={newResource.subject}
                onChange={(e) => setNewResource({ ...newResource, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Subject</option>
                {classes.map(classItem => (
                  <option key={classItem.id} value={classItem.subject}>
                    {classItem.subject}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
              <select
                value={newResource.type}
                onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="PDF">PDF</option>
                <option value="VIDEO">Video</option>
                <option value="LINK">External Link</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e) => setNewResource({ ...newResource, file: e.target.files[0] })}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX up to 10MB
                  </p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newResource.description}
                onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter resource description"
                rows={3}
              />
            </div>
            <button
              onClick={handleUploadResource}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Uploading...' : 'Upload Resource'}
            </button>
          </div>
        );

      case 'announcement':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Announcement Title</label>
              <input
                type="text"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter announcement title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter announcement content"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={newAnnouncement.priority}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <button
              onClick={handleCreateAnnouncement}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Posting...' : 'Post Announcement'}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // Handler functions for UI interactions
  const handleNotificationClick = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  const handleQuickAction = (actionType) => {
    setQuickActionType(actionType);
    setShowQuickActionModal(true);
  };

  const handleFilterChange = (filter) => {
    setClassFilter(filter);
  };

  const handlePeriodChange = (period) => {
    setAnalyticsPeriod(period);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <main className="flex-grow pt-20 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}! 👋</h1>
            <p className="text-gray-600 mt-2">Manage your classes and track student progress</p>
          </div>
          <div className="relative">
            <button 
              className="relative bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
              onClick={() => setShowNotificationPanel(!showNotificationPanel)}
            >
              <Bell className="w-6 h-6 text-gray-600" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 transform translate-x-1 -translate-y-1"></span>
              )}
            </button>
            
            {/* Notifications Panel */}
            {showNotificationPanel && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <button 
                      onClick={() => setShowNotificationPanel(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`p-4 hover:bg-gray-50 cursor-pointer ${
                        !notification.read ? 'bg-indigo-50' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`p-2 rounded-lg ${
                          notification.type === 'assignment' ? 'bg-purple-100 text-purple-600' :
                          notification.type === 'class' ? 'bg-blue-100 text-blue-600' :
                          notification.type === 'reminder' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {notification.type === 'assignment' ? <FileText className="w-5 h-5" /> :
                           notification.type === 'class' ? <Users className="w-5 h-5" /> :
                           notification.type === 'reminder' ? <Clock className="w-5 h-5" /> :
                           <AlertCircle className="w-5 h-5" />}
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm text-gray-900">{notification.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <button 
            onClick={() => handleQuickAction('class')}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Create New Class</p>
                <p className="text-2xl font-bold text-gray-900">+</p>
              </div>
              <Video className="w-8 h-8 text-indigo-600" />
            </div>
          </button>

          <button 
            onClick={() => handleQuickAction('assignment')}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Add Assignment</p>
                <p className="text-2xl font-bold text-gray-900">+</p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </button>

          <button 
            onClick={() => handleQuickAction('resource')}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upload Resource</p>
                <p className="text-2xl font-bold text-gray-900">+</p>
              </div>
              <Upload className="w-8 h-8 text-pink-600" />
            </div>
          </button>

          <button 
            onClick={() => handleQuickAction('announcement')}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Make Announcement</p>
                <p className="text-2xl font-bold text-gray-900">+</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Analytics & Classes */}
          <div className="lg:col-span-2 space-y-8">
            {/* Analytics Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Learning Analytics</h2>
                <select
                  value={analyticsPeriod}
                  onChange={(e) => handlePeriodChange(e.target.value)}
                  className="px-3 py-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={learningData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="students" 
                      stroke="#6366f1" 
                      fill="#818cf8" 
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#8b5cf6" 
                      fill="#a78bfa" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

             {/* Active Classes */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Active Classes</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search classes..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <select
                    value={classFilter}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Classes</option>
                    <option value="active">Active</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {classes.map((classItem) => (
                  <div key={classItem.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="bg-indigo-100 p-3 rounded-lg">
                        <Video className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{classItem.name}</h3>
                        <p className="text-sm text-gray-600">{classItem.description}</p>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {classItem.schedule}
                          <Users className="w-4 h-4 ml-3 mr-1" />
                          {classItem.students} Students
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-white rounded-lg">
                        <Settings className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        Start Class
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Assignments */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Assignments</h2>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <FileText className="w-6 h-6 text-purple-600" />
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
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-white rounded-lg">
                        <Eye className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        Grade
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Performance & Tasks */}
          <div className="space-y-8">
            {/* Recent Resources */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Resources</h2>
              <div className="space-y-4">
                {resources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="bg-pink-100 p-3 rounded-lg">
                        <File className="w-6 h-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{resource.title}</h3>
                        <p className="text-sm text-gray-600">{resource.subject}</p>
                        <p className="text-xs text-gray-500 mt-1">Uploaded: {new Date(resource.uploadDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white rounded-lg">
                      <Download className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Announcements */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Announcements</h2>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        announcement.priority === 'high' 
                          ? 'bg-red-100 text-red-600'
                          : announcement.priority === 'urgent'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-green-100 text-green-600'
                      }`}>
                        {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{announcement.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Posted: {new Date(announcement.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Modal */}
        {showQuickActionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {quickActionType === 'class' ? 'Create New Class' :
                   quickActionType === 'assignment' ? 'Add Assignment' :
                   quickActionType === 'resource' ? 'Upload Resource' :
                   'Make Announcement'}
                </h3>
                <button 
                  onClick={() => setShowQuickActionModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {renderModalContent()}
            </div>
          </div>
        )}

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {errorMessage}
          </div>
        )}
      </div>
    </main>
  );
}

export default DashboardTeacher;