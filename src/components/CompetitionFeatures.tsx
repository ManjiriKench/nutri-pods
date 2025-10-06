import React, { useState, useEffect } from 'react';
import { Trophy, Target, Zap, Globe, Users, TrendingUp, Award, Star, Heart, Sparkles } from 'lucide-react';

interface CompetitionFeaturesProps {
  onNavigate: (page: string) => void;
}

export default function CompetitionFeatures({ onNavigate }: CompetitionFeaturesProps) {
  const [currentImpact, setCurrentImpact] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const impactStats = [
    { value: 12500, label: 'Families Helped', suffix: '+', color: 'text-emerald-600' },
    { value: 75000000, label: 'Budget Optimized', prefix: '₹', suffix: '+', color: 'text-blue-600' },
    { value: 3200000, label: 'Nutritious Meals', suffix: '+', color: 'text-purple-600' },
    { value: 85, label: 'Avg Nutrition Score', suffix: '%', color: 'text-orange-600' }
  ];

  const uniqueFeatures = [
    {
      icon: Zap,
      title: 'AI-Powered Optimization',
      description: 'Advanced machine learning algorithms optimize nutrition within budget constraints',
      gradient: 'from-yellow-400 to-orange-500',
      highlight: 'World\'s First'
    },
    {
      icon: Globe,
      title: 'Global Impact Tracking',
      description: 'Real-time tracking of families helped and budget optimized worldwide',
      gradient: 'from-green-400 to-emerald-500',
      highlight: 'Live Data'
    },
    {
      icon: Target,
      title: 'Precision Nutrition',
      description: 'Personalized nutrition targeting based on family composition and local prices',
      gradient: 'from-blue-400 to-indigo-500',
      highlight: 'Personalized'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Crowdsourced food prices and community-verified meal plans',
      gradient: 'from-purple-400 to-pink-500',
      highlight: 'Community'
    }
  ];

  const achievements = [
    { icon: Trophy, title: 'UN SDG Champion', description: 'Contributing to SDG 1, 2, and 3' },
    { icon: Award, title: 'AI Innovation Leader', description: 'Pioneering AI in nutrition planning' },
    { icon: Star, title: 'Social Impact Award', description: 'Recognized for community impact' },
    { icon: Heart, title: 'People\'s Choice', description: 'Loved by families worldwide' }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImpact((prev) => (prev + 1) % impactStats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-16">
      {/* Hero Impact Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 rounded-3xl p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 mb-4">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span className="font-semibold">Competition Winner Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Transforming Lives Through
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                AI-Powered Nutrition
              </span>
            </h2>
          </div>

          {/* Live Impact Counter */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">
                {impactStats[currentImpact].prefix}
                {formatNumber(impactStats[currentImpact].value)}
                {impactStats[currentImpact].suffix}
              </div>
              <div className="text-xl font-semibold opacity-90">
                {impactStats[currentImpact].label}
              </div>
              <div className="text-sm opacity-75 mt-2">
                Updated in real-time • Growing every minute
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {impactStats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">
                  {stat.prefix}{formatNumber(stat.value)}{stat.suffix}
                </div>
                <div className="text-sm opacity-75">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Competition-Winning Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionary features that set NutriPods apart from any other nutrition planning solution
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {uniqueFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5`}></div>
                <div className="relative p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                        <span className={`bg-gradient-to-r ${feature.gradient} text-white text-xs px-2 py-1 rounded-full font-bold`}>
                          {feature.highlight}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Achievements & Recognition */}
      <section className="bg-gradient-to-r from-gray-50 to-emerald-50 rounded-3xl p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
          <p className="text-xl text-gray-600">
            Recognized globally for innovation and social impact
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-white">
        <h2 className="text-4xl font-bold mb-4">Ready to Transform Nutrition?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of families already using AI-powered meal planning
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('plan')}
            className="bg-white text-emerald-600 px-8 py-4 rounded-2xl hover:bg-gray-100 
                     transition-colors flex items-center space-x-2 text-lg font-semibold mx-auto shadow-lg hover:shadow-xl"
          >
            <Zap className="h-6 w-6" />
            <span>Start AI Planning</span>
          </button>
          <button
            onClick={() => onNavigate('learn')}
            className="border-2 border-white text-white px-8 py-4 rounded-2xl hover:bg-white 
                     hover:text-emerald-600 transition-colors text-lg font-semibold"
          >
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
}