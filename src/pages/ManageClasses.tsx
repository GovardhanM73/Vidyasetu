import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import SearchBar from '../components/classcomponents/SearchBar';
import ClassGrid from '../components/classcomponents/ClassGrid';
import ClassAnalytics from '../components/classcomponents/ClassAnalytics';
import CreateClassModal from '../components/classcomponents/CreateClassModal';
import { Class } from '../components/types';
import { createMeetSession } from '../components/services/googleMeetService';

interface ManageClassesProps {
  classes: Class[];
  onClassCreated: (newClass: Class) => void;
}

function ManageClasses({ classes, onClassCreated }: ManageClassesProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        classItem.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || classItem.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreateClass = async (newClass: any) => {
    try {
      const startDateTime = new Date(newClass.startDate + 'T' + newClass.startTime);
      const endDateTime = new Date(startDateTime.getTime() + newClass.duration * 60000);
      
      const meetLink = await createMeetSession(
        newClass.name,
        startDateTime.toISOString(),
        endDateTime.toISOString(),
        newClass.description
      );
      
      const classWithId = {
        ...newClass,
        id: classes.length + 1,
        students: 0,
        completion: 0,
        assignments: 0,
        averageScore: 0,
        status: 'active',
        nextClass: startDateTime.toISOString(),
        meetLink
      };
      
      onClassCreated(classWithId);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  const handleDeleteClass = (id: number) => {
    // This should be handled by the parent component now
    // Implement if needed through props
  };

  return (
    <main className="flex-grow pt-20 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Classes</h1>
            <p className="text-gray-600">Organize and monitor your virtual classrooms</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Class
          </button>
        </div>

        {/* Search and Filter Bar */}
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        {/* Classes Grid */}
        <ClassGrid 
          classes={filteredClasses} 
          onDelete={handleDeleteClass} 
        />

        {/* Class Analytics */}
        <ClassAnalytics classes={classes} />
      </div>

      {/* Create Class Modal */}
      {showAddModal && (
        <CreateClassModal 
          onClose={() => setShowAddModal(false)} 
          onCreate={handleCreateClass} 
        />
      )}
    </main>
  );
}

export default ManageClasses;