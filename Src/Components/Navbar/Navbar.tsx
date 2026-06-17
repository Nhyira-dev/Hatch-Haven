import React from 'react';
import { useGame } from '../../contexts/GameContext';

export const Navbar: React.FC = () => {
  const { coins, gems, xp } = useGame();

  return (
    <nav className="h-16 bg-white/80 backdrop-blur-md border-b border-orange-50 px-6 flex items-center justify-between fixed top-0 w-full z-50">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🐣</span>
        <span className="font-bold text-xl tracking-wide text-hh-text">Hatch Haven</span>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Experience Bar Layer */}
        <div className="hidden md:flex items-center gap-2 mr-2">
          <span className="text-xs text-gray-400 uppercase font-bold tracking-wide">XP</span>
          <div className="w-32 bg-gray-100 h-2.5 rounded-full overflow-hidden border border-gray-200/40">
            <div className="bg-hh-primary h-full transition-all duration-500" style={{ width: `${Math.min(xp % 100, 100)}%` }}></div>
          </div>
          <span className="text-xs text-hh-text font-bold">Lvl {Math.floor(xp / 100) + 1}</span>
        </div>

        <div className="flex items-center gap-1.5 bg-hh-accent/20 px-3 py-1.5 rounded-full border border-hh-accent/30">
          <span className="text-sm">🪙</span>
          <span className="font-semibold text-sm text-hh-text">{coins}</span>
        </div>

        <div className="flex items-center gap-1.5 bg-hh-lavender/20 px-3 py-1.5 rounded-full border border-hh-lavender/30">
          <span className="text-sm">💎</span>
          <span className="font-semibold text-sm text-hh-text">{gems}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;