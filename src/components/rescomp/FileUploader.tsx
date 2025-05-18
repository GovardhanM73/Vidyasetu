import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { Resource } from '../App';

interface FileUploaderProps {
  onFileUpload: (resource: Omit<Resource, 'id' | 'downloads' | 'views' | 'rating'>) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

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
      
      onFileUpload(newResource);
    }
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

  return (
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
  );
};

export default FileUploader;