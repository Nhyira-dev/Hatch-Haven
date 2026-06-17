import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { TaskForm } from '../../Components/Task/TaskForm';
import { TaskCard } from '../../Components/Task/TaskCard';
import { EggSelector } from '../../Components/Egg/EggSelector';
import { EggIncubator } from '../../Components/Egg/EggIncubator';
import { PetDisplay } from '../../Components/Pet/PetDisplay';
import { ShopCatalog } from '../../Components/Shop/ShopCatalog';
import { InventoryBag } from '../../Components/Inventory/InventoryBag';
import { QuestList } from '../../Components/Quest/QuestList';
import { PetChat } from '../../Components/Chat/PetChat';

export const HomePage: React.FC = () => {
  const { tasks, activeEgg, activePet } = useGame();
  const [activeTab, setActiveTab] = useState<'haven' | 'shop' | 'inventory' | 'quests' | 'chat'>('haven');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {/* Egg focal container unchanged */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        <div className="bg-white p-1.5 rounded-2xl border border-orange-50/50 shadow-sm flex gap-1">
          <button
            onClick={() => setActiveTab('haven')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'haven' ? 'bg-hh-primary text-white shadow-sm' : 'text-hh-text hover:bg-gray-50'
            }`}
          >
            🏡 My Haven
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'shop' ? 'bg-hh-primary text-white shadow-sm' : 'text-hh-text hover:bg-gray-50'
            }`}
          >
            🛒 Shop Market
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'inventory' ? 'bg-hh-primary text-white shadow-sm' : 'text-hh-text hover:bg-gray-50'
            }`}
          >
            🎒 Inventory
          </button>
          <button
            onClick={() => setActiveTab('quests')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'quests' ? 'bg-hh-primary text-white shadow-sm' : 'text-hh-text hover:bg-gray-50'
            }`}
          >
            🏆 Quests
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'chat' ? 'bg-hh-primary text-white shadow-sm' : 'text-hh-text hover:bg-gray-50'
            }`}
          >
            💬 Chat
          </button>
        </div>

        <div className="cozy-card p-5 flex flex-col items-center justify-center min-h-[380px] lg:min-h-[400px] bg-gradient-to-b from-white to-orange-50/20 w-full">
          {activeTab === 'shop' ? (
            <ShopCatalog />
          ) : activeTab === 'inventory' ? (
            <InventoryBag />
          ) : activeTab === 'quests' ? (
            <QuestList />
          ) : activeTab === 'chat' ? (
            <PetChat />
          ) : activePet ? (
            <PetDisplay />
          ) : activeEgg ? (
            <EggIncubator />
          ) : (
            <EggSelector />
          )}
        </div>
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