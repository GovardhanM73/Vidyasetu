import React from 'react';
import { FileText, Shield, UserCheck, AlertTriangle } from 'lucide-react';

function Terms() {
  return (
    <main className="flex-grow pt-20 pb-8 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="space-y-8">
          {/* Introduction */}
          <section className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900">Introduction</h2>
            </div>
            <p className="text-gray-600 mb-4">
              By accessing and using EduReach's services, you agree to be bound by these Terms of Service. Please read them carefully before proceeding.
            </p>
            <p className="text-gray-600">
              Last updated: March 15, 2024
            </p>
          </section>

          {/* User Responsibilities */}
          <section className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <UserCheck className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900">User Responsibilities</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">As a user of EduReach, you agree to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide accurate and complete information during registration</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the platform for educational purposes only</li>
                <li>Respect intellectual property rights</li>
                <li>Follow community guidelines and maintain appropriate behavior</li>
              </ul>
            </div>
          </section>

          {/* Content Usage */}
          <section className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900">Content Usage</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">The following terms apply to content usage:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>All content is protected by copyright and intellectual property laws</li>
                <li>Users may not distribute or share premium content</li>
                <li>Downloaded content is for personal use only</li>
                <li>Content may not be modified or repurposed without permission</li>
              </ul>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900">Prohibited Activities</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">The following activities are strictly prohibited:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Unauthorized sharing of account credentials</li>
                <li>Posting inappropriate or harmful content</li>
                <li>Attempting to breach platform security</li>
                <li>Using the platform for non-educational purposes</li>
                <li>Harassing other users or staff members</li>
              </ul>
            </div>
          </section>

          {/* Acceptance Box */}
          <div className="bg-indigo-50 p-6 rounded-2xl">
            <p className="text-indigo-600 text-sm">
              By using EduReach's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. For any questions, please contact our legal team at legal@edureach.com
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Terms;