import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

export default function StudyTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = window.setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            setIsActive(false);
            if (mode === 'focus') {
              setMode('break');
              setMinutes(5);
            } else {
              setMode('focus');
              setMinutes(25);
            }
            return;
          }
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'focus') {
      setMinutes(25);
    } else {
      setMinutes(5);
    }
    setSeconds(0);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Study Timer</h2>
        <Timer className="w-6 h-6 text-indigo-600" />
      </div>
      
      <div className="text-center">
        <div className="text-4xl font-bold mb-4">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          {mode === 'focus' ? 'Focus Time' : 'Break Time'}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200"
          >
            {isActive ? 
              <Pause className="w-6 h-6 text-indigo-600" /> : 
              <Play className="w-6 h-6 text-indigo-600" />
            }
          </button>
          <button
            onClick={resetTimer}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <RotateCcw className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}