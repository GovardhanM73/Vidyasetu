import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, Search, Filter, ChevronRight } from 'lucide-react';

function Careers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "5+ years",
      description: "Join our engineering team to build and scale our educational platform..."
    },
    {
      id: 2,
      title: "Content Developer",
      department: "Education",
      location: "Delhi, India",
      type: "Full-time",
      experience: "3+ years",
      description: "Create engaging educational content for our digital learning platform..."
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "4+ years",
      description: "Lead product development initiatives and drive innovation..."
    }
  ];

  return (
    <main className="flex-grow pt-20 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Mission</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us transform education in rural India. Build your career while making a real impact.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-2xl font-bold text-indigo-600 mb-2">50+</div>
            <div className="text-gray-600">Open Positions</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-2xl font-bold text-purple-600 mb-2">4.8/5</div>
            <div className="text-gray-600">Employee Rating</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-2xl font-bold text-pink-600 mb-2">5</div>
            <div className="text-gray-600">Office Locations</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">200+</div>
            <div className="text-gray-600">Team Members</div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="mb-12">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="education">Education</option>
                <option value="product">Product</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Open Positions</h2>
          <div className="space-y-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.department}</p>
                    </div>
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
                      Apply Now
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.type}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {job.experience}
                    </div>
                  </div>
                  <p className="text-gray-600">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Join Edubridge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Career Growth</h3>
              <p className="text-gray-600">
                Continuous learning and development opportunities
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Work</h3>
              <p className="text-gray-600">
                Remote and hybrid work options available
              </p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Work-Life Balance</h3>
              <p className="text-gray-600">
                Flexible hours and generous time off
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Don't see a perfect fit?</h2>
          <p className="text-gray-600 mb-6">
            Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
            Contact Recruiting
          </button>
        </section>
      </div>
    </main>
  );
}

export default Careers;