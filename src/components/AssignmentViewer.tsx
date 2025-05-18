import React from 'react';
import { X, Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface AssignmentViewerProps {
  title: string;
  onClose: () => void;
  onDownload: () => void;
}

export function AssignmentViewer({ title, onClose, onDownload }: AssignmentViewerProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex items-center space-x-2">
            <button 
              onClick={onDownload}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
            >
              <Download className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Complex Numbers Practice Set</h1>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Question 1</h2>
                <p>Solve the following complex equation:</p>
                <p className="font-mono text-lg">z² + 4z + 5 = 0</p>
                <div className="pl-4 border-l-4 border-gray-200">
                  <p className="text-gray-600">Show all your work, including:</p>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>The quadratic formula application</li>
                    <li>Simplification steps</li>
                    <li>Final answer in both rectangular and polar form</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Question 2</h2>
                <p>Find all the cube roots of:</p>
                <p className="font-mono text-lg">8i</p>
                <div className="pl-4 border-l-4 border-gray-200">
                  <p className="text-gray-600">Include:</p>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Conversion to polar form</li>
                    <li>All three roots</li>
                    <li>Verification of your answers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t flex justify-between items-center bg-gray-50">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600">Page 1 of 3</span>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600">100%</span>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}