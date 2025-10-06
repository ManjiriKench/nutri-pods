import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Book, User, LogOut, Calendar, Settings, Bell, Trophy, Zap, Target, TrendingUp, Globe, Moon, Sun, Sparkles, Brain, Star, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ProfileModal from './ProfileModal';

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  onNavigate?: (page: string) => void;
  onAuthClick?: () => void;
}

export default function Layout({ children, currentPage = 'home', onNavigate, onAuthClick }: LayoutProps) {
  const { user, signOut } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [aiPulse, setAiPulse] = useState(true);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // AI pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAiPulse(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Navigation items for non-authenticated users
  const publicNavItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Heart, 
      gradient: 'from-pink-500 to-rose-500',
      description: 'Welcome to NutriPods'
    },
    { 
      id: 'learn', 
      label: 'Nutrition Guide', 
      icon: Book, 
      gradient: 'from-purple-500 to-indigo-500',
      description: 'Learn nutrition basics'
    }
  ];

  // Navigation items for authenticated users
  const authenticatedNavItems = [
    { 
      id: 'home', 
      label: 'AI Dashboard', 
      icon: Brain, 
      gradient: 'from-pink-500 to-rose-500',
      description: 'Your AI nutrition hub',
      aiFeature: true
    },
    { 
      id: 'plan', 
      label: 'AI Planner', 
      icon: Zap, 
      gradient: 'from-emerald-500 to-teal-500',
      description: 'Smart meal planning',
      badge: 'AI',
      aiFeature: true
    },
    { 
      id: 'saved', 
      label: 'Success Plans', 
      icon: Trophy, 
      gradient: 'from-amber-500 to-orange-500',
      description: 'Your nutrition victories'
    },
    { 
      id: 'learn', 
      label: 'AI Insights', 
      icon: Book, 
      gradient: 'from-purple-500 to-indigo-500',
      description: 'AI-powered learning',
      aiFeature: true
    }
  ];

  const navItems = user ? authenticatedNavItems : publicNavItems;

  const achievements = [
    { title: 'AI Nutrition Master', icon: Brain, color: 'text-purple-500' },
    { title: 'Budget Optimizer Pro', icon: Target, color: 'text-green-500' },
    { title: 'Meal Planning Champion', icon: Trophy, color: 'text-yellow-500' }
  ];

  const handleSignOut = async () => {
    await signOut();
    onNavigate?.('home');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-emerald-50 via-white to-amber-50'
    }`}>
      {/* Revolutionary Creative Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-2xl border-b border-emerald-100/50' 
          : 'bg-white/70 backdrop-blur-lg shadow-lg border-b border-emerald-100/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Revolutionary Logo with AI Pulse */}
            <div className="flex items-center">
              <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => onNavigate?.('home')}>
                <div className="relative">
                  <div className={`w-14 h-14 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 ${
                    aiPulse ? 'animate-pulse' : ''
                  }`}>
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  {/* AI Indicator Ring */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl opacity-20 animate-spin-slow"></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                      NutriPods
                    </span>
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      <Brain className="h-3 w-3" />
                      <span>AI</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold">World's First AI Nutrition Platform</div>
                </div>
              </div>
            </div>
            
            {/* Creative Navigation Items */}
            <div className="hidden lg:flex items-center space-x-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <div key={item.id} className="relative group">
                    <button
                      onClick={() => onNavigate?.(item.id)}
                      className={`relative flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-500 transform ${
                        isActive
                          ? `bg-gradient-to-r ${item.gradient} text-white shadow-2xl scale-110 rotate-1`
                          : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 hover:scale-105 hover:-rotate-1'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${item.aiFeature ? 'animate-pulse' : ''}`} />
                      <span className="font-bold">{item.label}</span>
                      {item.badge && (
                        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-black animate-bounce">
                          {item.badge}
                        </span>
                      )}
                      {item.aiFeature && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping"></div>
                      )}
                    </button>
                    
                    {/* Enhanced Tooltip */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 px-4 py-3 bg-gradient-to-r from-gray-900 to-black text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-2xl">
                      {item.description}
                      {item.aiFeature && (
                        <div className="flex items-center space-x-1 mt-1">
                          <Brain className="h-3 w-3 text-purple-400" />
                          <span className="text-purple-400 text-xs">AI-Powered</span>
                        </div>
                      )}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enhanced User Section */}
            <div className="flex items-center space-x-4">
              {/* Global AI Impact Counter */}
              <div className="hidden md:flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 rounded-2xl border border-emerald-200">
                <div className="relative">
                  <Globe className="h-5 w-5 text-emerald-600 animate-spin-slow" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <div className="text-sm font-black text-emerald-700">12.5K+ Families</div>
                  <div className="text-xs text-emerald-600">AI-Optimized</div>
                </div>
              </div>

              {/* Creative Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all duration-300 hover:scale-110 hover:rotate-12"
              >
                {isDarkMode ? 
                  <Sun className="h-5 w-5 text-yellow-500 animate-spin-slow" /> : 
                  <Moon className="h-5 w-5 text-indigo-600" />
                }
              </button>

              {user ? (
                <div className="flex items-center space-x-3">
                  {/* AI Notifications */}
                  <div className="relative">
                    <button className="p-3 rounded-2xl bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 transition-all duration-300 hover:scale-110">
                      <Bell className="h-5 w-5 text-amber-600" />
                    </button>
                    {notifications > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-black animate-bounce">
                        {notifications}
                      </span>
                    )}
                  </div>

                  {/* AI Achievements */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowAchievements(!showAchievements)}
                      className="p-3 rounded-2xl bg-gradient-to-r from-yellow-100 to-amber-100 hover:from-yellow-200 hover:to-amber-200 transition-all duration-300 hover:scale-110 hover:rotate-12"
                    >
                      <Trophy className="h-5 w-5 text-yellow-600 animate-bounce" />
                    </button>
                    
                    {showAchievements && (
                      <div className="absolute right-0 top-full mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-6 z-50">
                        <div className="flex items-center space-x-2 mb-4">
                          <Trophy className="h-6 w-6 text-yellow-500" />
                          <h3 className="font-black text-gray-900">AI Achievements</h3>
                        </div>
                        <div className="space-y-3">
                          {achievements.map((achievement, index) => {
                            const AchievementIcon = achievement.icon;
                            return (
                              <div key={index} className="flex items-center space-x-3 p-3 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300">
                                <AchievementIcon className={`h-6 w-6 ${achievement.color}`} />
                                <span className="font-bold text-gray-800">{achievement.title}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced User Profile */}
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-emerald-100 via-teal-100 to-blue-100 rounded-3xl px-5 py-3 border border-emerald-200">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                        <Brain className="h-2 w-2 text-white" />
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <div className="font-black text-gray-900">
                        {user.user_metadata?.full_name || user.email?.split('@')[0]}
                      </div>
                      <div className="text-xs text-emerald-600 font-bold">AI Nutrition Expert</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <button
                    onClick={() => setShowProfileModal(true)}
                    className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 hover:scale-105 shadow-xl font-bold"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">AI Settings</span>
                  </button>
                  
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-xl font-bold"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white px-8 py-4 rounded-3xl hover:from-emerald-700 hover:via-teal-700 hover:to-blue-700 transition-all duration-500 flex items-center space-x-3 shadow-2xl hover:shadow-3xl hover:scale-110 transform hover:-rotate-1"
                >
                  <Brain className="h-6 w-6 animate-pulse" />
                  <span className="font-black text-lg">Unlock AI Power</span>
                  <Sparkles className="h-5 w-5 animate-bounce" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Creative Mobile Navigation */}
        <div className="lg:hidden border-t border-gray-100/50 bg-white/90 backdrop-blur-xl">
          <div className="flex justify-around py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate?.(item.id)}
                  className={`flex flex-col items-center space-y-1 px-4 py-3 rounded-2xl transition-all duration-500 relative ${
                    isActive
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-xl scale-110`
                      : 'text-gray-600 hover:text-emerald-600 hover:scale-105'
                  }`}
                >
                  <Icon className={`h-6 w-6 ${item.aiFeature ? 'animate-pulse' : ''}`} />
                  <span className="text-xs font-bold">{item.label}</span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-0.5 rounded-full font-black animate-bounce">
                      {item.badge}
                    </span>
                  )}
                  {item.aiFeature && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Revolutionary Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-emerald-900 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* AI Brand Section */}
            <div className="col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500 rounded-2xl flex items-center justify-center relative">
                  <Heart className="h-7 w-7 text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Brain className="h-2 w-2 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-black">NutriPods</span>
                  <div className="text-emerald-400 text-sm font-bold">AI-Powered Nutrition Revolution</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md text-lg">
                The world's first AI-powered nutrition platform, transforming family health 
                through intelligent meal planning and budget optimization.
              </p>
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-emerald-400">12.5K+</div>
                  <div className="text-xs text-gray-400">AI-Optimized Families</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-teal-400">₹75M+</div>
                  <div className="text-xs text-gray-400">Budget Saved by AI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-amber-400">3.2M+</div>
                  <div className="text-xs text-gray-400">AI-Planned Meals</div>
                </div>
              </div>
            </div>

            {/* AI Features */}
            <div>
              <h3 className="font-black mb-4 text-emerald-400 flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>AI Features</span>
              </h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span>Smart Budget Optimization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-green-500" />
                  <span>Precision Nutrition Targeting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span>Predictive Health Analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <span>Intelligent Meal Suggestions</span>
                </div>
              </div>
            </div>

            {/* Awards & Recognition */}
            <div>
              <h3 className="font-black mb-4 text-teal-400 flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Recognition</span>
              </h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span>AI Innovation Award 2024</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-green-500" />
                  <span>Social Impact Leader</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-pink-500" />
                  <span>Community Choice Winner</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span>UN SDG Champion</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-lg">
              © 2024 NutriPods - AI-Powered Nutrition Revolution • 
              <span className="text-emerald-400 font-black"> Transforming 12.5K+ Families Worldwide</span>
            </p>
          </div>
        </div>
      </footer>
      
      {/* Profile Modal */}
      <ProfileModal 
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </div>
  );
}