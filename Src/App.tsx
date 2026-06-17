import React from 'react';
import { GameProvider } from './contexts/GameContext';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Pages/Home/Hompage';

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-hh-bg selection:bg-hh-accent/30">
        <Navbar />
        <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <HomePage />
        </main>
      </div>
    </GameProvider>
  );
};

export default App;