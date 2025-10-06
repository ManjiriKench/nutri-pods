import { FoodItem, FamilyMember, PlanInput, PlanResult, MealPlan, ShoppingItem, NutritionCoverage } from '../types';
import { foodDatabase } from '../data/foodDatabase';

// Daily nutrition requirements per person type
const DAILY_REQUIREMENTS = {
  adult: { calories: 2000, protein: 50, iron: 18, calcium: 1000, vitaminA: 900, vitaminC: 90 },
  child: { calories: 1500, protein: 35, iron: 10, calcium: 800, vitaminA: 600, vitaminC: 45 },
  elderly: { calories: 1800, protein: 50, iron: 8, calcium: 1200, vitaminA: 900, vitaminC: 90 }
};

const MEAL_TEMPLATES = [
  {
    breakfast: ['rice', 'milk', 'jaggery'],
    lunch: ['rice', 'toor_dal', 'potato', 'onion', 'mustard_oil'],
    dinner: ['wheat', 'moong_dal', 'spinach', 'tomato', 'mustard_oil']
  },
  {
    breakfast: ['wheat', 'milk', 'banana'],
    lunch: ['rice', 'chana_dal', 'carrot', 'onion', 'mustard_oil'],
    dinner: ['millet', 'toor_dal', 'potato', 'spinach', 'mustard_oil']
  },
  {
    breakfast: ['rice', 'eggs', 'salt'],
    lunch: ['wheat', 'moong_dal', 'tomato', 'onion', 'mustard_oil'],
    dinner: ['rice', 'toor_dal', 'carrot', 'potato', 'mustard_oil']
  }
];

export function calculateTotalRequirements(familyMembers: FamilyMember[]) {
  let total = {
    calories: 0,
    protein: 0,
    iron: 0,
    calcium: 0,
    vitaminA: 0,
    vitaminC: 0
  };

  familyMembers.forEach(member => {
    const req = DAILY_REQUIREMENTS[member.type];
    total.calories += req.calories * member.count * 7; // weekly
    total.protein += req.protein * member.count * 7;
    total.iron += req.iron * member.count * 7;
    total.calcium += req.calcium * member.count * 7;
    total.vitaminA += req.vitaminA * member.count * 7;
    total.vitaminC += req.vitaminC * member.count * 7;
  });

  return total;
}

export function optimizeMealPlan(planInput: PlanInput): PlanResult {
  const { familyMembers, weeklyBudget, foodPrices } = planInput;
  
  // Calculate total family size
  const familySize = familyMembers.reduce((sum, member) => sum + member.count, 0);
  
  // Calculate weekly nutrition requirements
  const totalRequirements = calculateTotalRequirements(familyMembers);
  
  // Create food items with updated prices
  const availableFoods = foodDatabase.map(food => ({
    ...food,
    costPer100g: foodPrices[food.id] || food.costPer100g
  }));

  // Enhanced nutrition efficiency calculation
  const foodEfficiency = availableFoods.map(food => {
    // Weight different nutrients based on importance and scarcity
    const nutritionScore = (
      food.calories * 0.3 +
      food.protein * 8 +  // Protein is expensive and important
      food.iron * 50 +    // Iron deficiency is common
      food.calcium * 0.5 +
      food.vitaminA * 2 +
      food.vitaminC * 3
    );
    
    return {
    ...food,
      efficiency: nutritionScore / food.costPer100g,
      nutritionScore
    };
  }).sort((a, b) => b.efficiency - a.efficiency);

  // Generate meal plans for 7 days
  const mealPlans: MealPlan[] = [];
  const shoppingList: Record<string, { quantity: number; price: number; unit: string }> = {};
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Basic quantities per person per meal (in grams)
  const baseQuantities: Record<string, number> = {
    rice: 90,
    wheat: 80,
    millet: 85,
    toor_dal: 35,
    moong_dal: 35,
    chana_dal: 35,
    potato: 120,
    onion: 40,
    tomato: 60,
    spinach: 60,
    carrot: 50,
    milk: 250, // ml
    eggs: 60, // per piece
    chicken: 100,
    mustard_oil: 15,
    banana: 120,
    salt: 3,
    turmeric: 2,
    jaggery: 20
  };

  days.forEach((day, index) => {
    const templateIndex = index % MEAL_TEMPLATES.length;
    const template = MEAL_TEMPLATES[templateIndex];
    
    mealPlans.push({
      day,
      breakfast: template.breakfast.map(foodId => {
        const food = availableFoods.find(f => f.id === foodId);
        return food ? food.name : foodId;
      }),
      lunch: template.lunch.map(foodId => {
        const food = availableFoods.find(f => f.id === foodId);
        return food ? food.name : foodId;
      }),
      dinner: template.dinner.map(foodId => {
        const food = availableFoods.find(f => f.id === foodId);
        return food ? food.name : foodId;
      })
    });

    // Add to shopping list
    [...template.breakfast, ...template.lunch, ...template.dinner].forEach(foodId => {
      const food = availableFoods.find(f => f.id === foodId);
      if (food && baseQuantities[foodId]) {
        const quantity = baseQuantities[foodId] * familySize / 1000; // Convert to kg
        
        if (!shoppingList[food.name]) {
          shoppingList[food.name] = {
            quantity: 0,
            price: food.costPer100g,
            unit: food.unit
          };
        }
        shoppingList[food.name].quantity += quantity;
      }
    });
  });

  // Convert shopping list to array format
  const shoppingListArray: ShoppingItem[] = Object.entries(shoppingList).map(([foodName, data]) => ({
    food: foodName,
    quantity: Math.round(data.quantity * 100) / 100,
    unit: data.unit,
    price: Math.round(data.quantity * data.price * 100) / 100
  }));

  // Calculate total budget used
  const totalBudgetUsed = shoppingListArray.reduce((sum, item) => sum + item.price, 0);

  // Enhanced nutrition coverage calculation
  let totalNutrition = {
    calories: 0,
    protein: 0,
    iron: 0,
    calcium: 0,
    vitaminA: 0,
    vitaminC: 0
  };

  // Calculate actual nutrition from shopping list
  shoppingListArray.forEach(item => {
    const food = availableFoods.find(f => f.name === item.food);
    if (food) {
      const quantityInGrams = item.quantity * 1000; // Convert kg to grams
      const multiplier = quantityInGrams / 100; // Per 100g nutrition data
      
      totalNutrition.calories += food.calories * multiplier;
      totalNutrition.protein += food.protein * multiplier;
      totalNutrition.iron += food.iron * multiplier;
      totalNutrition.calcium += food.calcium * multiplier;
      totalNutrition.vitaminA += food.vitaminA * multiplier;
      totalNutrition.vitaminC += food.vitaminC * multiplier;
    }
  });

  const nutritionCoverage: NutritionCoverage = {
    calories: Math.min((totalNutrition.calories / totalRequirements.calories) * 100, 100),
    protein: Math.min((totalNutrition.protein / totalRequirements.protein) * 100, 100),
    iron: Math.min((totalNutrition.iron / totalRequirements.iron) * 100, 100),
    calcium: Math.min((totalNutrition.calcium / totalRequirements.calcium) * 100, 100),
    vitaminA: Math.min((totalNutrition.vitaminA / totalRequirements.vitaminA) * 100, 100),
    vitaminC: Math.min((totalNutrition.vitaminC / totalRequirements.vitaminC) * 100, 100)
  };

  // Generate budget tips
  const budgetTips = generateBudgetTips(totalBudgetUsed, weeklyBudget, nutritionCoverage);

  return {
    shoppingList: shoppingListArray,
    mealPlans,
    nutritionCoverage,
    totalBudgetUsed,
    budgetTips,
    familySize
  };
}

function generateBudgetTips(budgetUsed: number, totalBudget: number, nutrition: NutritionCoverage): string[] {
  const tips: string[] = [];
  
  const budgetUtilization = budgetUsed / totalBudget;
  
  if (budgetUtilization < 0.7) {
    tips.push("Excellent! You're well under budget. Consider adding more protein-rich foods like eggs, dal, or milk.");
  } else if (budgetUtilization < 0.9) {
    tips.push("Good budget management! You have some room to add nutritious foods like fruits or vegetables.");
  } else if (budgetUtilization > 1.0) {
    tips.push("Budget exceeded. Try substituting expensive items with cost-effective alternatives like seasonal vegetables.");
  }
  
  if (nutrition.protein < 80) {
    tips.push("Boost protein by combining rice with dal (complete protein) or adding affordable eggs to meals.");
  }
  
  if (nutrition.iron < 70) {
    tips.push("Improve iron absorption by pairing iron-rich foods (spinach, jaggery) with vitamin C sources (tomatoes).");
  }
  
  if (nutrition.vitaminA < 60) {
    tips.push("Include orange and green vegetables (carrots, spinach) - they're affordable and rich in vitamin A.");
  }
  
  if (nutrition.calcium < 70) {
    tips.push("Strengthen bones with milk, leafy greens, or sesame seeds - all budget-friendly calcium sources.");
  }
  
  if (nutrition.vitaminC < 60) {
    tips.push("Add citrus fruits or tomatoes to boost vitamin C and help iron absorption.");
  }
  
  // Always include these practical tips
  tips.push("Buy staples (rice, dal, oil) in bulk to reduce per-unit costs significantly.");
  tips.push("Choose seasonal vegetables - they're 30-50% cheaper and at peak nutrition.");
  tips.push("Cook dal with turmeric and pair with rice for complete protein at low cost.");
  
  return tips;
}