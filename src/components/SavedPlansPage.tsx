import React, { useState, useEffect } from 'react';
import { Calendar, Trash2, Eye, Download, Plus, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SavedPlan } from '../types';
import { MealPlanService } from '../services/mealPlanService';

interface SavedPlansPageProps {
  onViewPlan: (plan: SavedPlan) => void;
  onNavigate: (page: string) => void;
}

export default function SavedPlansPage({ onViewPlan, onNavigate }: SavedPlansPageProps) {
  const { user } = useAuth();
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadSavedPlans();
    }
  }, [user]);

  const loadSavedPlans = async () => {
    setLoading(true);
    const { data, error } = await MealPlanService.getUserMealPlans();
    
    if (error) {
      setError('Failed to load saved plans');
    } else {
      setSavedPlans(data || []);
    }
    setLoading(false);
  };

  const handleDeletePlan = async (planId: string) => {
    if (!confirm('Are you sure you want to delete this meal plan?')) {
      return;
    }

    const { error } = await MealPlanService.deleteMealPlan(planId);
    
    if (error) {
      setError('Failed to delete plan');
    } else {
      setSavedPlans(prev => prev.filter(plan => plan.id !== planId));
    }
  };

  const filteredPlans = savedPlans.filter(plan =>
    plan.planName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign In Required</h1>
        <p className="text-gray-600 mb-8">Please sign in to view your saved meal plans.</p>
        <button
          onClick={() => onNavigate('home')}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Go to Home
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your saved plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Meal Plans</h1>
          <p className="text-gray-600">Manage your saved nutrition plans</p>
        </div>
        
        <button
          onClick={() => onNavigate('plan')}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 
                   transition-colors flex items-center space-x-2 shadow-lg mt-4 sm:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>Create New Plan</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search meal plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Plans Grid */}
      {filteredPlans.length === 0 ? (
        <div className="text-center py-16">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm ? 'No plans found' : 'No saved meal plans yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms'
              : 'Create your first meal plan to get started with nutrition optimization'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={() => onNavigate('plan')}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 
                       transition-colors flex items-center space-x-2 mx-auto"
            >
              <Plus className="h-5 w-5" />
              <span>Create Your First Plan</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {plan.planName}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onViewPlan(plan)}
                      className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="View Plan"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Plan"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Family Size:</span>
                    <span className="font-medium">{plan.planResult.familySize} members</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Budget Used:</span>
                    <span className="font-medium">₹{plan.planResult.totalBudgetUsed.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Avg. Nutrition:</span>
                    <span className="font-medium">
                      {Math.round(
                        Object.values(plan.planResult.nutritionCoverage).reduce((a, b) => a + b, 0) / 6
                      )}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Created:</span>
                    <span className="font-medium">{formatDate(plan.createdAt)}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => onViewPlan(plan)}
                    className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 
                             transition-colors flex items-center justify-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}