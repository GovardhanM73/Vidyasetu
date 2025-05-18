import React from 'react';
import ClassCard from './ClassCard';
import { Class } from '../types';

interface ClassGridProps {
  classes: Class[];
  onDelete: (id: number) => void;
}

function ClassGrid({ classes, onDelete }: ClassGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {classes.length > 0 ? (
        classes.map((classItem) => (
          <ClassCard 
            key={classItem.id} 
            classItem={classItem} 
            onDelete={onDelete}
          />
        ))
      ) : (
        <div className="col-span-2 bg-white rounded-xl shadow p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No classes found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}

export default ClassGrid;