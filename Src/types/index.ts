export type Difficulty = 'trivial' | 'easy' | 'medium' | 'hard';

export interface Task {
  id: string;
  title: string;
  type: 'habit' | 'todo';
  difficulty: Difficulty;
  isCompleted: boolean;
  streak?: number;
  createdAt: Date;
}

export interface GameState {
  coins: number;
  gems: number;
  xp: number;
  tasks: Task[];
}

export type GrowthStage = 'Baby' | 'Juvenile' | 'Adult';

export interface Pet {
  id: string;
  name: string;
  type: string;
  emoji: string;
  stage: GrowthStage;
  hunger: number;
  happiness: number;
  level: number;
}

export interface ShopItem {
  id: string;
  name: string;
  emoji: string;
  cost: number;
  description: string;
  category: 'food' | 'rare_food';
  statBoost: { hunger: number; happiness: number };
}

export interface InventoryItem {
  itemId: string;
  quantity: number;
}

export type EggType = 'Nature' | 'Dragon' | 'Ocean' | 'Galaxy' | 'Forest';

export interface Egg {
  id: string;
  type: EggType;
  emoji: string;
  xpProgress: number;
  xpRequired: number;
  isHatched: boolean;
}
