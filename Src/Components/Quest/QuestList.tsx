import React from 'react';
import { useGame } from '../../contexts/GameContext';

export const QuestList: React.FC = () => {
  const { quests, claimQuestReward } = useGame();

  const getProgressLabel = (quest: typeof quests[number]) => {
    switch (quest.targetType) {
      case 'coins_earned':
        return `${quest.currentValue} / ${quest.targetValue} coins earned`;
      case 'tasks_completed':
        return `${quest.currentValue} / ${quest.targetValue} tasks completed`;
      case 'pet_interactions':
        return `${quest.currentValue} / ${quest.targetValue} pet interactions`;
      case 'items_used':
        return `${quest.currentValue} / ${quest.targetValue} items used`;
      case 'pets_hatched':
        return `${quest.currentValue} / ${quest.targetValue} pets hatched`;
      default:
        return `${quest.currentValue} / ${quest.targetValue}`;
    }
  };

  const getQuestIcon = (type: typeof quests[number]['targetType']) => {
    switch (type) {
      case 'coins_earned':
        return '🪙';
      case 'tasks_completed':
        return '✅';
      case 'pet_interactions':
        return '🎾';
      case 'items_used':
        return '🍪';
      case 'pets_hatched':
        return '🥚';
      default:
        return '✨';
    }
  };

  return (
    <div className="w-full p-2">
      <div className="mb-4 text-center">
        <h3 className="font-extrabold text-lg text-hh-text">Epic Journey</h3>
        <p className="text-xs text-gray-400">Claim rare gems by reaching long-term goals. Item use and pet care quests are tracked automatically.</p>
      </div>

      <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
        {quests.map((quest) => {
          const progressPercentage = Math.min((quest.currentValue / quest.targetValue) * 100, 100);
          const isReady = quest.currentValue >= quest.targetValue;

          return (
            <div
              key={quest.id}
              className={`p-4 rounded-2xl border transition-all ${
                quest.isClaimed ? 'bg-gray-50/50 border-gray-100 opacity-60' : 'bg-white border-orange-50/60 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start mb-2 gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-base">{getQuestIcon(quest.targetType)}</span>
                  <div>
                    <h4 className={`text-xs font-bold ${quest.isClaimed ? 'line-through text-gray-400' : 'text-hh-text'}`}>
                      {quest.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">{quest.description}</p>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-hh-lavender flex items-center gap-0.5 bg-hh-lavender/10 px-2 py-0.5 rounded-full border border-hh-lavender/20">
                  💎 {quest.gemReward}
                </span>
              </div>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${quest.isClaimed ? 'bg-gray-300' : 'bg-hh-lavender'}`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-mono font-bold text-gray-500 whitespace-nowrap">
                  {getProgressLabel(quest)}
                </span>
              </div>

              {isReady && !quest.isClaimed && (
                <button
                  onClick={() => claimQuestReward(quest.id)}
                  className="w-full mt-3 py-1.5 bg-hh-lavender text-purple-900 text-[11px] font-bold rounded-xl shadow-sm hover:brightness-105 active:scale-98 transition-all animate-pulse"
                >
                  Claim Reward! 🎉
                </button>
              )}

              {quest.isClaimed && (
                <div className="text-center text-[10px] text-gray-400 font-semibold mt-2">
                  ✓ Completed & Claimed
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestList;
