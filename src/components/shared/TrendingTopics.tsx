import React from 'react';
import { TrendingUp } from 'lucide-react';

interface TrendingTopic {
  name: string;
  color: string;
}

interface TrendingTopicsProps {
  topics: TrendingTopic[];
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ topics }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Trending Topics</h2>
      <div className="space-y-3">
        {topics.map((topic, index) => (
          <div key={index} className="flex items-center space-x-2">
            <TrendingUp className={`w-5 h-5 ${topic.color}`} />
            <span className="text-gray-600">#{topic.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;