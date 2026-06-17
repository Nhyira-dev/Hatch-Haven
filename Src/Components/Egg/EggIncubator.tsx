import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';

export const EggIncubator: React.FC = () => {
  const { activeEgg, hatchPet } = useGame();
  const [petName, setPetName] = useState('');

  if (!activeEgg) return null;

  const progressPercentage = (activeEgg.xpProgress / activeEgg.xpRequired) * 100;
  
  let crackGraphic = '🥚';
  if (activeEgg.isHatched) crackGraphic = '🐣 ✨';
  else if (progressPercentage > 75) crackGraphic = '⚡🐣⚡';
  else if (progressPercentage > 40) crackGraphic = '🥚💥';

  const gradientMap: Record<string, string> = {
    Nature: 'from-green-200 to-green-400',
    Dragon: 'from-orange-200 to-orange-400',
    Ocean: 'from-blue-200 to-blue-400',
    Galaxy: 'from-purple-200 to-purple-400',
    Forest: 'from-pink-200 to-pink-400',
  };

  const progressColorMap: Record<string, string> = {
    Nature: 'bg-green-400',
    Dragon: 'bg-orange-400',
    Ocean: 'bg-blue-400',
    Galaxy: 'bg-purple-400',
    Forest: 'bg-pink-400',
  };

  const gradientClass = gradientMap[activeEgg.type] || 'from-gray-100 to-gray-200';
  const progressColorClass = progressColorMap[activeEgg.type] || 'bg-hh-accent';

  const progressGlowColor: Record<string, string> = {
    Nature: 'rgba(34,197,94,0.45)',
    Dragon: 'rgba(249,115,22,0.55)',
    Ocean: 'rgba(59,130,246,0.55)',
    Galaxy: 'rgba(139,92,246,0.55)',
    Forest: 'rgba(236,72,153,0.55)',
  };

  const glowShadow = activeEgg.isHatched
    ? '0 0 36px rgba(255,255,255,0.75)'
    : progressPercentage > 75
    ? `0 0 24px ${progressGlowColor[activeEgg.type] || 'rgba(255,255,255,0.45)'}`
    : 'none';

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center w-full">
      <div
        className={`w-36 h-44 mb-6 flex items-center justify-center text-7xl select-none bg-gradient-to-br ${gradientClass} ${!activeEgg.isHatched ? 'animate-bounce' : ''}`}
        style={{ borderRadius: '50% 50% 45% 45%', boxShadow: glowShadow }}
      >
        {crackGraphic}
      </div>

      <div className="w-full max-w-xs">
        {!activeEgg.isHatched ? (
          <>
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
                className={`${progressColorClass} h-full rounded-full transition-all duration-300`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-gray-400 mt-3">
              Keep completing items to crack the shell membrane!
            </p>
          </>
        ) : (
          <div className="space-y-3 animation-fade-in">
            <h4 className="font-bold text-hh-text text-sm">Your egg is ready to hatch!</h4>
            <input
              type="text"
              placeholder="Name your companion..."
              maxLength={14}
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-hh-bg text-xs text-center focus:outline-none focus:ring-2 focus:ring-hh-primary"
            />
            <button
              onClick={() => hatchPet(petName)}
              className="w-full py-2 bg-hh-primary text-white font-bold text-xs rounded-xl shadow-sm hover:brightness-105 active:scale-98 transition-all"
            >
              Hatch Companion! 🎉
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EggIncubator;
