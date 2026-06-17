import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { EggType } from '../../types';

interface EggOption {
  type: EggType;
  emoji: string;
  bg: string;
}

const EGG_OPTIONS: EggOption[] = [
  { type: 'Nature', emoji: '🌿', bg: 'bg-hh-primary/20' },
  { type: 'Dragon', emoji: '🔥', bg: 'bg-hh-accent/20' },
  { type: 'Ocean', emoji: '🌊', bg: 'bg-blue-100' },
  { type: 'Galaxy', emoji: '🌌', bg: 'bg-hh-lavender/20' },
  { type: 'Forest', emoji: '🍄', bg: 'bg-hh-pink/20' },
];

export const EggSelector: React.FC = () => {
  const { purchaseEgg, coins } = useGame();

  return (
    <div className="text-center p-4">
      <h3 className="font-bold text-lg text-hh-text mb-1">Adopt an Egg</h3>
      <p className="text-xs text-gray-400 mb-4">Costs 50 Coins. Complete tasks to nurture it.</p>
      
      <div className="grid grid-cols-2 gap-2.5">
        {EGG_OPTIONS.map((egg) => (
          <button
            key={egg.type}
            disabled={coins < 50}
            onClick={() => purchaseEgg(egg.type, egg.emoji)}
            className={`p-3 rounded-2xl flex flex-col items-center gap-1 border border-orange-50/50 hover:scale-102 transition-all ${egg.bg} disabled:opacity-40 disabled:hover:scale-100`}
          >
            <span className="text-3xl animate-pulse">{egg.emoji}</span>
            <span className="text-xs font-bold text-hh-text">{egg.type}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EggSelector;
