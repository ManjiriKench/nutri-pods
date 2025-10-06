import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import AuthModal from './components/AuthModal';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import PlanMealsPage from './components/PlanMealsPage';
import ResultsPage from './components/ResultsPage';
import SavedPlansPage from './components/SavedPlansPage';
import LearnPage from './components/LearnPage';
import { PlanInput, PlanResult, SavedPlan } from './types';
import { optimizeMealPlan } from './utils/nutritionCalculator';

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [planResult, setPlanResult] = useState<PlanResult | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (page !== 'results') {
      setPlanResult(null);
    }
  };

  const handleGeneratePlan = (planInput: PlanInput) => {
    const result = optimizeMealPlan(planInput);
    setPlanResult(result);
    setCurrentPage('results');
  };

  const handleBackToPlan = () => {
    setCurrentPage('plan');
    setPlanResult(null);
  };

  const handleAuthClick = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuth = () => {
    setShowAuthModal(false);
  };

  const handleViewSavedPlan = (savedPlan: SavedPlan) => {
    setPlanResult(savedPlan.planResult);
    setCurrentPage('results');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return user ? (
          <Dashboard onNavigate={handleNavigate} onViewPlan={handleViewSavedPlan} />
        ) : (
          <HomePage onNavigate={handleNavigate} onAuthClick={handleAuthClick} />
        );
      case 'plan':
        return <PlanMealsPage onGeneratePlan={handleGeneratePlan} onAuthClick={handleAuthClick} />;
      case 'results':
        return planResult ? (
          <ResultsPage result={planResult} onBack={handleBackToPlan} />
        ) : (
          <HomePage onNavigate={handleNavigate} onAuthClick={handleAuthClick} />
        );
      case 'saved':
        return <SavedPlansPage onViewPlan={handleViewSavedPlan} onNavigate={handleNavigate} />;
      case 'learn':
        return <LearnPage />;
      default:
        return <HomePage onNavigate={handleNavigate} onAuthClick={handleAuthClick} />;
    }
  };

  return (
    <>
      <Layout 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        onAuthClick={handleAuthClick}
      >
        {renderCurrentPage()}
      </Layout>
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={handleCloseAuth}
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;