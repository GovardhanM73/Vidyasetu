import React from 'react';
import { Resource } from '../App';

interface ResourceAnalyticsProps {
  resources: Resource[];
}

const ResourceAnalytics: React.FC<ResourceAnalyticsProps> = ({ resources }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Resource Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-xl text-white transform transition duration-300 hover:scale-105">
          <h3 className="text-lg font-medium mb-2">Total Resources</h3>
          <p className="text-3xl font-bold">{resources.length}</p>
          <p className="text-sm opacity-80 mt-1">Across all subjects</p>
        </div>
        
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-6 rounded-xl text-white transform transition duration-300 hover:scale-105">
          <h3 className="text-lg font-medium mb-2">Total Downloads</h3>
          <p className="text-3xl font-bold">
            {resources.reduce((sum, resource) => sum + resource.downloads, 0)}
          </p>
          <p className="text-sm opacity-80 mt-1">Last 30 days</p>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-6 rounded-xl text-white transform transition duration-300 hover:scale-105">
          <h3 className="text-lg font-medium mb-2">Average Rating</h3>
          <p className="text-3xl font-bold">
            {(resources.reduce((sum, resource) => sum + resource.rating, 0) / resources.length).toFixed(1)}
          </p>
          <p className="text-sm opacity-80 mt-1">From {resources.length} resources</p>
        </div>
      </div>
    </div>
  );
};

export default ResourceAnalytics;