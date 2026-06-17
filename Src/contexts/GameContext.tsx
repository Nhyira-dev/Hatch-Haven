import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task, Difficulty, Egg, EggType, Pet, GrowthStage } from '../types';

interface GameContextType {
  coins: number;
  gems: number;
  xp: number;
  tasks: Task[];
  activeEgg: Egg | null;
  activePet: Pet | null;
  addTask: (title: string, type: 'habit' | 'todo', difficulty: Difficulty) => void;
  completeTodo: (id: string) => void;
  trackHabit: (id: string) => void;
  deleteTask: (id: string) => void;
  purchaseEgg: (type: EggType, emoji: string) => void;
  hatchPet: (name: string) => void;
  interactWithPet: (action: 'feed' | 'play') => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const REWARDS: Record<Difficulty, { coins: number; xp: number }> = {
  trivial: { coins: 5, xp: 10 },
  easy: { coins: 10, xp: 25 },
  medium: { coins: 20, xp: 50 },
  hard: { coins: 40, xp: 100 },
};

const PET_TEMPLATES: Record<EggType, { emoji: string; type: string }> = {
  Nature: { emoji: '🐰', type: 'Bunny' },
  Dragon: { emoji: '🐉', type: 'Fire Dragon' },
  Ocean: { emoji: '🐙', type: 'Axolotl' },
  Galaxy: { emoji: '🐱', type: 'Space Cat' },
  Forest: { emoji: '🍄', type: 'Mushroom Spirit' },
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState<number>(150);
  const [gems, setGems] = useState<number>(0);
  const [xp, setXp] = useState<number>(0);
  const [activeEgg, setActiveEgg] = useState<Egg | null>(null);
  const [activePet, setActivePet] = useState<Pet | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string, type: 'habit' | 'todo', difficulty: Difficulty) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      type,
      difficulty,
      isCompleted: false,
      streak: type === 'habit' ? 0 : undefined,
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const completeTodo = (id: string) => {
    const todo = tasks.find((t) => t.id === id);
    if (!todo || todo.isCompleted) return;

    const { coins: cReward, xp: xReward } = REWARDS[todo.difficulty];
    setCoins((prev) => prev + cReward);
    setXp((prev) => prev + xReward);
    handleEggProgress(xReward);
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, isCompleted: true } : t));
  };

  const trackHabit = (id: string) => {
    const habit = tasks.find((t) => t.id === id);
    if (!habit) return;

    const { coins: cReward, xp: xReward } = REWARDS[habit.difficulty];
    setCoins((prev) => prev + cReward);
    setXp((prev) => prev + xReward);
    handleEggProgress(xReward);
    setTasks((prev) =>
      prev.map((t) => t.id === id ? { ...t, streak: (t.streak || 0) + 1 } : t)
    );
  };

  const handleEggProgress = (gainedXp: number) => {
    if (!activeEgg || activeEgg.isHatched) return;

    setActiveEgg((prevEgg) => {
      if (!prevEgg) return null;
      const nextProgress = prevEgg.xpProgress + gainedXp;
      const isHatched = nextProgress >= prevEgg.xpRequired;
      return {
        ...prevEgg,
        xpProgress: Math.min(nextProgress, prevEgg.xpRequired),
        isHatched,
      };
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const purchaseEgg = (type: EggType, emoji: string) => {
    if (coins < 50) return;
    setCoins((prev) => prev - 50);
    setActiveEgg({
      id: crypto.randomUUID(),
      type,
      emoji,
      xpProgress: 0,
      xpRequired: 60,
      isHatched: false,
    });
  };

  const hatchPet = (name: string) => {
    if (!activeEgg || !activeEgg.isHatched) return;
    const template = PET_TEMPLATES[activeEgg.type];

    setActivePet({
      id: crypto.randomUUID(),
      name: name.trim() || `Little ${template.type}`,
      type: template.type,
      emoji: template.emoji,
      stage: 'Baby',
      hunger: 50,
      happiness: 60,
      level: 1,
    });
    setActiveEgg(null);
  };

  const interactWithPet = (action: 'feed' | 'play') => {
    if (!activePet) return;

    setActivePet((prev) => {
      if (!prev) return null;

      let nextHunger = prev.hunger;
      let nextHappiness = prev.happiness;
      let nextLevel = prev.level;

      if (action === 'feed') {
        nextHunger = Math.min(prev.hunger + 25, 100);
      } else if (action === 'play') {
        nextHappiness = Math.min(prev.happiness + 20, 100);
        if (nextHappiness === 100 && nextHunger > 80 && prev.level < 3) {
          nextLevel += 1;
        }
      }

      let nextStage: GrowthStage = prev.stage;
      if (nextLevel === 2) nextStage = 'Juvenile';
      if (nextLevel >= 3) nextStage = 'Adult';

      return {
        ...prev,
        hunger: nextHunger,
        happiness: nextHappiness,
        level: nextLevel,
        stage: nextStage,
      };
    });
  };

  return (
    <GameContext.Provider value={{ coins, gems, xp, tasks, activeEgg, activePet, addTask, completeTodo, trackHabit, deleteTask, purchaseEgg, hatchPet, interactWithPet }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
