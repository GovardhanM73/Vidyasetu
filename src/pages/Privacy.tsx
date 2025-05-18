import React from 'react';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

function Privacy() {
  return (
    <main className="flex-grow pt-20 pb-8 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          {/* Introduction */}
          <section className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900">Introduction</h2>
            </div>
            <p className="text-gray-600 mb-4">
              At EduReach, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
            </p>
          </section>

          {/* Data Collection */}
          <section className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900">Data Collection</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">We collect the following types of information:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Personal identification information (Name, email address, phone number)</li>
                <li>Educational information (Course progress, assignments, grades)</li>
                <li>Usage data (How you interact with our platform)</li>
                <li>Technical data (IP address, browser type, device information)</li>
              </ul>
            </div>
          </section>

          {/* Data Usage */}
          <section className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-pink-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900">How We Use Your Data</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">Your data helps us:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide and improve our educational services</li>
                <li>Personalize your learning experience</li>
                <li>Communicate important updates and information</li>
                <li>Analyze and improve our platform's performance</li>
              </ul>
            </div>
          </section>

          {/* Data Protection */}
          <section className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <UserCheck className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900">Data Protection</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-indigo-600">
                For any privacy-related concerns, please contact our Data Protection Officer at privacy@edureach.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Privacy;