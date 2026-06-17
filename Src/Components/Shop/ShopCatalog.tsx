import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { ShopItem } from '../../types';

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'f1',
    name: 'Crunchy Apple',
    emoji: '🍎',
    cost: 15,
    description: 'A crisp orchard treat.',
    category: 'food',
    statBoost: { hunger: 20, happiness: 5 },
  },
  {
    id: 'f2',
    name: 'Sweet Carrot',
    emoji: '🥕',
    cost: 12,
    description: 'Freshly harvested soil treat.',
    category: 'food',
    statBoost: { hunger: 15, happiness: 5 },
  },
  {
    id: 'r1',
    name: 'Rainbow Berry',
    emoji: '🍓',
    cost: 45,
    description: 'Bursting with magical energy.',
    category: 'rare_food',
    statBoost: { hunger: 40, happiness: 30 },
  },
  {
    id: 'r2',
    name: 'Moon Cookie',
    emoji: '🥮',
    cost: 60,
    description: 'Baked with cosmic stardust.',
    category: 'rare_food',
    statBoost: { hunger: 30, happiness: 50 },
  },
];

export const ShopCatalog: React.FC = () => {
  const { coins, buyShopItem, inventory } = useGame();

  const getItemQuantity = (itemId: string) => {
    return inventory.find((item) => item.itemId === itemId)?.quantity || 0;
  };

  return (
    <div className="w-full p-2">
      <div className="mb-4 text-center">
        <h3 className="font-extrabold text-lg text-hh-text">Market Bazaar</h3>
        <p className="text-xs text-gray-400">Equip your companion with nutritious power snacks.</p>
      </div>

      <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
        {SHOP_ITEMS.map((item) => {
          const quantity = getItemQuantity(item.id);
          const canAfford = coins >= item.cost;

          return (
            <div
              key={item.id}
              className="p-3 bg-white border border-orange-50 rounded-2xl flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 bg-hh-bg rounded-xl border border-orange-50/50">
                  {item.emoji}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-hh-text flex items-center gap-1.5">
                    {item.name}
                    {quantity > 0 && (
                      <span className="text-[10px] px-1.5 py-0.2 bg-hh-lavender/30 text-purple-700 rounded-full font-mono">
                        Owned: {quantity}
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-gray-400 max-w-[160px] truncate">{item.description}</p>
                </div>
              </div>

              <button
                disabled={!canAfford}
                onClick={() => buyShopItem(item)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 border ${
                  canAfford
                    ? 'bg-hh-accent/20 border-hh-accent text-orange-800 active:scale-95'
                    : 'bg-gray-50 border-transparent text-gray-300 cursor-not-allowed'
                }`}
              >
                <span>🪙</span>
                <span>{item.cost}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopCatalog;
