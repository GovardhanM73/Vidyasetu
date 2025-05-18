import React from 'react';
import { Download, BookOpen, Star, FileText } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  type: 'document' | 'presentation' | 'worksheet' | 'lesson plan';
  author: string;
  downloads: number;
  rating: number;
  thumbnailUrl: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  type,
  author,
  downloads,
  rating,
  thumbnailUrl,
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'document':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'presentation':
        return <BookOpen className="w-5 h-5 text-purple-500" />;
      case 'worksheet':
        return <FileText className="w-5 h-5 text-green-500" />;
      case 'lesson plan':
        return <BookOpen className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="h-36 overflow-hidden">
        <img 
          src={thumbnailUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          {getTypeIcon()}
          <span className="text-xs font-medium text-gray-600 capitalize">{type}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">By {author}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-600">
            <Download className="w-4 h-4" />
            <span className="text-sm">{downloads}</span>
          </div>
          
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-200">
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;