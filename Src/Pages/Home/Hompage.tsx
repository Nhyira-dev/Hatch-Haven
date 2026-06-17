import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {/* Virtual Pet Focal Window */}
      <div className="lg:col-span-2 cozy-card p-8 flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-b from-white to-orange-50/20">
        <div className="text-6xl animate-bounce mb-4">🥚</div>
        <h2 className="text-2xl font-bold text-hh-text mb-2">Your Haven is Ready</h2>
        <p className="text-sm text-gray-400 text-center max-w-sm">
          Module 1 successfully deployed! In the next modules, your egg will sit here waiting to hatch.
        </p>
      </div>

      {/* Mini Task Checklist Summary View */}
      <div className="cozy-card p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-hh-text mb-4 flex items-center gap-2">
            📋 Today's Goals
          </h3>
          <div className="space-y-3 opacity-60">
            <div className="p-3 bg-hh-bg rounded-2xl border border-gray-100 text-sm">
              ✨ Setup development workflow
            </div>
            <div className="p-3 bg-hh-bg rounded-2xl border border-gray-100 text-sm">
              🎨 Bind palette configurations
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-50 text-xs text-gray-400 text-center">
          Task & Habit system coming in Module 2
        </div>
      </div>
    </div>
  );
};

export default HomePage;