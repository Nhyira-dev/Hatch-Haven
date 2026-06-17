import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task, Difficulty } from '../types';

interface GameContextType {
  coins: number;
  gems: number;
  xp: number;
  tasks: Task[];
  addTask: (title: string, type: 'habit' | 'todo', difficulty: Difficulty) => void;
  completeTodo: (id: string) => void;
  trackHabit: (id: string) => void;
  deleteTask: (id: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const REWARDS: Record<Difficulty, { coins: number; xp: number }> = {
  trivial: { coins: 5, xp: 10 },
  easy: { coins: 10, xp: 25 },
  medium: { coins: 20, xp: 50 },
  hard: { coins: 40, xp: 100 },
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState<number>(100);
  const [gems, setGems] = useState<number>(0);
  const [xp, setXp] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Drink 8 glasses of water', type: 'habit', difficulty: 'trivial', isCompleted: false, streak: 0, createdAt: new Date() },
    { id: '2', title: 'Finish Module 2 UI Codebase', type: 'todo', difficulty: 'medium', isCompleted: false, createdAt: new Date() },
  ]);

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
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, isCompleted: true } : t));
  };

  const trackHabit = (id: string) => {
    const habit = tasks.find((t) => t.id === id);
    if (!habit) return;

    const { coins: cReward, xp: xReward } = REWARDS[habit.difficulty];
    setCoins((prev) => prev + cReward);
    setXp((prev) => prev + xReward);
    setTasks((prev) =>
      prev.map((t) => t.id === id ? { ...t, streak: (t.streak || 0) + 1 } : t)
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <GameContext.Provider value={{ coins, gems, xp, tasks, addTask, completeTodo, trackHabit, deleteTask }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
