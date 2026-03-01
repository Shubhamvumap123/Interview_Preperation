import { motion } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const AnimatedTree = ({ data, level = 0 }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const parseTree = (treeString, level = 0, parentPath = '') => {
    const lines = treeString.split('\n').filter(line => line.trim());
    const nodes = [];
    let currentPath = parentPath;

    lines.forEach((line, index) => {
      const indent = line.match(/^├─|^└─|^│/);
      const content = line.replace(/[├─└│]/g, '').trim();
      const isExpanded = expandedNodes.has(`${currentPath}-${index}`);
      
      if (content) {
        const nodeId = `${currentPath}-${index}`;
        const hasChildren = index < lines.length - 1 && 
          lines[index + 1].startsWith('│') || 
          lines[index + 1].startsWith('├');

        nodes.push(
          <motion.div
            key={nodeId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: level * 0.1 + index * 0.05 }}
            className="select-none"
          >
            <div 
              className={`flex items-center py-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded cursor-pointer transition-colors`}
              style={{ paddingLeft: `${level * 20}px` }}
              onClick={() => hasChildren && toggleNode(nodeId)}
            >
              {hasChildren && (
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-4 h-4 mr-1 text-gray-500" />
                </motion.div>
              )}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {content}
              </span>
            </div>
          </motion.div>
        );
      }
    });

    return nodes;
  };

  return (
    <div className="font-mono text-sm">
      {parseTree(data)}
    </div>
  );
};

export default AnimatedTree;
