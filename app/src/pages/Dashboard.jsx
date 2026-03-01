import { motion } from 'framer-motion';
import { Brain, Target, Clock, TrendingUp, BookOpen, Code, MessageSquare, Award, Calendar, Zap } from 'lucide-react';
import ProgressBar, { ProgressStats } from '../components/ProgressBar';

const Dashboard = ({ userProgress, onStartLearning, onStartPractice, onStartMockInterview }) => {
  const stats = {
    totalCompleted: userProgress?.completedTopics?.length || 0,
    currentStreak: userProgress?.studyStreak || 0,
    totalStudyTime: userProgress?.totalStudyTime || 0,
    masteryAverage: 75, // This would be calculated from actual data
  };

  const quickActions = [
    {
      title: "Continue Learning",
      description: "Pick up where you left off",
      icon: BookOpen,
      color: "blue",
      action: onStartLearning,
      progress: 65
    },
    {
      title: "Practice Coding",
      description: "Sharpen your coding skills",
      icon: Code,
      color: "purple",
      action: onStartPractice,
      progress: 45
    },
    {
      title: "Mock Interview",
      description: "Test your interview readiness",
      icon: MessageSquare,
      color: "orange",
      action: onStartMockInterview,
      progress: 30
    },
    {
      title: "Review Weak Areas",
      description: "Focus on improvement",
      icon: Target,
      color: "green",
      action: () => {},
      progress: 20
    }
  ];

  const recentActivity = [
    {
      title: "JavaScript Closures",
      type: "Completed",
      time: "2 hours ago",
      icon: BookOpen,
      color: "green"
    },
    {
      title: "React Hooks Deep Dive",
      type: "In Progress",
      time: "1 day ago",
      icon: Code,
      color: "blue"
    },
    {
      title: "System Design Basics",
      type: "Started",
      time: "2 days ago",
      icon: Brain,
      color: "purple"
    },
    {
      title: "MongoDB Indexing",
      type: "Review Needed",
      time: "3 days ago",
      icon: Target,
      color: "orange"
    }
  ];

  const upcomingReviews = [
    {
      topic: "JavaScript Event Loop",
      dueDate: "Today",
      priority: "high",
      masteryLevel: 60
    },
    {
      topic: "React Fiber Architecture",
      dueDate: "Tomorrow",
      priority: "medium",
      masteryLevel: 45
    },
    {
      topic: "Node.js Event Loop Phases",
      dueDate: "In 2 days",
      priority: "low",
      masteryLevel: 80
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ready to continue your interview preparation journey?
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <ProgressStats stats={stats} />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                onClick={action.action}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 text-left"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${action.color}-100 dark:bg-${action.color}-900/20 rounded-lg flex items-center justify-center`}>
                    <action.icon className={`w-6 h-6 text-${action.color}-600 dark:text-${action.color}-400`} />
                  </div>
                  <Zap className={`w-4 h-4 text-${action.color}-500`} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {action.description}
                </p>
                <ProgressBar 
                  progress={action.progress} 
                  size="small" 
                  color={action.color}
                  showPercentage={false}
                  animated={false}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity & Upcoming Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`flex items-center p-4 ${index !== recentActivity.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}
                >
                  <div className={`w-10 h-10 bg-${activity.color}-100 dark:bg-${activity.color}-900/20 rounded-lg flex items-center justify-center mr-3`}>
                    <activity.icon className={`w-5 h-5 text-${activity.color}-600 dark:text-${activity.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.type} • {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Reviews */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Upcoming Reviews
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              {upcomingReviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`p-4 ${index !== upcomingReviews.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {review.topic}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      review.priority === 'high' 
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        : review.priority === 'medium'
                        ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                        : 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                    }`}>
                      {review.priority} priority
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {review.dueDate}
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-600 dark:text-gray-400 mr-2">
                        Mastery: {review.masteryLevel}%
                      </span>
                      <ProgressBar 
                        progress={review.masteryLevel} 
                        size="small" 
                        color="blue"
                        showPercentage={false}
                        animated={false}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Daily Goal Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Daily Goal</h3>
                <p className="text-blue-100">
                  You're doing great! Keep up the momentum.
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">25/30</div>
                <div className="text-blue-100">minutes today</div>
              </div>
            </div>
            <ProgressBar 
              progress={83} 
              color="white"
              size="medium"
              showPercentage={true}
              animated={true}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
