import { motion } from 'framer-motion';
import React from 'react';

const Controls = ({
  simulationState,
  onStart,
  onNext,
  onReset,
  animationSpeed,
  onSpeedChange,
  currentStep,
  totalSteps
}) => {
  const getButtonColor = (state) => {
    switch (state) {
      case 'running':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'completed':
        return 'bg-green-500 hover:bg-green-600';
      case 'paused':
        return 'bg-orange-500 hover:bg-orange-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  const getButtonText = (state) => {
    switch (state) {
      case 'running':
        return 'Running...';
      case 'completed':
        return 'Completed!';
      case 'paused':
        return 'Paused';
      default:
        return 'Start Simulation';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Simulation Controls
      </h2>

      <div className="grid grid-cols-1  gap-4 mb-6">
        <div className="space-y-4">
          <div className='px-3'>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Animation Speed: {animationSpeed}ms
            </label>
            <input
              type="range"
              min="200"
              max="3000"
              step="100"
              value={animationSpeed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Fast</span>
              <span>Slow</span>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-600">
              <div className="font-medium">Progress:</div>
              <div className="mt-1">
                Step {currentStep} of {totalSteps || 0}
              </div>
              {totalSteps > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <motion.div
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <motion.button
            className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-200 ${getButtonColor(simulationState)}`}
            onClick={onStart}
            disabled={simulationState === 'running'}
            whileHover={{ scale: simulationState === 'running' ? 1 : 1.02 }}
            whileTap={{ scale: simulationState === 'running' ? 1 : 0.98 }}
          >
            {getButtonText(simulationState)}
          </motion.button>

          <motion.button
            className="w-full py-3 px-6 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200"
            onClick={onNext}
            disabled={simulationState !== 'running' && simulationState !== 'paused'}
            whileHover={{ scale: (simulationState === 'running' || simulationState === 'paused') ? 1.02 : 1 }}
            whileTap={{ scale: (simulationState === 'running' || simulationState === 'paused') ? 0.98 : 1 }}
          >
            Next Step
          </motion.button>

          <motion.button
            className="w-full py-3 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200"
            onClick={onReset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Reset
          </motion.button>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        {/* Algorithm Optimization Info */}
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-sm text-green-800">
            <div className="font-medium mb-1">🚀 Algorithm Optimizations:</div>
            <div className="space-y-1 text-xs">
              <div>• <strong>Early Termination:</strong> Stops immediately when reaching target (0,0)</div>
              <div>• <strong>No Revisiting:</strong> Avoids processing already visited cells</div>
              <div>• <strong>Reduced Steps:</strong> Minimizes unnecessary algorithm iterations</div>
              <div>• <strong>Faster Execution:</strong> More efficient pathfinding performance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
