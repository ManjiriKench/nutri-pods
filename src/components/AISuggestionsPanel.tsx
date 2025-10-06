import React from 'react';
import { Lightbulb, TrendingUp, DollarSign, Heart, Leaf, AlertTriangle } from 'lucide-react';
import { BudgetSuggestion } from '../utils/aiSuggestions';

interface AISuggestionsPanelProps {
  suggestions: BudgetSuggestion[];
  onApplySuggestion?: (suggestion: BudgetSuggestion) => void;
}

export default function AISuggestionsPanel({ suggestions, onApplySuggestion }: AISuggestionsPanelProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'budget':
        return DollarSign;
      case 'nutrition':
        return Heart;
      case 'optimization':
        return TrendingUp;
      case 'seasonal':
        return Leaf;
      default:
        return Lightbulb;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'budget':
        return 'text-green-600 bg-green-100';
      case 'nutrition':
        return 'text-red-600 bg-red-100';
      case 'optimization':
        return 'text-blue-600 bg-blue-100';
      case 'seasonal':
        return 'text-emerald-600 bg-emerald-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatSavings = (savings?: number) => {
    if (!savings) return null;
    if (savings > 0) {
      return (
        <span className="text-green-600 font-medium">
          Save ₹{savings.toFixed(0)}
        </span>
      );
    } else {
      return (
        <span className="text-orange-600 font-medium">
          +₹{Math.abs(savings).toFixed(0)}
        </span>
      );
    }
  };

  if (suggestions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="h-6 w-6 text-yellow-600" />
          <h2 className="text-xl font-semibold">AI Suggestions</h2>
        </div>
        <div className="text-center py-8">
          <Lightbulb className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No suggestions available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Lightbulb className="h-6 w-6 text-yellow-600" />
        <h2 className="text-xl font-semibold">AI-Powered Suggestions</h2>
        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
          {suggestions.length} tips
        </span>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion, index) => {
          const Icon = getIcon(suggestion.type);
          const iconColor = getIconColor(suggestion.type);
          const priorityColor = getPriorityColor(suggestion.priority);

          return (
            <div
              key={index}
              className={`border-l-4 ${priorityColor} p-4 rounded-r-lg hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{suggestion.title}</h3>
                    <div className="flex items-center space-x-2">
                      {suggestion.priority === 'high' && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        suggestion.priority === 'high' ? 'bg-red-100 text-red-700' :
                        suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {suggestion.priority}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2">{suggestion.description}</p>
                  
                  {suggestion.action && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-sm font-medium text-gray-800">
                        💡 Action: {suggestion.action}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    {formatSavings(suggestion.savings)}
                    
                    {onApplySuggestion && (
                      <button
                        onClick={() => onApplySuggestion(suggestion)}
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium 
                                 hover:bg-emerald-50 px-3 py-1 rounded-lg transition-colors"
                      >
                        Apply Tip
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
          <h3 className="font-semibold text-gray-900">AI Insights</h3>
        </div>
        <p className="text-sm text-gray-700">
          These suggestions are generated based on your family composition, budget, nutrition goals, 
          and seasonal food availability. Implementing high-priority suggestions can significantly 
          improve your meal plan's effectiveness.
        </p>
      </div>
    </div>
  );
}