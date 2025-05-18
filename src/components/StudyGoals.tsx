import React, { useState } from 'react';
import { Target, Plus, Check, Trash2 } from 'lucide-react';

interface Goal {
  id: number;
  text: string;
  completed: boolean;
}

export default function StudyGoals() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, text: "Complete Physics assignments", completed: false },
    { id: 2, text: "Study for Math test", completed: true },
    { id: 3, text: "Review Chemistry notes", completed: false },
  ]);
  const [newGoal, setNewGoal] = useState("");

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), text: newGoal, completed: false }]);
      setNewGoal("");
    }
  };

  const toggleGoal = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Study Goals</h2>
        <Target className="w-6 h-6 text-indigo-600" />
      </div>

      <form onSubmit={addGoal} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add a new goal..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {goals.map(goal => (
          <div
            key={goal.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleGoal(goal.id)}
                className={`p-1 rounded-full ${
                  goal.completed ? 'bg-green-100' : 'bg-gray-200'
                }`}
              >
                <Check className={`w-4 h-4 ${
                  goal.completed ? 'text-green-600' : 'text-gray-400'
                }`} />
              </button>
              <span className={`${
                goal.completed ? 'text-gray-400 line-through' : 'text-gray-700'
              }`}>
                {goal.text}
              </span>
            </div>
            <button
              onClick={() => deleteGoal(goal.id)}
              className="p-1 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}