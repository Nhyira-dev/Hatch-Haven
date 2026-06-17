import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task, Difficulty, Egg, EggType, Pet, ShopItem, InventoryItem, GrowthStage, Quest } from '../types';

interface GameContextType {
  coins: number;
  gems: number;
  xp: number;
  tasks: Task[];
  activeEgg: Egg | null;
  activePet: Pet | null;
  inventory: InventoryItem[];
  quests: Quest[];
  addTask: (title: string, type: 'habit' | 'todo', difficulty: Difficulty) => void;
  completeTodo: (id: string) => void;
  trackHabit: (id: string) => void;
  deleteTask: (id: string) => void;
  purchaseEgg: (type: EggType, emoji: string) => void;
  hatchPet: (name: string) => void;
  interactWithPet: (action: 'feed' | 'play') => void;
  buyShopItem: (item: ShopItem) => boolean;
  consumeItem: (itemId: string, statBoost: { hunger: number; happiness: number }) => void;
  claimQuestReward: (questId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const REWARDS: Record<Difficulty, { coins: number; xp: number }> = {
  trivial: { coins: 5, xp: 10 },
  easy: { coins: 10, xp: 25 },
  medium: { coins: 20, xp: 50 },
  hard: { coins: 40, xp: 100 },
};

const INITIAL_QUESTS: Quest[] = [
  {
    id: 'q1',
    title: 'Novice Hatchling',
    description: 'Complete 3 tasks or habits.',
    targetType: 'tasks_completed',
    targetValue: 3,
    currentValue: 0,
    gemReward: 2,
    isClaimed: false,
  },
  {
    id: 'q2',
    title: 'Golden Hoarder',
    description: 'Accumulate a baseline total of 250 coins.',
    targetType: 'coins_earned',
    targetValue: 250,
    currentValue: 0,
    gemReward: 5,
    isClaimed: false,
  },
];

const PET_TEMPLATES: Record<EggType, { emoji: string; type: string }> = {
  Nature: { emoji: '🐰', type: 'Bunny' },
  Dragon: { emoji: '🐉', type: 'Fire Dragon' },
  Ocean: { emoji: '🐙', type: 'Axolotl' },
  Galaxy: { emoji: '🐱', type: 'Space Cat' },
  Forest: { emoji: '🍄', type: 'Mushroom Spirit' },
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState<number>(200);
  const [gems, setGems] = useState<number>(0);
  const [xp, setXp] = useState<number>(0);
  const [activeEgg, setActiveEgg] = useState<Egg | null>(null);
  const [activePet, setActivePet] = useState<Pet | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [totalCoinsEarned, setTotalCoinsEarned] = useState<number>(0);

  const updateQuestProgress = (type: 'tasks_completed' | 'coins_earned', amount: number) => {
    setQuests((prevQuests) =>
      prevQuests.map((quest) => {
        if (quest.targetType !== type || quest.isClaimed) return quest;

        const nextValue =
          type === 'tasks_completed'
            ? quest.currentValue + amount
            : quest.currentValue + amount;

        return {
          ...quest,
          currentValue: Math.min(nextValue, quest.targetValue),
        };
      })
    );
  };

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
    const newCoins = coins + cReward;
    setCoins(newCoins);
    setTotalCoinsEarned((prev) => prev + cReward);
    setXp((prev) => prev + xReward);
    handleEggProgress(xReward);
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, isCompleted: true } : t));
    updateQuestProgress('tasks_completed', 1);
    updateQuestProgress('coins_earned', cReward);
  };

  const trackHabit = (id: string) => {
    const habit = tasks.find((t) => t.id === id);
    if (!habit) return;

    const { coins: cReward, xp: xReward } = REWARDS[habit.difficulty];
    const newCoins = coins + cReward;

    setCoins(newCoins);
    setTotalCoinsEarned((prev) => prev + cReward);
    setXp((prev) => prev + xReward);
    handleEggProgress(xReward);
    setTasks((prev) =>
      prev.map((t) => t.id === id ? { ...t, streak: (t.streak || 0) + 1 } : t)
    );
    updateQuestProgress('tasks_completed', 1);
    updateQuestProgress('coins_earned', cReward);
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

  const buyShopItem = (item: ShopItem) => {
    if (coins < item.cost) return false;
    setCoins((prev) => prev - item.cost);
    setInventory((prev) => {
      const existing = prev.find((entry) => entry.itemId === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.itemId === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...prev, { itemId: item.id, quantity: 1 }];
    });
    return true;
  };

  const consumeItem = (itemId: string, statBoost: { hunger: number; happiness: number }) => {
    if (!activePet) return;

    setInventory((prev) =>
      prev
        .map((entry) =>
          entry.itemId === itemId ? { ...entry, quantity: Math.max(entry.quantity - 1, 0) } : entry
        )
        .filter((entry) => entry.quantity > 0)
    );

    setActivePet((prev) => {
      if (!prev) return null;
      const nextHunger = Math.min(prev.hunger + statBoost.hunger, 100);
      const nextHappiness = Math.min(prev.happiness + statBoost.happiness, 100);
      let nextLevel = prev.level;
      if (nextHappiness === 100 && nextHunger >= 80 && prev.level < 3) {
        nextLevel += 1;
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

  const claimQuestReward = (questId: string) => {
    const quest = quests.find((questItem) => questItem.id === questId);
    if (!quest || quest.currentValue < quest.targetValue || quest.isClaimed) return;

    setGems((prev) => prev + quest.gemReward);
    setQuests((prev) =>
      prev.map((questItem) =>
        questItem.id === questId ? { ...questItem, isClaimed: true } : questItem
      )
    );
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
        nextHunger = Math.min(prev.hunger + 15, 100);
      } else if (action === 'play') {
        nextHappiness = Math.min(prev.happiness + 15, 100);
      }

      if (nextHappiness === 100 && nextHunger >= 80 && prev.level < 3) {
        nextLevel += 1;
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
    <GameContext.Provider value={{ coins, gems, xp, tasks, activeEgg, activePet, inventory, quests, addTask, completeTodo, trackHabit, deleteTask, purchaseEgg, hatchPet, interactWithPet, buyShopItem, consumeItem, claimQuestReward }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
