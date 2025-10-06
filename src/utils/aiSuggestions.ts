import { FamilyMember, NutritionCoverage, PlanResult } from '../types';

export interface BudgetSuggestion {
  type: 'budget' | 'nutrition' | 'optimization' | 'seasonal';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action?: string;
  savings?: number;
}

export class AISuggestionEngine {
  static generateBudgetSuggestions(
    familyMembers: FamilyMember[],
    weeklyBudget: number,
    budgetUsed: number,
    nutritionCoverage: NutritionCoverage,
    foodPrices: Record<string, number>
  ): BudgetSuggestion[] {
    const suggestions: BudgetSuggestion[] = [];
    const familySize = familyMembers.reduce((sum, member) => sum + member.count, 0);
    const budgetUtilization = budgetUsed / weeklyBudget;
    const avgNutrition = Object.values(nutritionCoverage).reduce((a, b) => a + b, 0) / 6;

    // Budget optimization suggestions
    if (budgetUtilization > 0.9) {
      suggestions.push({
        type: 'budget',
        priority: 'high',
        title: 'Budget Exceeded - Smart Substitutions',
        description: 'Replace expensive items with nutritionally equivalent alternatives',
        action: 'Switch from chicken to eggs for protein (60% cost reduction)',
        savings: budgetUsed * 0.15
      });

      suggestions.push({
        type: 'optimization',
        priority: 'high',
        title: 'Bulk Buying Opportunity',
        description: 'Buy rice and dal in 5kg quantities to reduce per-unit cost by 20%',
        action: 'Purchase staples in bulk from wholesale markets',
        savings: budgetUsed * 0.12
      });
    }

    // Nutrition optimization suggestions
    if (nutritionCoverage.protein < 70) {
      suggestions.push({
        type: 'nutrition',
        priority: 'high',
        title: 'Protein Deficiency Alert',
        description: 'Current protein intake is below recommended levels',
        action: 'Add 2 eggs daily or increase dal portions by 25%',
        savings: -20 // Small cost increase for health benefit
      });
    }

    if (nutritionCoverage.iron < 60) {
      suggestions.push({
        type: 'nutrition',
        priority: 'high',
        title: 'Iron Boost Needed',
        description: 'Include iron-rich foods with vitamin C for better absorption',
        action: 'Add spinach + tomato combination, or jaggery with meals',
        savings: 0
      });
    }

    if (nutritionCoverage.calcium < 65) {
      suggestions.push({
        type: 'nutrition',
        priority: 'medium',
        title: 'Calcium Enhancement',
        description: 'Strengthen bone health with affordable calcium sources',
        action: 'Increase milk intake or add sesame seeds to meals',
        savings: -15
      });
    }

    // Seasonal and smart shopping suggestions
    const currentMonth = new Date().getMonth();
    const seasonalSuggestions = this.getSeasonalSuggestions(currentMonth);
    suggestions.push(...seasonalSuggestions);

    // Family-specific suggestions
    const childrenCount = familyMembers.find(m => m.type === 'child')?.count || 0;
    const elderlyCount = familyMembers.find(m => m.type === 'elderly')?.count || 0;

    if (childrenCount > 0) {
      suggestions.push({
        type: 'nutrition',
        priority: 'medium',
        title: 'Growing Children Nutrition',
        description: 'Children need extra calcium and protein for healthy growth',
        action: 'Ensure 2 glasses of milk daily and include eggs 4 times per week',
        savings: -25
      });
    }

    if (elderlyCount > 0) {
      suggestions.push({
        type: 'nutrition',
        priority: 'medium',
        title: 'Senior Nutrition Care',
        description: 'Elderly members need easily digestible, nutrient-dense foods',
        action: 'Include soft dal preparations and calcium-rich foods',
        savings: 0
      });
    }

    // Budget efficiency suggestions
    if (budgetUtilization < 0.7 && avgNutrition < 80) {
      suggestions.push({
        type: 'optimization',
        priority: 'medium',
        title: 'Underutilized Budget Opportunity',
        description: 'You have room to improve nutrition within your budget',
        action: 'Add fruits, nuts, or increase vegetable variety',
        savings: -(weeklyBudget - budgetUsed) * 0.5
      });
    }

    // Smart shopping tips
    suggestions.push({
      type: 'optimization',
      priority: 'low',
      title: 'Market Timing Strategy',
      description: 'Shop in the evening for better vegetable prices',
      action: 'Visit local markets after 6 PM for 15-20% discounts',
      savings: budgetUsed * 0.08
    });

    // Food combination suggestions
    suggestions.push({
      type: 'nutrition',
      priority: 'low',
      title: 'Complete Protein Combination',
      description: 'Rice + Dal provides all essential amino acids',
      action: 'Maintain 3:1 rice to dal ratio for optimal protein quality',
      savings: 0
    });

    return suggestions.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  private static getSeasonalSuggestions(month: number): BudgetSuggestion[] {
    const suggestions: BudgetSuggestion[] = [];

    // Winter months (Nov-Feb)
    if (month >= 10 || month <= 1) {
      suggestions.push({
        type: 'seasonal',
        priority: 'medium',
        title: 'Winter Vegetable Advantage',
        description: 'Carrots, spinach, and cauliflower are at peak season',
        action: 'Stock up on winter vegetables - they\'re 40% cheaper now',
        savings: 30
      });
    }

    // Summer months (Mar-Jun)
    if (month >= 2 && month <= 5) {
      suggestions.push({
        type: 'seasonal',
        priority: 'medium',
        title: 'Summer Hydration Focus',
        description: 'Include water-rich foods and cooling ingredients',
        action: 'Add cucumber, watermelon, and increase fluid intake',
        savings: 0
      });
    }

    // Monsoon months (Jul-Oct)
    if (month >= 6 && month <= 9) {
      suggestions.push({
        type: 'seasonal',
        priority: 'medium',
        title: 'Monsoon Immunity Boost',
        description: 'Focus on immunity-building foods during rainy season',
        action: 'Include turmeric, ginger, and vitamin C rich foods',
        savings: -10
      });
    }

    return suggestions;
  }

  static generateMealPlanSuggestions(planResult: PlanResult): BudgetSuggestion[] {
    const suggestions: BudgetSuggestion[] = [];

    // Analyze meal variety
    const uniqueFoods = new Set();
    planResult.mealPlans.forEach(plan => {
      [...plan.breakfast, ...plan.lunch, ...plan.dinner].forEach(food => {
        uniqueFoods.add(food);
      });
    });

    if (uniqueFoods.size < 12) {
      suggestions.push({
        type: 'nutrition',
        priority: 'medium',
        title: 'Increase Food Variety',
        description: 'More variety ensures better micronutrient coverage',
        action: 'Add 2-3 different vegetables or grains to your weekly plan',
        savings: -20
      });
    }

    // Check for balanced meals
    const proteinSources = ['Toor Dal', 'Moong Dal', 'Chana Dal', 'Eggs', 'Milk', 'Chicken'];
    const hasProteinInMeals = planResult.mealPlans.every(plan => 
      [...plan.breakfast, ...plan.lunch, ...plan.dinner].some(food => 
        proteinSources.some(protein => food.includes(protein))
      )
    );

    if (!hasProteinInMeals) {
      suggestions.push({
        type: 'nutrition',
        priority: 'high',
        title: 'Protein Distribution Issue',
        description: 'Some meals lack adequate protein sources',
        action: 'Ensure each meal has at least one protein source',
        savings: 0
      });
    }

    return suggestions;
  }

  static generatePersonalizedTips(
    userHistory: PlanResult[],
    currentPlan: PlanResult
  ): BudgetSuggestion[] {
    const suggestions: BudgetSuggestion[] = [];

    if (userHistory.length === 0) return suggestions;

    // Analyze user patterns
    const avgBudgetUsed = userHistory.reduce((sum, plan) => sum + plan.totalBudgetUsed, 0) / userHistory.length;
    const avgNutrition = userHistory.reduce((sum, plan) => {
      const nutrition = Object.values(plan.nutritionCoverage).reduce((a, b) => a + b, 0) / 6;
      return sum + nutrition;
    }, 0) / userHistory.length;

    // Budget trend analysis
    if (currentPlan.totalBudgetUsed > avgBudgetUsed * 1.2) {
      suggestions.push({
        type: 'budget',
        priority: 'high',
        title: 'Budget Spike Detected',
        description: `This plan costs 20% more than your usual ₹${avgBudgetUsed.toFixed(0)}`,
        action: 'Review expensive items and consider alternatives',
        savings: currentPlan.totalBudgetUsed - avgBudgetUsed
      });
    }

    // Nutrition improvement tracking
    const currentNutrition = Object.values(currentPlan.nutritionCoverage).reduce((a, b) => a + b, 0) / 6;
    if (currentNutrition > avgNutrition * 1.1) {
      suggestions.push({
        type: 'nutrition',
        priority: 'low',
        title: 'Nutrition Improvement!',
        description: `Great job! This plan is ${((currentNutrition - avgNutrition) / avgNutrition * 100).toFixed(0)}% more nutritious`,
        action: 'Keep up the excellent nutrition choices',
        savings: 0
      });
    }

    return suggestions;
  }
}