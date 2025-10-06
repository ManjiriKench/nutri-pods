import React, { useRef } from 'react';
import { Download, ShoppingCart, Calendar, BarChart3, Lightbulb, ArrowLeft, TrendingUp, Save } from 'lucide-react';
import { PlanResult } from '../types';
import NutritionChart from './NutritionChart';
import AISuggestionsPanel from './AISuggestionsPanel';
import { useAuth } from '../contexts/AuthContext';
import { MealPlanService } from '../services/mealPlanService';
import { AISuggestionEngine } from '../utils/aiSuggestions';

interface ResultsPageProps {
  result: PlanResult;
  onBack: () => void;
}

export default function ResultsPage({ result, onBack }: ResultsPageProps) {
  const { user } = useAuth();
  const contentRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  // Generate AI suggestions
  const aiSuggestions = React.useMemo(() => {
    if (!result.familyMembers || !result.weeklyBudget || !result.foodPrices) {
      return [];
    }
    
    const budgetSuggestions = AISuggestionEngine.generateBudgetSuggestions(
      result.familyMembers,
      result.weeklyBudget,
      result.totalBudgetUsed,
      result.nutritionCoverage,
      result.foodPrices
    );
    
    const mealPlanSuggestions = AISuggestionEngine.generateMealPlanSuggestions(result);
    
    return [...budgetSuggestions, ...mealPlanSuggestions];
  }, [result]);

  const handleDownloadPDF = async () => {
    // Import jsPDF dynamically to avoid issues with SSR
    const { default: jsPDF } = await import('jspdf');
    
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    let yPosition = 20;
    
    // Title
    pdf.setFontSize(20);
    pdf.text('NutriPods Meal Plan', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;
    
    // Summary
    pdf.setFontSize(14);
    pdf.text('Weekly Meal Plan Summary', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.text(`Family Size: ${result.familySize} members`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Budget Used: ₹${result.totalBudgetUsed.toFixed(2)}`, 20, yPosition);
    yPosition += 15;
    
    // Shopping List
    pdf.setFontSize(14);
    pdf.text('Shopping List', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(9);
    result.shoppingList.forEach((item) => {
      pdf.text(`• ${item.food}: ${item.quantity} ${item.unit} - ₹${item.price.toFixed(2)}`, 25, yPosition);
      yPosition += 5;
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
    });
    
    // Meal Plans
    yPosition += 10;
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.setFontSize(14);
    pdf.text('Weekly Meal Plan', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(9);
    result.mealPlans.forEach((plan) => {
      pdf.text(`${plan.day}:`, 25, yPosition);
      yPosition += 5;
      pdf.text(`  Breakfast: ${plan.breakfast.join(', ')}`, 30, yPosition);
      yPosition += 4;
      pdf.text(`  Lunch: ${plan.lunch.join(', ')}`, 30, yPosition);
      yPosition += 4;
      pdf.text(`  Dinner: ${plan.dinner.join(', ')}`, 30, yPosition);
      yPosition += 8;
      
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
    });
    
    pdf.save('nutripods-meal-plan.pdf');
  };

  const handleSavePlan = async () => {
    if (!user) return;
    
    setSaving(true);
    const planName = `Family Plan - ${new Date().toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric' 
    })}`;
    
    const { error } = await MealPlanService.saveMealPlan(planName, result);
    
    if (error) {
      console.error('Save error:', error);
      alert('Failed to save meal plan. Please check your connection and try again.');
    } else {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
    setSaving(false);
  };

  const nutritionItems = [
    { key: 'calories', label: 'Calories', value: result.nutritionCoverage.calories, color: 'bg-blue-500' },
    { key: 'protein', label: 'Protein', value: result.nutritionCoverage.protein, color: 'bg-green-500' },
    { key: 'iron', label: 'Iron', value: result.nutritionCoverage.iron, color: 'bg-red-500' },
    { key: 'calcium', label: 'Calcium', value: result.nutritionCoverage.calcium, color: 'bg-purple-500' },
    { key: 'vitaminA', label: 'Vitamin A', value: result.nutritionCoverage.vitaminA, color: 'bg-yellow-500' },
    { key: 'vitaminC', label: 'Vitamin C', value: result.nutritionCoverage.vitaminC, color: 'bg-orange-500' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" ref={contentRef}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 mb-4 sm:mb-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Planning</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Your Optimized Meal Plan</h1>
          <p className="text-gray-600">Generated for {result.familySize} family members</p>
        </div>
        
        <div className="flex space-x-3">
          {user && (
            <button
              onClick={handleSavePlan}
              disabled={saving}
              className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 
                       transition-colors flex items-center space-x-2 shadow-lg disabled:opacity-50"
            >
              <Save className="h-5 w-5" />
              <span>{saving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Plan'}</span>
            </button>
          )}
          
          <button
            onClick={handleDownloadPDF}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 
                     transition-colors flex items-center space-x-2 shadow-lg"
          >
            <Download className="h-5 w-5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Save Success Message */}
      {saveSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
          <p className="text-green-600 font-medium flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span>Meal plan saved successfully! Access it anytime from "My Plans".</span>
          </p>
        </div>
      )}

      {/* AI Suggestions */}
      {aiSuggestions.length > 0 && (
        <div className="mb-8">
        <AISuggestionsPanel suggestions={aiSuggestions} />
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Budget Used</p>
              <p className="text-2xl font-bold text-gray-900">₹{result.totalBudgetUsed.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Nutrition</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(Object.values(result.nutritionCoverage).reduce((a, b) => a + b, 0) / 6)}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Meals Planned</p>
              <p className="text-2xl font-bold text-gray-900">{result.mealPlans.length * 3}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Shopping List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <ShoppingCart className="h-6 w-6 text-emerald-600" />
            <h2 className="text-xl font-semibold">Shopping List</h2>
          </div>
          
          <div className="space-y-3">
            {result.shoppingList.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium">{item.food}</span>
                  <span className="text-gray-600 text-sm ml-2">
                    {item.quantity} {item.unit}
                  </span>
                </div>
                <span className="font-semibold text-gray-900">₹{item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total</span>
              <span>₹{result.totalBudgetUsed.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Nutrition Coverage */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="h-6 w-6 text-amber-600" />
            <h2 className="text-xl font-semibold">Nutrition Coverage</h2>
          </div>
          
          <NutritionChart nutritionData={result.nutritionCoverage} />
          
          <div className="mt-4 space-y-2">
            {nutritionItems.map((item) => (
              <div key={item.key} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span>{item.label}</span>
                </div>
                <span className="font-medium">{item.value.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Meal Plan */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="h-6 w-6 text-orange-600" />
          <h2 className="text-xl font-semibold">7-Day Meal Plan</h2>
        </div>
        
        <div className="grid gap-4">
          {result.mealPlans.map((plan, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">{plan.day}</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-emerald-600 mb-2">Breakfast</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {plan.breakfast.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-amber-600 mb-2">Lunch</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {plan.lunch.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-orange-600 mb-2">Dinner</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {plan.dinner.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Tips */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="h-6 w-6 text-yellow-600" />
          <h2 className="text-xl font-semibold">Budget Optimization Tips</h2>
        </div>
        
        <div className="space-y-3">
          {result.budgetTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-yellow-600 text-sm font-semibold">{index + 1}</span>
              </div>
              <p className="text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}