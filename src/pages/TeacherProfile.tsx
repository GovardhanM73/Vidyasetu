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
  GraduationCap,
  Users,
  Briefcase,
  BarChart2,
  FileText,
  MessageSquare,
  Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function TeacherProfile() {
  const { user } = useAuth();
  
  // Sample teacher data
  const teacherData = {
    name: user?.name || "Dr. Sarah Johnson",
    email: user?.email || "sarah.johnson@edubridge.com",
    phone: user?.phone || "+1 234 567 8900",
    location: user?.location || "New York, USA",
    subjects: ["Mathematics", "Physics"],
    education: "PhD in Mathematics, Harvard University",
    experience: 15,
    bio: user?.bio || "Passionate educator with 15 years of experience in teaching advanced mathematics and physics. Committed to helping students unlock their full potential through innovative teaching methods.",
    totalStudents: 96,
    activeClasses: 3,
    rating: 4.9,
    reviews: 128,
    upcomingSessions: [
      { id: 1, title: "Calculus Review", date: "2023-06-15", time: "10:00 AM", students: 12 },
      { id: 2, title: "Physics Lab", date: "2023-06-16", time: "2:00 PM", students: 8 }
    ],
    recentAnnouncements: [
      { id: 1, title: "Midterm Schedule", date: "2023-06-10", content: "The midterm exam will cover chapters 1-5. Practice problems are now available." },
      { id: 2, title: "Office Hours Change", date: "2023-06-05", content: "My Wednesday office hours will move to 1-3 PM starting next week." }
    ]
  };

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
                  src={user?.avatar || "https://randomuser.me/api/portraits/women/65.jpg"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white"
                />
              </div>
              <div className="mt-20 text-center">
                <h1 className="text-2xl font-bold text-gray-900">{teacherData.name}</h1>
                <p className="text-gray-600">Senior Educator</p>
                <div className="flex items-center justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(teacherData.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-600">({teacherData.reviews})</span>
                </div>
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
                    <p className="text-gray-900">{teacherData.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">{teacherData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900">{teacherData.location}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Education</p>
                    <p className="text-gray-900">{teacherData.education}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Subjects</p>
                    <p className="text-gray-900">{teacherData.subjects.join(", ")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-700">{teacherData.bio}</p>
            </div>

            {/* Overview Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 rounded-lg p-4">
                  <Users className="w-6 h-6 text-indigo-600 mb-2" />
                  <div className="text-2xl font-bold text-indigo-600">{teacherData.totalStudents}</div>
                  <div className="text-sm text-gray-600">Total Students</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <BookOpen className="w-6 h-6 text-purple-600 mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{teacherData.activeClasses}</div>
                  <div className="text-sm text-gray-600">Active Classes</div>
                </div>
                <div className="bg-pink-50 rounded-lg p-4">
                  <Award className="w-6 h-6 text-pink-600 mb-2" />
                  <div className="text-2xl font-bold text-pink-600">{teacherData.experience}</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <Star className="w-6 h-6 text-green-600 mb-2" />
                  <div className="text-2xl font-bold text-green-600">{teacherData.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Teacher Specific Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Sessions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Sessions</h2>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {teacherData.upcomingSessions.map(session => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-3 rounded-lg">
                        <Calendar className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">{session.title}</h3>
                        <p className="text-sm text-gray-600">
                          {session.date} • {session.time} • {session.students} students
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm">
                      Start Session
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Announcements */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Announcements</h2>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {teacherData.recentAnnouncements.map(announcement => (
                  <div key={announcement.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{announcement.date}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="mt-2 text-gray-700">{announcement.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Teaching Statistics */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Teaching Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-indigo-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart2 className="w-6 h-6 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-600">92%</span>
                  </div>
                  <h3 className="font-medium text-gray-900">Completion Rate</h3>
                  <p className="text-sm text-gray-600">Course completion</p>
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600">98%</span>
                  </div>
                  <h3 className="font-medium text-gray-900">Positive Feedback</h3>
                  <p className="text-sm text-gray-600">From students</p>
                </div>

                <div className="bg-pink-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-6 h-6 text-pink-600" />
                    <span className="text-sm font-medium text-pink-600">24</span>
                  </div>
                  <h3 className="font-medium text-gray-900">Resources Shared</h3>
                  <p className="text-sm text-gray-600">This semester</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TeacherProfile;