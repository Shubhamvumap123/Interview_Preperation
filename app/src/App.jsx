import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import LearningHub from './pages/LearningHub';
import useAppStore from './stores/useAppStore';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const { userProgress, setUserProgress, getStudyStats } = useAppStore();

  useEffect(() => {
    // Initialize user progress if not exists
    if (!userProgress.completedTopics) {
      setUserProgress({
        completedTopics: [],
        currentTopic: null,
        weakAreas: [],
        studyStreak: 5,
        totalStudyTime: 120,
        lastStudyDate: new Date().toISOString(),
      });
    }
  }, [userProgress, setUserProgress]);

  const handleStartLearning = () => {
    setActiveTab('learn');
  };

  const handleStartPractice = () => {
    setActiveTab('practice');
  };

  const handleStartMockInterview = () => {
    setActiveTab('mock');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Dashboard 
            userProgress={userProgress}
            onStartLearning={handleStartLearning}
            onStartPractice={handleStartPractice}
            onStartMockInterview={handleStartMockInterview}
          />
        );
      case 'learn':
        return <LearningHub />;
      case 'practice':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Practice Mode
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Coming soon! Interactive coding challenges and exercises.
              </p>
            </div>
          </div>
        );
      case 'mock':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Mock Interview
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Coming soon! AI-powered mock interviews with real feedback.
              </p>
            </div>
          </div>
        );
      case 'progress':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Progress Tracking
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Coming soon! Detailed analytics and progress insights.
              </p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Coming soon! Customize your learning experience.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <Dashboard 
            userProgress={userProgress}
            onStartLearning={handleStartLearning}
            onStartPractice={handleStartPractice}
            onStartMockInterview={handleStartMockInterview}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        userProgress={userProgress}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
