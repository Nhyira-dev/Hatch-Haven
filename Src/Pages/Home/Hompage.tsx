import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { TaskForm } from '../../components/Task/TaskForm';
import { TaskCard } from '../../components/Task/TaskCard';

export const HomePage: React.FC = () => {
  const { tasks } = useGame();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {/* Egg focal container unchanged */}
      <div className="lg:col-span-1 cozy-card p-8 flex flex-col items-center justify-center min-h-[300px] lg:min-h-[450px] bg-gradient-to-b from-white to-orange-50/20">
        <div className="text-6xl animate-bounce mb-4">🥚</div>
        <h2 className="text-2xl font-bold text-hh-text mb-2">Hatchery Sandbox</h2>
        <p className="text-sm text-gray-400 text-center max-w-xs">
          Earn gold and experience by completing tasks. We hatch your first ecosystem egg in Module 3!
        </p>
      </div>

      {/* Live Task Workspace */}
      <div className="lg:col-span-2 flex flex-col">
        <TaskForm />
        
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {tasks.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 text-sm">
              ✨ Sky looks clear! Time to set some fresh goals.
            </div>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;