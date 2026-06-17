import React from 'react';
import { useGame } from '../../contexts/GameContext';

export const EggIncubator: React.FC = () => {
  const { activeEgg } = useGame();

  if (!activeEgg) return null;

  const progressPercentage = (activeEgg.xpProgress / activeEgg.xpRequired) * 100;
  
  let crackGraphic = '🥚';
  if (activeEgg.isHatched) crackGraphic = '🐣 ✨';
  else if (progressPercentage > 75) crackGraphic = '⚡🐣⚡';
  else if (progressPercentage > 40) crackGraphic = '🥚💥';

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center w-full">
      <div className={`text-7xl mb-6 select-none ${!activeEgg.isHatched ? 'animate-bounce' : ''}`}>
        {crackGraphic}
      </div>

      <div className="w-full max-w-xs">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold text-hh-text tracking-wide uppercase">
            {activeEgg.type} Egg
          </span>
          <span className="text-xs font-mono font-semibold text-gray-500">
            {activeEgg.xpProgress}/{activeEgg.xpRequired} XP
          </span>
        </div>

        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden p-0.5 border border-gray-200/50">
          <div 
            className="bg-hh-accent h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">
          {activeEgg.isHatched 
            ? "Ready to hatch! Let's initialize the Pet Engine in Module 4." 
            : "Keep going! Tasks feed energy directly to the egg envelope."}
        </p>
      </div>
    </div>
  );
};

export default EggIncubator;
