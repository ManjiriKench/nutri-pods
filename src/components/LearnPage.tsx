import React from 'react';
import { Book, Heart, Utensils, DollarSign, Users, Leaf } from 'lucide-react';

export default function LearnPage() {
  const nutritionTips = [
    {
      icon: Heart,
      title: 'Protein Power',
      content: 'Include dal, eggs, or milk in every meal. Protein helps build muscles and keeps you full longer.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Leaf,
      title: 'Iron Rich Foods',
      content: 'Spinach, jaggery, and millet are excellent iron sources. Pair with vitamin C foods for better absorption.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Users,
      title: 'Family Nutrition',
      content: 'Children need more calcium for growing bones. Include milk, leafy greens, and sesame seeds.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: DollarSign,
      title: 'Budget Stretching',
      content: 'Buy seasonal vegetables, use whole grains, and cook in bulk to maximize your food budget.',
      color: 'bg-amber-100 text-amber-600'
    }
  ];

  const recipes = [
    {
      name: 'Iron-Rich Dal Khichdi',
      cost: '₹15 per serving',
      ingredients: 'Rice, Moong Dal, Spinach, Turmeric, Salt',
      benefits: 'High in protein and iron, perfect for growing children'
    },
    {
      name: 'Protein Paratha',
      cost: '₹12 per serving',
      ingredients: 'Wheat Flour, Milk, Eggs, Salt',
      benefits: 'Complete protein meal with essential amino acids'
    },
    {
      name: 'Vitamin A Curry',
      cost: '₹18 per serving',
      ingredients: 'Carrots, Potato, Onion, Mustard Oil',
      benefits: 'Rich in beta-carotene for healthy vision'
    },
    {
      name: 'Calcium Boost Smoothie',
      cost: '₹20 per serving',
      ingredients: 'Milk, Banana, Jaggery',
      benefits: 'Strong bones and natural energy booster'
    }
  ];

  const impactStats = [
    { value: '12,500+', label: 'Families Helped', description: 'Families using NutriPods for meal planning' },
    { value: '₹75M+', label: 'Budget Optimized', description: 'Total grocery budget optimized through our platform' },
    { value: '3.2M+', label: 'Nutritious Meals', description: 'Balanced meals planned and prepared' },
    { value: '85%', label: 'Nutrition Improvement', description: 'Average increase in nutrition coverage' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Learn About Nutrition</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover how to maximize nutrition on any budget with our educational resources and proven tips
        </p>
      </div>

      {/* Nutrition Tips */}
      <section className="mb-16">
        <div className="flex items-center space-x-2 mb-8">
          <Book className="h-8 w-8 text-emerald-600" />
          <h2 className="text-3xl font-bold text-gray-900">Nutrition Tips</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {nutritionTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${tip.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-600">{tip.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Budget-Friendly Recipes */}
      <section className="mb-16">
        <div className="flex items-center space-x-2 mb-8">
          <Utensils className="h-8 w-8 text-amber-600" />
          <h2 className="text-3xl font-bold text-gray-900">Budget-Friendly Recipes</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {recipes.map((recipe, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{recipe.name}</h3>
                <span className="bg-emerald-100 text-emerald-700 text-sm px-2 py-1 rounded-full font-medium">
                  {recipe.cost}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Ingredients:</h4>
                  <p className="text-gray-600 text-sm">{recipe.ingredients}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Benefits:</h4>
                  <p className="text-gray-600 text-sm">{recipe.benefits}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="mb-16 bg-gradient-to-r from-emerald-600 to-amber-600 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-emerald-100 font-semibold mb-1">{stat.label}</div>
              <div className="text-emerald-200 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Nutrition Guidelines */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Daily Nutrition Guidelines</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-emerald-600 mb-4">Adults</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Calories:</span>
                <span className="font-medium">2000 kcal/day</span>
              </div>
              <div className="flex justify-between">
                <span>Protein:</span>
                <span className="font-medium">50g/day</span>
              </div>
              <div className="flex justify-between">
                <span>Iron:</span>
                <span className="font-medium">18mg/day</span>
              </div>
              <div className="flex justify-between">
                <span>Calcium:</span>
                <span className="font-medium">1000mg/day</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-amber-600 mb-4">Children (5-12 years)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Calories:</span>
                <span className="font-medium">1500 kcal/day</span>
              </div>
              <div className="flex justify-between">
                <span>Protein:</span>
                <span className="font-medium">35g/day</span>
              </div>
              <div className="flex justify-between">
                <span>Iron:</span>
                <span className="font-medium">10mg/day</span>
              </div>
              <div className="flex justify-between">
                <span>Calcium:</span>
                <span className="font-medium">800mg/day</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-orange-600 mb-4">Elderly (60+ years)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Calories:</span>
                <span className="font-medium">1800 kcal/day</span>
              </div>
              <div className="flex justify-between">
                <span>Protein:</span>
                <span className="font-medium">50g/day</span>
              </div>
              <div className="flex justify-between">
                <span>Iron:</span>
                <span className="font-medium">8mg/day</span>
              </div>
              <div className="flex justify-between">
                <span>Calcium:</span>
                <span className="font-medium">1200mg/day</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Nutrition on a Budget</h2>
        
        <div className="prose max-w-none">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Principles</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Focus on nutrient density over cost per calorie</li>
                <li>• Combine complementary proteins (rice + dal)</li>
                <li>• Use seasonal and local produce when possible</li>
                <li>• Plan meals around affordable staples</li>
                <li>• Include variety to ensure micronutrient coverage</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Shopping Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Buy grains and pulses in bulk quantities</li>
                <li>• Choose whole foods over processed alternatives</li>
                <li>• Compare prices per unit weight, not package</li>
                <li>• Shop at local markets for better deals</li>
                <li>• Store foods properly to minimize waste</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}