import { motion } from 'framer-motion';
import { Book, Code, Zap, Brain, Trophy, AlertTriangle, Bug, Factory, Table, HelpCircle, MessageSquare, DollarSign } from 'lucide-react';

const iconMap = {
  Book,
  Code, 
  Zap,
  Brain,
  Trophy,
  AlertTriangle,
  Bug,
  Factory,
  Table,
  HelpCircle,
  MessageSquare,
  DollarSign
};

const TopicCard = ({ topic, onClick, delay = 0 }) => {
  const getIcon = (iconName) => {
    return iconMap[iconName] || Book;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
            {topic.icon && getIcon(topic.icon)}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {topic.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {topic.description}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {topic.tags && topic.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
    </motion.div>
  );
};

export default TopicCard;
