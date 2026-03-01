import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, Code, Brain, Database, Server, Settings, ChevronRight, Zap, GitBranch, Container, Shield } from 'lucide-react';
import TopicCard from '../components/TopicCard';
import TopicDetail from '../components/TopicDetail';
import { knowledgeBase } from '../data/knowledgeBase';

const LearningHub = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen },
    { id: 'javascript', name: 'JavaScript', icon: Code },
    { id: 'react', name: 'React', icon: Brain },
    { id: 'nodejs', name: 'Node.js', icon: Server },
    { id: 'express', name: 'Express', icon: Zap },
    { id: 'mongodb', name: 'MongoDB', icon: Database },
    { id: 'systemDesign', name: 'System Design', icon: Settings },
    { id: 'microservices', name: 'Microservices', icon: GitBranch },
    { id: 'devops', name: 'DevOps', icon: Container },
    { id: 'productionEngineering', name: 'Production Engineering', icon: Shield }
  ];

  const getAllTopics = () => {
    const topics = [];
    Object.entries(knowledgeBase).forEach(([categoryKey, category]) => {
      if (category?.topics) {
        Object.entries(category.topics).forEach(([topicKey, topic]) => {
          topics.push({
            ...topic,
            id: topicKey,
            category: categoryKey,
            categoryName: category.title,
            categoryIcon: category.icon,
            tags: [categoryKey, topicKey]
          });
        });
      }
    });
    return topics;
  };

  const filterTopics = (topics) => {
    return topics.filter(topic => {
      const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           topic.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
      const matchesDifficulty = difficulty === 'all'; // Add difficulty filtering logic
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  };

  const allTopics = getAllTopics();
  const filteredTopics = filterTopics(allTopics);

  if (selectedTopic) {
    return (
      <TopicDetail 
        topic={selectedTopic} 
        onBack={() => setSelectedTopic(null)} 
      />
    );
  }

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
            Learning Hub
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Master every concept with our brain-optimized learning system
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search topics, concepts, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="lg:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="lg:w-48">
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <category.icon className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium">{category.name}</div>
                <div className="text-xs mt-1 opacity-75">
                  {allTopics.filter(topic => category.id === 'all' || topic.category === category.id).length} topics
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {filteredTopics.length} topics found
            </h2>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Filter className="w-4 h-4 mr-1" />
              {selectedCategory !== 'all' && `${categories.find(c => c.id === selectedCategory)?.name} • `}
              {searchTerm && `Search: "${searchTerm}" • `}
              {difficulty !== 'all' && `${difficulty} level`}
            </div>
          </div>
        </motion.div>

        {/* Topics Grid */}
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
              >
                <TopicCard
                  topic={topic}
                  onClick={() => setSelectedTopic(topic)}
                  delay={index * 0.1}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredTopics.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No topics found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LearningHub;
