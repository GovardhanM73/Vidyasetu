import React, { useState, useCallback, useRef } from 'react';
import { BookOpen, Upload, Search, Filter, Plus, Edit, Trash2, Download, FileText, Lock, Eye, Star, BarChart, X, FileSpreadsheet, Presentation as FilePresentation, FileCheck } from 'lucide-react';
import { Resource } from '../components/types/res';

interface ManageResourcesProps {
  resources: Resource[];
  onAddResource: (resource: Omit<Resource, 'id' | 'downloads' | 'views' | 'rating'>) => void;
}

interface AddResourceModalProps {
  onClose: () => void;
  onAdd: (resource: Omit<Resource, 'id' | 'downloads' | 'views' | 'rating'>) => void;
}

const AddResourceModal: React.FC<AddResourceModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Document',
    subject: '',
    status: 'draft' as const,
    access: 'free' as const,
    description: '',
    author: '',
    level: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      lastUpdated: new Date().toISOString().split('T')[0],
      formats: ['pdf'],
      isPremium: formData.access === 'premium',
      category: formData.subject
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Resource</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Document">Document</option>
                <option value="PDF">PDF</option>
                <option value="Video">Video</option>
                <option value="Quiz">Quiz</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Access</label>
              <select
                value={formData.access}
                onChange={(e) => setFormData(prev => ({ ...prev, access: e.target.value as 'free' | 'premium' }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <input
                type="text"
                value={formData.level}
                onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ManageResources: React.FC<ManageResourcesProps> = ({ resources, onAddResource }) => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFiles = async (files: File[]) => {
    for (const file of files) {
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      const fileType = getFileType(extension);
      
      // Convert file to base64
      const reader = new FileReader();
      const fileData = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const newResource: Omit<Resource, 'id' | 'downloads' | 'views' | 'rating'> = {
        title: file.name.split('.')[0],
        type: fileType,
        subject: 'Uncategorized',
        status: 'draft',
        access: 'free',
        lastUpdated: new Date().toISOString().split('T')[0],
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        description: `Uploaded file: ${file.name}`,
        formats: [extension],
        isPremium: false,
        category: 'Uncategorized',
        fileData: fileData
      };
      
      onAddResource(newResource);
    }
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

  const getFileType = (extension: string): string => {
    const typeMap: { [key: string]: string } = {
      pdf: 'PDF',
      doc: 'Document',
      docx: 'Document',
      ppt: 'Presentation',
      pptx: 'Presentation',
      xls: 'Spreadsheet',
      xlsx: 'Spreadsheet',
      mp4: 'Video',
      mov: 'Video',
      jpg: 'Image',
      jpeg: 'Image',
      png: 'Image'
    };
    return typeMap[extension] || 'Document';
  };

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

  return (
    <main className="flex-grow pt-20 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Resources</h1>
            <p className="text-gray-600">Upload and organize educational materials</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Resource
          </button>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 transition-all duration-300 hover:shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Upload</h2>
            <p className="text-gray-600">Drag and drop your files or click to browse</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div 
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-300 cursor-pointer ${
                isDragging 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-300 hover:border-indigo-300'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mov"
              />
              <Upload className={`w-12 h-12 mx-auto mb-4 transition-colors duration-300 ${
                isDragging ? 'text-indigo-500' : 'text-gray-400'
              }`} />
              <p className="text-sm text-gray-600 mb-4">
                Support for PDF, DOCX, PPTX, and video files up to 500MB
              </p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Choose Files
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="document">Documents</option>
              <option value="video">Videos</option>
              <option value="quiz">Quizzes</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {resources
            .filter(resource => 
              filterType === 'all' || 
              resource.type.toLowerCase() === filterType.toLowerCase()
            )
            .filter(resource =>
              resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              resource.subject.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((resource) => (
              <div 
                key={resource.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 p-3 rounded-xl">
                        <BookOpen className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                        <p className="text-sm text-gray-600">{resource.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <Edit className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 hover:text-red-700 rounded-lg transition-colors duration-200">
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Download className="w-4 h-4 mr-2" />
                      {resource.downloads} Downloads
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Eye className="w-4 h-4 mr-2" />
                      {resource.views} Views
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 mr-2 text-yellow-400" />
                      {resource.rating} Rating
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Lock className="w-4 h-4 mr-2" />
                      {resource.access.charAt(0).toUpperCase() + resource.access.slice(1)}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Available Formats:</p>
                    <div className="flex flex-wrap gap-2">
                      {resource.formats?.map(format => (
                        <button
                          key={format}
                          onClick={() => handleDownload(resource)}
                          disabled={!resource.fileData}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors duration-200 ${
                            !resource.fileData
                              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                              : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                          }`}
                        >
                          {getFormatIcon(format)}
                          <span className="uppercase">{format}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      resource.status === 'published' 
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
                    </span>
                    <button 
                      onClick={() => setSelectedResource(resource)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {showAddModal && (
          <AddResourceModal
            onClose={() => setShowAddModal(false)}
            onAdd={onAddResource}
          />
        )}
      </div>
    </main>
  );
};

export default ManageResources;