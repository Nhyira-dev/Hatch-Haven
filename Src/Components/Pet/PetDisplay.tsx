import React from 'react';
import { useGame } from '../../contexts/GameContext';

export const PetDisplay: React.FC = () => {
  const { activePet, interactWithPet } = useGame();

  if (!activePet) return null;

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center w-full">
      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-hh-primary/20 text-teal-800 font-bold uppercase tracking-wider mb-2">
        {activePet.stage} (Lvl {activePet.level})
      </span>

      <h3 className="font-extrabold text-xl text-hh-text">{activePet.name}</h3>
      <p className="text-xs text-gray-400 capitalize mb-6">{activePet.type}</p>

      <div className="text-7xl min-h-[110px] flex items-center justify-center animate-bounce duration-[2000ms] mb-6 select-none">
        {activePet.emoji}
      </div>

      <div className="w-full max-w-xs space-y-3 mb-6">
        <div>
          <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-1">
            <span>🍖 Hunger</span>
            <span>{activePet.hunger}/100</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-hh-warning h-full transition-all" style={{ width: `${activePet.hunger}%` }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-1">
            <span>✨ Happiness</span>
            <span>{activePet.happiness}/100</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-hh-pink h-full transition-all" style={{ width: `${activePet.happiness}%` }}></div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full max-w-xs">
        <button
          onClick={() => interactWithPet('feed')}
          className="flex-1 py-2 bg-hh-accent/20 border border-hh-accent text-orange-800 text-xs font-bold rounded-xl active:scale-95 transition-all"
        >
          Feed Treat
        </button>
        <button
          onClick={() => interactWithPet('play')}
          className="flex-1 py-2 bg-hh-lavender/20 border border-hh-lavender text-purple-800 text-xs font-bold rounded-xl active:scale-95 transition-all"
        >
          Play Game
        </button>
      </div>
    </div>
  );
};

export default PetDisplay;
