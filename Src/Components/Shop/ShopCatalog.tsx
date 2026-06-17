import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { ShopItem } from '../../types';
import { SHOP_ITEMS } from './shopData';

export const ShopCatalog: React.FC = () => {
  const { coins, buyShopItem, inventory } = useGame();
  const [shopMessage, setShopMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [flashItemId, setFlashItemId] = useState<string | null>(null);

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
              className={`p-3 bg-white border border-orange-50 rounded-2xl flex items-center justify-between shadow-sm ${flashItemId === item.id ? 'animate-shop-flash border-hh-primary' : ''}`}
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
                onClick={() => {
                  const success = buyShopItem(item);
                  setShopMessage(
                    success
                      ? { text: `Bought ${item.name}!`, type: 'success' }
                      : { text: `Not enough coins for ${item.name}.`, type: 'error' }
                  );
                  if (success) {
                    setFlashItemId(item.id);
                    window.setTimeout(() => setFlashItemId(null), 300);
                  }
                }}
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
      {shopMessage && (
        <div
          className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${
            shopMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {shopMessage.text}
        </div>
      )}
    </div>
  );
};

export default ShopCatalog;
