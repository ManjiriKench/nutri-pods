import React, { useState } from 'react';
import { Users, DollarSign, ShoppingCart, Calculator, Plus, Minus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AISuggestionsPanel from './AISuggestionsPanel';
import { FamilyMember, PlanInput } from '../types';
import { getDefaultFoodPrices } from '../data/foodDatabase';
import { UserPreferencesService } from '../services/mealPlanService';
import { AISuggestionEngine } from '../utils/aiSuggestions';

interface PlanMealsPageProps {
  onGeneratePlan: (planInput: PlanInput) => void;
  onAuthClick: () => void;
}

export default function PlanMealsPage({ onGeneratePlan, onAuthClick }: PlanMealsPageProps) {
  const { user } = useAuth();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { type: 'adult', count: 2 },
    { type: 'child', count: 1 },
    { type: 'elderly', count: 0 }
  ]);
  
  const [weeklyBudget, setWeeklyBudget] = useState<number>(500);
  const [currency] = useState<string>('₹');
  const [foodPrices, setFoodPrices] = useState(getDefaultFoodPrices());
  const [isLoading, setIsLoading] = useState(false);

  // Generate planning suggestions
  const planningSuggestions = React.useMemo(() => {
    const mockNutritionCoverage = {
      calories: 85,
      protein: 70,
      iron: 60,
      calcium: 75,
      vitaminA: 65,
      vitaminC: 80
    };
    
    return AISuggestionEngine.generateBudgetSuggestions(
      familyMembers,
      weeklyBudget,
      weeklyBudget * 0.85, // Estimated usage
      mockNutritionCoverage,
      foodPrices
    ).slice(0, 3); // Show only top 3 suggestions
  }, [familyMembers, weeklyBudget, foodPrices]);

  // Load user preferences on component mount
  React.useEffect(() => {
    if (user) {
      loadUserPreferences();
    }
  }, [user]);

  const loadUserPreferences = async () => {
    const { data: profile } = await UserPreferencesService.getUserProfile();
    const { data: userFoodPrices } = await UserPreferencesService.getUserFoodPrices();
    
    if (profile) {
      if (profile.family_size) {
        // Distribute family size across member types (simplified)
        const adults = Math.max(1, Math.floor(profile.family_size * 0.6));
        const children = Math.max(0, Math.floor(profile.family_size * 0.3));
        const elderly = Math.max(0, profile.family_size - adults - children);
        
        setFamilyMembers([
          { type: 'adult', count: adults },
          { type: 'child', count: children },
          { type: 'elderly', count: elderly }
        ]);
      }
      
      if (profile.default_budget) {
        setWeeklyBudget(profile.default_budget);
      }
    }
    
    if (userFoodPrices && Object.keys(userFoodPrices).length > 0) {
      setFoodPrices(prev => ({ ...prev, ...userFoodPrices }));
    }
  };

  const updateFamilyMember = (type: 'adult' | 'child' | 'elderly', count: number) => {
    setFamilyMembers(prev => 
      prev.map(member => 
        member.type === type 
          ? { ...member, count: Math.max(0, count) }
          : member
      )
    );
  };

  const updateFoodPrice = (foodId: string, price: number) => {
    setFoodPrices(prev => ({
      ...prev,
      [foodId]: Math.max(0, price)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      onAuthClick();
      return;
    }
    
    setIsLoading(true);
    
    // Save user preferences
    if (user) {
      await UserPreferencesService.updateUserProfile({
        family_size: totalFamilySize,
        default_budget: weeklyBudget
      });
      
      await UserPreferencesService.saveUserFoodPrices(foodPrices);
    }
    
    const planInput: PlanInput = {
      familyMembers,
      weeklyBudget,
      currency,
      foodPrices
    };
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onGeneratePlan(planInput);
    setIsLoading(false);
  };

  const totalFamilySize = familyMembers.reduce((sum, member) => sum + member.count, 0);

  const foodItems = [
    { id: 'rice', name: 'Rice (per kg)', unit: 'kg' },
    { id: 'wheat', name: 'Wheat Flour (per kg)', unit: 'kg' },
    { id: 'toor_dal', name: 'Toor Dal (per kg)', unit: 'kg' },
    { id: 'moong_dal', name: 'Moong Dal (per kg)', unit: 'kg' },
    { id: 'potato', name: 'Potato (per kg)', unit: 'kg' },
    { id: 'onion', name: 'Onion (per kg)', unit: 'kg' },
    { id: 'tomato', name: 'Tomato (per kg)', unit: 'kg' },
    { id: 'spinach', name: 'Spinach (per kg)', unit: 'kg' },
    { id: 'milk', name: 'Milk (per liter)', unit: 'liter' },
    { id: 'eggs', name: 'Eggs (per dozen)', unit: 'dozen' },
    { id: 'mustard_oil', name: 'Mustard Oil (per liter)', unit: 'liter' },
    { id: 'banana', name: 'Banana (per dozen)', unit: 'dozen' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Generating Your Meal Plan...</h2>
          <p className="text-gray-600">Optimizing nutrition within your budget</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Plan Your Meals</h1>
        <p className="text-lg text-gray-600">
          Enter your family details and local food prices to get a personalized meal plan
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Family Size Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="h-6 w-6 text-emerald-600" />
            <h2 className="text-xl font-semibold">Family Details</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {familyMembers.map((member) => (
              <div key={member.type} className="border rounded-lg p-4">
                <h3 className="font-medium capitalize text-gray-900 mb-3">
                  {member.type === 'child' ? 'Children (5-12 years)' : 
                   member.type === 'elderly' ? 'Elderly (60+ years)' : 'Adults'}
                </h3>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => updateFamilyMember(member.type, member.count - 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">{member.count}</span>
                  <button
                    type="button"
                    onClick={() => updateFamilyMember(member.type, member.count + 1)}
                    className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center hover:bg-emerald-200"
                  >
                    <Plus className="h-4 w-4 text-emerald-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
            <p className="text-emerald-800">
              <strong>Total Family Size:</strong> {totalFamilySize} members
            </p>
          </div>
        </div>

        {/* Budget Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <DollarSign className="h-6 w-6 text-amber-600" />
            <h2 className="text-xl font-semibold">Weekly Budget</h2>
          </div>
          
          <div className="max-w-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget for groceries (per week)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                {currency}
              </span>
              <input
                type="number"
                value={weeklyBudget}
                onChange={(e) => setWeeklyBudget(Number(e.target.value))}
                className="pl-8 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="500"
                min="1"
                required
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Per person per week: {currency}{(weeklyBudget / Math.max(totalFamilySize, 1)).toFixed(0)}
            </p>
          </div>
        </div>

        {/* Food Prices Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <ShoppingCart className="h-6 w-6 text-orange-600" />
            <h2 className="text-xl font-semibold">Local Food Prices</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Update the prices based on your local market rates
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foodItems.map((item) => (
              <div key={item.id} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {item.name}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {currency}
                  </span>
                  <input
                    type="number"
                    value={foodPrices[item.id] || 0}
                    onChange={(e) => updateFoodPrice(item.id, Number(e.target.value))}
                    className="pl-8 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Planning Suggestions */}
        <div className="mb-8">
          <AISuggestionsPanel 
            suggestions={planningSuggestions}
            onApplySuggestion={(suggestion) => {
              // Handle suggestion application
              console.log('Applying suggestion:', suggestion);
              alert(`Applied suggestion: ${suggestion.title}`);
            }}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          {!user && (
            <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800">
                <strong>Sign in required:</strong> Please sign in to generate your personalized meal plan.
              </p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={totalFamilySize === 0 || weeklyBudget <= 0 || loading}
            className="bg-emerald-600 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 
                     transition-colors flex items-center space-x-2 text-lg font-semibold mx-auto shadow-lg
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Calculator className="h-5 w-5" />
            <span>{user ? 'Generate Meal Plan' : 'Sign In to Generate Plan'}</span>
          </button>
          
          {totalFamilySize === 0 && (
            <p className="text-red-600 text-sm mt-2">
              Please add at least one family member
            </p>
          )}
        </div>
      </form>
    </div>
  );
}