import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import AnimatedTree from './AnimatedTree';
import FlowDiagram from './FlowDiagram';
import { Brain, AlertTriangle, Bug, Factory, Table, HelpCircle, MessageSquare, DollarSign, Book, Code, Zap } from 'lucide-react';

const TopicDetail = ({ topic, onBack }) => {
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
          <div className="space-y-4">
            {Array.isArray(content) ? content.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors shadow-sm"
              >
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 text-xs font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</p>
              </motion.div>
            )) : <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{content}</p>}
          </div>
        );
      case 'comparison':
        return (
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/80">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 w-1/3">Aspect / Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">Detailed Breakdown</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {Object.entries(content).map(([key, value], rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-blue-600 dark:text-blue-400 bg-gray-50/50 dark:bg-gray-800/50">
                      {key}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return (
          <div className="max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed text-lg">
              {content}
            </p>
          </div>
        );
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

  const [activeTab, setActiveTab] = useState(tabSections[0]?.id || 'mental');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-6 p-2.5 bg-gray-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-gray-600 dark:text-gray-300 rounded-xl transition-all duration-200 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  {topic.title}
                </h1>
                <div className="flex items-center mt-1">
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded uppercase tracking-wider">
                    {topic.categoryName || 'Deep Dive'}
                  </span>
                  <p className="ml-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {topic.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap gap-2 mb-8 bg-gray-100/50 dark:bg-gray-800/50 p-1.5 rounded-2xl overflow-x-auto scroller-none">
            {tabSections.map((section) => {
              const IconComponent = getIcon(section.icon);
              const isActive = activeTab === section.id;

              return (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className={`flex items-center justify-center px-5 py-3 rounded-xl font-bold transition-all duration-300 whitespace-nowrap outline-none ${isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-700 border border-transparent'
                    }`}
                >
                  {IconComponent && <IconComponent className={`w-4 h-4 mr-2 ${isActive ? 'text-white' : 'text-blue-500'}`} />}
                  <span>{section.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {tabSections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="mt-0 outline-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center mb-8 border-b border-gray-100 dark:border-gray-700 pb-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mr-5">
                      {(() => {
                        const IconComponent = getIcon(section.icon);
                        return IconComponent ? <IconComponent className="w-7 h-7 text-blue-600 dark:text-blue-400" /> : null;
                      })()}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                        {section.label}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {topic.title} &bull; Deep Understanding
                      </p>
                    </div>
                  </div>

                  <div className="content-container">
                    {renderContent(section.content, section.type)}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default TopicDetail;
