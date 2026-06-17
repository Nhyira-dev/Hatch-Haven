import { ShopItem } from '../../types';

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'f1',
    name: 'Crunchy Apple',
    emoji: '🍎',
    cost: 15,
    description: 'A crisp orchard treat.',
    category: 'food',
    statBoost: { hunger: 20, happiness: 5 },
  },
  {
    id: 'f2',
    name: 'Sweet Carrot',
    emoji: '🥕',
    cost: 12,
    description: 'Freshly harvested soil treat.',
    category: 'food',
    statBoost: { hunger: 15, happiness: 5 },
  },
  {
    id: 'r1',
    name: 'Rainbow Berry',
    emoji: '🍓',
    cost: 45,
    description: 'Bursting with magical energy.',
    category: 'rare_food',
    statBoost: { hunger: 40, happiness: 30 },
  },
  {
    id: 'r2',
    name: 'Moon Cookie',
    emoji: '🥮',
    cost: 60,
    description: 'Baked with cosmic stardust.',
    category: 'rare_food',
    statBoost: { hunger: 30, happiness: 50 },
  },
];
