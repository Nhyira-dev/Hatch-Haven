import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { TaskForm } from '../../Components/Task/TaskForm';
import { TaskCard } from '../../Components/Task/TaskCard';
import { EggSelector } from '../../Components/Egg/EggSelector';
import { EggIncubator } from '../../Components/Egg/EggIncubator';
import { PetDisplay } from '../../Components/Pet/PetDisplay';

export const HomePage: React.FC = () => {
  const { tasks, activeEgg, activePet } = useGame();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {/* Egg focal container unchanged */}
      <div className="lg:col-span-1 cozy-card p-6 flex flex-col items-center justify-center min-h-[350px] lg:min-h-[450px] bg-gradient-to-b from-white to-orange-50/20">
        {activePet ? <PetDisplay /> : activeEgg ? <EggIncubator /> : <EggSelector />}
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