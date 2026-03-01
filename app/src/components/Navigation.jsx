import { motion } from 'framer-motion';
import { Home, BookOpen, Brain, Code, Settings, User, Trophy, MessageSquare } from 'lucide-react';

const Navigation = ({ activeTab, onTabChange, userProgress }) => {
  const navigationItems = [
    {
      id: 'home',
      label: 'Dashboard',
      icon: Home,
      color: 'blue',
      description: 'Your learning dashboard'
    },
    {
      id: 'learn',
      label: 'Learn',
      icon: BookOpen,
      color: 'green',
      description: 'Study topics and concepts'
    },
    {
      id: 'practice',
      label: 'Practice',
      icon: Code,
      color: 'purple',
      description: 'Coding challenges'
    },
    {
      id: 'mock',
      label: 'Mock Interview',
      icon: MessageSquare,
      color: 'orange',
      description: 'Simulated interviews'
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: Trophy,
      color: 'yellow',
      description: 'Track your progress'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      color: 'gray',
      description: 'App preferences'
    }
  ];

  const getColorClasses = (color, isActive) => {
    const baseClasses = {
      blue: isActive ? 'bg-blue-500 text-white' : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      green: isActive ? 'bg-green-500 text-white' : 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      purple: isActive ? 'bg-purple-500 text-white' : 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      orange: isActive ? 'bg-orange-500 text-white' : 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
      yellow: isActive ? 'bg-yellow-500 text-white' : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
      gray: isActive ? 'bg-gray-500 text-white' : 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400'
    };
    return baseClasses[color] || baseClasses.gray;
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Interview Master
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${getColorClasses(item.color, activeTab === item.id)}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="w-5 h-5 mr-2" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Level {Math.floor((userProgress?.totalCompleted || 0) / 10) + 1}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {userProgress?.currentStreak || 0} day streak
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center py-2">
          {navigationItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${getColorClasses(item.color, activeTab === item.id)}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
