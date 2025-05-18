import React from 'react';
import { BookOpen, Users, Award, Globe } from 'lucide-react';

function About() {
  return (
    <main className="flex-grow pt-20 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Edubridge</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering rural India through accessible, quality education
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To bridge the educational gap in rural India by providing accessible, high-quality digital learning resources and connecting students with expert educators.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              A future where every student in India has equal access to quality education, regardless of their geographical location or economic background.
            </p>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white">
            <BookOpen className="w-8 h-8 mb-4" />
            <p className="text-3xl font-bold">10,000+</p>
            <p className="text-sm opacity-90">Students Reached</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl text-white">
            <Users className="w-8 h-8 mb-4" />
            <p className="text-3xl font-bold">500+</p>
            <p className="text-sm opacity-90">Expert Teachers</p>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-red-600 p-6 rounded-2xl text-white">
            <Award className="w-8 h-8 mb-4" />
            <p className="text-3xl font-bold">1,000+</p>
            <p className="text-sm opacity-90">Courses Created</p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-orange-600 p-6 rounded-2xl text-white">
            <Globe className="w-8 h-8 mb-4" />
            <p className="text-3xl font-bold">100+</p>
            <p className="text-sm opacity-90">Rural Districts</p>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                alt="CEO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900">Rajesh Kumar</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                alt="COO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900">Priya Sharma</h3>
              <p className="text-gray-600">Chief Operations Officer</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                alt="CTO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900">Amit Patel</h3>
              <p className="text-gray-600">Chief Technology Officer</p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
          <p className="text-gray-600 mb-6">
            Whether you're an educator, student, or supporter, there are many ways to get involved.
          </p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
            Contact Us
          </button>
        </section>
      </div>
    </main>
  );
}

export default About;