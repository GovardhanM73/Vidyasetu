import React, { useState } from 'react';
import { BookOpen, Download, Search, Filter, Star, Lock, ChevronDown, Share2, Heart, FileText, FileSpreadsheet, Presentation as FilePresentation, FileCheck, X, CreditCard } from 'lucide-react';
import { Resource } from '../components/types/res';

interface ResourcesProps {
  resources: Resource[];
}

function Resources({ resources }: ResourcesProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-4 h-4" />;
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheet className="w-4 h-4" />;
      case 'pptx':
      case 'ppt':
        return <FilePresentation className="w-4 h-4" />;
      default:
        return <FileCheck className="w-4 h-4" />;
    }
  };

  const toggleFavorite = (resourceId: string) => {
    setFavorites(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const handleDownload = (resource: Resource) => {
    if (!resource.fileData) return;

    const link = document.createElement('a');
    link.href = resource.fileData;
    link.download = `${resource.title}.${resource.formats?.[0] || 'pdf'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareResource = async (resource: Resource) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: resource.title,
          text: resource.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const ResourceModal = ({ resource, onClose }: { resource: Resource, onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{resource.title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600">{resource.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Category:</span>
              <span className="ml-2 font-medium">{resource.category}</span>
            </div>
            <div>
              <span className="text-gray-500">Author:</span>
              <span className="ml-2 font-medium">{resource.author}</span>
            </div>
            <div>
              <span className="text-gray-500">Level:</span>
              <span className="ml-2 font-medium">{resource.level}</span>
            </div>
            <div>
              <span className="text-gray-500">Last Updated:</span>
              <span className="ml-2 font-medium">{resource.lastUpdated}</span>
            </div>
            <div>
              <span className="text-gray-500">File Size:</span>
              <span className="ml-2 font-medium">{resource.fileSize}</span>
            </div>
            <div>
              <span className="text-gray-500">Downloads:</span>
              <span className="ml-2 font-medium">{resource.downloads}</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Available Formats</h3>
            <div className="flex flex-wrap gap-2">
              {resource.formats?.map(format => (
                <button
                  key={format}
                  onClick={() => handleDownload(resource)}
                  disabled={!resource.fileData}
                  className={`flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg transition duration-300 ${
                    !resource.fileData
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'hover:bg-gray-50 text-indigo-600'
                  }`}
                >
                  {getFormatIcon(format)}
                  <span className="uppercase">{format}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => shareResource(resource)}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ResourceCard = ({ resource }: { resource: Resource }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`${resource.isPremium ? 'bg-purple-100' : 'bg-indigo-100'} p-3 rounded-xl`}>
            <BookOpen className={`w-6 h-6 ${resource.isPremium ? 'text-purple-600' : 'text-indigo-600'}`} />
          </div>
          <div className="flex items-center gap-2">
            {resource.isPremium && <Lock className="w-5 h-5 text-purple-600" />}
            <button 
              onClick={() => toggleFavorite(resource.id)}
              className="hover:bg-gray-100 p-1 rounded-full transition-colors"
            >
              <Heart 
                className={`w-5 h-5 ${
                  favorites.includes(resource.id) 
                    ? 'text-red-500 fill-current' 
                    : 'text-gray-400'
                }`} 
              />
            </button>
          </div>
        </div>
        
        <div 
          className="cursor-pointer"
          onClick={() => {
            setSelectedResource(resource);
            setShowModal(true);
          }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-500">{resource.author}</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-500">{resource.level}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{resource.rating}</span>
          </div>
          {resource.isPremium ? (
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
              Buy Now
            </button>
          ) : (
            <div className="flex gap-2">
              {resource.formats?.slice(0, 2).map(format => (
                <button
                  key={format}
                  onClick={() => handleDownload(resource)}
                  disabled={!resource.fileData}
                  className={`flex items-center gap-1 px-2 py-1 rounded border transition-colors ${
                    !resource.fileData
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-indigo-200 text-indigo-600 hover:border-indigo-300 hover:text-indigo-700'
                  }`}
                >
                  {getFormatIcon(format)}
                  <span className="text-xs uppercase">{format}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <main className="flex-grow pt-20 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Educational Resources</h1>
          <p className="text-gray-600">Access our comprehensive collection of study materials</p>
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
                placeholder="Search for books and resources..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources
            .filter(resource => 
              (selectedCategory === 'all' || resource.category === selectedCategory) &&
              (searchQuery === '' || 
                resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                resource.description?.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))
          }
        </div>
      </div>

      {/* Resource Details Modal */}
      {showModal && selectedResource && (
        <ResourceModal 
          resource={selectedResource} 
          onClose={() => {
            setShowModal(false);
            setSelectedResource(null);
          }} 
        />
      )}
    </main>
  );
}

export default Resources;