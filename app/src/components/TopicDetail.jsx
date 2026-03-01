import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import AnimatedTree from './AnimatedTree';
import FlowDiagram from './FlowDiagram';
import { Brain, AlertTriangle, Bug, Factory, Table, HelpCircle, MessageSquare, DollarSign, Book, Code, Zap } from 'lucide-react';

const TopicDetail = ({ topic, onBack }) => {
  const [activeTab, setActiveTab] = useState('mental');

  const iconMap = {
    Brain,
    AlertTriangle,
    Bug,
    Factory,
    Table,
    HelpCircle,
    MessageSquare,
    DollarSign,
    Book,
    Code,
    Zap
  };

  const getIcon = (iconName) => {
    return iconMap[iconName] || Brain;
  };

  const renderContent = (content, type) => {
    if (!content) return null;

    switch (type) {
      case 'tree':
        return <AnimatedTree data={content} />;
      case 'flow':
        return <FlowDiagram flow={content} />;
      case 'list':
        return (
          <div className="space-y-3">
            {Array.isArray(content) ? content.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">{item}</p>
              </motion.div>
            )) : <p className="text-gray-700 dark:text-gray-300">{content}</p>}
          </div>
        );
      case 'comparison':
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Aspect</th>
                  {Object.keys(content).map((key, index) => (
                    <th key={index} className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(content).map((key, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">
                      {key}
                    </td>
                    {Object.values(content).map((value, colIndex) => (
                      <td key={colIndex} className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{content}</p>;
    }
  };

  const tabSections = [
    {
      id: 'mental',
      label: 'Mental Model',
      icon: 'Brain',
      content: topic.mentalModel,
      type: 'text'
    },
    {
      id: 'tree',
      label: 'Tree Diagram',
      icon: 'Code',
      content: topic.tree,
      type: 'tree'
    },
    {
      id: 'flow',
      label: 'Flow Diagram',
      icon: 'Zap',
      content: topic.flow,
      type: 'flow'
    },
    {
      id: 'questions',
      label: 'Interview Questions',
      icon: 'HelpCircle',
      content: topic.questions,
      type: 'list'
    },
    {
      id: 'traps',
      label: 'Interview Traps',
      icon: 'AlertTriangle',
      content: topic.traps,
      type: 'list'
    },
    {
      id: 'debug',
      label: 'Debug Scenario',
      icon: 'Bug',
      content: topic.debugScenario,
      type: 'text'
    },
    {
      id: 'production',
      label: 'Production Insight',
      icon: 'Factory',
      content: topic.productionInsight,
      type: 'text'
    },
    {
      id: 'comparison',
      label: 'Comparison',
      icon: 'Table',
      content: topic.comparison,
      type: 'comparison'
    }
  ].filter(section => section.content);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {topic.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {topic.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
            {tabSections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="flex items-center justify-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {(() => {
                  const IconComponent = getIcon(section.icon);
                  return IconComponent ? <IconComponent className="w-4 h-4 mr-2" /> : null;
                })()}
                <span className="hidden md:inline">{section.label}</span>
                <span className="md:hidden">{section.label.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            {tabSections.map((section) => (
              activeTab === section.id && (
                <TabsContent key={section.id} value={section.id} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                  >
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      {(() => {
                      const IconComponent = getIcon(section.icon);
                      return IconComponent ? <IconComponent className="w-6 h-6 mr-2 text-blue-500" /> : null;
                    })()}
                      {section.label}
                    </h2>
                    <div className="text-gray-700 dark:text-gray-300">
                      {renderContent(section.content, section.type)}
                    </div>
                  </motion.div>
                </TabsContent>
              )
            ))}
          </AnimatePresence>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default TopicDetail;
