import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { SHOP_ITEMS } from '../Shop/shopData';

export const InventoryBag: React.FC = () => {
  const { inventory, activePet, consumeItem } = useGame();

  const ownedItems = inventory
    .map((entry) => ({
      item: SHOP_ITEMS.find((shopItem) => shopItem.id === entry.itemId),
      quantity: entry.quantity,
    }))
    .filter((entry) => entry.item && entry.quantity > 0);

  return (
    <div className="w-full p-2">
      <div className="mb-4 text-center">
        <h3 className="font-extrabold text-lg text-hh-text">Backpack</h3>
        <p className="text-xs text-gray-400">Use your collected treats to support your companion.</p>
      </div>

      <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
        {ownedItems.length === 0 ? (
          <div className="text-[11px] text-gray-400 p-4 rounded-2xl bg-white border border-orange-50">
            Your backpack is empty. Visit the shop to buy tasty rewards.
          </div>
        ) : (
          ownedItems.map(({ item, quantity }) => (
            <div key={item?.id} className="p-3 bg-white border border-orange-50 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item?.emoji}</span>
                <div>
                  <p className="text-sm font-bold text-hh-text">{item?.name}</p>
                  <p className="text-[10px] text-gray-400">Qty: {quantity}</p>
                  <p className="text-[10px] text-gray-400 truncate max-w-[170px]">{item?.description}</p>
                </div>
              </div>
              <button
                onClick={() => item && consumeItem(item.id, item.statBoost)}
                disabled={!activePet}
                className="px-3 py-2 bg-hh-primary text-white rounded-xl text-[10px] font-bold transition-all hover:brightness-105 disabled:opacity-50"
              >
                {activePet ? 'Use' : 'No Pet'
                }
              </button>
            </div>
          ))
        )}
      </div>

      {!activePet && ownedItems.length > 0 && (
        <div className="mt-4 text-[11px] text-orange-800 bg-orange-50 rounded-2xl px-4 py-3">
          Hatch a pet first, then use items from your backpack to keep it happy and fed.
        </div>
      )}
    </div>
  );
};

export default InventoryBag;
