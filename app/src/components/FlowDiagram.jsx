import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

const FlowDiagram = ({ flow }) => {
  const steps = flow.split('\n')
    .filter(line => line.trim())
    .map(line => line.trim());

  const parseFlow = (steps) => {
    const flowSteps = [];
    let currentStep = null;
    let subSteps = [];

    steps.forEach((step, index) => {
      if (step.match(/^[├─└│]/)) {
        const content = step.replace(/[├─└│]/g, '').trim();
        const isMainStep = step.match(/^[├─]/);
        const isSubStep = step.startsWith('│');
        const isLastStep = step.startsWith('└');

        if (isMainStep && content) {
          if (currentStep) {
            flowSteps.push({ ...currentStep, subSteps: [...subSteps] });
            subSteps = [];
          }
          currentStep = {
            id: `step-${index}`,
            content,
            isLast: isLastStep
          };
        } else if (isSubStep && content) {
          subSteps.push({
            id: `substep-${index}`,
            content
          });
        }
      } else if (step && !step.match(/^[├─└│]/)) {
        if (currentStep) {
          flowSteps.push({ ...currentStep, subSteps: [...subSteps] });
          subSteps = [];
        }
        currentStep = {
          id: `step-${index}`,
          content: step,
          isLast: false
        };
      }
    });

    if (currentStep) {
      flowSteps.push({ ...currentStep, subSteps: [...subSteps] });
    }

    return flowSteps;
  };

  const flowSteps = parseFlow(steps);

  return (
    <div className="relative">
      {flowSteps.map((step, index) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative"
        >
          <div className="flex items-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 + 0.1 }}
              className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg"
            >
              {index + 1}
            </motion.div>
            
            <div className="ml-4 flex-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: index * 0.2 + 0.2 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
              >
                <p className="text-gray-800 dark:text-gray-200 font-medium">
                  {step.content}
                </p>
              </motion.div>
            </div>
          </div>

          {step.subSteps.length > 0 && (
            <div className="ml-16 mb-4">
              {step.subSteps.map((subStep, subIndex) => (
                <motion.div
                  key={subStep.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + subIndex * 0.1 + 0.3 }}
                  className="flex items-center mb-2"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <div className="bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded border border-green-200 dark:border-green-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {subStep.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {index < flowSteps.length - 1 && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 40 }}
              transition={{ delay: index * 0.2 + 0.4 }}
              className="flex justify-center ml-6"
            >
              <ArrowDown className="w-6 h-6 text-blue-400" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FlowDiagram;
