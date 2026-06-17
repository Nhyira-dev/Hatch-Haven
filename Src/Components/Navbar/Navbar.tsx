import React, { useEffect, useState } from 'react';
import { useGame } from '../../contexts/GameContext';

export const Navbar: React.FC = () => {
  const { coins, gems, xp, resetGame } = useGame();
  const [showResetModal, setShowResetModal] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  useEffect(() => {
    if (!showResetSuccess) return;
    const timer = window.setTimeout(() => setShowResetSuccess(false), 2500);
    return () => window.clearTimeout(timer);
  }, [showResetSuccess]);

  return (
    <>
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

          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold text-hh-text bg-white border border-gray-200 hover:bg-gray-50 transition"
          >
            Reset
          </button>
        </div>
      </nav>

      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl border border-gray-200">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-hh-text">Reset Hatch Haven</h2>
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                aria-label="Close reset dialog"
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 transition"
              >
                ×
              </button>
            </div>
            <p className="mt-3 text-sm text-gray-600">This will clear your progress, inventory, tasks, and rewards. Are you sure?</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetGame();
                  setShowResetModal(false);
                  setShowResetSuccess(true);
                }}
                className="rounded-full bg-hh-primary px-4 py-2 text-sm font-semibold text-white hover:bg-pink-500 transition"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {showResetSuccess && (
        <div className="fixed bottom-6 right-6 z-50 rounded-3xl bg-white border border-gray-200 px-4 py-3 shadow-xl text-sm font-semibold text-hh-text flex items-center gap-3">
          <span>Hatch Haven has been reset.</span>
          <button
            type="button"
            aria-label="Close notification"
            onClick={() => setShowResetSuccess(false)}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 transition"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;