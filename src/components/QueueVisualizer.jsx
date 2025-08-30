import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const QueueVisualizer = ({ queue }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        BFS Queue
      </h2>

      <div className="space-y-2">
        <div className="text-sm text-gray-600 text-center mb-3">
          {queue.length === 0 ? 'Queue is empty' : `${queue.length} items in queue`}
        </div>

        <AnimatePresence>
          {queue.map((node, index) => (
            <motion.div
              key={`${node.x}-${node.y}-${node.step}-${node.val}`}
              className="bg-blue-100 border border-blue-300 rounded-lg p-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-blue-800">
                  Position: ({node.x}, {node.y})
                </div>
                <div className="text-xs text-blue-600">
                  Step: {node.step}
                </div>
              </div>
              <div className="text-lg font-bold text-blue-900 mt-1">
                Value: {node.val}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {queue.length === 0 && (
          <motion.div
            className="text-center text-gray-500 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-4xl mb-2">📭</div>
            <div>Queue is empty</div>
          </motion.div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <div>Front → Back</div>
        <div>BFS processes cells in order</div>
      </div>
    </div>
  );
};

export default QueueVisualizer;
