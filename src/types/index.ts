export interface FoodItem {
  id: string;
  name: string;
  costPer100g: number;
  calories: number;
  protein: number;
  iron: number;
  calcium: number;
  vitaminA: number;
  vitaminC: number;
  category: string;
  unit: string;
}

export interface FamilyMember {
  type: 'adult' | 'child' | 'elderly';
  count: number;
}

export interface PlanInput {
  familyMembers: FamilyMember[];
  weeklyBudget: number;
  currency: string;
  foodPrices: Record<string, number>;
}

export interface MealPlan {
  day: string;
  breakfast: string[];
  lunch: string[];
  dinner: string[];
}

export interface ShoppingItem {
  food: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface NutritionCoverage {
  calories: number;
  protein: number;
  iron: number;
  calcium: number;
  vitaminA: number;
  vitaminC: number;
}

export interface PlanResult {
  shoppingList: ShoppingItem[];
  mealPlans: MealPlan[];
  nutritionCoverage: NutritionCoverage;
  totalBudgetUsed: number;
  budgetTips: string[];
  familySize: number;
  userId?: string;
  familyMembers?: FamilyMember[];
  weeklyBudget?: number;
  foodPrices?: Record<string, number>;
}

export interface SavedPlan {
  id: string;
  userId: string;
  planName: string;
  planResult: PlanResult;
  createdAt: string;
  updatedAt: string;
}