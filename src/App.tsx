import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Classes from './pages/Classes';
import Resources from './pages/Resources';
import Community from './pages/Community';
import Profile from './pages/Profile';
import TeacherProfile from './pages/TeacherProfile';
import LoginForm from './components/auth/LoginForm';
import ManageClasses from './pages/ManageClasses';
import ManageResources from './pages/ManageResources';
import Privacy from './pages/Privacy'; 
import About from './pages/About';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Blog from './pages/Blog';
import Support from './pages/Support';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import { AuthProvider, useAuth } from './context/AuthContext';
import RegisterForm from './components/auth/RegisterForm';
import { Class } from './components/types';
import { Resource } from './components/types/res';
import { mockClasses } from './components/data/mockData';
import StudentCommunity from './pages/StudentCommunity'
import TeacherCommunity from './pages/TeacherCommunity';
import { CommunityProvider } from './components/context/CommunityContext';
import { StudyGroupProvider } from './components/context/StudyGroupContext';

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

function App() {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Advanced Physics Notes',
      description: 'Comprehensive notes covering mechanics and thermodynamics',
      type: 'Document',
      subject: 'Physics',
      category: 'Physics',
      downloads: 245,
      views: 1200,
      rating: 4.8,
      status: 'published',
      access: 'premium',
      lastUpdated: '2024-03-10',
      author: 'Dr. Sarah Johnson',
      level: 'University',
      isPremium: true,
      formats: ['pdf', 'docx']
    },
    {
      id: '2',
      title: 'Chemistry Lab Manual',
      description: 'Complete guide for practical experiments',
      type: 'PDF',
      subject: 'Chemistry',
      category: 'Chemistry',
      downloads: 189,
      views: 890,
      rating: 4.5,
      status: 'published',
      access: 'free',
      lastUpdated: '2024-03-08',
      author: 'Dr. Emily Williams',
      level: 'High School',
      isPremium: false,
      formats: ['pdf']
    }
  ]);

  const handleAddResource = (newResource: Omit<Resource, 'id' | 'downloads' | 'views' | 'rating'>) => {
    const resource: Resource = {
      ...newResource,
      id: String(resources.length + 1),
      downloads: 0,
      views: 0,
      rating: 0,
      category: newResource.subject,
      isPremium: newResource.access === 'premium',
      formats: newResource.formats || ['pdf'], // Default format
    };
    
    setResources(prev => [...prev, resource]);
  };
  const [classes, setClasses] = useState<Class[]>(mockClasses);

  const handleClassCreated = (newClass: Class) => {
    setClasses([...classes, newClass]);
  };
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/classes"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Classes classes={classes} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resources"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                        <Resources resources={resources} />

                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-classes"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                         <ManageClasses classes={classes} onClassCreated={handleClassCreated} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-resources"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                        <ManageResources resources={resources} onAddResource={handleAddResource} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student-community"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <CommunityProvider>
                    <StudyGroupProvider>
                      <StudentCommunity />
                    </StudyGroupProvider>
                  </CommunityProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher-community"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <CommunityProvider>
                    <StudyGroupProvider>
                      <TeacherCommunity />
                    </StudyGroupProvider>
                  </CommunityProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacherprofile"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherProfile />
                </ProtectedRoute>
              }
            />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/support" element={<Support />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;