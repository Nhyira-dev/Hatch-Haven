import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { Difficulty } from '../../types';

export const TaskForm: React.FC = () => {
  const { addTask } = useGame();
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'habit' | 'todo'>('todo');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title, type, difficulty);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-orange-50/60 shadow-sm mb-6">
      <input
        type="text"
        placeholder="What are you working on today?..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl bg-hh-bg focus:outline-none focus:ring-2 focus:ring-hh-primary/40 text-sm placeholder:text-gray-400"
      />
      
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-gray-50">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setType('todo')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${type === 'todo' ? 'bg-hh-primary text-white' : 'bg-gray-100 text-hh-text'}`}
          >
            🎯 To-Do
          </button>
          <button
            type="button"
            onClick={() => setType('habit')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${type === 'habit' ? 'bg-hh-lavender text-white' : 'bg-gray-100 text-hh-text'}`}
          >
            🔄 Habit
          </button>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400 mr-1">Difficulty:</span>
          {(['trivial', 'easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
            <button
              key={diff}
              type="button"
              onClick={() => setDifficulty(diff)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium capitalize border transition-all ${
                difficulty === diff 
                  ? 'border-hh-accent bg-hh-accent/10 text-orange-700 font-semibold' 
                  : 'border-transparent bg-gray-50 text-gray-400'
              }`}>
              {diff}
            </button>
          ))}
        </div>

        <button type="submit" className="px-4 py-1.5 bg-hh-text text-white text-xs font-bold rounded-xl transition-transform active:scale-95 ml-auto">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
