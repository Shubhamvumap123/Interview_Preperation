import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, CheckCircle2, Circle, Play, Settings, Command, Cpu } from 'lucide-react';

const FlowDiagram = ({ flow }) => {
  const parseFlow = (flowString) => {
    const lines = flowString.split('\n').filter(line => line.trim());
    const steps = [];
    let currentStep = null;

    lines.forEach((line, index) => {
      const isSubStep = line.match(/^([│\s]*[├└])─/) || line.trim().startsWith('│');
      const cleanContent = line.replace(/[├└─│]/g, '').trim();

      if (!isSubStep && cleanContent) {
        if (currentStep) steps.push(currentStep);
        currentStep = {
          id: `step-${index}`,
          title: cleanContent,
          subSteps: []
        };
      } else if (isSubStep && cleanContent && currentStep) {
        currentStep.subSteps.push(cleanContent);
      }
    });

    if (currentStep) steps.push(currentStep);
    return steps;
  };

  const steps = parseFlow(flow);

  return (
    <div className="space-y-12 py-6">
      {steps.map((step, index) => (
        <div key={step.id} className="relative">
          {/* Main Connector Line */}
          {index < steps.length - 1 && (
            <div className="absolute left-8 top-16 bottom-[-3rem] w-0.5 bg-gradient-to-b from-blue-500 to-transparent dark:from-blue-400 z-0"></div>
          )}

          <div className="flex items-start z-10 relative">
            {/* Step Number/Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl ${index === 0
                  ? 'bg-blue-600 shadow-blue-500/40 text-white'
                  : 'bg-white dark:bg-gray-700 text-blue-500 border-2 border-blue-100 dark:border-blue-900 shadow-gray-200/50'
                }`}
            >
              {index === 0 ? <Play className="w-8 h-8 fill-current" /> :
                index === steps.length - 1 ? <CheckCircle2 className="w-8 h-8" /> :
                  <div className="text-xl font-black">{index + 1}</div>}
            </motion.div>

            <div className="ml-8 flex-1">
              {/* Step Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/40 rounded-xl mr-4">
                    <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                    {step.title}
                  </h3>
                </div>

                {step.subSteps.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {step.subSteps.map((sub, sIdx) => (
                      <motion.div
                        key={sIdx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + sIdx * 0.05 + 0.2 }}
                        className="flex items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700"
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 shadow-glow" />
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{sub}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-6 flex justify-center w-16"
                >
                  <ArrowDown className="w-8 h-8 text-blue-300 dark:text-blue-800" strokeWidth={3} />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlowDiagram;
