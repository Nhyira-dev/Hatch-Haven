import React from 'react';
import { Task } from '../../types';
import { useGame } from '../../contexts/GameContext';

export const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const { completeTodo, trackHabit, deleteTask } = useGame();

  return (
    <div className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
      task.isCompleted 
        ? 'bg-gray-50/80 border-gray-100 opacity-50 line-through' 
        : 'bg-white border-orange-50/50 shadow-sm hover:translate-x-1'
    }`}>
      <div className="flex items-center gap-3">
        {task.type === 'todo' ? (
          <button
            onClick={() => completeTodo(task.id)}
            disabled={task.isCompleted}
            className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center text-xs transition-colors ${
              task.isCompleted ? 'border-hh-success bg-hh-success text-white' : 'border-gray-300 hover:border-hh-primary'
            }`}
          >
            {task.isCompleted && '✓'}
          </button>
        ) : (
          <button
            onClick={() => trackHabit(task.id)}
            className="w-5 h-5 rounded-full bg-hh-lavender/20 border border-hh-lavender flex items-center justify-center text-xs hover:bg-hh-lavender hover:text-white transition-colors text-purple-700 font-bold"
          >
            +
          </button>
        )}

        <div>
          <p className="text-sm font-medium text-hh-text">{task.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wide ${
              task.type === 'todo' ? 'bg-hh-primary/10 text-teal-800' : 'bg-hh-lavender/10 text-purple-800'
            }`}>
              {task.type}
            </span>
            <span className="text-[10px] text-gray-400">⚡ {task.difficulty}</span>
            {task.type === 'habit' && (
              <span className="text-[10px] text-orange-600 font-semibold">🔥 Streak: {task.streak}</span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="text-gray-300 hover:text-red-400 p-1 rounded-lg text-xs transition-colors"
        title="Delete Task"
      >
        🗑️
      </button>
    </div>
  );
};

export default TaskCard;
