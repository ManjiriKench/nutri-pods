import { supabase } from '../lib/supabase';
import { PlanResult, SavedPlan } from '../types';

export class MealPlanService {
  static async saveMealPlan(planName: string, planResult: PlanResult): Promise<{ data: SavedPlan | null; error: any }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      const { data, error } = await supabase
        .from('saved_meal_plans')
        .insert({
          user_id: user.id,
          plan_name: planName,
          family_members: planResult.familyMembers || [],
          weekly_budget: planResult.weeklyBudget || 0,
          food_prices: planResult.foodPrices || {},
          shopping_list: planResult.shoppingList,
          meal_plans: planResult.mealPlans,
          nutrition_coverage: planResult.nutritionCoverage,
          total_budget_used: planResult.totalBudgetUsed,
          budget_tips: planResult.budgetTips
        })
        .select()
        .single();

      if (error) {
        return { data: null, error };
      }

      const savedPlan: SavedPlan = {
        id: data.id,
        userId: data.user_id,
        planName: data.plan_name,
        planResult: {
          shoppingList: data.shopping_list,
          mealPlans: data.meal_plans,
          nutritionCoverage: data.nutrition_coverage,
          totalBudgetUsed: data.total_budget_used,
          budgetTips: data.budget_tips,
          familySize: planResult.familySize,
          userId: user.id
        },
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };

      return { data: savedPlan, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async getUserMealPlans(): Promise<{ data: SavedPlan[] | null; error: any }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      const { data, error } = await supabase
        .from('saved_meal_plans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        return { data: null, error };
      }

      const savedPlans: SavedPlan[] = data.map(plan => ({
        id: plan.id,
        userId: plan.user_id,
        planName: plan.plan_name,
        planResult: {
          shoppingList: plan.shopping_list,
          mealPlans: plan.meal_plans,
          nutritionCoverage: plan.nutrition_coverage,
          totalBudgetUsed: plan.total_budget_used,
          budgetTips: plan.budget_tips,
          familySize: plan.family_members?.reduce((sum: number, member: any) => sum + member.count, 0) || 1,
          userId: user.id
        },
        createdAt: plan.created_at,
        updatedAt: plan.updated_at
      }));

      return { data: savedPlans, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async deleteMealPlan(planId: string): Promise<{ error: any }> {
    try {
      const { error } = await supabase
        .from('saved_meal_plans')
        .delete()
        .eq('id', planId);

      return { error };
    } catch (error) {
      return { error };
    }
  }

  static async updateMealPlan(planId: string, planName: string, planResult: PlanResult): Promise<{ data: SavedPlan | null; error: any }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      const { data, error } = await supabase
        .from('saved_meal_plans')
        .update({
          plan_name: planName,
          family_members: planResult.familyMembers || [],
          weekly_budget: planResult.weeklyBudget || 0,
          food_prices: planResult.foodPrices || {},
          shopping_list: planResult.shoppingList,
          meal_plans: planResult.mealPlans,
          nutrition_coverage: planResult.nutritionCoverage,
          total_budget_used: planResult.totalBudgetUsed,
          budget_tips: planResult.budgetTips
        })
        .eq('id', planId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        return { data: null, error };
      }

      const savedPlan: SavedPlan = {
        id: data.id,
        userId: data.user_id,
        planName: data.plan_name,
        planResult: {
          shoppingList: data.shopping_list,
          mealPlans: data.meal_plans,
          nutritionCoverage: data.nutrition_coverage,
          totalBudgetUsed: data.total_budget_used,
          budgetTips: data.budget_tips,
          familySize: planResult.familySize,
          userId: user.id
        },
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };

      return { data: savedPlan, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
}

export class UserPreferencesService {
  static async saveUserFoodPrices(foodPrices: Record<string, number>): Promise<{ error: any }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { error: { message: 'User not authenticated' } };
      }

      // Convert food prices to array format for bulk upsert
      const foodPriceEntries = Object.entries(foodPrices).map(([foodId, price]) => ({
        user_id: user.id,
        food_id: foodId,
        food_name: foodId.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        price_per_unit: price,
        unit: 'kg' // Default unit, could be made dynamic
      }));

      const { error } = await supabase
        .from('user_food_prices')
        .upsert(foodPriceEntries, { 
          onConflict: 'user_id,food_id',
          ignoreDuplicates: false 
        });

      return { error };
    } catch (error) {
      return { error };
    }
  }

  static async getUserFoodPrices(): Promise<{ data: Record<string, number> | null; error: any }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      const { data, error } = await supabase
        .from('user_food_prices')
        .select('food_id, price_per_unit')
        .eq('user_id', user.id);

      if (error) {
        return { data: null, error };
      }

      const foodPrices: Record<string, number> = {};
      data.forEach(item => {
        foodPrices[item.food_id] = item.price_per_unit;
      });

      return { data: foodPrices, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async updateUserProfile(profile: { full_name?: string; family_size?: number; default_budget?: number; currency?: string }): Promise<{ error: any }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { error: { message: 'User not authenticated' } };
      }

      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          ...profile
        }, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      return { error };
    } catch (error) {
      return { error };
    }
  }

  static async getUserProfile(): Promise<{ data: any | null; error: any }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }
}