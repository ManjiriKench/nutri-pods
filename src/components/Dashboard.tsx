import React, { useState, useEffect } from 'react';
import { ShoppingCart, Calendar, TrendingUp, Clock, Plus, Eye, BarChart3, Target, Users, DollarSign, Zap, Trophy, Globe, Star, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SavedPlan } from '../types';
import { MealPlanService, UserPreferencesService } from '../services/mealPlanService';

interface DashboardProps {
  onNavigate: (page: string) => void;
  onViewPlan: (plan: SavedPlan) => void;
}

export default function Dashboard({ onNavigate, onViewPlan }: DashboardProps) {
  const { user } = useAuth();
  const [recentPlans, setRecentPlans] = useState<SavedPlan[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPlans: 0,
    avgBudgetUsed: 0,
    avgNutrition: 0,
    totalMealsPlanned: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    
    // Load recent plans
    const { data: plans } = await MealPlanService.getUserMealPlans();
    if (plans) {
      setRecentPlans(plans.slice(0, 3)); // Show only 3 most recent
      
      // Calculate stats
      const totalPlans = plans.length;
      const avgBudgetUsed = plans.reduce((sum, plan) => sum + plan.planResult.totalBudgetUsed, 0) / totalPlans || 0;
      const avgNutrition = plans.reduce((sum, plan) => {
        const nutrition = Object.values(plan.planResult.nutritionCoverage).reduce((a, b) => a + b, 0) / 6;
        return sum + nutrition;
      }, 0) / totalPlans || 0;
      const totalMealsPlanned = totalPlans * 21; // 7 days * 3 meals
      
      setStats({
        totalPlans,
        avgBudgetUsed,
        avgNutrition,
        totalMealsPlanned
      });
    }
    
    // Load user profile
    const { data: profile } = await UserPreferencesService.getUserProfile();
    setUserProfile(profile);
    
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric'
    });
  };

  const quickActions = [
    {
      icon: Plus,
      title: 'AI Meal Planner',
      description: 'Create optimized meal plans with AI',
      action: () => onNavigate('plan'),
      color: 'bg-emerald-600 hover:bg-emerald-700',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      badge: 'AI'
    },
    {
      icon: Calendar,
      title: 'My Success Plans',
      description: 'Browse your nutrition victories',
      action: () => onNavigate('saved'),
      color: 'bg-amber-600 hover:bg-amber-700',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600'
    },
    {
      icon: BarChart3,
      title: 'Nutrition Lab',
      description: 'Discover nutrition secrets',
      action: () => onNavigate('learn'),
      color: 'bg-orange-600 hover:bg-orange-700',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      badge: 'NEW'
    }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Trophy className="h-7 w-7 text-yellow-300" />
              </div>
              <h1 className="text-4xl font-bold">
                Welcome back, {userProfile?.full_name || user?.user_metadata?.full_name || 'Nutrition Champion'}! 🎉
              </h1>
            </div>
            <p className="text-emerald-100 text-xl">
              Ready to create more nutrition magic for your family?
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
              <Globe className="h-8 w-8 mx-auto mb-2 text-emerald-200" />
              <div className="text-2xl font-bold">12.5K+</div>
              <div className="text-emerald-200 text-sm">Families Helped</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Plans</p>
              <div className="flex items-center space-x-2">
                <p className="text-3xl font-bold text-gray-900">{stats.totalPlans}</p>
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Budget Used</p>
              <p className="text-3xl font-bold text-gray-900">₹{stats.avgBudgetUsed.toFixed(0)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Nutrition</p>
              <div className="flex items-center space-x-2">
                <p className="text-3xl font-bold text-gray-900">{stats.avgNutrition.toFixed(0)}%</p>
                <Trophy className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Meals Planned</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalMealsPlanned}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Zap className="h-8 w-8 text-yellow-500" />
          <span>Power Actions</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className={`${action.color} text-white p-8 rounded-2xl transition-all duration-300 text-left group shadow-xl hover:shadow-2xl hover:scale-105 relative overflow-hidden`}
              >
                {action.badge && (
                  <span className="absolute top-4 right-4 bg-white/20 text-white text-xs px-3 py-1 rounded-full font-bold">
                    {action.badge}
                  </span>
                )}
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 ${action.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className={`h-8 w-8 ${action.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                    <p className="text-white/80 text-sm">{action.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Plans */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-emerald-600" />
            <span>Your Success Stories</span>
          </h2>
          {recentPlans.length > 0 && (
            <button
              onClick={() => onNavigate('saved')}
              className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors"
            >
              <span>View All</span>
              <TrendingUp className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {recentPlans.length === 0 ? (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-12 text-center border-2 border-dashed border-emerald-200">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to Start Your Nutrition Journey?</h3>
            <p className="text-gray-600 mb-8 text-lg">Create your first AI-powered meal plan and join thousands of successful families</p>
            <button
              onClick={() => onNavigate('plan')}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl hover:from-emerald-700 hover:to-teal-700 
                       transition-all duration-300 flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Zap className="h-6 w-6" />
              <span className="text-lg font-bold">Start AI Planning</span>
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {recentPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 truncate">
                      {plan.planName}
                    </h3>
                    <span className="text-xs text-gray-500 flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(plan.createdAt)}</span>
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Family Size:</span>
                      <span className="font-medium">{plan.planResult.familySize} members</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Budget Used:</span>
                      <span className="font-medium">₹{plan.planResult.totalBudgetUsed.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Nutrition Score:</span>
                      <span className="font-medium">
                        {Math.round(
                          Object.values(plan.planResult.nutritionCoverage).reduce((a, b) => a + b, 0) / 6
                        )}%
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onViewPlan(plan)}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 
                             transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Success</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Profile Summary */}
      {userProfile && (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-3xl p-8 text-white">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <User className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Your Nutrition Profile</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Family Champions</p>
                <p className="text-2xl font-bold">{userProfile.family_size || 4} members</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Weekly Power Budget</p>
                <p className="text-2xl font-bold">₹{userProfile.default_budget || 500}/week</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Currency</p>
                <p className="text-2xl font-bold">{userProfile.currency || 'INR'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}