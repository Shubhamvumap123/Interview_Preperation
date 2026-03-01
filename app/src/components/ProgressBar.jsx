import { motion } from 'framer-motion';
import { TrendingUp, Clock, Target, Award } from 'lucide-react';

const ProgressBar = ({ 
  progress = 0, 
  label = "Progress", 
  showPercentage = true, 
  color = "blue",
  size = "medium",
  animated = true 
}) => {
  const sizeClasses = {
    small: "h-2",
    medium: "h-3",
    large: "h-4"
  };

  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    red: "bg-red-500"
  };

  const bgClasses = {
    blue: "bg-blue-100 dark:bg-blue-900/20",
    green: "bg-green-100 dark:bg-green-900/20",
    purple: "bg-purple-100 dark:bg-purple-900/20",
    orange: "bg-orange-100 dark:bg-orange-900/20",
    red: "bg-red-100 dark:bg-red-900/20"
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
          {showPercentage && (
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full ${bgClasses[color]} rounded-full overflow-hidden`}>
        <motion.div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ 
            duration: animated ? 0.8 : 0, 
            ease: "easeOut",
            delay: 0.2
          }}
        />
      </div>
    </div>
  );
};

export const ProgressStats = ({ stats }) => {
  const statItems = [
    {
      icon: Target,
      label: "Completed",
      value: stats.totalCompleted || 0,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      icon: TrendingUp,
      label: "Current Streak",
      value: `${stats.currentStreak || 0} days`,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      icon: Clock,
      label: "Study Time",
      value: `${stats.totalStudyTime || 0} min`,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
      icon: Award,
      label: "Mastery",
      value: `${Math.round(stats.masteryAverage || 0)}%`,
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900/20"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div className={`${item.bgColor} p-2 rounded-lg`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {item.value}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {item.label}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProgressBar;
