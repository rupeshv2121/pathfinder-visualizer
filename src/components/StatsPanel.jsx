import { motion } from 'framer-motion';
import React from 'react';

const StatsPanel = ({ stats }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Algorithm Statistics
      </h2>

      <div className="space-y-4">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.minSteps}</div>
            <div className="text-sm font-bold opacity-90">Minimum Steps</div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.maxVal}</div>
            <div className="text-sm font-bold opacity-90">Maximum Value (Gifts)</div>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Algorithm Details</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div>• Optimized BFS explores optimal paths</div>
          <div>• Finds shortest path with max value</div>
          <div>• Obstacles / Blocked (∞)</div>
          <div>• Negative values (Pit Holes) reduce total value</div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="text-sm text-yellow-800">
          <div className="font-semibold">Goal:</div>
          <div>Find path from start to (0,0) with minimum steps and maximum gifts collected.</div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
