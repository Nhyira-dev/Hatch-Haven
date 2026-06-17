import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Pages/Home/Hompage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-hh-bg selection:bg-hh-accent/30">
      <Navbar />
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <HomePage />
      </main>
    </div>
  );
};

export default App;