import React, { useState, useMemo } from 'react';
import { 
  Video,
  BookOpen,
  Clock,
  Calendar,
  Users,
  Search,
  Filter,
  Play,
  Download,
  ExternalLink
} from 'lucide-react';
import { VideoPlayer } from '../components/VideoPlayer';
import { AssignmentViewer } from '../components/AssignmentViewer';
import { LiveClassroom } from '../components/LiveClassroom';
import { Class } from '../components/types';

interface ClassesProps {
  classes: Class[];
}

export function Classes({ classes }: ClassesProps) {
  const [activeTab, setActiveTab] = useState('live');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [joinedClasses, setJoinedClasses] = useState<string[]>([]);
  const [reminders, setReminders] = useState<string[]>([]);
  const [activeClasses, setActiveClasses] = useState<string[]>([]);
  const [activeVideo, setActiveVideo] = useState<{id: string, title: string} | null>(null);
  const [activeAssignment, setActiveAssignment] = useState<{id: string, title: string} | null>(null);
  const [activeLiveClass, setActiveLiveClass] = useState<{title: string} | null>(null);

  const liveClasses = useMemo(() => 
    classes.filter(c => c.status === 'active' || c.status === 'upcoming'),
    [classes]
  );

  const recordedClasses = [
    {
      id: "chem101",
      title: "Organic Chemistry Basics",
      subject: "chemistry",
      level: "beginner",
      description: "Introduction to organic compounds and their properties",
      image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg",
      duration: "1.5 hours",
      lessons: 12,
      videoUrl: "https://example.com/chemistry-basics"
    },
    {
      id: "math201",
      title: "Advanced Calculus",
      subject: "mathematics",
      level: "advanced",
      description: "Differential equations and their applications",
      image: "https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg",
      duration: "2 hours",
      lessons: 15,
      videoUrl: "https://example.com/advanced-calculus"
    },
    {
      id: "phys301",
      title: "Quantum Physics",
      subject: "physics",
      level: "advanced",
      description: "Introduction to quantum mechanics principles",
      image: "https://images.pexels.com/photos/60582/newton-s-cradle-balls-sphere-action-60582.jpeg",
      duration: "2.5 hours",
      lessons: 18,
      videoUrl: "https://example.com/quantum-physics"
    }
  ];

  const assignments = [
    {
      id: "math_assign_1",
      title: "Mathematics Assignment",
      subject: "mathematics",
      level: "advanced",
      description: "Complex Numbers Practice Set",
      dueDate: "Oct 15, 2023",
      estimatedTime: "2 hours",
      downloadUrl: "/assignments/math_complex_numbers.pdf",
      status: "pending"
    },
    {
      id: "phys_assign_1",
      title: "Physics Lab Report",
      subject: "physics",
      level: "intermediate",
      description: "Wave Motion Analysis",
      dueDate: "Oct 16, 2023",
      estimatedTime: "3 hours",
      downloadUrl: "/assignments/physics_wave_motion.pdf",
      status: "pending"
    }
  ];

  const handleJoinClass = (classItem: Class) => {
    if (!joinedClasses.includes(classItem.name)) {
      setJoinedClasses([...joinedClasses, classItem.name]);
      setActiveLiveClass({ title: classItem.name });
      if (classItem.meetLink) {
        window.open(classItem.meetLink, '_blank');
      }
    }
  };

  const handleSetReminder = (classTitle: string) => {
    if (!reminders.includes(classTitle)) {
      setReminders([...reminders, classTitle]);
    } else {
      setReminders(reminders.filter(reminder => reminder !== classTitle));
    }
  };

  const handleStartLearning = (classId: string) => {
    const classItem = recordedClasses.find(item => item.id === classId);
    if (classItem && !activeClasses.includes(classId)) {
      setActiveClasses([...activeClasses, classId]);
      setActiveVideo({ id: classId, title: classItem.title });
    }
  };

  const handleStartAssignment = (assignmentId: string) => {
    const assignment = assignments.find(item => item.id === assignmentId);
    if (assignment) {
      setActiveAssignment({ id: assignmentId, title: assignment.title });
    }
  };

  const handleDownloadAssignment = (assignmentId: string) => {
    const assignment = assignments.find(item => item.id === assignmentId);
    if (assignment) {
      const link = document.createElement('a');
      link.href = assignment.downloadUrl;
      link.download = `${assignment.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <main className="flex-grow pt-20 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Virtual Classroom</h1>
          <p className="text-gray-600">Access live and recorded classes, assignments, and more</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for classes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Subjects</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8">
          <button
            onClick={() => setActiveTab('live')}
            className={`flex-1 py-2.5 px-6 rounded-lg font-medium text-sm ${
              activeTab === 'live'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Live Classes
          </button>
          <button
            onClick={() => setActiveTab('recorded')}
            className={`flex-1 py-2.5 px-6 rounded-lg font-medium text-sm ${
              activeTab === 'recorded'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Recorded Classes
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`flex-1 py-2.5 px-6 rounded-lg font-medium text-sm ${
              activeTab === 'assignments'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Assignments
          </button>
        </div>

        {/* Live Classes */}
        {activeTab === 'live' && liveClasses.length > 0 && (
          <div className="space-y-6">
            {liveClasses.map((classItem) => (
              <div key={classItem.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
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
                    <span className={`px-4 py-1 ${
                      classItem.status === 'active' 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-gray-100 text-gray-600'
                    } rounded-full text-sm font-medium`}>
                      {classItem.status === 'active' ? 'Live Now' : 'Upcoming'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {classItem.schedule}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(classItem.nextClass).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {classItem.students} students
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
                  <button 
                    onClick={() => classItem.status === 'active' 
                      ? handleJoinClass(classItem)
                      : handleSetReminder(classItem.name)
                    }
                    className={`w-full ${
                      classItem.status === 'active'
                        ? joinedClasses.includes(classItem.name)
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-indigo-600 hover:bg-indigo-700'
                        : reminders.includes(classItem.name)
                          ? 'bg-yellow-500 hover:bg-yellow-600'
                          : 'bg-gray-100 hover:bg-gray-200'
                    } ${
                      classItem.status === 'active' || reminders.includes(classItem.name)
                        ? 'text-white'
                        : 'text-gray-600'
                    } py-2 rounded-lg transition duration-300`}
                  >
                    {classItem.status === 'active'
                      ? joinedClasses.includes(classItem.name)
                        ? 'Joined'
                        : 'Join Class Now'
                      : reminders.includes(classItem.name)
                        ? 'Reminder Set'
                        : 'Set Reminder'
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recorded Classes */}
        {activeTab === 'recorded' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recordedClasses.map((classItem) => (
              <div key={classItem.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={classItem.image}
                    alt={`${classItem.title} thumbnail`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{classItem.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{classItem.description}</p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {classItem.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {classItem.lessons} lessons
                    </div>
                  </div>
                  <button 
                    onClick={() => handleStartLearning(classItem.id)}
                    className={`w-full ${
                      activeClasses.includes(classItem.id)
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    } text-white py-2 rounded-lg transition duration-300`}
                  >
                    {activeClasses.includes(classItem.id) ? 'Continue Learning' : 'Start Learning'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Assignments */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-3 rounded-xl">
                        <BookOpen className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                        <p className="text-sm text-gray-600">{assignment.description}</p>
                      </div>
                    </div>
                    <span className="px-4 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm font-medium">
                      Due Tomorrow
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Due: {assignment.dueDate}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      Estimated time: {assignment.estimatedTime}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => handleStartAssignment(assignment.id)}
                      className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                      Start Assignment
                    </button>
                    <button 
                      onClick={() => handleDownloadAssignment(assignment.id)}
                      className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Components */}
        {activeVideo && (
          <VideoPlayer
            videoUrl={recordedClasses.find(c => c.id === activeVideo.id)?.videoUrl || ''}
            title={activeVideo.title}
            onClose={() => setActiveVideo(null)}
          />
        )}

        {activeAssignment && (
          <AssignmentViewer
            title={activeAssignment.title}
            onClose={() => setActiveAssignment(null)}
            onDownload={() => handleDownloadAssignment(activeAssignment.id)}
          />
        )}

        {activeLiveClass && (
          <LiveClassroom
            title={activeLiveClass.title}
            onClose={() => setActiveLiveClass(null)}
          />
        )}
      </div>
    </main>
  );
}

export default Classes;