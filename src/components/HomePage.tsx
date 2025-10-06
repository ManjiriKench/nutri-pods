import React from 'react';
import { ShoppingCart, Target, BarChart3, FileText, ArrowRight, Users, DollarSign, Leaf, Zap, Globe, Trophy, Brain, Sparkles, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CompetitionFeatures from './CompetitionFeatures';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onAuthClick: () => void;
}

export default function HomePage({ onNavigate, onAuthClick }: HomePageProps) {
  const { user } = useAuth();

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Optimization',
      description: 'Advanced algorithms create perfect nutrition-budget balance in seconds',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Globe,
      title: 'Global Impact Tracking',
      description: 'See your contribution to worldwide nutrition improvement in real-time',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      icon: BarChart3,
      title: 'Precision Analytics',
      description: 'Advanced nutrition tracking with personalized insights and recommendations',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Trophy,
      title: 'Achievement System',
      description: 'Gamified nutrition goals with rewards and community recognition',
      gradient: 'from-purple-400 to-pink-500'
    }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Families Served' },
    { icon: DollarSign, value: '₹50M+', label: 'Budget Optimized' },
    { icon: Leaf, value: '2.5M+', label: 'Nutritious Meals Planned' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-teal-100/50 rounded-3xl mx-4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full px-6 py-3 mb-6">
            <Trophy className="h-5 w-5" />
            <span className="font-semibold">Award-Winning AI Nutrition Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Transform <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">₹100</span> into a week of{' '}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">perfect nutrition</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            The world's first AI-powered nutrition platform that optimizes your family's health within any budget. 
            Join 12,500+ families already transforming their nutrition with our award-winning technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => user ? onNavigate('plan') : onAuthClick()}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-5 rounded-2xl 
                       hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 
                       flex items-center space-x-3 text-xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              <Zap className="h-6 w-6" />
              <span>{user ? 'Start AI Planning' : 'Join NutriPods Free'}</span>
              <ArrowRight className="h-6 w-6" />
            </button>
            
            <button
              onClick={() => onNavigate('learn')}
              className="border-2 border-emerald-600 text-emerald-600 px-10 py-5 rounded-2xl 
                       hover:bg-emerald-50 transition-all duration-300 text-xl font-bold hover:scale-105"
            >
              See Our Impact
            </button>
          </div>
          
          {/* Live Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-emerald-600">12.5K+</div>
              <div className="text-gray-600">Families Helped</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600">₹75M+</div>
              <div className="text-gray-600">Budget Optimized</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600">85%</div>
              <div className="text-gray-600">Avg Nutrition Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Features */}
      <CompetitionFeatures onNavigate={onNavigate} />

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-r from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">How NutriPods Works</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Three simple steps to transform your family's nutrition</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 
                            group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Smart Input</h3>
              <p className="text-gray-600 text-lg">AI learns your family size, budget, and local food prices</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 
                            group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">AI Magic</h3>
              <p className="text-gray-600 text-lg">Advanced algorithms create the perfect nutrition-budget balance</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 
                            group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Transform</h3>
              <p className="text-gray-600 text-lg">Get personalized plans, insights, and track your impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Revolutionary Features</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Technology that sets us apart from the competition</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Global Impact</h2>
            <p className="text-xl text-emerald-100">Making a difference in families worldwide</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-colors">
                  <Icon className="h-16 w-16 mx-auto mb-4 text-white" />
                  <div className="text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-xl text-emerald-100">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full px-6 py-3 mb-6">
          <Brain className="h-5 w-5 animate-pulse" />
          <span className="font-black">World's First AI Nutrition Platform</span>
          <Sparkles className="h-4 w-4 animate-bounce" />
          </div>
          
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-6 py-3 mb-6">
            <Trophy className="h-5 w-5" />
            <span className="font-bold">Join the Nutrition Revolution</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
            Ready to Win at Family Nutrition?
          </h2>
          
        <p className="text-2xl text-gray-700 mb-8 max-w-5xl mx-auto leading-relaxed font-medium">
          Revolutionary AI algorithms analyze 50+ nutrition factors to create the perfect meal plan within your budget. 
          Join 12,500+ families already experiencing the AI nutrition revolution.
          </p>
          
          <button
            onClick={() => user ? onNavigate('plan') : onAuthClick()}
            className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white px-12 py-6 rounded-3xl 
                     hover:from-emerald-700 hover:via-teal-700 hover:to-blue-700 transition-all duration-500 
                     flex items-center space-x-4 text-2xl font-black shadow-2xl hover:shadow-3xl hover:scale-110 transform hover:-rotate-1"
          >
            <span>{user ? 'Launch AI Planner' : 'Unlock AI Power'}</span>
            <Sparkles className="h-6 w-6 animate-bounce" />
          </button>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-emerald-100 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Brain className="h-6 w-6 text-emerald-600 animate-pulse" />
                <div className="text-4xl font-black text-emerald-600">12.5K+</div>
              </div>
              <div className="text-gray-700 font-bold">AI-Optimized Families</div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-blue-100 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Target className="h-6 w-6 text-blue-600 animate-spin-slow" />
                <div className="text-4xl font-black text-blue-600">₹75M+</div>
              </div>
              <div className="text-gray-700 font-bold">AI Budget Optimization</div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-purple-100 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="h-6 w-6 text-purple-600 animate-bounce" />
                <div className="text-4xl font-black text-purple-600">95%</div>
              </div>
              <div className="text-gray-700 font-bold">AI Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}