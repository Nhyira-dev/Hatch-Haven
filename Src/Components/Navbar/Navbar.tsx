import React from 'react';

export const Navbar: React.FC = () => {
  // Hardcoded values for Module 1 UI shell
  const coins = 120;
  const gems = 5;

  return (
    <nav className="h-16 bg-white/80 backdrop-blur-md border-b border-orange-50 px-6 flex items-center justify-between fixed top-0 w-full z-50">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🐣</span>
        <span className="font-bold text-xl tracking-wide text-hh-text">Hatch Haven</span>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Coins Indicator */}
        <div className="flex items-center gap-1.5 bg-hh-accent/20 px-3 py-1.5 rounded-full border border-hh-accent/30">
          <span className="text-sm">🪙</span>
          <span className="font-semibold text-sm text-hh-text">{coins}</span>
        </div>

        {/* Gems Indicator */}
        <div className="flex items-center gap-1.5 bg-hh-lavender/20 px-3 py-1.5 rounded-full border border-hh-lavender/30">
          <span className="text-sm">💎</span>
          <span className="font-semibold text-sm text-hh-text">{gems}</span>
        </div>

        {/* Temporary Profile Avatar Shell */}
        <div className="w-8 h-8 rounded-full bg-hh-primary flex items-center justify-center text-white font-bold text-xs cursor-pointer">
          U
        </div>
      </div>
    </nav>
  );
};

export default Navbar;