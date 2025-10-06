import { FoodItem } from '../types';

export const foodDatabase: FoodItem[] = [
  // Grains & Cereals
  {
    id: 'rice',
    name: 'Rice',
    costPer100g: 4.0,
    calories: 130,
    protein: 2.7,
    iron: 0.8,
    calcium: 28,
    vitaminA: 0,
    vitaminC: 0,
    category: 'grains',
    unit: 'kg'
  },
  {
    id: 'wheat',
    name: 'Wheat Flour',
    costPer100g: 3.5,
    calories: 364,
    protein: 12.6,
    iron: 3.2,
    calcium: 41,
    vitaminA: 0,
    vitaminC: 0,
    category: 'grains',
    unit: 'kg'
  },
  {
    id: 'millet',
    name: 'Millet',
    costPer100g: 5.0,
    calories: 378,
    protein: 11.0,
    iron: 3.0,
    calcium: 8,
    vitaminA: 0,
    vitaminC: 0,
    category: 'grains',
    unit: 'kg'
  },
  
  // Pulses & Legumes
  {
    id: 'toor_dal',
    name: 'Toor Dal',
    costPer100g: 9.0,
    calories: 335,
    protein: 22.3,
    iron: 2.7,
    calcium: 73,
    vitaminA: 0,
    vitaminC: 0,
    category: 'pulses',
    unit: 'kg'
  },
  {
    id: 'moong_dal',
    name: 'Moong Dal',
    costPer100g: 11.0,
    calories: 347,
    protein: 24.5,
    iron: 3.9,
    calcium: 124,
    vitaminA: 0,
    vitaminC: 0,
    category: 'pulses',
    unit: 'kg'
  },
  {
    id: 'chana_dal',
    name: 'Chana Dal',
    costPer100g: 8.5,
    calories: 360,
    protein: 20.1,
    iron: 2.9,
    calcium: 56,
    vitaminA: 0,
    vitaminC: 0,
    category: 'pulses',
    unit: 'kg'
  },
  
  // Vegetables
  {
    id: 'potato',
    name: 'Potato',
    costPer100g: 2.5,
    calories: 77,
    protein: 2.0,
    iron: 0.8,
    calcium: 12,
    vitaminA: 2,
    vitaminC: 19.7,
    category: 'vegetables',
    unit: 'kg'
  },
  {
    id: 'onion',
    name: 'Onion',
    costPer100g: 3.0,
    calories: 40,
    protein: 1.1,
    iron: 0.2,
    calcium: 23,
    vitaminA: 0,
    vitaminC: 7.4,
    category: 'vegetables',
    unit: 'kg'
  },
  {
    id: 'tomato',
    name: 'Tomato',
    costPer100g: 4.0,
    calories: 18,
    protein: 0.9,
    iron: 0.3,
    calcium: 10,
    vitaminA: 42,
    vitaminC: 13.7,
    category: 'vegetables',
    unit: 'kg'
  },
  {
    id: 'spinach',
    name: 'Spinach',
    costPer100g: 6.0,
    calories: 23,
    protein: 2.9,
    iron: 2.7,
    calcium: 99,
    vitaminA: 469,
    vitaminC: 28.1,
    category: 'vegetables',
    unit: 'kg'
  },
  {
    id: 'carrot',
    name: 'Carrot',
    costPer100g: 4.5,
    calories: 41,
    protein: 0.9,
    iron: 0.3,
    calcium: 33,
    vitaminA: 835,
    vitaminC: 5.9,
    category: 'vegetables',
    unit: 'kg'
  },
  
  // Dairy & Protein
  {
    id: 'milk',
    name: 'Milk',
    costPer100g: 5.0,
    calories: 60,
    protein: 3.4,
    iron: 0.0,
    calcium: 125,
    vitaminA: 46,
    vitaminC: 0,
    category: 'dairy',
    unit: 'liter'
  },
  {
    id: 'eggs',
    name: 'Eggs',
    costPer100g: 6.0,
    calories: 155,
    protein: 13.0,
    iron: 1.8,
    calcium: 50,
    vitaminA: 140,
    vitaminC: 0,
    category: 'protein',
    unit: 'dozen'
  },
  {
    id: 'chicken',
    name: 'Chicken',
    costPer100g: 15.0,
    calories: 239,
    protein: 27.3,
    iron: 1.3,
    calcium: 15,
    vitaminA: 0,
    vitaminC: 0,
    category: 'protein',
    unit: 'kg'
  },
  
  // Oils & Fats
  {
    id: 'mustard_oil',
    name: 'Mustard Oil',
    costPer100g: 12.0,
    calories: 884,
    protein: 0,
    iron: 0,
    calcium: 0,
    vitaminA: 0,
    vitaminC: 0,
    category: 'oils',
    unit: 'liter'
  },
  {
    id: 'ghee',
    name: 'Ghee',
    costPer100g: 50.0,
    calories: 900,
    protein: 0,
    iron: 0,
    calcium: 0,
    vitaminA: 0,
    vitaminC: 0,
    category: 'oils',
    unit: 'kg'
  },
  
  // Fruits
  {
    id: 'banana',
    name: 'Banana',
    costPer100g: 3.5,
    calories: 89,
    protein: 1.1,
    iron: 0.3,
    calcium: 5,
    vitaminA: 3,
    vitaminC: 8.7,
    category: 'fruits',
    unit: 'dozen'
  },
  {
    id: 'apple',
    name: 'Apple',
    costPer100g: 8.0,
    calories: 52,
    protein: 0.3,
    iron: 0.1,
    calcium: 6,
    vitaminA: 3,
    vitaminC: 4.6,
    category: 'fruits',
    unit: 'kg'
  },
  
  // Spices & Others
  {
    id: 'salt',
    name: 'Salt',
    costPer100g: 2.0,
    calories: 0,
    protein: 0,
    iron: 0,
    calcium: 0,
    vitaminA: 0,
    vitaminC: 0,
    category: 'spices',
    unit: 'kg'
  },
  {
    id: 'turmeric',
    name: 'Turmeric',
    costPer100g: 25.0,
    calories: 354,
    protein: 7.8,
    iron: 41.4,
    calcium: 183,
    vitaminA: 0,
    vitaminC: 25.9,
    category: 'spices',
    unit: 'kg'
  },
  {
    id: 'jaggery',
    name: 'Jaggery',
    costPer100g: 4.5,
    calories: 383,
    protein: 0.4,
    iron: 11.0,
    calcium: 85,
    vitaminA: 0,
    vitaminC: 0,
    category: 'sweeteners',
    unit: 'kg'
  }
];

export const getDefaultFoodPrices = (): Record<string, number> => {
  const prices: Record<string, number> = {};
  foodDatabase.forEach(food => {
    prices[food.id] = food.costPer100g;
  });
  return prices;
};