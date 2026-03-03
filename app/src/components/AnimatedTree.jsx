import { motion } from 'framer-motion';
import { ChevronRight, ChevronDown, Folder, FileCode, Layers } from 'lucide-react';
import { useState } from 'react';

const AnimatedTree = ({ data }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set(['root-0']));

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const parseTree = (treeString) => {
    const lines = treeString.split('\n').filter(line => line.trim());
    const tree = [];
    const stack = [{ level: -1, children: tree }];

    lines.forEach((line, index) => {
      // Find the first occurrence of ├, └, or the start of text
      const match = line.match(/^([│\s]*[├└])─/);
      let level = 0;
      let cleanContent = line;

      if (match) {
        // Calculate level based on indentation and markers
        const prefix = match[1];
        level = (prefix.length / 3) + 1;
        cleanContent = line.slice(match[0].length).trim();
      } else {
        // Handle root or first level lines without markers
        cleanContent = line.replace(/^[┌─\s]+/, '').trim();
        level = 0;
      }

      const node = {
        id: `node-${index}`,
        content: cleanContent,
        children: [],
        level
      };

      // Find the correct parent in the stack
      while (stack.length > 1 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      stack[stack.length - 1].children.push(node);
      stack.push(node);
    });

    return tree;
  };

  const renderNode = (node, path = 'root') => {
    const nodeId = `${path}-${node.id}`;
    const isExpanded = expandedNodes.has(nodeId);
    const hasChildren = node.children.length > 0;

    return (
      <div key={nodeId} className="ml-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`group flex items-center py-2 px-3 rounded-xl cursor-pointer transition-all duration-200 ${hasChildren ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-800/40'
            }`}
          onClick={() => hasChildren && toggleNode(nodeId)}
        >
          {hasChildren ? (
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              className="mr-2 text-blue-500"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          ) : (
            <div className="w-4 h-4 mr-2 border-l-2 border-gray-300 dark:border-gray-600" />
          )}

          <div className={`p-1.5 rounded-lg mr-3 ${hasChildren ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-800/60 text-gray-500'}`}>
            {hasChildren ? <Layers className="w-3.5 h-3.5" /> : <FileCode className="w-3.5 h-3.5" />}
          </div>

          <span className={`text-sm tracking-tight ${hasChildren ? 'font-bold text-gray-800 dark:text-gray-200' : 'font-medium text-gray-600 dark:text-gray-400'}`}>
            {node.content}
          </span>

          {hasChildren && !isExpanded && (
            <span className="ml-3 text-[10px] font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-500 px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              {node.children.length} items
            </span>
          )}
        </motion.div>

        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="border-l-2 border-gray-100 dark:border-gray-800/60 ml-5 pl-2 mt-1 mb-2"
          >
            {node.children.map(child => renderNode(child, nodeId))}
          </motion.div>
        )}
      </div>
    );
  };

  const treeData = parseTree(data);

  return (
    <div className="p-2">
      {treeData.map(node => renderNode(node))}
    </div>
  );
};

export default AnimatedTree;
